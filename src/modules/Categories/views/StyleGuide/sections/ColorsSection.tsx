
import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { headingVariants, textVariants } from '@/modules/Categories/styles/tokens/typography';

const ColorsSection: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <section className="bg-card p-4 rounded-md shadow-sm">
      <h2 className={cn(headingVariants({ size: 'base', spacing: 'none' }), "mb-1")}>
        {t('Categories:styleGuide.colors.title', 'Kategori Renkleri')}
      </h2>
      <p className={cn(textVariants({ emphasis: 'low', spacing: 'none' }), "mb-4")}>
        {t('Categories:styleGuide.colors.description', 'Kategori ve alt kategorileri için kullanılan renkler')}
      </p>
      
      <div className="space-y-4">
        <div>
          <h3 className={cn(headingVariants({ size: 'sm', spacing: 'none' }), "mb-1")}>
            {t('Categories:styleGuide.colors.primary', 'Ana Renkler')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
            <ColorSwatch color="#8B5CF6" name="primary-600" />
            <ColorSwatch color="#A78BFA" name="primary-400" />
            <ColorSwatch color="#C4B5FD" name="primary-200" />
            <ColorSwatch color="#EDE9FE" name="primary-100" />
          </div>
        </div>
        
        <div>
          <h3 className={cn(headingVariants({ size: 'sm', spacing: 'none' }), "mb-1")}>
            {t('Categories:styleGuide.colors.pastel', 'Pastel Renkler')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
            <ColorSwatch color="#E5DEFF" name="pastel-purple" />
            <ColorSwatch color="#D3E4FD" name="pastel-blue" />
            <ColorSwatch color="#F2FCE2" name="pastel-green" />
            <ColorSwatch color="#FEF7CD" name="pastel-yellow" />
            <ColorSwatch color="#FFDEE2" name="pastel-pink" />
            <ColorSwatch color="#FDE1D3" name="pastel-peach" />
          </div>
        </div>
      </div>
    </section>
  );
};

interface ColorSwatchProps {
  color: string;
  name: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, name }) => {
  return (
    <div className="flex flex-col">
      <div
        className="h-16 rounded-md shadow-sm"
        style={{ backgroundColor: color }}
      />
      <div className="mt-1 text-xs">
        <div className="font-medium">{name}</div>
        <div className="text-muted-foreground">{color}</div>
      </div>
    </div>
  );
};

export default ColorsSection;
