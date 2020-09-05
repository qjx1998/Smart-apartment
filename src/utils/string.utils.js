
const StringUtils = {
    /**
     * 判断字符串是否为空
     *
     * @param str 待验证字符串
     */
    isEmpty: (str) => {
        if (str === null || str === undefined) {
            return true;
        }

        return (str + '').trim().length === 0;
    },
    /**
     * 判断字符串是否为空
     *
     * @param str 待验证字符串
     */
    isNotEmpty: (str) => {
        return !this.isEmpty(str);
    },
    /**
     * 是否包含子字符串
     *
     * @param str 待测试字符串
     * @param subStr 字符串
     */
    includes: (str, subStr) => {
        return str.includes(subStr);
    }

};

export default StringUtils;
