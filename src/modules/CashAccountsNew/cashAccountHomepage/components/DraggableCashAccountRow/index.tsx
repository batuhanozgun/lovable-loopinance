
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { CashAccount } from '../../types';
import { CashAccountRow } from '../CashAccountRow';

interface DraggableCashAccountRowProps {
  account: CashAccount;
  onEdit?: (account: CashAccount) => void;
  onDelete?: (account: CashAccount) => void;
  onAddTransaction?: (account: CashAccount) => void;
}

/**
 * Sürüklenebilir nakit hesap satırı bileşeni
 */
export const DraggableCashAccountRow: React.FC<DraggableCashAccountRowProps> = ({ 
  account, 
  onEdit, 
  onDelete,
  onAddTransaction
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: account.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div 
        className="absolute left-1.5 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing" 
        {...attributes} 
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      
      <CashAccountRow 
        account={account} 
        onEdit={onEdit} 
        onDelete={onDelete}
        onAddTransaction={onAddTransaction}
        hasDragHandle={true} 
      />
    </div>
  );
};
