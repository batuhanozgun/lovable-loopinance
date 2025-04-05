
import React from 'react';
import { Heading, Text, Divider, Section } from '@/modules/LandingPage/styles';
import { useTranslation } from 'react-i18next';
import { categoryColors, flatCategoryColors } from '@/modules/Categories/styles/tokens/colors';

const ColorsSection: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <Section className="mb-10">
      <Heading level="h3" className="text-xl font-semibold mb-2">
        {t('Categories:styleGuide.colors.title', 'Kategori Renkleri')}
      </Heading>
      <Text className="text-muted-foreground mb-4">
        {t('Categories:styleGuide.colors.description', 'Kategori ve alt kategorileri için kullanılan renkler')}
      </Text>
      <Divider className="mb-6" />
      
      <div className="space-y-6">
        {/* Ana renkler */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.colors.primary', 'Ana Renkler')}
          </Heading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(categoryColors.primary).map(([name, color]) => (
              <ColorSwatch key={name} name={name} color={color} />
            ))}
          </div>
        </div>
        
        {/* Pastel renkler */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.colors.pastel', 'Pastel Renkler')}
          </Heading>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(categoryColors.pastel).map(([name, color]) => (
              <ColorSwatch key={name} name={name} color={color} />
            ))}
          </div>
        </div>
        
        {/* İşlevsel renkler */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.colors.functional', 'İşlevsel Renkler')}
          </Heading>
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

// Renk gösterimi bileşeni
const ColorSwatch: React.FC<{ name: string; color: string }> = ({ name, color }) => (
  <div className="flex flex-col">
    <div 
      className="h-16 rounded-md mb-2"
      style={{ backgroundColor: color }}
    />
    <div className="flex justify-between">
      <span className="font-medium capitalize">{name}</span>
      <span className="text-muted-foreground">{color}</span>
    </div>
  </div>
);

export default ColorsSection;
