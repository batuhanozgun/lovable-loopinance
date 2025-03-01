
import { AuthToasts } from "../notifications/auth/AuthToasts";
import { ValidationToasts } from "../notifications/validation/ValidationToasts";

// Re-export toast functions for backward compatibility
export const showSignupToast = {
  success: () => AuthToasts.showSignupSuccess(),
  error: (error?: Error) => AuthToasts.showSignupError(error),
  emailExists: () => AuthToasts.showEmailExistsError(),
  formValidation: (message: string) => ValidationToasts.showFormValidationError(message),
  emailValidation: (message?: string) => ValidationToasts.showEmailValidationError(message),
  passwordValidation: (message?: string) => ValidationToasts.showPasswordValidationError(message),
};
