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
  },
  'illusion-crystal': {
    id: '4',
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
      'Brand': 'PRO AMBIENT',
      'Acoperire': 'Aproximativ 7 ron/kg',
      'Textură': 'Structurată, perlată',
      'Aplicare': 'Burete umed',
      'Conținut': 'Particule de silica, composite metalice',
      'Categorie': 'ELF DECOR, VOPSELE DECORATIVE'
    },
    categorii: ['vopsele', 'decorative', 'structurate', 'perlate', 'interior'],
  },
};

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  // Simplify the slug handling - it's always a string in Next.js route params
  const slug = params.slug;
  
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