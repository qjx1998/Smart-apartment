import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/store';
import CommonDef from '../constants/common.def';
import ResponseHandler from './response.handler';
import MobileDef from '../constants/Mobile.def';

/**
 * 判断是否需要oauth2验证
 * @param url 请求url
 */
function needAuthorizedByToken(url) {
    return !url.includes(MobileDef.MOBILE_API_BASE_PATH);
}

/**
 * 向fr-server发送请求的实例
 *
 * @type {AxiosInstance}
 */
export const requestServer = axios.create({
    baseURL: process.env.VUE_APP_SERVER_BASE_URL, // url = base url + request url
    timeout: process.env.VUE_APP_TIME_OUT // request timeout
});

// request interceptor
requestServer.interceptors.request.use(
    config => {
        if (needAuthorizedByToken(config.url)) {
            config.headers['Authorization'] = 'Bearer ' + store.getters.token;
        } else if (config.needAuthorized) {
            config.params = Object.assign(config.params, JSON.parse(store.getters.subjectAuthorize));
        }
        return config;
    },
    error => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

// response interceptor
requestServer.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data;

        switch (res.code) {
            case CommonDef.API_RESPONSE_CODE.SUCCESS:
                return res.data;
            case CommonDef.API_RESPONSE_CODE.PARAMETER_ERROR:
                return Promise.reject(res.message || 'error');
            default:
                Message({
                    message: res.message || 'error',
                    type: 'error',
                    duration: 5 * 1000
                });
                return Promise.reject(res.message || 'error');
        }
    },
    error => {
        if (error.message && error.message.includes('timeout')) {
            Message({
                message: '服务器请求超时，请检查网络连接',
                type: 'error',
                duration: 5 * 1000
            });

            return Promise.reject(error);
        }

        const data = error.response.data;

        const errMsg = ResponseHandler.getErrorMessage(data);

        Message({
            message: errMsg,
            type: 'error',
            duration: 3 * 1000
        });

        return Promise.reject(error);
    }
);

/**
 * 向fr-danger-notify-api发送请求的实例
 *
 * @type {AxiosInstance}
 */
export const requestDangerNotify = axios.create({
    baseURL: process.env.VUE_APP_DANGER_NOTIFY_BASE_URL, // url = base url + request url
    timeout: process.env.VUE_APP_TIME_OUT // request timeout
});

// request interceptor
requestDangerNotify.interceptors.request.use(
    config => {
        config.headers['Authorization'] = 'Bearer ' + store.getters.token;
        return config;
    },
    error => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

requestDangerNotify.interceptors.response.use(
    response => {
        const res = response.data;

        switch (res.code) {
            case CommonDef.API_RESPONSE_CODE.SUCCESS:
                return res.data;
            case CommonDef.API_RESPONSE_CODE.PARAMETER_ERROR:
                return Promise.reject(res.message || 'error');
            default:
                Message({
                    message: res.message || 'error',
                    type: 'error',
                    duration: 5 * 1000
                });
                return Promise.reject(res.message || 'error');
        }
    },
    error => {
        if (error.message && error.message.includes('timeout')) {
            Message({
                message: '服务器请求超时，请检查网络连接',
                type: 'error',
                duration: 5 * 1000
            });

            return Promise.reject(error);
        }

        const data = error.response.data;

        const errMsg = ResponseHandler.getErrorMessage(data);

        Message({
            message: errMsg,
            type: 'error',
            duration: 3 * 1000
        });

        return Promise.reject(error);
    }
);

/**
 * 向fr-passport发送请求的实例
 *
 * @type {AxiosInstance}
 */
export const requestPassport = axios.create({
    baseURL: process.env.VUE_APP_PASSPORT_BASE_URL, // url = base url + request url
    timeout: 10000 // request timeout
});

// request interceptor
requestPassport.interceptors.request.use(
    config => {
        // do something before request is sent
        return config;
    },
    error => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

requestPassport.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        if (error.message === 'Network Error' || (error.message && error.message.includes('timeout'))) {
            return Promise.reject('服务器请求超时，请检查网络连接');
        }

        if (error.message === 'Network Error') {
            return Promise.reject('服务器请求超时，请检查网络连接');
        }

        const data = error.response.data;

        if (data.error_description === 'Bad credentials') {
            data.error_description = '密码不正确';
        }

        return Promise.reject(data.error_description);
    }
);

/**
 * 向fr-audit-api发送请求的实例
 *
 * @type {AxiosInstance}
 */
export const requestAudit = axios.create({
    baseURL: process.env.VUE_APP_AUDIT_BASE_URL, // url = base url + request url
    timeout: process.env.VUE_APP_TIME_OUT // request timeout
});

// request interceptor
requestAudit.interceptors.request.use(
    config => {
        config.headers['Authorization'] = 'Bearer ' + store.getters.token;
        return config;
    },
    error => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

requestAudit.interceptors.response.use(
    response => {
        const res = response.data;

        switch (res.code) {
            case CommonDef.API_RESPONSE_CODE.SUCCESS:
                return res.data;
            case CommonDef.API_RESPONSE_CODE.PARAMETER_ERROR:
                return Promise.reject(res.message || 'error');
            default:
                Message({
                    message: res.message || 'error',
                    type: 'error',
                    duration: 5 * 1000
                });
                return Promise.reject(res.message || 'error');
        }
    },
    error => {
        if (error.message && error.message.includes('timeout')) {
            Message({
                message: '服务器请求超时，请检查网络连接',
                type: 'error',
                duration: 5 * 1000
            });

            return Promise.reject(error);
        }

        const data = error.response.data;

        const errMsg = ResponseHandler.getErrorMessage(data);

        Message({
            message: errMsg,
            type: 'error',
            duration: 3 * 1000
        });

        return Promise.reject(error);
    }
);
