
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { categoriesLogger } from '../logging';
import { CategoryList } from '../components/CategoryList';
import { loadTranslations } from '../i18n';
import { ICategory } from '../types';
import { useCategories } from '../hooks/queries/useCategoryQueries';
import { useCategoryOrderingMutations } from '../hooks/mutations/useCategoryOrderingMutations';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Kategoriler görünümü
 * Kategorileri ve alt kategorileri yönetmek için ana görünüm
 */
export const CategoriesView: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  const [categories, setCategories] = useState<ICategory[]>([]);
  
  // Kategorileri getir
  const { categories: categoryData, isLoading } = useCategories();
  
  // Sıralama mutation'ını al
  const { reorderCategories } = useCategoryOrderingMutations();
  
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
      <h1 className="text-2xl font-bold mb-6">{t('Categories:title', 'Kategoriler')}</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">{t('Categories:myCategories.title')}</h2>
          <p className="text-muted-foreground">{t('Categories:myCategories.description')}</p>
        </div>
        
        <Link 
          to="/category-templates" 
          className="flex items-center text-primary hover:underline"
        >
          {t('Categories:template.browseTemplates')}
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <CategoryList 
          categories={categories} 
          setCategories={setCategories} 
          reorderCategories={reorderCategories}
        />
      )}
    </div>
  );
};

export default CategoriesView;
