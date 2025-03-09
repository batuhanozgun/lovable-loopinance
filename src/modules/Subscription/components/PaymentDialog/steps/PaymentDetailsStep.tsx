
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { CreditCard } from 'lucide-react';

interface PaymentDetailsFormData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

interface PaymentDetailsStepProps {
  paymentDetails: PaymentDetailsFormData;
  setPaymentDetails: React.Dispatch<React.SetStateAction<PaymentDetailsFormData>>;
  onBack: () => void;
  onNext: () => void; // onContinue'dan onNext'e değiştirdik
}

export const PaymentDetailsStep: React.FC<PaymentDetailsStepProps> = ({
  paymentDetails,
  setPaymentDetails,
  onBack,
  onNext
}) => {
  const { t } = useTranslation(['Subscription', 'common']);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  // Kart numarası formatı: 1234 5678 9012 3456
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  // Tarih formatı: MM/YY
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setPaymentDetails(prev => ({
      ...prev,
      cardNumber: formattedValue
    }));
    
    // Kart numarası validasyonu
    if (formattedValue.replace(/\s+/g, '').length < 16) {
      setErrors(prev => ({
        ...prev,
        cardNumber: t('Subscription:payment.validation.cardNumberInvalid')
      }));
    } else {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.cardNumber;
        return newErrors;
      });
    }
  };
  
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setPaymentDetails(prev => ({
      ...prev,
      expiryDate: formattedValue
    }));
    
    // Tarih validasyonu - basit kontrol
    if (formattedValue.length === 5) {
      const month = parseInt(formattedValue.substring(0, 2));
      if (month < 1 || month > 12) {
        setErrors(prev => ({
          ...prev,
          expiryDate: t('Subscription:payment.validation.expiryDateInvalid')
        }));
      } else {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.expiryDate;
          return newErrors;
        });
      }
    }
  };
  
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPaymentDetails(prev => ({
      ...prev,
      cvv: value
    }));
    
    // CVV validasyonu
    if (value.length < 3) {
      setErrors(prev => ({
        ...prev,
        cvv: t('Subscription:payment.validation.cvvInvalid')
      }));
    } else {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.cvv;
        return newErrors;
      });
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const isFormValid = () => {
    return (
      paymentDetails.cardNumber.replace(/\s+/g, '').length === 16 &&
      paymentDetails.cardHolder.trim() !== '' &&
      paymentDetails.expiryDate.length === 5 &&
      paymentDetails.cvv.length >= 3 &&
      Object.keys(errors).length === 0
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="p-4 bg-muted/30 rounded-md border">
          <div className="flex items-center space-x-2 mb-4">
            <CreditCard className="h-5 w-5 text-primary" />
            <span className="font-medium">{t('Subscription:payment.cardDetails')}</span>
          </div>
          
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cardNumber">{t('Subscription:payment.card.number')}</Label>
              <Input 
                id="cardNumber"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className={errors.cardNumber ? "border-destructive" : ""}
              />
              {errors.cardNumber && (
                <p className="text-xs text-destructive">{errors.cardNumber}</p>
              )}
              <p className="text-xs text-muted-foreground">
                {t('Subscription:payment.testCards')}
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="cardHolder">{t('Subscription:payment.card.holder')}</Label>
              <Input 
                id="cardHolder"
                name="cardHolder"
                value={paymentDetails.cardHolder}
                onChange={handleChange}
                placeholder={t('Subscription:payment.card.holderPlaceholder')}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiryDate">{t('Subscription:payment.card.expiry')}</Label>
                <Input 
                  id="expiryDate"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handleExpiryDateChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  className={errors.expiryDate ? "border-destructive" : ""}
                />
                {errors.expiryDate && (
                  <p className="text-xs text-destructive">{errors.expiryDate}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="cvv">{t('Subscription:payment.card.cvv')}</Label>
                <Input 
                  id="cvv"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handleCvvChange}
                  placeholder="123"
                  maxLength={4}
                  className={errors.cvv ? "border-destructive" : ""}
                />
                {errors.cvv && (
                  <p className="text-xs text-destructive">{errors.cvv}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          {t('common:back')}
        </Button>
        <Button onClick={onNext} disabled={!isFormValid()}>
          {t('Subscription:payment.actions.continue')}
        </Button>
      </div>
    </div>
  );
};
