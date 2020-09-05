import listMixin from '@/mixins/list.mixin';
import { SubjectPagingParams } from '@/data/subject';
import SubjectDef from '@/constants/subject.def';
import CommonDef from '@/constants/common.def';
import StringUtils from '@/utils/string.utils';
import roomService from '@/service/room.service';
import buildingMixin from '@/mixins/building.mixin';
import deviceGroupService from '@/service/device.group.service';
import groupBindSubjectService from '@/service/group.bind.subject.service';
import { ConfirmDialog } from '@/utils/dialog.utils';
import Remark from '@/components/Remark/remark.vue';
import conditionMixin from '@/mixins/condition.mixin';

export default {
    name: 'AddSubjects',
    mixins: [listMixin, buildingMixin, conditionMixin],
    components: { Remark },
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
             * 被选中的人员
             */
            addedSubjects: null,
            /**
             * 是否授权过人员
             */
            hasAuthorizedSubjects: false
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
         * 关闭该会话框
         */
        close() {
            if (!this.hasAuthorizedSubjects) {
                this.$emit('close');
                return;
            }
            this.$emit('reload');
        },
        /**
         * 处理建筑物改变事件
         *
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
         * 选择表格数据
         */
        handleSelectionChange(value) {
            this.addedSubjects = value;
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
         * 添加人员到设备组
         */
        addSubjectsToDeviceGroup: async function() {
            if (!this.addedSubjects || !this.addedSubjects.length) {
                this.$message({
                    message: '请选择人员，再执行授权',
                    type: 'warning'
                });
                return;
            }
            const restoreDialog = new ConfirmDialog();
            restoreDialog.message = '确定添加该人员到设备组？';
            await restoreDialog.create(this.$msgbox);
            this.loading = true;
            try {
                const deviceGroupId = this.deviceGroupId;
                const subjectIds = this.addedSubjects.map(item => item.subject.id);
                await deviceGroupService.bindSubjects(deviceGroupId, subjectIds);
                this.paging();
                this.loading = false;
                this.hasAuthorizedSubjects = true;
                this.$message({
                    message: '执行授权成功',
                    type: 'success'
                });
                this.$emit('reload');
            } catch (e) {
                this.loading = false;
            }
        },
        /**
         * 查询分页信息
         */
        paging: async function() {
            this.loading = true;
            const res = await this.service.PagingUnbind(this.deviceGroupId, this.conditions);
            this.loading = false;
            this.pageData = res;
        },
        /**
         * 初始化分页参数
         */
        initPagingParams() {
            this.conditions.gender = '';
            this.conditions.type = '';
            this.conditions.buildingId = '';
        }
    },
    props: {
        /**
         * 设备组id
         */
        deviceGroupId: {
            required: true
        },
        /**
         * 会话框标题
         */
        title: {
            required: true,
            type: String
        }
    },
    created: async function() {
        // 设置分页参数
        this.conditions = new SubjectPagingParams();
        this.initPagingParams();
        // 设置服务
        this.service = groupBindSubjectService;
        // 获取buildings,设置检索条件的下拉框
        this.getBuildings();
        this.paging();
        this.getColleges();
    }
};
