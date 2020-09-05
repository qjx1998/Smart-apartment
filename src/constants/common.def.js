/**
 * 通用的常量定义
 */
const CommonDef = {
    /**
     * 通用状态： 1.成功/2.失败
     */
    STATUS: {
        Success: 1,
        Failure: 0
    },
    /**
     * http响应的状态
     */
    HTTP_RESPONSE_STATUS: {
        Success: 200,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        TIMEOUT: 408,
        SERVER_ERROR: 500
    },
    /**
     * api返回的业务code
     */
    API_RESPONSE_CODE: {
        SUCCESS: 0,
        PARAMETER_ERROR: 112,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        TIMEOUT: 408,
        SERVER_ERROR: 500,
        SUBJECT_TOKEN_EXPIRED: 994,
        SDK_ERROR: 997
    },
    /**
     * 导入文件的格式
     */
    IMPORT_FILE_TYPE: 'xlsx',
    /**
     * 对象的状态
     */
    OBJECT_STATUS: {
        /**
         * 未归档
         */
        UN_ACHIEVED: -1,
        /**
         * 归档
         */
        ACHIEVED: 0,
        /**
         * 已启用
         */
        IS_ACTIVE: 1,
        /**
         * 禁用
         */
        BANNED: 2,
        /**
         * 未激活
         */
        NO_ACTIVE: 10,
        /**
         * 处理中
         */
        PROCESSING: 20,
        /**
         * 授权异常
         */
        BIND_ERROR: 99,
        /**
         * 未同步
         */
        NO_ASYNC: 100,
        list: [
            {
                code: 0,
                name: '已归档'
            },
            {
                code: 1,
                name: '已启用'
            },
            {
                code: 10,
                name: '未激活'
            },
            {
                code: 20,
                name: '处理中'
            },
            {
                code: 99,
                name: '授权异常'
            },
            {
                code: 100,
                name: '未同步'
            }
        ]
    },
    /**
     * 条件运算符
     */
    MATH_OPERATORS: {
        /**
         * 大于
         */
        GREATER: 1,
        /**
         * 大于等于
         */
        GREATER_THAN: 2,
        /**
         * 等于
         */
        EQUAL: 3,
        /**
         * 小于
         */
        LESS: 4,
        /**
         * 小于等于
         */
        LESS_THAN: 5,
        list: [
            {
                code: 1,
                name: '大于',
                symbol: '>'
            },
            {
                code: 2,
                name: '大于等于',
                symbol: '≥'
            },
            {
                code: 3,
                name: '等于',
                symbol: '='
            },
            {
                code: 4,
                name: '小于',
                symbol: '<'
            },
            {
                code: 5,
                name: '小于等于',
                symbol: '≤'
            }
        ]
    },
    /**
     * 访问终端类型, pc/mobile
     */
    DEVICE_TYPES: {
        PC: 0,
        MOBILE: 1
    },
    /**
     * 人员基础信息导入模版地址
     */
    IMPORT_SUBJECT_TEMPLATE_URL: process.env.VUE_APP_OSS_BASE_URL + '人员基础信息导入模版.xlsx',
    /**
     * 未分配宿舍
     */
    UN_DISTRIBUTED_ROOM: -1,
    /**
     * 异常评级
     */
    DANGER_CODE: {
        LOW: 0,
        MEDIUM: 1,
        HIGH: 2,
        0: '低',
        1: '中',
        2: '高',
        LIST: [
            {
                code: 0,
                name: '低'
            },
            {
                code: 1,
                name: '中'
            },
            {
                code: 2,
                name: '高'
            }
        ]
    },

    /**
     * 通用操作
     */
    OPERATION: {
        LOGIN: 1,
        CREATE: 2,
        UPDATE: 3,
        DELETE: 4,
        EXPORT: 4,
        1: '登录',
        2: '新增',
        3: '更新',
        4: '删除',
        5: '导出',

        list: [{
            code: 1,
            name: '登录'
        }, {
            code: 2,
            name: '新增'
        }, {
            code: 3,
            name: '更新'
        }, {
            code: 4,
            name: '删除'
        }, {
            code: 5,
            name: '导出'
        }]
    }
};

export default CommonDef;
