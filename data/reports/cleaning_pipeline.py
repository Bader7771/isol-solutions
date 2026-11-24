#!/usr/bin/env python3
"""
Isolsolutions Product Data Cleaning Pipeline
=============================================
Reusable, documented pipeline that transforms raw products-data.js
into a clean, validated, production-ready JSON dataset.

Usage:
    python3 cleaning_pipeline.py [--input INPUT_FILE] [--output-dir OUTPUT_DIR]

Author: Data Engineering Pipeline
Created: 2026-11-22
"""

import json
import re
import os
import sys
import hashlib
import unicodedata
import copy
from datetime import datetime, timezone
from pathlib import Path
from collections import Counter, OrderedDict

# ============================================================
# CONFIGURATION
# ============================================================
DEFAULT_INPUT = os.path.join(os.path.dirname(__file__), '..', 'raw', 'products-data.js')
DEFAULT_OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..')
BRAND_DEFAULT = "Isolsolutions"
TIMESTAMP = datetime.now(timezone.utc).isoformat()

# ============================================================
# 1. EXTRACTION — Parse JS file into Python dicts
# ============================================================
def extract_js_data(filepath):
    """Parse products-data.js and extract CATEGORIES and PRODUCTS."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract CATEGORIES object
    cat_match = re.search(r'const\s+CATEGORIES\s*=\s*(\{.*?\});', content, re.DOTALL)
    if not cat_match:
        raise ValueError("Could not find CATEGORIES in source file")

    # Extract PRODUCTS array
    prod_match = re.search(r'const\s+PRODUCTS\s*=\s*(\[.*?\]);', content, re.DOTALL)
    if not prod_match:
        raise ValueError("Could not find PRODUCTS in source file")

    categories_js = cat_match.group(1)
    products_js = prod_match.group(1)

    # Convert JS object notation to valid JSON
    categories = js_to_python(categories_js, is_object=True)
    products = js_to_python(products_js, is_object=False)

    return categories, products


def js_to_python(js_str, is_object=True):
    """Convert JavaScript object/array literal to Python dict/list.
    Handles: unquoted keys, single quotes, trailing commas, template literals,
    HTML entities, comments, and &-escaped characters.
    """
    s = js_str

    # Remove single-line comments (but not inside strings)
    s = re.sub(r'//[^\n]*', '', s)
    # Remove multi-line comments
    s = re.sub(r'/\*.*?\*/', '', s, flags=re.DOTALL)

    # Replace HTML entities that appear in the raw JS
    s = s.replace('&amp;', '&')
    s = s.replace('&lt;', '<')
    s = s.replace('&gt;', '>')
    s = s.replace('&quot;', '"')

    # Handle \u0026 (JSON unicode escape for &) — keep as is since json.loads understands it

    # Quote unquoted object keys: word characters before colon
    s = re.sub(r'(?<=[{,\n])\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:', r' "\1":', s)

    # Replace single quotes with double quotes (careful with apostrophes in French text)
    # Strategy: single-quoted strings are values, we handle them
    result = []
    i = 0
    in_string = False
    string_char = None
    while i < len(s):
        ch = s[i]
        if in_string:
            if ch == '\\':
                result.append(ch)
                i += 1
                if i < len(s):
                    result.append(s[i])
                i += 1
                continue
            if ch == string_char:
                in_string = False
                result.append('"')
                i += 1
                continue
            if ch == '"' and string_char == "'":
                result.append('\\"')
                i += 1
                continue
            result.append(ch)
        else:
            if ch == "'":
                in_string = True
                string_char = "'"
                result.append('"')
            elif ch == '"':
                in_string = True
                string_char = '"'
                result.append('"')
            else:
                result.append(ch)
        i += 1
    s = ''.join(result)

    # Remove trailing commas before } or ]
    s = re.sub(r',\s*([}\]])', r'\1', s)

    # Try to parse as JSON
    try:
        return json.loads(s)
    except json.JSONDecodeError as e:
        # Fallback: attempt line-by-line fix
        raise ValueError(f"Failed to parse JS: {e}\nNear: {s[max(0,e.pos-100):e.pos+100]}")


# ============================================================
# 2. CLEANING FUNCTIONS
# ============================================================
class CleaningLog:
    """Track all cleaning operations performed."""
    def __init__(self):
        self.operations = []
        self.warnings = []
        self.errors = []
        self.stats = Counter()

    def log(self, operation, product_id=None, field=None, before=None, after=None):
        entry = {
            "operation": operation,
            "product_id": product_id,
            "field": field,
            "timestamp": TIMESTAMP
        }
        if before is not None:
            entry["before"] = str(before)[:200]
        if after is not None:
            entry["after"] = str(after)[:200]
        self.operations.append(entry)
        self.stats[operation] += 1

    def warn(self, message, product_id=None):
        self.warnings.append({"message": message, "product_id": product_id})

    def error(self, message, product_id=None):
        self.errors.append({"message": message, "product_id": product_id})


def clean_text(text):
    """Remove invisible characters, normalize whitespace, fix Unicode."""
    if not isinstance(text, str):
        return text
    # Normalize Unicode (NFC)
    text = unicodedata.normalize('NFC', text)
    # Remove zero-width characters
    text = re.sub(r'[\u200b\u200c\u200d\ufeff\u00ad]', '', text)
    # Normalize whitespace (collapse multiple spaces, strip)
    text = re.sub(r'[ \t]+', ' ', text)
    text = text.strip()
    # Fix common encoding artifacts
    text = text.replace('â€™', "'").replace('â€"', '—').replace('â€œ', '"').replace('â€\x9d', '"')
    return text


def normalize_product_name(name):
    """Standardize product name formatting without destroying meaning."""
    name = clean_text(name)
    # Ensure consistent dash spacing
    name = re.sub(r'\s*—\s*', ' — ', name)
    name = re.sub(r'\s*–\s*', ' — ', name)
    # Ensure consistent unit formatting
    name = re.sub(r'(\d)\s*mm\b', r'\1 mm', name)
    name = re.sub(r'(\d)\s*dB\b', r'\1 dB', name)
    return name


def generate_slug(product_id):
    """Generate URL-safe slug from product ID."""
    slug = product_id.lower().strip()
    slug = re.sub(r'[^a-z0-9-]', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')


def extract_brand(specs, title, default="Isolsolutions"):
    """Extract manufacturer brand from specs or title."""
    # Check specs for explicit brand/marque field
    if isinstance(specs, dict):
        for key in ['Marque', 'marque', 'Brand', 'brand']:
            if key in specs:
                return clean_text(specs[key])

    # Try to detect from title
    known_brands = [
        "Rockwool", "Volcalis", "Terrawool", "Glasrock", "Effisus"
    ]
    for brand in known_brands:
        if brand.lower() in title.lower():
            return brand

    return default


def fix_known_image_path(path, log, pid):
    """Fix known path mismatches between JS references and actual file system."""
    original = path
    # Fix: "Panneau acoustique/" → "Panneaux Acoustiques/" (singular/plural + case)
    if 'data_produits/Panneau acoustique/' in path:
        path = path.replace('data_produits/Panneau acoustique/', 'data_produits/Panneaux Acoustiques/')
        log.log("fix_image_path_folder_name", pid, "image", original, path)

    # Fix: Unicode characters corrupted in path (PET 办公隔断 1.png)
    # The JS file has "PET ???? 1.png" or similar corruption for the Chinese filename
    if 'PET' in path and ('????' in path or '\u529e\u516c\u9694\u65ad' in path or '?' in path):
        # Find the actual file by pattern
        dir_path = os.path.dirname(path)
        pet_files = []
        if os.path.isdir(dir_path):
            pet_files = [f for f in os.listdir(dir_path) if f.startswith('PET') and f.endswith('.png')]
        if pet_files:
            path = os.path.join(dir_path, pet_files[0])
            log.log("fix_image_path_unicode", pid, "image", original, path)
        else:
            log.warn(f"Could not resolve corrupted PET image path: {original}", pid)

    return path


def validate_image_path(path, base_dir=None):
    """Validate that an image path looks valid."""
    issues = []
    if not path:
        issues.append("empty_path")
        return path, issues

    # Check for non-ASCII characters in path that might cause issues
    if re.search(r'[^\x00-\x7f]', path):
        issues.append("non_ascii_characters_in_path")

    # Check for common file extensions
    valid_exts = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'}
    ext = os.path.splitext(path)[1].lower()
    if ext not in valid_exts:
        issues.append(f"unusual_extension:{ext}")

    # Check if file exists on disk
    if base_dir:
        full_path = os.path.join(base_dir, path)
        if not os.path.exists(full_path):
            issues.append("file_not_found")

    return path, issues


def validate_pdf_path(path, base_dir=None):
    """Validate PDF document path."""
    issues = []
    if not path:
        issues.append("empty_path")
        return path, issues

    if not path.lower().endswith('.pdf'):
        issues.append("not_pdf_extension")

    if base_dir:
        full_path = os.path.join(base_dir, path)
        if not os.path.exists(full_path):
            issues.append("file_not_found")

    return path, issues


def detect_duplicate_products(products):
    """Detect potential duplicate products by ID, name similarity, and content hash."""
    duplicates = {
        "exact_id_duplicates": [],
        "similar_names": [],
        "content_duplicates": []
    }

    # Check for exact ID duplicates
    id_counts = Counter(p.get('id', '') for p in products)
    for pid, count in id_counts.items():
        if count > 1:
            duplicates["exact_id_duplicates"].append({
                "id": pid,
                "count": count
            })

    # Check for very similar names (using normalized comparison)
    names = [(i, normalize_for_comparison(p.get('title', ''))) for i, p in enumerate(products)]
    for i in range(len(names)):
        for j in range(i + 1, len(names)):
            if names[i][1] == names[j][1]:
                duplicates["similar_names"].append({
                    "product_a_index": names[i][0],
                    "product_a_title": products[names[i][0]].get('title', ''),
                    "product_b_index": names[j][0],
                    "product_b_title": products[names[j][0]].get('title', '')
                })

    # Content hash duplicates (hash of desc + specs)
    hashes = {}
    for i, p in enumerate(products):
        content = json.dumps(p.get('specs', {}), sort_keys=True) + (p.get('fullDesc', '') or '')
        h = hashlib.md5(content.encode()).hexdigest()
        if h in hashes:
            duplicates["content_duplicates"].append({
                "product_a_index": hashes[h],
                "product_b_index": i,
                "hash": h
            })
        else:
            hashes[h] = i

    return duplicates


def normalize_for_comparison(text):
    """Normalize text for duplicate comparison."""
    text = text.lower()
    text = unicodedata.normalize('NFKD', text)
    text = re.sub(r'[^a-z0-9]', '', text)
    return text


# ============================================================
# 3. MAIN CLEANING PIPELINE
# ============================================================
def clean_product(raw_product, categories, log, base_dir=None):
    """Clean and standardize a single product record."""
    pid = raw_product.get('id', 'UNKNOWN')
    cleaned = OrderedDict()

    # -- product_id --
    cleaned['product_id'] = clean_text(pid)
    if not re.match(r'^[a-z0-9-]+$', cleaned['product_id']):
        log.warn(f"Product ID contains invalid characters: {cleaned['product_id']}", pid)

    # -- slug --
    cleaned['slug'] = generate_slug(cleaned['product_id'])

    # -- category_id --
    cat_id = clean_text(raw_product.get('category', ''))
    if cat_id not in categories:
        log.warn(f"Category '{cat_id}' not found in CATEGORIES", pid)
    cleaned['category_id'] = cat_id

    # -- category_name --
    cat_info = categories.get(cat_id, {})
    cleaned['category_name'] = cat_info.get('title', cat_id)

    # -- product_name --
    raw_name = raw_product.get('title', '')
    cleaned['product_name'] = normalize_product_name(raw_name)
    if cleaned['product_name'] != raw_name:
        log.log("normalize_product_name", pid, "product_name", raw_name, cleaned['product_name'])

    # -- brand --
    cleaned['brand'] = extract_brand(
        raw_product.get('specs', {}),
        cleaned['product_name'],
        BRAND_DEFAULT
    )

    # -- short_description --
    raw_short = raw_product.get('shortDesc', '')
    cleaned['short_description'] = clean_text(raw_short)
    if cleaned['short_description'] != raw_short:
        log.log("clean_text", pid, "short_description", raw_short, cleaned['short_description'])

    # -- full_description --
    raw_full = raw_product.get('fullDesc', '')
    cleaned['full_description'] = clean_text(raw_full)
    if cleaned['full_description'] != raw_full:
        log.log("clean_text", pid, "full_description", raw_full, cleaned['full_description'])

    # -- badge --
    cleaned['badge'] = clean_text(raw_product.get('badge', ''))

    # -- primary_image --
    raw_image = raw_product.get('image', '')
    raw_image = fix_known_image_path(raw_image, log, pid)
    cleaned['primary_image'], img_issues = validate_image_path(raw_image, base_dir)
    if img_issues:
        log.warn(f"Image issues: {img_issues}", pid)

    # -- images --
    raw_images = raw_product.get('images', [])
    if not raw_images:
        raw_images = [raw_image] if raw_image else []
    cleaned_images = []
    for img in raw_images:
        img = fix_known_image_path(img, log, pid)
        img_clean, issues = validate_image_path(img, base_dir)
        if issues:
            log.warn(f"Gallery image issues: {issues} for '{img}'", pid)
        cleaned_images.append(img_clean)
    cleaned['images'] = cleaned_images

    # -- technical_documents --
    raw_pdfs = raw_product.get('fichesPDF', [])
    cleaned_docs = []
    for doc in raw_pdfs:
        doc_label = clean_text(doc.get('label', ''))
        doc_path = doc.get('path', '')

        # Fix known path inconsistencies
        # 1. "produit effisius" → "Pare-vapeur et Pare-pluie"
        if 'produit effisius' in doc_path:
            corrected = doc_path.replace('data_produits/produit effisius/', 'data_produits/Pare-vapeur et Pare-pluie/')
            log.log("fix_broken_pdf_path", pid, "technical_documents.path", doc_path, corrected)
            doc_path = corrected
        # 2. "Panneau acoustique" → "Panneaux Acoustiques" (singular vs plural + case)
        if 'Panneau acoustique/' in doc_path:
            corrected = doc_path.replace('data_produits/Panneau acoustique/', 'data_produits/Panneaux Acoustiques/')
            log.log("fix_broken_pdf_path", pid, "technical_documents.path", doc_path, corrected)
            doc_path = corrected

        _, pdf_issues = validate_pdf_path(doc_path, base_dir)
        if pdf_issues:
            log.warn(f"PDF issues: {pdf_issues} for '{doc_path}'", pid)

        cleaned_docs.append({
            "label": doc_label,
            "path": doc_path
        })
    cleaned['technical_documents'] = cleaned_docs

    # -- advantages --
    raw_advantages = raw_product.get('advantages', [])
    cleaned['advantages'] = [clean_text(a) for a in raw_advantages if a]

    # -- specifications --
    raw_specs = raw_product.get('specs', {})
    cleaned_specs = OrderedDict()
    for key, val in raw_specs.items():
        clean_key = clean_text(key)
        clean_val = clean_text(val)
        cleaned_specs[clean_key] = clean_val
    cleaned['specifications'] = cleaned_specs

    # -- seo_keywords --
    raw_seo = raw_product.get('seoKeywords', '')
    cleaned['seo_keywords'] = clean_text(raw_seo)

    # -- metadata --
    cleaned['source_file'] = 'products-data.js'
    cleaned['created_at'] = TIMESTAMP
    cleaned['updated_at'] = TIMESTAMP

    return cleaned


def clean_categories(raw_categories, log):
    """Clean and standardize categories."""
    cleaned = OrderedDict()
    for cat_id, cat_data in raw_categories.items():
        clean_cat = OrderedDict()
        clean_cat['category_id'] = cat_id
        clean_cat['title'] = clean_text(cat_data.get('title', ''))
        clean_cat['description'] = clean_text(cat_data.get('description', ''))
        clean_cat['image'] = cat_data.get('image', '')
        clean_cat['badge'] = clean_text(cat_data.get('badge', ''))
        clean_cat['meta_description'] = clean_text(cat_data.get('metaDesc', ''))
        clean_cat['product_count'] = 0  # Will be updated after cleaning products
        cleaned[cat_id] = clean_cat
    return cleaned


def run_pipeline(input_file=None, output_dir=None):
    """Execute the full cleaning pipeline."""
    input_file = input_file or os.path.abspath(DEFAULT_INPUT)
    output_dir = output_dir or os.path.abspath(DEFAULT_OUTPUT_DIR)
    # Project root: go up from data/raw/products-data.js → data/raw → data → project root
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(input_file))))
    # If input is at project root (e.g. products-data.js), use its parent
    if not os.path.isdir(os.path.join(base_dir, 'data_produits')):
        base_dir = os.path.dirname(os.path.abspath(input_file))
    if not os.path.isdir(os.path.join(base_dir, 'data_produits')):
        base_dir = os.getcwd()

    print(f"{'='*60}")
    print(f"  ISOLSOLUTIONS DATA CLEANING PIPELINE")
    print(f"  Input:  {input_file}")
    print(f"  Output: {output_dir}")
    print(f"  Started: {TIMESTAMP}")
    print(f"{'='*60}\n")

    log = CleaningLog()

    # ----- STEP 1: Extract raw data -----
    print("[1/7] Extracting data from JavaScript source...")
    raw_categories, raw_products = extract_js_data(input_file)
    total_raw_products = len(raw_products)
    total_raw_categories = len(raw_categories)
    print(f"       Found {total_raw_products} products in {total_raw_categories} categories\n")

    # ----- STEP 2: Detect duplicates -----
    print("[2/7] Detecting duplicates...")
    duplicates = detect_duplicate_products(raw_products)
    dup_count = sum(len(v) for v in duplicates.values())
    if dup_count > 0:
        print(f"       ⚠ Found {dup_count} potential duplicate issues")
        for dtype, dlist in duplicates.items():
            if dlist:
                print(f"         - {dtype}: {len(dlist)}")
    else:
        print("       ✓ No duplicate products detected")
    print()

    # ----- STEP 3: Clean categories -----
    print("[3/7] Cleaning categories...")
    cleaned_categories = clean_categories(raw_categories, log)
    print(f"       ✓ Cleaned {len(cleaned_categories)} categories\n")

    # ----- STEP 4: Clean products -----
    print("[4/7] Cleaning products...")
    cleaned_products = []
    rejected_products = []
    for raw_prod in raw_products:
        try:
            cleaned = clean_product(raw_prod, raw_categories, log, base_dir)
            cleaned_products.append(cleaned)
        except Exception as e:
            log.error(f"Failed to clean product: {e}", raw_prod.get('id', 'UNKNOWN'))
            rejected_products.append({
                "original": raw_prod,
                "error": str(e),
                "timestamp": TIMESTAMP
            })

    # Update category product counts
    cat_counts = Counter(p['category_id'] for p in cleaned_products)
    for cat_id, cat_data in cleaned_categories.items():
        cat_data['product_count'] = cat_counts.get(cat_id, 0)

    print(f"       ✓ Cleaned {len(cleaned_products)} products")
    if rejected_products:
        print(f"       ⚠ Rejected {len(rejected_products)} products")
    print()

    # ----- STEP 5: Validate -----
    print("[5/7] Validating cleaned data...")
    validation_results = validate_dataset(cleaned_products, cleaned_categories, log, base_dir)
    valid_count = validation_results['valid_count']
    issue_count = validation_results['issue_count']
    print(f"       ✓ {valid_count} products pass all validations")
    if issue_count > 0:
        print(f"       ⚠ {issue_count} validation warnings recorded")
    print()

    # ----- STEP 6: Build output -----
    print("[6/7] Writing output files...")

    # Processed JSON
    output_data = OrderedDict()
    output_data['metadata'] = {
        "version": "1.0.0",
        "last_updated": TIMESTAMP,
        "total_products": len(cleaned_products),
        "total_categories": len(cleaned_categories),
        "brand": BRAND_DEFAULT,
        "source": "products-data.js",
        "pipeline_version": "1.0.0"
    }
    output_data['categories'] = cleaned_categories
    output_data['products'] = cleaned_products

    processed_path = os.path.join(output_dir, 'processed', 'products_clean.json')
    with open(processed_path, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)
    print(f"       ✓ {processed_path}")

    # Processed JS (backward-compatible with existing site)
    js_output_path = os.path.join(output_dir, 'processed', 'products-data-clean.js')
    write_clean_js(output_data, js_output_path)
    print(f"       ✓ {js_output_path}")

    # Rejected records
    rejected_path = os.path.join(output_dir, 'rejected', 'quarantined_records.json')
    with open(rejected_path, 'w', encoding='utf-8') as f:
        json.dump({
            "timestamp": TIMESTAMP,
            "total_quarantined": len(rejected_products),
            "records": rejected_products,
            "validation_warnings": validation_results.get('warnings', [])
        }, f, ensure_ascii=False, indent=2)
    print(f"       ✓ {rejected_path}")

    # Staging data (intermediate)
    staging_path = os.path.join(output_dir, 'staging', 'products_staging.json')
    with open(staging_path, 'w', encoding='utf-8') as f:
        json.dump({
            "raw_product_count": total_raw_products,
            "raw_category_count": total_raw_categories,
            "duplicates_detected": duplicates,
            "cleaning_operations": log.operations[:100],  # First 100
            "total_operations": len(log.operations)
        }, f, ensure_ascii=False, indent=2)
    print(f"       ✓ {staging_path}")

    print()

    # ----- STEP 7: Generate reports -----
    print("[7/7] Generating reports...")

    cleaning_summary = generate_cleaning_summary(
        total_raw_products, total_raw_categories,
        cleaned_products, cleaned_categories,
        rejected_products, duplicates, log, validation_results
    )
    summary_path = os.path.join(output_dir, 'reports', 'cleaning_summary.json')
    with open(summary_path, 'w', encoding='utf-8') as f:
        json.dump(cleaning_summary, f, ensure_ascii=False, indent=2)
    print(f"       ✓ {summary_path}")

    print(f"\n{'='*60}")
    print(f"  PIPELINE COMPLETE")
    print(f"  Raw records:      {total_raw_products}")
    print(f"  Cleaned records:  {len(cleaned_products)}")
    print(f"  Rejected records: {len(rejected_products)}")
    print(f"  Duplicates found: {dup_count}")
    print(f"  Cleaning ops:     {len(log.operations)}")
    print(f"  Warnings:         {len(log.warnings)}")
    print(f"{'='*60}")

    return cleaning_summary


# ============================================================
# 4. VALIDATION
# ============================================================
def validate_dataset(products, categories, log, base_dir=None):
    """Run all validation checks on the cleaned dataset."""
    results = {
        'valid_count': 0,
        'issue_count': 0,
        'warnings': [],
        'checks': {}
    }

    # Check 1: Unique IDs
    ids = [p['product_id'] for p in products]
    id_dupes = [pid for pid, c in Counter(ids).items() if c > 1]
    results['checks']['unique_ids'] = {
        'passed': len(id_dupes) == 0,
        'duplicates': id_dupes
    }
    if id_dupes:
        results['issue_count'] += len(id_dupes)
        for d in id_dupes:
            results['warnings'].append(f"Duplicate product ID: {d}")

    # Check 2: Category references
    invalid_cats = []
    for p in products:
        if p['category_id'] not in categories:
            invalid_cats.append({'product_id': p['product_id'], 'category_id': p['category_id']})
    results['checks']['valid_categories'] = {
        'passed': len(invalid_cats) == 0,
        'invalid': invalid_cats
    }

    # Check 3: Required fields
    required = ['product_id', 'product_name', 'category_id', 'short_description', 'full_description', 'primary_image']
    missing_required = []
    for p in products:
        for field in required:
            if not p.get(field):
                missing_required.append({'product_id': p['product_id'], 'field': field})
    results['checks']['required_fields'] = {
        'passed': len(missing_required) == 0,
        'missing': missing_required
    }

    # Check 4: Image file existence
    missing_images = []
    if base_dir:
        for p in products:
            img = p.get('primary_image', '')
            if img:
                full = os.path.join(base_dir, img)
                if not os.path.exists(full):
                    missing_images.append({'product_id': p['product_id'], 'image': img})
    results['checks']['images_exist'] = {
        'passed': len(missing_images) == 0,
        'missing': missing_images
    }

    # Check 5: PDF file existence
    missing_pdfs = []
    if base_dir:
        for p in products:
            for doc in p.get('technical_documents', []):
                path = doc.get('path', '')
                if path:
                    full = os.path.join(base_dir, path)
                    if not os.path.exists(full):
                        missing_pdfs.append({'product_id': p['product_id'], 'pdf': path})
    results['checks']['pdfs_exist'] = {
        'passed': len(missing_pdfs) == 0,
        'missing': missing_pdfs
    }

    # Check 6: Non-empty specifications
    empty_specs = []
    for p in products:
        if not p.get('specifications'):
            empty_specs.append(p['product_id'])
    results['checks']['has_specifications'] = {
        'passed': len(empty_specs) == 0,
        'missing': empty_specs
    }

    # Check 7: Product name length
    long_names = []
    for p in products:
        if len(p.get('product_name', '')) > 150:
            long_names.append({'product_id': p['product_id'], 'length': len(p['product_name'])})
    results['checks']['name_length'] = {
        'passed': len(long_names) == 0,
        'long': long_names
    }

    # Tally
    total_issues = sum(
        1 for check in results['checks'].values() if not check['passed']
    )
    results['issue_count'] = total_issues
    results['valid_count'] = len(products) - len(set(
        item.get('product_id', '') 
        for check in results['checks'].values() 
        for item in (check.get('missing', []) + check.get('invalid', []) + check.get('long', []))
        if isinstance(item, dict)
    ))

    return results


# ============================================================
# 5. OUTPUT GENERATORS
# ============================================================
def write_clean_js(data, output_path):
    """Write cleaned data back to JS format for backward compatibility."""
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("// Products Data Catalogue — Isolsolutions B2B\n")
        f.write(f"// Cleaned by Data Pipeline — {TIMESTAMP}\n")
        f.write(f"// Total Products: {data['metadata']['total_products']}\n")
        f.write(f"// Total Categories: {data['metadata']['total_categories']}\n\n")

        # Write CATEGORIES
        f.write("const CATEGORIES = ")
        # Convert back to JS-style object
        cats_dict = {}
        for cat_id, cat_data in data['categories'].items():
            cats_dict[cat_id] = {
                "title": cat_data['title'],
                "description": cat_data['description'],
                "image": cat_data['image'],
                "badge": cat_data['badge'],
                "metaDesc": cat_data['meta_description']
            }
        f.write(json.dumps(cats_dict, ensure_ascii=False, indent=4))
        f.write(";\n\n")

        # Write PRODUCTS
        f.write("const PRODUCTS = ")
        products_js = []
        for p in data['products']:
            prod = {
                "id": p['product_id'],
                "category": p['category_id'],
                "title": p['product_name'],
                "shortDesc": p['short_description'],
                "badge": p['badge'],
                "image": p['primary_image'],
                "fichesPDF": [{"label": d['label'], "path": d['path']} for d in p.get('technical_documents', [])],
                "fullDesc": p['full_description'],
                "advantages": p['advantages'],
                "specs": dict(p['specifications']),
                "seoKeywords": p['seo_keywords']
            }
            if p.get('images') and len(p['images']) > 1:
                prod['images'] = p['images']
            products_js.append(prod)
        f.write(json.dumps(products_js, ensure_ascii=False, indent=4))
        f.write(";\n\n")

        # Write helper functions
        f.write("""// ===================================
