export interface ICategory {
  id: string;
  created_at?: string;
  name: string;
  icon?: string | null;
  sort_order?: number | null;
  organization_id?: string | null;
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

// Category order params interface
export interface ICategoryOrder {
  id: string;
  sort_order: number;
}

// Sub-category order params interface
export interface ISubCategoryOrder {
  id: string;
  sort_order: number;
}

// Reorder categories data interface
export interface IReorderCategoriesData {
  categories: ICategoryOrder[];
}

// Reorder sub-categories data interface
export interface IReorderSubCategoriesData {
  subCategories: ISubCategoryOrder[];
}

// Category move operation interface
export interface ICategoryMoveOperation {
  sourceId: string;
  targetId: string;
  subCategoryIds: string[];
}
