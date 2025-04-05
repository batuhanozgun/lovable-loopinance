
import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { headingVariants, textVariants } from '@/modules/Categories/styles/tokens/typography';

const TypographySection: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="mb-3">
        <h2 className={cn(headingVariants({ size: 'base', weight: 'semibold', spacing: 'none' }), "mb-1")}>
          {t('Categories:styleGuide.typography.title', 'Tipografi')}
        </h2>
        <p className={cn(textVariants({ emphasis: 'low', spacing: 'none' }))}>
          {t('Categories:styleGuide.typography.description', 'Tüm modülde kullanılan başlık ve metin stilleri')}
        </p>
      </div>
      
      <div className="space-y-8">
        {/* Başlıklar Bölümü */}
        <div>
          <h3 className={cn(headingVariants({ size: 'sm', weight: 'medium', spacing: 'none' }), "mb-1")}>
            {t('Categories:styleGuide.typography.headings', 'Başlıklar')}
          </h3>
          <div className="p-6 border rounded-md space-y-6 bg-white">
            {/* Başlık Boyutları */}
            <div>
              <p className={cn(textVariants({ emphasis: 'low', size: 'sm', spacing: 'tight' }))}>Boyutlar</p>
              <div className="space-y-4">
                <div className={cn(headingVariants({ size: 'lg' }))}>
                  LG Başlık - Sayfa Başlığı (Varsayılan)
                </div>
                <div className={cn(headingVariants({ size: 'base' }))}>
                  Base Başlık - Bölüm Başlığı
                </div>
                <div className={cn(headingVariants({ size: 'sm' }))}>
                  SM Başlık - Alt Bölüm Başlığı
                </div>
                <div className={cn(headingVariants({ size: 'xs' }))}>
                  XS Başlık - Grup Başlığı
                </div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            {/* Başlık Ağırlıkları */}
            <div>
              <p className={cn(textVariants({ emphasis: 'low', size: 'sm', spacing: 'tight' }))}>Kalınlıklar</p>
              <div className="space-y-4">
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
            
            <Separator className="my-4" />
            
            {/* Başlık Vurguları */}
            <div>
              <p className={cn(textVariants({ emphasis: 'low', size: 'sm', spacing: 'tight' }))}>Vurgular</p>
              <div className="space-y-4">
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
        
        <Separator className="my-4" />
        
        {/* Metin Bölümü */}
        <div>
          <h3 className={cn(headingVariants({ size: 'sm', weight: 'medium', spacing: 'none' }), "mb-1")}>
            {t('Categories:styleGuide.typography.text', 'Metin')}
          </h3>
          <div className="p-6 border rounded-md space-y-6 bg-white">
            {/* Metin Boyutları */}
            <div>
              <p className={cn(textVariants({ emphasis: 'low', size: 'sm', spacing: 'tight' }))}>Boyutlar</p>
              <div className="space-y-4">
                <div className={cn(textVariants({ size: 'sm' }))}>
                  SM - Normal metin (Varsayılan)
                </div>
                <div className={cn(textVariants({ size: 'xs' }))}>
                  XS - Küçük metin
                </div>
                <div className={cn(textVariants({ size: 'xs', weight: 'light' }))}>
                  XS Light - Çok küçük metin
                </div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            {/* Metin Kalınlıkları */}
            <div>
              <p className={cn(textVariants({ emphasis: 'low', size: 'sm', spacing: 'tight' }))}>Kalınlıklar</p>
              <div className="space-y-4">
                <div className={cn(textVariants({ weight: 'bold', size: 'sm' }))}>
                  Bold - Kalın metin
                </div>
                <div className={cn(textVariants({ weight: 'semibold', size: 'sm' }))}>
                  Semibold - Yarı kalın metin
                </div>
                <div className={cn(textVariants({ weight: 'medium', size: 'sm' }))}>
                  Medium - Orta kalın metin
                </div>
                <div className={cn(textVariants({ weight: 'normal', size: 'sm' }))}>
                  Normal - Normal metin (Varsayılan)
                </div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            {/* Metin Vurguları */}
            <div>
              <p className={cn(textVariants({ emphasis: 'low', size: 'sm', spacing: 'tight' }))}>Vurgular</p>
              <div className="space-y-4">
                <div className={cn(textVariants({ emphasis: 'primary', size: 'sm' }))}>
                  Primary - Ana vurgu metni
                </div>
                <div className={cn(textVariants({ emphasis: 'normal', size: 'sm' }))}>
                  Normal - Normal metin (Varsayılan)
                </div>
                <div className={cn(textVariants({ emphasis: 'low', size: 'sm' }))}>
                  Low - Düşük vurgu metni
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypographySection;
