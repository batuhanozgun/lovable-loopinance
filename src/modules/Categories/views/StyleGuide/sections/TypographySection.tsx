
import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { headingVariants, textVariants } from '@/modules/Categories/styles/tokens/typography';
import { categorySpacing } from '@/modules/Categories/styles/tokens/spacing';

const TypographySection: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <section className="bg-card p-4 rounded-md shadow-sm">
      <h2 className={cn(headingVariants({ size: 'base', spacing: 'none' }), "mb-1")}>
        {t('Categories:styleGuide.typography.title', 'Kategori Tipografisi')}
      </h2>
      <p className={cn(textVariants({ emphasis: 'low', spacing: 'none' }), "mb-4")}>
        {t('Categories:styleGuide.typography.description', 'Kategori gösterimi için kullanılan yazı stilleri')}
      </p>
      
      <div className="grid gap-4">
        <div className="border rounded-md p-3">
          <h3 className={cn(headingVariants({ size: 'sm', spacing: 'none' }), "mb-1")}>
            {t('Categories:styleGuide.typography.headings', 'Kategori Başlıkları')}
          </h3>
          <div className="space-y-2 mt-2">
            <div>
              <div className={cn(headingVariants({ size: '2xl', weight: 'bold' }))}>H1 Başlık</div>
              <code className="text-xs text-muted-foreground">headingVariants(&#123; size: '2xl', weight: 'bold' &#125;)</code>
            </div>
            <div>
              <div className={cn(headingVariants({ size: 'xl', weight: 'semibold' }))}>H2 Başlık</div>
              <code className="text-xs text-muted-foreground">headingVariants(&#123; size: 'xl', weight: 'semibold' &#125;)</code>
            </div>
            <div>
              <div className={cn(headingVariants({ size: 'lg', weight: 'medium' }))}>H3 Başlık</div>
              <code className="text-xs text-muted-foreground">headingVariants(&#123; size: 'lg', weight: 'medium' &#125;)</code>
            </div>
          </div>
        </div>
        
        <div className="border rounded-md p-3">
          <h3 className={cn(headingVariants({ size: 'sm', spacing: 'none' }), "mb-1")}>
            {t('Categories:styleGuide.typography.text', 'Kategori Metinleri')}
          </h3>
          <div className="space-y-2 mt-2">
            <div>
              <div className={cn(textVariants({ size: 'base' }))}>Normal metin</div>
              <code className="text-xs text-muted-foreground">textVariants(&#123; size: 'base' &#125;)</code>
            </div>
            <div>
              <div className={cn(textVariants({ size: 'sm', emphasis: 'low' }))}>Vurgusuz metin</div>
              <code className="text-xs text-muted-foreground">textVariants(&#123; size: 'sm', emphasis: 'low' &#125;)</code>
            </div>
            <div>
              <div className={cn(textVariants({ size: 'sm', weight: 'medium', emphasis: 'primary' }))}>Vurgulu metin</div>
              <code className="text-xs text-muted-foreground">textVariants(&#123; size: 'sm', weight: 'medium', emphasis: 'primary' &#125;)</code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypographySection;
