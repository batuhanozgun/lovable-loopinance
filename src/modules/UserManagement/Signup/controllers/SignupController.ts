
import { SignupService } from "../services/SignupService";
import { ISignupForm } from "../interfaces/ISignupForm";
import { SignupValidator } from "../validators/SignupValidator";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { toast } from "@/hooks/use-toast";

const logger = LoggerService.getInstance("SignupController");

export class SignupController {
  static async handleSignup(formData: ISignupForm) {
    try {
      logger.debug("Starting signup process", { email: formData.email });
      
      const validationResult = SignupValidator.validateSignupInput(formData);

      if (!validationResult.success) {
        const validationError = validationResult.error.issues[0];
        logger.warn("Signup validation failed", { error: validationError });
        
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: validationError.message,
        });

        return {
          success: false,
          error: validationError.message,
        };
      }

      logger.debug("Input validation successful, attempting signup");
      
      const signupResult = await SignupService.signUp(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );

      if (!signupResult.success) {
        toast({
          variant: "destructive",
          title: "Signup Failed",
          description: signupResult.error,
        });
      } else {
        toast({
          title: "Success",
          description: "Your account has been created successfully.",
        });
      }

      return signupResult;
    } catch (error) {
      logger.error("Unexpected error in signup controller", error);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred during signup.",
      });

      return {
        success: false,
        error: "Beklenmeyen bir hata oluştu / An unexpected error occurred",
      };
    }
  }
}
