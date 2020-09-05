import { userAuthService } from '../../service/auth.service';
import { resetRouter } from '../../router';
import userService from '../../service/user.service';

const state = {
    token: userAuthService.get(),
    userInfo: null,
    /**
     * 修改密码是否显示
     */
    changingPasswordVisible: false
};

const mutations = {
    /**
     * 保存token
     */
    setToken: (state, token) => {
        state.token = token;
    },
    /**
     * 保存用户信息
     */
    setUserInfo: (state, userInfo) => {
        state.userInfo = userInfo;
    },
    /**
     * 清除用户信息
     */
    clearUserInfo: state => {
        state.userInfo = null;
    },
    /**
     * 清除token
     */
    clearToken: (state) => {
        state.token = '';
        userAuthService.remove();
    },
    /**
     * 打开更改密码会话框
     * @param state
     */
    openChangingPasswordDialog: state => {
        state.changingPasswordVisible = true;
    },
    /**
     * 关闭更改密码会话框
     * @param state
     */
    closeChangingPasswordDialog: state => {
        state.changingPasswordVisible = false;
    }
};

const actions = {
    /**
     * 登录
     */
    login: async({ commit }, payload) => {
        const { userInfo, isPasswdRemed } = payload;
        const { username, password } = userInfo;
        // 通过api进行登录验证，并返回access_token
        const loginResponse = await userService.login(username, password);
        const { access_token } = loginResponse;
        // 将access_token存入store中
        commit('setToken', access_token);
        // 如果用户勾选记住密码，将access_token存入缓存中
        if (isPasswdRemed) {
            userAuthService.set(access_token);
        }
    },
    /**
     * 获取用户信息
     */
    getInfo: async({ commit, state }) => {
        // 获取用户信息
        const userInfo = await userService.getUserInfo(state.token);
        commit('setUserInfo', userInfo);
    },
    /**
     * 登出
     *
     * @param commit
     * @param state
     * @returns {Promise<void>}
     */
    logout: async({ commit, state }) => {
        commit('clearToken');
        commit('clearUserInfo');
        resetRouter();
    },

    /**
     * 删除token
     */
    removeToken: async({ commit }) => {
        commit('setToken', '');
        userAuthService.remove();
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};

