
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formsLogger } from '../../logging';

interface CategoryFormProps {
  onClose: () => void;
  categoryId?: string;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ onClose, categoryId }) => {
  const { t } = useTranslation(['Categories']);
  const logger = formsLogger.createSubLogger('CategoryForm');
  
  const isEditing = !!categoryId;
  
  logger.debug(`CategoryForm rendered in ${isEditing ? 'edit' : 'create'} mode`, { categoryId });
  
  // Form gönderme işlemi
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logger.debug('Form submitted');
    // Gerçek form işlemlerini burada uygulayacağız
    onClose();
  };
  
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>
          {isEditing 
            ? t('Categories:actions.update') 
            : t('Categories:actions.create')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {/* Form içeriği gelecek */}
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={onClose} type="button">
              {t('Categories:form.cancel')}
            </Button>
            <Button type="submit">
              {isEditing
                ? t('Categories:form.update')
                : t('Categories:form.submit')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
