import CommonDef from '../constants/common.def';
import SdkErrorUtils from '../sdk/megvii/sdk.error';
import store from '../store';
import router from '../router';

class ResponseHandler {
    /**
     * 处理请求返回的错误信息
     * @param res 返回的res
     */
    static getErrorMessage(res) {
        let msg;

        switch (res.code) {
            case CommonDef.API_RESPONSE_CODE.PARAMETER_ERROR:
            case CommonDef.API_RESPONSE_CODE.BAD_REQUEST:
                if (res.errors && res.errors.length) {
                    msg = res.errors[0].message;
                    if (res.errors[0].message.includes('${names}')) {
                        msg = msg.replace('${names}', res.errors[0].params.names);
                    }
                    break;
                }
                msg = res.message;
                break;
            case CommonDef.API_RESPONSE_CODE.SDK_ERROR:
                msg = SdkErrorUtils.getMessage(res.data);
                break;
            case CommonDef.API_RESPONSE_CODE.FORBIDDEN:
            case CommonDef.API_RESPONSE_CODE.UNAUTHORIZED:
                // 清除授权信息
                store.commit('user/clearToken');
                msg = '授权已过期, 请重新登录';
                router.push({ path: '/login' });
                break;
            case CommonDef.API_RESPONSE_CODE.SUBJECT_TOKEN_EXPIRED:
                // 清除授权信息
                store.commit('subject/clearAuthorizeInfo');
                msg = '授权已过期, 请重新登录';
                router.push({ path: '/mobile/login' });
                break;
            default:
                msg = '请求异常';
        }
        return msg;
    }
}

export default ResponseHandler;
