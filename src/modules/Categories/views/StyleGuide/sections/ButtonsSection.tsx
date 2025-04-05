
import React from 'react';
import { Button } from '@/components/ui/button';
import { Section, Heading, Text, Divider } from '@/modules/LandingPage/styles';
import { useTranslation } from 'react-i18next';
import { Plus, ArrowRight, Tag, ChevronDown, Edit, Trash } from 'lucide-react';
import { IconButton } from '@/modules/LandingPage/components/common/IconButton';

const ButtonsSection: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <Section className="mb-10">
      <Heading level="h2" className="mb-2">
        {t('styleGuide.buttons.title', 'Kategori Butonları')}
      </Heading>
      <Text className="text-muted-foreground mb-4">
        {t('styleGuide.buttons.description', 'Kategori yönetimi için kullanılan buton bileşenleri')}
      </Text>
      <Divider className="mb-6" />
      
      <div className="space-y-8">
        {/* Temel Butonlar */}
        <div>
          <Heading level="h3" className="text-lg font-medium mb-3">
            {t('styleGuide.buttons.variants', 'Buton Varyantları')}
          </Heading>
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <Button>{t('styleGuide.buttons.default', 'Varsayılan')}</Button>
            <Button variant="secondary">{t('styleGuide.buttons.secondary', 'İkincil')}</Button>
            <Button variant="outline">{t('styleGuide.buttons.outline', 'Çerçeveli')}</Button>
            <Button variant="ghost">{t('styleGuide.buttons.ghost', 'Hayalet')}</Button>
            <Button variant="link">{t('styleGuide.buttons.link', 'Bağlantı')}</Button>
            <Button variant="destructive">{t('styleGuide.buttons.destructive', 'Tehlike')}</Button>
          </div>
        </div>

        {/* Buton Boyutları */}
        <div>
          <Heading level="h3" className="text-lg font-medium mb-3">
            {t('styleGuide.buttons.sizes', 'Buton Boyutları')}
          </Heading>
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <Button size="lg">{t('styleGuide.buttons.large', 'Büyük')}</Button>
            <Button>{t('styleGuide.buttons.medium', 'Orta')}</Button>
            <Button size="sm">{t('styleGuide.buttons.small', 'Küçük')}</Button>
            <Button size="icon"><Plus className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* İkonlu Butonlar */}
        <div>
          <Heading level="h3" className="text-lg font-medium mb-3">
            {t('styleGuide.buttons.withIcons', 'İkonlu Butonlar')}
          </Heading>
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <Button className="group">
              <Plus className="mr-2 h-4 w-4" />
              {t('styleGuide.buttons.addCategory', 'Kategori Ekle')}
            </Button>
            <Button variant="secondary" className="group">
              {t('styleGuide.buttons.viewSubcategories', 'Alt Kategorileri Gör')}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="group">
              <Tag className="mr-2 h-4 w-4" />
              {t('styleGuide.buttons.assignCategory', 'Kategori Ata')}
            </Button>
            <Button className="group">
              {t('styleGuide.buttons.next', 'İleri')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>

        {/* Eylem Butonları */}
        <div>
          <Heading level="h3" className="text-lg font-medium mb-3">
            {t('styleGuide.buttons.actionButtons', 'Eylem Butonları')}
          </Heading>
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <Button size="icon" variant="ghost">
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <Trash className="h-4 w-4 text-destructive" />
            </Button>
            <Button size="sm" variant="outline">
              <Edit className="mr-1 h-3.5 w-3.5" />
              {t('styleGuide.buttons.edit', 'Düzenle')}
            </Button>
            <Button size="sm" variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
              <Trash className="mr-1 h-3.5 w-3.5" />
              {t('styleGuide.buttons.delete', 'Sil')}
            </Button>
          </div>
        </div>

        {/* Icon Button Component */}
        <div>
          <Heading level="h3" className="text-lg font-medium mb-3">
            {t('styleGuide.buttons.iconButtonComponent', 'Icon Button Bileşeni')}
          </Heading>
          <div className="flex flex-wrap gap-4 items-center">
            <IconButton iconPosition="right">
              {t('styleGuide.buttons.addCategory', 'Kategori Ekle')}
              <Plus />
            </IconButton>
            <IconButton variant="secondary" iconPosition="left">
              <Tag />
              {t('styleGuide.buttons.assignCategory', 'Kategori Ata')}
            </IconButton>
            <IconButton variant="outline">
              {t('styleGuide.buttons.next', 'İleri')}
              <ArrowRight />
            </IconButton>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ButtonsSection;
