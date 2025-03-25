export interface ProductVariant {
  variantaProdus: string;
  pret: {
    minim: number;
    maxim: number;
  };
  cantitatePachet: string;
  disponibil: boolean;
}

export interface Product {
  id: string;
  titlu: string;
  linkImagine: string;
  imagini?: string[];
  descriere: string;
  descriereScurta: string;
  variante: ProductVariant[];
  foaieTehnica: string;
  specificatii: {
    [key: string]: string;
  };
  categorii: string[];
  subcategorii: string[];
} 