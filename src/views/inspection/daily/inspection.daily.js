import inspectionService from '@/service/inspection.service';
import buildingMixin from '@/mixins/building.mixin';
import subjectTypeDef from '@/constants/subject.def';
import subjectService from '@/service/subject.service';
import roomService from '@/service/room.service';
import dialogTable from './dialog/dialog.vue';
import subjectDetailMixin from '@/components/subject.detail/subject.detail.mixin';
import SubjectDetail from '@/components/subject.detail/subject.detail.vue';

export default {
    name: 'InspectionDaily',
    components: {
        dialogTable,
        SubjectDetail
    },
    mixins: [buildingMixin, subjectDetailMixin],
    data() {
        return {
            /**
             * 当前选中的建筑物
             */
            currentBuildingId: null,
            /**
             * 查寝结果数据
             */
            inspectionResult: null,
            /**
             * 当前楼层数据
             */
            currentFloorView: null,
            /**
             * 未归人员列表对话框
             */
            noPresentSubjectDialogVisiable: false,
            /**
             * 当前不在寝室人员id列表
             */
            noPresentSubjectIds: [],
            /**
             * 用户是否在寝
             */
            isPresent: subjectTypeDef.IS_PRESENT,
            /**
             * 当前的用户信息
             */
            currentSubject: null,
            /**
             * 实时在寝人员数据详细会话框是否显示
             */
            subjectInfoVisible: false
        };
    },
    computed: {
        /**
         * 在寝率
         */
        presentRate() {
            if (!this.inspectionResult) {
                return 0;
            }
            const { presentTotal, subjectTotal } = this.inspectionResult.buildingView;
            if (subjectTotal === 0) { return 0; }
            const rate = (presentTotal / subjectTotal).toFixed(4);
            return (rate * 100).toFixed(2);
        },
        /**
         * 房间视图
         */
        roomViews() {
            if (!this.currentFloorView) {
                return [];
            }
            return this.currentFloorView.roomViews;
        }
    },
    methods: {
        /**
         * 初始化页面
         */
        initPage: async function() {
            // 获取建筑物列表
            await this.getBuildings();

            if (this.buildings.length === 0) {
                return;
            }

            // 如果有楼栋信息，初始化当前楼栋，并获取当前楼栋的查寝结果
            this.currentBuildingId = this.buildings[0].id;
            await this.getInspectionResult(this.currentBuildingId);

            // 将第一个楼层的数据设置为当前选中的数据
            const floorViews = this.inspectionResult.buildingView.floorViews;
            if (floorViews.length === 0) {
                return;
            }

            this.noPresentSubjectIds = this.getNoPresentSubjectIds(floorViews);

            this.currentFloorView = floorViews[0];
            this.selectFloor(this.currentFloorView);
        },
        /**
         * 获取查寝
         * @param buildingId
         */
        getInspectionResult: async function(buildingId) {
            const loading = this.$loading({
                target: '.statistics',
                text: '拼命加载中'
            });
            this.inspectionResult = await inspectionService.findByBuildingId(buildingId);
            loading.close();
        },
        /**
         * 选楼栋
         */
        selectBuilding: async function(buildingId) {
            await this.getInspectionResult(buildingId);
            // 将第一个楼层的数据设置为当前选中的数据
            const floorViews = this.inspectionResult.buildingView.floorViews;
            if (floorViews.length === 0) {
                this.currentFloorView = {};
                return;
            }
            this.currentFloorView = floorViews[0];
            this.noPresentSubjectIds = this.getNoPresentSubjectIds(floorViews);

            this.currentFloorView = floorViews[0];
            this.selectFloor(this.currentFloorView);
        },
        /**
         * 选楼层
         * @param floorView
         */
        selectFloor(floorView) {
            const floorViews = this.inspectionResult.buildingView.floorViews;

            // 先初始化全部楼层为未选中
            floorViews.forEach(floorView => {
                floorView.selected = false;
            });

            // 选中当前楼层
            this.currentFloorView = floorView;
            this.currentFloorView.selected = true;
        },
        /**
         * 获取房间剩余床位
         * @param roomView
         * @returns {number} 床位数量
         */
        getAvailableNum(roomView) {
            const availableNum = roomView.maxPlaces - roomView.subjectPresents.length;
            return availableNum >= 0 ? availableNum : 0;
        },
        /**
         * 关闭不在寝人员列表
         */
        closeDialog() {
            this.noPresentSubjectDialogVisiable = false;
        },
        /**
         * 开启不在寝人员列表
         */
        openDialog() {
            this.noPresentSubjectDialogVisiable = true;
        },
        /**
         * 拿到不在寝人员id列表
         */
        getNoPresentSubjectIds(floorViews) {
            const tmp1 = [];
            floorViews.forEach(fv => {
                fv.roomViews.forEach(rm => {
                    tmp1.push(rm);
                });
            });
            const tmp2 = [];
            tmp1.forEach(e => {
                e.subjectPresents.forEach(sp => {
                    tmp2.push(sp);
                });
            });
            return tmp2.filter(e => e.present === this.isPresent.NO)
                .map(e => e.id);
        },
        /**
         * 显示用户信息
         */
        chooseSubject: async function(id) {
            this.currentSubject = await subjectService.get(id);
            // 开启弹出框
            this.subjectInfoVisible = true;
        },
        /**
         * 展示人员
         * @param subject
         * @link Subject
         */
        async showSubjectDetail(subjectId) {
            this.showingSubject = await subjectService.get(subjectId);
            this.subjectDetailVisible = true;
        },
        /**
         * 获取建筑物中的房间
         *
         * @param buildingId 建筑物ID
         */
        getRooms: async function(buildingId) {
            try {
                const res = await roomService.findByBuildingId(buildingId);
                res.forEach(room => this.roomsInBuilding.push(room));
            } catch (e) {
                console.log(e);
            }
        },
        /**
         * 关闭人员信息会话框
         */
        closeSubjectInfoDialog() {
            this.subjectInfoVisible = false;
        }
    },
    created() {
        this.initPage();
    }
};
