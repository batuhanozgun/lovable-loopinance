
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TemplateImportService } from '../../services/TemplateImportService';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import type { ICategory } from '@/modules/Categories/types';
import type { SupportedLanguage } from '../../types/template';
import { getSafeLanguage } from '../../utils/languageUtils';

const templateImportService = new TemplateImportService();

/**
 * Şablondan kategori oluşturmak için mutation hook
 */
export const useCategoryTemplateImportMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t, i18n } = useTranslation(['Categories', 'Messages']);

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
      return templateImportService.createCategoryFromTemplate(templateId, userId, language);
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
