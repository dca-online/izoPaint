import { NextResponse } from 'next/server';
import { Product } from '@/types/product';

// This would typically come from a database in a real application
const productsDatabase: Record<string, Product> = {
  'vopsea-decorativa-premium': {
    id: '1',
    titlu: 'Vopsea Decorativă Premium',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'Vopsea decorativă premium cu efecte unice care transformă spațiul tău într-un mediu modern și elegant. Rezistentă la apă, lavabilă și ecologică, această vopsea este perfectă pentru orice încăpere.',
    descriereScurta: 'Transformă-ți spațiul cu vopsele decorative de înaltă calitate, cu efecte unice și finisaje elegante.',
    variante: [
      {
        variantaProdus: 'Alb Mat',
        pret: {
          minim: 180,
          maxim: 250,
        },
        cantitatePachet: '5L',
        disponibil: true,
      },
      {
        variantaProdus: 'Gri Antracit',
        pret: {
          minim: 190,
          maxim: 260,
        },
        cantitatePachet: '5L',
        disponibil: true,
      },
      {
        variantaProdus: 'Bej Natural',
        pret: {
          minim: 185,
          maxim: 255,
        },
        cantitatePachet: '5L',
        disponibil: false,
      },
    ],
    foaieTehnica: '/documente/fisa-tehnica-vopsea-premium.pdf',
    specificatii: {
      'Suprafață acoperită': '10-12 mp/L',
      'Timp de uscare': '4-6 ore',
      'Lavabilitate': 'Clasa 1',
      'Conținut VOC': '<30g/L',
      'Aplicare': 'Pensulă, trafalet, pistol',
    },
    categorii: ['vopsele', 'decorative', 'premium', 'interior'],
    subcategorii: ['ELF Decor']
  },
  'izolatie-termica-exterior': {
    id: '2',
    titlu: 'Izolație Termică Exterioară',
    linkImagine: '/images/service-placeholder.svg',
    descriere: 'Sistem complet de izolație termică pentru fațade, care reduce semnificativ pierderile de căldură și îmbunătățește eficiența energetică a clădirii. Soluția noastră oferă protecție împotriva intemperiilor și un finisaj estetic modern.',
    descriereScurta: 'Reduce pierderile de căldură și îmbunătățește eficiența energetică cu sistemul nostru complet de izolație termică pentru fațade.',
    variante: [
      {
        variantaProdus: 'Standard (5cm)',
        pret: {
          minim: 150,
          maxim: 180,
        },
        cantitatePachet: 'mp',
        disponibil: true,
      },
      {
        variantaProdus: 'Premium (10cm)',
        pret: {
          minim: 180,
          maxim: 220,
        },
        cantitatePachet: 'mp',
        disponibil: true,
      },
      {
        variantaProdus: 'Ultra (15cm)',
        pret: {
          minim: 220,
          maxim: 280,
        },
        cantitatePachet: 'mp',
        disponibil: true,
      },
    ],
    foaieTehnica: '/documente/fisa-tehnica-izolatie-termica.pdf',
    specificatii: {
      'Rezistență termică': 'R=1.25 m²K/W (5cm)',
      'Densitate': '16-18 kg/m³',
      'Conductivitate termică': '0.040 W/(m·K)',
      'Clasificare foc': 'B-s1, d0',
      'Durată de viață estimată': '25-30 ani',
    },
    categorii: ['izolații', 'termice', 'exterior', 'eco'],
    subcategorii: ['IZOLATII ECO-FRIENDLY']
  },
  'vopsea-lavabila-interior': {
    id: '3',
    titlu: 'Vopsea Lavabilă Interior',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'Vopsea lavabilă de calitate superioară pentru interior, cu rezistență ridicată la spălare și ștergere uscată. Formula sa permite pereților să respire, prevenind apariția mucegaiului și asigurând un mediu sănătos în casă.',
    descriereScurta: 'Vopsea lavabilă premium pentru interior, cu acoperire excelentă și rezistență la spălare, disponibilă în multiple nuanțe.',
    variante: [
      {
        variantaProdus: 'Alb Lucios',
        pret: {
          minim: 120,
          maxim: 160,
        },
        cantitatePachet: '15L',
        disponibil: true,
      },
      {
        variantaProdus: 'Alb Mat',
        pret: {
          minim: 130,
          maxim: 170,
        },
        cantitatePachet: '15L',
        disponibil: true,
      },
      {
        variantaProdus: 'Personalizat',
        pret: {
          minim: 150,
          maxim: 200,
        },
        cantitatePachet: '15L',
        disponibil: true,
      },
    ],
    foaieTehnica: '/documente/fisa-tehnica-vopsea-lavabila.pdf',
    specificatii: {
      'Suprafață acoperită': '14-16 mp/L',
      'Timp de uscare': '2-4 ore',
      'Lavabilitate': 'Clasa 2',
      'Conținut VOC': '<15g/L',
      'Aplicare': 'Pensulă, trafalet, pistol',
    },
    categorii: ['vopsele', 'lavabile', 'interior', 'eco'],
    subcategorii: ['Vopsele interior']
  },
  'illusion-crystal': {
    id: 'illusion-crystal',
    titlu: 'ILLUSION CRYSTAL',
    linkImagine: '/images/illusion-crystal.svg',
    descriere: 'Illusion Crystal este o vopsea decorativă cu un aspect perlat și structurat. Conține particule de silica din composite metalice pentru un efect de luminozitate și textura sofisticată. Se poate aplica cu ușurință folosind diverse tehnici pentru a obține efecte unice și personalizate.',
    descriereScurta: 'Vopsea decorativă cu aspect perlat și structurat, oferind o textură distinctă și un finisaj elegant.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 7,
          maxim: 10,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      },
      {
        variantaProdus: 'Diverse tonuri',
        pret: {
          minim: 7,
          maxim: 12,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/illusion-crystal-fisa-tehnica.txt',
    specificatii: {
      'Brand': 'ELF Decor',
      'Acoperire': 'Aproximativ 7 ron/kg',
      'Textură': 'Structurată, perlată',
      'Aplicare': 'Burete umed',
      'Conținut': 'Particule de silica, composite metalice',
      'Categorie': 'ELF DECOR, VOPSELE DECORATIVE'
    },
    categorii: ['ELF Decor'],
    subcategorii: ['ELF Decor']
  },
  // ELF Decor Products (7 more placeholders)
  'elf-decor-1': generatePlaceholderProduct('Vopsea Decorativă Metalică', 'ELF Decor', 1),
  'elf-decor-2': generatePlaceholderProduct('Vopsea Decorativă Perlată', 'ELF Decor', 2),
  'elf-decor-3': generatePlaceholderProduct('Vopsea Decorativă Sidefată', 'ELF Decor', 3),
  'elf-decor-4': generatePlaceholderProduct('Vopsea Decorativă Texturată', 'ELF Decor', 4),
  'elf-decor-5': generatePlaceholderProduct('Vopsea Decorativă Glitter', 'ELF Decor', 5),
  'elf-decor-6': generatePlaceholderProduct('Vopsea Decorativă Velvet', 'ELF Decor', 6),
  'elf-decor-7': generatePlaceholderProduct('Vopsea Decorativă Marmură', 'ELF Decor', 7),

  // Vopsele interior (6 products)
  'vopsea-interior-1': generatePlaceholderProduct('Vopsea Lavabilă Premium', 'Vopsele interior', 8),
  'vopsea-interior-2': generatePlaceholderProduct('Vopsea Superlavabilă', 'Vopsele interior', 9),
  'vopsea-interior-3': generatePlaceholderProduct('Vopsea Antimucegai', 'Vopsele interior', 10),
  'vopsea-interior-4': generatePlaceholderProduct('Vopsea Antibacteriană', 'Vopsele interior', 11),
  'vopsea-interior-5': generatePlaceholderProduct('Vopsea Latex Premium', 'Vopsele interior', 12),
  'vopsea-interior-6': generatePlaceholderProduct('Vopsea Acrilică Interior', 'Vopsele interior', 13),

  // Amorse interior (4 products)
  'amorsa-interior-1': generatePlaceholderProduct('Amorsă Penetrantă', 'Amorse interior', 14),
  'amorsa-interior-2': generatePlaceholderProduct('Amorsă Antimucegai', 'Amorse interior', 15),
  'amorsa-interior-3': generatePlaceholderProduct('Amorsă Consolidantă', 'Amorse interior', 16),
  'amorsa-interior-4': generatePlaceholderProduct('Amorsă Universală', 'Amorse interior', 17),

  // Vopsele & Amorse exterior (4 products)
  'vopsea-exterior-1': generatePlaceholderProduct('Vopsea Fațadă Premium', 'Vopsele & Amorse exterior', 18),
  'vopsea-exterior-2': generatePlaceholderProduct('Vopsea Elastomerică', 'Vopsele & Amorse exterior', 19),
  'vopsea-exterior-3': generatePlaceholderProduct('Amorsă Fațadă', 'Vopsele & Amorse exterior', 20),
  'vopsea-exterior-4': generatePlaceholderProduct('Grund Exterior', 'Vopsele & Amorse exterior', 21),

  // Tencuieli/Amorse exterior (12 products)
  'tencuiala-1': generatePlaceholderProduct('Tencuială Decorativă Siliconică', 'Tencuieli/Amorse exterior', 22),
  'tencuiala-2': generatePlaceholderProduct('Tencuială Decorativă Acrilică', 'Tencuieli/Amorse exterior', 23),
  'tencuiala-3': generatePlaceholderProduct('Tencuială Decorativă Minerală', 'Tencuieli/Amorse exterior', 24),
  'tencuiala-4': generatePlaceholderProduct('Tencuială Mozaicată', 'Tencuieli/Amorse exterior', 25),
  'tencuiala-5': generatePlaceholderProduct('Amorsă Tencuială', 'Tencuieli/Amorse exterior', 26),
  'tencuiala-6': generatePlaceholderProduct('Grund Tencuială', 'Tencuieli/Amorse exterior', 27),
  'tencuiala-7': generatePlaceholderProduct('Tencuială Decorativă Granulată', 'Tencuieli/Amorse exterior', 28),
  'tencuiala-8': generatePlaceholderProduct('Tencuială Decorativă Structurată', 'Tencuieli/Amorse exterior', 29),
  'tencuiala-9': generatePlaceholderProduct('Tencuială Decorativă Drișcuită', 'Tencuieli/Amorse exterior', 30),
  'tencuiala-10': generatePlaceholderProduct('Tencuială Decorativă Periată', 'Tencuieli/Amorse exterior', 31),
  'tencuiala-11': generatePlaceholderProduct('Tencuială Decorativă Canelată', 'Tencuieli/Amorse exterior', 32),
  'tencuiala-12': generatePlaceholderProduct('Tencuială Decorativă Rustică', 'Tencuieli/Amorse exterior', 33),

  // Vopsele epoxidice (8 products)
  'vopsea-epoxidica-1': generatePlaceholderProduct('Vopsea Epoxidică Pardoseală', 'Vopsele epoxidice', 34),
  'vopsea-epoxidica-2': generatePlaceholderProduct('Vopsea Epoxidică Antistatică', 'Vopsele epoxidice', 35),
  'vopsea-epoxidica-3': generatePlaceholderProduct('Vopsea Epoxidică Autonivelantă', 'Vopsele epoxidice', 36),
  'vopsea-epoxidica-4': generatePlaceholderProduct('Vopsea Epoxidică Antichimică', 'Vopsele epoxidice', 37),
  'vopsea-epoxidica-5': generatePlaceholderProduct('Vopsea Epoxidică Decorativă', 'Vopsele epoxidice', 38),
  'vopsea-epoxidica-6': generatePlaceholderProduct('Vopsea Epoxidică Transparentă', 'Vopsele epoxidice', 39),
  'vopsea-epoxidica-7': generatePlaceholderProduct('Vopsea Epoxidică Industrială', 'Vopsele epoxidice', 40),
  'vopsea-epoxidica-8': generatePlaceholderProduct('Vopsea Epoxidică Antiderapantă', 'Vopsele epoxidice', 41),

  // Vopsele pentru lemn/metal (8 products)
  'vopsea-lemn-metal-1': generatePlaceholderProduct('Email Alchidic Lucios', 'Vopsele pentru lemn/metal', 42),
  'vopsea-lemn-metal-2': generatePlaceholderProduct('Lac Protector Lemn', 'Vopsele pentru lemn/metal', 43),
  'vopsea-lemn-metal-3': generatePlaceholderProduct('Vopsea Anticorozivă Metal', 'Vopsele pentru lemn/metal', 44),
  'vopsea-lemn-metal-4': generatePlaceholderProduct('Grund Metal Gri', 'Vopsele pentru lemn/metal', 45),
  'vopsea-lemn-metal-5': generatePlaceholderProduct('Baiț Colorat Lemn', 'Vopsele pentru lemn/metal', 46),
  'vopsea-lemn-metal-6': generatePlaceholderProduct('Vopsea Termorizistentă', 'Vopsele pentru lemn/metal', 47),
  'vopsea-lemn-metal-7': generatePlaceholderProduct('Email Acrilic Rapid', 'Vopsele pentru lemn/metal', 48),
  'vopsea-lemn-metal-8': generatePlaceholderProduct('Lac Yacht', 'Vopsele pentru lemn/metal', 49),

  // Protectia lemnului (5 products)
  'protectie-lemn-1': generatePlaceholderProduct('Impregnant Lemn', 'Protectia lemnului', 50),
  'protectie-lemn-2': generatePlaceholderProduct('Lac UV Exterior', 'Protectia lemnului', 51),
  'protectie-lemn-3': generatePlaceholderProduct('Ulei Deck', 'Protectia lemnului', 52),
  'protectie-lemn-4': generatePlaceholderProduct('Ceară Protectoare', 'Protectia lemnului', 53),
  'protectie-lemn-5': generatePlaceholderProduct('Lazură 3în1', 'Protectia lemnului', 54),

  // IZOLATII ECO-FRIENDLY products
  'izolatie-celuloza': generatePlaceholderProduct('Celuloza', 'IZOLATII ECO-FRIENDLY', 101),
  'izolatie-fibra-lemn': generatePlaceholderProduct('Fibra de lemn', 'IZOLATII ECO-FRIENDLY', 102),
  'izolatie-fibra-canepa': generatePlaceholderProduct('Fibra de canepa', 'IZOLATII ECO-FRIENDLY', 103),
  'izolatie-iuta': generatePlaceholderProduct('Iuta', 'IZOLATII ECO-FRIENDLY', 104),
  'izolatie-lana': generatePlaceholderProduct('Lana', 'IZOLATII ECO-FRIENDLY', 105),
  'izolatie-pluta': generatePlaceholderProduct('Pluta', 'IZOLATII ECO-FRIENDLY', 106),
  'izolatie-vata-minerala-vrac': generatePlaceholderProduct('Vata minerala vrac', 'IZOLATII ECO-FRIENDLY', 107),
  'izolatie-perlit': generatePlaceholderProduct('Perlit', 'IZOLATII ECO-FRIENDLY', 108),
  'izolatie-fibra-minerala': generatePlaceholderProduct('Fibra minerala', 'IZOLATII ECO-FRIENDLY', 109),
  'izolatie-granule-polistiren': generatePlaceholderProduct('Granule polistiren', 'IZOLATII ECO-FRIENDLY', 110),
  
  // MATERIALE HIDROIZOLANTE products
  'aquamat-mortar-hidroizolant': {
    id: '201',
    titlu: 'AQUAMAT – Mortar hidroizolant',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'AQUAMAT este un mortar hidroizolant de înaltă calitate, recomandat pentru impermeabilizarea suprafețelor precum betonul, tencuiala, cărămida sau piatra. Asigură protecție hidrofugă completă și aderență excelentă.',
    descriereScurta: 'Mortar hidroizolant de înaltă calitate pentru impermeabilizarea suprafețelor de beton și zidărie.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 37,
          maxim: 199,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-aquamat.pdf',
    specificatii: {
      'Culoare': 'Gri',
      'Consum': '2-4 kg/m²',
      'Timp de uscare': '24 ore',
      'Aplicare': 'Bidinea, perie sau prin pulverizare',
      'Permeabilitate': 'Impermeabil la apă sub presiune',
    },
    categorii: ['izolatii', 'hidroizolante'],
    subcategorii: ['MATERIALE HIDROIZOLANTE']
  },
  'aquamat-elastic-bicomponent': {
    id: '202',
    titlu: 'AQUAMAT-ELASTIC - Mortar hidroizolant elastic, bicomponent',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'AQUAMAT-ELASTIC este un mortar hidroizolant elastic, bicomponent, ideal pentru suprafețe cu mișcări de contracție-expansiune. Oferă protecție perfectă și durabilitate ridicată, fiind potrivit și pentru rezervoare de apă potabilă.',
    descriereScurta: 'Mortar hidroizolant elastic, bicomponent, pentru suprafețe cu mișcări de contracție-expansiune.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 130,
          maxim: 539,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-aquamat-elastic.pdf',
    specificatii: {
      'Culoare': 'Alb, gri',
      'Consum': '2-4 kg/m²',
      'Elasticitate': 'Ridicată',
      'Aplicare': 'Bidinea, perie sau prin pulverizare',
      'Permeabilitate': 'Impermeabil la apă sub presiune până la 7 atm',
    },
    categorii: ['izolatii', 'hidroizolante', 'elastice'],
    subcategorii: ['MATERIALE HIDROIZOLANTE']
  },
  'aquamat-flex-bicomponent': {
    id: '203',
    titlu: 'AQUAMAT-FLEX – Mortar hidroizolant flexibil, bicomponent',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'AQUAMAT-FLEX este un mortar hidroizolant flexibil, bicomponent, recomandat pentru suprafețe cu vibrații sau microfisuri. Oferă protecție impermeabilă de lungă durată și aderență excepțională.',
    descriereScurta: 'Mortar hidroizolant flexibil, bicomponent, ideal pentru suprafețe cu vibrații sau microfisuri.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 356,
          maxim: 356,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-aquamat-flex.pdf',
    specificatii: {
      'Culoare': 'Gri',
      'Consum': '2-4 kg/m²',
      'Flexibilitate': 'Medie',
      'Aplicare': 'Bidinea sau perie',
      'Permeabilitate': 'Impermeabil la apă sub presiune',
    },
    categorii: ['izolatii', 'hidroizolante', 'flexibile'],
    subcategorii: ['MATERIALE HIDROIZOLANTE']
  },
  'aquamat-monoelastic-fibre': {
    id: '204',
    titlu: 'AQUAMAT-MONOELASTIC – Mortar hidroizolant elastic, monocomponent, armat cu fibre',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'AQUAMAT-MONOELASTIC este un mortar hidroizolant elastic, monocomponent, armat cu fibre, care oferă protecție impermeabilă de înaltă calitate. Datorită compoziției cu fibre, are o rezistență mecanică sporită și aderență excepțională.',
    descriereScurta: 'Mortar hidroizolant elastic, monocomponent, armat cu fibre pentru rezistență mecanică sporită.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 467,
          maxim: 467,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-aquamat-monoelastic.pdf',
    specificatii: {
      'Culoare': 'Gri',
      'Consum': '2-4 kg/m²',
      'Elasticitate': 'Ridicată',
      'Aplicare': 'Bidinea, perie sau prin pulverizare',
      'Armare': 'Cu fibre',
    },
    categorii: ['izolatii', 'hidroizolante', 'elastice', 'fibre'],
    subcategorii: ['MATERIALE HIDROIZOLANTE']
  },
  'aquamat-sr-sulfatice': {
    id: '205',
    titlu: 'AQUAMAT-SR - Mortar hidroizolant rezistent la săruri sulfatice',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'AQUAMAT-SR este un mortar hidroizolant special, cu rezistență ridicată la săruri sulfatice, recomandat pentru zone cu expunere la ape reziduale, marine sau cu conținut chimic. Oferă protecție de lungă durată în medii agresive.',
    descriereScurta: 'Mortar hidroizolant special, cu rezistență ridicată la săruri sulfatice pentru medii agresive.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 264,
          maxim: 264,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-aquamat-sr.pdf',
    specificatii: {
      'Culoare': 'Gri',
      'Consum': '2-4 kg/m²',
      'Rezistență': 'La săruri sulfatice',
      'Aplicare': 'Bidinea sau perie',
      'Permeabilitate': 'Impermeabil la apă sub presiune',
    },
    categorii: ['izolatii', 'hidroizolante', 'chimice'],
    subcategorii: ['MATERIALE HIDROIZOLANTE']
  },
  'isoflex-pu-560-bt': {
    id: '206',
    titlu: 'ISOFLEX-PU 560 BT - Hidroizolant lichid, poliuretanic – bituminos',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'ISOFLEX-PU 560 BT este un hidroizolant lichid, poliuretanic – bituminos, care formează o membrană impermeabilă continuă, fără îmbinări sau scurgeri. Ideal pentru hidroizolarea structurilor complexe și fundații.',
    descriereScurta: 'Hidroizolant lichid, poliuretanic – bituminos pentru formarea unei membrane impermeabile continue.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 505,
          maxim: 1830,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-isoflex-pu-560-bt.pdf',
    specificatii: {
      'Culoare': 'Negru',
      'Consum': '1.0-1.5 kg/m²',
      'Timp de uscare': '8-12 ore',
      'Aplicare': 'Perie, trafalet sau pulverizare',
      'Elasticitate': 'Foarte ridicată (>600%)',
    },
    categorii: ['izolatii', 'hidroizolante', 'poliuretanice'],
    subcategorii: ['MATERIALE HIDROIZOLANTE']
  },
  
  // ADEZIVI&CHITURI products
  'isomat-ak-9': {
    id: '301',
    titlu: 'ISOMAT AK-9, Adeziv pe bază de ciment',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'ISOMAT AK-9 este un adeziv pe bază de ciment, recomandat pentru montarea plăcilor ceramice pe suprafețe din beton, tencuială sau șapă. Oferă aderență puternică și durabilă, fiind ideal pentru utilizare casnică.',
    descriereScurta: 'Adeziv pe bază de ciment pentru montarea plăcilor ceramice pe suprafețe obișnuite.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 42,
          maxim: 59,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-isomat-ak-9.pdf',
    specificatii: {
      'Culoare': 'Gri, alb',
      'Consum': '1.5-4.0 kg/m²',
      'Timp deschis': '20 minute',
      'Aderență': 'Bună',
      'Aplicare': 'Interior și exterior',
    },
    categorii: ['izolatii', 'adezivi', 'ciment'],
    subcategorii: ['ADEZIVI&CHITURI']
  },
  'isomat-ak-14': {
    id: '302',
    titlu: 'ISOMAT AK-14, Adeziv pe bază de ciment, aditivat cu rășini',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'ISOMAT AK-14 este un adeziv pe bază de ciment, aditivat cu rășini, ce oferă o aderență sporită și flexibilitate îmbunătățită. Recomandat pentru montarea plăcilor ceramice pe suprafețe cu cerințe medii de stabilitate.',
    descriereScurta: 'Adeziv pe bază de ciment, aditivat cu rășini, pentru montarea plăcilor ceramice pe diverse suprafețe.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 57,
          maxim: 64,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-isomat-ak-14.pdf',
    specificatii: {
      'Culoare': 'Gri, alb',
      'Consum': '1.5-4.0 kg/m²',
      'Timp deschis': '30 minute',
      'Aderență': 'Foarte bună',
      'Aplicare': 'Interior și exterior',
    },
    categorii: ['izolatii', 'adezivi', 'ciment', 'rasini'],
    subcategorii: ['ADEZIVI&CHITURI']
  },
  'isomat-ak-16': generateISOMAT('ISOMAT AK-16', 'Adeziv aditivat cu răşini', 303, 67, 67),
  'isomat-ak-20': generateISOMAT('ISOMAT AK-20', 'Adeziv pe bază de ciment, aditivat cu rășini, de înaltă performanță, flexibil', 304, 25, 93),
  'isomat-ak-22': generateISOMAT('ISOMAT AK-22', 'Adeziv pe bază de ciment, aditivat cu rășini, de înaltă performanță, extra-flexibil', 305, 111, 124),
  'isomat-ak-25': generateISOMAT('ISOMAT AK-25', 'Adeziv pe bază de ciment, aditivat cu rășini, de înaltă performanță, ultra-flexibil', 306, 205, 205),
  'isomat-ak-rapid': generateISOMAT('ISOMAT AK-RAPID', 'Adeziv pe bază de ciment, aditivat cu rășini, de înaltă performanță, cu întărire rapidă', 307, 131, 155),
  'isomat-ak-rapid-flex': generateISOMAT('ISOMAT AK-RAPID FLEX', 'Adeziv pe bază de ciment, aditivat cu rășini, flexibil, de înaltă performanță, cu întărire rapidă', 308, 121, 182),
  'isomat-ak-megarapid': generateISOMAT('ISOMAT AK-MEGARAPID', 'Adeziv pe bază de ciment, aditivat cu rășini, ultra-flexibil, bicomponent, având rezistențe înalte', 309, 376, 376),
  'isomat-ak-stone': generateISOMAT('ISOMAT AK-STONE', 'Adeziv cu granulație mare, pentru plăci și piatră naturală', 310, 65, 76),
  'isomat-ak-marble': generateISOMAT('ISOMAT AK-MARBLE', 'Adeziv pe bază de ciment, aditivat cu rășini, de înaltă performanță, cu priză rapidă, pentru marmură și granit', 311, 107, 107),
  'isomat-ak-parquet': generateISOMAT('ISOMAT AK-PARQUET', 'Adeziv poliuretanic, puternic, gata de utilizare, pentru pardoseli de lemn', 312, 486, 486),
  'montage-w': generateISOMAT('MONTAGE-W', 'Adeziv gata de utilizare, de înaltă performanță, fără solvenți, pentru lipiri rapide și puternice', 313, 25, 25),
  'superbond-pu': generateISOMAT('SUPERBOND-PU', 'Adeziv puternic, de înaltă performanță, fără solvenți, pentru lipiri puternice', 314, 36, 36),
};

// Helper function to generate ISOMAT products
function generateISOMAT(title: string, subtitle: string, id: number, minPrice: number, maxPrice: number): Product {
  return {
    id: id.toString(),
    titlu: title,
    linkImagine: '/images/product-placeholder.svg',
    descriere: `${title} - ${subtitle}. Adeziv de înaltă calitate pentru aplicații profesionale în construcții.`,
    descriereScurta: subtitle,
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: minPrice,
          maxim: maxPrice,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: `/documente/fisa-tehnica-${title.toLowerCase().replace(/[\s\-]/g, '-')}.pdf`,
    specificatii: {
      'Culoare': 'Gri, alb',
      'Consum': '1.5-4.0 kg/m²',
      'Timp deschis': '30 minute',
      'Aderență': 'Excelentă',
      'Aplicare': 'Interior și exterior',
    },
    categorii: ['izolatii', 'adezivi', 'ciment', 'rasini'],
    subcategorii: ['ADEZIVI&CHITURI']
  };
}

function generatePlaceholderProduct(title: string, category: string, id: number): Product {
  return {
    id: id.toString(),
    titlu: title,
    linkImagine: '/images/product-placeholder.svg',
    descriere: `${title} - Descriere detaliată a produsului cu specificații tehnice și beneficii pentru utilizator.`,
    descriereScurta: `${title} - Soluție profesională pentru rezultate de calitate superioară.`,
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 100,
          maxim: 150,
        },
        cantitatePachet: category.includes('Tencuieli') ? 'kg' : 'L',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-placeholder.pdf',
    specificatii: {
      'Suprafață acoperită': '8-12 mp/L',
      'Timp de uscare': '2-4 ore',
      'Aplicare': 'Pensulă, trafalet, pistol',
    },
    categorii: [category],
    subcategorii: [category]
  };
}

// Updated for Next.js 15 with Promise-based params
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Await the params promise to get the actual slug
  const { slug } = await params;
  
  // Add artificial delay to simulate a real API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!productsDatabase[slug]) {
    return NextResponse.json(
      { error: 'Produsul nu a fost găsit' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(productsDatabase[slug]);
} 