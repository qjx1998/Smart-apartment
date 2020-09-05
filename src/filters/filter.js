/**
 * 处理后台返回的日期，将T替换为' '
 * @param date
 * @returns {string|*}
 */
export function dateFilter(date) {
    if (!date) { return ''; }
    return date.replace('T', ' ');
}
