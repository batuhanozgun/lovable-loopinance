
// Temel kategori ve alt kategori tipleri
export interface ICategory {
  id: string;
  name: string;
  icon: string | null;
  user_id: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  sub_categories?: ISubCategory[];
}

export interface ISubCategory {
  id: string;
  name: string;
  category_id: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Kategori ve alt kategori oluşturma/güncelleme tipleri
export interface ICreateCategoryData {
  name: string;
  icon: string | null;
  user_id: string;
}

export interface IUpdateCategoryData {
  id: string;
  name?: string;
  icon?: string | null;
}

export interface ICreateSubCategoryData {
  name: string;
  category_id: string;
}

export interface IUpdateSubCategoryData {
  id: string;
  name?: string;
  sort_order?: number;
}

// Kategori sıralama ile ilgili tipler
export interface IReorderCategoriesData {
  categories: Array<{
    id: string;
    sort_order: number;
  }>;
}

export interface IReorderSubCategoriesData {
  subCategories: Array<{
    id: string;
    sort_order: number;
  }>;
}

// DEPRECATED: Şablon tipleri yeni modüle taşındı - @/modules/CategoryTemplates/types altında bulunabilir
// Bu import sonraki fazda kaldırılacak
export * from '@/modules/CategoryTemplates/types';
