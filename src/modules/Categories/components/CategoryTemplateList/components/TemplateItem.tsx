
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { ICategoryTemplate, SupportedLanguage } from '../../../types/template';
import { Check, Loader2, Plus } from 'lucide-react';
import { getLocalizedName } from '../../../utils/languageUtils';

interface TemplateItemProps {
  template: ICategoryTemplate;
  language: SupportedLanguage;
  onImport: (templateId: string) => void;
  isImporting: boolean;
}

export const TemplateItem: React.FC<TemplateItemProps> = ({ 
  template, 
  language,
  onImport,
  isImporting
}) => {
  const { t } = useTranslation(['Categories']);
  const subcategoriesCount = template.sub_categories?.length || 0;
  
  // name artık doğrudan string olarak gelecek, Records<string, string> değil
  // template.name artık stringdir, çünkü CategoryTemplateQueryService zaten dönüştürdü
  const templateName = typeof template.name === 'string' 
    ? template.name 
    : getLocalizedName(template.name as Record<string, string>, language, 'Unnamed Template');

  return (
    <Card className="w-full h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          {template.icon && <span className="mr-2 text-xl">{template.icon}</span>}
          {templateName}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        {subcategoriesCount > 0 ? (
          <div className="space-y-2">
            <Badge variant="outline" className="bg-muted">
              {t('Categories:labels.withSubcategories', { count: subcategoriesCount })}
            </Badge>
            <div className="text-sm text-muted-foreground mt-2">
              <ul className="list-disc ml-5">
                {template.sub_categories?.slice(0, 3).map((subCategory) => (
                  <li key={subCategory.id}>
                    {typeof subCategory.name === 'string' 
                      ? subCategory.name 
                      : getLocalizedName(subCategory.name as Record<string, string>, language, subCategory.id)}
                  </li>
                ))}
                {subcategoriesCount > 3 && (
                  <li>
                    {t('Categories:labels.andMore', { count: subcategoriesCount - 3 })}
                  </li>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            {t('Categories:labels.noSubcategories')}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onImport(template.id)} 
          className="w-full" 
          disabled={isImporting}
        >
          {isImporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('Categories:actions.importing')}
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              {t('Categories:actions.import')}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateItem;
