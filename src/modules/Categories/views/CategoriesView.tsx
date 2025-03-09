
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { categoriesLogger } from '../logging';
import { CategoryList } from '../components/CategoryList';
import { loadTranslations } from '../i18n';

/**
 * Kategoriler görünümü
 * Kategorileri ve alt kategorileri yönetmek için ana görünüm
 */
export const CategoriesView: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  // i18n çevirilerini yükle
  useEffect(() => {
    loadTranslations();
  }, []);
  
  // Sayfa görüntülendiğinde logger
  useEffect(() => {
    categoriesLogger.debug('Kategoriler sayfası görüntülendi');
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-6">
      <CategoryList />
    </div>
  );
};
