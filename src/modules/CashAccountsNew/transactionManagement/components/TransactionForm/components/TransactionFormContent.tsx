
import React from 'react';
import { Form } from '@/components/ui/form';
import { AmountField } from './AmountField';
import { TransactionTypeField } from './TransactionTypeField';
import { DateField } from './DateField';
import { DescriptionField } from './DescriptionField';
import { CategoryField } from './CategoryField';
import { SubcategoryField } from './SubcategoryField';
import { CurrencyType } from '@/modules/CashAccountsNew/cashAccountHomepage/types';
import { UseFormReturn } from 'react-hook-form';
import { TransactionFormData } from '../../../types';

export interface TransactionFormContentProps {
  form: UseFormReturn<TransactionFormData>;
  currency: CurrencyType;
  onSubmit: () => void;
}

export const TransactionFormContent: React.FC<TransactionFormContentProps> = ({
  form,
  currency,
  onSubmit
}) => {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <AmountField control={form.control} currency={currency} />
          <TransactionTypeField control={form.control} />
        </div>
        
        <DateField 
          control={form.control} 
          dateFieldName="transactionDate"
          timeFieldName="transactionTime"
        />
        
        <DescriptionField control={form.control} />
        
        <div className="grid gap-6 md:grid-cols-2">
          <CategoryField 
            control={form.control} 
            setValue={form.setValue}
          />
          <SubcategoryField 
            control={form.control} 
            watch={form.watch}
          />
        </div>
      </form>
    </Form>
  );
};
