
export interface ICategory {
  id: string;
  created_at?: string;
  name: string;
  icon?: string | null;
  sort_order?: number | null;
  organization_id?: string | null;
  user_id?: string | null; // Eksik field ekleniyor
  sub_categories?: ISubCategory[] | null;
}

export interface ISubCategory {
  id: string;
  created_at?: string;
  name: string;
  category_id: string;
  sort_order?: number | null;
}

export interface ICreateCategoryData {
  name: string;
  icon?: string;
  organization_id?: string;
  user_id?: string; // Eksik field ekleniyor
}

export interface IUpdateCategoryData {
  name?: string;
  icon?: string | null;
  sort_order?: number | null;
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
  sort_order?: number | null;
}

export interface ISubCategoryUpdateParams {
  id: string;
  data: IUpdateSubCategoryData;
}

// Kategori sıralama arayüzü - reorder ifadesini kullanıyoruz
export interface ICategoryOrder {
  id: string;
  sort_order: number;
}

// Alt kategori sıralama arayüzü - reorder ifadesini kullanıyoruz
export interface ISubCategoryOrder {
  id: string;
  sort_order: number;
}

// Kategorileri yeniden sıralama veri arayüzü
export interface IReorderCategoriesData {
  categories: ICategoryOrder[];
}

// Alt kategorileri yeniden sıralama veri arayüzü
export interface IReorderSubCategoriesData {
  subCategories: ISubCategoryOrder[];
}

// Kategori taşıma işlemi arayüzü
export interface ICategoryMoveOperation {
  sourceId: string;
  targetId: string;
  subCategoryIds: string[];
}
