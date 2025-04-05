
import React from 'react';
import { Heading, Text, Section } from '@/modules/LandingPage/styles';
import { useTranslation } from 'react-i18next';
import { categoryColors, flatCategoryColors } from '@/modules/Categories/styles/tokens/colors';
import { cn } from '@/lib/utils';
import { headingVariants, textVariants } from '@/modules/Categories/styles/tokens/typography';
import { Separator } from '@/components/ui/separator';

const ColorsSection: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <Section className="mb-10">
      <Heading level="h2" className="text-xl font-semibold mb-4">
        {t('Categories:styleGuide.colors.title', 'Kategori Renkleri')}
      </Heading>
      <Text className="text-muted-foreground mb-6">
        {t('Categories:styleGuide.colors.description', 'Kategori ve alt kategorileri için kullanılan renkler')}
      </Text>
      
      <div className="space-y-12">
        {/* Ana renkler */}
        <div>
          <Heading level="h3" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.colors.primary', 'Ana Renkler')}
          </Heading>
          <div className="p-6 border rounded-md space-y-6 bg-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(categoryColors.primary).map(([name, color]) => (
                <ColorSwatch key={name} name={name} color={color} />
              ))}
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* Pastel renkler */}
        <div>
          <Heading level="h3" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.colors.pastel', 'Pastel Renkler')}
          </Heading>
          <div className="p-6 border rounded-md space-y-6 bg-white">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.entries(categoryColors.pastel).map(([name, color]) => (
                <ColorSwatch key={name} name={name} color={color} />
              ))}
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* İşlevsel renkler */}
        <div>
          <Heading level="h3" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.colors.functional', 'İşlevsel Renkler')}
          </Heading>
          <div className="p-6 border rounded-md space-y-6 bg-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(categoryColors.functional).map(([name, color]) => (
                <ColorSwatch key={name} name={name} color={color} />
              ))}
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* Nötr renkler */}
        <div>
          <Heading level="h3" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.colors.neutral', 'Nötr Renkler')}
          </Heading>
          <div className="p-6 border rounded-md space-y-6 bg-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(categoryColors.neutral).map(([name, color]) => (
                <ColorSwatch key={name} name={name} color={color} />
              ))}
            </div>
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
