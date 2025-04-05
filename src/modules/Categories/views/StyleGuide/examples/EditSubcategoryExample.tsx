
import React from 'react';
import { selectedSubCategory, selectedCategory } from '../data/mockData';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const EditSubcategoryExample: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [name, setName] = React.useState(selectedSubCategory.name);
  const categoryName = selectedCategory.name;
  
  const handleOpen = () => setIsOpen(true);
  
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Bu örnek, alt kategori düzenleme diyaloğunu gösterir. 
        Gerçek uygulamada bu diyalog bir buton ile açılır.
      </p>
      
      <Button onClick={handleOpen}>Diyaloğu Göster</Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alt Kategoriyi Düzenle</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">
                Ana Kategori
              </Label>
              <div className="text-sm font-medium">{categoryName}</div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Alt Kategori Adı</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              İptal
            </Button>
            <Button>
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditSubcategoryExample;
