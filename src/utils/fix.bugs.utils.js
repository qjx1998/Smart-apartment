import DeviceUtils from './device.utils';

export default class FixBugsUtils {
    /**
     * 修复微信键盘收起bug
     */
    static fixWechatIosBug() {
        // 是否为苹果微信
        const isWechatIOS = DeviceUtils.isWechatIOS();
        if (isWechatIOS) {
            setTimeout(() => {
                document.body.scrollBy(0, -1);
            }, 200);
        }
    }
}
