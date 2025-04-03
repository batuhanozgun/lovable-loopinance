
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useCategoryInfo = (categoryId?: string, subcategoryId?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['categoryInfo', categoryId, subcategoryId],
    queryFn: async () => {
      // Kategori bilgisini getir
      let categoryName = '';
      let subcategoryName = '';
      
      if (categoryId) {
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories')
          .select('name')
          .eq('id', categoryId)
          .single();
          
        if (!categoryError && categoryData) {
          categoryName = categoryData.name;
        }
        
        // Alt kategori bilgisini getir (eğer varsa)
        if (subcategoryId) {
          const { data: subcategoryData, error: subcategoryError } = await supabase
            .from('sub_categories')
            .select('name')
            .eq('id', subcategoryId)
            .single();
            
          if (!subcategoryError && subcategoryData) {
            subcategoryName = subcategoryData.name;
          }
        }
      }
      
      return { categoryName, subcategoryName };
    },
    enabled: !!categoryId,
    // Kategoriler çok sık değişmeyeceği için önbelleğe alıyoruz
    staleTime: 1000 * 60 * 5, // 5 dakika
  });
  
  return {
    categoryName: data?.categoryName || '',
    subcategoryName: data?.subcategoryName || '',
    isLoading,
    error
  };
};
