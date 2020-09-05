import { subjectAuthService } from '../../service/auth.service';
import mobileSubjectService from '../../service/mobile/mobile.subject.service';

const state = {
    authorizeInfo: subjectAuthService.get()
};

const mutations = {
    /**
     * 保存识别主体授权信息
     */
    setAuthorizeInfo: (state, authorizeInfo) => {
        state.authorizeInfo = authorizeInfo;
    },
    /**
     * 清除token
     */
    clearAuthorizeInfo: (state) => {
        state.authorizeInfo = null;
        subjectAuthService.remove();
    }
};

const actions = {
    /**
     * 登录
     */
    login: async({ commit }, loginInfo) => {
        const { phone, code } = loginInfo;
        // 通过api进行登录验证，并返回access_token
        const token = await mobileSubjectService.login(phone, code);

        if (!token) {
            return Promise.reject();
        }

        const authorizeInfo = {
            phone: phone,
            token: token
        };

        // 将识别主体授权信息存入store
        commit('setAuthorizeInfo', JSON.stringify(authorizeInfo));
        // 将识别主体授权信息存入缓存中
        subjectAuthService.set(authorizeInfo);
    },
    /**
     * 登出
     *
     * @param commit
     * @param state
     * @returns {Promise<void>}
     */
    logout: async({ commit, state }) => {
        commit('setAuthorizeInfo', null);
        subjectAuthService.remove();
    }

};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};

