
import React from 'react';
import { Heading, Text, Divider, Section } from '@/modules/LandingPage/styles';
import { useTranslation } from 'react-i18next';
import { 
  CategoryCard 
} from '@/modules/Categories/styles/components/CategoryCard';
import {
  SubcategoryCard
} from '@/modules/Categories/styles/components/SubcategoryCard';
import { CategoryBadge } from '@/modules/Categories/styles/components/CategoryBadge';
import { categoryColors } from '@/modules/Categories/styles/tokens/colors';
import { categoryStyleGuide } from '@/modules/Categories/constants/styleGuide';

const CardsSection: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <Section className="mb-10">
      <Heading level="h3" className="text-xl font-semibold mb-2">
        {t('Categories:styleGuide.cards.title', 'Kategori Kartları')}
      </Heading>
      <Text className="text-muted-foreground mb-4">
        {t('Categories:styleGuide.cards.description', 'Kategori bilgilerini görüntülemek için kullanılan kartlar')}
      </Text>
      <Divider className="mb-6" />
      
      <div className="space-y-8">
        {/* Kategori kartı varyantları */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.cards.categoryVariants', 'Kategori Kartı Varyantları')}
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryStyleGuide.elements.card.variants.map((variant) => (
              <CategoryCard key={variant} variant={variant as any}>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs text-primary">★</span>
                  </div>
                  <div>
                    <Text className="font-medium">{variant}</Text>
                    <Text className="text-sm text-muted-foreground">Örnek bir kategori kartı</Text>
                  </div>
                </div>
              </CategoryCard>
            ))}
          </div>
        </div>
        
        {/* Alt kategori kartı varyantları */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.cards.subcategoryVariants', 'Alt Kategori Kartı Varyantları')}
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryStyleGuide.elements.subcardCard.variants.map((variant) => (
              <SubcategoryCard key={variant} variant={variant as any}>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-secondary/20 flex items-center justify-center">
                    <span className="text-xs text-secondary">•</span>
                  </div>
                  <Text>{variant}</Text>
                </div>
              </SubcategoryCard>
            ))}
          </div>
        </div>
        
        {/* Örnek kullanım: İç içe kartlar */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.cards.nestedExample', 'İç İçe Kategori Örneği')}
          </Heading>
          <div className="border rounded-md p-4">
            <CategoryCard className="mb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: categoryColors.functional.expense }}></div>
                  <div>
                    <Text className="font-medium">Alışveriş</Text>
                    <Text className="text-sm text-muted-foreground">3 alt kategori</Text>
                  </div>
                </div>
                <CategoryBadge color={categoryColors.functional.expense}>Gider</CategoryBadge>
              </div>
            </CategoryCard>
            
            <div className="pl-4 space-y-2">
              <SubcategoryCard variant="nested" size="sm">
                <Text className="text-sm">Market</Text>
              </SubcategoryCard>
              <SubcategoryCard variant="nested" size="sm">
                <Text className="text-sm">Giyim</Text>
              </SubcategoryCard>
              <SubcategoryCard variant="nested" size="sm">
                <Text className="text-sm">Elektronik</Text>
              </SubcategoryCard>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CardsSection;
