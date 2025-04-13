
import React from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "./card";
import { Button } from "./button";

export default {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "glass"],
    },
  },
};

// Basit kart hikayesi
export const Default = {
  args: {
    children: "Kart İçeriği",
    className: "w-[350px]",
  },
  render: (args) => (
    <Card {...args}>
      <CardContent className="pt-6">
        {args.children}
      </CardContent>
    </Card>
  ),
};

// Cam görünümlü kart
export const Glass = {
  args: {
    variant: "glass",
    className: "w-[350px]",
  },
  render: (args) => (
    <Card {...args}>
      <CardContent className="pt-6">
        Cam efektli kart örneği. Bu kart saydam bir arka plana sahiptir.
      </CardContent>
    </Card>
  ),
};

// Tam özellikli kart örneği
export const FullFeatured = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Kart Başlığı</CardTitle>
        <CardDescription>Kart açıklaması burada yer alır</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Kart içeriği burada gösterilir. Bu alana herhangi bir içerik yerleştirilebilir.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">İptal</Button>
        <Button size="sm">Kaydet</Button>
      </CardFooter>
    </Card>
  ),
};

// Kart çeşitleri gösterimi
export const CardVariants = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Varsayılan Kart</CardTitle>
          <CardDescription>Standart görünüm</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Varsayılan kart stili içerik örneği.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm">İşlem</Button>
        </CardFooter>
      </Card>
      
      <Card className="w-[350px]" variant="glass">
        <CardHeader>
          <CardTitle>Cam Kart</CardTitle>
          <CardDescription>Saydam görünüm</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Cam efektli kart stili içerik örneği.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm">İşlem</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

// Farklı içerik örnekleri
export const ContentExamples = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Metin İçerikli</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Bu kart sadece metin içeriği barındırır.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Liste İçerikli</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Liste öğesi 1</li>
            <li>Liste öğesi 2</li>
            <li>Liste öğesi 3</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Form İçerikli</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid w-full items-center gap-2">
              <label className="text-sm font-medium">Ad</label>
              <input className="h-8 rounded-md border border-input bg-background px-3 py-1 text-sm" type="text" placeholder="Adınız" />
            </div>
            <div className="grid w-full items-center gap-2">
              <label className="text-sm font-medium">Email</label>
              <input className="h-8 rounded-md border border-input bg-background px-3 py-1 text-sm" type="email" placeholder="Email" />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button size="sm" className="w-full">Gönder</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Buton Grupları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="default" size="sm">Varsayılan</Button>
            <Button variant="destructive" size="sm">Tehlike</Button>
            <Button variant="outline" size="sm">Kenarlıklı</Button>
            <Button variant="secondary" size="sm">İkincil</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};
