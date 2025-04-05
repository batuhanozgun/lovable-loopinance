
import React from 'react';
import { Heading, Text, Section } from '@/modules/LandingPage/styles';
import { useTranslation } from 'react-i18next';
import { headingVariants, textVariants } from '@/modules/Categories/styles/tokens/typography';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const TypographySection: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <Section className="mb-10">
      <Heading level="h2" className="text-xl font-semibold mb-4">
        {t('Categories:styleGuide.typography.title', 'Tipografi')}
      </Heading>
      <Text className="text-muted-foreground mb-6">
        {t('Categories:styleGuide.typography.description', 'Tüm modülde kullanılan başlık ve metin stilleri')}
      </Text>
      
      <div className="space-y-12">
        {/* Başlıklar Bölümü */}
        <div>
          <Heading level="h3" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.typography.headings', 'Başlıklar')}
          </Heading>
          <div className="p-6 border rounded-md space-y-6 bg-white">
            {/* Başlık Boyutları */}
            <div>
              <Text className="mb-3 text-muted-foreground">Boyutlar</Text>
              <div className="space-y-3">
                <div className={cn(headingVariants({ size: '2xl' }))}>
                  2XL Başlık
                </div>
                <div className={cn(headingVariants({ size: 'xl' }))}>
                  XL Başlık
                </div>
                <div className={cn(headingVariants({ size: 'lg' }))}>
                  LG Başlık (Varsayılan)
                </div>
                <div className={cn(headingVariants({ size: 'base' }))}>
                  Base Başlık
                </div>
                <div className={cn(headingVariants({ size: 'sm' }))}>
                  SM Başlık
                </div>
                <div className={cn(headingVariants({ size: 'xs' }))}>
                  XS Başlık
                </div>
              </div>
            </div>
            
            {/* Başlık Ağırlıkları */}
            <div>
              <Text className="mb-3 text-muted-foreground">Kalınlıklar</Text>
              <div className="space-y-3">
                <div className={cn(headingVariants({ weight: 'bold' }))}>
                  Kalın Başlık (Bold)
                </div>
                <div className={cn(headingVariants({ weight: 'semibold' }))}>
                  Yarı Kalın Başlık (Semibold - Varsayılan)
                </div>
                <div className={cn(headingVariants({ weight: 'medium' }))}>
                  Orta Kalın Başlık (Medium)
                </div>
                <div className={cn(headingVariants({ weight: 'normal' }))}>
                  Normal Başlık
                </div>
              </div>
            </div>
            
            {/* Başlık Vurguları */}
            <div>
              <Text className="mb-3 text-muted-foreground">Vurgular</Text>
              <div className="space-y-3">
                <div className={cn(headingVariants({ emphasis: 'primary' }))}>
                  Ana Vurgu Başlık (Primary)
                </div>
                <div className={cn(headingVariants({ emphasis: 'normal' }))}>
                  Normal Başlık (Varsayılan)
                </div>
                <div className={cn(headingVariants({ emphasis: 'low' }))}>
                  Düşük Vurgu Başlık (Low)
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* Metin Bölümü */}
        <div>
          <Heading level="h3" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.typography.text', 'Metin')}
          </Heading>
          <div className="p-6 border rounded-md space-y-6 bg-white">
            {/* Metin Boyutları */}
            <div>
              <Text className="mb-3 text-muted-foreground">Boyutlar</Text>
              <div className="space-y-3">
                <div className={cn(textVariants({ size: 'lg' }))}>
                  LG - Büyük metin
                </div>
                <div className={cn(textVariants({ size: 'base' }))}>
                  Base - Normal metin (Varsayılan)
                </div>
                <div className={cn(textVariants({ size: 'sm' }))}>
                  SM - Küçük metin
                </div>
                <div className={cn(textVariants({ size: 'xs' }))}>
                  XS - Çok küçük metin
                </div>
              </div>
            </div>
            
            {/* Metin Kalınlıkları */}
            <div>
              <Text className="mb-3 text-muted-foreground">Kalınlıklar</Text>
              <div className="space-y-3">
                <div className={cn(textVariants({ weight: 'bold' }))}>
                  Bold - Kalın metin
                </div>
                <div className={cn(textVariants({ weight: 'semibold' }))}>
                  Semibold - Yarı kalın metin
                </div>
                <div className={cn(textVariants({ weight: 'medium' }))}>
                  Medium - Orta kalın metin
                </div>
                <div className={cn(textVariants({ weight: 'normal' }))}>
                  Normal - Normal metin (Varsayılan)
                </div>
              </div>
            </div>
            
            {/* Metin Vurguları */}
            <div>
              <Text className="mb-3 text-muted-foreground">Vurgular</Text>
              <div className="space-y-3">
                <div className={cn(textVariants({ emphasis: 'primary' }))}>
                  Primary - Ana vurgu metni
                </div>
                <div className={cn(textVariants({ emphasis: 'normal' }))}>
                  Normal - Normal metin (Varsayılan)
                </div>
                <div className={cn(textVariants({ emphasis: 'low' }))}>
                  Low - Düşük vurgu metni
                </div>
              </div>
            </div>
            
            {/* Metin Stilleri */}
            <div>
              <Text className="mb-3 text-muted-foreground">Yazı Stilleri</Text>
              <div className="space-y-3">
                <div className={cn(textVariants({ fontStyle: 'normal' }))}>
                  Normal yazı stili (Varsayılan)
                </div>
                <div className={cn(textVariants({ fontStyle: 'italic' }))}>
                  İtalik yazı stili
                </div>
              </div>
            </div>
            
            {/* Kombinasyon Örnekleri */}
            <div>
              <Text className="mb-3 text-muted-foreground">Örnek Kullanımlar</Text>
              <div className="space-y-3">
                <div className={cn(textVariants({ emphasis: 'primary', weight: 'semibold', size: 'lg' }))}>
                  Önemli Büyük Mesaj
                </div>
                <div className={cn(textVariants({ emphasis: 'normal', weight: 'medium' }))}>
                  Normal Bilgi Metni
                </div>
                <div className={cn(textVariants({ emphasis: 'low', size: 'sm', fontStyle: 'italic' }))}>
                  Ek açıklama veya dipnot
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default TypographySection;
