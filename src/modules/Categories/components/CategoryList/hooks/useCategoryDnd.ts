
import { useSensors, useSensor, PointerSensor, DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { ICategory } from '@/modules/Categories/types';
import { operationsLogger } from '@/modules/Categories/logging';

interface UseCategoryDndProps {
  categories: ICategory[];
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
  reorderCategories: (data: { categories: { id: string; sort_order: number }[] }) => void;
}

/**
 * Kategori listesi için sürükle-bırak işlevselliğini yöneten hook
 */
export const useCategoryDnd = ({ 
  categories, 
  setCategories, 
  reorderCategories 
}: UseCategoryDndProps) => {
  const logger = operationsLogger.createSubLogger('CategoryDnd');
  
  // Sürükle-bırak sensörlerini oluştur
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  
  // Sürükle-bırak işlemi tamamlandığında çalışacak fonksiyon
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    if (active.id !== over.id) {
      const oldIndex = categories.findIndex(cat => cat.id === active.id);
      const newIndex = categories.findIndex(cat => cat.id === over.id);
      
      if (oldIndex === -1 || newIndex === -1) {
        logger.error('Geçersiz indeks değerleri', { oldIndex, newIndex });
        return;
      }
      
      logger.debug('Kategori sıralama işlemi', { 
        oldIndex,
        newIndex,
        movedCategory: categories[oldIndex].name
      });
      
      const updatedCategories = arrayMove(categories, oldIndex, newIndex);
      
      // UI'da kategori sıralamasını güncelle
      setCategories(updatedCategories);
      
      // Kategori sıralama bilgilerini oluştur
      const categoryOrders = updatedCategories.map((category, index) => ({
        id: category.id,
        sort_order: index
      }));
      
      // Sunucuya kategorilerin sıralama bilgisini gönder
      reorderCategories({ categories: categoryOrders });
    }
  };

  return {
    sensors,
    handleDragEnd
  };
};
