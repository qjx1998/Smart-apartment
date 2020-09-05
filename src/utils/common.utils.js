export default class CommonUtils {
    /**
     * 将conditions赋值为空的字符串
     * @param conditions 参数对象
     */
    static formatConditions(conditions) {
        for (const key of Object.keys(conditions)) {
            conditions[key] = '';
        }
        conditions.page = 1;
        conditions.size = 10;
        conditions.total = null;
    }
}
