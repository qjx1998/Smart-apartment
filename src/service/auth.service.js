
import { CookieUtil } from '../utils/cookie.utils';

/**
 * 用户授权信息相关服务
 */
class UserAuthService extends CookieUtil {
}

export const userAuthService = new UserAuthService('user_auth');
