import { NextResponse } from 'next/server';
import { Product } from '@/types/product';

// This would typically come from a database in a real application
export const productsDatabase: Record<string, Product> = {
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
    linkImagine: '/images/vopsele/elf-decor/illusion-crystal/illusionCrystal.png',
    imagini: [
      '/images/vopsele/elf-decor/illusion-crystal/illusionCrystal.png',
      '/images/vopsele/elf-decor/illusion-crystal/illusionCrystal1.jpg',
      '/images/vopsele/elf-decor/illusion-crystal/illusionCrystal2.jpg',
      '/images/vopsele/elf-decor/illusion-crystal/illusionCrystalBase.jpg',
      '/images/vopsele/elf-decor/illusion-crystal/illusionCrystal3.jpg',
      '/images/vopsele/elf-decor/illusion-crystal/illusionCrystal4.jpg',
    ],
    descriere: 'Illusion Crystal este o vopsea decorativă cu un aspect perlat și strălucitor. Datorită particulelor de sticlă din compoziția acesteia se produce un joc de lumini iar aspectul acesteia se schimbă în funcție de direcția luminii. Conferă oricărei încăperi un aspect elegant, putând fi integrată atât în design-ul clasic cât și în cel modern.\nCuloare – alb sidefat.\n\n– Se curăță folosind un burete umed\n– Se pot obține diverse texturi in funcție de tehnica de aplicare\n– Aspect strălucitor\n\nPregătirea suportului\nSe recomanda curățarea și izolarea corespunzătoare a suprafeței înainte de utilizare si aplicarea unui grund (1) care garantează o ancorare și o absorbție optimă a produsului.\n\nSe poate aplica folosind gletiera (2), pensula sau un pistol pentru vopsit.',
    descriereScurta: 'Illusion Crystal este o vopsea decorativă, de înaltă calitate, cu un aspect perlat și strălucitor.',
    variante: [
      {
        variantaProdus: '1KG',
        pret: {
          minim: 190,
          maxim: 190,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      },
      {
        variantaProdus: '5KG',
        pret: {
          minim: 650,
          maxim: 650,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    specificatii: {
      'Mai multe culori': 'Obținute cu pigmenții ELF DECOR',
      'Culori disponibile': 'Diverse tehnici de aplicare',
      'Textură catifelată': 'Aspect plăcut la atingere',
      'Ușor de curățat': 'Întreținere facilă',
      'Varietate de culori': 'Pentru orice design interior',
      'Consum': 'Aproximativ 7 mp/kg'
    },
    categorii: ['vopsele', 'ELF Decor'],
    subcategorii: ['ELF Decor'],
    foaieTehnica: '/docs/foaie-tehnica-illusion-crystal.pdf'
  },
  'persia': {
    id: 'persia',
    titlu: 'PERSIA',
    linkImagine: '/images/persia.svg',
    descriere: 'Persia este o vopsea decorativă pentru interior ce vă permite să creați diferite texturi datorită multiplelor tehnici de aplicare. Combinația de particule fine de marmură înglobate în baza perlată a vopselei decorative Persia conferă încăperii un aer elegant, nobil.',
    descriereScurta: 'Vopsea decorativă Persia - un produs unic ce combină un amestec elegant de culoare cu strălucirea si luciul particulelor de perlă pentru a crea o textură și o atmosferă de lux în orice spațiu.',
    variante: [
      {
        variantaProdus: 'ALB PERLAT 1KG',
        pret: {
          minim: 160,
          maxim: 160,
        },
        cantitatePachet: '1KG',
        disponibil: true,
      },
      {
        variantaProdus: 'ALB PERLAT 5KG',
        pret: {
          minim: 650,
          maxim: 650,
        },
        cantitatePachet: '5KG',
        disponibil: true,
      },
      {
        variantaProdus: 'ALB SIDEFAT 1KG',
        pret: {
          minim: 160,
          maxim: 160,
        },
        cantitatePachet: '1KG',
        disponibil: true,
      },
      {
        variantaProdus: 'ALB SIDEFAT 5KG',
        pret: {
          minim: 650,
          maxim: 650,
        },
        cantitatePachet: '5KG',
        disponibil: true,
      },
      {
        variantaProdus: 'AURIU 1KG',
        pret: {
          minim: 160,
          maxim: 160,
        },
        cantitatePachet: '1KG',
        disponibil: true,
      },
      {
        variantaProdus: 'AURIU 5KG',
        pret: {
          minim: 650,
          maxim: 650,
        },
        cantitatePachet: '5KG',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/persia-fisa-tehnica.txt',
    specificatii: {
      'Brand': 'ELF Decor',
      'Consum': '4-6 mp/kg',
      'Culori de bază': 'Alb perlat, Alb sidefat, Auriu',
      'Ambalaj': '1kg, 5kg',
      'Aplicare': 'Gletieră, pensulă, pistol pentru vopsit',
      'Categorie': 'ELF DECOR, VOPSELE DECORATIVE'
    },
    categorii: ['ELF Decor'],
    subcategorii: ['ELF Decor']
  },
  'sahara': {
    id: 'sahara',
    titlu: 'SAHARA',
    linkImagine: '/images/sahara.svg',
    descriere: 'Sahara este o vopsea decorativă folosită pentru lucrări interioare. Combinația de particule de cuarț și pigmenți perlați conferă un aspect elegant, ideal pentru medii clasice, cat si moderne, in conformitate cu tendințele actuale de decorare.\n\n1. Pregătirea suportului \nSe recomandă curățarea și izolarea corespunzătoare a suprafeței înainte de utilizare și aplicarea unui grund care garantează o ancorare și o absorbție optimă a produsului.\n\n2. Tehnica de aplicare\nAplicați quartz primer pe suprafața pregătită (1). Sahara se aplică cu ajutorul unei pensule, folosind mișcări întrerupte (2) și împărțind particulele de cuarț pe întreaga suprafață (3).',
    descriereScurta: 'Sahara este o vopsea decorativă, de înaltă calitate, cu o textură deosebită oferită de nisipul de cuarț și pigmenții strălucitori din compoziția ei.',
    variante: [
      {
        variantaProdus: 'ARGINTIU 1KG',
        pret: {
          minim: 135,
          maxim: 135,
        },
        cantitatePachet: '1KG',
        disponibil: true,
      },
      {
        variantaProdus: 'ARGINTIU 5KG',
        pret: {
          minim: 540,
          maxim: 540,
        },
        cantitatePachet: '5KG',
        disponibil: true,
      },
      {
        variantaProdus: 'AURIU 1KG',
        pret: {
          minim: 135,
          maxim: 135,
        },
        cantitatePachet: '1KG',
        disponibil: true,
      },
      {
        variantaProdus: 'AURIU 5KG',
        pret: {
          minim: 540,
          maxim: 540,
        },
        cantitatePachet: '5KG',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/sahara-fisa-tehnica.txt',
    specificatii: {
      'Brand': 'ELF Decor',
      'Consum': '5-6 kg/mp',
      'Culori de bază': 'Argintiu, Auriu',
      'Ambalaj': '1KG, 5KG',
      'Aplicare': 'Pensulă specială',
      'Categorie': 'ELF DECOR, VOPSELE DECORATIVE',
      'SKU': 'Nu se aplică'
    },
    categorii: ['ELF Decor'],
    subcategorii: ['ELF Decor']
  },
  'feerie': {
    id: 'feerie',
    titlu: 'FEERIE',
    linkImagine: '/images/vopsele/elf-decor/feerie/feerie.jpg',
    imagini: [
      '/images/vopsele/elf-decor/feerie/feerie.jpg',
      '/images/vopsele/elf-decor/feerie/feerie1.jpg',
      '/images/vopsele/elf-decor/feerie/feerie2.jpg',
      '/images/vopsele/elf-decor/feerie/feerie3.jpg',
    ],
    descriere: 'Feerie este o vopsea decorativa, pe baza de apa, ce conține cristale de sticlă și particule de perle stă lucitoare care conferă oricărei camere un aspect elegant.\n\nSe pot obține diferite modele in funcție de tehnica de aplicare\n\nSe poate aplica peste alte vopsele decorative (Illusion Crystal, Mirage etc) pentru a oferi lumină si strălucire încăperii.\n\nAplicarea se face cu ajutorul unei pensule uscate, prin mișcări aleatorii, grupând cristalele pentru a obtine efectul dorit. Se pot obține design-uri interesante cu ajutorul unei gletiere din plastic.',
    descriereScurta: 'Feerie este o vopsea decorativă, de înaltă calitate, cu particule transparente de sticlă. Bazele sunt Feerie transparent, Feerie White Silver și Feerie White Gold. La acest tip de material, pentru a fi puse in valoare particulele de sticla, se colorează amorsa sau fondul peste care se aplică.',
    variante: [
      {
        variantaProdus: 'Transparent 1KG',
        pret: {
          minim: 130,
          maxim: 130,
        },
        cantitatePachet: '1KG',
        disponibil: true,
      },
      {
        variantaProdus: 'Transparent 5KG',
        pret: {
          minim: 610,
          maxim: 610,
        },
        cantitatePachet: '5KG',
        disponibil: true,
      },
      {
        variantaProdus: 'White Silver 1KG',
        pret: {
          minim: 130,
          maxim: 130,
        },
        cantitatePachet: '1KG',
        disponibil: true,
      },
      {
        variantaProdus: 'White Silver 5KG',
        pret: {
          minim: 610,
          maxim: 610,
        },
        cantitatePachet: '5KG',
        disponibil: true,
      },
      {
        variantaProdus: 'White Gold 1KG',
        pret: {
          minim: 130,
          maxim: 130,
        },
        cantitatePachet: '1KG',
        disponibil: true,
      },
      {
        variantaProdus: 'White Gold 5KG',
        pret: {
          minim: 610,
          maxim: 610,
        },
        cantitatePachet: '5KG',
        disponibil: true,
      }
    ],
    specificatii: {
      'Mai multe culori': 'Obținute cu pigmenții ELF DECOR',
      'Culori disponibile': 'Diverse tehnici de aplicare',
      'Particule de sticlă': 'Strălucitoare pentru un aspect elegant',
      'Baze disponibile': 'Transparent, White Silver, White Gold',
      'Întreținere': 'Ușor de curățat',
      'Consum': 'Aproximativ 5-6 mp/kg',
      'Aplicare': 'Cu pensulă sau gletieră din plastic',
      'SKU': 'Nu se aplică'
    },
    categorii: ['vopsele', 'ELF Decor'],
    subcategorii: ['ELF Decor'],
    foaieTehnica: '/docs/foaie-tehnica-feerie.pdf'
  },
  'mirage': {
    id: 'mirage',
    titlu: 'MIRAGE',
    linkImagine: '/images/vopsele/elf-decor/mirage/mirage.jpg',
    imagini: [
      '/images/vopsele/elf-decor/mirage/mirage.jpg',
      '/images/vopsele/elf-decor/mirage/mirage1.jpg',
      '/images/vopsele/elf-decor/mirage/mirage2.jpg',
      '/images/vopsele/elf-decor/mirage/mirage3.jpg',
    ],
    descriere: 'Mirage este o vopsea decorativă premium ce creează un efect vizual spectaculos de miraj. Combinația unică de pigmenți și particule reflectorizante oferă pereților un aspect schimbător în funcție de lumină și unghi de vedere. Această vopsea transformă spațiile interioare într-un mediu sofisticat și dinamic.\n\nPregătirea suportului\nSe recomandă curățarea și izolarea corespunzătoare a suprafeței înainte de utilizare și aplicarea unui grund care garantează o ancorare și o absorbție optimă a produsului.\n\nTehnica de aplicare\nMirage se aplică în două straturi: primul strat uniform, iar al doilea cu mișcări speciale pentru a crea efectul caracteristic de miraj.',
    descriereScurta: 'Mirage este o vopsea decorativă premium cu efect de miraj, creând suprafețe cu aspect schimbător în funcție de lumină.',
    variante: [
      {
        variantaProdus: '1KG',
        pret: {
          minim: 190,
          maxim: 190,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      },
      {
        variantaProdus: '5KG',
        pret: {
          minim: 750,
          maxim: 750,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    specificatii: {
      'Culori disponibile': 'Multiple nuanțe folosind pigmenții ELF DECOR',
      'Consum': 'Aproximativ 7-9 mp/kg',
      'Aplicare': 'Pensulă și șpaclă specială',
      'Aspect': 'Efect de miraj cu suprafață schimbătoare',
      'Întreținere': 'Rezistentă la spălare',
      'Utilizare': 'Interior'
    },
    categorii: ['vopsele', 'ELF Decor'],
    subcategorii: ['ELF Decor'],
    foaieTehnica: '/docs/foaie-tehnica-mirage.pdf'
  },
  'grotto': {
    id: 'grotto',
    titlu: 'GROTTO',
    linkImagine: '/images/vopsele/elf-decor/grotto/grotto.jpg',
    imagini: [
      '/images/vopsele/elf-decor/grotto/grotto.jpg',
      '/images/vopsele/elf-decor/grotto/grotto1.jpg',
      '/images/vopsele/elf-decor/grotto/grotto2.jpg',
      '/images/vopsele/elf-decor/grotto/grotto3.jpg',
    ],
    descriere: 'Grotto este o vopsea decorativă texturată care recreează aspectul natural al grotelor și peșterilor. Oferă pereților o textură tridimensională unică, cu un joc subtil de lumini și umbre. Perfectă pentru crearea de accente arhitecturale distinctive în spațiile interioare.\n\nPregătirea suportului\nSe recomandă curățarea și izolarea corespunzătoare a suprafeței înainte de utilizare și aplicarea unui grund care garantează o ancorare și o absorbție optimă a produsului.\n\nTehnica de aplicare\nGrotto se aplică cu ajutorul unei gletiere speciale, folosind tehnici specifice pentru a crea efectul de peșteră. Se poate finaliza cu un strat de protecție pentru a spori rezistența și durabilitatea.',
    descriereScurta: 'Grotto este o vopsea decorativă texturată care recreează aspectul natural al grotelor, cu o textură tridimensională unică.',
    variante: [
      {
        variantaProdus: '1KG',
        pret: {
          minim: 175,
          maxim: 175,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      },
      {
        variantaProdus: '5KG',
        pret: {
          minim: 700,
          maxim: 700,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    specificatii: {
      'Culori disponibile': 'Multiple nuanțe folosind pigmenții ELF DECOR',
      'Consum': 'Aproximativ 6-8 mp/kg',
      'Aplicare': 'Gletieră specială',
      'Aspect': 'Textură tridimensională, efect de peșteră',
      'Întreținere': 'Rezistentă la uzură',
      'Utilizare': 'Interior'
    },
    categorii: ['vopsele', 'ELF Decor'],
    subcategorii: ['ELF Decor'],
    foaieTehnica: '/docs/foaie-tehnica-grotto.pdf'
  },
  'toscana': {
    id: 'toscana',
    titlu: 'TOSCANA',
    linkImagine: '/images/vopsele/elf-decor/toscana/toscana.jpg',
    imagini: [
      '/images/vopsele/elf-decor/toscana/toscana.jpg',
      '/images/vopsele/elf-decor/toscana/toscana1.jpg',
      '/images/vopsele/elf-decor/toscana/toscana2.jpg',
      '/images/vopsele/elf-decor/toscana/toscana3.jpg',
    ],
    descriere: 'Toscana este o vopsea decorativă inspirată din peisajele rurale ale regiunii Toscana, Italia. Creează un efect de tencuială antică, cu aspect rustic și cald. Texturile sale subtile aduc în casă atmosfera mediteraneană autentică, ideală pentru designul interior clasic și mediteranean.\n\nPregătirea suportului\nSe recomandă curățarea și izolarea corespunzătoare a suprafeței înainte de utilizare și aplicarea unui grund care garantează o ancorare și o absorbție optimă a produsului.\n\nTehnica de aplicare\nToscana se aplică cu gletieră din inox în două straturi, folosind tehnici specifice pentru a obține efectul rustic caracteristic zonei Toscana.',
    descriereScurta: 'Toscana este o vopsea decorativă ce recreează aspectul de tencuială antică specifică stilului mediteranean, cu texturi rustic-elegante.',
    variante: [
      {
        variantaProdus: '1KG',
        pret: {
          minim: 170,
          maxim: 170,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      },
      {
        variantaProdus: '5KG',
        pret: {
          minim: 680,
          maxim: 680,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    specificatii: {
      'Culori disponibile': 'Multiple nuanțe folosind pigmenții ELF DECOR',
      'Consum': 'Aproximativ 7-9 mp/kg',
      'Aplicare': 'Gletieră din inox',
      'Aspect': 'Tencuială antică, efect rustic mediteranean',
      'Întreținere': 'Rezistentă la uzură și pătare',
      'Utilizare': 'Interior și exterior protejat'
    },
    categorii: ['vopsele', 'ELF Decor'],
    subcategorii: ['ELF Decor'],
    foaieTehnica: '/docs/foaie-tehnica-toscana.pdf'
  },
  'pigment-decotoner': {
    id: 'pigment-decotoner',
    titlu: 'PIGMENT DECOTONER',
    linkImagine: '/images/vopsele/elf-decor/pigment-decotoner/pigment-decotoner.jpg',
    imagini: [
      '/images/vopsele/elf-decor/pigment-decotoner/pigment-decotoner.jpg',
      '/images/vopsele/elf-decor/pigment-decotoner/pigment-decotoner1.jpg',
      '/images/vopsele/elf-decor/pigment-decotoner/pigment-decotoner2.jpg',
    ],
    descriere: 'Pigment Decotoner este o soluție de colorare pentru vopselele decorative ELF Decor. Acești pigmenți concentrați permit obținerea unei game largi de nuanțe personalizate pentru toate produsele din gama ELF Decor. Formulați special pentru compatibilitate perfectă cu toate finisajele decorative.\n\nMod de utilizare\nSe adaugă pigmentul în vopseaua decorativă aleasă și se amestecă bine până la obținerea unei culori uniforme. Dozajul variază în funcție de intensitatea dorită a culorii. Se recomandă testarea pe o suprafață mică înainte de aplicarea pe întreaga zonă.',
    descriereScurta: 'Pigment Decotoner este o soluție concentrată de colorare pentru toate vopselele decorative din gama ELF Decor.',
    variante: [
      {
        variantaProdus: '100ml',
        pret: {
          minim: 75,
          maxim: 75,
        },
        cantitatePachet: 'ml',
        disponibil: true,
      },
      {
        variantaProdus: '250ml',
        pret: {
          minim: 165,
          maxim: 165,
        },
        cantitatePachet: 'ml',
        disponibil: true,
      }
    ],
    specificatii: {
      'Culori disponibile': 'Diverse nuanțe standard și la cerere',
      'Compatibilitate': 'Toate vopselele decorative ELF Decor',
      'Ambalaj': '100ml, 250ml',
      'Dozaj': 'Variabil în funcție de intensitatea dorită',
      'Stabilitate culoare': 'Rezistentă la lumină și radiații UV',
      'Utilizare': 'Interior și exterior (în funcție de produsul de bază)'
    },
    categorii: ['vopsele', 'ELF Decor'],
    subcategorii: ['ELF Decor'],
    foaieTehnica: '/docs/foaie-tehnica-pigment-decotoner.pdf'
  },
  'isomat-ak-9': { id: '301' },
  'isomat-ak-14': { id: '302' },
  'isomat-ak-16': {
    id: 'isomat-ak-16',
    titlu: 'ISOMAT AK-16',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'ISOMAT AK-16 - Adeziv flexibil de înaltă performanță pentru plăci ceramice. Recomandat pentru suprafețe cu cerințe ridicate de aderență și flexibilitate.',
    descriereScurta: 'Adeziv flexibil de înaltă performanță pentru plăci ceramice',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 55,
          maxim: 65,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-isomat-ak-16.pdf',
    specificatii: {
      'Culoare': 'Gri, alb',
      'Consum': '1.5-4.0 kg/m²',
      'Timp deschis': '30 minute',
      'Aderență': 'Excelentă',
      'Aplicare': 'Interior și exterior',
    },
    categorii: ['izolatii', 'adezivi', 'ciment'],
    subcategorii: ['ADEZIVI&CHITURI']
  },
  'isomat-ak-20': {
    id: 'isomat-ak-20',
    titlu: 'ISOMAT AK-20',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'ISOMAT AK-20 - Adeziv poliuretanic bicomponent de înaltă performanță, fără solvenți. Ideal pentru lipirea plăcilor ceramice în zone cu solicitări mari.',
    descriereScurta: 'Adeziv poliuretanic bicomponent pentru plăci ceramice',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 65,
          maxim: 80,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-isomat-ak-20.pdf',
    specificatii: {
      'Culoare': 'Gri, alb',
      'Consum': '1.5-4.0 kg/m²',
      'Timp deschis': '45 minute',
      'Aderență': 'Superioară',
      'Aplicare': 'Interior și exterior',
    },
    categorii: ['izolatii', 'adezivi', 'poliuretan'],
    subcategorii: ['ADEZIVI&CHITURI']
  },
  'isomat-ak-22': {
    id: 'isomat-ak-22',
    titlu: 'ISOMAT AK-22',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'ISOMAT AK-22 - Adeziv flexibil de înaltă performanță, armat cu fibre, pentru plăci ceramice. Special formulat pentru aplicații cu cerințe ridicate.',
    descriereScurta: 'Adeziv flexibil armat cu fibre pentru plăci ceramice',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 70,
          maxim: 85,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-isomat-ak-22.pdf',
    specificatii: {
      'Culoare': 'Gri, alb',
      'Consum': '1.5-4.0 kg/m²',
      'Timp deschis': '30 minute',
      'Aderență': 'Excelentă',
      'Aplicare': 'Interior și exterior',
    },
    categorii: ['izolatii', 'adezivi', 'fibre'],
    subcategorii: ['ADEZIVI&CHITURI']
  },
  'isomat-ak-25': {
    id: 'isomat-ak-25',
    titlu: 'ISOMAT AK-25',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'ISOMAT AK-25 - Adeziv ultraflexibil pentru toate tipurile de plăci, inclusiv plăci de mari dimensiuni și suprafețe dificile.',
    descriereScurta: 'Adeziv ultraflexibil pentru toate tipurile de plăci',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 75,
          maxim: 90,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-isomat-ak-25.pdf',
    specificatii: {
      'Culoare': 'Gri, alb',
      'Consum': '1.5-4.0 kg/m²',
      'Timp deschis': '30 minute',
      'Aderență': 'Superioară',
      'Aplicare': 'Interior și exterior',
    },
    categorii: ['izolatii', 'adezivi', 'flexibil'],
    subcategorii: ['ADEZIVI&CHITURI']
  },
  'isomat-ak-rapid': {
    id: 'isomat-ak-rapid',
    titlu: 'ISOMAT AK-RAPID',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'ISOMAT AK-RAPID - Adeziv cu priză rapidă pentru plăci ceramice. Ideal pentru lucrări unde este necesară darea în folosință rapidă.',
    descriereScurta: 'Adeziv cu priză rapidă pentru plăci ceramice',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 70,
          maxim: 85,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-isomat-ak-rapid.pdf',
    specificatii: {
      'Culoare': 'Gri',
      'Consum': '1.5-4.0 kg/m²',
      'Timp de întărire': '3-4 ore',
      'Aderență': 'Excelentă',
      'Aplicare': 'Interior și exterior',
    },
    categorii: ['izolatii', 'adezivi', 'rapid'],
    subcategorii: ['ADEZIVI&CHITURI']
  },
  'isomat-ak-rapid-flex': {
    id: 'isomat-ak-rapid-flex',
    titlu: 'ISOMAT AK-RAPID FLEX',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'ISOMAT AK-RAPID FLEX - Adeziv flexibil cu priză rapidă pentru plăci ceramice și piatră naturală. Ideal pentru lucrări urgente și zone cu trafic intens.',
    descriereScurta: 'Adeziv flexibil cu priză rapidă pentru plăci ceramice și piatră naturală',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 80,
          maxim: 95,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-isomat-ak-rapid-flex.pdf',
    specificatii: {
      'Culoare': 'Gri, alb',
      'Consum': '1.5-4.0 kg/m²',
      'Timp de întărire': '2-3 ore',
      'Aderență': 'Superioară',
      'Aplicare': 'Interior și exterior',
    },
    categorii: ['izolatii', 'adezivi', 'rapid', 'flexibil'],
    subcategorii: ['ADEZIVI&CHITURI']
  },
  'isomat-ak-megarapid': {
    id: 'isomat-ak-megarapid',
    titlu: 'ISOMAT AK-MEGARAPID',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'ISOMAT AK-MEGARAPID - Adeziv bicomponent cu priză super rapidă pentru aplicații care necesită utilizare imediată.',
    descriereScurta: 'Adeziv bicomponent cu priză super rapidă',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 90,
          maxim: 110,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-isomat-ak-megarapid.pdf',
    specificatii: {
      'Culoare': 'Gri, alb',
      'Consum': '1.5-4.0 kg/m²',
      'Timp de întărire': '1-2 ore',
      'Aderență': 'Superioară',
      'Aplicare': 'Interior și exterior',
    },
    categorii: ['izolatii', 'adezivi', 'rapid', 'bicomponent'],
    subcategorii: ['ADEZIVI&CHITURI']
  },
  'isomat-ak-stone': {
    id: 'isomat-ak-stone',
    titlu: 'ISOMAT AK-STONE',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'ISOMAT AK-STONE - Adeziv special pentru pietre naturale grele și suprafețe dificile.',
    descriereScurta: 'Adeziv special pentru pietre naturale grele',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 80,
          maxim: 95,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-isomat-ak-stone.pdf',
    specificatii: {
      'Culoare': 'Gri',
      'Consum': '2.0-4.5 kg/m²',
      'Timp deschis': '30 minute',
      'Aderență': 'Ultra-puternică',
      'Aplicare': 'Interior și exterior',
    },
    categorii: ['izolatii', 'adezivi', 'piatră naturală'],
    subcategorii: ['ADEZIVI&CHITURI']
  },
  'isomat-ak-marble': {
    id: 'isomat-ak-marble',
    titlu: 'ISOMAT AK-MARBLE',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'ISOMAT AK-MARBLE - Adeziv alb, special formulat pentru marmură și pietre naturale sensibile la pătare.',
    descriereScurta: 'Adeziv alb pentru marmură și pietre naturale sensibile',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 85,
          maxim: 100,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-isomat-ak-marble.pdf',
    specificatii: {
      'Culoare': 'Alb',
      'Consum': '1.5-4.0 kg/m²',
      'Timp deschis': '30 minute',
      'Aderență': 'Excelentă',
      'Aplicare': 'Interior și exterior',
    },
    categorii: ['izolatii', 'adezivi', 'marmură'],
    subcategorii: ['ADEZIVI&CHITURI']
  },
  'isomat-ak-parquet': {
    id: 'isomat-ak-parquet',
    titlu: 'ISOMAT AK-PARQUET',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'ISOMAT AK-PARQUET - Adeziv poliuretanic bicomponent pentru parchet și lemn. Oferă o aderență excelentă și elasticitate pentru pardoseli din lemn.',
    descriereScurta: 'Adeziv poliuretanic bicomponent pentru parchet și lemn',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 90,
          maxim: 110,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-isomat-ak-parquet.pdf',
    specificatii: {
      'Culoare': 'Bej',
      'Consum': '0.8-1.2 kg/m²',
      'Timp deschis': '40 minute',
      'Aderență': 'Superioară',
      'Aplicare': 'Interior',
    },
    categorii: ['izolatii', 'adezivi', 'parchet', 'lemn'],
    subcategorii: ['ADEZIVI&CHITURI']
  },
  'montage-w': {
    id: 'montage-w',
    titlu: 'MONTAGE-W',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'MONTAGE-W - Adeziv acrilic de montaj pentru materiale de construcții ușoare în spații interioare. Aplicare facilă și priză rapidă.',
    descriereScurta: 'Adeziv acrilic de montaj pentru interior',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 45,
          maxim: 55,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-montage-w.pdf',
    specificatii: {
      'Culoare': 'Alb',
      'Consum': 'Depinde de aplicație',
      'Timp de fixare': '15-20 minute',
      'Aderență': 'Bună',
      'Aplicare': 'Interior',
    },
    categorii: ['izolatii', 'adezivi', 'montaj'],
    subcategorii: ['ADEZIVI&CHITURI']
  },
  'superbond-pu': {
    id: 'superbond-pu',
    titlu: 'SUPERBOND-PU',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'SUPERBOND-PU - Adeziv poliuretanic monocomponent de înaltă performanță pentru lipirea materialelor de construcții în condiții dificile.',
    descriereScurta: 'Adeziv poliuretanic monocomponent de înaltă performanță',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 60,
          maxim: 75,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-superbond-pu.pdf',
    specificatii: {
      'Culoare': 'Bej',
      'Consum': 'Depinde de aplicație',
      'Timp de întărire': '24 ore',
      'Aderență': 'Foarte puternică',
      'Aplicare': 'Interior și exterior',
    },
    categorii: ['izolatii', 'adezivi', 'poliuretan'],
    subcategorii: ['ADEZIVI&CHITURI']
  },
  'izolatie-celuloza': {
    id: 'izolatie-celuloza',
    titlu: 'IZOLAȚIE DIN CELULOZĂ',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'Izolație ecologică din celuloză reciclată, tratată pentru rezistență la foc și mucegai. Excelentă pentru izolarea termică și acustică a mansardelor, pereților și tavanelor.',
    descriereScurta: 'Izolație ecologică din celuloză reciclată pentru izolare termică și acustică superioară.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 45,
          maxim: 55,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-izolatie-celuloza.pdf',
    specificatii: {
      'Densitate': '28-45 kg/m³',
      'Conductivitate termică': '0.038-0.040 W/mK',
      'Rezistență la foc': 'Clasa B-s1, d0',
      'Absorbție fonică': 'Excelentă',
      'Aplicare': 'Vrac sau panouri',
    },
    categorii: ['izolatii', 'eco-friendly'],
    subcategorii: ['IZOLATII ECO-FRIENDLY']
  },
  'izolatie-fibra-lemn': {
    id: 'izolatie-fibra-lemn',
    titlu: 'IZOLAȚIE DIN FIBRĂ DE LEMN',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'Panouri rigide din fibră de lemn pentru izolarea termică și fonică a pereților, acoperișurilor și pardoselilor. Material natural cu excelente proprietăți de reglare a umidității.',
    descriereScurta: 'Panouri din fibră de lemn pentru izolare termică, fonică și reglarea umidității.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 75,
          maxim: 95,
        },
        cantitatePachet: 'm²',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-izolatie-fibra-lemn.pdf',
    specificatii: {
      'Densitate': '140-240 kg/m³',
      'Conductivitate termică': '0.038-0.045 W/mK',
      'Rezistență la foc': 'Clasa E',
      'Capacitate termică specifică': '2100 J/kgK',
      'Aplicare': 'Interior și exterior',
    },
    categorii: ['izolatii', 'eco-friendly', 'fibră lemn'],
    subcategorii: ['IZOLATII ECO-FRIENDLY']
  },
  'izolatie-fibra-canepa': {
    id: 'izolatie-fibra-canepa',
    titlu: 'IZOLAȚIE DIN FIBRĂ DE CÂNEPĂ',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'Izolație naturală din fibră de cânepă pentru aplicații multiple în construcții. Excelente proprietăți termice și acustice.',
    descriereScurta: 'Izolație naturală din fibră de cânepă pentru izolare termică și acustică.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 80,
          maxim: 100,
        },
        cantitatePachet: 'm²',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-izolatie-canepa.pdf',
    specificatii: {
      'Densitate': '30-42 kg/m³',
      'Conductivitate termică': '0.038-0.040 W/mK',
      'Rezistență la foc': 'Clasa E',
      'Capacitate termică specifică': '1800 J/kgK',
      'Aplicare': 'Interior',
    },
    categorii: ['izolatii', 'eco-friendly', 'cânepă'],
    subcategorii: ['IZOLATII ECO-FRIENDLY']
  },
  'aquamat-mortar-hidroizolant': {
    id: 'aquamat-mortar-hidroizolant',
    titlu: 'AQUAMAT - MORTAR HIDROIZOLANT',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'Mortar hidroizolant pe bază de ciment pentru impermeabilizarea suprafețelor de beton și zidărie. Aplicabil pe suprafețe cu umiditate și sub presiune hidrostatică.',
    descriereScurta: 'Mortar hidroizolant pe bază de ciment pentru impermeabilizarea construcțiilor.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 65,
          maxim: 80,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-aquamat.pdf',
    specificatii: {
      'Culoare': 'Gri, alb',
      'Consum': '2-4 kg/m²',
      'Rezistență la apă': 'Sub presiune până la 7 atm',
      'Aderență': 'Excelentă pe suprafețe minerale',
      'Aplicare': 'Interior și exterior',
    },
    categorii: ['izolatii', 'hidroizolații', 'mortar'],
    subcategorii: ['MATERIALE HIDROIZOLANTE']
  },
  'aquamat-elastic-bicomponent': {
    id: 'aquamat-elastic-bicomponent',
    titlu: 'AQUAMAT ELASTIC - HIDROIZOLANT BICOMPONENT',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'Membrană hidroizolantă bicomponentă pe bază de ciment, elastică, pentru suprafețe supuse contracțiilor și vibrațiilor. Ideal pentru terase, bazine de apă, fundații.',
    descriereScurta: 'Membrană hidroizolantă elastică bicomponentă pentru suprafețe supuse contracțiilor și vibrațiilor.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 95,
          maxim: 120,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-aquamat-elastic.pdf',
    specificatii: {
      'Culoare': 'Gri, alb',
      'Consum': '2-4 kg/m²',
      'Elasticitate': 'Excelentă',
      'Aderență': 'Foarte bună pe suprafețe minerale',
      'Aplicare': 'Interior și exterior',
    },
    categorii: ['izolatii', 'hidroizolații', 'elastic'],
    subcategorii: ['MATERIALE HIDROIZOLANTE']
  },
  'aquamat-flex-bicomponent': {
    id: 'aquamat-flex-bicomponent',
    titlu: 'AQUAMAT FLEX - HIDROIZOLANT BICOMPONENT FLEXIBIL',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'Membrană hidroizolantă bicomponentă flexibilă pe bază de ciment, pentru aplicații unde este necesară flexibilitate extremă, cum ar fi suprafețe cu fisuri.',
    descriereScurta: 'Membrană hidroizolantă bicomponentă super-flexibilă pentru suprafețe cu fisuri.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 110,
          maxim: 135,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-aquamat-flex.pdf',
    specificatii: {
      'Culoare': 'Gri, alb',
      'Consum': '2-4 kg/m²',
      'Elasticitate': 'Superioară',
      'Aderență': 'Excelentă pe diverse substraturi',
      'Aplicare': 'Interior și exterior',
    },
    categorii: ['izolatii', 'hidroizolații', 'flexibil'],
    subcategorii: ['MATERIALE HIDROIZOLANTE']
  },
  'aquamat-monoelastic-fibre': {
    id: 'aquamat-monoelastic-fibre',
    titlu: 'AQUAMAT MONOELASTIC - HIDROIZOLANT CU FIBRE',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'Membrană hidroizolantă monocomponentă, armată cu fibre, pe bază de ciment. Oferă rezistență sporită la fisurare și la eforturi mecanice.',
    descriereScurta: 'Membrană hidroizolantă monocomponentă armată cu fibre pentru rezistență sporită.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 85,
          maxim: 110,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-aquamat-monoelastic.pdf',
    specificatii: {
      'Culoare': 'Gri',
      'Consum': '2-4 kg/m²',
      'Rezistență la fisurare': 'Excelentă',
      'Aderență': 'Foarte bună',
      'Aplicare': 'Interior și exterior',
    },
    categorii: ['izolatii', 'hidroizolații', 'fibre'],
    subcategorii: ['MATERIALE HIDROIZOLANTE']
  },
  'aquamat-sr-sulfatice': {
    id: 'aquamat-sr-sulfatice',
    titlu: 'AQUAMAT SR - PENTRU MEDII SULFATICE',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'Mortar hidroizolant special dezvoltat pentru medii agresive cu conținut de sulfați. Ideal pentru stații de epurare, canalizări, industrie chimică.',
    descriereScurta: 'Mortar hidroizolant rezistent la sulfați pentru medii agresive chimice.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 90,
          maxim: 115,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-aquamat-sr.pdf',
    specificatii: {
      'Culoare': 'Gri',
      'Consum': '2-4 kg/m²',
      'Rezistență chimică': 'Ridicată la sulfați',
      'Aderență': 'Excelentă pe beton',
      'Aplicare': 'Interior și exterior',
    },
    categorii: ['izolatii', 'hidroizolații', 'rezistență chimică'],
    subcategorii: ['MATERIALE HIDROIZOLANTE']
  },
  'isoflex-pu-560-bt': {
    id: 'isoflex-pu-560-bt',
    titlu: 'ISOFLEX PU 560 BT - HIDROIZOLAȚIE BITUM-POLIURETAN',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'Membrană hidroizolantă lichidă pe bază de bitum-poliuretan, pentru hidroizolații de înaltă performanță. Formează o membrană elastică, impermeabilă, fără îmbinări și rosturi.',
    descriereScurta: 'Membrană hidroizolantă lichidă pe bază de bitum-poliuretan pentru hidroizolații premium.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 125,
          maxim: 160,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-isoflex-pu-560-bt.pdf',
    specificatii: {
      'Culoare': 'Negru',
      'Consum': '1.0-1.5 kg/m²/strat',
      'Elasticitate': 'Excelentă și la temperaturi scăzute',
      'Rezistență la UV': 'Bună',
      'Aplicare': 'Exterior',
    },
    categorii: ['izolatii', 'hidroizolații', 'poliuretan', 'bitum'],
    subcategorii: ['MATERIALE HIDROIZOLANTE']
  },
  'izolatie-iuta': {
    id: 'izolatie-iuta',
    titlu: 'IZOLAȚIE DIN IUTĂ',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'Izolație naturală din fibre de iută pentru izolare termică și fonică. Material 100% natural, sustenabil și biodegradabil, cu excelente proprietăți termoizolante.',
    descriereScurta: 'Izolație naturală din fibre de iută pentru izolare termică și fonică ecologică.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 85,
          maxim: 110,
        },
        cantitatePachet: 'm²',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-izolatie-iuta.pdf',
    specificatii: {
      'Densitate': '35-45 kg/m³',
      'Conductivitate termică': '0.038-0.040 W/mK',
      'Rezistență la foc': 'Clasa E',
      'Capacitate termică specifică': '1800 J/kgK',
      'Aplicare': 'Interior',
    },
    categorii: ['izolatii', 'eco-friendly', 'iută'],
    subcategorii: ['IZOLATII ECO-FRIENDLY']
  },
  'izolatie-lana': {
    id: 'izolatie-lana',
    titlu: 'IZOLAȚIE DIN LÂNĂ NATURALĂ',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'Izolație din lână naturală de oaie, tratată pentru rezistență la foc și insecte. Oferă excelente proprietăți de izolare termică și fonică, reglând umiditatea în mod natural.',
    descriereScurta: 'Izolație din lână naturală pentru confort termic și acustic maxim.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 95,
          maxim: 120,
        },
        cantitatePachet: 'm²',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-izolatie-lana.pdf',
    specificatii: {
      'Densitate': '15-25 kg/m³',
      'Conductivitate termică': '0.035-0.040 W/mK',
      'Rezistență la foc': 'Clasa E',
      'Capacitate de reglare a umidității': 'Excelentă',
      'Aplicare': 'Interior',
    },
    categorii: ['izolatii', 'eco-friendly', 'lână'],
    subcategorii: ['IZOLATII ECO-FRIENDLY']
  },
  'izolatie-pluta': {
    id: 'izolatie-pluta',
    titlu: 'IZOLAȚIE DIN PLUTĂ',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'Panouri de izolație din plută expandată, un material 100% natural și regenerabil. Oferă izolare termică, fonică și antivibrații excepțională, fiind totodată rezistentă la umiditate.',
    descriereScurta: 'Izolație din plută expandată pentru performanțe termice și acustice superioare.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 120,
          maxim: 150,
        },
        cantitatePachet: 'm²',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-izolatie-pluta.pdf',
    specificatii: {
      'Densitate': '100-120 kg/m³',
      'Conductivitate termică': '0.038-0.042 W/mK',
      'Rezistență la foc': 'Clasa E',
      'Rezistență la compresiune': 'Excelentă',
      'Aplicare': 'Interior și exterior',
    },
    categorii: ['izolatii', 'eco-friendly', 'plută'],
    subcategorii: ['IZOLATII ECO-FRIENDLY']
  },
  'izolatie-vata-minerala-vrac': {
    id: 'izolatie-vata-minerala-vrac',
    titlu: 'IZOLAȚIE DIN VATĂ MINERALĂ VRAC',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'Izolație din vată minerală în vrac pentru insuflare în spații greu accesibile. Ideală pentru izolarea podurilor, pereților cu structuri complexe și a cavităților.',
    descriereScurta: 'Izolație din vată minerală în vrac pentru insuflare în spații greu accesibile.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 55,
          maxim: 75,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-izolatie-vata-minerala-vrac.pdf',
    specificatii: {
      'Densitate după aplicare': '25-35 kg/m³',
      'Conductivitate termică': '0.038-0.042 W/mK',
      'Rezistență la foc': 'Clasa A1 (necombustibil)',
      'Absorbție fonică': 'Excelentă',
      'Aplicare': 'Prin insuflare',
    },
    categorii: ['izolatii', 'vată minerală'],
    subcategorii: ['IZOLATII ECO-FRIENDLY']
  },
  'izolatie-perlit': {
    id: 'izolatie-perlit',
    titlu: 'IZOLAȚIE DIN PERLIT',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'Izolație din perlit expandat, un material mineral natural și incombustibil. Ideală pentru umplerea golurilor și izolarea spațiilor dificil de accesat.',
    descriereScurta: 'Izolație din perlit expandat pentru izolare termică superioară și rezistență la foc.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 45,
          maxim: 65,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-izolatie-perlit.pdf',
    specificatii: {
      'Densitate în vrac': '80-120 kg/m³',
      'Conductivitate termică': '0.040-0.045 W/mK',
      'Rezistență la foc': 'Clasa A1 (necombustibil)',
      'Absorbție fonică': 'Bună',
      'Aplicare': 'Prin turnare',
    },
    categorii: ['izolatii', 'minerale', 'perlit'],
    subcategorii: ['IZOLATII ECO-FRIENDLY']
  },
  'izolatie-fibra-minerala': {
    id: 'izolatie-fibra-minerala',
    titlu: 'IZOLAȚIE DIN FIBRĂ MINERALĂ',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'Panouri și saltele din fibră minerală pentru izolare termică și fonică superioară. Material incombustibil, rezistent la temperaturi înalte.',
    descriereScurta: 'Panouri și saltele din fibră minerală pentru izolare termică și protecție la foc.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 40,
          maxim: 60,
        },
        cantitatePachet: 'm²',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-izolatie-fibra-minerala.pdf',
    specificatii: {
      'Densitate': '30-150 kg/m³',
      'Conductivitate termică': '0.033-0.040 W/mK',
      'Rezistență la foc': 'Clasa A1 (necombustibil)',
      'Absorbție fonică': 'Excelentă',
      'Aplicare': 'Interior și exterior',
    },
    categorii: ['izolatii', 'minerale'],
    subcategorii: ['IZOLATII ECO-FRIENDLY']
  },
  'izolatie-granule-polistiren': {
    id: 'izolatie-granule-polistiren',
    titlu: 'IZOLAȚIE DIN GRANULE DE POLISTIREN',
    linkImagine: '/images/product-placeholder.svg',
    descriere: 'Granule de polistiren expandat pentru izolarea termică a planșeelor, a pardoselilor și pentru realizarea șapelor ușoare. Reduce semnificativ greutatea structurii.',
    descriereScurta: 'Granule de polistiren pentru izolare termică ușoară și șape termoizolante.',
    variante: [
      {
        variantaProdus: 'Standard',
        pret: {
          minim: 35,
          maxim: 50,
        },
        cantitatePachet: 'kg',
        disponibil: true,
      }
    ],
    foaieTehnica: '/documente/fisa-tehnica-izolatie-granule-polistiren.pdf',
    specificatii: {
      'Densitate în vrac': '10-15 kg/m³',
      'Conductivitate termică': '0.036-0.040 W/mK',
      'Rezistență la foc': 'Clasa E',
      'Absorbție de apă': 'Foarte redusă',
      'Aplicare': 'În amestec cu ciment sau vrac',
    },
    categorii: ['izolatii', 'polistiren'],
    subcategorii: ['IZOLATII ECO-FRIENDLY']
  }
};

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

Object.assign(productsDatabase, {
  'vopsea-interior-1': generatePlaceholderProduct('Vopsea Lavabilă Premium', 'Vopsele interior', 8),
  'vopsea-interior-2': generatePlaceholderProduct('Vopsea Superlavabilă', 'Vopsele interior', 9),
  'vopsea-interior-3': generatePlaceholderProduct('Vopsea Antimucegai', 'Vopsele interior', 10),
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
  }
});

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  
  if (!slug || !productsDatabase[slug]) {
    return NextResponse.json(
      { error: "Produsul nu a fost găsit." },
      { status: 404 }
    );
  }
  
  return NextResponse.json(productsDatabase[slug]);
} 