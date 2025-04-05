
// Varsayılan kategori ve alt kategori yapılandırmaları

import { categoryColors } from '../styles/tokens/colors';

// Varsayılan kategori yapılandırması
export const defaultCategoryConfig = {
  maxNameLength: 30, // Kategori adının maksimum uzunluğu
  maxDescriptionLength: 100, // Kategori açıklamasının maksimum uzunluğu
  maxSubcategoriesCount: 15, // Bir kategoriye eklenebilecek maksimum alt kategori sayısı
  defaultColor: categoryColors.primary.blue, // Varsayılan kategori rengi
  defaultIcon: 'tag', // Varsayılan kategori ikonu
};

// Varsayılan alt kategori yapılandırması
export const defaultSubcategoryConfig = {
  maxNameLength: 25, // Alt kategori adının maksimum uzunluğu 
  maxDescriptionLength: 75, // Alt kategori açıklamasının maksimum uzunluğu
  defaultInheritColor: true, // Varsayılan olarak üst kategori rengini kullanma
};

// Kategori türleri
export const categoryTypes = [
  { id: 'expense', label: 'Gider', color: categoryColors.functional.expense },
  { id: 'income', label: 'Gelir', color: categoryColors.functional.income },
  { id: 'transfer', label: 'Transfer', color: categoryColors.functional.transfer },
  { id: 'saving', label: 'Tasarruf', color: categoryColors.functional.saving },
];
