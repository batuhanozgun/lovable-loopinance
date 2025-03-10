
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CurrencyType, TransactionType } from "../../types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useTransactionForm } from "../../hooks/useTransactionForm";

interface TransactionFormProps {
  statementId: string;
  accountId: string;
  currency: CurrencyType;
  isOpen: boolean;
  onClose: () => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  statementId,
  accountId,
  currency,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation(["CashAccounts", "common"]);
  const { handleCreateTransaction, isSubmitting } = useTransactionForm();
  const [date, setDate] = useState<Date>(new Date());

  // Form validation schema
  const formSchema = z.object({
    amount: z.string().min(1, {
      message: t("CashAccounts:validation.transaction.amount.required"),
    }),
    description: z.string().optional(),
    transactionType: z.enum([TransactionType.INCOME, TransactionType.EXPENSE], {
      required_error: t("CashAccounts:validation.transaction.type.required"),
    }),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      description: "",
      transactionType: TransactionType.INCOME,
    },
  });

  const onSubmit = async (data: FormData) => {
    // Format transaction data
    const transaction = {
      account_id: accountId,
      statement_id: statementId,
      amount: Number(data.amount),
      description: data.description || null,
      transaction_type: data.transactionType,
      transaction_date: format(date, "yyyy-MM-dd"),
      transaction_time: format(new Date(), "HH:mm:ss"),
    };

    const success = await handleCreateTransaction(transaction);
    if (success) {
      form.reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("CashAccounts:transaction.new")}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="transactionType"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>{t("CashAccounts:transaction.type")}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-2"
                    >
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem
                          value={TransactionType.INCOME}
                          id="income"
                        />
                        <label
                          htmlFor="income"
                          className="text-sm font-medium leading-none cursor-pointer text-green-600 dark:text-green-400"
                        >
                          {t("CashAccounts:transaction.types.income")}
                        </label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem
                          value={TransactionType.EXPENSE}
                          id="expense"
                        />
                        <label
                          htmlFor="expense"
                          className="text-sm font-medium leading-none cursor-pointer text-red-600 dark:text-red-400"
                        >
                          {t("CashAccounts:transaction.types.expense")}
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("CashAccounts:transaction.amount")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        min="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem className="flex flex-col">
                <FormLabel>{t("CashAccounts:transaction.date")}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => setDate(newDate || new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("CashAccounts:transaction.description")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t(
                        "CashAccounts:transaction.descriptionPlaceholder"
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="mr-2"
              >
                {t("common:cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? t("common:loading")
                  : t("CashAccounts:transaction.add")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
