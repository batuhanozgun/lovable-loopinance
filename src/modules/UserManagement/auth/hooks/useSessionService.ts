
import { useMemo } from 'react';
import { SessionService } from '../services/SessionService';

export const useSessionService = () => {
  const service = useMemo(() => new SessionService(), []);
  
  const getCurrentUserID = () => {
    const session = service.getCurrentSessionSync();
    return session?.data?.user?.id || null;
  };
  
  return {
    getCurrentUserID,
    service
  };
};
