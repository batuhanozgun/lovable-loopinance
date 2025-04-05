
import React from 'react';
import { useTranslation } from 'react-i18next';
import { categoryColors } from '@/modules/Categories/styles/tokens/colors';
import { cn } from '@/lib/utils';
import { headingVariants, textVariants } from '@/modules/Categories/styles/tokens/typography';
import { Separator } from '@/components/ui/separator';

const ColorsSection: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="mb-3">
        <h2 className={cn(headingVariants({ size: 'base', weight: 'semibold', spacing: 'none' }), "mb-1")}>
          {t('Categories:styleGuide.colors.title', 'Kategori Renkleri')}
        </h2>
        <p className={cn(textVariants({ emphasis: 'low', spacing: 'none' }))}>
          {t('Categories:styleGuide.colors.description', 'Kategori ve alt kategorileri için kullanılan renkler')}
        </p>
      </div>
      
      <div className="space-y-8">
        {/* Ana renkler */}
        <div>
          <h3 className={cn(headingVariants({ size: 'sm', weight: 'medium', spacing: 'none' }), "mb-1")}>
            {t('Categories:styleGuide.colors.primary', 'Ana Renkler')}
          </h3>
          <div className="p-6 border rounded-md space-y-6 bg-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(categoryColors.primary).map(([name, color]) => (
                <ColorSwatch key={name} name={name} color={color} />
              ))}
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* Pastel renkler */}
        <div>
          <h3 className={cn(headingVariants({ size: 'sm', weight: 'medium', spacing: 'none' }), "mb-1")}>
            {t('Categories:styleGuide.colors.pastel', 'Pastel Renkler')}
          </h3>
          <div className="p-6 border rounded-md space-y-6 bg-white">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {Object.entries(categoryColors.pastel).map(([name, color]) => (
                <ColorSwatch key={name} name={name} color={color} />
              ))}
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* İşlevsel renkler */}
        <div>
          <h3 className={cn(headingVariants({ size: 'sm', weight: 'medium', spacing: 'none' }), "mb-1")}>
            {t('Categories:styleGuide.colors.functional', 'İşlevsel Renkler')}
          </h3>
          <div className="p-6 border rounded-md space-y-6 bg-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(categoryColors.functional).map(([name, color]) => (
                <ColorSwatch key={name} name={name} color={color} />
              ))}
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* Nötr renkler */}
        <div>
          <h3 className={cn(headingVariants({ size: 'sm', weight: 'medium', spacing: 'none' }), "mb-1")}>
            {t('Categories:styleGuide.colors.neutral', 'Nötr Renkler')}
          </h3>
          <div className="p-6 border rounded-md space-y-6 bg-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(categoryColors.neutral).map(([name, color]) => (
                <ColorSwatch key={name} name={name} color={color} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Renk gösterimi bileşeni - tipografi kullanımını ekliyoruz
const ColorSwatch: React.FC<{ name: string; color: string }> = ({ name, color }) => (
  <div className="flex flex-col">
    <div 
      className="h-5 rounded-md mb-1" 
      style={{ backgroundColor: color }}
    />
    <div className="flex justify-between">
      <span className={cn(textVariants({ size: 'sm', weight: 'medium' }), "capitalize")}>{name}</span>
      <span className={cn(textVariants({ size: 'xs', emphasis: 'low' }))}>{color}</span>
    </div>
  </div>
);

export default ColorsSection;
