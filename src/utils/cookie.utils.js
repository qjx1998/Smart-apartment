import Cookies from 'js-cookie';

/**
 * token操作工具
 */
export class CookieUtil {
    /**
     * 存入cookie的键
     */
    key;

    constructor(key) {
        this.key = key;
    }

    get() {
        return Cookies.get(this.key);
    }

    set(token) {
        return Cookies.set(this.key, token);
    }

    remove() {
        return Cookies.remove(this.key);
    }
}
