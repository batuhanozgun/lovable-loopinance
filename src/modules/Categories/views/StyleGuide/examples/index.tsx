
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import { Section, Heading, Text, Divider } from '@/modules/LandingPage/styles';
import CategoryListExample from './CategoryListExample';
import EditCategoryExample from './EditCategoryExample';
import DeleteCategoryExample from './DeleteCategoryExample';
import EditSubcategoryExample from './EditSubcategoryExample';
import DeleteSubcategoryExample from './DeleteSubcategoryExample';

const ExamplesSection: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <Section className="mb-10">
      <Heading level="h3" className="text-xl font-semibold mb-2">
        {t('Categories:styleGuide.examples.title', 'Örnek Sayfalar')}
      </Heading>
      <Text className="text-muted-foreground mb-4">
        {t('Categories:styleGuide.examples.description', 'Kategori modülü arayüz örnekleri')}
      </Text>
      <Divider className="mb-6" />
      
      <Tabs defaultValue="categoryList" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="categoryList">
            {t('Categories:styleGuide.examples.categoryList', 'Kategori Listesi')}
          </TabsTrigger>
          <TabsTrigger value="editCategory">
            {t('Categories:styleGuide.examples.editCategory', 'Kategori Düzenle')}
          </TabsTrigger>
          <TabsTrigger value="deleteCategory">
            {t('Categories:styleGuide.examples.deleteCategory', 'Kategori Sil')}
          </TabsTrigger>
          <TabsTrigger value="editSubcategory">
            {t('Categories:styleGuide.examples.editSubcategory', 'Alt Kategori Düzenle')}
          </TabsTrigger>
          <TabsTrigger value="deleteSubcategory">
            {t('Categories:styleGuide.examples.deleteSubcategory', 'Alt Kategori Sil')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="categoryList" className="p-4 border rounded-md">
          <CategoryListExample />
        </TabsContent>
        
        <TabsContent value="editCategory" className="p-4 border rounded-md">
          <EditCategoryExample />
        </TabsContent>
        
        <TabsContent value="deleteCategory" className="p-4 border rounded-md">
          <DeleteCategoryExample />
        </TabsContent>
        
        <TabsContent value="editSubcategory" className="p-4 border rounded-md">
          <EditSubcategoryExample />
        </TabsContent>
        
        <TabsContent value="deleteSubcategory" className="p-4 border rounded-md">
          <DeleteSubcategoryExample />
        </TabsContent>
      </Tabs>
    </Section>
  );
};

export default ExamplesSection;
