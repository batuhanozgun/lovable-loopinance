
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { categoriesLogger } from '../logging';
import { CategoryList } from '../components/CategoryList';
import { loadTranslations } from '../i18n';
import { ICategory } from '../types';
import { useCategoryQueries } from '../hooks/queries/useCategoryQueries';
import { useCategoryOrderingMutations } from '../hooks/mutations/useCategoryOrderingMutations';

/**
 * Kategoriler görünümü
 * Kategorileri ve alt kategorileri yönetmek için ana görünüm
 */
export const CategoriesView: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  const [categories, setCategories] = useState<ICategory[]>([]);
  
  // Kategorileri getir
  const { data: categoryData } = useCategoryQueries.useGetAllCategories();
  
  // Sıralama mutation'ını al
  const { updateCategoryOrder } = useCategoryOrderingMutations.useUpdateCategoryOrder();
  
  // Kategorileri state'e kaydet
  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData);
    }
  }, [categoryData]);
  
  // i18n çevirilerini yükle
  useEffect(() => {
    loadTranslations();
  }, []);
  
  // Sayfa görüntülendiğinde logger
  useEffect(() => {
    categoriesLogger.debug('Kategoriler sayfası görüntülendi');
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">{t('categories:title', 'Kategoriler')}</h1>
      <CategoryList 
        categories={categories} 
        setCategories={setCategories} 
        updateCategoryOrder={updateCategoryOrder}
      />
    </div>
  );
};

export default CategoriesView;
