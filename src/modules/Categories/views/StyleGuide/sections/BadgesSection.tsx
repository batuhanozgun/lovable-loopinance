
import React from 'react';
import { Heading, Text, Divider, Section } from '@/modules/LandingPage/styles';
import { useTranslation } from 'react-i18next';
import { CategoryBadge } from '@/modules/Categories/styles/components/CategoryBadge';
import { categoryColors } from '@/modules/Categories/styles/tokens/colors';
import { categoryStyleGuide } from '@/modules/Categories/constants/styleGuide';

const BadgesSection: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <Section className="mb-10">
      <Heading level="h3" className="text-xl font-semibold mb-2">
        {t('Categories:styleGuide.badges.title', 'Kategori Rozetleri')}
      </Heading>
      <Text className="text-muted-foreground mb-4">
        {t('Categories:styleGuide.badges.description', 'Kategori ve alt kategorileri görüntülemek için kullanılan rozetler')}
      </Text>
      <Divider className="mb-6" />
      
      <div className="space-y-6">
        {/* Varyantlar */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.badges.variants', 'Rozet Varyantları')}
          </Heading>
          <div className="flex flex-wrap gap-3">
            {categoryStyleGuide.elements.badge.variants.map((variant) => (
              <CategoryBadge key={variant} variant={variant as any}>
                {variant}
              </CategoryBadge>
            ))}
          </div>
        </div>
        
        {/* Boyutlar */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.badges.sizes', 'Rozet Boyutları')}
          </Heading>
          <div className="flex flex-wrap gap-3 items-center">
            {categoryStyleGuide.elements.badge.sizes.map((size) => (
              <CategoryBadge key={size} size={size as any}>
                {size}
              </CategoryBadge>
            ))}
          </div>
        </div>
        
        {/* Renkler ile */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.badges.withColors', 'Renkli Rozetler')}
          </Heading>
          <div className="flex flex-wrap gap-3">
            <CategoryBadge color={categoryColors.primary.blue}>Mavi</CategoryBadge>
            <CategoryBadge color={categoryColors.primary.green}>Yeşil</CategoryBadge>
            <CategoryBadge color={categoryColors.primary.red}>Kırmızı</CategoryBadge>
            <CategoryBadge color={categoryColors.primary.yellow}>Sarı</CategoryBadge>
            <CategoryBadge color={categoryColors.pastel.purple}>Mor</CategoryBadge>
            <CategoryBadge color={categoryColors.pastel.orange}>Turuncu</CategoryBadge>
          </div>
        </div>
        
        {/* Örnek kullanım */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.badges.examples', 'Örnek Kullanımlar')}
          </Heading>
          <div className="p-4 border rounded-md space-y-4">
            <div>
              <Text className="mb-2 font-medium">Harcama Kategorileri</Text>
              <div className="flex flex-wrap gap-2">
                <CategoryBadge color={categoryColors.functional.expense}>Yemek</CategoryBadge>
                <CategoryBadge color={categoryColors.functional.expense}>Ulaşım</CategoryBadge>
                <CategoryBadge color={categoryColors.functional.expense}>Alışveriş</CategoryBadge>
              </div>
            </div>
            
            <div>
              <Text className="mb-2 font-medium">Gelir Kategorileri</Text>
              <div className="flex flex-wrap gap-2">
                <CategoryBadge color={categoryColors.functional.income}>Maaş</CategoryBadge>
                <CategoryBadge color={categoryColors.functional.income}>Ek Gelir</CategoryBadge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default BadgesSection;
