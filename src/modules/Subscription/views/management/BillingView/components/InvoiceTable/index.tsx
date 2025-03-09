
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { formatCurrency } from '@/modules/Payment/utils/currencyUtils';
import { formatDate } from '../../../shared/utils/formatters';
import { useSubscriptionLocale } from '../../../shared/hooks/useSubscriptionLocale';
import { SubscriptionPlanType } from '../../../../../../types/ISubscription';

interface Invoice {
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
  const { locale, currency } = useSubscriptionLocale();
  
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
          <TableHead>{i18n.language.startsWith('tr') ? 'Fatura No' : 'Invoice'}</TableHead>
          <TableHead>{i18n.language.startsWith('tr') ? 'Tarih' : 'Date'}</TableHead>
          <TableHead>{i18n.language.startsWith('tr') ? 'Plan' : 'Plan'}</TableHead>
          <TableHead>{i18n.language.startsWith('tr') ? 'Tutar' : 'Amount'}</TableHead>
          <TableHead>{i18n.language.startsWith('tr') ? 'İşlem' : 'Action'}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map(invoice => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{formatDate(invoice.date, locale)}</TableCell>
            <TableCell>{t(`Subscription:plans.${invoice.plan}`)}</TableCell>
            <TableCell>{formatCurrency(invoice.amount, locale, currency)}</TableCell>
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
