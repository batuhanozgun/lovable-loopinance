
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { CreditCard } from 'lucide-react';
import { ICardDetails } from '../../../types/IPayment';
import { formatCardNumber, formatExpiryDate } from '../../../utils/cardUtils';

interface PaymentDetailsStepProps {
  paymentDetails: ICardDetails;
  setPaymentDetails: React.Dispatch<React.SetStateAction<ICardDetails>>;
  onBack: () => void;
  onNext: () => void;
}

export const PaymentDetailsStep: React.FC<PaymentDetailsStepProps> = ({
  paymentDetails,
  setPaymentDetails,
  onBack,
  onNext
}) => {
  const { t } = useTranslation(['Payment', 'common']);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
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
        cardNumber: t('Payment:validation.cardNumberInvalid')
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
          expiryDate: t('Payment:validation.expiryDateInvalid')
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
        cvv: t('Payment:validation.cvvInvalid')
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
            <span className="font-medium">{t('Payment:cardDetails')}</span>
          </div>
          
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cardNumber">{t('Payment:card.number')}</Label>
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
                {t('Payment:testCards')}
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="cardHolder">{t('Payment:card.holder')}</Label>
              <Input 
                id="cardHolder"
                name="cardHolder"
                value={paymentDetails.cardHolder}
                onChange={handleChange}
                placeholder={t('Payment:card.holderPlaceholder')}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiryDate">{t('Payment:card.expiry')}</Label>
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
                <Label htmlFor="cvv">{t('Payment:card.cvv')}</Label>
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
          {t('Payment:actions.continue')}
        </Button>
      </div>
    </div>
  );
};
