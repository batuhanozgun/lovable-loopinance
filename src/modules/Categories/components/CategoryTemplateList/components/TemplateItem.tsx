
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { ICategoryTemplate } from '../../../types/template';

interface TemplateItemProps {
  template: ICategoryTemplate;
  onImport: (templateId: string) => void;
  isImporting: boolean;
}

export const TemplateItem: React.FC<TemplateItemProps> = ({ 
  template, 
  onImport,
  isImporting
}) => {
  const { t } = useTranslation(['Categories']);
  const subcategoriesCount = template.sub_categories?.length || 0;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          {template.icon && <span className="mr-2 text-xl">{template.icon}</span>}
          {template.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        {subcategoriesCount > 0 ? (
          <div className="space-y-2">
            <Badge variant="outline" className="bg-muted">
              {t('categories:labels.withSubcategories', { count: subcategoriesCount })}
            </Badge>
            <div className="text-sm text-muted-foreground mt-2">
              <ul className="list-disc ml-5">
                {template.sub_categories?.slice(0, 3).map((subCategory) => (
                  <li key={subCategory.id}>{subCategory.name}</li>
                ))}
                {subcategoriesCount > 3 && (
                  <li>
                    {t('categories:labels.andMore', { count: subcategoriesCount - 3 })}
                  </li>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            {t('categories:labels.noSubcategories')}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onImport(template.id)} 
          className="w-full" 
          disabled={isImporting}
        >
          {t('categories:actions.import')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateItem;
