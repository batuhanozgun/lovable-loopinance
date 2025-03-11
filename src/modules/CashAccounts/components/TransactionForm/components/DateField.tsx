
import React from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DateFieldProps } from "../types";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

/**
 * Tarih ve saat seçim alanı bileşeni
 */
export const DateField: React.FC<DateFieldProps> = ({ date, setDate, time, setTime }) => {
  const { t } = useTranslation(["CashAccounts", "common"]);

  // Saat ve dakika seçenekleri
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = ['00', '15', '30', '45'];

  return (
    <div className="space-y-4">
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
              {date ? format(date, "PPP") : <span>Tarih seçin</span>}
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

      <FormItem className="flex flex-col">
        <FormLabel>{t("CashAccounts:transaction.time")}</FormLabel>
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
