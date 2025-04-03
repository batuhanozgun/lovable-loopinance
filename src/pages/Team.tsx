
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LandingHeader } from '@/modules/LandingPage/components/LandingHeader/index';
import { LandingFooter } from '@/modules/LandingPage/components/LandingFooter';
import { initLandingPageTranslations } from '@/modules/LandingPage/i18n';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Twitter } from "lucide-react";

const Team = () => {
  const { t } = useTranslation(["LandingPage", "common"]);

  useEffect(() => {
    // Initialize LandingPage translations
    initLandingPageTranslations();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  // Team members data
  const teamMembers = [
    {
      name: "Ali Yılmaz",
      role: "Kurucu & CEO",
      bio: "10+ yıllık fintech deneyimiyle Loopinance'i kuran Ali, kullanıcı odaklı finansal çözümler geliştirme konusunda tutkuludur.",
      avatar: "AY"
    },
    {
      name: "Zeynep Kaya",
      role: "CTO",
      bio: "Yapay zeka ve veri analitiği alanında uzman olan Zeynep, Loopinance'in teknolojik altyapısını yönetiyor.",
      avatar: "ZK"
    },
    {
      name: "Mehmet Demir",
      role: "Tasarım Direktörü",
      bio: "Kullanıcı deneyimi konusunda uzmanlaşmış Mehmet, Loopinance'in sezgisel ve kullanıcı dostu arayüzünü tasarlıyor.",
      avatar: "MD"
    },
    {
      name: "Ayşe Şahin",
      role: "Ürün Yöneticisi",
      bio: "Finans ve teknoloji sektöründe geniş deneyime sahip Ayşe, kullanıcı ihtiyaçlarını ürün özelliklerine dönüştürüyor.",
      avatar: "AŞ"
    },
    {
      name: "Emre Yıldız",
      role: "Pazarlama Direktörü",
      bio: "Dijital pazarlama stratejisti olan Emre, Loopinance'in büyüme ve kullanıcı edinme stratejilerini yönetiyor.",
      avatar: "EY"
    },
    {
      name: "Deniz Öztürk",
      role: "Müşteri Başarı Yöneticisi",
      bio: "Kullanıcı memnuniyetine odaklanan Deniz, müşteri desteği ve kullanıcı eğitimi konularında liderlik yapıyor.",
      avatar: "DÖ"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-1 pt-16">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-center mb-4">Ekibimiz</h1>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Loopinance'in arkasındaki tutkulu ve yetenekli ekibimizle tanışın. Her üyemiz, size en iyi finansal yönetim deneyimini sunmak için çalışıyor.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-sm text-primary mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                    <div className="flex space-x-3">
                      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Linkedin size={18} />
                      </a>
                      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Twitter size={18} />
                      </a>
                      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Github size={18} />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 bg-muted p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Bize Katılın</h2>
            <p className="text-center text-muted-foreground mb-6">
              Finansal teknoloji alanında tutkulu ve yenilikçi bir ekibin parçası olmak ister misiniz?
            </p>
            <div className="text-center">
              <a href="/contact" className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                Açık Pozisyonlar
              </a>
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default Team;
