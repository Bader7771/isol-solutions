"""Create display-size WebP derivatives; retain original files and dataset paths."""
from pathlib import Path
from PIL import Image, ImageOps
from pypdf import PdfReader
import re
import json
catalog=json.loads(Path('data/processed/products_clean.json').read_text())
paths={p['primary_image'] for p in catalog['products']}
paths.update(c['image'] for c in catalog['categories'].values())
paths.update(str(p) for p in Path('assets/images').rglob('*.png') if p.name!='LOGO.png')
sources=json.loads(Path('assets/image-sources.json').read_text())
paths.add('data_produits/Panneaux sandwish/WhatsApp Image 2026-07-10 at 11.33.15 AM.jpeg')
output=Path('assets/optimized'); output.mkdir(exist_ok=True)
before=after=0
for source in sorted(paths):
 path=Path(source)
 stem=re.sub('[^a-zA-Z0-9-]','_',str(path.with_suffix('')))
 if source in sources:
  origin=sources[source]
  im=PdfReader(origin['document']).pages[origin['page_index']].images[origin['image_index']].image.convert('RGBA')
 else:
  im=ImageOps.exif_transpose(Image.open(path)).convert('RGB')
 before+=path.stat().st_size
 for size,suffix in [(1200,''),(480,'-480')]:
  sized=im.copy();sized.thumbnail((size,size),Image.Resampling.LANCZOS)
  target=output/f'{stem}{suffix}.webp';sized.save(target,'WEBP',quality=83,method=6)
  after+=target.stat().st_size
print(f'Optimized {len(paths)} images: {before:,} original bytes; {after:,} bytes for both responsive sizes. Originals retained.')
