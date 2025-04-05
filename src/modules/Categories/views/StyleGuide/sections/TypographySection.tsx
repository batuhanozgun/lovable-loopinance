
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
        {/* Başlıklar */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.typography.headings', 'Kategori Başlıkları')}
          </Heading>
          <div className="p-6 border rounded-md space-y-4 bg-white">
            <div className="space-y-3">
              <Text className="font-medium text-sm text-muted-foreground">Başlık Boyutları</Text>
              <div className="space-y-2">
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
                <div className={cn(categoryTitleVariants({ size: 'xs', weight: 'normal' }))}>
                  Çok Küçük Kategori Başlığı (XS)
                </div>
              </div>
            </div>
            
            <Divider />
            
            <div className="space-y-3">
              <Text className="font-medium text-sm text-muted-foreground">Başlık Kalınlıkları</Text>
              <div className="space-y-2">
                <div className={cn(categoryTitleVariants({ weight: 'bold' }))}>
                  Kalın Başlık (Bold)
                </div>
                <div className={cn(categoryTitleVariants({ weight: 'semibold' }))}>
                  Yarı-Kalın Başlık (Semibold)
                </div>
                <div className={cn(categoryTitleVariants({ weight: 'medium' }))}>
                  Orta Kalın Başlık (Medium)
                </div>
                <div className={cn(categoryTitleVariants({ weight: 'normal' }))}>
                  Normal Başlık (Normal)
                </div>
              </div>
            </div>
            
            <Divider />
            
            <div className="space-y-3">
              <Text className="font-medium text-sm text-muted-foreground">Başlık Dönüşümleri</Text>
              <div className="space-y-2">
                <div className={cn(categoryTitleVariants({ transform: 'uppercase' }))}>
                  BÜYÜK HARFLE BAŞLIK (Uppercase)
                </div>
                <div className={cn(categoryTitleVariants({ transform: 'capitalize' }))}>
                  Her Kelimenin İlk Harfi Büyük (Capitalize)
                </div>
                <div className={cn(categoryTitleVariants({ transform: 'lowercase' }))}>
                  tamamı küçük harf (lowercase)
                </div>
                <div className={cn(categoryTitleVariants({ transform: 'normal' }))}>
                  Normal Başlık (Normal)
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Alt kategori metinleri */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.typography.text', 'Kategori Metinleri')}
          </Heading>
          <div className="p-6 border rounded-md space-y-4 bg-white">
            <div className="space-y-3">
              <Text className="font-medium text-sm text-muted-foreground">Metin Boyutları</Text>
              <div className="space-y-2">
                <div className={cn(subcategoryTextVariants({ size: 'lg', emphasis: 'normal' }))}>
                  Büyük Alt Kategori Metni (LG)
                </div>
                <div className={cn(subcategoryTextVariants({ size: 'default', emphasis: 'normal' }))}>
                  Normal Alt Kategori Metni (Default)
                </div>
                <div className={cn(subcategoryTextVariants({ size: 'sm', emphasis: 'normal' }))}>
                  Küçük Alt Kategori Metni (SM)
                </div>
                <div className={cn(subcategoryTextVariants({ size: 'xs', emphasis: 'normal' }))}>
                  Çok Küçük Alt Kategori Metni (XS)
                </div>
              </div>
            </div>
            
            <Divider />
            
            <div className="space-y-3">
              <Text className="font-medium text-sm text-muted-foreground">Metin Vurgulama Seviyeleri</Text>
              <div className="space-y-2">
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
            
            <Divider />
            
            <div className="space-y-3">
              <Text className="font-medium text-sm text-muted-foreground">Metin Kalınlıkları</Text>
              <div className="space-y-2">
                <div className={cn(subcategoryTextVariants({ weight: 'semibold', emphasis: 'normal' }))}>
                  Yarı-Kalın Metin (Semibold)
                </div>
                <div className={cn(subcategoryTextVariants({ weight: 'medium', emphasis: 'normal' }))}>
                  Orta Kalın Metin (Medium)
                </div>
                <div className={cn(subcategoryTextVariants({ weight: 'normal', emphasis: 'normal' }))}>
                  Normal Metin (Normal)
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Gerçek hayat örnekleri */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.typography.examples', 'Örnek Kullanımlar')}
          </Heading>
          <div className="p-6 border rounded-md space-y-6 bg-white">
            <div>
              <div className={cn(categoryTitleVariants({ size: 'lg', weight: 'semibold' }))}>
                Harcamalar
              </div>
              <div className="mt-2 space-y-1">
                <div className={cn(subcategoryTextVariants({ emphasis: 'normal' }))}>
                  Yemek ve İçecekler
                </div>
                <div className={cn(subcategoryTextVariants({ emphasis: 'low' }))}>
                  Restoran, Kafe, Market
                </div>
              </div>
            </div>
            
            <div>
              <div className={cn(categoryTitleVariants({ size: 'lg', weight: 'semibold', transform: 'capitalize' }))}>
                Gelirler
              </div>
              <div className="mt-2 space-y-1">
                <div className={cn(subcategoryTextVariants({ emphasis: 'high', weight: 'medium' }))}>
                  Maaş
                </div>
                <div className={cn(subcategoryTextVariants({ emphasis: 'normal' }))}>
                  Ek Gelir
                </div>
              </div>
            </div>
            
            <Divider />
            
            <div className="p-4 border rounded bg-slate-50">
              <div className={cn(categoryTitleVariants({ size: 'default', weight: 'semibold' }))}>
                Kategori Kartı Başlığı
              </div>
              <div className="mt-2">
                <div className={cn(subcategoryTextVariants({ size: 'sm', emphasis: 'low' }))}>
                  Alt kategori açıklaması ve detaylar buraya gelecektir.
                  Bu metin, kategori kartlarının içinde kullanılabilir.
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
