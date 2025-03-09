
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { SubscriptionPlanType } from '../../../../../types/ISubscription';
import { useSubscriptionLocale } from '../../../shared/hooks/useSubscriptionLocale';
import { formatDate, formatPrice } from '../../../shared/utils/formatters';

export interface Invoice {
  id: string;
  date: Date;
  amount: number;
  status: string;
  plan: SubscriptionPlanType;
}

interface InvoiceTableProps {
  invoices: Invoice[];
}

export const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices }) => {
  const { t, i18n } = useTranslation(['Subscription', 'common']);
  const { locale, currency, isTurkish } = useSubscriptionLocale();
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{isTurkish ? 'Fatura No' : 'Invoice'}</TableHead>
          <TableHead>{isTurkish ? 'Tarih' : 'Date'}</TableHead>
          <TableHead>{isTurkish ? 'Plan' : 'Plan'}</TableHead>
          <TableHead>{isTurkish ? 'Tutar' : 'Amount'}</TableHead>
          <TableHead>{isTurkish ? 'İşlem' : 'Action'}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map(invoice => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{formatDate(invoice.date, locale)}</TableCell>
            <TableCell>{t(`Subscription:plan.${invoice.plan}`)}</TableCell>
            <TableCell>{formatPrice(invoice.amount, locale, currency)}</TableCell>
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
