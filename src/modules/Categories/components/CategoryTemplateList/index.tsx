
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCategories } from '../../hooks/queries/useCategoryQueries';
import { useCategoryTemplates } from '../../hooks/queries/useCategoryTemplateQueries';
import { useCategoryTemplateImportMutation } from '../../hooks/mutations/useCategoryTemplateImportMutation';
import { TemplateItem } from './components/TemplateItem';
import { useSessionService } from '@/modules/UserManagement/auth/hooks/useSessionService';
import { Loader2 } from 'lucide-react';
import { SupportedLanguage, DEFAULT_LANGUAGE_SETTINGS } from '../../types/template';

export const CategoryTemplateList: React.FC = () => {
  const { t, i18n } = useTranslation(['Categories']);
  const { categoryTemplates, isLoading: isLoadingTemplates } = useCategoryTemplates();
  const { categories } = useCategories();
  const { getCurrentUserID } = useSessionService();
  const { importCategoryFromTemplate, isImporting } = useCategoryTemplateImportMutation();
  const [importingTemplateId, setImportingTemplateId] = React.useState<string | null>(null);
  
  // Güvenli bir şekilde dil tipini döndür
  const getSafeLanguage = (lang: string): SupportedLanguage => {
    return DEFAULT_LANGUAGE_SETTINGS.supportedLanguages.includes(lang as SupportedLanguage) 
      ? (lang as SupportedLanguage) 
      : DEFAULT_LANGUAGE_SETTINGS.defaultLanguage;
  };
  
  const handleImportCategory = async (templateId: string) => {
    try {
      setImportingTemplateId(templateId);
      const userId = await getCurrentUserID();
      
      if (!userId) {
        console.error('User ID not found');
        return;
      }
      
      // Güvenli şekilde dil tipini dönüştür
      const safeLanguage = getSafeLanguage(i18n.language);
      importCategoryFromTemplate({ templateId, userId, language: safeLanguage });
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

  // Güvenli şekilde dil tipini dönüştür (TemplateItem props için)
  const safeLanguage = getSafeLanguage(i18n.language);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryTemplates.map((template) => (
          <TemplateItem 
            key={template.id} 
            template={template}
            language={safeLanguage}
            onImport={handleImportCategory}
            isImporting={isImporting || importingTemplateId === template.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryTemplateList;
