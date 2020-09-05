/**
 * 设备组常量定义
 */
const deviceGroupDef = {
    /**
     * 状态
     */
    STATES: {
        /**
         * 已启用
         */
        IS_ACTIVE: 1,
        /**
         * 处理中
         */
        PROCESSING: 20,
        /**
         * 授权异常
         */
        BIND_ERROR: 99,
        list: [
            {
                code: 1,
                name: '正常'
            },
            {
                code: 20,
                name: '处理中'
            },
            {
                code: 99,
                name: '授权异常'
            }
        ]
    }
};

export default deviceGroupDef;
