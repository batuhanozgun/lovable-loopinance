
import { createLogger } from '@/modules/Logging';

// UserManagement modülü için temel logger
const logger = createLogger('UserManagement');

// Alt modüller için logger'lar
const loginLogger = logger.createSubLogger('Login');
const signupLogger = logger.createSubLogger('Signup');
const oauthLogger = logger.createSubLogger('OAuth');
const profileLogger = logger.createSubLogger('Profile');
const authLogger = logger.createSubLogger('Auth');

export {
  logger as UserManagementLogger,
  loginLogger,
  signupLogger,
  oauthLogger,
  profileLogger,
  authLogger
};
