/**
 * 人员的常量定义
 */
const SubjectDef = {
    /**
     * 性别
     */
    GENDER: {

        MALE: 1,
        FEMALE: 2,
        1: '男',
        2: '女',
        list: [{
            code: 1,
            name: '男'
        }, {
            code: 2,
            name: '女'
        }]
    },
    /**
     * 类型
     */
    TYPE: {
        EMPLOYEE: 1,
        STUDENT: 2,
        VISITOR: 3,
        STRANGER: 4,
        1: '教职工',
        2: '学生',
        3: '访客',
        4: '陌生人',

        list: [{
            code: 1,
            name: '教职工'
        }, {
            code: 2,
            name: '学生'
        }, {
            code: 3,
            name: '访客'
        }, {
            code: 4,
            name: '陌生人'
        }]
    },
    /**
     * 是否在寝
     */
    IS_PRESENT: {
        NO: 0,
        YES: 1,
        list: [{
            code: 0,
            name: '在寝'
        }, {
            code: 1,
            name: '不在寝'
        }]
    },
    /**
     * 状态
     */
    STATES: {
        /**
         * 未归档
         */
        UN_ACHIEVED: -1,
        /**
         * 归档
         */
        ACHIEVED: 0,
        /**
         * 正常
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
         * 审核中
         */
        AUDITING: 30,
        /**
         * 授权异常
         */
        BIND_ERROR: 99,
        /**
         * 异常
         */
        NO_ASYNC: 100,
        0: '已归档',
        1: '正常',
        10: '未激活',
        20: '处理中',
        30: '待审核',
        99: '授权异常',
        100: '异常',
        list: [
            {
                code: 0,
                name: '已归档'
            },
            {
                code: 1,
                name: '正常'
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
                code: 30,
                name: '待审核'
            },
            {
                code: 99,
                name: '授权异常'
            },
            {
                code: 100,
                name: '异常'
            }
        ]
    },
    /**
     * 号码类型
     */
    NUMBER_TYPE: {
        PHONE_NUMBER: 0,
        ID_NUMBER: 1,
        JOB_NUMBER: 2,
        list: [
            {
                name: '手机号',
                code: 0
            },
            {
                name: '身份证号',
                code: 1
            },
            {
                name: '学号/工号',
                code: 2
            }
        ]
    }
};

export default SubjectDef;
