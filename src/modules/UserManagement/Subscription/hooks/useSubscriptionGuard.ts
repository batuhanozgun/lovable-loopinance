
import { useNavigate } from "react-router-dom";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { useSubscriptionStatus } from "./useSubscriptionStatus";
import { ISubscription } from "../domain/models/Subscription";

const logger = LoggerService.getInstance("useSubscriptionGuard");

/**
 * Abonelik durumuna göre rota koruması sağlayan hook
 */
export const useSubscriptionGuard = (subscription: ISubscription | null) => {
  const navigate = useNavigate();
  const { isActive, isExpired } = useSubscriptionStatus(subscription);
  
  /**
   * Abonelik durumuna göre yönlendirme yap
   */
  const guardNavigate = () => {
    if (subscription && isExpired) {
      logger.debug("Süresi dolmuş abonelik, yönlendirme yapılıyor", { status: subscription.status });
      navigate("/subscription/expired");
      return false;
    }
    
    // Aktif abonelik - erişime izin ver
    return true;
  };
  
  return {
    guardNavigate,
    allowAccess: isActive,
    needsUpgrade: isExpired,
  };
};
