
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';
import { Plus, ArrowRight, Tag, ChevronDown, Edit, Trash } from 'lucide-react';
import { IconButton } from '@/modules/LandingPage/components/common/IconButton';
import { cn } from '@/lib/utils';
import { headingVariants, textVariants } from '@/modules/Categories/styles/tokens/typography';

const ButtonsSection: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="mb-3">
        <h2 className={cn(headingVariants({ size: 'base', weight: 'semibold', spacing: 'none' }), "mb-1")}>
          {t('Categories:styleGuide.buttons.title', 'Kategori Butonları')}
        </h2>
        <p className={cn(textVariants({ emphasis: 'low', spacing: 'none' }))}>
          {t('Categories:styleGuide.buttons.description', 'Kategori yönetimi için kullanılan buton bileşenleri')}
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Temel Butonlar */}
        <div>
          <h3 className={cn(headingVariants({ size: 'sm', weight: 'medium', spacing: 'none' }), "mb-2")}>
            {t('Categories:styleGuide.buttons.variants', 'Buton Varyantları')}
          </h3>
          <div className="p-4 border rounded-md bg-white flex flex-wrap gap-4 items-center">
            <Button>{t('Categories:styleGuide.buttons.default', 'Varsayılan')}</Button>
            <Button variant="secondary">{t('Categories:styleGuide.buttons.secondary', 'İkincil')}</Button>
            <Button variant="outline">{t('Categories:styleGuide.buttons.outline', 'Çerçeveli')}</Button>
            <Button variant="ghost">{t('Categories:styleGuide.buttons.ghost', 'Hayalet')}</Button>
            <Button variant="link">{t('Categories:styleGuide.buttons.link', 'Bağlantı')}</Button>
            <Button variant="destructive">{t('Categories:styleGuide.buttons.destructive', 'Tehlike')}</Button>
          </div>
        </div>

        <Separator className="my-4" />
        
        {/* Buton Boyutları */}
        <div>
          <h3 className={cn(headingVariants({ size: 'sm', weight: 'medium', spacing: 'none' }), "mb-2")}>
            {t('Categories:styleGuide.buttons.sizes', 'Buton Boyutları')}
          </h3>
          <div className="p-4 border rounded-md bg-white flex flex-wrap gap-4 items-center">
            <Button size="lg">{t('Categories:styleGuide.buttons.large', 'Büyük')}</Button>
            <Button>{t('Categories:styleGuide.buttons.medium', 'Orta')}</Button>
            <Button size="sm">{t('Categories:styleGuide.buttons.small', 'Küçük')}</Button>
            <Button size="icon"><Plus className="h-4 w-4" /></Button>
          </div>
        </div>

        <Separator className="my-4" />
        
        {/* İkonlu Butonlar */}
        <div>
          <h3 className={cn(headingVariants({ size: 'sm', weight: 'medium', spacing: 'none' }), "mb-2")}>
            {t('Categories:styleGuide.buttons.withIcons', 'İkonlu Butonlar')}
          </h3>
          <div className="p-4 border rounded-md bg-white flex flex-wrap gap-4 items-center">
            <Button className="group">
              <Plus className="mr-2 h-4 w-4" />
              {t('Categories:styleGuide.buttons.addCategory', 'Kategori Ekle')}
            </Button>
            <Button variant="secondary" className="group">
              {t('Categories:styleGuide.buttons.viewSubcategories', 'Alt Kategorileri Gör')}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="group">
              <Tag className="mr-2 h-4 w-4" />
              {t('Categories:styleGuide.buttons.assignCategory', 'Kategori Ata')}
            </Button>
            <Button className="group">
              {t('Categories:styleGuide.buttons.next', 'İleri')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>

        <Separator className="my-4" />
        
        {/* Eylem Butonları */}
        <div>
          <h3 className={cn(headingVariants({ size: 'sm', weight: 'medium', spacing: 'none' }), "mb-2")}>
            {t('Categories:styleGuide.buttons.actionButtons', 'Eylem Butonları')}
          </h3>
          <div className="p-4 border rounded-md bg-white flex flex-wrap gap-4 items-center">
            <Button size="icon" variant="ghost">
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <Trash className="h-4 w-4 text-destructive" />
            </Button>
            <Button size="sm" variant="outline">
              <Edit className="mr-1 h-3.5 w-3.5" />
              {t('Categories:styleGuide.buttons.edit', 'Düzenle')}
            </Button>
            <Button size="sm" variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
              <Trash className="mr-1 h-3.5 w-3.5" />
              {t('Categories:styleGuide.buttons.delete', 'Sil')}
            </Button>
          </div>
        </div>

        <Separator className="my-4" />
        
        {/* Icon Button Component */}
        <div>
          <h3 className={cn(headingVariants({ size: 'sm', weight: 'medium', spacing: 'none' }), "mb-2")}>
            {t('Categories:styleGuide.buttons.iconButtonComponent', 'Icon Button Bileşeni')}
          </h3>
          <div className="p-4 border rounded-md bg-white flex flex-wrap gap-4 items-center">
            <IconButton iconPosition="right">
              {t('Categories:styleGuide.buttons.addCategory', 'Kategori Ekle')}
              <Plus />
            </IconButton>
            <IconButton variant="secondary" iconPosition="left">
              <Tag />
              {t('Categories:styleGuide.buttons.assignCategory', 'Kategori Ata')}
            </IconButton>
            <IconButton variant="outline">
              {t('Categories:styleGuide.buttons.next', 'İleri')}
              <ArrowRight />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonsSection;
