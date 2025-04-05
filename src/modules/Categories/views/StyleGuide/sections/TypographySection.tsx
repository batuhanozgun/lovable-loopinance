
import React from 'react';
import { Heading, Text, Divider, Section } from '@/modules/LandingPage/styles';
import { useTranslation } from 'react-i18next';
import { 
  categoryTitleVariants, 
  subcategoryTextVariants 
} from '@/modules/Categories/styles/tokens/typography';
import { cn } from '@/lib/utils';

const TypographySection: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <Section className="mb-10">
      <Heading level="h3" className="text-xl font-semibold mb-2">
        {t('Categories:styleGuide.typography.title', 'Kategori Tipografisi')}
      </Heading>
      <Text className="text-muted-foreground mb-4">
        {t('Categories:styleGuide.typography.description', 'Kategori gösterimi için kullanılan yazı stilleri')}
      </Text>
      <Divider className="mb-6" />
      
      <div className="space-y-8">
        {/* Kategori Başlıkları */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.typography.headings', 'Kategori Başlıkları')}
          </Heading>
          <div className="p-6 border rounded-md space-y-4 bg-white">
            <div className={cn(categoryTitleVariants({ size: 'xl', weight: 'bold' }))}>
              Büyük Kategori Başlığı (XL)
            </div>
            <div className={cn(categoryTitleVariants({ size: 'lg', weight: 'semibold' }))}>
              Orta Kategori Başlığı (LG)
            </div>
            <div className={cn(categoryTitleVariants({ size: 'default', weight: 'medium' }))}>
              Normal Kategori Başlığı (Default)
            </div>
            <div className={cn(categoryTitleVariants({ size: 'sm', weight: 'normal' }))}>
              Küçük Kategori Başlığı (SM)
            </div>
          </div>
        </div>
        
        {/* Alt kategori metinleri */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.typography.text', 'Kategori Metinleri')}
          </Heading>
          <div className="p-6 border rounded-md space-y-4 bg-white">
            <div className={cn(subcategoryTextVariants({ emphasis: 'high', weight: 'medium' }))}>
              Yüksek Vurgu Metni (High Emphasis)
            </div>
            <div className={cn(subcategoryTextVariants({ emphasis: 'normal', weight: 'normal' }))}>
              Normal Vurgu Metni (Normal Emphasis)
            </div>
            <div className={cn(subcategoryTextVariants({ emphasis: 'low', weight: 'normal' }))}>
              Düşük Vurgu Metni (Low Emphasis)
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default TypographySection;
