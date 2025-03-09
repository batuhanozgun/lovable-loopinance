
/**
 * Kategori şablonu tipi tanımı
 */
export interface ICategoryTemplate {
  id: string;
  name: string;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  sub_categories?: ISubCategoryTemplate[];
}

/**
 * Alt kategori şablonu tipi tanımı
 */
export interface ISubCategoryTemplate {
  id: string;
  name: string;
  category_template_id: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Şablondan kategori oluşturma verisi
 */
export interface ICreateCategoryFromTemplateData {
  templateId: string;
  userId: string;
}
