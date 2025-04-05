
import React from 'react';
import { selectedCategory } from '@/modules/Categories/constants/mockData';
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
import { categoryColors } from '@/modules/Categories/styles/tokens/colors';

const EditCategoryExample: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [name, setName] = React.useState(selectedCategory.name);
  const [icon, setIcon] = React.useState(selectedCategory.icon);
  const [color, setColor] = React.useState(selectedCategory.color);
  
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
              <Label htmlFor="icon">İkon</Label>
              <Input
                id="icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="Emoji 😀 veya ikon kodu girin"
              />
            </div>
            <div className="grid gap-2">
              <Label>Renk</Label>
              <div className="grid grid-cols-6 gap-2">
                {Object.values(categoryColors.primary).map((colorOption, index) => (
                  <div 
                    key={index} 
                    className={`h-8 rounded-md cursor-pointer ${color === colorOption ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                    style={{ backgroundColor: colorOption }}
                    onClick={() => setColor(colorOption)}
                  />
                ))}
                {Object.values(categoryColors.pastel).map((colorOption, index) => (
                  <div 
                    key={`pastel-${index}`} 
                    className={`h-8 rounded-md cursor-pointer ${color === colorOption ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                    style={{ backgroundColor: colorOption }}
                    onClick={() => setColor(colorOption)}
                  />
                ))}
              </div>
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
