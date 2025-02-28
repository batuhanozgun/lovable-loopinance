
import { z } from "zod";
import { AuthService } from "../../common/services/AuthService";
import i18next from "i18next";

export const SignupValidator = z.object({
  firstName: z
    .string()
    .min(2, { message: "auth:signup.validation.firstNameMin" }),
  lastName: z
    .string()
    .min(2, { message: "auth:signup.validation.lastNameMin" }),
  email: z
    .string()
    .email({ message: "errors:invalidEmail" })
    .refine(
      async (email) => {
        try {
          const exists = await AuthService.checkIfEmailExists(email);
          return !exists;
        } catch (error) {
          throw new Error(i18next.t("errors:emailCheckFailed"));
        }
      },
      {
        message: "errors:emailAlreadyExists",
      }
    ),
  password: z
    .string()
    .min(8, { message: "auth:signup.validation.passwordMin" })
    .refine((password) => /[A-Z]/.test(password), {
      message: "auth:signup.validation.passwordUppercase",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "auth:signup.validation.passwordLowercase",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "auth:signup.validation.passwordNumber",
    }),
});

export type SignupFormData = z.infer<typeof SignupValidator>;
