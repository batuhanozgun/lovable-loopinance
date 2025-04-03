
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LandingHeader } from '@/modules/LandingPage/components/LandingHeader';
import { LandingFooter } from '@/modules/LandingPage/components/LandingFooter';
import { initLandingPageTranslations } from '@/modules/LandingPage/i18n';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, MapPin, Phone } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "İsim en az 2 karakter olmalıdır." }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
  subject: z.string().min(5, { message: "Konu en az 5 karakter olmalıdır." }),
  message: z.string().min(10, { message: "Mesaj en az 10 karakter olmalıdır." }),
});

const Contact = () => {
  const { t } = useTranslation(["LandingPage", "common"]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    // Initialize LandingPage translations
    initLandingPageTranslations();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast.success("Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.");
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-1 pt-16">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-center mb-4">İletişim</h1>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Sorularınız veya geri bildirimleriniz için bize ulaşın. En kısa sürede size dönüş yapacağız.
          </p>
          
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">İletişim Bilgileri</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-primary h-5 w-5" />
                    <span>iletisim@loopinance.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-primary h-5 w-5" />
                    <span>+90 212 123 4567</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary h-5 w-5 mt-1" />
                    <span>Levent, 34330 Beşiktaş/İstanbul, Türkiye</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Çalışma Saatleri</h2>
                <div className="space-y-2">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Pazartesi - Cuma:</span>
                    <span>09:00 - 18:00</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Cumartesi:</span>
                    <span>10:00 - 14:00</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Pazar:</span>
                    <span>Kapalı</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <h2 className="text-xl font-semibold mb-6">Bize Mesaj Gönderin</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>İsim</FormLabel>
                          <FormControl>
                            <Input placeholder="Adınız Soyadınız" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-posta</FormLabel>
                          <FormControl>
                            <Input placeholder="ornek@mail.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konu</FormLabel>
                        <FormControl>
                          <Input placeholder="Mesajınızın konusu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mesaj</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Mesajınızı buraya yazın..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Gönderiliyor..." : "Mesajı Gönder"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default Contact;
