
import { CashAccount, CashAccountOrder } from '../types';
import { 
  DragEndEvent, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { CashAccountService } from '../services/CashAccountService';

interface UseCashAccountDndProps {
  accounts: CashAccount[];
  setAccounts: React.Dispatch<React.SetStateAction<CashAccount[]>>;
}

/**
 * Nakit hesap sürükle-bırak işlevselliğini yöneten hook
 */
export const useCashAccountDnd = ({ 
  accounts, 
  setAccounts 
}: UseCashAccountDndProps) => {
  const { toast } = useToast();
  const { t } = useTranslation(['CashAccountsNew', 'common']);

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
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      return;
    }

    setAccounts((items) => {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      
      if (oldIndex === -1 || newIndex === -1) {
        return items;
      }
      
      return arrayMove(items, oldIndex, newIndex);
    });
    
    try {
      const updatedAccounts = accounts.map((account, index) => ({
        id: account.id,
        sort_order: index
      }));
      
      const result = await CashAccountService.updateCashAccountOrder(updatedAccounts);
      
      if (!result.success) {
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: result.error || t('CashAccountsNew:errors.sorting.failed'),
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('common:error'),
        description: error instanceof Error ? error.message : t('CashAccountsNew:errors.sorting.failed'),
      });
    }
  };

  return {
    sensors,
    handleDragEnd
  };
};
