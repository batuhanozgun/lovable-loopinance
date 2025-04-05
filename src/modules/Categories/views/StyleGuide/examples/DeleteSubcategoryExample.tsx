
import React from 'react';
import { selectedSubCategory } from '@/modules/Categories/constants/mockData';
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
import { Button } from '@/components/ui/button';

const DeleteSubcategoryExample: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [isDeleting, setIsDeleting] = React.useState(false);
  
  const handleOpen = () => setIsOpen(true);
  
  const handleDelete = () => {
    setIsDeleting(true);
    // Simülasyon: Gerçek uygulamada burada silme işlemi yapılır
    setTimeout(() => {
      setIsDeleting(false);
      setIsOpen(false);
    }, 1500);
  };
  
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Bu örnek, alt kategori silme diyaloğunu gösterir.
        Silme işlemi sırasında bir yükleme durumu da gösterilmektedir.
      </p>
      
      <Button variant="destructive" onClick={handleOpen}>Diyaloğu Göster</Button>
      
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alt Kategoriyi Sil</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="block">
                "{selectedSubCategory.name}" alt kategorisini silmek istediğinizden emin misiniz? 
                Bu işlem geri alınamaz.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>İptal</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive hover:bg-destructive/90"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Siliniyor...' : 'Sil'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteSubcategoryExample;
