
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCategories } from '../../hooks/queries/useCategoryQueries';
import { useCategoryTemplates } from '../../hooks/queries/useCategoryTemplateQueries';
import { useCategoryTemplateImportMutation } from '../../hooks/mutations/useCategoryTemplateImportMutation';
import { TemplateItem } from './components/TemplateItem';
import { useSessionService } from '@/modules/UserManagement/auth/hooks/useSessionService';

export const CategoryTemplateList: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  const { categoryTemplates, isLoading: isLoadingTemplates } = useCategoryTemplates();
  const { categories } = useCategories();
  const { getCurrentUserID } = useSessionService();
  const { importCategoryFromTemplate, isImporting } = useCategoryTemplateImportMutation();
  
  const handleImportCategory = async (templateId: string) => {
    const userId = getCurrentUserID();
    if (!userId) {
      console.error('User ID not found');
      return;
    }
    
    importCategoryFromTemplate({ templateId, userId });
  };
  
  if (isLoadingTemplates) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!categoryTemplates || categoryTemplates.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-medium">{t('categories:empty.title')}</h3>
        <p className="text-muted-foreground mt-2">{t('categories:empty.description')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {categoryTemplates.map((template) => (
        <TemplateItem 
          key={template.id} 
          template={template} 
          onImport={handleImportCategory}
          isImporting={isImporting}
        />
      ))}
    </div>
  );
};

export default CategoryTemplateList;
