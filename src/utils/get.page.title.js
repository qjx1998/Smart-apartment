import defaultSettings from '../settings';
import i18n from '../lang/i18n';

const title = defaultSettings.title || 'Vue Admin Template';

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        const hasKey = i18n.te(`route.${pageTitle}`);
        if (hasKey) {
            return i18n.t(`route.${pageTitle}`);
        }
        return pageTitle;
    }
    return `${title}`;
}
