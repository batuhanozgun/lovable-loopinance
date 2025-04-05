
import { ICategory, ISubCategory } from '@/modules/Categories/types';

// Stil rehberi için genişletilmiş kategori tipi
export interface IStyleGuideCategory extends ICategory {
  color?: string; // Stil rehberi için ekstra renk özelliği
}

// Stil rehberi için genişletilmiş alt kategori tipi
export interface IStyleGuideSubCategory extends ISubCategory {
  // İleride eklenebilecek stil rehberine özel özellikler
}

export type { ICategory, ISubCategory } from '@/modules/Categories/types';
