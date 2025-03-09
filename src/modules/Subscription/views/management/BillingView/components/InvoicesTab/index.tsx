
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { getDemoInvoices } from '../../utils/billingUtils';

export const InvoicesTab: React.FC = () => {
  const { t, i18n } = useTranslation(['Subscription', 'common']);
  
  // Kullanıcının diline göre para birimi ve biçim belirle
  const locale = i18n.language.startsWith('tr') ? 'tr-TR' : 'en-US';
  const currency = i18n.language.startsWith('tr') ? 'TRY' : 'USD';
  
  // Demo fatura verileri
  const invoices = getDemoInvoices(locale, currency);
  
  // Tarih formatlama
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Subscription:billing.history')}</CardTitle>
        <CardDescription>{t('Subscription:billing.invoices')}</CardDescription>
      </CardHeader>
      <CardContent>
        {invoices.length > 0 ? (
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
                  <TableCell>{formatDate(invoice.date)}</TableCell>
                  <TableCell>{t(`Subscription:plans.${invoice.plan}`)}</TableCell>
                  <TableCell>{invoice.formattedAmount}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">{t('Subscription:billing.noInvoices')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
