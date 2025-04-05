
// Kategoriler modülü için tip tanımları

// Alt kategori arayüzü
export interface ISubCategory {
  id: string;
  name: string;
  parent_id: string;
  order: number;
}

// Kategori arayüzü
export interface ICategory {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  order: number;
  sub_categories?: ISubCategory[];
  created_at?: string;
}
