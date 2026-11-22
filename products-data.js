// Products Data Catalogue — Isolsolutions B2B
// Dernière mise à jour : 2026 — Marque : Isolsolutions
const CATEGORIES = {
    "panneaux-acoustiques": {
        title: "Panneaux Acoustiques",
        description: "Solutions d'absorption et d'isolation phonique haute performance pour espaces professionnels, tertiaires et hôteliers.",
        image: "assets/images/solution-images/panneaux-acoustiques.png",
        badge: "Premium",
        metaDesc: "Panneaux acoustiques professionnels Isolsolutions : absorption αw jusqu'à 0.95, classement feu A2-s1,d0. Livraison Maroc. Devis gratuit."
    },
    "laine-de-roche": {
        title: "Laine de Roche",
        description: "Isolation thermique et acoustique haute densité pour performances énergétiques et phoniques optimales.",
        image: "assets/images/solution-images/laine-roche.png",
        badge: "Certifié",
        metaDesc: "Laine de roche Isolsolutions : panneaux rigides, rouleaux et coquilles. Incombustible A1, λ = 0.037–0.040 W/m·K. Devis rapide."
    },
    "portes-isolees": {
        title: "Portes Isolées",
        description: "Portes acoustiques et thermiques ultra-performantes Rw 32 à 50 dB pour zones à hautes exigences phoniques.",
        image: "assets/images/solution-images/portes-isolees.png",
        badge: "Sur mesure",
        metaDesc: "Portes acoustiques Isolsolutions : Rw 32 à 50 dB, coupe-feu EI60, seuil motorisé. Sur mesure et certifiées EN ISO 10140."
    },
    "revetements-techniques": {
        title: "Revêtements Techniques",
        description: "Revêtements spécialisés pour contrôle acoustique, protection thermique et traitement phonique avancés.",
        image: "assets/images/solution-images/revetements.png",
        badge: "Innovation",
        metaDesc: "Revêtements acoustiques techniques Isolsolutions : mousse mélamine, PET recyclé, composite alu. Solutions pour studios et espaces professionnels."
    },
    "isolation-industrielle": {
        title: "Isolation Machines Industrielles",
        description: "Protection acoustique et thermique pour équipements industriels, compresseurs, HVAC et systèmes complexes.",
        image: "assets/images/solution-images/isolation-machines.png",
        badge: "Industrie",
        metaDesc: "Isolation industrielle Isolsolutions : capotages, écrans acoustiques, matelas HT, silencieux ventilation. Réduction jusqu'à 35 dB(A)."
    },
    "produits-sur-commande": {
        title: "Produits sur Commande",
        description: "Accessoires et pièces techniques d'isolation disponibles sur demande : insulation pins, bandes alu, colles haute température.",
        image: "assets/images/solution-images/solution-sur-commande.png",
        badge: "Support International",
        metaDesc: "Accessoires isolation sur commande Isolsolutions : insulation pins, rondelles, bandes aluminium, colles HT. Import Europe. Devis rapide."
    }
};

