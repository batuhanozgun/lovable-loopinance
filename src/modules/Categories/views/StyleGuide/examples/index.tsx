
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryListExample from './CategoryListExample';
import EditCategoryExample from './EditCategoryExample';
import DeleteCategoryExample from './DeleteCategoryExample';
import EditSubcategoryExample from './EditSubcategoryExample';
import DeleteSubcategoryExample from './DeleteSubcategoryExample';
import { useTranslation } from 'react-i18next';

const ExamplesSection: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          {t('Categories:styleGuide.examples.title', 'UI Örnekleri')}
        </h2>
        <p className="text-muted-foreground mb-6">
          {t('Categories:styleGuide.examples.description', 'Kategori ve alt kategori yönetimi için kullanıcı arabirimi örnekleri')}
        </p>
      </div>

      <Tabs defaultValue="category-list">
        <TabsList className="mb-4">
          <TabsTrigger value="category-list">
            {t('Categories:styleGuide.examples.categoryList', 'Kategori Listesi')}
          </TabsTrigger>
          <TabsTrigger value="edit-category">
            {t('Categories:styleGuide.examples.editCategory', 'Kategori Düzenle')}
          </TabsTrigger>
          <TabsTrigger value="delete-category">
            {t('Categories:styleGuide.examples.deleteCategory', 'Kategori Sil')}
          </TabsTrigger>
          <TabsTrigger value="edit-subcategory">
            {t('Categories:styleGuide.examples.editSubCategory', 'Alt Kategori Düzenle')}
          </TabsTrigger>
          <TabsTrigger value="delete-subcategory">
            {t('Categories:styleGuide.examples.deleteSubCategory', 'Alt Kategori Sil')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="category-list" className="p-6 border rounded-md">
          <CategoryListExample />
        </TabsContent>
        
        <TabsContent value="edit-category" className="p-6 border rounded-md">
          <EditCategoryExample />
        </TabsContent>
        
        <TabsContent value="delete-category" className="p-6 border rounded-md">
          <DeleteCategoryExample />
        </TabsContent>
        
        <TabsContent value="edit-subcategory" className="p-6 border rounded-md">
          <EditSubcategoryExample />
        </TabsContent>
        
        <TabsContent value="delete-subcategory" className="p-6 border rounded-md">
          <DeleteSubcategoryExample />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamplesSection;
