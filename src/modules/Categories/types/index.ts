
/**
 * Kategori tipi tanımı
 */
export interface ICategory {
  id: string;
  name: string;
  icon: string | null;
  user_id: string;
  sort_order: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  sub_categories?: ISubCategory[];
}

/**
 * Alt kategori tipi tanımı
 */
export interface ISubCategory {
  id: string;
  name: string;
  category_id: string;
  sort_order: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Yeni kategori oluşturma verisi
 */
export interface ICreateCategoryData {
  name: string;
  icon?: string;
  user_id: string;
}

/**
 * Kategori güncelleme verisi
 */
export interface IUpdateCategoryData {
  name?: string;
  icon?: string;
  sort_order?: number;
}

/**
 * Yeni alt kategori oluşturma verisi
 */
export interface ICreateSubCategoryData {
  name: string;
  category_id: string;
}

/**
 * Alt kategori güncelleme verisi
 */
export interface IUpdateSubCategoryData {
  name?: string;
  sort_order?: number;
  category_id?: string;
}

/**
 * Taşıma işlemi verisi
 */
export interface ICategoryMoveOperation {
  sourceId: string;
  targetId: string;
  subCategoryIds: string[];
}
