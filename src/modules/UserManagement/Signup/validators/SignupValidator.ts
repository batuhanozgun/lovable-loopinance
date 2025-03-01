
import { z } from "zod";
import { ISignupForm } from "../interfaces/ISignupForm";
import i18next from "i18next";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { EmailValidationService } from "../services/validation/EmailValidationService";

const logger = LoggerService.getInstance("SignupValidator");

export const SignupSchema = z.object({
  firstName: z.string().min(2, {
    message: i18next.t("UserManagement.signup.validation:firstNameMin")
  }),
  lastName: z.string().min(2, {
    message: i18next.t("UserManagement.signup.validation:lastNameMin")
  }),
  email: z.string().email({
    message: i18next.t("errors:invalidEmail")
  }),
  password: z
    .string()
    .min(8, {
      message: i18next.t("UserManagement.signup.validation:passwordMin")
    })
    .regex(/[A-Z]/, {
      message: i18next.t("UserManagement.signup.validation:passwordUppercase")
    })
    .regex(/[a-z]/, {
      message: i18next.t("UserManagement.signup.validation:passwordLowercase")
    })
    .regex(/[0-9]/, {
      message: i18next.t("UserManagement.signup.validation:passwordNumber")
    }),
});

export class SignupValidator {
  /**
   * Validate signup form input data
   */
  static validateSignupInput(data: ISignupForm) {
    logger.debug("Validating signup input", { email: data.email });
    return SignupSchema.safeParse(data);
  }

  /**
   * Check if email already exists
   */
  static async checkEmailExists(email: string) {
    return EmailValidationService.checkEmailExists(email);
  }
}
