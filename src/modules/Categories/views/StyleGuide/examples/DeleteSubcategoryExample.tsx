
import React from 'react';
import { selectedSubCategory } from '../data/mockData';
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

const DeleteSubcategoryExample: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  
  const handleOpen = () => setIsOpen(true);
  
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Bu örnek, alt kategori silme onay diyaloğunu gösterir.
        Gerçek uygulamada bu diyalog bir buton ile açılır.
      </p>
      
      <Button onClick={handleOpen} variant="destructive">Diyaloğu Göster</Button>
      
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alt Kategoriyi Sil</AlertDialogTitle>
            <AlertDialogDescription>
              "{selectedSubCategory.name}" alt kategorisini silmek istediğinizden emin misiniz? 
              Bu işlem geri alınamaz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700">
              Alt Kategoriyi Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteSubcategoryExample;
