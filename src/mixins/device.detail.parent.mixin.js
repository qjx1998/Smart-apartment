import deviceGroupService from '@/service/device.group.service';
import MonitorDef from '@/constants/monitor.def';

export default {
    data() {
        return {
            /**
             * 设备详情是否显示
             */
            deviceDetailVisible: false,
            /**
             * 设备组
             */
            deviceGroups: [],
            /**
             * 设备常量定义
             */
            deviceDefs: MonitorDef,
            /**
             * 当前的device
             */
            device: null
        };
    },
    methods: {
        /**
         * 展示设备详情
         */
        showDeviceDetail(device) {
            this.device = device;
            this.deviceDetailVisible = true;
        },
        /**
         * 隐藏设备详情
         */
        hideDeviceDetail() {
            this.device = null;
            this.deviceDetailVisible = false;
        },
        /**
         * 获取所有的设备组
         */
        async getAllDeviceGroups() {
            this.deviceGroups = await deviceGroupService.find();
        }
    }
};
