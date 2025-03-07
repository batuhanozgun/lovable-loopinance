
import { z } from "zod";
import { ISignupForm } from "../interfaces/ISignupForm";
import i18next from "i18next";
import { signupLogger } from "../../logging";
import { EmailValidationService } from "../services/validation/EmailValidationService";

export const SignupSchema = z.object({
  firstName: z.string().min(2, {
    message: i18next.t("Signup.validation:firstNameMin")
  }),
  lastName: z.string().min(2, {
    message: i18next.t("Signup.validation:lastNameMin")
  }),
  email: z.string().email({
    message: i18next.t("errors:invalidEmail")
  }),
  password: z
    .string()
    .min(8, {
      message: i18next.t("Signup.validation:passwordMin")
    })
    .regex(/[A-Z]/, {
      message: i18next.t("Signup.validation:passwordUppercase")
    })
    .regex(/[a-z]/, {
      message: i18next.t("Signup.validation:passwordLowercase")
    })
    .regex(/[0-9]/, {
      message: i18next.t("Signup.validation:passwordNumber")
    }),
});

export class SignupValidator {
  /**
   * Validate signup form input data
   */
  static validateSignupInput(data: ISignupForm) {
    signupLogger.debug("Validating signup input", { email: data.email });
    return SignupSchema.safeParse(data);
  }

  /**
   * Check if email already exists
   */
  static async checkEmailExists(email: string) {
    return EmailValidationService.checkEmailExists(email);
  }
}
