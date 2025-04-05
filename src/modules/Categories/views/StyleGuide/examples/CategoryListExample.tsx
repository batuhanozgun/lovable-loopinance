
import React from 'react';
import { mockCategories } from '@/modules/Categories/constants/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronRight, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CategoryListExample: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>('cat-1');
  
  const toggleExpand = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };
  
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground mb-4">
        Bu örnek, kategori listesi bileşenini gösterir. Sürükle-bırak özelliği bu örnekte devre dışı bırakılmıştır.
      </p>
      
      <div className="space-y-2">
        {mockCategories.map((category) => (
          <div key={category.id} className="space-y-1">
            <Card className="hover:bg-gray-50 transition-colors">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {category.sub_categories && category.sub_categories.length > 0 && (
                      <button 
                        onClick={() => toggleExpand(category.id)}
                        className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                        type="button"
                      >
                        {expandedCategory === category.id ? 
                          <ChevronDown className="h-4 w-4" /> : 
                          <ChevronRight className="h-4 w-4" />
                        }
                      </button>
                    )}
                    <div className="font-medium">{category.name}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {category.sub_categories && category.sub_categories.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {category.sub_categories.length}
                      </Badge>
                    )}
                    {category.icon && <span className="text-gray-500">{category.icon}</span>}
                    <div className="flex gap-1 ml-2">
                      <button className="p-1.5 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button className="p-1.5 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Alt kategoriler */}
            {expandedCategory === category.id && category.sub_categories && (
              <div className="pl-8 space-y-2 mt-2 animate-accordion-down">
                {category.sub_categories.map((subCategory) => (
                  <div key={subCategory.id} className="p-2 bg-white rounded border border-gray-100 text-sm shadow-sm">
                    <div className="flex items-center justify-between">
                      <span>{subCategory.name}</span>
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                          <Pencil className="h-3 w-3" />
                        </button>
                        <button className="p-1.5 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryListExample;
