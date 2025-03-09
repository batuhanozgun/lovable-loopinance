
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { ICategoryTemplate } from '../../../types/template';
import { Check, Loader2, Plus } from 'lucide-react';

interface TemplateItemProps {
  template: ICategoryTemplate;
  language: string;
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
  
  // Get localized template name based on selected language
  const getLocalizedName = (nameObj: Record<string, string> | undefined | null, fallbackText = ''): string => {
    if (!nameObj) return fallbackText;
    
    if (nameObj[language]) {
      return nameObj[language];
    }
    
    // Fallback to Turkish (system default)
    if (nameObj['tr']) {
      return nameObj['tr'];
    }
    
    // If no matched language, use first available
    const firstLang = Object.keys(nameObj)[0];
    if (firstLang) {
      return nameObj[firstLang];
    }
    
    return fallbackText;
  };
  
  const templateName = getLocalizedName(template.name, 'Unnamed Template');

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
              {t('categories:labels.withSubcategories', { count: subcategoriesCount })}
            </Badge>
            <div className="text-sm text-muted-foreground mt-2">
              <ul className="list-disc ml-5">
                {template.sub_categories?.slice(0, 3).map((subCategory) => (
                  <li key={subCategory.id}>{getLocalizedName(subCategory.name, subCategory.id)}</li>
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
          {isImporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('categories:actions.importing')}
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              {t('categories:actions.import')}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateItem;
