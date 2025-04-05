
import React from 'react';
import { selectedCategory } from '../data/mockData';
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

const EditCategoryExample: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [name, setName] = React.useState(selectedCategory.name);
  const [icon, setIcon] = React.useState(selectedCategory.icon || '');
  
  const handleOpen = () => setIsOpen(true);
  
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Bu örnek, kategori düzenleme diyaloğunu gösterir.
        Gerçek uygulamada bu diyalog bir buton ile açılır.
      </p>
      
      <Button onClick={handleOpen}>Diyaloğu Göster</Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kategori Düzenle</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Kategori Adı</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="icon">Simge</Label>
              <Input
                id="icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="📝"
              />
              {icon && (
                <div className="mt-2">
                  <Label className="text-sm text-muted-foreground mb-1 block">Önizleme</Label>
                  <div className="text-2xl">{icon}</div>
                </div>
              )}
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

export default EditCategoryExample;
