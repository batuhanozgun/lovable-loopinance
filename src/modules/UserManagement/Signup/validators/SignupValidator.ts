
import { z } from "zod";
import { ISignupForm } from "../interfaces/ISignupForm";
import i18next from "i18next";

export const SignupSchema = z.object({
  firstName: z.string().min(2, {
    message: i18next.t("auth:signup.validation.firstNameMin")
  }),
  lastName: z.string().min(2, {
    message: i18next.t("auth:signup.validation.lastNameMin")
  }),
  email: z.string().email({
    message: i18next.t("errors:invalidEmail")
  }),
  password: z
    .string()
    .min(8, {
      message: i18next.t("auth:signup.validation.passwordMin")
    })
    .regex(/[A-Z]/, {
      message: i18next.t("auth:signup.validation.passwordUppercase")
    })
    .regex(/[a-z]/, {
      message: i18next.t("auth:signup.validation.passwordLowercase")
    })
    .regex(/[0-9]/, {
      message: i18next.t("auth:signup.validation.passwordNumber")
    }),
});

export class SignupValidator {
  static validateSignupInput(data: ISignupForm) {
    return SignupSchema.safeParse(data);
  }
}
