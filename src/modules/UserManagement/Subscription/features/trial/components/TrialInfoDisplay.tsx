
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface TrialInfoDisplayProps {
  trialEndsAt: string;
  daysRemaining: number;
}

export const TrialInfoDisplay: React.FC<TrialInfoDisplayProps> = ({ 
  trialEndsAt, 
  daysRemaining 
}) => {
  const formatDate = (dateString: string) => {
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
        <span className="text-muted-foreground">Deneme süresi bitiş tarihi:</span>
        <span className="font-medium">{formatDate(trialEndsAt)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground">Kalan gün:</span>
        <span className="font-medium">
          {daysRemaining} gün
        </span>
      </div>
      <div className="mt-6">
        <Button className="w-full" variant="default" asChild>
          <Link to="/pricing">Aboneliğe Geç</Link>
        </Button>
      </div>
    </>
  );
};
