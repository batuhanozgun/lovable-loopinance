
import React from 'react';
import { Heading, Text, Divider, Section } from '@/modules/LandingPage/styles';
import { useTranslation } from 'react-i18next';
import { categoryColors, flatCategoryColors } from '@/modules/Categories/styles/tokens/colors';
import { cn } from '@/lib/utils';
import { headingVariants, textVariants } from '@/modules/Categories/styles/tokens/typography';

const ColorsSection: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <Section className="mb-10">
      <div className={cn(headingVariants({ size: 'xl', weight: 'semibold', spacing: 'tight' }))}>
        {t('Categories:styleGuide.colors.title', 'Kategori Renkleri')}
      </div>
      <div className={cn(textVariants({ emphasis: 'low', spacing: 'normal' }))}>
        {t('Categories:styleGuide.colors.description', 'Kategori ve alt kategorileri için kullanılan renkler')}
      </div>
      <Divider className="mb-6" />
      
      <div className="space-y-6">
        {/* Ana renkler */}
        <div>
          <div className={cn(headingVariants({ size: 'lg', weight: 'medium', spacing: 'tight' }))}>
            {t('Categories:styleGuide.colors.primary', 'Ana Renkler')}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(categoryColors.primary).map(([name, color]) => (
              <ColorSwatch key={name} name={name} color={color} />
            ))}
          </div>
        </div>
        
        {/* Pastel renkler */}
        <div>
          <div className={cn(headingVariants({ size: 'lg', weight: 'medium', spacing: 'tight' }))}>
            {t('Categories:styleGuide.colors.pastel', 'Pastel Renkler')}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(categoryColors.pastel).map(([name, color]) => (
              <ColorSwatch key={name} name={name} color={color} />
            ))}
          </div>
        </div>
        
        {/* İşlevsel renkler */}
        <div>
          <div className={cn(headingVariants({ size: 'lg', weight: 'medium', spacing: 'tight' }))}>
            {t('Categories:styleGuide.colors.functional', 'İşlevsel Renkler')}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(categoryColors.functional).map(([name, color]) => (
              <ColorSwatch key={name} name={name} color={color} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

// Renk gösterimi bileşeni - %80 küçültülmüş
const ColorSwatch: React.FC<{ name: string; color: string }> = ({ name, color }) => (
  <div className="flex flex-col">
    <div 
      className="h-3 rounded-md mb-2"
      style={{ backgroundColor: color }}
    />
    <div className="flex justify-between">
      <span className={cn(textVariants({ size: 'sm', weight: 'medium' }), "capitalize")}>{name}</span>
      <span className={cn(textVariants({ size: 'xs', emphasis: 'low' }))}>{color}</span>
    </div>
  </div>
);

export default ColorsSection;
