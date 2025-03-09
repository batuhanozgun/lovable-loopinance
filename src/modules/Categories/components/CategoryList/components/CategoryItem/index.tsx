
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCategoryMutations } from '../../../../hooks';
import { eventsLogger } from '../../../../logging';
import { BadgePlus, Edit, Trash, MoreVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SubCategoryList } from '../SubCategoryList';
import { AccessRestrictedDialog } from '@/modules/Subscription/components/AccessRestrictedDialog';
import type { ICategory } from '../../../../types';

interface CategoryItemProps {
  category: ICategory;
  isSubscriptionRequired: boolean;
}

/**
 * Kategori öğesi bileşeni
 * Tek bir kategoriyi ve alt kategorilerini gösterir
 */
export const CategoryItem: React.FC<CategoryItemProps> = ({ category, isSubscriptionRequired }) => {
  const { t } = useTranslation(['Categories']);
  const { deleteCategory } = useCategoryMutations();
  const [showSubCategoryForm, setShowSubCategoryForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAccessRestrictedDialog, setShowAccessRestrictedDialog] = useState(false);
  
  const subCategories = category.sub_categories || [];
  
  // Kategoriyi sil
  const handleDeleteCategory = () => {
    eventsLogger.debug('Kategori silme isteği', { categoryId: category.id });
    deleteCategory.mutate(category.id);
    setShowDeleteDialog(false);
  };
  
  // Alt kategori ekle
  const handleAddSubCategory = () => {
    if (isSubscriptionRequired) {
      setShowAccessRestrictedDialog(true);
      return;
    }
    eventsLogger.debug('Alt kategori ekleme formunu göster', { categoryId: category.id });
    setShowSubCategoryForm(true);
  };
  
  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          {category.icon && (
            <span className="text-xl">{category.icon}</span>
          )}
          <CardTitle>{category.name}</CardTitle>
          {subCategories.length > 0 && (
            <Badge variant="outline" className="ml-2">
              {subCategories.length}
            </Badge>
          )}
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Menü</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleAddSubCategory}>
              <BadgePlus className="h-4 w-4 mr-2" />
              {t('Categories:actions.create')}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              {t('Categories:actions.edit')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-destructive">
              <Trash className="h-4 w-4 mr-2" />
              {t('Categories:actions.delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      
      <CardContent>
        {showSubCategoryForm && (
          <div className="mb-4 p-4 border rounded-md">
            {/* Alt kategori formu buraya gelecek */}
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setShowSubCategoryForm(false)}>
                {t('Categories:form.cancel')}
              </Button>
              <Button type="submit">
                {t('Categories:form.submit')}
              </Button>
            </div>
          </div>
        )}
        
        {/* Alt kategoriler */}
        <SubCategoryList 
          categoryId={category.id}
          subCategories={subCategories}
          isSubscriptionRequired={isSubscriptionRequired}
        />
        
        {subCategories.length === 0 && !showSubCategoryForm && (
          <div className="text-center py-8 text-muted-foreground">
            <p>{t('Categories:labels.noSubcategories')}</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={handleAddSubCategory}>
              <BadgePlus className="h-4 w-4 mr-2" />
              {t('Categories:actions.create')}
            </Button>
          </div>
        )}
        
        {/* Abonelik gerekli uyarısı */}
        {showAccessRestrictedDialog && (
          <AccessRestrictedDialog
            isOpen={showAccessRestrictedDialog}
            onClose={() => setShowAccessRestrictedDialog(false)}
            feature={t('Categories:title')}
          />
        )}
        
        {/* Silme onay diyaloğu */}
        {/* Silme onay diyaloğu daha sonra eklenecek */}
      </CardContent>
    </Card>
  );
};

export default CategoryItem;
