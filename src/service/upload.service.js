// todo
import store from '../store';
import axios from 'axios';
import { Message } from 'element-ui';
import ResponseHandler from '../utils/response.handler';
import { BatchUploadPhotoResultView } from '@/data/subject';

const uploadServer = axios.create({
    baseURL: process.env.VUE_APP_SERVER_BASE_URL,
    headers: {
        'Authorization': 'Bearer ' + store.state.user.token,
        'Content-Type': 'multipart/form-data;' +
            ' boundary=----WebKitFormBoundaryDqsBYrvqdgKtIx7U'
    }
    // timeout: process.env.VUE_APP_TIME_OUT // request timeout
});

uploadServer.interceptors.response.use(
    res => {
        return res.data;
    },
    error => {
        if (error.message && error.message.includes('timeout')) {
            Message({
                message: '服务器请求超时，请检查网络连接',
                type: 'error',
                duration: 5 * 1000
            });

            return Promise.reject(error.response);
        }
        const { data } = error.response;

        // 如果errors存在，显示errors里的错误
        if (data.errors) {
            const { errors } = data;
            const errorMsgs = errors.reduce((prev, item) => {
                const { params } = item;
                let { message } = item;
                for (const key in params) {
                    message = message.replace('${' + key + '}', ` ${params[key]} `);
                }
                return prev + message;
            }, '');
            Message({
                message: errorMsgs,
                type: 'error',
                duration: 5 * 1000
            });
            return Promise.reject(error.response);
        }

        // 否则，正常处理错误
        const errMsg = ResponseHandler.getErrorMessage(data);

        Message({
            message: errMsg,
            type: 'error',
            duration: 3 * 1000
        });

        return Promise.reject(error.response);
    }
);

async function uploadPhotosRequest(data) {
    const json = await uploadServer({
        url: '/api/subject/batch/upload/photo',
        method: 'post',
        data
    });

    return Object.assign(new BatchUploadPhotoResultView(), json);
}

export default uploadPhotosRequest;
