import CommonDef from '../constants/common.def';

export default class DeviceUtils {
    /**
     * 返回终端类型
     * @returns {number}
     */
    static getDeviceType() {
        const flag = navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        );
        return flag ? CommonDef.DEVICE_TYPES.MOBILE : CommonDef.DEVICE_TYPES.PC;
    }

    /**
     * 客户端是否为苹果微信
     * @returns {boolean}
     */
    static isWechatIOS() {
        const ua = navigator.userAgent.toLowerCase();
        const isWechat = Boolean(ua.match(/MicroMessenger/i));
        const isIOS = Boolean(navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/));
        return (isWechat && isIOS);
    }
}
