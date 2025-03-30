
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CashAccount } from '../../types';
import { CashAccountRow } from '../CashAccountRow';
import { GripVertical } from 'lucide-react';

interface DraggableCashAccountRowProps {
  account: CashAccount;
  onEdit?: (account: CashAccount) => void;
  onDelete?: (account: CashAccount) => void;
}

/**
 * Sürüklenebilir nakit hesap satırı bileşeni
 */
export const DraggableCashAccountRow: React.FC<DraggableCashAccountRowProps> = ({ 
  account, 
  onEdit, 
  onDelete 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: account.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="mb-1 group relative"
    >
      <div className="absolute left-0 top-0 bottom-0 flex items-center pl-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity" {...attributes} {...listeners}>
        <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab active:cursor-grabbing" />
      </div>
      
      <CashAccountRow 
        account={account} 
        onEdit={onEdit}
        onDelete={onDelete}
        hasDragHandle
      />
    </div>
  );
};
