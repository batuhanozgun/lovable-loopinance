
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ICategory } from '../../../types';
import { ChevronDown, ChevronRight, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';

interface SortableItemProps {
  category: ICategory;
  onEdit?: (category: ICategory) => void;
  onDelete?: (categoryId: string) => void;
}

export const SortableItem: React.FC<SortableItemProps> = ({ 
  category,
  onEdit,
  onDelete
}) => {
  const { t } = useTranslation(['Categories', 'Messages']);
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editName, setEditName] = useState(category.name);
  const [editIcon, setEditIcon] = useState(category.icon || '');
  const hasSubCategories = category.sub_categories && category.sub_categories.length > 0;
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: category.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditName(category.name);
    setEditIcon(category.icon || '');
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  const handleEditSave = () => {
    if (onEdit && editName.trim()) {
      onEdit({
        ...category,
        name: editName.trim(),
        icon: editIcon
      });
    }
    setIsEditDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (onDelete) {
      onDelete(category.id);
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="mb-2"
    >
      <div 
        {...attributes}
        {...listeners}
        className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 cursor-grab hover:bg-gray-50 transition-colors relative"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {hasSubCategories && (
              <button 
                onClick={toggleExpand}
                className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                type="button"
              >
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
            )}
            <div className="font-medium">{category.name}</div>
          </div>
          <div className="flex items-center gap-2">
            {hasSubCategories && (
              <Badge variant="outline" className="text-xs">
                {category.sub_categories?.length}
              </Badge>
            )}
            {category.icon && <span className="text-gray-500">{category.icon}</span>}
            <div className="flex gap-1 ml-2">
              <button
                type="button"
                onClick={handleEditClick}
                className="p-1.5 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                title={t('Categories:actions.edit')}
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={handleDeleteClick}
                className="p-1.5 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                title={t('Categories:actions.delete')}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        className={cn(
          "pl-8 overflow-hidden transition-all duration-300", 
          isExpanded 
            ? "max-h-96 opacity-100 mt-2 space-y-2 animate-accordion-down" 
            : "max-h-0 opacity-0 animate-accordion-up"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {hasSubCategories && category.sub_categories?.map((subCategory) => (
          <div 
            key={subCategory.id}
            className="p-2 bg-white rounded border border-gray-100 text-sm shadow-sm"
          >
            {subCategory.name}
          </div>
        ))}
      </div>

      {/* Düzenleme Dialog'u */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('Categories:form.editCategory')}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                {t('Categories:form.categoryName')}
              </label>
              <input
                id="name"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="icon" className="text-sm font-medium">
                {t('Categories:form.icon')}
              </label>
              <input
                id="icon"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={editIcon}
                onChange={(e) => setEditIcon(e.target.value)}
                placeholder="📝"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {t('Categories:form.cancel')}
            </Button>
            <Button onClick={handleEditSave}>
              {t('Categories:form.submit')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Silme Onay Dialog'u */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('Categories:delete.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('Categories:delete.description')}
              {hasSubCategories && (
                <p className="mt-2 text-red-500">
                  {t('Categories:delete.warningSubcategories', { count: category.sub_categories?.length })}
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('Categories:delete.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              {t('Categories:delete.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SortableItem;
