/**
 * 用户的常量定义
 */
const UserDef = {
    /**
     * 用户类型
     */
    TYPE: {
        ADMIN: 1,
        GENERAL_USER: 2,
        SUPER_ADMIN: 3,

        list: [{
            code: 1,
            name: '管理员'
        }, {
            code: 2,
            name: '普通用户'
        }, {
            code: 3,
            name: '超级管理员'
        }]
    }
};

export default UserDef;
