import 'babel-polyfill';
import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import '@/styles/abnormal.authorization.scss';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/index.scss'; // global css

import App from './App';
import store from './store';
import router from './router';

import '@/icons'; // icon
import './router/permission'; // permission control

import i18n from './lang/i18n';

import setToken from './utils/set.token';

// 设置全局filters
import * as filters from '@/filters/filter';
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

setToken();

// set ElementUI lang to i18n
Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
});

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
});
