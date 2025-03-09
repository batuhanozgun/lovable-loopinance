
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { SubscriptionPlanType } from '@/modules/Subscription/types/ISubscription';
import { useSubscriptionLocale } from '../../../shared/hooks/useSubscriptionLocale';

// Demo invoice type
interface Invoice {
  id: string;
  date: Date;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  plan: SubscriptionPlanType;
}

export const InvoiceTable: React.FC = () => {
  const { t, i18n } = useTranslation(['Subscription', 'common']);
  const { formatPrice, locale, currency } = useSubscriptionLocale();
  
  // Demo data for invoices
  const getDemoInvoices = (): Invoice[] => {
    const monthlyPrice = locale.startsWith('tr') ? 49 : 4.99;
    const yearlyPrice = locale.startsWith('tr') ? 468 : 59.88;
    
    return [
      {
        id: 'INV-001',
        date: new Date(2023, 11, 1),
        amount: yearlyPrice,
        status: 'paid',
        plan: SubscriptionPlanType.YEARLY
      },
      {
        id: 'INV-002',
        date: new Date(2022, 11, 1),
        amount: yearlyPrice,
        status: 'paid',
        plan: SubscriptionPlanType.YEARLY
      },
      {
        id: 'INV-003',
        date: new Date(2021, 11, 1),
        amount: monthlyPrice,
        status: 'paid',
        plan: SubscriptionPlanType.MONTHLY
      }
    ];
  };
  
  const invoices = getDemoInvoices();
  
  // Format date based on locale
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  if (invoices.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">{t('Subscription:billing.noInvoices')}</p>
      </div>
    );
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{locale.startsWith('tr') ? 'Fatura No' : 'Invoice'}</TableHead>
          <TableHead>{locale.startsWith('tr') ? 'Tarih' : 'Date'}</TableHead>
          <TableHead>{locale.startsWith('tr') ? 'Plan' : 'Plan'}</TableHead>
          <TableHead>{locale.startsWith('tr') ? 'Tutar' : 'Amount'}</TableHead>
          <TableHead>{locale.startsWith('tr') ? 'İşlem' : 'Action'}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map(invoice => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{formatDate(invoice.date)}</TableCell>
            <TableCell>{t(`Subscription:plans.${invoice.plan}`)}</TableCell>
            <TableCell>{formatPrice(invoice.amount)}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
