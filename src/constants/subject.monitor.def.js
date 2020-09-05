const subjectMonitorDef = {
    STATES: {
        /**
         * 正常
         */
        IS_ACTIVE: 1,
        /**
         * 授权异常
         */
        ABNORMAL_AUTHORIZED: 99,
        /**
         * 异常
         */
        ERROR: 100,
        /**
         * 状态列表
         */
        list: [
            { name: '正常', code: 1 },
            { name: '授权异常', code: 99 },
            { name: '授权异常', code: 100 }
        ]
    },
    ERRORS: {
        /**
         * 设备绑定识别主体异常
         */
        MONITOR_BIND_SUBJECT_ERROR: '10001',
        /**
         * 设备解绑识别主体异常
         */
        MONITOR_UNBIND_SUBJECT_ERROR: '10002',
        list: [
            {
                name: '新增',
                code: '10001'
            },
            {
                name: '删除',
                code: '10002'
            }
        ]
    }
};

export default subjectMonitorDef;
