
import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { categoryColors } from '@/modules/Categories/styles/tokens/colors';
import { headingVariants, textVariants } from '@/modules/Categories/styles/tokens/typography';
import { Separator } from '@/components/ui/separator';

const ColorsSection: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  const renderColorBox = (color: string, label: string) => (
    <div className="flex flex-col items-center">
      <div 
        className="h-12 w-12 rounded-md border" 
        style={{ backgroundColor: color }} 
      />
      <span className="text-xs mt-1 text-center">{label}</span>
    </div>
  );
  
  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="mb-3">
        <h2 className={cn(headingVariants({ size: 'base', weight: 'semibold', spacing: 'none' }), "mb-1")}>
          {t('Categories:styleGuide.colors.title', 'Renkler')}
        </h2>
        <p className={cn(textVariants({ emphasis: 'low', spacing: 'none' }))}>
          {t('Categories:styleGuide.colors.description', 'Kategori ve alt kategorileri için kullanılan renkler')}
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Standart H1 Rengi */}
        <div>
          <h3 className={cn(headingVariants({ size: 'sm', weight: 'medium', spacing: 'none' }), "mb-2")}>
            Standart H1 Rengi (Primary)
          </h3>
          <div className="p-4 border rounded-md bg-white">
            <div className="flex items-center gap-4">
              {renderColorBox(categoryColors.primary.blue, 'Primary Blue')}
              <div className="ml-4">
                <div className={cn(headingVariants({ size: 'lg', emphasis: 'primary', spacing: 'none' }))}>
                  H1 Başlık Örneği
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Tüm modüllerde H1 başlıklar için "emphasis: primary" kullanılır.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Ana Renkler */}
        <div>
          <h3 className={cn(headingVariants({ size: 'sm', weight: 'medium', spacing: 'none' }), "mb-2")}>
            {t('Categories:styleGuide.colors.primary', 'Ana Renkler')}
          </h3>
          <div className="p-4 border rounded-md bg-white grid grid-cols-2 sm:grid-cols-4 gap-4">
            {renderColorBox(categoryColors.primary.blue, 'Blue')}
            {renderColorBox(categoryColors.primary.green, 'Green')}
            {renderColorBox(categoryColors.primary.red, 'Red')}
            {renderColorBox(categoryColors.primary.yellow, 'Yellow')}
          </div>
        </div>
        
        {/* Pastel Renkler */}
        <div>
          <h3 className={cn(headingVariants({ size: 'sm', weight: 'medium', spacing: 'none' }), "mb-2")}>
            {t('Categories:styleGuide.colors.pastel', 'Pastel Renkler')}
          </h3>
          <div className="p-4 border rounded-md bg-white grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {renderColorBox(categoryColors.pastel.blue, 'Blue')}
            {renderColorBox(categoryColors.pastel.green, 'Green')}
            {renderColorBox(categoryColors.pastel.yellow, 'Yellow')}
            {renderColorBox(categoryColors.pastel.orange, 'Orange')}
            {renderColorBox(categoryColors.pastel.purple, 'Purple')}
            {renderColorBox(categoryColors.pastel.red, 'Red')}
          </div>
        </div>
        
        {/* İşlevsel Renkler */}
        <div>
          <h3 className={cn(headingVariants({ size: 'sm', weight: 'medium', spacing: 'none' }), "mb-2")}>
            {t('Categories:styleGuide.colors.functional', 'İşlevsel Renkler')}
          </h3>
          <div className="p-4 border rounded-md bg-white grid grid-cols-2 sm:grid-cols-4 gap-4">
            {renderColorBox(categoryColors.functional.expense, 'Expense')}
            {renderColorBox(categoryColors.functional.income, 'Income')}
            {renderColorBox(categoryColors.functional.transfer, 'Transfer')}
            {renderColorBox(categoryColors.functional.saving, 'Saving')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorsSection;
