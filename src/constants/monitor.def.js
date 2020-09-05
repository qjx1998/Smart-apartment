/**
 * 通用的常量定义
 */
const MonitorDef = {
    /**
     * 方向
     */
    DIRECTIONS: {
        IN: 1,
        OUT: 0,
        list: [{
            code: 1,
            name: '进'
        }, {
            code: 0,
            name: '出'
        }]
    },
    /**
     * 设备类型
     */
    TYPES: {
        CAMERA: 1,
        PAD: 2,
        list: [
            {
                code: 1,
                name: '摄像头'
            },
            {
                code: 2,
                name: '面板机'
            }
        ]
    },
    /**
     * 在线情况
     */
    ONLINE_STATUSES: {
        online: 1,
        offline: 0,
        list: [
            { name: '在线', code: 1 },
            { name: '离线', code: 0 }
        ]
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
         * 已启用
         */
        IS_ACTIVE: 1,
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
        ERROR: 100,
        list: [
            { code: -1, name: '未归档' },
            { code: 0, name: '已归档' },
            { code: 1, name: '正常' },
            { code: 20, name: '处理中' },
            { code: 99, name: '授权异常' },
            { code: 100, name: '异常' }
        ]
    }
};

export default MonitorDef;
