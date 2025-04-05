
import React from 'react';
import { Heading, Text, Divider, Section } from '@/modules/LandingPage/styles';
import { useTranslation } from 'react-i18next';
import { 
  categoryTitleVariants, 
  subcategoryTextVariants,
  pageHeadingVariants,
  descriptionTextVariants
} from '@/modules/Categories/styles/tokens/typography';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const TypographySection: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <Section className="mb-10">
      <Heading level="h3" className="text-xl font-semibold mb-2">
        {t('Categories:styleGuide.typography.title', 'Kategori Tipografisi')}
      </Heading>
      <Text className="text-muted-foreground mb-4">
        {t('Categories:styleGuide.typography.description', 'Kategori modülünde kullanılan yazı stilleri')}
      </Text>
      <Divider className="mb-6" />
      
      <div className="space-y-12">
        {/* Sayfa Başlıkları Bölümü */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.pageHeadings.title', 'Sayfa Başlıkları')}
          </Heading>
          <div className="p-6 border rounded-md space-y-4 bg-white">
            <div className={cn(pageHeadingVariants({ level: 'h1', weight: 'bold' }))}>
              H1 - Ana Sayfa Başlığı
            </div>
            <div className={cn(pageHeadingVariants({ level: 'h2', weight: 'semibold' }))}>
              H2 - Bölüm Başlığı
            </div>
            <div className={cn(pageHeadingVariants({ level: 'h3', weight: 'medium' }))}>
              H3 - Alt Bölüm Başlığı
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* Normal Metin Bölümü */}
        <div>
          <Heading level="h4" className="text-lg font-medium mb-3">
            {t('Categories:styleGuide.typography.text', 'Normal Metin')}
          </Heading>
          <div className="p-6 border rounded-md space-y-4 bg-white">
            <div>
              <p className={cn(descriptionTextVariants({ emphasis: 'high', size: 'default', weight: 'semibold' }))}>
                Önemli metin - Kullanıcı dikkatini çekmesi gereken bilgiler
              </p>
            </div>
            <div>
              <p className={cn(descriptionTextVariants({ emphasis: 'normal', size: 'default' }))}>
                Normal metin - Genel bilgi ve açıklamalar için kullanılan standart metin stili
              </p>
            </div>
            <div>
              <p className={cn(descriptionTextVariants({ emphasis: 'low', size: 'default' }))}>
                Düşük vurgulu metin - İkincil veya ek bilgiler için kullanılan metin stili
              </p>
            </div>
            <div>
              <p className={cn(descriptionTextVariants({ emphasis: 'normal', size: 'sm' }))}>
                Küçük metin - Dipnotlar veya açıklamalar için kullanılan küçük metin stili
              </p>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* Kategori Başlıkları Bölümü */}
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
      </div>
    </Section>
  );
};

export default TypographySection;
