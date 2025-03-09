
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CategoryTemplateImportService } from '../../services/templates';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import type { ICategory } from '../../types';
import type { SupportedLanguage } from '../../types/template';
import { DEFAULT_LANGUAGE_SETTINGS } from '../../types/template';

const categoryTemplateImportService = new CategoryTemplateImportService();

/**
 * Şablondan kategori oluşturmak için mutation hook
 */
export const useCategoryTemplateImportMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t, i18n } = useTranslation(['Categories', 'Messages']);

  // Güvenli bir şekilde dil tipini döndür, eğer desteklenmiyorsa varsayılan dili kullan
  const getSafeLanguage = (lang: string): SupportedLanguage => {
    return DEFAULT_LANGUAGE_SETTINGS.supportedLanguages.includes(lang as SupportedLanguage) 
      ? (lang as SupportedLanguage) 
      : DEFAULT_LANGUAGE_SETTINGS.defaultLanguage;
  };

  const mutation = useMutation({
    mutationFn: async ({ 
      templateId, 
      userId, 
      language = getSafeLanguage(i18n.language)
    }: { 
      templateId: string; 
      userId: string;
      language?: SupportedLanguage;
    }): Promise<ICategory | null> => {
      return categoryTemplateImportService.createCategoryFromTemplate(templateId, userId, language);
    },
    onSuccess: (data) => {
      if (data) {
        toast({
          title: t('messages:template.import.success'),
          description: t('messages:template.import.successDescription', { categoryName: data.name }),
          // "success" variant olmadığı için default kullanıyoruz
          variant: 'default',
        });
        // Kategorileri yeniden yükle
        queryClient.invalidateQueries({ queryKey: ['categories'] });
      }
    },
    onError: (error) => {
      toast({
        title: t('messages:template.import.failed'),
        description: error instanceof Error ? error.message : t('errors:template.import.failed'),
        variant: 'destructive',
      });
    }
  });

  return {
    importCategoryFromTemplate: mutation.mutate,
    isImporting: mutation.isPending,
    importError: mutation.error,
    importData: mutation.data
  };
};
