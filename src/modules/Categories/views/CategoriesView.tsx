
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { categoriesLogger } from '../logging';
import { CategoryList } from '../components/CategoryList';
import { CategoryTemplateList } from '../components/CategoryTemplateList';
import { loadTranslations } from '../i18n';
import { ICategory } from '../types';
import { useCategories } from '../hooks/queries/useCategoryQueries';
import { useCategoryOrderingMutations } from '../hooks/mutations/useCategoryOrderingMutations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * Kategoriler görünümü
 * Kategorileri ve alt kategorileri yönetmek için ana görünüm
 */
export const CategoriesView: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [activeTab, setActiveTab] = useState<string>('my-categories');
  
  // Kategorileri getir
  const { categories: categoryData, isLoading } = useCategories();
  
  // Sıralama mutation'ını al
  const { updateCategoryOrder } = useCategoryOrderingMutations();
  
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
      
      <Tabs defaultValue="my-categories" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="my-categories">
            {t('Categories:tabs.myCategories')}
          </TabsTrigger>
          <TabsTrigger value="template-library">
            {t('Categories:tabs.templateLibrary')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-categories">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <CategoryList 
              categories={categories} 
              setCategories={setCategories} 
              updateCategoryOrder={updateCategoryOrder}
            />
          )}
        </TabsContent>
        
        <TabsContent value="template-library">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">{t('Categories:template.title')}</h2>
            <p className="text-muted-foreground">{t('Categories:template.description')}</p>
          </div>
          <CategoryTemplateList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CategoriesView;
