
import { useEffect, useMemo, useState } from 'react';
import { SessionService } from '../services/SessionService';

export const useSessionService = () => {
  const service = useMemo(() => new SessionService(), []);
  const [sessionInitialized, setSessionInitialized] = useState(false);
  
  useEffect(() => {
    // Bileşen yüklendiğinde session'ı async olarak yükle
    const initSession = async () => {
      await service.initSessionCache();
      setSessionInitialized(true);
    };
    
    initSession();
  }, [service]);
  
  const getCurrentUserID = (): string | null => {
    const session = service.getCurrentSessionSync();
    return session?.data?.user?.id || null;
  };
  
  return {
    getCurrentUserID,
    service,
    sessionInitialized
  };
};
