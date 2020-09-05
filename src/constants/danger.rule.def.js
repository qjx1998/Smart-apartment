/**
 * 告警规则的常量定义
 */
const DangerRuleDef = {
    /**
     * 规则种类
     */
    TYPE: {
        COMMON: 1,
        CUSTOM: 2,
        1: '通用规则',
        2: '自定义规则',

        list: [{
            code: 1,
            name: '通用规则'
        }, {
            code: 2,
            name: '自定义规则'
        }]
    },
    /**
     * 规则级别
     */
    LEVEL: {
        URGENT: 1,
        SERIOUS: 2,
        GENERAL: 3,
        1: '紧急',
        2: '严重',
        3: '一般',

        list: [{
            code: 1,
            name: '紧急'
        }, {
            code: 2,
            name: '严重'
        }, {
            code: 3,
            name: '一般'
        }]
    },

    /**
     * 告警类别
     */
    DANGER_TYPE: {
        LATE_BACK: 1,
        NOT_BACK: 2,
        MUTI_NOT_BACK: 3,
        MUTI_NOT_OUT: 4,
        DEVICE_OFFLINE: 5,
        1: '晚归',
        2: '未归',
        3: '多日未归',
        4: '多日未出',
        5: '设备离线',

        list: [{
            code: 1,
            name: '晚归'
        }, {
            code: 2,
            name: '未归'
        }, {
            code: 3,
            name: '多日未归'
        }, {
            code: 4,
            name: '多日未出'
        }, {
            code: 5,
            name: '设备离线'
        }
        ]
    },

    /**
     * 推送方式
     */
    NOTIFY_TYPE: {
        SHORT_MESSAGE: 1,
        1: '短信',

        list: [{
            code: 1,
            name: '短信'
        }]
    },

    /**
     * 通用规则下数据来源和消息接收目标
     */
    DOMAIN: {
        CLOOEGE: 1,
        INSTITUTE: 2,
        DEPARTMENT: 3,
        CLAZZ: 4,
        1: '学校',
        2: '院系',
        3: '部门',
        4: '班级',

        list: [{
            code: 1,
            name: '学校'
        }, {
            code: 2,
            name: '院系'
        }, {
            code: 3,
            name: '部门'
        }, {
            code: 4,
            name: '班级'
        }]
    },

    /**
     * 规则种类
     */
    STATE: {
        NORMAL: 1,
        DISABLED: 0,
        1: '启用',
        0: '禁用',

        list: [{
            code: 1,
            name: '启用'
        }, {
            code: 0,
            name: '禁用'
        }]
    },

    /**
     * 晚归指标项类型
     */
    LATE_BACK_CONDITION_TYPE: {
        YESTERDAY_LATE_BACK_NUM: 1,
        1: '昨日晚归人数',
        list: [{ code: 1, name: '昨日晚归人数' }]
    },
    /**
     * 未归指标项类型
     */
    YESTERDAY_OUT_CONDITION_TYPE: {
        YESTERDAY_NOT_BACK_NUM: 2,
        2: '昨日未归人数',
        list: [{ code: 2, name: '昨日未归人数' }]
    },
    /**
     * 设备离线指标项类型
     */
    DEVICE_OFFLINE_CONDITION_TYPE: {
        DEVICE_OFFLINE_NUM: 7,
        7: '设备离线数',
        list: [{ code: 7, name: '设备离线数' }]
    },
    /**
     * 连续多日未出/未归指标项类型
     */
    MULTI_DAYS_OUT_OR_IN_CONDITION_TYPE: {
        TWO_DAYS_NUM: 3,
        THREE_FOUR_DAYS_NUM: 4,
        FIVE_OVER_DAYS_NUM: 5,
        TOTAL_NUM: 6,
        3: '2天人数',
        4: '3-4天人数',
        5: '5天及以上人数',
        6: '总人数',
        list: [{
            code: 3,
            name: '2天人数'
        }, {
            code: 4,
            name: '3-4天人数'
        }, {
            code: 5,
            name: '5天及以上人数'
        }, {
            code: 6,
            name: '总人数'
        }]
    },
    /**
     * 指标项条件类型
     */
    CONDITION_TYPE: {
        YESTERDAY_LATE_BACK_NUM: 1,
        YESTERDAY_NOT_BACK_NUM: 2,
        TWO_DAYS_NUM: 3,
        THREE_FOUR_DAYS_NUM: 4,
        FIVE_OVER_DAYS_NUM: 5,
        TOTAL_NUM: 6,
        DEVICE_OFFLINE_NUM: 7,
        1: '昨日晚归人数',
        2: '昨日未归人数',
        3: '2天人数',
        4: '3-4天人数',
        5: '5天及以上人数',
        6: '总人数',
        7: '设备离线数',

        list: [{
            code: 1,
            name: '昨日晚归人数'
        }, {
            code: 2,
            name: '昨日未归人数'
        }, {
            code: 3,
            name: '2天人数'
        }, {
            code: 4,
            name: '3-4天人数'
        }, {
            code: 5,
            name: '5天及以上人数'
        }, {
            code: 6,
            name: '总人数'
        }, {
            code: 7,
            name: '设备离线数'
        }]
    },

    /**
     * 周期类型
     */
    CYCLE_TYPE: {
        DAY: 1,
        WEEK: 2,
        MOUTH: 3,
        1: '日',
        2: '周',
        3: '月',

        list: [{
            code: 1,
            name: '日'
        }, {
            code: 2,
            name: '周'
        }, {
            code: 3,
            name: '月'
        }]
    }
};

export default DangerRuleDef;
