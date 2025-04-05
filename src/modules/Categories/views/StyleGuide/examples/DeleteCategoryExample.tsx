
import React from 'react';
import { selectedCategory } from '@/modules/Categories/constants/mockData';
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

const DeleteCategoryExample: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const hasSubCategories = selectedCategory.sub_categories && selectedCategory.sub_categories.length > 0;
  
  const handleOpen = () => setIsOpen(true);
  
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Bu örnek, kategori silme onay diyaloğunu gösterir.
        Gerçek uygulamada bu diyalog bir buton ile açılır.
      </p>
      
      <Button onClick={handleOpen} variant="destructive">Diyaloğu Göster</Button>
      
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kategoriyi Sil</AlertDialogTitle>
            <AlertDialogDescription>
              "{selectedCategory.name}" kategorisini silmek istediğinizden emin misiniz? 
              Bu işlem geri alınamaz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {hasSubCategories && (
            <div className="bg-red-50 border border-red-200 p-2 rounded text-red-700 text-sm mt-2">
              <strong>Uyarı:</strong> Bu kategori {selectedCategory.sub_categories?.length} alt kategoriye sahip. 
              Kategoriyi sildiğinizde tüm alt kategoriler de silinecektir.
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700">
              Kategoriyi Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteCategoryExample;
