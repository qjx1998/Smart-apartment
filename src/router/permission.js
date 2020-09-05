import router from './index';
import store from '../store';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import getPageTitle from '../utils/get.page.title';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login']; // no redirect whitelist

async function managerRouteHandler(to, from, next) {
    // 是否存在管理平台用户授权信息
    const hasUserAuth = store.getters.token;

    // 如果没有相应的token
    if (!hasUserAuth) {
        // 路径在白名单中，则直接跳转
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else { // 不在白名单中，则跳转到登录页面
            next({ path: '/login' });
        }
    } else if (to.path === '/login') { // 有token，如果是登录页面
        // 跳转到主页
        next({ path: '/' });
    } else { // 有token，不是登录页面
        const hasGetUserInfo = store.getters.userInfo;
        // 有用户信息
        if (hasGetUserInfo) {
            next();
        } else {
            try {
                // 查询用户信息
                await store.dispatch('user/getInfo');
                next();
            } catch (error) {
                // 错误处理
                await store.dispatch('user/removeToken');
                Message.error(error || 'Has Error');
                next(`/login?redirect=${to.path}`);
                NProgress.done();
            }
        }
    }
}

router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start();

    // set page title
    document.title = getPageTitle(to.meta.title);

    await managerRouteHandler(to, from, next);
});

router.afterEach(() => {
    NProgress.done();
});

