
import React from 'react';
import { Heading, Text, Divider, Section } from '@/modules/LandingPage/styles';
import { useTranslation } from 'react-i18next';
import { pageHeadingVariants, descriptionTextVariants } from '@/modules/Categories/styles/tokens/typography';
import { cn } from '@/lib/utils';

const PageHeadingsSection: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <Section className="mb-10">
      <Heading level="h3" className="text-xl font-semibold mb-2">
        {t('Categories:styleGuide.pageHeadings.title', 'Sayfa Başlıkları')}
      </Heading>
      <Text className="text-muted-foreground mb-4">
        {t('Categories:styleGuide.pageHeadings.description', 'Modül sayfaları için kullanılan başlık stilleri')}
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
        
        {/* Açıklama Metni Örnekleri */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            Açıklama Metni Stilleri
          </Heading>
          <div className="p-6 border rounded-md space-y-4 bg-white">
            <div>
              <p className={cn(descriptionTextVariants({ emphasis: 'normal', size: 'default' }))}>
                Normal vurgu, varsayılan boyut - Kategori modülü, işlemlerinizi düzenli tutmanıza yardımcı olur.
              </p>
            </div>
            <div>
              <p className={cn(descriptionTextVariants({ emphasis: 'low', size: 'default' }))}>
                Düşük vurgu, varsayılan boyut - Kategorilerinizi gruplayarak harcamalarınızı daha iyi yönetin.
              </p>
            </div>
            <div>
              <p className={cn(descriptionTextVariants({ emphasis: 'high', weight: 'medium', size: 'default' }))}>
                Yüksek vurgu, orta kalınlık - Kişiselleştirilebilir kategoriler ile verilerinizi organize edin!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default PageHeadingsSection;
