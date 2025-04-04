
import React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { PasswordService } from "@/modules/UserManagement/auth/services/PasswordService";

interface PasswordChangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  password: z.string()
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .max(72, "Şifre maksimum 72 karakter olmalıdır"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

export const PasswordChangeDialog: React.FC<PasswordChangeDialogProps> = ({ open, onOpenChange }) => {
  const { t } = useTranslation(["Profile", "common"]);
  const logger = LoggerService.getInstance("UserManagement.PasswordChangeDialog");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      logger.debug("Şifre değiştirme işlemi başlatıldı");
      const { success, error } = await PasswordService.changePassword(values.password);

      if (!success) {
        logger.error("Şifre değiştirilemedi", { error });
        toast({
          title: t("common:error"),
          description: error || t("Profile:errors.passwordChangeError"),
          variant: "destructive",
        });
        return;
      }

      logger.debug("Şifre başarıyla değiştirildi");
      toast({
        title: t("Profile:messages.passwordChangeSuccess.title"),
        description: t("Profile:messages.passwordChangeSuccess.description"),
      });
      form.reset();
      onOpenChange(false);
    } catch (error) {
      logger.error("Şifre değiştirme işleminde beklenmeyen hata", error);
      toast({
        title: t("common:error"),
        description: t("Profile:errors.unexpectedError"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("Profile:PasswordChangeDialog.title")}</DialogTitle>
          <DialogDescription>
            {t("Profile:PasswordChangeDialog.description")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Profile:PasswordChangeDialog.fields.newPassword")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Profile:PasswordChangeDialog.fields.confirmPassword")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                {t("common:cancel")}
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⊚</span>
                    {t("common:loading")}
                  </>
                ) : (
                  t("common:save")
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
