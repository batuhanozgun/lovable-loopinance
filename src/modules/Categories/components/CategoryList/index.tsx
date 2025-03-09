
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCategories } from '../../hooks/useCategories';
import { useCategoryMutations } from '../../hooks/useCategoryMutations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, FolderPlus } from 'lucide-react';
import { useSubscription } from '@/modules/Subscription/hooks/useSubscription';
import { SubscriptionPlanType } from '@/modules/Subscription/types/ISubscription';
import { eventsLogger } from '../../logging';
import { CategoryItem } from './CategoryItem';
import { EmptyState } from './EmptyState';
import type { ICategory } from '../../types';

/**
 * Kategori listesi bileşeni
 */
export const CategoryList: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  const { categories, isLoading, isError } = useCategories();
  const { subscription } = useSubscription();
  const { updateCategoryOrder } = useCategoryMutations();
  const [showCategoryForm, setShowCategoryForm] = React.useState(false);
  
  // Ücretli özellik mi?
  const isSubscriptionRequired = subscription?.plan_type === SubscriptionPlanType.TRIAL;
  
  // Yeni kategori oluşturma formunu göster/gizle
  const handleNewCategory = () => {
    eventsLogger.debug('Yeni kategori formunu göster');
    setShowCategoryForm(true);
  };
  
  // Kategori sürükleme ve bırakma işlemi tamamlandığında
  const handleCategoryOrderChange = (categories: ICategory[]) => {
    const updates = categories.map((category, index) => ({
      id: category.id,
      sort_order: index
    }));
    
    eventsLogger.debug('Kategori sıralaması güncelleme isteği', { categoriesCount: updates.length });
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('Categories:title')}</h2>
          <p className="text-muted-foreground">{t('Categories:subtitle')}</p>
        </div>
        <Button onClick={handleNewCategory} disabled={showCategoryForm}>
          <Plus className="w-4 h-4 mr-2" />
          {t('Categories:actions.create')}
        </Button>
      </div>
      
      {showCategoryForm && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>{t('Categories:actions.create')}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Kategori formu buraya gelecek */}
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setShowCategoryForm(false)}>
                {t('Categories:form.cancel')}
              </Button>
              <Button type="submit">
                {t('Categories:form.submit')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 gap-6">
        {categories.map((category) => (
          <CategoryItem 
            key={category.id} 
            category={category} 
            isSubscriptionRequired={isSubscriptionRequired}
          />
        ))}
      </div>
    </div>
  );
};
