const authorizationDef = {
    STATES: {
        /**
         * 正常
         */
        normal: 1,
        /**
         * 处理中
         */
        PROCESSING: 20,
        /**
         * 授权异常
         */
        BIND_ERROR: 99,
        /**
         * 异常
         */
        NO_ASYNC: 100,
        list: [
            { name: '正常', code: 1 },
            { name: '处理中', code: 20 },
            { name: '授权异常', code: 99 },
            { name: '授权异常', code: 100 }
        ]
    }
};

export default authorizationDef;
