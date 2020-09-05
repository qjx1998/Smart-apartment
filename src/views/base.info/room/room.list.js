import { Room, RoomPagingParams } from '../../../data/room';
import roomService from '@/service/room.service';
import listMixin from '@/mixins/list.mixin';
import buildingMixin from '@/mixins/building.mixin';
import { BatchCreateRoomsParam, BatchDeleteRoomsParam } from '@/data/room';
import RoomInput from './input/room.input.vue';
import BatchDelete from './batch.delete/batch.delete.vue';
import BatchEdit from './batch.edit/batch.edit.vue';

export default {
    mixins: [listMixin, buildingMixin],
    components: { RoomInput, BatchDelete, BatchEdit },
    data() {
        return {
            /**
             * 选中楼栋的楼层数据
             */
            floorsInBuilding: null,
            /**
             * 选中楼层中的房间数据
             */
            roomsInFloor: null,
            /**
             * 是否展示批量新增
             */
            batchAddVisible: false,
            /**
             * 是否显示批量删除
             */
            batchDeleteVisible: false,
            /**
             * 是否显示批量修改
             */
            batchEditVisible: false,
            /**
             * 已选择房间id
             */
            selectedRoomIds: null,
            /**
             * 批量新增获批量删除的参数
             */
            batchAddOrDeleteParams: null,
            /**
             * 当前选中楼栋房间名
             */
            currentBuildingName: ''
        };
    },
    watch: {
        /**
         * 楼栋切换时，获取楼层
         */
        'conditions.buildingId': {
            handler: async function() {
                const { buildingId } = this.conditions;
                if (buildingId === undefined || buildingId === null) return;
                await this.getFloorsInBuilding(buildingId);
                this.conditions.floor = this.floorsInBuilding[0];
                this.paging();
            },
            deep: true
        }
    },
    methods: {
        /**
         * 初始化页面paging参数
         */
        initPagingParams: async function() {
            this.conditions = new RoomPagingParams();
            await this.getBuildings();
            this.conditions.buildingId = this.buildings[0].id;
            await this.getFloorsInBuilding(this.buildings[0].id);
            this.paging();
        },
        /**
         * 获取楼栋下的楼层数据
         * @param buildingId
         */
        getFloorsInBuilding(buildingId) {
            const floor = this.buildings.find(item => item.id === buildingId).floor;
            const floors = [];
            for (let i = 1; i <= floor; i++) {
                floors.push(i);
            }
            this.floorsInBuilding = floors;
        },
        /**
         * 选中楼层
         */
        selectFloor(floor) {
            this.conditions.floor = floor;
            this.paging();
        },
        /**
         * 选择房间
         */
        selectRooms(val) {
            this.selectedRoomIds = val.map(item => item.room.id);
        },
        /**
         * 打开会话框
         * @param dialogName
         */
        openDialog(dialogName) {
            switch (dialogName) {
                case 'batchEdit':
                    if (!this.selectedRoomIds || !this.selectedRoomIds) {
                        this.$message({
                            message: '请选择宿舍',
                            type: 'warning'
                        });
                        return;
                    }
                    this.batchEditVisible = true;
                    break;
                case 'batchAdd':
                    this.batchAddOrDeleteParams = new BatchCreateRoomsParam();
                    this.initAddOrDeleteProps();
                    this.batchDeleteVisible = true;
                    break;
                case 'batchDelete':
                    this.batchAddOrDeleteParams = new BatchDeleteRoomsParam();
                    this.initAddOrDeleteProps();
                    this.batchDeleteVisible = true;
                    break;
                default:
                    this.batchAddVisible = true;
            }
        },
        /**
         * 初始化批量新增或者批量修改prop
         */
        initAddOrDeleteProps() {
            this.batchAddOrDeleteParams.buildingId = this.conditions.buildingId;
            this.batchAddOrDeleteParams.nameLength = 3;
            this.batchAddOrDeleteParams.floors = [];
        },
        /**
         * 关闭会话框
         * @param dialogName 会话框名
         */
        closeDialog(dialogName) {
            switch (dialogName) {
                case 'batchEdit':
                    this.batchEditVisible = false;
                    break;
                case 'batchAdd':
                    this.batchAddVisible = false;
                    break;
                case 'batchDelete':
                    this.batchDeleteVisible = false;
                    break;
                default:
                    this.batchAddVisible = false;
            }
        },
        /**
         * 删除多选房间号
         */
        deleteSelectedRooms: async function() {
            try {
                if (!this.selectedRoomIds || !this.selectedRoomIds) {
                    this.$message({
                        message: '请选择宿舍',
                        type: 'warning'
                    });
                    return;
                }
                await this.$confirm('是否删除这些宿舍', {
                    showConfirmButton: true,
                    confirmButtonText: '是',
                    showCancelButton: true,
                    cancelButtonText: '否',
                    center: true
                });
                this.loading = true;
                await roomService.deleteRooms(this.selectedRoomIds);
                this.$message({
                    message: '删除宿舍成功',
                    type: 'success'
                });
                this.loading = false;
                this.paging();
            } catch (e) {
                console.log(e);
                this.loading = false;
            }
        },
        /**
         * 关闭会话框切重新加载
         * @param dialogName 会话框名
         */
        reloadDialog(dialogName) {
            this.closeDialog(dialogName);
            this.paging();
        },
        /**
         * 选择楼栋
         */
        selectBuilding(building) {
            this.currentBuildingName = building.name;
        }
    },
    created() {
        this.DataType = Room;
        this.service = roomService;
        this.initPagingParams();
    }
};
