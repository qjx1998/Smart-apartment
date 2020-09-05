import i18n from '../lang/i18n';

export default class I18nUtils {
    static generateTitle(title) {
        const hasKey = i18n.te(`route.${title}`);

        if (hasKey) {
            return i18n.t(`route.${title}`);
        }

        return title;
    }
}
