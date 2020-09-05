import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';
import elementEnLocale from 'element-ui/lib/locale/lang/en'; // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN';// element-ui lang
import enLocale from './en';
import zhLocale from './zh';

/**
 * vue使用i18n
 */
Vue.use(VueI18n);

/**
 * 语言配置
 * @type {{en, zh}}
 */

const messages = {
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    zh: {
        ...zhLocale,
        ...elementZhLocale
    }
};

/**
 * 获取本地语言
 * @returns {*}
 */
export function getLanguage() {
    // 从cookie中获取
    const choosedLanguage = Cookies.get('language');
    if (choosedLanguage) {
        return choosedLanguage;
    }
    // 从BOM中选取
    const language = (navigator.language || navigator.browserLanguage).toLowerCase();
    for (const locale of Object.keys(messages)) {
        if (language.indexOf(locale) > -1) {
            return locale;
        }
    }
    // 默认为中文
    return 'zh';
}

/**
 * 构建i18n实例
 * @type {VueI18n}
 */
const i18n = new VueI18n({
    locale: getLanguage(),
    messages
});

export default i18n;
