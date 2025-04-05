
import React from 'react';
import { Heading, Text, Divider, Section } from '@/modules/LandingPage/styles';
import { useTranslation } from 'react-i18next';
import { pageHeadingVariants } from '@/modules/Categories/styles/tokens/typography';
import { cn } from '@/lib/utils';

const PageHeadingsSection: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <Section className="mb-10">
      <Heading level="h3" className="text-xl font-semibold mb-2">
        {t('Categories:styleGuide.pageHeadings.title', 'Sayfa Başlıkları')}
      </Heading>
      <Text className="text-muted-foreground mb-4">
        {t('Categories:styleGuide.pageHeadings.description', 'Modül sayfaları için kullanılan başlık stilleri (Yeni: %50 küçültülmüş)')}
      </Text>
      <Divider className="mb-6" />
      
      <div className="space-y-8">
        {/* Başlık Seviyeleri */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.pageHeadings.levels', 'Başlık Seviyeleri')}
          </Heading>
          <div className="p-6 border rounded-md space-y-4 bg-white">
            <div className={cn(pageHeadingVariants({ level: 'h1', weight: 'bold' }))}>
              H1 - Başlık 1
            </div>
            <div className={cn(pageHeadingVariants({ level: 'h2', weight: 'semibold' }))}>
              H2 - Başlık 2
            </div>
            <div className={cn(pageHeadingVariants({ level: 'h3', weight: 'medium' }))}>
              H3 - Başlık 3
            </div>
          </div>
        </div>
        
        {/* Başlık Kalınlıkları */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.pageHeadings.weights', 'Başlık Kalınlıkları')}
          </Heading>
          <div className="p-6 border rounded-md space-y-4 bg-white">
            <div className={cn(pageHeadingVariants({ level: 'h2', weight: 'bold' }))}>
              Bold (Kalın) Başlık
            </div>
            <div className={cn(pageHeadingVariants({ level: 'h2', weight: 'semibold' }))}>
              Semibold (Yarı Kalın) Başlık
            </div>
            <div className={cn(pageHeadingVariants({ level: 'h2', weight: 'medium' }))}>
              Medium (Orta Kalın) Başlık
            </div>
            <div className={cn(pageHeadingVariants({ level: 'h2', weight: 'normal' }))}>
              Normal Başlık
            </div>
          </div>
        </div>
        
        {/* Başlık Boşlukları */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.pageHeadings.spacings', 'Başlık Boşlukları')}
          </Heading>
          <div className="p-6 border rounded-md space-y-0 bg-white">
            <div className={cn(pageHeadingVariants({ level: 'h2', spacing: 'none' }))}>
              Boşluksuz Başlık (None)
            </div>
            <div className="bg-gray-100 h-1 w-full"></div>
            
            <div className={cn(pageHeadingVariants({ level: 'h2', spacing: 'tight' }))}>
              Dar Boşluklu Başlık (Tight)
            </div>
            <div className="bg-gray-100 h-1 w-full"></div>
            
            <div className={cn(pageHeadingVariants({ level: 'h2', spacing: 'normal' }))}>
              Normal Boşluklu Başlık (Normal)
            </div>
            <div className="bg-gray-100 h-1 w-full"></div>
            
            <div className={cn(pageHeadingVariants({ level: 'h2', spacing: 'relaxed' }))}>
              Geniş Boşluklu Başlık (Relaxed)
            </div>
            <div className="bg-gray-100 h-1 w-full"></div>
          </div>
        </div>
        
        {/* Başlık Hizalamaları */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.pageHeadings.aligns', 'Başlık Hizalamaları')}
          </Heading>
          <div className="p-6 border rounded-md space-y-4 bg-white">
            <div className={cn(pageHeadingVariants({ level: 'h2', align: 'left' }))}>
              Sola Hizalı Başlık (Left)
            </div>
            <div className={cn(pageHeadingVariants({ level: 'h2', align: 'center' }))}>
              Ortaya Hizalı Başlık (Center)
            </div>
            <div className={cn(pageHeadingVariants({ level: 'h2', align: 'right' }))}>
              Sağa Hizalı Başlık (Right)
            </div>
          </div>
        </div>
        
        {/* Başlık Vurguları */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.pageHeadings.emphasis', 'Başlık Vurguları')}
          </Heading>
          <div className="p-6 border rounded-md space-y-4 bg-white">
            <div className={cn(pageHeadingVariants({ level: 'h2', emphasis: 'normal' }))}>
              Normal Vurgulu Başlık
            </div>
            <div className={cn(pageHeadingVariants({ level: 'h2', emphasis: 'muted' }))}>
              Sönük Vurgulu Başlık (Muted)
            </div>
            <div className={cn(pageHeadingVariants({ level: 'h2', emphasis: 'primary' }))}>
              Birincil Vurgulu Başlık (Primary)
            </div>
          </div>
        </div>
        
        {/* Gerçek Hayat Örnekleri */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.pageHeadings.examples', 'Örnek Kullanımlar')}
          </Heading>
          <div className="p-6 border rounded-md space-y-10 bg-white">
            <div className="space-y-4">
              <div className={cn(pageHeadingVariants({ level: 'h1', weight: 'bold', emphasis: 'normal' }))}>
                Kategoriler
              </div>
              <Text className="text-muted-foreground">
                Kategorilerinizi yönetin ve organize edin
              </Text>
              <Divider />
            </div>
            
            <div className="space-y-4">
              <div className={cn(pageHeadingVariants({ level: 'h2', weight: 'semibold', emphasis: 'primary' }))}>
                Kategori İstatistikleri
              </div>
              <div className="p-4 border rounded">
                <Text>İstatistik kartları burada yer alabilir</Text>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className={cn(pageHeadingVariants({ level: 'h2', align: 'center', spacing: 'relaxed' }))}>
                Kategori Şablonları
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border rounded">Şablon 1</div>
                <div className="p-4 border rounded">Şablon 2</div>
                <div className="p-4 border rounded">Şablon 3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default PageHeadingsSection;
