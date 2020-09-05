const ABNORMAL_DEF = {
    /**
     * 异常行为类型
     */
    DANGER_TYPES: {
        ALL: 0,
        NO_OUT: 1,
        NO_PRESENT: 2,
        0: '全部',
        1: '连续多日未出',
        2: '连续多日未归'
    },
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
    }
};

export default ABNORMAL_DEF;
