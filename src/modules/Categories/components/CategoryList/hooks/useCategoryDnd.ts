
import { ICategory, ICategoryOrder } from '@/modules/Categories/types';
import { 
  DragEndEvent, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { operationsLogger } from '@/modules/Categories/logging';

interface UseCategoryDndProps {
  categories: ICategory[];
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
  updateCategoryOrder: (data: ICategoryOrder[]) => void;
}

/**
 * Kategori sürükle-bırak işlevselliğini yöneten hook
 */
export const useCategoryDnd = ({ 
  categories, 
  setCategories, 
  updateCategoryOrder 
}: UseCategoryDndProps) => {
  const logger = operationsLogger.createSubLogger('CategoryDnd');

  // DnD sensörlerini oluştur
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Sürükleme işleminin başlaması için gereken minimum mesafe
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Sürükleme bittiğinde tetiklenen işlev
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      return;
    }

    logger.debug('Kategori sıralama başlatıldı', { 
      sourceId: active.id, 
      targetId: over.id 
    });

    setCategories((items) => {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      
      if (oldIndex === -1 || newIndex === -1) {
        logger.warn('Kategori sıralama başarısız: kategori bulunamadı', {
          activeId: active.id,
          overId: over.id,
          oldIndex,
          newIndex
        });
        return items;
      }
      
      const newItems = arrayMove(items, oldIndex, newIndex);
      
      const sortData = newItems.map((category, index) => ({
        id: category.id,
        sort_order: index
      }));
      
      try {
        updateCategoryOrder(sortData);
        logger.debug('Kategori sıralama başarılı', { categories: sortData.length });
      } catch (error) {
        logger.error('Kategori sıralama hatası', error instanceof Error ? error : new Error(String(error)));
      }
      
      return newItems;
    });
  };

  return {
    sensors,
    handleDragEnd
  };
};
