
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PricingPlanType } from '@/modules/LandingPage/components/PricingSection/types/pricing.types';

interface PaymentInfoDisplayProps {
  planType: PricingPlanType;
  periodEndsAt?: string;
  daysRemaining: number;
}

export const PaymentInfoDisplay: React.FC<PaymentInfoDisplayProps> = ({ 
  planType, 
  periodEndsAt, 
  daysRemaining 
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground">Abonelik tipi:</span>
        <span className="font-medium">
          {planType === 'monthly' ? 'Aylık' : 'Yıllık'}
        </span>
      </div>
      {periodEndsAt && (
        <>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Yenileme tarihi:</span>
            <span className="font-medium">{formatDate(periodEndsAt)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Kalan gün:</span>
            <span className="font-medium">
              {daysRemaining} gün
            </span>
          </div>
        </>
      )}
      <div className="mt-6">
        <Button className="w-full" variant="outline" asChild>
          <Link to="/subscription/manage">Aboneliği Yönet</Link>
        </Button>
      </div>
    </>
  );
};
