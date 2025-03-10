
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FolderPlus } from 'lucide-react';

/**
 * Kategori listesi boş olduğunda gösterilecek bileşen
 */
export const EmptyState: React.FC = () => {
  const { t } = useTranslation(['Categories']);

  return (
    <div className="p-8 text-center bg-muted/20 rounded-lg border border-dashed border-muted">
      <FolderPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">
        {t('Categories:emptyState.title', 'Henüz kategori bulunmuyor')}
      </h3>
      <p className="text-muted-foreground max-w-sm mx-auto">
        {t('Categories:emptyState.description', 'Harcamalarınızı düzenlemek için kategoriler oluşturabilirsiniz.')}
      </p>
    </div>
  );
};

export default EmptyState;
