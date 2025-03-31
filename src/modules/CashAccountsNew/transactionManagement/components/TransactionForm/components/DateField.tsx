
import React from "react";
import { useTranslation } from "react-i18next";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

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
  const { t } = useTranslation(["TransactionManagement", "common"]);
  
  // Saat seçenekleri (00-23)
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  
  // Dakika seçenekleri (00, 15, 30, 45)
  const minutes = ['00', '15', '30', '45'];

  // Dakika değerini en yakın 15'in katına yuvarla
  const roundToNearest15Minutes = (minuteValue: number): string => {
    const roundedMinute = Math.round(minuteValue / 15) * 15;
    if (roundedMinute === 60) return '00';
    return roundedMinute.toString().padStart(2, '0');
  };

  return (
    <div className="space-y-4">
      <FormItem className="flex flex-col">
        <FormLabel>{t("TransactionManagement:transaction.date")}</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "PP", { locale: tr })
              ) : (
                <span>{t("TransactionManagement:transaction.pickDate")}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-50">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </FormItem>

      <FormItem className="flex flex-col">
        <FormLabel>{t("TransactionManagement:transaction.time")}</FormLabel>
        <div className="flex space-x-2 items-center">
          <div className="flex-1 flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <Select 
              value={time.hour} 
              onValueChange={(value) => setTime({ ...time, hour: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Saat" />
              </SelectTrigger>
              <SelectContent>
                {hours.map((hour) => (
                  <SelectItem key={hour} value={hour}>
                    {hour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <span>:</span>
          <div className="flex-1">
            <Select 
              value={time.minute} 
              onValueChange={(value) => setTime({ ...time, minute: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Dakika" />
              </SelectTrigger>
              <SelectContent>
                {minutes.map((minute) => (
                  <SelectItem key={minute} value={minute}>
                    {minute}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </FormItem>
    </div>
  );
};
