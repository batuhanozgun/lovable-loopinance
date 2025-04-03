
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { useCategoryInfo } from '@/modules/Categories/hooks/useCategoryInfo';

interface CategoryBadgeProps {
  categoryId?: string;
  subcategoryId?: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  categoryId,
  subcategoryId
}) => {
  const { t } = useTranslation(['StatementManagement']);
  const { categoryName, subcategoryName, isLoading } = useCategoryInfo(categoryId, subcategoryId);
  
  if (isLoading) {
    return (
      <Badge variant="outline" className="bg-muted/30">
        {t('transactions.loading')}
      </Badge>
    );
  }
  
  if (!categoryName) {
    return null;
  }
  
  return (
    <Badge variant="outline" className="bg-muted/30">
      {categoryName}{subcategoryName ? ` / ${subcategoryName}` : ''}
    </Badge>
  );
};
