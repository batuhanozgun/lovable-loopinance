
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useCategoryMutations } from '../../../../hooks/useCategoryMutations';
import { eventsLogger } from '../../../../logging';
import { Edit, Trash, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { ISubCategory } from '../../../../types';

interface SubCategoryListProps {
  categoryId: string;
  subCategories: ISubCategory[];
  isSubscriptionRequired: boolean;
}

/**
 * Alt kategoriler listesi bileşeni
 */
export const SubCategoryList: React.FC<SubCategoryListProps> = ({ categoryId, subCategories, isSubscriptionRequired }) => {
  const { t } = useTranslation(['Categories']);
  const { deleteSubCategory, updateSubCategoryOrder } = useCategoryMutations();
  
  if (subCategories.length === 0) {
    return null;
  }
  
  // Alt kategoriyi sil
  const handleDeleteSubCategory = (id: string) => {
    eventsLogger.debug('Alt kategori silme isteği', { subCategoryId: id });
    deleteSubCategory.mutate(id);
  };
  
  return (
    <div className="space-y-2 mt-2">
      {subCategories.map((subCategory) => (
        <div 
          key={subCategory.id} 
          className="flex items-center justify-between p-3 bg-muted/40 rounded-md"
        >
          <span className="font-medium">{subCategory.name}</span>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Menü</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                {t('Categories:actions.edit')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteSubCategory(subCategory.id)} className="text-destructive">
                <Trash className="h-4 w-4 mr-2" />
                {t('Categories:actions.delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
};

export default SubCategoryList;
