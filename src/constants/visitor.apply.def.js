export const AUDIT_STATE = {
    AUDITING: 0,
    AUDIT_SUCCESS: 1,
    AUDIT_FAIL: 2,
    0: '待审核',
    1: '已通过',
    2: '未通过',
    list: [
        { code: 0, name: '待审核' },
        { code: 1, name: '已通过' },
        { code: 2, name: '未通过' }
    ]
};

export const APPLY_COMMIT_TIME = {
    ALL: 0,
    TODAY: 1,
    THIS_WEEK: 2,
    THIS_MONTH: 3,
    0: '全部',
    1: '本日',
    2: '本周',
    3: '本月',
    list: [
        { code: 0, name: '全部' },
        { code: 1, name: '本日' },
        { code: 2, name: '本周' },
        { code: 3, name: '本月' }
    ]
};
