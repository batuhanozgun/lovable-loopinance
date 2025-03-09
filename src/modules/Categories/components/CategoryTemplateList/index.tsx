
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCategories } from '../../hooks/queries/useCategoryQueries';
import { useCategoryTemplates } from '../../hooks/queries/useCategoryTemplateQueries';
import { useCategoryTemplateImportMutation } from '../../hooks/mutations/useCategoryTemplateImportMutation';
import { TemplateItem } from './components/TemplateItem';
import { useSessionService } from '@/modules/UserManagement/auth/hooks/useSessionService';
import { Loader2 } from 'lucide-react';

export const CategoryTemplateList: React.FC = () => {
  const { t, i18n } = useTranslation(['Categories']);
  const { categoryTemplates, isLoading: isLoadingTemplates } = useCategoryTemplates();
  const { categories } = useCategories();
  const { getCurrentUserID } = useSessionService();
  const { importCategoryFromTemplate, isImporting } = useCategoryTemplateImportMutation();
  const [importingTemplateId, setImportingTemplateId] = React.useState<string | null>(null);
  
  const handleImportCategory = async (templateId: string) => {
    try {
      setImportingTemplateId(templateId);
      const userId = await getCurrentUserID();
      
      if (!userId) {
        console.error('User ID not found');
        return;
      }
      
      importCategoryFromTemplate({ templateId, userId, language: i18n.language });
    } catch (error) {
      console.error('Error importing category:', error);
    } finally {
      setImportingTemplateId(null);
    }
  };
  
  if (isLoadingTemplates) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryTemplates.map((template) => (
          <TemplateItem 
            key={template.id} 
            template={template}
            language={i18n.language}
            onImport={handleImportCategory}
            isImporting={isImporting || importingTemplateId === template.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryTemplateList;
