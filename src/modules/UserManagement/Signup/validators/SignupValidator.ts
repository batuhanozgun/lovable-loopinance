
import { z } from "zod";
import { ISignupForm } from "../interfaces/ISignupForm";

export class SignupValidator {
  private static signupSchema = z.object({
    firstName: z.string().min(2, {
      message: "Ad en az 2 karakter olmalıdır / First name must be at least 2 characters"
    }),
    lastName: z.string().min(2, {
      message: "Soyad en az 2 karakter olmalıdır / Last name must be at least 2 characters"
    }),
    email: z.string().email({
      message: "Geçerli bir e-posta adresi giriniz / Please enter a valid email address"
    }),
    password: z
      .string()
      .min(8, {
        message: "Şifre en az 8 karakter olmalıdır / Password must be at least 8 characters"
      })
      .regex(/[A-Z]/, {
        message: "Şifre en az bir büyük harf içermelidir / Password must contain at least one uppercase letter"
      })
      .regex(/[a-z]/, {
        message: "Şifre en az bir küçük harf içermelidir / Password must contain at least one lowercase letter"
      })
      .regex(/[0-9]/, {
        message: "Şifre en az bir rakam içermelidir / Password must contain at least one number"
      }),
  });

  static validateSignupInput(data: ISignupForm) {
    return this.signupSchema.safeParse(data);
  }
}
