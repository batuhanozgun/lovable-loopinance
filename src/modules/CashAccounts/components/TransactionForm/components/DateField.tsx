
import React from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DateFieldProps } from "../types";

/**
 * Tarih seçim alanı bileşeni
 */
export const DateField: React.FC<DateFieldProps> = ({ date, setDate }) => {
  const { t } = useTranslation(["CashAccounts", "common"]);

  return (
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
  );
};
