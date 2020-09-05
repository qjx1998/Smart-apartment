/**
 *告警信息定义常量
 */
const warningMessage = {
    /**
     * 级别选项
     */
    LEVEL: {
        /**
         * 紧急
         */
        URGENT: 1,
        /**
         * 严重
         */
        SERIOUS: 2,
        /**
         * 一般
         */
        COMMONLY: 3,
        1: '紧急',
        2: '严重',
        3: '一般',
        lists: [
            { name: '紧急', code: 1 },
            { name: '严重', code: 2 },
            { name: '一般', code: 3 }
        ]
    },
    /**
     * 异常行为类型
     */
    DANGER_TYPES: {
        LATE_PRESENT: 1,
        NO_PRESENT: 2,
        NO_DAILY_PRESENT: 3,
        NO_OUT: 4,
        OFF_LINE: 5,
        1: '晚归',
        2: '未归',
        3: '多日未归',
        4: '多日未出',
        5: '离线设备',
        lists: [
            { name: '晚归', code: 1 },
            { name: '未归', code: 2 },
            { name: '多日未归', code: 3 },
            { name: '多日未出', code: 4 },
            { name: '离线设备', code: 5 }
        ]
    },
    /**
     * 推送状态
     */
    PUSH_STATES: {
        END_name: 1,
        PENNING_name: 2,
        NO_name: 3,
        1: '推送中',
        2: '已推送',
        3: '未推送',
        lists: [
            { name: '推送中', code: 1 },
            { name: '已推送', code: 2 },
            { name: '未推送', code: 3 }
        ]
    },
    /**
     * 推送日期
     */
    PUSH_DATE: {
        DAY: 1,
        WEEK: 2,
        MONTH: 3,
        1: '当日',
        2: '本周',
        3: '本月',
        lists: [
            { name: '当日', code: 1 },
            { name: '本周', code: 2 },
            { name: '本月', code: 3 }
        ]
    },
    /**
     * 推送日，周 cronValue
     */
    DAYS_IN_WEEK: {
        MONDAY: 2,
        TUESDAY: 3,
        WEDNESDAY: 4,
        THURSDAY: 5,
        FRIDAY: 6,
        SATURDAY: 7,
        SUNDAY: 1,
        1: '周日',
        2: '周一',
        3: '周二',
        4: '周三',
        5: '周四',
        6: '周五',
        7: '周六',
        list: [
            { name: '周日', code: 1 },
            { name: '周一', code: 2 },
            { name: '周二', code: 3 },
            { name: '周三', code: 4 },
            { name: '周四', code: 5 },
            { name: '周五', code: 6 },
            { name: '周六', code: 7 }
        ]
    }
};

export default warningMessage;
