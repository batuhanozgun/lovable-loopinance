
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import type { 
  ICategoryOrder, 
  ISubCategoryOrder, 
  IReorderCategoriesData,
  IReorderSubCategoriesData,
  ICategoryMoveOperation
} from '../../types';
import { organizationService } from '../../services/facades/OrganizationFacadeService';

/**
 * Kategori sıralama ve düzenleme için mutation hook'ları
 */
export const useCategoryOrderingMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation(['Categories', 'Messages']);

  // Kategori sıralama mutation'ı
  const reorderCategoriesMutation = useMutation({
    mutationFn: async (data: IReorderCategoriesData) => {
      return organizationService.reorderCategories(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: t('Categories:errors.reorder.failed'),
        description: error instanceof Error ? error.message : String(error),
      });
    }
  });

  // Alt kategori sıralama mutation'ı
  const reorderSubCategoriesMutation = useMutation({
    mutationFn: async (data: IReorderSubCategoriesData) => {
      return organizationService.reorderSubCategories(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: t('Categories:errors.reorderSub.failed'),
        description: error instanceof Error ? error.message : String(error),
      });
    }
  });

  // Alt kategori taşıma mutation'ı
  const moveSubCategoriesMutation = useMutation({
    mutationFn: async (data: ICategoryMoveOperation) => {
      return organizationService.moveSubCategoriesToCategory(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: t('Messages:subcategory.move.success'),
        description: t('Messages:subcategory.move.successDescription'),
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: t('Categories:errors.move.failed'),
        description: error instanceof Error ? error.message : String(error),
      });
    }
  });

  return {
    reorderCategories: reorderCategoriesMutation.mutate,
    reorderSubCategories: reorderSubCategoriesMutation.mutate,
    moveSubCategories: moveSubCategoriesMutation.mutate,
    isReorderingCategories: reorderCategoriesMutation.isPending,
    isReorderingSubCategories: reorderSubCategoriesMutation.isPending,
    isMovingSubCategories: moveSubCategoriesMutation.isPending
  };
};
