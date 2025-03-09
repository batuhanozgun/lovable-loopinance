
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCategories } from '../../hooks/useCategories';
import { useCategoryMutations } from '../../hooks/useCategoryMutations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useSubscription } from '@/modules/Subscription/hooks/useSubscription';
import { SubscriptionPlanType } from '@/modules/Subscription/types/ISubscription';
import { uiLogger } from '../../logging';
import { CategoryItem } from './components/CategoryItem';
import { EmptyState } from './EmptyState';
import type { ICategory } from '../../types';
import { ListHeader } from './components/ListHeader';
import { CategoryForm } from '../CategoryForm';

/**
 * Kategori listesi bileşeni
 */
export const CategoryList: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  const { categories, isLoading, isError } = useCategories();
  const { subscription } = useSubscription();
  const { updateCategoryOrder } = useCategoryMutations();
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  
  const logger = uiLogger.createSubLogger('CategoryList');
  
  // Ücretli özellik kontrolü
  const isTrialUser = subscription?.plan === SubscriptionPlanType.TRIAL;
  
  // Yeni kategori oluşturma formunu göster/gizle
  const handleNewCategory = () => {
    logger.debug('Yeni kategori formunu göster');
    setShowCategoryForm(true);
  };
  
  // Form kapatma işlemi
  const handleCloseForm = () => {
    setShowCategoryForm(false);
  };
  
  // Kategori sıralaması güncelleme
  const handleCategoryOrderChange = (categories: ICategory[]) => {
    const updates = categories.map((category, index) => ({
      id: category.id,
      sort_order: index
    }));
    
    logger.debug('Kategori sıralaması güncelleme isteği', { categoriesCount: updates.length });
    updateCategoryOrder.mutate(updates);
  };
  
  // Yükleniyor durumu
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  
  // Hata durumu
  if (isError) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t('Categories:title')}</CardTitle>
          <CardDescription>{t('Errors:fetch.failed')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => window.location.reload()}>
            {t('common:retry')}
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  // Kategori yoksa boş durum
  if (categories.length === 0) {
    return (
      <EmptyState onCreateCategory={handleNewCategory} />
    );
  }
  
  // Kategoriler listesi
  return (
    <div className="space-y-6">
      <ListHeader 
        onNewCategory={handleNewCategory} 
        isFormVisible={showCategoryForm}
      />
      
      {showCategoryForm && (
        <CategoryForm onClose={handleCloseForm} />
      )}
      
      <div className="grid grid-cols-1 gap-6">
        {categories.map((category) => (
          <CategoryItem 
            key={category.id} 
            category={category} 
            isSubscriptionRequired={isTrialUser}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
