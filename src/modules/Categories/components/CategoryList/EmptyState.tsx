
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderPlus } from 'lucide-react';

interface EmptyStateProps {
  onCreateCategory: () => void;
}

/**
 * Kategori yokken gösterilecek boş durum bileşeni
 */
export const EmptyState: React.FC<EmptyStateProps> = ({ onCreateCategory }) => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <Card className="w-full text-center">
      <CardHeader>
        <CardTitle className="text-2xl">{t('Categories:empty.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center my-8">
          <FolderPlus className="h-20 w-20 text-muted-foreground/50" />
        </div>
        <p className="text-muted-foreground mb-6">
          {t('Categories:empty.description')}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center pb-8">
        <Button size="lg" onClick={onCreateCategory}>
          <FolderPlus className="mr-2 h-5 w-5" />
          {t('Categories:empty.cta')}
        </Button>
      </CardFooter>
    </Card>
  );
};
