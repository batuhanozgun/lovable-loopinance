
import { supabase } from "@/integrations/supabase/client";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { ISessionResponse } from "../types/ISessionResponse";

export class SessionService {
  private static logger = LoggerService.getInstance("SessionService");
  private sessionCache: ISessionResponse | null = null;

  /**
   * Get the current user session
   */
  static async getCurrentSession(): Promise<ISessionResponse> {
    try {
      this.logger.debug("Getting current user session");
      
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        this.logger.error("Failed to get user session", error);
        return {
          success: false,
          error: error.message,
          isAuthenticated: false
        };
      }
      
      return {
        success: true,
        session: session,
        user: session?.user,
        isAuthenticated: !!session && !!session.user
      };
    } catch (error) {
      this.logger.error("Unexpected error getting session", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get session",
        isAuthenticated: false
      };
    }
  }

  /**
   * Synchronously get the current session from cache or null
   * This should only be used after session was already loaded asynchronously
   */
  getCurrentSessionSync(): ISessionResponse | null {
    return this.sessionCache;
  }

  /**
   * Initialize the session cache for sync operations
   */
  async initSessionCache(): Promise<ISessionResponse> {
    const session = await SessionService.getCurrentSession();
    this.sessionCache = session;
    return session;
  }

  /**
   * Get the current user
   */
  static async getCurrentUser() {
    try {
      this.logger.debug("Getting current user information");
      
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        this.logger.error("Failed to get user information", error);
        throw error;
      }
      
      this.logger.debug("User information retrieved successfully", { userId: user?.id });
      return user;
    } catch (error) {
      this.logger.error("Unexpected error getting user", error);
      throw error;
    }
  }

  /**
   * Listen to auth state changes
   */
  static onAuthStateChange(callback: (isAuthenticated: boolean) => void) {
    this.logger.debug("Adding auth state change listener");
    
    return supabase.auth.onAuthStateChange((event, session) => {
      this.logger.debug("Auth state changed", { 
        event, 
        hasSession: !!session, 
        userId: session?.user?.id 
      });
      
      // Event type check for more detailed control
      if (event === 'SIGNED_OUT') {
        this.logger.debug("User signed out");
        callback(false);
        return;
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        this.logger.debug("User signed in or token refreshed");
        callback(true);
        return;
      }
      
      // Update auth state based on session status
      const isAuthenticated = !!session && !!session.user;
      this.logger.debug("Auth state updated", { isAuthenticated });
      callback(isAuthenticated);
    });
  }
}
