
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TemplateList } from '../components/TemplateList';

/**
 * Kategori Şablonları Ana Görünümü
 * Bu sayfa, kullanıcıların mevcut şablonları görüntülemesini ve içe aktarmasını sağlar
 */
export const CategoryTemplatesView: React.FC = () => {
  const { t } = useTranslation(['Categories']);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-2">{t('Categories:template.title')}</h1>
      <p className="text-muted-foreground mb-6">{t('Categories:template.description')}</p>
      
      <TemplateList />
    </div>
  );
};

export default CategoryTemplatesView;