const PRODUCTS = [
    // ===================================
    // PANNEAUX ACOUSTIQUES
    // ===================================
    {
        id: "panneau-mural-absorb-40",
        category: "panneaux-acoustiques",
        title: "Panneau Mural Absorbant 40 mm",
        shortDesc: "Panneau absorbant haute performance pour murs, épaisseur 40 mm — idéal bureaux et salles de réunion.",
        badge: "Best-seller",
        image: "data_produits/Panneau acoustique/1.jpg",
        fichesPDF: [],
        fullDesc: "Le Panneau Mural Absorbant 40 mm d'Isolsolutions est fabriqué en fibre minérale haute densité (90 kg/m³), recouvert d'un voile de verre décoratif résistant. Avec un coefficient d'absorption αw = 0.85, il réduit efficacement les nuisances sonores et la réverbération dans les open-spaces, bureaux paysagers, salles de réunion et espaces tertiaires. Son classement au feu A2-s1,d0 garantit la conformité aux normes de sécurité incendie les plus strictes. La fixation s'effectue par collage ou sur rails métalliques, permettant une installation rapide et soignée. Ses dimensions standard de 1200×600 mm et son voile décoratif personnalisable en font un choix esthétique autant que technique.",
        advantages: [
            "Absorption acoustique αw = 0.85 — performance certifiée",
            "Classement feu A2-s1,d0 conforme ERP",
            "Voile de verre décoratif personnalisable",
            "Installation rapide par collage ou rails",
            "Dimensions : 1200×600×40 mm — format standard",
            "Densité : 90 kg/m³ — stabilité dimensionnelle garantie"
        ],
        specs: {
            "Épaisseur": "40 mm",
            "Densité": "90 kg/m³",
            "Coefficient d'absorption αw": "0.85",
            "Classement au feu": "A2-s1,d0",
            "Dimensions": "1200 × 600 mm",
            "Fixation": "Collage / Rails métalliques"
        },
        seoKeywords: "panneau acoustique mural 40mm, absorption sonore bureau, isolation phonique salle réunion, panneau absorbant αw 0.85, Isolsolutions Maroc"
    },
    {
        id: "panneau-mural-absorb-50",
        category: "panneaux-acoustiques",
        title: "Panneau Mural Absorbant 50 mm",
        shortDesc: "Version renforcée 50 mm — isolation acoustique supérieure avec absorption des basses fréquences.",
        badge: "Premium",
        image: "data_produits/Panneau acoustique/2.jpg",
        fichesPDF: [],
        fullDesc: "Le Panneau Mural Absorbant 50 mm d'Isolsolutions représente la solution de référence pour les environnements exigeant une isolation phonique maximale. Fabriqué en fibre minérale densité 100 kg/m³, ce panneau atteint un coefficient d'absorption αw = 0.95 — parmi les plus élevés du marché. Son épaisseur de 50 mm optimise l'absorption des basses fréquences, souvent les plus difficiles à traiter. Disponible en finition voile de verre ou tissu tendu acoustique au choix, il s'intègre harmonieusement dans les hôtels, auditoriums, salles de conférence et espaces de travail premium. Classement feu A2-s1,d0.",
        advantages: [
            "Absorption acoustique αw = 0.95 — niveau élite",
            "Excellente performance sur les basses fréquences",
            "Finition tissu tendu ou voile de verre au choix",
            "Classement feu A2-s1,d0 — conforme ERP",
            "Dimensions : 1200×600×50 mm",
            "Densité : 100 kg/m³ — robustesse maximale"
        ],
        specs: {
            "Épaisseur": "50 mm",
            "Densité": "100 kg/m³",
            "Coefficient d'absorption αw": "0.95",
            "Classement au feu": "A2-s1,d0",
            "Dimensions": "1200 × 600 mm",
            "Finition": "Voile de verre ou tissu tendu"
        },
        seoKeywords: "panneau acoustique 50mm premium, absorption basses fréquences, isolation phonique auditorium, panneau mural αw 0.95, Isolsolutions"
    },
    {
        id: "panneau-plafond-suspendu",
        category: "panneaux-acoustiques",
        title: "Panneau Plafond Suspendu",
        shortDesc: "Dalle acoustique pour plafonds suspendus, finition lisse blanche — compatible ossatures T24 et T15.",
        badge: "Populaire",
        image: "data_produits/Panneau acoustique/1743145388089.png",
        fichesPDF: [
            { label: "Fiche technique High Quality Ceiling Panels (EN)", path: "data_produits/Panneau acoustique/High Quality perf Round_Ceiling_Panels_datasheet_EN_24mm.pdf" }
        ],
        fullDesc: "La Dalle Acoustique Plafond Suspendu d'Isolsolutions est conçue pour les faux plafonds en laine minérale haute densité. Sa surface lisse peinte en blanc s'intègre dans tous types d'environnements professionnels. Avec un coefficient αw = 0.90, elle réduit significativement la réverbération dans les espaces ouverts, restaurants, boutiques et hôtels. Compatible avec les ossatures standard T24 et T15. Disponible en format 600×600 mm ou 1200×600 mm avec bords droits ou chanfreinés selon les exigences esthétiques.",
        advantages: [
            "Absorption αw = 0.90 — performances certifiées",
            "Surface lisse peinte en blanc — esthétique soignée",
            "Compatible ossatures T24 et T15",
            "Classement feu A2-s1,d0 — sécurité maximale",
            "Formats 600×600 et 1200×600 mm",
            "Bords droits ou chanfreinés selon besoin"
        ],
        specs: {
            "Épaisseur": "20 mm",
            "Densité": "80 kg/m³",
            "Coefficient d'absorption αw": "0.90",
            "Classement au feu": "A2-s1,d0",
            "Formats disponibles": "600×600 / 1200×600 mm",
            "Ossatures compatibles": "T24 / T15"
        },
        seoKeywords: "dalle acoustique plafond suspendu, faux plafond acoustique, isolation plafond bureau hôtel, αw 0.90, Isolsolutions Maroc"
    },
    {
        id: "panneau-design-bois",
        category: "panneaux-acoustiques",
        title: "Panneau Acoustique Bois Perforé",
        shortDesc: "Panneau décoratif bois perforé avec âme laine minérale — esthétique et acoustique pour hôtels et conférences.",
        badge: "Design",
        image: "data_produits/Panneau acoustique/362F62D5-A850-4EDF-A39E-5B6196F67329.jpg",
        fichesPDF: [],
        fullDesc: "Le Panneau Acoustique Bois Perforé d'Isolsolutions allie performance sonique et raffinement esthétique. Sa structure en MDF perforé (perforation ronde ou oblongue) intègre un voile acoustique noir en face arrière et une âme en laine minérale, garantissant une absorption αw jusqu'à 0.85. Disponible en placage bois naturel (chêne, noyer, hêtre), il s'adapte parfaitement aux hôtels luxueux, salles de conférence, restaurants haut de gamme et espaces de réception. Disponible sur mesure selon vos dimensions et configurations de perforation.",
        advantages: [
            "Finition placage bois naturel — chêne, noyer, hêtre",
            "Absorption jusqu'à αw 0.85 selon configuration",
            "Perforations rondes ou oblongues personnalisables",
            "Âme laine minérale haute densité intégrée",
            "Dimensions disponibles sur mesure",
            "Idéal hôtels, salles de conférence et restaurants"
        ],
        specs: {
            "Épaisseur totale": "32–50 mm",
            "Épaisseur MDF": "16–19 mm",
            "Coefficient d'absorption αw": "0.70 – 0.85",
            "Essences bois": "Chêne, Noyer, Hêtre",
            "Classement au feu": "B-s2,d0",
            "Perforation": "Ronde ou oblongue"
        },
        seoKeywords: "panneau acoustique bois perforé, décoration acoustique hôtel, isolation phonique design, MDF perforé laine minérale, Isolsolutions"
    },
    {
        id: "bafle-acoustique-vertical",
        category: "panneaux-acoustiques",
        title: "Baffle Acoustique Vertical Suspendu",
        shortDesc: "Baffle suspendu vertical double face pour grands espaces ouverts — réduction de réverbération efficace.",
        badge: "Nouveau",
        image: "data_produits/Panneau acoustique/c83aa1b50f7e47b9c06d2326a3d5b4ad.jpg",
        fichesPDF: [],
        fullDesc: "Le Baffle Acoustique Vertical Suspendu d'Isolsolutions est la solution idéale pour réduire la réverbération dans les grands volumes architecturaux : halls d'entrée, restaurants, open-spaces, centres commerciaux. Fabriqué en laine minérale haute densité enveloppée de tissu acoustique décoratif, il offre une absorption sur les deux faces. La fixation par câbles acier inoxydables permet une installation flexible et élégante. Ses dimensions de 1200×300 mm et son épaisseur de 50 mm en font un équipement performant et discret.",
        advantages: [
            "Absorption double face — efficacité maximale",
            "Réduction significative de la réverbération",
            "Fixation par câbles acier inoxydable",
            "Tissu décoratif acoustique au choix",
            "Idéal grands espaces, halls, open-spaces",
            "Format compact : 1200×300×50 mm"
        ],
        specs: {
            "Dimensions": "1200 × 300 mm",
            "Épaisseur": "50 mm",
            "Densité": "60 kg/m³",
            "Coefficient d'absorption αw": "0.80 (montage A)",
            "Classement au feu": "A2-s1,d0",
            "Fixation": "Câbles acier inoxydable"
        },
        seoKeywords: "baffle acoustique suspendu, réduction réverbération open space, panneau acoustique suspendu hall, Isolsolutions Maroc"
    },

    // ===================================
    // LAINE DE ROCHE
    // ===================================
    {
        id: "rockwool-rockfacade",
        category: "laine-de-roche",
        title: "Rockwool Rockfaçade",
        shortDesc: "Panneau laine de roche mono-densité non revêtu pour l'isolation thermique par l'extérieur (ITE) sous bardage ventilé — incombustible A1.",
        badge: "Façade ventilée",
        image: "assets/images/products/laine-de-roche/rockwool-rockfacade/main.png",
        images: ["assets/images/products/laine-de-roche/rockwool-rockfacade/main.png"],
        fichesPDF: [
            { label: "Fiche technique Rockwool Rockfaçade", path: "data_produits/Laine de roche/Fiche produit Rockfaçade.pdf" }
        ],
        fullDesc: "Le Rockwool Rockfaçade est un panneau en laine de roche mono-densité non revêtu, spécialement conçu pour l'isolation thermique par l'extérieur (ITE) des façades ventilées sous bardage rapporté avec lame d'air. Incombustible classé Euroclasse A1, il associe sécurité incendie maximale et haute performance énergétique avec une conductivité thermique λ = 0,035 W/m·K. Léger et stable dans le temps, il ne se déforme pas et conserve ses propriétés isolantes pendant des décennies. Avec seulement 2 fixations par panneau, sa pose est rapide et économique. Répulsif à l'eau, il protège durablement la structure du bâtiment contre l'humidité. Idéal pour les projets neufs et de rénovation au Maroc recherchant une isolation thermique et acoustique durable, performante et certifiée ACERMI. Dimensions 1350 × 600 mm, épaisseurs disponibles de 40 à 240 mm (R jusqu'à 6,85 m²·K/W).",
        advantages: [
            "Incombustible Euroclasse A1 — sécurité incendie façade maximale",
            "Conductivité thermique λ = 0,035 W/m·K — haute performance énergétique",
            "Panneau léger, pose rapide avec seulement 2 fixations/panneau",
            "Ne se déforme pas, conserve ses performances pendant des décennies",
            "Répulsif à l'eau — protège durablement la structure",
            "Certifié ACERMI 02/015/027 & KEYMARK — conformité garantie"
        ],
        specs: {
            "Marque": "Rockwool",
            "Type de produit": "Panneau mono-densité non revêtu (ITE)",
            "Masse volumique": "35 à 39 kg/m³",
            "Conductivité thermique λ": "0,035 W/m·K",
            "Classement au feu": "A1 — Incombustible (Euroclasse)",
            "Dimensions": "1350 × 600 mm",
            "Épaisseurs disponibles": "40 à 240 mm",
            "Résistance thermique R": "1,10 à 6,85 m²·K/W",
            "Stabilité dimensionnelle": "T3",
            "Certifications": "ACERMI 02/015/027 · KEYMARK 008-SDG5-027 · DoP CPR-DoP-FR-019"
        },
        seoKeywords: "Rockwool Rockfaçade Maroc, panneau laine de roche façade ventilée, isolation thermique par l'extérieur ITE Maroc, panneau isolant bardage incombustible A1, isolation thermique et acoustique façade, Isolsolutions"
    },
    {
        id: "rockwool-rockmur-kraft",
        category: "laine-de-roche",
        title: "Rockwool Rockmur Kraft",
        shortDesc: "Panneau laine de roche revêtu d'un kraft polyéthylène pour l'isolation des murs par l'intérieur en contre-cloison — Rw 42 dB.",
        badge: "Murs intérieurs",
        image: "assets/images/products/laine-de-roche/rockwool-rockmur-kraft/main.png",
        images: ["assets/images/products/laine-de-roche/rockwool-rockmur-kraft/main.png"],
        fichesPDF: [
            { label: "Fiche technique Rockwool Rockmur Kraft", path: "data_produits/Laine de roche/Fiche produit Rockmur kraft.pdf" }
        ],
        fullDesc: "Le Rockwool Rockmur Kraft est un panneau de laine de roche revêtu d'un pare-vapeur kraft polyéthylène, référence de la gamme « Les Essentiels » pour l'isolation thermique et acoustique des murs par l'intérieur en contre-cloison. Souple et léger, il se pose rapidement entre ossatures et montants, sans contrainte et avec très peu de perte de surface intérieure. Avec une conductivité thermique λ = 0,035 W/m·K et une réaction au feu A1 (âme nue incombustible), il offre un excellent compromis performance/confort. Sa performance acoustique est remarquable : associé à une plaque BA13, le Rockmur 40 mm atteint un affaiblissement Rw = 42 (-4 ; -10) dB et un indice Ra de 38 dB. Classé A+ pour la qualité de l'air intérieur, il garantit un intérieur sain. Idéal pour l'isolation des murs périphériques, contre-cloisons maçonnées ou sur ossature, garages et abris au Maroc. Dimensions 1350 × 600 mm, épaisseurs de 40 à 140 mm.",
        advantages: [
            "Isolation thermique et acoustique combinée — Rw 42 dB avec BA13",
            "Revêtement kraft polyéthylène intégré — pare-vapeur et pose facilitée",
            "Conductivité thermique λ = 0,035 W/m·K",
            "Âme incombustible A1 — sécurité incendie",
            "Classé A+ — meilleur classement qualité de l'air intérieur",
            "Pose rapide entre ossatures avec peu de perte de surface"
        ],
        specs: {
            "Marque": "Rockwool",
            "Type de produit": "Panneau revêtu kraft polyéthylène (contre-cloison)",
            "Masse volumique": "40 kg/m³ (40 mm) · 32 kg/m³ (45 à 140 mm)",
            "Conductivité thermique λ": "0,035 W/m·K",
            "Classement au feu": "Âme nue : A1 / kraft : NPD",
            "Performance acoustique": "Rw = 42 (-4 ; -10) dB · Ra 38 dB (40 mm + BA13)",
            "Dimensions": "1350 × 600 mm",
            "Épaisseurs disponibles": "40 à 140 mm",
            "Résistance thermique R": "1,10 à 4,00 m²·K/W",
            "Étiquetage sanitaire": "A+",
            "Certifications": "ACERMI 02/015/025 · KEYMARK 008-SDG5-025 · DoP CPR-DoP-FR-028"
        },
        seoKeywords: "Rockwool Rockmur Kraft Maroc, panneau laine de roche mur intérieur, isolation phonique contre-cloison, isolation acoustique mur Rw 42 dB, panneau kraft pare-vapeur, isolation thermique et acoustique Maroc, Isolsolutions"
    },
    {
        id: "rockwool-rocksono-base",
        category: "laine-de-roche",
        title: "Rockwool RockSono Base",
        shortDesc: "Panneau léger et souple de laine de roche pour l'isolation acoustique et thermique des cloisons et constructions à ossature bois ou métallique.",
        badge: "Cloisons & bois",
        image: "assets/images/products/laine-de-roche/rockwool-rocksono-base/main.png",
        images: ["assets/images/products/laine-de-roche/rockwool-rocksono-base/main.png"],
        fichesPDF: [
            { label: "Fiche technique Rockwool RockSono Base", path: "data_produits/Laine de roche/fiche-technique-rocksono-base-fr.pdf" }
        ],
        fullDesc: "Le Rockwool RockSono Base est un panneau léger et souple de laine de roche (environ 35 kg/m³) conçu pour l'isolation thermique, acoustique et anti-feu par remplissage de cloisons intérieures à structure bois ou métallique, de contre-cloisons, ainsi que pour les constructions en bois (sols, cloisons et plafonds). Excellent absorbant acoustique, il augmente significativement l'isolation phonique de la paroi avec un coefficient d'absorption acoustique αw atteignant 1,00. Classé Euroclasse A1, il est totalement incombustible et résiste à des températures supérieures à 1 000 °C sans dégager de fumées toxiques. Sa conductivité thermique λ = 0,037 W/m·K et l'absence de joints entre panneaux évitent les ponts thermiques et garantissent des performances constantes pendant toute la durée de vie du bâtiment. Répulsif à l'eau, non hygroscopique et entièrement recyclable, il constitue une solution d'isolation saine et durable pour les projets au Maroc. Dimensions 1200 × 600 mm, épaisseurs de 40 à 200 mm (RD jusqu'à 5,40 m²·K/W).",
        advantages: [
            "Excellent absorbant acoustique — αw jusqu'à 1,00",
            "Incombustible Euroclasse A1 — résiste à plus de 1 000 °C",
            "Conductivité thermique λ = 0,037 W/m·K",
            "Panneau léger et souple — montage aisé et rapide",
            "Pas de joint entre panneaux — aucun pont thermique",
            "Matériau naturel entièrement recyclable et sain"
        ],
        specs: {
            "Marque": "Rockwool",
            "Type de produit": "Panneau léger et souple (cloisons & ossatures)",
            "Masse volumique": "≈ 35 kg/m³",
            "Conductivité thermique λ": "0,037 W/m·K",
            "Classement au feu": "A1 — Incombustible (Euroclasse)",
            "Absorption acoustique αw": "jusqu'à 1,00",
            "Facteur de résistance à la vapeur μ": "≈ 1,0",
            "Dimensions": "1200 × 600 mm",
            "Épaisseurs disponibles": "40 à 200 mm",
            "Résistance thermique RD": "1,05 à 5,40 m²·K/W",
            "Certification": "Marquage CE (NBN EN 13501-1)"
        },
        seoKeywords: "Rockwool RockSono Base Maroc, panneau laine de roche cloison, isolation acoustique cloison ossature bois, isolation phonique cloison métallique, absorption acoustique laine de roche, isolation thermique et acoustique Maroc, Isolsolutions"
    },
    {
        id: "rockwool-rocksate-duo-plus",
        category: "laine-de-roche",
        title: "Rockwool Rocksate Duo Plus",
        shortDesc: "Panneau laine de roche double densité non revêtu pour les systèmes d'isolation thermique par l'extérieur (ITE / SATE) sous enduit.",
        badge: "ITE sous enduit",
        image: "assets/images/products/laine-de-roche/rockwool-rocksate-duo-plus/main.png",
        images: ["assets/images/products/laine-de-roche/rockwool-rocksate-duo-plus/main.png"],
        fichesPDF: [
            { label: "Fiche technique Rockwool Rocksate Duo Plus", path: "data_produits/Laine de roche/ft_rocksate-duo-plus_fr.pdf" }
        ],
        fullDesc: "Le Rockwool Rocksate Duo Plus est un panneau en laine de roche double densité, non revêtu, dédié aux systèmes composites d'isolation thermique par l'extérieur des façades sous enduit (ITE / SATE), en construction neuve comme en réhabilitation. Sa face surdensifiée — repérée par un marquage à deux lignes verticales — assure une adhérence optimale de l'enduit et une excellente tenue mécanique, tandis que la couche interne de densité inférieure optimise les performances thermiques et l'adaptation au support. Avec une conductivité thermique λ = 0,035 W/m·K, une réaction au feu A1 incombustible et une résistance à la compression CS(10) de 15 kPa, il garantit durabilité, stabilité dimensionnelle et sécurité incendie. Chimiquement inerte, il ne favorise ni la corrosion ni le développement bactérien. Solution idéale pour les façades isolées sous enduit au Maroc exigeant performance énergétique et finition soignée. Dimensions 1200 × 600 mm, épaisseurs de 50 à 200 mm (R jusqu'à 5,70 m²·K/W).",
        advantages: [
            "Double densité : face dure pour l'enduit + âme isolante performante",
            "Conductivité thermique λ = 0,035 W/m·K — haute performance",
            "Incombustible A1 — ne contribue jamais à la propagation du feu",
            "Résistance à la compression CS(10) 15 kPa — tenue mécanique",
            "Stabilité dimensionnelle parfaite, même en teintes sombres",
            "Chimiquement inerte — pas de corrosion ni de bactéries"
        ],
        specs: {
            "Marque": "Rockwool",
            "Type de produit": "Panneau double densité non revêtu (ITE sous enduit)",
            "Masse volumique": "70 / 120 kg/m³ (double densité)",
            "Conductivité thermique λ": "0,035 W/m·K",
            "Classement au feu": "A1 — Incombustible (Euroclasse)",
            "Dimensions": "1200 × 600 mm",
            "Épaisseurs disponibles": "50 à 200 mm",
            "Résistance thermique R": "1,40 à 5,70 m²·K/W",
            "Résistance à la compression": "CS(10) 15 kPa",
            "Charge ponctuelle": "PL(5) 200 N",
            "Résistance à la traction": "TR 7,5 kPa"
        },
        seoKeywords: "Rockwool Rocksate Duo Plus Maroc, panneau laine de roche double densité, isolation thermique par l'extérieur sous enduit SATE, ITE façade laine de roche, panneau isolant enduit incombustible, isolation thermique Maroc, Isolsolutions"
    },
    {
        id: "rockwool-sonorock-plus",
        category: "laine-de-roche",
        title: "Rockwool Sonorock Plus",
        shortDesc: "Panneau semi-rigide de laine de roche non revêtu haute performance acoustique (λ = 0,033 W/m·K) pour cloisons et doublages intérieurs.",
        badge: "Confort acoustique",
        image: "assets/images/products/laine-de-roche/rockwool-sonorock-plus/main.png",
        images: ["assets/images/products/laine-de-roche/rockwool-sonorock-plus/main.png"],
        fichesPDF: [
            { label: "Fiche technique Rockwool Sonorock Plus", path: "data_produits/Laine de roche/ft_sonorock-plus_es.pdf" }
        ],
        fullDesc: "Le Rockwool Sonorock Plus est un panneau semi-rigide de laine de roche non revêtu, optimisé pour le confort acoustique et thermique des cloisons intérieures verticales, des doublages (trasdossages) et des partitions horizontales sur faux-plafond. Fabriqué avec la technologie NyRock, il offre l'une des meilleures conductivités thermiques de sa catégorie (λ = 0,033 W/m·K) pour une densité de 50 kg/m³, garantissant une isolation thermique et phonique optimale. Classé Euroclasse A1, il assure une sécurité maximale en cas d'incendie. Sa bonne maniabilité et son adaptabilité facilitent une installation rapide et fiable. Certifié Eurofins Gold (faibles émissions) et doté d'une Déclaration Environnementale de Produit (DAP/EPD), il répond aux exigences de santé et de durabilité des projets au Maroc. Dimensions 1350 × 600 mm (ou 1350 × 400 mm), épaisseurs de 40 à 140 mm (R jusqu'à 4,20 m²·K/W).",
        advantages: [
            "Conductivité thermique λ = 0,033 W/m·K — parmi les meilleures du marché",
            "Optimal pour l'isolation acoustique et thermique des cloisons",
            "Incombustible Euroclasse A1 — sécurité incendie maximale",
            "Technologie NyRock — densité maîtrisée et maniabilité",
            "Certifié Eurofins Gold — faibles émissions, intérieur sain",
            "Déclaration Environnementale de Produit (DAP/EPD) disponible"
        ],
        specs: {
            "Marque": "Rockwool",
            "Type de produit": "Panneau semi-rigide non revêtu (NyRock)",
            "Masse volumique": "50 kg/m³",
            "Conductivité thermique λ": "0,033 W/m·K",
            "Classement au feu": "A1 — Incombustible (Euroclasse)",
            "Dimensions": "1350 × 600 mm · 1350 × 400 mm",
            "Épaisseurs disponibles": "40 à 140 mm",
            "Résistance thermique R": "1,20 à 4,20 m²·K/W",
            "Stabilité dimensionnelle": "T3",
            "Certifications": "Eurofins Gold · DAP/EPD"
        },
        seoKeywords: "Rockwool Sonorock Plus Maroc, panneau laine de roche acoustique, isolation phonique cloison doublage, laine de roche lambda 0.033, isolation acoustique faux plafond, isolation thermique et acoustique Maroc, Isolsolutions"
    },
    {
        id: "volcalis-comfort-panneau",
        category: "laine-de-roche",
        title: "Volcalis Comfort Panneau",
        shortDesc: "Panneau de laine minérale compact pour systèmes de construction secs : cloisons, doublages de murs intérieurs et plafonds.",
        badge: "Polyvalent",
        image: "assets/images/products/laine-de-roche/volcalis-comfort-panneau/main.png",
        images: ["assets/images/products/laine-de-roche/volcalis-comfort-panneau/main.png"],
        fichesPDF: [
            { label: "Fiche technique Volcalis Comfort Panneau", path: "data_produits/Laine de roche/FicheTechnique_Volcalis_ComfortPanneau.pdf" }
        ],
        fullDesc: "Le Volcalis Comfort Panneau est un panneau de laine minérale compact, facile à manipuler et doux au toucher, conçu pour tous les systèmes de construction secs : cloisons, doublages (revêtements des murs par l'intérieur) et plafonds. Excellent isolant à la fois thermique et acoustique, il contribue au confort des bâtiments tout en réduisant la consommation d'énergie. Grâce à sa structure interne, il offre une absorption acoustique remarquable : coefficient αw de 0,85 (classe B) à 50 mm, atteignant 1,00 (classe A) à partir de 60 mm. Avec une conductivité thermique λ = 0,037 W/m·K et une réaction au feu A1 incombustible, il allie sécurité et performance. Issu d'un processus durable et 100 % recyclable, il représente une solution d'isolation thermique et acoustique écoresponsable idéale pour les travaux de construction et de réhabilitation au Maroc. Dimensions 1350 × 600 mm, épaisseurs de 50 à 120 mm (R jusqu'à 3,20 m²·K/W).",
        advantages: [
            "Double performance thermique et acoustique en une seule solution",
            "Absorption acoustique αw jusqu'à 1,00 (classe A dès 60 mm)",
            "Conductivité thermique λ = 0,037 W/m·K",
            "Incombustible A1 — ne conduit pas la chaleur, résiste au feu",
            "Doux au toucher et facile à manipuler — pose confortable",
            "100 % recyclable — processus de fabrication durable"
        ],
        specs: {
            "Marque": "Volcalis",
            "Type de produit": "Panneau de laine minérale (construction sèche)",
            "Conductivité thermique λ": "0,037 W/m·K",
            "Classement au feu": "A1 — Incombustible",
            "Absorption acoustique αw": "0,85 (50 mm) → 1,00 (≥ 60 mm)",
            "Dimensions": "1350 × 600 mm",
            "Épaisseurs disponibles": "50 · 60 · 70 · 90 · 100 · 120 mm",
            "Résistance thermique R": "1,35 à 3,20 m²·K/W",
            "Tolérance d'épaisseur": "T2",
            "Facteur de résistance à la vapeur μ": "1",
            "Code de désignation": "MW-EN13162-T2-MU1-AW0,85-AFr5"
        },
        seoKeywords: "Volcalis Comfort Panneau Maroc, panneau laine minérale cloison plafond, isolation acoustique doublage mur, isolation thermique construction sèche, panneau isolant incombustible A1, isolation thermique et acoustique Maroc, Isolsolutions"
    },
    {
        id: "volcalis-comfort-rouleau",
        category: "laine-de-roche",
        title: "Volcalis Comfort Rouleau",
        shortDesc: "Laine minérale souple en rouleau (largeurs 400 et 600 mm) pour l'isolation thermique et acoustique des systèmes de construction secs.",
        badge: "Économique",
        image: "assets/images/products/laine-de-roche/volcalis-comfort-rouleau/main.png",
        images: ["assets/images/products/laine-de-roche/volcalis-comfort-rouleau/main.png"],
        fichesPDF: [
            { label: "Fiche technique Volcalis Comfort Rouleau", path: "data_produits/Laine de roche/FicheTechnique_Volcalis_ComfortRouleau (1).pdf" }
        ],
        fullDesc: "Le Volcalis Comfort Rouleau est une laine minérale souple livrée en rouleau, disponible en largeurs de 400 et 600 mm, idéale pour l'isolation thermique et acoustique des systèmes de construction secs : cloisons, doublages de murs par l'intérieur et plafonds. Souple et doux au toucher, il se déroule, se découpe et se pose facilement, même dans les espaces difficiles d'accès, offrant un excellent rendement sur chantier. Grâce à sa structure interne, il assure une absorption acoustique élevée (αw de 0,85 à 1,00 selon l'épaisseur) et un très bon comportement thermique (λ = 0,037 W/m·K) qui réduit la consommation d'énergie du bâtiment. Classé A1 incombustible et 100 % recyclable, il constitue une solution d'isolation économique, performante et durable pour les projets de construction et de réhabilitation au Maroc. Épaisseurs de 50 à 90 mm (R jusqu'à 2,40 m²·K/W).",
        advantages: [
            "Format rouleau — déroulage rapide et grand rendement au m²",
            "Souple et facile à découper — pose simple même en accès difficile",
            "Conductivité thermique λ = 0,037 W/m·K",
            "Absorption acoustique αw jusqu'à 1,00",
            "Incombustible A1 — sécurité incendie",
            "Disponible en largeurs 400 et 600 mm · 100 % recyclable"
        ],
        specs: {
            "Marque": "Volcalis",
            "Type de produit": "Laine minérale souple en rouleau",
            "Conductivité thermique λ": "0,037 W/m·K",
            "Classement au feu": "A1 — Incombustible",
            "Absorption acoustique αw": "0,85 (50 mm) → 1,00 (≥ 60 mm)",
            "Largeurs disponibles": "400 mm · 600 mm",
            "Épaisseurs disponibles": "50 · 60 · 70 · 90 mm",
            "Résistance thermique R": "1,35 à 2,40 m²·K/W",
            "Tolérance d'épaisseur": "T2",
            "Facteur de résistance à la vapeur μ": "1"
        },
        seoKeywords: "Volcalis Comfort Rouleau Maroc, rouleau laine minérale isolation, isolation thermique acoustique cloison plafond, rouleau laine de roche économique, isolant souple incombustible A1, isolation thermique et acoustique Maroc, Isolsolutions"
    },
    {
        id: "terrawool-tw150",
        category: "laine-de-roche",
        title: "Terrawool TW150",
        shortDesc: "Panneau rigide de laine de roche haute densité (150 kg/m³) à haute résistance mécanique pour toitures et bardages.",
        badge: "Toiture & bardage",
        image: "assets/images/products/laine-de-roche/terrawool-tw150/main.png",
        images: ["assets/images/products/laine-de-roche/terrawool-tw150/main.png"],
        fichesPDF: [
            { label: "Fiche technique Terrawool TW150", path: "data_produits/Laine de roche/FICHE TECHNIQUE TERRAWOOL TW150_250512_134055 (1).pdf" }
        ],
        fullDesc: "Le Terrawool TW150 est un panneau rigide en laine de roche haute densité (150 kg/m³) à haute résistance mécanique, conçu pour les applications en toiture de bâtiment et en bardage. Sa rigidité lui permet d'être appliqué directement sur dalle béton ou sur toiture métallique, avec fixations mécaniques préalables des panneaux. Incombustible classé A1 (TS EN 13501-1), il garantit une sécurité incendie totale tout en assurant une isolation thermique efficace (λ = 0,039 W/m·K à 10 °C). Non revêtu, stable et robuste, il offre une excellente planéité de surface et une tenue parfaite sous contrainte. Livré emballé sous film polyéthylène rétracté sur palettes bois, il facilite la manutention et le stockage sur chantier. Solution de référence pour l'isolation des toitures-terrasses et des bardages industriels au Maroc. Dimensions 1200 × 600 mm, épaisseurs de 30 à 150 mm (R jusqu'à 3,80 m²·K/W).",
        advantages: [
            "Haute densité 150 kg/m³ — haute résistance mécanique",
            "Incombustible A1 — sécurité incendie totale (TS EN 13501-1)",
            "Conductivité thermique λ = 0,039 W/m·K",
            "Application sur dalle béton et toiture métallique",
            "Excellente planéité et stabilité dimensionnelle",
            "Conditionné sur palettes filmées — manutention facilitée"
        ],
        specs: {
            "Marque": "Terrawool",
            "Référence": "TW150 (TWE)",
            "Type de produit": "Panneau rigide non revêtu (toiture & bardage)",
            "Masse volumique": "150 kg/m³",
            "Conductivité thermique λ (10 °C)": "0,039 W/m·K",
            "Classement au feu": "A1 — Incombustible (TS EN 13501-1)",
            "Dimensions": "1200 × 600 mm",
            "Épaisseurs disponibles": "30 · 40 · 50 · 60 · 70 · 80 · 100 · 120 · 150 mm",
            "Résistance thermique R": "0,75 à 3,80 m²·K/W",
            "Tolérance d'épaisseur": "T3",
            "Norme": "TS EN 13162"
        },
        seoKeywords: "Terrawool TW150 Maroc, panneau rigide laine de roche toiture, isolation toiture terrasse laine de roche, panneau bardage haute densité, isolation thermique toiture incombustible A1, isolation thermique Maroc, Isolsolutions"
    },
    {
        id: "glasrock-panneau-kraft",
        category: "laine-de-roche",
        title: "Glasrock Panneau Kraft",
        shortDesc: "Panneau de laine de roche semi-rigide revêtu kraft (conforme ASTM C612) pour l'isolation thermique et le calorifugeage industriel.",
        badge: "Industriel",
        image: "assets/images/products/laine-de-roche/glasrock-panneau-kraft/main.png",
        images: ["assets/images/products/laine-de-roche/glasrock-panneau-kraft/main.png"],
        fichesPDF: [
            { label: "Fiche technique Glasrock Panneau Kraft", path: "data_produits/Laine de roche/fiche technique panneaux kraft glasse rock.pdf" }
        ],
        fullDesc: "Le Glasrock Panneau Kraft est un panneau de laine de roche semi-rigide revêtu d'un papier kraft (kraft paper), conforme à la norme américaine ASTM C612, destiné à l'isolation thermique des bâtiments et au calorifugeage industriel. D'une densité de 50 kg/m³, il offre une conductivité thermique de 0,035 W/m·K à 24 °C et conserve d'excellentes performances à haute température (0,108 W/m·K à 371 °C), ce qui le rend adapté aux équipements et parois chaudes. Non combustible (ASTM E136), il résiste au feu avec un indice de propagation de flamme et de développement de fumée très faibles. Semi-rigide et résistant à la corrosion, il absorbe moins de 5 % d'humidité, garantissant la stabilité de ses performances dans le temps. Solution robuste pour l'isolation thermique et acoustique des murs, équipements industriels et installations techniques au Maroc. Dimensions 1200 × 600 mm, épaisseur type 50 mm.",
        advantages: [
            "Conforme ASTM C612 — qualité industrielle certifiée",
            "Performances maintenues à haute température (jusqu'à 371 °C)",
            "Non combustible ASTM E136 — sécurité incendie",
            "Revêtement kraft — pare-vapeur et mise en œuvre facilitée",
            "Absorption d'humidité < 5 % — performances stables dans le temps",
            "Semi-rigide et résistant à la corrosion"
        ],
        specs: {
            "Marque": "Glasrock",
            "Type de produit": "Panneau semi-rigide revêtu kraft (ASTM C612)",
            "Masse volumique": "50 kg/m³",
            "Conductivité thermique λ (24 °C)": "0,035 W/m·K",
            "Conductivité thermique λ (371 °C)": "0,108 W/m·K",
            "Classement au feu": "Non combustible (ASTM E136)",
            "Dimensions": "1200 × 600 mm",
            "Épaisseur type": "50 mm",
            "Absorption de vapeur d'eau": "< 5 % (1,5 % mesuré)",
            "Rigidité": "Semi-rigide",
            "Norme": "ASTM C612 · C177/C518 · E136"
        },
        seoKeywords: "Glasrock Panneau Kraft Maroc, panneau laine de roche kraft ASTM C612, isolation thermique industrielle laine de roche, calorifugeage panneau kraft, panneau isolant non combustible, isolation thermique et acoustique Maroc, Isolsolutions"
    },

    // ===================================
    // PORTES ISOLÉES
    // ===================================
    {
        id: "porte-acoustique-rw35",
        category: "portes-isolees",
        title: "Porte Acoustique Rw 35 dB",
        shortDesc: "Porte acoustique standard Rw 35 dB — solution phonique performante pour bureaux et espaces tertiaires.",
        badge: "Standard",
        image: "assets/images/solution-images/portes-isolees.png",
        fichesPDF: [],
        fullDesc: "La Porte Acoustique Rw 35 dB d'Isolsolutions est la solution de référence pour les projets nécessitant une isolation phonique standard mais efficace. Son âme en panneaux multicouches (laine minérale + plaques haute densité) garantit un affaiblissement acoustique Rw = 35 dB certifié. Son huisserie métallique avec joints périphériques compressibles et son seuil automatique rétractable assurent une étanchéité acoustique optimale à l'ouverture comme à la fermeture. Finition laquée RAL au choix.",
        advantages: [
            "Affaiblissement Rw = 35 dB — certification acoustique",
            "Seuil automatique rétractable — étanchéité parfaite",
            "Joints périphériques compressibles intégrés",
            "Finition laquée RAL — personnalisable",
            "Âme multicouche laine minérale + plaques HD",
            "Norme EN ISO 10140 — conformité certifiée"
        ],
        specs: {
            "Indice d'affaiblissement Rw": "35 dB",
            "Épaisseur de la porte": "54 mm",
            "Huisserie": "Métallique",
            "Finition": "Laquée RAL",
            "Seuil": "Automatique rétractable",
            "Norme de test": "EN ISO 10140"
        },
        seoKeywords: "porte acoustique Rw 35 dB, porte phonique bureau, porte isolation sonore, Isolsolutions Maroc"
    },
    {
        id: "porte-acoustique-rw42",
        category: "portes-isolees",
        title: "Porte Acoustique Rw 42 dB",
        shortDesc: "Porte haute performance Rw 42 dB — locaux techniques, salles de musique, hôpitaux.",
        badge: "Performance",
        image: "assets/images/solution-images/portes-isolees.png",
        fichesPDF: [],
        fullDesc: "La Porte Acoustique Rw 42 dB d'Isolsolutions est conçue pour les environnements nécessitant une isolation phonique haute performance. Sa double paroi avec âme multicouche renforcée et ses triple joints périphériques garantissent un affaiblissement acoustique exceptionnel. Le seuil automatique à double lèvre assure une étanchéité parfaite. Idéale pour les locaux techniques, salles de musique, studios de répétition et établissements de santé. Disponible en simple ou double vantail.",
        advantages: [
            "Affaiblissement Rw = 42 dB — haute performance",
            "Triple joints périphériques — étanchéité renforcée",
            "Seuil automatique double lèvre",
            "Simple ou double vantail selon besoin",
            "Idéale studios, hôpitaux, locaux techniques",
            "Certification EN ISO 10140"
        ],
        specs: {
            "Indice d'affaiblissement Rw": "42 dB",
            "Épaisseur de la porte": "68 mm",
            "Joints": "Triple périphérique",
            "Configuration": "Simple ou double vantail",
            "Norme de test": "EN ISO 10140"
        },
        seoKeywords: "porte acoustique Rw 42 dB haute performance, porte phonique studio hôpital, isolation sonore locaux techniques, Isolsolutions"
    },
    {
        id: "porte-acoustique-rw50",
        category: "portes-isolees",
        title: "Porte Acoustique Rw 50 dB — Ultra Premium",
        shortDesc: "Isolation phonique maximum Rw 50 dB — studios d'enregistrement, audiométrie, chambres anéchoïques.",
        badge: "Ultra Premium",
        image: "assets/images/solution-images/portes-isolees.png",
        fichesPDF: [],
        fullDesc: "La Porte Acoustique Ultra-Premium Rw 50 dB d'Isolsolutions représente le summum de l'isolation phonique disponible sur le marché. Sa construction massive en composite multi-matériaux, ses quadruple joints d'étanchéité et son seuil motorisé garantissent une barrière sonique quasi totale. Destinée exclusivement aux environnements à exigences critiques : studios d'enregistrement professionnels, salles d'audiométrie médicale, chambres anéchoïques et laboratoires acoustiques. Fabriquée sur mesure.",
        advantages: [
            "Affaiblissement Rw = 50 dB — performance maximale",
            "Construction composite massive multi-matériaux",
            "Quadruple joints d'étanchéité",
            "Seuil motorisé — étanchéité automatique",
            "Studios d'enregistrement et audiométrie médicale",
            "Fabrication sur mesure uniquement"
        ],
        specs: {
            "Indice d'affaiblissement Rw": "50 dB",
            "Épaisseur de la porte": "90 mm",
            "Poids approximatif": "~120 kg/m²",
            "Seuil": "Motorisé",
            "Norme de test": "EN ISO 10140",
            "Fabrication": "Sur mesure"
        },
        seoKeywords: "porte acoustique Rw 50 dB ultra premium, porte studio enregistrement, isolation phonique maximale, chambre anéchoïque, Isolsolutions"
    },
    {
        id: "porte-coupe-feu-ei60",
        category: "portes-isolees",
        title: "Porte Coupe-Feu EI60 + Acoustique Rw 38 dB",
        shortDesc: "Double protection : coupe-feu EI60 certifié et acoustique Rw 38 dB — conformité réglementation incendie.",
        badge: "Sécurité",
        image: "assets/images/solution-images/portes-isolees.png",
        fichesPDF: [],
        fullDesc: "La Porte Coupe-Feu EI60 Acoustique d'Isolsolutions combine deux protections essentielles : une résistance au feu de 60 minutes (EI60) et une isolation acoustique Rw 38 dB. Son âme en laine de roche haute densité entre panneaux acier garantit l'efficacité coupe-feu, tandis que les joints périphériques intumescents assurent l'étanchéité aux fumées. Le ferme-porte hydraulique intégré assure la fermeture automatique. Certifiée EN 1634-1 et EN ISO 10140.",
        advantages: [
            "Coupe-feu EI60 — 60 minutes de protection",
            "Isolation acoustique Rw = 38 dB",
            "Ferme-porte hydraulique intégré",
            "Joints intumescents — étanchéité aux fumées",
            "Âme laine de roche haute densité",
            "Double certification EN 1634-1 / EN ISO 10140"
        ],
        specs: {
            "Résistance au feu": "EI60",
            "Indice d'affaiblissement Rw": "38 dB",
            "Épaisseur": "72 mm",
            "Normes": "EN 1634-1 / EN ISO 10140",
            "Ferme-porte": "Hydraulique intégré"
        },
        seoKeywords: "porte coupe-feu EI60 acoustique, porte coupe-feu phonique, protection incendie isolation sonore, Isolsolutions Maroc"
    },
    {
        id: "porte-coulissante-acoustique",
        category: "portes-isolees",
        title: "Porte Coulissante Acoustique Rw 32 dB",
        shortDesc: "Porte coulissante gain de place avec isolation phonique Rw 32 dB — hôtels, bureaux, cloisons mobiles.",
        badge: "Design",
        image: "assets/images/solution-images/portes-isolees.png",
        fichesPDF: [],
        fullDesc: "La Porte Coulissante Acoustique Rw 32 dB d'Isolsolutions est la solution idéale pour les espaces où le gain de place est primordial sans compromis sur l'isolation phonique. Son système de compression latérale et inférieure automatique garantit une étanchéité acoustique optimale en position fermée. Le rail supérieur en aluminium assure un glissement silencieux. Disponible en finitions bois, laqué ou verre. Parfaite pour hôtels, bureaux modernes et cloisons mobiles.",
        advantages: [
            "Coulissante — gain de place optimal",
            "Rw = 32 dB — isolation phonique certifiée",
            "Compression automatique latérale et inférieure",
            "Finitions multiples : bois, laqué, verre",
            "Rail aluminium anodisé — glissement silencieux",
            "Idéale hôtels, bureaux et cloisons mobiles"
        ],
        specs: {
            "Indice d'affaiblissement Rw": "32 dB",
            "Type": "Coulissante",
            "Rail": "Aluminium anodisé",
            "Finitions": "Bois, Laqué, Verre",
            "Largeur maximale": "1400 mm"
        },
        seoKeywords: "porte coulissante acoustique Rw 32, porte phonique coulissante hôtel bureau, cloison mobile acoustique, Isolsolutions"
    },

    // ===================================
    // REVÊTEMENTS TECHNIQUES
    // ===================================
    {
        id: "revetement-mousse-melamine",
        category: "revetements-techniques",
        title: "Mousse Mélamine Acoustique",
        shortDesc: "Mousse légère ultra-performante — absorption large bande pour habillage de machines et capotages.",
        badge: "Léger",
        image: "data_produits/revetement murale/picture.png",
        fichesPDF: [],
        fullDesc: "La Mousse Mélamine Acoustique d'Isolsolutions est un matériau d'absorption sonore ultra-performant à cellules ouvertes, d'une légèreté exceptionnelle (8–11 kg/m³). Elle offre une absorption acoustique αw = 0.95 à 50 mm d'épaisseur sur une large bande de fréquences. Son classement au feu B-s1,d0 et sa plage de température de -40°C à +200°C en font la solution idéale pour l'habillage intérieur de machines industrielles, capotages acoustiques et conduits techniques.",
        advantages: [
            "Ultra légère 8–11 kg/m³ — n'alourdit pas les structures",
            "Absorption αw = 0.95 (50mm) — large bande fréquences",
            "Classement feu B-s1,d0 — sécurité garantie",
            "Plage de service : -40°C à +200°C",
            "Facile à découper et à coller",
            "Idéale capotages machines et conduits"
        ],
        specs: {
            "Densité": "8–11 kg/m³",
            "Coefficient d'absorption αw (50mm)": "0.95",
            "Classement au feu": "B-s1,d0",
            "Température de service": "-40°C à +200°C",
            "Épaisseurs disponibles": "20 – 100 mm"
        },
        seoKeywords: "mousse mélamine acoustique, absorption sonore large bande, habillage machine acoustique, capotage phonique, Isolsolutions Maroc"
    },
    {
        id: "revetement-bitumineux",
        category: "revetements-techniques",
        title: "Membrane Bitumineuse Anti-Vibration",
        shortDesc: "Membrane autoadhésive en bitume polymère — amortissement vibratoire et bruits solidiens.",
        badge: "Industrie",
        image: "data_produits/revetement murale/picture.png",
        fichesPDF: [],
        fullDesc: "La Membrane Bitumineuse Anti-Vibration d'Isolsolutions est une membrane autoadhésive en bitume polymère chargé de minéraux à haute masse surfacique. Elle réduit efficacement les vibrations et les bruits structuraux (bruits solidiens) par simple application sur les surfaces métalliques. Idéale pour les carrosseries industrielles, machines vibrantes, cloisons métalliques et planchers de véhicules. Application à température ambiante, sans outillage spécifique.",
        advantages: [
            "Amortissement vibratoire très efficace",
            "Application autoadhésive — pose rapide et simple",
            "Réduit les bruits solidiens et les vibrations",
            "Compatible surfaces métalliques, acier, alu",
            "Masse surfacique élevée 4–8 kg/m²",
            "Découpe facile au cutter"
        ],
        specs: {
            "Masse surfacique": "4–8 kg/m²",
            "Épaisseur": "2–4 mm",
            "Type d'adhésif": "Autoadhésif",
            "Température de service": "-20°C à +100°C",
            "Application": "Surfaces métalliques"
        },
        seoKeywords: "membrane bitumineuse anti-vibration, amortisseur vibrations machine, bruit solidien, Isolsolutions Maroc isolation"
    },
    {
        id: "revetement-composite-alu",
        category: "revetements-techniques",
        title: "Panneau Composite Acoustique Aluminium",
        shortDesc: "Panneau sandwich alu/mousse/alu pour groupes électrogènes, HVAC et murs antibruit extérieurs.",
        badge: "Haute performance",
        image: "data_produits/revetement murale/picture.png",
        fichesPDF: [
            { label: "Fiche technique Panneaux Sandwich (Bardage)", path: "data_produits/Panneaux sandwish/FTB 1000 Bardage_250925_104531.pdf" },
            { label: "Fiche technique Isolation Sonore Panneaux", path: "data_produits/Panneaux sandwish/FTB Painel 120 MM e superiores - Ensaio Isolamento Sonoro .pdf" }
        ],
        fullDesc: "Le Panneau Composite Acoustique Aluminium d'Isolsolutions est un panneau sandwich aluminium/mousse acoustique/aluminium conçu pour les environnements extérieurs et les applications à fortes contraintes. Sa face extérieure en aluminium laqué résiste aux intempéries, aux UV et à la corrosion. Idéal pour l'habillage de groupes électrogènes, centrales HVAC, salles de machines et murs antibruit industriels. Absorption acoustique αw 0.75–0.90 selon configuration.",
        advantages: [
            "Structure sandwich alu/mousse/alu — double protection",
            "Résistant aux intempéries, UV et corrosion",
            "Absorption αw 0.75–0.90 — haute efficacité",
            "Idéal groupes électrogènes et centrales HVAC",
            "Finition aluminium laqué durable",
            "Assemblage par rivets — montage rapide"
        ],
        specs: {
            "Épaisseur totale": "30–80 mm",
            "Épaisseur aluminium": "0.8–1.5 mm",
            "Coefficient d'absorption αw": "0.75–0.90",
            "Résistance": "UV, corrosion, intempéries"
        },
        seoKeywords: "panneau composite acoustique aluminium, mur antibruit industriel, habillage groupe électrogène, panneau sandwich phonique, Isolsolutions"
    },
    {
        id: "revetement-mousse-pu",
        category: "revetements-techniques",
        title: "Mousse Polyuréthane Pyramidale — Studio",
        shortDesc: "Mousse PU profilée pyramidale pour correction acoustique — studios, home-cinémas et salles musique.",
        badge: "Studio",
        image: "data_produits/revetement murale/picture.png",
        fichesPDF: [],
        fullDesc: "La Mousse Polyuréthane Pyramidale d'Isolsolutions est conçue pour la correction acoustique intérieure des espaces dédiés au son. Son profil pyramidal (nid d'abeille) absorbe progressivement les fréquences moyennes et hautes, éliminant les réflexions parasites et les effets d'écho. En finition gris anthracite élégante, elle s'intègre dans les studios d'enregistrement, home-cinémas, salles de musique et espaces multimédia. Pose par collage en néoprène.",
        advantages: [
            "Profil pyramidal — absorption progressive",
            "Correction acoustique des fréquences moyennes/hautes",
            "Élimine les échos et réflexions parasites",
            "Finition gris anthracite — esthétique studio",
            "Studios, home-cinémas et salles musique",
            "Pose par collage — installation simple"
        ],
        specs: {
            "Densité": "30 kg/m³",
            "Profil": "Pyramidal 50 mm",
            "Coefficient d'absorption αw (50mm)": "0.65",
            "Dimensions": "1000 × 1000 mm",
            "Couleur": "Gris anthracite"
        },
        seoKeywords: "mousse pyramidale studio, correction acoustique home cinéma, mousse PU acoustique, traitement phonique studio, Isolsolutions"
    },
    {
        id: "revetement-fibre-polyester",
        category: "revetements-techniques",
        title: "Panneau Fibre Polyester PET Recyclé",
        shortDesc: "Panneau acoustique 100% PET recyclé — 12 coloris, sans formaldéhyde, idéal espaces éducatifs.",
        badge: "Éco",
        image: "data_produits/revetement murale/PET ???? 1.png",
        fichesPDF: [
            { label: "Fiche technique Panneaux Muraux Isolsolutions", path: "data_produits/revetement murale/Panneaux Muraux IsolMaroc (Technical Datasheet).pdf" }
        ],
        fullDesc: "Le Panneau Fibre Polyester PET Recyclé d'Isolsolutions est la solution acoustique écoresponsable par excellence. Fabriqué à 100% à partir de bouteilles PET recyclées, il ne contient ni formaldéhyde, ni irritants chimiques. Son absorption acoustique αw = 0.80 à 50 mm en fait un matériau performant et sain. Disponible en 12 coloris pour s'adapter à tous les projets de design intérieur. Classement feu B-s1,d0. Idéal pour les espaces éducatifs, crèches, bureaux et lieux de vie.",
        advantages: [
            "100% PET recyclé — démarche environnementale",
            "Sans formaldéhyde — sain pour les utilisateurs",
            "12 coloris disponibles — design et personnalisation",
            "Classement feu B-s1,d0 — conformité ERP",
            "Léger et facile à découper et à poser",
            "Idéal crèches, écoles, bureaux, lieux de vie"
        ],
        specs: {
            "Matière": "Fibre PET 100% recyclée",
            "Densité": "40 kg/m³",
            "Coefficient d'absorption αw (50mm)": "0.80",
            "Épaisseurs disponibles": "9–50 mm",
            "Coloris": "12 teintes disponibles",
            "Classement au feu": "B-s1,d0"
        },
        seoKeywords: "panneau PET recyclé acoustique, isolation phonique écologique, panneau acoustique coloré bureau école, Isolsolutions Maroc"
    },

    // ===================================
    // ISOLATION MACHINES INDUSTRIELLES
    // ===================================
    {
        id: "capotage-acoustique-compresseur",
        category: "isolation-industrielle",
        title: "Capotage Acoustique pour Compresseur",
        shortDesc: "Capotage sur mesure pour compresseurs industriels — réduction sonore de 15 à 25 dB(A).",
        badge: "Sur mesure",
        image: "assets/images/solution-images/isolation-machines.png",
        fichesPDF: [],
        fullDesc: "Le Capotage Acoustique pour Compresseur d'Isolsolutions est une solution sur mesure en panneaux sandwich acier/laine de roche, conçue pour réduire le bruit des compresseurs d'air industriels de 15 à 25 dB(A). Les panneaux sont démontables pour permettre la maintenance sans outil spécial. La ventilation intégrée avec silencieux maintient le fonctionnement optimal de la machine tout en contrôlant les émissions sonores. Traitement anti-corrosion en finition standard.",
        advantages: [
            "Réduction sonore de 15–25 dB(A) mesurée",
            "Panneaux démontables — maintenance facilitée",
            "Ventilation intégrée avec silencieux",
            "Traitement anti-corrosion en standard",
            "Fabriqué sur mesure selon dimensions machine",
            "Panneaux sandwich acier/laine de roche"
        ],
        specs: {
            "Réduction sonore": "15–25 dB(A)",
            "Panneaux": "Acier / Laine de Roche sandwich",
            "Ventilation": "Silencieux intégré",
            "Traitement de surface": "Anti-corrosion",
            "Fabrication": "Sur mesure"
        },
        seoKeywords: "capotage acoustique compresseur, réduction bruit industriel, isolation machine compresseur, Isolsolutions Maroc industrie"
    },
    {
        id: "ecran-acoustique-industriel",
        category: "isolation-industrielle",
        title: "Écran Acoustique Modulaire Industriel",
        shortDesc: "Écran autoportant modulaire — séparation de zones bruyantes, réduction jusqu'à 20 dB(A).",
        badge: "Modulaire",
        image: "assets/images/solution-images/isolation-machines.png",
        fichesPDF: [],
        fullDesc: "L'Écran Acoustique Modulaire Industriel d'Isolsolutions est un système autoportant de séparation des zones bruyantes en industrie. Ses panneaux en acier galvanisé / laine de roche 80 mm avec face absorbante perforée côté source de bruit réduisent les niveaux sonores jusqu'à 20 dB(A). Disponible en hauteurs standard de 2 à 4 m avec assemblage par boulonnage rapide, il peut être reconfigurée selon l'évolution des installations.",
        advantages: [
            "Autoportant et modulaire — reconfigurable",
            "Réduction jusqu'à 20 dB(A)",
            "Face absorbante perforée côté source de bruit",
            "Hauteur de 2 à 4 m selon besoin",
            "Assemblage rapide par boulonnage",
            "Acier galvanisé — durabilité industrielle"
        ],
        specs: {
            "Réduction sonore": "Jusqu'à 20 dB(A)",
            "Hauteurs disponibles": "2–4 m",
            "Panneau": "Acier galvanisé + Laine de roche 80mm",
            "Montage": "Boulonnage rapide"
        },
        seoKeywords: "écran acoustique industriel modulaire, séparation zones bruyantes usine, cloison antibruit industrie, Isolsolutions"
    },
    {
        id: "matelas-isolation-tuyauterie",
        category: "isolation-industrielle",
        title: "Matelas Isolant Démontable Tuyauteries HT",
        shortDesc: "Matelas démontable pour tuyauteries et vannes haute température jusqu'à 650°C — réutilisable.",
        badge: "Haute temp.",
        image: "assets/images/solution-images/isolation-machines.png",
        fichesPDF: [],
        fullDesc: "Le Matelas Isolant Démontable pour Tuyauteries Haute Température d'Isolsolutions est la solution d'isolation thermique réutilisable pour les réseaux industriels à haute température. Avec une résistance jusqu'à 650°C, il protège efficacement les tuyauteries, vannes et équipements des pertes thermiques. Son enveloppe en tissu de verre siliconé et sa fixation par bandes velcro inox permettent un démontage rapide lors des opérations de maintenance, sans destruction de l'isolation.",
        advantages: [
            "Résistance thermique jusqu'à 650°C",
            "Démontable et réutilisable — économie sur le long terme",
            "Âme en laine de roche ou fibre céramique",
            "Enveloppe tissu de verre siliconé résistant",
            "Fixation velcro inox — démontage rapide",
            "Maintenance sans destruction de l'isolation"
        ],
        specs: {
            "Température maximale": "650°C",
            "Âme isolante": "Laine de roche ou fibre céramique",
            "Enveloppe": "Tissu de verre siliconé",
            "Fixation": "Velcro inox"
        },
        seoKeywords: "matelas isolant tuyauterie haute température, isolation démontable HT, calorifuge démontable vanne, Isolsolutions industrie"
    },
    {
        id: "silencieux-ventilation",
        category: "isolation-industrielle",
        title: "Silencieux à Baffles pour Ventilation",
        shortDesc: "Silencieux à baffles parallèles pour gaines CVC — atténuation 15 à 35 dB selon fréquence.",
        badge: "HVAC",
        image: "assets/images/solution-images/isolation-machines.png",
        fichesPDF: [
            { label: "Fiche technique Toiture Acoustique Laine de Roche", path: "data_produits/Panneaux sandwish/TOITURE ACOUSTIQUE - LAINE DE ROCHE.pdf" }
        ],
        fullDesc: "Le Silencieux à Baffles pour Ventilation d'Isolsolutions est conçu pour réduire les nuisances sonores générées par les installations de ventilation et climatisation (CVC). Ses baffles en laine minérale haute densité enveloppée de tôle perforée offrent une atténuation de 15 à 35 dB selon la fréquence et la longueur du silencieux. Construction en acier galvanisé. Disponible en sections rectangulaires et circulaires sur mesure. Faible perte de charge.",
        advantages: [
            "Atténuation 15–35 dB selon fréquence",
            "Baffles en laine minérale HD + tôle perforée",
            "Sections rectangulaires et circulaires disponibles",
            "Construction acier galvanisé — durabilité",
            "Faible perte de charge aéraulique",
            "Dimensions sur mesure selon réseau CVC"
        ],
        specs: {
            "Atténuation sonore": "15–35 dB",
            "Baffles": "Laine Minérale HD + tôle perforée",
            "Construction": "Acier galvanisé",
            "Sections": "Rectangulaire / Circulaire",
            "Fabrication": "Sur mesure"
        },
        seoKeywords: "silencieux ventilation CVC, atténuation bruit gaine ventilation, silencieux à baffles acoustique, Isolsolutions Maroc HVAC"
    },
    {
        id: "revetement-anti-vibratoire",
        category: "isolation-industrielle",
        title: "Plots Anti-Vibratoires Machines",
        shortDesc: "Plots élastomères pour découplage vibratoire — charge unitaire de 50 à 5000 kg par plot.",
        badge: "Vibration",
        image: "assets/images/solution-images/isolation-machines.png",
        fichesPDF: [],
        fullDesc: "Les Plots Anti-Vibratoires Machines d'Isolsolutions sont des éléments de découplage vibratoire en élastomère technique, conçus pour isoler les machines industrielles des structures porteuses. Avec une charge unitaire de 50 à 5000 kg par plot et une fréquence de coupure de 8–15 Hz, ils absorbent efficacement les vibrations transmises par les machines rotatives, les groupes électrogènes et les compresseurs. Résistants aux huiles et solvants industriels.",
        advantages: [
            "Charge unitaire 50–5000 kg par plot",
            "Fréquence de coupure efficace : 8–15 Hz",
            "Résistant aux huiles et solvants industriels",
            "Installation simple par boulonnage",
            "Élastomère technique haute durabilité",
            "Réduit les vibrations transmises aux structures"
        ],
        specs: {
            "Charge unitaire": "50–5000 kg/plot",
            "Fréquence de coupure": "8–15 Hz",
            "Matière": "Élastomère technique",
            "Résistance chimique": "Huiles et solvants",
            "Fixation": "Boulonnage"
        },
        seoKeywords: "plots anti-vibratoires machine, découplage vibratoire industriel, isolation vibrations compresseur, Isolsolutions Maroc"
    },

    // ===================================
    // PRODUITS SUR COMMANDE
    // ===================================
    {
        id: "insulation-pins-autoadhesifs",
        category: "produits-sur-commande",
        title: "Insulation Pins Autoadhésifs",
        shortDesc: "Clous de fixation autoadhésifs en acier galvanisé — fixation rapide de panneaux isolants sur surfaces métalliques.",
        badge: "Fixation",
        image: "data_produits/Pieces et accessoires/6863dc04885effcd26c69a13f661b83e.jpg",
        fichesPDF: [
            { label: "Fiche Effisus Vap-X", path: "data_produits/produit effisius/Effisus vap x.pdf" },
            { label: "TDS 2Bond DS (Adhésif double face)", path: "data_produits/produit effisius/TDS 13.V02_2Bond DS_EN.pdf" }
        ],
        fullDesc: "Les Insulation Pins Autoadhésifs d'Isolsolutions sont des clous de fixation en acier galvanisé à base autoadhésive haute performance, conçus pour la fixation de panneaux et matelas isolants sur surfaces métalliques sans perçage ni soudure. Disponibles en longueurs de 25 à 150 mm pour s'adapter à toutes les épaisseurs d'isolant. Conditionnement par boîte de 1000 pièces. Produit importé depuis nos partenaires européens.",
        advantages: [
            "Base autoadhésive haute performance — sans perçage",
            "Acier galvanisé — résistance à la corrosion",
            "Longueurs de 25 à 150 mm disponibles",
            "Conditionnement de 1000 pcs/boîte",
            "Compatible toutes surfaces métalliques",
            "Importation Europe — qualité certifiée"
        ],
        specs: {
            "Matière": "Acier galvanisé",
            "Longueurs disponibles": "25–150 mm",
            "Conditionnement": "1000 pièces / boîte",
            "Base": "Autoadhésive haute performance"
        },
        seoKeywords: "insulation pins autoadhésifs, clous fixation isolant métallique, fixation rapide panneau isolant, Isolsolutions accessoires"
    },
    {
        id: "rondelles-fixation-isolant",
        category: "produits-sur-commande",
        title: "Rondelles de Fixation Isolant Ø 36 mm",
        shortDesc: "Rondelles de maintien en acier galvanisé Ø 36 mm — clippage rapide sur insulation pins.",
        badge: "Accessoire",
        image: "data_produits/Pieces et accessoires/6863dc04885effcd26c69a13f661b83e.jpg",
        fichesPDF: [
            { label: "TDS 2Adjoin DF (Accessoire adhésif)", path: "data_produits/produit effisius/TDS-13.V01_2Adjoin-DF_EN-1.pdf" }
        ],
        fullDesc: "Les Rondelles de Fixation Isolant Ø 36 mm d'Isolsolutions sont des accessoires essentiels pour le maintien des matelas et panneaux isolants sur les insulation pins. Leur conception en acier galvanisé et leur système de clippage rapide garantissent une fixation sécurisée et durable. Compatible avec tous types de pins standards du marché. Conditionnement par boîte de 500 pièces.",
        advantages: [
            "Diamètre 36 mm — maintien optimal de l'isolant",
            "Clippage rapide et sécurisé",
            "Acier galvanisé — durabilité garantie",
            "Compatible pins standards universels",
            "500 pièces par boîte",
            "Maintien ferme même en haute température"
        ],
        specs: {
            "Diamètre": "36 mm",
            "Matière": "Acier galvanisé",
            "Conditionnement": "500 pièces / boîte",
            "Type": "Clippage rapide"
        },
        seoKeywords: "rondelles fixation isolant, clips insulation pins, fixation matelas isolant, Isolsolutions accessoires isolation"
    },
    {
        id: "bande-alu-adhesive",
        category: "produits-sur-commande",
        title: "Bande Aluminium Adhésive 50 µm",
        shortDesc: "Ruban aluminium pur résistant à 150°C — joints, raccords et réparations d'isolation thermique.",
        badge: "Étanchéité",
        image: "data_produits/Pieces et accessoires/6863dc04885effcd26c69a13f661b83e.jpg",
        fichesPDF: [],
        fullDesc: "La Bande Aluminium Adhésive 50 µm d'Isolsolutions est un ruban adhésif professionnel en aluminium pur pour la réalisation et la réparation des joints d'isolation thermique. Sa résistance en continu jusqu'à 150°C le rend compatible avec les installations chaudes et les conduits CVC. Conforme aux normes de pare-vapeur. Disponible en largeur 50 ou 75 mm, en rouleau de 50 mètres.",
        advantages: [
            "Aluminium pur 50 µm — imperméabilité totale",
            "Résistant en continu jusqu'à 150°C",
            "Largeurs 50 mm et 75 mm disponibles",
            "Rouleau de 50 mètres — grand rendement",
            "Joints et raccords d'isolation étanches",
            "Conforme normes pare-vapeur"
        ],
        specs: {
            "Matière": "Aluminium pur 50 µm",
            "Température maximale": "150°C en continu",
            "Largeurs disponibles": "50 mm / 75 mm",
            "Longueur par rouleau": "50 m"
        },
        seoKeywords: "bande aluminium adhésive isolation, ruban alu étanchéité, joint isolation thermique aluminium, Isolsolutions accessoires"
    },
    {
        id: "colle-isolant-haute-temp",
        category: "produits-sur-commande",
        title: "Colle Isolant Haute Température",
        shortDesc: "Colle silicate pour fixation d'isolants sur surfaces chaudes jusqu'à 500°C — seau de 5 kg.",
        badge: "Spécial",
        image: "data_produits/Pieces et accessoires/6863dc04885effcd26c69a13f661b83e.jpg",
        fichesPDF: [],
        fullDesc: "La Colle Isolant Haute Température d'Isolsolutions est une colle à base de silicate spécialement formulée pour la fixation d'isolants thermiques sur des surfaces portées à haute température. Sa résistance jusqu'à 500°C et sa forte adhérence sur métaux, béton et matériaux minéraux en font l'outil indispensable des chantiers industriels. Séchage rapide, conditionnement seau de 5 kg. Produit importé depuis nos partenaires spécialisés.",
        advantages: [
            "Résistante jusqu'à 500°C en continu",
            "Base silicate — haute stabilité thermique",
            "Forte adhérence sur métaux et minéraux",
            "Séchage rapide sur surfaces chaudes",
            "Seau de 5 kg — conditionnement chantier",
            "Compatible isolants laine de roche et céramique"
        ],
        specs: {
            "Température maximale": "500°C",
            "Base chimique": "Silicate",
            "Conditionnement": "Seau de 5 kg",
            "Application": "Métaux, béton, minéraux"
        },
        seoKeywords: "colle isolant haute température, colle silicate 500°C, fixation isolant thermique chaud, Isolsolutions accessoires industrie"
    },
    {
        id: "tissu-verre-silicone",
        category: "produits-sur-commande",
        title: "Tissu de Verre Siliconé 550 g/m²",
        shortDesc: "Tissu de verre enduit silicone résistant à 550°C — enveloppe pour matelas isolants démontables.",
        badge: "Technique",
        image: "data_produits/Pieces et accessoires/6863dc04885effcd26c69a13f661b83e.jpg",
        fichesPDF: [],
        fullDesc: "Le Tissu de Verre Siliconé 550 g/m² d'Isolsolutions est un matériau technique de haute performance pour la confection d'enveloppes protectrices de matelas isolants démontables. Sa résistance thermique jusqu'à 550°C, combinée à son étanchéité aux projections de liquides et sa résistance mécanique élevée, en font l'enveloppe de référence pour les matelas isolants sur tuyauteries, vannes et équipements industriels. Livré en rouleaux de 50 m × 1 m.",
        advantages: [
            "Résistance thermique jusqu'à 550°C",
            "Enduit silicone — étanchéité aux projections",
            "Résistance mécanique élevée — longue durée de vie",
            "Rouleau 50 m × 1 m — grande couverture",
            "Grammage 550 g/m² — robustesse garantie",
            "Idéal confection matelas isolants démontables"
        ],
        specs: {
            "Température maximale": "550°C",
            "Grammage": "550 g/m²",
            "Dimensions du rouleau": "50 m × 1 m",
            "Enduit": "Silicone"
        },
        seoKeywords: "tissu verre siliconé haute température, enveloppe matelas isolant, tissu verre 550 degrés, Isolsolutions accessoires thermique"
    }
];

// ===================================
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
