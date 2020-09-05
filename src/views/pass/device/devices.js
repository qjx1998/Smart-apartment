import monitorService from '@/service/monitor.service';
import Monitor, { MonitorPagingParams } from '@/data/monitor';
import MonitorDef from '@/constants/monitor.def';
import listMixin from '@/mixins/list.mixin';
import deviceGroupService from '@/service/device.group.service';
import { ConfirmDialog } from '@/utils/dialog.utils';
import deviceInput from './input/device.input.vue';
import abnormalAuthorization from './abnormal.authorization/abnormal.authorization.vue';

export default {
    name: 'Devices',
    components: {
        deviceInput,
        abnormalAuthorization
    },
    mixins: [listMixin],
    data() {
        return {
            /**
             * 设备常量
             */
            deviceDefs: MonitorDef,
            /**
             * 主机列表
             */
            boxes: null,
            /**
             * 设备组数据
             */
            deviceGroups: null,
            /**
             * 授权异常是否显示
             */
            abnormalAuthorizationVisible: false,
            /**
             * 当前设备
             */
            currentDevice: null
        };
    },
    methods: {
        /**
         * 初始化分页参数
         */
        initPagingParams() {
            this.conditions = new MonitorPagingParams();
            this.conditions.direction = '';
            this.conditions.type = '';
            const { groupId } = this.$route.query;
            this.conditions.groupId = groupId || '';
            this.conditions.online = '';
            this.conditions.state = MonitorDef.STATES.UN_ACHIEVED;
        },
        /**
         * 获取所有的设备组
         */
        getAllDeviceGroups: async function() {
            this.deviceGroups = await deviceGroupService.find();
        },
        /**
         * 通过code获取name
         * @param code
         * @param array
         * @returns {*}
         */
        getNameByCode(code, array) {
            if (code === null) {
                return '';
            }
            for (const item of array) {
                if (item.code === code) {
                    return item.name;
                }
            }
        },
        /**
         * 开启授权异常会话框
         */
        openAbnormalAuthorization(monitorState, currentDevice) {
            if (monitorState !== MonitorDef.STATES.BIND_ERROR) return;
            this.currentDevice = currentDevice;
            this.abnormalAuthorizationVisible = true;
        },
        /**
         * 关闭授权异常会话框
         */
        closeAbnormalAuthorization() {
            this.currentDevice = null;
            this.abnormalAuthorizationVisible = false;
        },
        /**
         * 恢复授权状态
         */
        repairAuthorization: async function(monitorId) {
            const restoreDialog = new ConfirmDialog();
            restoreDialog.message = '确认修复该设备的授权状态？';
            await restoreDialog.create(this.$msgbox);
            this.loading = true;
            try {
                await monitorService.repairAuthorization(monitorId);
                this.paging();
                this.$message({
                    type: 'success',
                    message: '修复授权完毕'
                });
            } catch (e) {
                this.loading = false;
            }
        }
    },
    created() {
        this.DataType = Monitor;
        this.getAllDeviceGroups();
        this.initPagingParams();
        // 从设备组进入到设备页面，传递设备组id
        this.service = monitorService;
        this.paging();
    }
};
