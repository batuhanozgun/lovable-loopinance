
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
  name?: string;
  icon?: string | null;
}

export interface ICategoryUpdateParams {
  id: string;
  data: IUpdateCategoryData;
}

export interface ICreateSubCategoryData {
  name: string;
  category_id: string;
}

export interface IUpdateSubCategoryData {
  name?: string;
  sort_order?: number;
}

export interface ISubCategoryUpdateParams {
  id: string;
  data: IUpdateSubCategoryData;
}

// Kategori sıralama ile ilgili tipler
export interface ICategoryOrder {
  id: string;
  sort_order: number;
}

export interface ISubCategoryOrder {
  id: string;
  sort_order: number;
}

export interface IReorderCategoriesData {
  categories: ICategoryOrder[];
}

export interface IReorderSubCategoriesData {
  subCategories: ISubCategoryOrder[];
}
