
import { useMemo } from 'react';
import { SessionService } from '../services/SessionService';

export const useSessionService = () => {
  const service = useMemo(() => new SessionService(), []);
  
  const getCurrentUserID = async (): Promise<string | null> => {
    const session = await SessionService.getCurrentSession();
    return session?.user?.id || null;
  };
  
  return {
    getCurrentUserID,
    service
  };
};
