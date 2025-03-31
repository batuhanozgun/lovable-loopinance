
import React from "react";
import { useTranslation } from "react-i18next";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface DateFieldProps {
  date: Date;
  setDate: (date: Date) => void;
  time: { hour: string; minute: string };
  setTime: (time: { hour: string; minute: string }) => void;
}

/**
 * Tarih ve saat seçim alanı bileşeni
 */
export const DateField: React.FC<DateFieldProps> = ({ 
  date, 
  setDate, 
  time, 
  setTime 
}) => {
  const { t } = useTranslation(["CashAccountsNew", "common"]);
  
  // Saat ve dakika değişikliklerini işle
  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTime({ ...time, hour: e.target.value });
  };
  
  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTime({ ...time, minute: e.target.value });
  };
  
  // Saat seçenekleri oluştur (00-23)
  const hourOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return (
      <option key={hour} value={hour}>
        {hour}
      </option>
    );
  });
  
  // Dakika seçenekleri oluştur (00-59)
  const minuteOptions = Array.from({ length: 60 }, (_, i) => {
    const minute = i.toString().padStart(2, "0");
    return (
      <option key={minute} value={minute}>
        {minute}
      </option>
    );
  });

  return (
    <FormItem className="flex flex-col">
      <FormLabel>{t("CashAccountsNew:transaction.date")}</FormLabel>
      
      <div className="grid grid-cols-5 gap-2">
        <Popover>
          <PopoverTrigger asChild className="col-span-3">
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "PP", { locale: tr })
              ) : (
                <span>{t("CashAccountsNew:transaction.pickDate")}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <select
          className="border rounded h-10 px-3 col-span-1"
          value={time.hour}
          onChange={handleHourChange}
        >
          {hourOptions}
        </select>
        
        <select
          className="border rounded h-10 px-3 col-span-1"
          value={time.minute}
          onChange={handleMinuteChange}
        >
          {minuteOptions}
        </select>
      </div>
    </FormItem>
  );
};
