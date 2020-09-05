
import { requestPassport, requestServer } from '../utils/request';
import BaseService from './base.service';
import { User } from '../data/user';

class UserService extends BaseService {
    /**
     * 查询所有用户
     */
    async findAllUser() {
        const json = await requestServer({
            url: '/api/user/all',
            method: 'get'
        });
        return json.map(data => BaseService.convertWithEntityType(data, User));
    }

    /**
     * 用户登录
     *
     * @param accountName
     * @param password
     * @returns {Promise<void>}
     */
    async login(accountName, password) {
        const auth = {
            username: 'account',
            password: 'secret'
        };

        const params = {
            username: accountName,
            password: password,
            grant_type: 'password'
        };

        return await requestPassport({
            url: '/oauth/token',
            method: 'post',
            auth,
            withCredentials: false,
            params
        });
    }

    /**
     * 获取用户的信息
     *
     * @param token
     * @returns {Promise<void>}
     */
    async getUserInfo(token) {
        return await requestPassport({
            url: '/api/account',
            method: 'get',
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }

    /**
     * 修改用户的密码
     */
    async updatePassword(UpdatePasswordForm) {
        return await requestServer({
            url: '/api/user/update/password',
            method: 'put',
            data: UpdatePasswordForm
        });
    }
}

export default new UserService('/api/user/', User, requestServer);
