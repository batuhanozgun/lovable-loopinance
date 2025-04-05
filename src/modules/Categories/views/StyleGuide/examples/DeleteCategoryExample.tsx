
import React from 'react';
import { selectedCategory } from '@/modules/Categories/constants/mockData';
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

const DeleteCategoryExample: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  
  const handleOpen = () => setIsOpen(true);
  
  const hasSubCategories = selectedCategory.sub_categories && selectedCategory.sub_categories.length > 0;
  
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Bu örnek, kategori silme diyaloğunu gösterir. 
        Eğer kategori alt kategorilere sahipse, bir uyarı mesajı görüntülenir.
      </p>
      
      <Button variant="destructive" onClick={handleOpen}>Diyaloğu Göster</Button>
      
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kategoriyi Sil</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="block mb-2">
                Bu kategoriyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
              </span>
              {hasSubCategories && (
                <div className="mt-2 p-3 bg-destructive/10 text-destructive rounded-md">
                  <p className="text-sm font-medium">
                    Dikkat: Bu kategori {selectedCategory.sub_categories?.length} alt kategoriye sahip.
                    Kategoriyi silerseniz, tüm alt kategoriler de silinecektir.
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteCategoryExample;
