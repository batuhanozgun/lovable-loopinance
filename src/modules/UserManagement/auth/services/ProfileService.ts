
import { supabase } from "@/integrations/supabase/client";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { IProfileResponse } from "../types/IProfileResponse";
import { IUserProfile } from "../types/IUserProfile";

export class ProfileService {
  private static logger = LoggerService.getInstance("ProfileService");

  /**
   * Get user profile data
   */
  static async getUserProfile(userId: string): Promise<IProfileResponse> {
    try {
      this.logger.debug("Fetching user profile", { userId });

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        this.logger.error("Error fetching user profile", { userId, error });
        return {
          success: false,
          error: error.message
        };
      }

      this.logger.debug("User profile fetched successfully", { userId });
      return {
        success: true,
        profile: data
      };
    } catch (error) {
      this.logger.error("Unexpected error fetching user profile", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch profile"
      };
    }
  }

  /**
   * Update user profile
   */
  static async updateUserProfile(userId: string, profileData: Partial<IUserProfile>): Promise<IProfileResponse> {
    try {
      this.logger.debug("Updating user profile", { userId, ...profileData });

      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        this.logger.error("Error updating user profile", { userId, error });
        return {
          success: false,
          error: error.message
        };
      }

      this.logger.debug("User profile updated successfully", { userId });
      return {
        success: true,
        profile: data
      };
    } catch (error) {
      this.logger.error("Unexpected error updating user profile", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update profile"
      };
    }
  }
}
