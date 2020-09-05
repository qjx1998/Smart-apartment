import listMixin from '@/mixins/list.mixin';
import buildingMixin from '@/mixins/building.mixin';
import DeviceGroup, { DeviceGroupPagingParams, DeviceGroupView } from '@/data/device.group';
import deviceGroupService from '@/service/device.group.service';
import deviceGroupDef from '@/constants/device.group.def';
import { ConfirmDialog } from '@/utils/dialog.utils';
import deviceInput from './input/input.vue';
import AbnormalAuthorization from '@/views/pass/device/abnormal.authorization/abnormal.authorization.vue';

export default {
    name: 'DeviceGroup',
    components: { deviceInput, AbnormalAuthorization },
    mixins: [listMixin, buildingMixin],
    data() {
        return {
            /**
             * 设备组状态
             */
            deviceGroupStates: deviceGroupDef.STATES,
            /**
             * 当前设备组
             */
            currentGroup: null,
            /**
             * 是否显示授权异常明细
             */
            abnormalAuthorizationVisible: false,
            /**
             * 修改设备组的设备组id
             */
            editingGroupId: null,
            /**
             * 当前设备组的buildings数据
             */
            currentGroupsBuildings: []
        };
    },
    methods: {
        /**
         * 关闭输入会话框
         * @param current 当前需要编辑的对象
         */
        showInput(current) {
            if (current) {
                const { deviceGroup, buildings } = current;
                // 设置正在编辑设备组的id
                this.editingGroupId = deviceGroup.id;
                this.currentGroupsBuildings = buildings;
                buildings && (deviceGroup.buildingIds = buildings.map(item => item.id));
                this.editingObject = Object.assign({}, deviceGroup);
            } else {
                this.editingObject = new DeviceGroup();
                this.editingObject.buildingIds = [];
            }
            this.inputVisible = true;
        },
        /**
         * 关闭输入会话框
         */
        closeInput() {
            this.inputVisible = false;
            this.editingObject = null;
            this.editingGroupId = null;
            this.currentGroupsBuildings = [];
        },
        /**
         * 根据状态code，获取状态名
         */
        getKeyByValue(value) {
            // 如果state的值等于status的code，返回status的name
            const statuses = this.deviceGroupStates.list;
            for (const status of statuses) {
                if (value === status.code) {
                    return status.name;
                }
            }
        },
        /**
         * 通过返回数据的buildings获取授权楼栋展示信息
         */
        getBuildingNames(buildings) {
            if (!buildings) { return ''; }
            let buildingNames = '';
            buildings.forEach(item => {
                buildingNames += item.name + '，';
            });
            buildingNames = buildingNames.slice(0, buildingNames.length - 1);
            return buildingNames;
        },
        /**
         * 跳转到单独授权页面，携带参数选中设备组id
         * @param deviceGroupId 设备组id
         */
        navigateToAuthorizeSubjects(deviceGroup) {
            const { id, name } = deviceGroup;
            this.$router.push({ name: 'authorizeSubjects', query: { deviceGroupId: id, deviceGroupName: name }});
        },
        /**
         * 查看设备
         * @param groupId 设备组id
         */
        navigateToDevices(groupId) {
            this.$router.push({ name: 'device', query: { groupId }});
        },
        /**
         * 开启授权异常会话框
         */
        openAbnormalAuthorization(groupState, currentGroup) {
            if (groupState !== this.deviceGroupStates.BIND_ERROR) { return; }
            this.currentGroup = currentGroup;
            this.abnormalAuthorizationVisible = true;
        },
        /**
         * 关闭授权异常会话框
         */
        closeAbnormalAuthorization() {
            this.currentGroup = null;
            this.abnormalAuthorizationVisible = false;
        },
        /**
         * 恢复授权状态
         */
        repairAuthorization: async function(groupId) {
            const restoreDialog = new ConfirmDialog();
            restoreDialog.message = '确认修复该设备组的授权状态？';
            await restoreDialog.create(this.$msgbox);
            this.loading = true;
            try {
                await deviceGroupService.repairAuthorization(groupId);
                this.loading = false;
                this.paging();
                this.$message({
                    type: 'success',
                    message: '修复授权完毕'
                });
            } catch (e) {
                this.loading = false;
            }
        },
        /**
         * 设置默认条件
         */
        initPagingParams() {
            this.conditions = new DeviceGroupPagingParams();
            this.conditions.buildingId = '';
            this.conditions.state = '';
        }
    },
    created: async function() {
        this.DataType = DeviceGroupView;
        this.service = deviceGroupService;
        this.initPagingParams();
        await this.getBuildings();
        await this.paging();
    }
};
