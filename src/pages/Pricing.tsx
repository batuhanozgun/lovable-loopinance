
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LandingHeader } from "@/modules/LandingPage/components/LandingHeader";
import { LandingFooter } from "@/modules/LandingPage/components/LandingFooter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, BadgePercent, Shield, Clock, Star, Calendar, ArrowRight, HelpCircle } from "lucide-react";
import { useSubscriptionPrice } from "@/modules/Subscription/views/management/shared/hooks/useSubscriptionPrice";
import { useSubscriptionLocale } from "@/modules/Subscription/views/management/shared/hooks/useSubscriptionLocale";
import { formatPrice } from "@/modules/Subscription/views/management/shared/utils/formatters";
import { initLandingPageTranslations } from "@/modules/LandingPage/i18n";

const PricingPage = () => {
  const { t } = useTranslation('LandingPage');
  const { locale, currency, isTurkish } = useSubscriptionLocale();
  const { monthlyPrice, yearlyPrice, yearlyTotalPrice, yearlyDiscount } = useSubscriptionPrice();
  
  const formattedMonthlyPrice = formatPrice(monthlyPrice, locale, currency);
  const formattedYearlyPrice = formatPrice(yearlyPrice, locale, currency);
  const formattedYearlySavings = formatPrice((monthlyPrice * 12) - yearlyTotalPrice, locale, currency);
  
  useEffect(() => {
    // Initialize translations
    initLandingPageTranslations();
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);
  
  const features = [
    t('pricing.features.allFeatures'),
    t('pricing.features.unlimitedAccounts'),
    t('pricing.features.analytics'),
    t('pricing.features.sync'),
    t('pricing.features.prioritySupport'),
    t('pricing.features.extendedHistory')
  ];
  
  const faqItems = [
    {
      question: isTurkish 
        ? "6 aylık ücretsiz deneme nasıl çalışır?" 
        : "How does the 6-month free trial work?",
      answer: isTurkish
        ? "Kaydolduğunuzda otomatik olarak 6 aylık premium deneme süreci başlar. Kredi kartı bilgilerinizi girmek zorunda değilsiniz. Deneme süresince tüm premium özelliklere tam erişiminiz olur. Deneme süresi bitiminde, isterseniz aylık veya yıllık bir plan seçebilirsiniz."
        : "When you sign up, you automatically start a 6-month premium trial. No credit card required. You'll have full access to all premium features during the trial. After the trial ends, you can choose to continue with a monthly or annual plan if you wish."
    },
    {
      question: isTurkish 
        ? "Deneme süresi bittiğinde ne olur?" 
        : "What happens when the trial period ends?",
      answer: isTurkish
        ? "Deneme süresi bitiminde, size bir bildirim gönderilir ve abonelik planınızı seçmeniz istenir. Deneme süresindeki kullanımınız için herhangi bir ücret alınmaz. Hiçbir gizli ücret yoktur ve istediğiniz zaman iptal edebilirsiniz."
        : "When the trial period ends, you'll receive a notification to select your subscription plan. You won't be charged for your usage during the trial period. There are no hidden fees, and you can cancel anytime."
    },
    {
      question: isTurkish 
        ? "Aylık ve yıllık plan arasındaki fark nedir?" 
        : "What's the difference between monthly and annual plans?",
      answer: isTurkish
        ? "Her iki plan da aynı premium özelliklere sahiptir. Tek fark ödeme sıklığı ve fiyattır. Yıllık plan ile %20 tasarruf edersiniz ve bir kerede ödeme yaparsınız. Aylık plan daha esnektir ve her ay otomatik olarak yenilenir."
        : "Both plans offer the same premium features. The only difference is the billing frequency and price. With the annual plan, you save 20% and pay once. The monthly plan offers more flexibility and renews automatically each month."
    },
    {
      question: isTurkish 
        ? "İstediğim zaman iptal edebilir miyim?" 
        : "Can I cancel anytime?",
      answer: isTurkish
        ? "Evet, aboneliğinizi istediğiniz zaman iptal edebilirsiniz. İptal ettikten sonra, ödediğiniz dönemin sonuna kadar premium özelliklere erişiminiz devam edecektir. Ayrıca, ilk 30 gün içinde memnun kalmazsanız, para iade garantimiz vardır."
        : "Yes, you can cancel your subscription at any time. After cancellation, you'll continue to have access to premium features until the end of your paid period. Additionally, we offer a 30-day money-back guarantee if you're not satisfied."
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      
      <main className="flex-1 pt-14">
        {/* Hero Section - daha kompakt */}
        <section className="py-10 px-4 sm:px-6 bg-gradient-to-b from-background to-muted/30">
          <div className="max-w-3xl mx-auto text-center">
            <Badge 
              variant="outline" 
              className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800 px-2 py-1 mb-3 text-xs"
            >
              <Clock className="h-3 w-3 mr-1" />
              {isTurkish ? "6 Ay Ücretsiz Deneme" : "6-Month Free Trial"}
            </Badge>
            
            <h1 className="text-2xl sm:text-3xl font-bold mb-3">{t('pricing.title')}</h1>
            <p className="text-base text-muted-foreground mb-4">
              {t('pricing.subtitle')}
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800 mt-6 max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-bold text-base mb-1">
                    {isTurkish ? "6 Aylık Tam Erişim" : "6-Month Full Access"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isTurkish 
                      ? "Kayıt olduğunuzda otomatik olarak 6 aylık premium deneme süreci başlar. Kredi kartı bilgilerinizi girmek zorunda değilsiniz. Deneme süresince tüm premium özelliklere erişebilirsiniz." 
                      : "When you sign up, you automatically get 6 months of premium access. No credit card required. You'll have access to all premium features during the trial."}
                  </p>
                  <p className="mt-2 text-sm font-medium text-blue-700 dark:text-blue-300">
                    {isTurkish 
                      ? "Deneme süresindeki kullanımınız için ücret alınmaz" 
                      : "You won't be charged for your usage during the trial period"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Section - daha kompakt */}
        <section id="pricing" className="py-10 px-4 sm:px-6 bg-background">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-center">
              {isTurkish ? "Deneme Sonrası Planlarımız" : "Our Plans After Trial"}
            </h2>
            <p className="text-center text-sm text-muted-foreground mb-8 max-w-2xl mx-auto">
              {isTurkish 
                ? "6 aylık ücretsiz deneme süreniz sona erdiğinde, aşağıdaki planlardan birini seçebilirsiniz. Tüm planlar aynı premium özellikleri içerir." 
                : "After your 6-month free trial ends, you can choose one of the following plans. All plans include the same premium features."}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Monthly Plan Card - kompakt */}
              <Card className="border border-border flex flex-col h-full">
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-lg">{t('pricing.monthly.title')}</CardTitle>
                  <CardDescription className="text-xs">{t('pricing.monthly.description')}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow px-4 pt-2 pb-4">
                  <div className="mb-4">
                    <p className="text-2xl font-bold">
                      {formattedMonthlyPrice}
                      <span className="text-xs text-muted-foreground ml-1">
                        {t('pricing.monthly.period')}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t('pricing.monthly.billing')}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-4 px-4">
                  <Button size="sm" className="w-full text-xs h-8" asChild>
                    <Link to="/signup?plan=monthly">
                      {t('pricing.cta.getStarted')}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Yearly Plan Card - kompakt */}
              <Card className="border-2 border-primary flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs py-0.5 px-2 rounded-bl-lg">
                  {t('pricing.recommended')}
                </div>
                
                <CardHeader className="pb-2 pt-4 px-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg">{t('pricing.yearly.title')}</CardTitle>
                    <BadgePercent className="h-4 w-4 text-primary" />
                  </div>
                  <CardDescription className="text-xs">{t('pricing.yearly.description')}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow px-4 pt-2 pb-4">
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold">
                        {formattedYearlyPrice}
                        <span className="text-xs text-muted-foreground ml-1">
                          {t('pricing.yearly.period')}
                        </span>
                      </p>
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-xs px-1.5 py-0.5 rounded-full">
                        {t('pricing.yearly.discount', { percent: yearlyDiscount })}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t('pricing.yearly.billing')}
                    </p>
                    <p className="text-xs text-primary font-medium mt-2">
                      {t('pricing.yearly.save')} {formattedYearlySavings}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-4 px-4">
                  <Button variant="gradient" size="sm" className="w-full text-xs h-8" asChild>
                    <Link to="/signup?plan=yearly">
                      {t('pricing.cta.bestValue')}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="mt-8 text-center">
              <div className="flex flex-col items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg max-w-lg mx-auto">
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-blue-500" />
                  <p className="text-xs font-medium">{t('pricing.trial.description')}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">{t('pricing.guarantee')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Trial Experience - daha kompakt */}
        <section className="py-10 px-4 sm:px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
              {isTurkish ? "6 Aylık Deneyiminiz" : "Your 6-Month Experience"}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="pt-4 px-4 pb-4">
                  <div className="rounded-full w-10 h-10 bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-3">
                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold text-sm mb-1.5">
                    {isTurkish ? "Tam Erişim" : "Full Access"}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    {isTurkish 
                      ? "Tüm premium özelliklere 6 ay boyunca tamamen ücretsiz erişin." 
                      : "Access all premium features completely free for 6 months."}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-border">
                <CardContent className="pt-4 px-4 pb-4">
                  <div className="rounded-full w-10 h-10 bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-3">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold text-sm mb-1.5">
                    {isTurkish ? "Risk Yok" : "No Risk"}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    {isTurkish 
                      ? "Kredi kartı gerekmez. Deneme süresi boyunca hiçbir ücret alınmaz." 
                      : "No credit card required. You won't be charged during the trial period."}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-border">
                <CardContent className="pt-4 px-4 pb-4">
                  <div className="rounded-full w-10 h-10 bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-3">
                    <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold text-sm mb-1.5">
                    {isTurkish ? "Kolay Geçiş" : "Easy Transition"}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    {isTurkish 
                      ? "Deneme bitiminde istediğiniz planı seçebilir veya kullanıma devam etmeyebilirsiniz." 
                      : "Choose your preferred plan after the trial or simply stop using the service."}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8 text-center">
              <Button size="sm" className="h-8 px-4 text-xs" asChild>
                <Link to="/signup">
                  {isTurkish 
                    ? "Hemen 6 Aylık Ücretsiz Denemeye Başlayın" 
                    : "Start Your 6-Month Free Trial Now"}
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* FAQ Section - daha kompakt */}
        <section className="py-10 px-4 sm:px-6 bg-background">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
              {isTurkish ? "Sıkça Sorulan Sorular" : "Frequently Asked Questions"}
            </h2>
            
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-sm py-3">
                    <div className="flex items-center gap-1.5">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      <span>{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pl-6 text-xs">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="mt-8 text-center">
              <p className="text-xs text-muted-foreground mb-3">
                {isTurkish 
                  ? "Başka sorularınız mı var?" 
                  : "Have more questions?"}
              </p>
              <Button variant="outline" size="sm" className="h-8 text-xs" asChild>
                <Link to="/contact">
                  {isTurkish ? "Bize Ulaşın" : "Contact Us"}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default PricingPage;
