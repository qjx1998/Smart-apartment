import historyStatic from './history.statics/history.static.vue';
import Remark from '@/components/Remark/remark.vue';
import listMixin from '@/mixins/list.mixin';
import buildingMixin from '@/mixins/building.mixin';
import conditionMixin from '@/mixins/condition.mixin';
import commonDef from '@/constants/common.def';
import subjectTypeDef from '@/constants/subject.def';
import { SuspectionPagingParams } from '@/data/inspection';
import inspectionService from '@/service/inspection.service';
import roomService from '@/service/room.service';
import TimeUtils from '@/utils/time.utils';
import subjectDetailMixin from '@/components/subject.detail/subject.detail.mixin';
import SubjectDetail from '@/components/subject.detail/subject.detail.vue';

export default {
    name: 'InspectionHistory',
    components: { historyStatic, Remark, SubjectDetail },
    mixins: [listMixin, buildingMixin, conditionMixin, subjectDetailMixin],
    data() {
        return {
            /**
             * 表单数据验证规则
             */
            formRules: {
                buildingId: [
                    { required: true, message: '请选择楼栋', trigger: 'blur' }
                ],
                beginDate: [
                    { required: true, message: '请选择开始时间', trigger: 'blur' }
                ],
                endDate: [
                    { required: true, message: '请选择结束时间', trigger: 'blur' }
                ]
            },
            /**
             * 数学运算符
             */
            MATH_OPERATORS: commonDef.MATH_OPERATORS.list,
            /**
             * 当前建筑里的房间
             */
            roomsInBuilding: [],
            /**
             * 选中的识别主体
             */
            selectedSubject: null,
            /**
             * 是否显示个人历史记录
             */
            showHistoryStatic: false,
            /**
             * 日期选项
             */
            dateOption: 'lastWeek',
            /**
             * 用户类别
             */
            subjectTypes: subjectTypeDef.TYPE,
            /**
             * 用戶性別
             */
            subjectGenders: subjectTypeDef.GENDER
        };
    },
    methods: {

        /**
         * 导出历史在寝天数
         */
        exportInspections: async function() {
            await inspectionService.export(this.conditions);
        },
        /**
         * 初始化页面
         */
        initPage: async function() {
            await this.getBuildings();
            if (this.buildings.length === 0) {
                return;
            }
            // 如果有楼栋信息，初始化当前楼栋，并获取当前楼栋的查寝结果
            this.conditions.buildingId = this.buildings[0].id;
            await this.getRooms(this.conditions.buildingId);
            this.search();
        },
        /**
         *  根据条件搜索
         */
        search() {
            this.$refs.form.validate((valid) => {
                if (!valid) {
                    return;
                }

                this.conditions.page = 1;
                this.paging();
            });
        },
        /**
         * 设置开始时间默认值
         */
        setStartTime() {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth();
            this.conditions.beginDate = TimeUtils.formatDateToParam(new Date(year, month, 1));
        },
        /**
         * 开启查看个人历史记录对话框
         */
        openHistoryStatic(subject) {
            this.selectedSubject = subject;
            this.showHistoryStatic = true;
        },
        /**
         * 关闭查看个人历史记录对话框
         */
        closeHistoryStatic() {
            this.showHistoryStatic = false;
        },
        /**
         * 设置时间默认选项
         */
        setTime(type) {
            switch (type) {
                case 'lastWeek':
                    this.conditions.beginDate = TimeUtils.getLastWeek().beginDate;
                    this.conditions.endDate = TimeUtils.getLastWeek().endDate;
                    break;
                case 'thisWeek':
                    this.conditions.beginDate = TimeUtils.getThisWeek().beginDate;
                    this.conditions.endDate = TimeUtils.getThisWeek().endDate;
                    break;
                default:
                    this.conditions.beginDate = TimeUtils.getThisMonth().beginDate;
                    this.conditions.endDate = TimeUtils.getThisMonth().endDate;
            }
        },
        /**
         * 重置搜索条件
         */
        resetConditions() {
            this.conditions = new SuspectionPagingParams();
            this.setStartTime();
            this.conditions.buildingId = this.buildings[0].id;
            this.getRooms(this.conditions.buildingId);
            this.roomsInBuilding.splice(0, this.roomsInBuilding.length);
            this.pageData = null;
        },
        /**
         * 获取建筑物中的房间
         *
         * @param buildingId 建筑物ID
         */
        async getRooms(buildingId) {
            const res = await roomService.findByBuildingId(buildingId);
            res.forEach(room => this.roomsInBuilding.push(room));
        },
        /**
         * 更改条件中的楼栋时，获取楼栋中的房间
         */
        onBuildingChanged() {
            if (!this.conditions.buildingId) {
                return;
            }
            this.roomsInBuilding.splice(0, this.roomsInBuilding.length);
            this.getRooms(this.conditions.buildingId);
        },
        /**
         * 初始化paging参数
         */
        initPagingParams() {
            this.conditions = new SuspectionPagingParams();
            this.conditions.roomId = '';
            this.conditions.collegeId = '';
        },
        /**
         * 确认导出
         */
        async confirmExportInspections() {
            try {
                await this.$confirm('确认导出在寝天数统计表格？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                });
                this.exportInspections();
            } catch (e) {
                this.$message('已取消导出');
            }
        }
    },
    computed: {
        /**
         * 详细信息弹出框props
         */
        staticConditions() {
            const { beginDate, endDate } = this.conditions;
            return {
                beginDate,
                endDate,
                subjectId: this.selectedSubject.id,
                page: 1
            };
        }
    },
    created() {
        this.service = inspectionService;
        this.initPagingParams();
        this.setTime('lastWeek');
        this.initPage();
        this.getColleges();
    },
    mounted() {
    }
};