// HELPER FUNCTIONS
// ===================================

/** Retourne tous les produits d'une catégorie donnée */
function getProductsByCategory(categorySlug) {
    return PRODUCTS.filter(p => p.category === categorySlug);
}

/** Retourne un produit par son identifiant unique */
function getProductById(productId) {
    return PRODUCTS.find(p => p.id === productId);
}

/** Retourne les infos d'une catégorie */
function getCategoryInfo(categorySlug) {
    return CATEGORIES[categorySlug] || null;
}
""")


def generate_cleaning_summary(raw_count, raw_cat_count, cleaned, categories,
                               rejected, duplicates, log, validation):
    """Generate machine-readable cleaning summary."""
    return {
        "pipeline_run": {
            "timestamp": TIMESTAMP,
            "pipeline_version": "1.0.0",
            "input_file": "products-data.js",
            "input_format": "JavaScript (ES6 const declarations)"
        },
        "record_counts": {
            "raw_products": raw_count,
            "raw_categories": raw_cat_count,
            "cleaned_products": len(cleaned),
            "cleaned_categories": len(categories),
            "rejected_products": len(rejected),
            "records_lost": raw_count - len(cleaned) - len(rejected)
        },
        "duplicates": {
            "exact_id_duplicates": len(duplicates.get('exact_id_duplicates', [])),
            "similar_name_pairs": len(duplicates.get('similar_names', [])),
            "content_duplicates": len(duplicates.get('content_duplicates', []))
        },
        "cleaning_operations": {
            "total_operations": len(log.operations),
            "operation_breakdown": dict(log.stats),
            "warnings": len(log.warnings),
            "errors": len(log.errors)
        },
        "validation_results": {
            "checks_passed": sum(1 for c in validation['checks'].values() if c['passed']),
            "checks_failed": sum(1 for c in validation['checks'].values() if not c['passed']),
            "total_checks": len(validation['checks']),
            "details": {k: v['passed'] for k, v in validation['checks'].items()}
        },
        "data_quality_improvements": [
            "Unicode normalization (NFC) applied to all text fields",
            "Invisible/zero-width characters removed",
            "Whitespace normalized across all text fields",
            "Product names standardized (dash/unit formatting)",
            "Brand extracted and normalized from specifications",
            "URL-safe slugs generated for all products",
            "Category references validated against category definitions",
            "Image paths validated for file existence",
            "PDF document paths validated and broken references fixed",
            "Broken PDF paths corrected (produit effisius → Pare-vapeur et Pare-pluie)",
            "Consistent field naming convention applied (snake_case)",
            "Metadata timestamps added to all records",
            "Backward-compatible JS output generated"
        ],
        "remaining_issues": log.warnings[:20],
        "category_distribution": {
            cat_id: cat_data['product_count']
            for cat_id, cat_data in categories.items()
        }
    }


# ============================================================
# ENTRY POINT
# ============================================================
if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='Isolsolutions Product Data Cleaning Pipeline')
    parser.add_argument('--input', '-i', default=None, help='Input JS file path')
    parser.add_argument('--output-dir', '-o', default=None, help='Output directory')
    args = parser.parse_args()

    summary = run_pipeline(args.input, args.output_dir)
