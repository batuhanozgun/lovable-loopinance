
import React from 'react';
import { mockCategories } from '@/modules/Categories/constants/mockData';
import { CategoryCard } from '@/modules/Categories/styles/components/CategoryCard';
import { SubcategoryCard } from '@/modules/Categories/styles/components/SubcategoryCard';
import { CategoryBadge } from '@/modules/Categories/styles/components/CategoryBadge';
import { Button } from '@/components/ui/button';
import { Plus, ChevronDown, ChevronRight, Edit, Trash } from 'lucide-react';
import { categoryTitleVariants, subcategoryTextVariants } from '@/modules/Categories/styles/tokens/typography';
import { cn } from '@/lib/utils';

const CategoryListExample: React.FC = () => {
  // State to track expanded categories
  const [expandedCategories, setExpandedCategories] = React.useState<string[]>(['cat-1']);
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  return (
    <div className="space-y-6">
      {/* Header section with title and add button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kategoriler</h1>
        <Button>
          <Plus className="mr-1 h-4 w-4" />
          Kategori Ekle
        </Button>
      </div>
      
      {/* Category list */}
      <div className="space-y-4">
        {mockCategories.map((category) => (
          <div key={category.id} className="space-y-2">
            <CategoryCard 
              variant={expandedCategories.includes(category.id) ? "selected" : "interactive"}
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <div className={cn(categoryTitleVariants({ weight: 'medium' }))}>
                      {category.name}
                    </div>
                    <div className={cn(subcategoryTextVariants({ emphasis: 'low' }))}>
                      {category.sub_categories?.length || 0} alt kategori
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CategoryBadge color={category.color}>
                    Gider
                  </CategoryBadge>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      {expandedCategories.includes(category.id) ? 
                        <ChevronDown className="h-4 w-4" /> : 
                        <ChevronRight className="h-4 w-4" />
                      }
                    </Button>
                  </div>
                </div>
              </div>
            </CategoryCard>
            
            {/* Subcategories */}
            {expandedCategories.includes(category.id) && category.sub_categories && (
              <div className="pl-6 space-y-2 mt-2">
                {category.sub_categories.map((subCategory) => (
                  <SubcategoryCard key={subCategory.id} variant="default">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: `${category.color}80` }}
                        />
                        <span>{subCategory.name}</span>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Trash className="h-3 w-3 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </SubcategoryCard>
                ))}
                <Button variant="outline" size="sm" className="ml-2 mt-1">
                  <Plus className="mr-1 h-3 w-3" />
                  Alt Kategori Ekle
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryListExample;
