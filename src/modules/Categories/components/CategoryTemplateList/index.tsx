
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCategories } from '../../hooks/queries/useCategoryQueries';
import { useCategoryTemplates } from '../../hooks/queries/useCategoryTemplateQueries';
import { useCategoryTemplateImportMutation } from '../../hooks/mutations/useCategoryTemplateImportMutation';
import { TemplateItem } from './components/TemplateItem';
import { useSessionService } from '@/modules/UserManagement/auth/hooks/useSessionService';
import { Loader2, Languages } from 'lucide-react';
import { SupportedLanguage, DEFAULT_LANGUAGE_SETTINGS } from '../../types/template';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const CategoryTemplateList: React.FC = () => {
  const { t, i18n } = useTranslation(['Categories']);
  const [selectedLanguage, setSelectedLanguage] = React.useState<SupportedLanguage>(
    getSafeLanguage(i18n.language)
  );
  const { categoryTemplates, isLoading: isLoadingTemplates } = useCategoryTemplates({
    language: selectedLanguage
  });
  const { categories } = useCategories();
  const { getCurrentUserID } = useSessionService();
  const { importCategoryFromTemplate, isImporting } = useCategoryTemplateImportMutation();
  const [importingTemplateId, setImportingTemplateId] = React.useState<string | null>(null);
  
  // Güvenli bir şekilde dil tipini döndür
  function getSafeLanguage(lang: string): SupportedLanguage {
    return DEFAULT_LANGUAGE_SETTINGS.supportedLanguages.includes(lang as SupportedLanguage) 
      ? (lang as SupportedLanguage) 
      : DEFAULT_LANGUAGE_SETTINGS.defaultLanguage;
  }
  
  // İ18n dili değiştiğinde seçili dili güncelle
  React.useEffect(() => {
    setSelectedLanguage(getSafeLanguage(i18n.language));
  }, [i18n.language]);
  
  const handleImportCategory = async (templateId: string) => {
    try {
      setImportingTemplateId(templateId);
      const userId = await getCurrentUserID();
      
      if (!userId) {
        console.error('User ID not found');
        return;
      }
      
      importCategoryFromTemplate({ 
        templateId, 
        userId, 
        language: selectedLanguage 
      });
    } catch (error) {
      console.error('Error importing category:', error);
    } finally {
      setImportingTemplateId(null);
    }
  };
  
  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(getSafeLanguage(value));
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
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {t('categories:labels.languageSelector')}:
          </span>
          <Select 
            value={selectedLanguage} 
            onValueChange={handleLanguageChange}
          >
            <SelectTrigger className="w-[120px]">
              <Languages className="w-4 h-4 mr-2" />
              <SelectValue placeholder={selectedLanguage.toUpperCase()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tr">Türkçe</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryTemplates.map((template) => (
          <TemplateItem 
            key={template.id} 
            template={template}
            language={selectedLanguage}
            onImport={handleImportCategory}
            isImporting={isImporting || importingTemplateId === template.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryTemplateList;
