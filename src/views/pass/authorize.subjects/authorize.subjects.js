import listMixin from '@/mixins/list.mixin';
import { SubjectPagingParams } from '@/data/subject';
import SubjectDef from '@/constants/subject.def';
import buildingMixin from '@/mixins/building.mixin';
import roomService from '@/service/room.service';
import StringUtils from '@/utils/string.utils';
import CommonDef from '@/constants/common.def';
import groupBindSubjectService from '@/service/group.bind.subject.service';
import deviceGroupService from '@/service/device.group.service';
import authorizationDef from '@/constants/authorization.def';
import deviceGroupDef from '@/constants/device.group.def';
import { ConfirmDialog } from '@/utils/dialog.utils';
import AbnormalAuthorization from '@/views/pass/device/abnormal.authorization/abnormal.authorization.vue';
import addSubjects from '@/views/pass/authorize.subjects/add.subjects/add.subjects.vue';
import Remark from '@/components/Remark/remark.vue';
import conditionMixin from '@/mixins/condition.mixin';

export default {
    name: 'AuthorizeSubjects',
    components: { AbnormalAuthorization, addSubjects, Remark },
    mixins: [listMixin, buildingMixin, conditionMixin],
    data() {
        return {
            /**
             * 性别列表
             */
            genders: SubjectDef.GENDER,
            /**
             * 识别主体类型
             */
            subjectTypes: SubjectDef.TYPE,
            /**
             * 建筑物中的房间
             */
            roomsInBuilding: [],
            /**
             * 未分配宿舍
             */
            un_Distributed_Room: CommonDef.UN_DISTRIBUTED_ROOM,
            /**
             * 添加人员会话框是否显示
             */
            addSubjectsDialogVisible: false,
            /**
             * 当前设备组id
             */
            currentDeviceGroupId: null,
            /**
             * 要移除授权的人员
             */
            unauthorizedSubjects: null,
            /**
             * 主体常量定义
             */
            SubjectDef: SubjectDef,
            /**
             * 授权常量定义
             */
            authorizationDef: authorizationDef,
            /**
             * 当前的主体
             */
            currentSubject: null,
            /**
             * 当前的设备组name
             */
            currentDeviceGroupName: null,
            /**
             * 异常明细是否显示
             */
            abnormalAuthorizationVisible: false,
            /**
             * 设备组状态
             */
            deviceGroupStates: deviceGroupDef.STATES
        };
    },
    computed: {
        /**
         * 是否禁用宿舍表单
         * @returns {*|boolean|*}
         */
        roomSelectorDisabled() {
            return StringUtils.isEmpty(this.conditions.buildingId);
        }
    },
    methods: {
        /**
         * 处理建筑物改变事件
         * @param buildingId 建筑物ID
         */
        handleBuildingChanged(buildingId) {
            this.roomsInBuilding.splice(0, this.roomsInBuilding.length);

            if (!buildingId) {
                return;
            }
            this.getRooms(buildingId);
        },
        /**
         * 获取建筑物中的房间
         *
         * @param buildingId 建筑物ID
         */
        getRooms(buildingId) {
            const self = this;

            roomService.findByBuildingId(buildingId).then(
                res => res.forEach(room => self.roomsInBuilding.push(room))
            );
        },
        /**
         * 打开添加人员会话框
         */
        openAddSubjectDialog() {
            this.addSubjectsDialogVisible = true;
        },
        /**
         * 关闭添加人员会话框
         */
        closeAddSubjectDialog() {
            this.addSubjectsDialogVisible = false;
        },
        /**
         * 关闭人员会话框且重新加载
            */
        reload() {
            this.addSubjectsDialogVisible = false;
            this.paging();
        },
        /**
         * 查询分页信息
         */
        paging: async function() {
            this.loading = true;
            const res = await this.service.PagingBind(this.currentDeviceGroupId, this.conditions);
            this.loading = false;
            this.pageData = res;
        },
        /**
         * 获得完整的宿舍
         */
        getFullRoomName(buildingName, roomName) {
            return roomName ? buildingName + roomName : buildingName || '';
        },
        /**
         * 获取rowKey
         */
        getRowKey(row) {
            return row.subject.id;
        },
        /**
         * 从设备组移除人员
         */
        removeSubjectsFromDeviceGroup: async function() {
            if (!this.unauthorizedSubjects || !this.unauthorizedSubjects.length) {
                this.$message({
                    message: '请选择人员，再移除',
                    type: 'warning'
                });
                return;
            }
            const restoreDialog = new ConfirmDialog();
            restoreDialog.message = '确定移除该人员？';
            await restoreDialog.create(this.$msgbox);
            this.loading = true;
            try {
                const deviceGroupId = this.currentDeviceGroupId;
                const subjectIds = this.unauthorizedSubjects.map(item => item.subject.id);
                await deviceGroupService.unbindSubjects(deviceGroupId, subjectIds);
                this.paging();
                this.$message({
                    message: '移除人员成功',
                    type: 'success'
                });
            } catch (e) {
                this.loading = false;
            }
        },
        /**
         * 选择表格数据
         */
        handleSelectionChange(value) {
            this.unauthorizedSubjects = value;
        },
        /**
         * 返回设备组
         */
        navigateBack() {
            this.$router.go(-1);
        },
        /**
         * 打开授权异常明细
         * @param subject 用户
         */
        openAbnormalAuthorization(subject) {
            // 设置主体id为选中主体的id，再打开授权异常明细
            this.currentSubject = subject;
            this.abnormalAuthorizationVisible = true;
        },
        /**
         * 关闭授权异常会话框
         */
        closeAbnormalAuthorization() {
            this.currentSubject = null;
            this.abnormalAuthorizationVisible = false;
        },
        /**
         * 初始化分页参数
         */
        initPagingParams() {
            this.conditions.gender = '';
            this.conditions.type = '';
            this.conditions.buildingId = '';
            this.conditions.state = '';
        }
    },
    created: async function() {
        this.conditions = new SubjectPagingParams();
        this.initPagingParams();
        const { deviceGroupId, deviceGroupName } = this.$route.query;
        this.currentDeviceGroupId = deviceGroupId;
        this.currentDeviceGroupName = deviceGroupName;
        // 设置服务
        this.service = groupBindSubjectService;
        // 获取buildings,设置检索条件的下拉框
        this.getBuildings();
        this.paging();
        this.getColleges();
    }
};
