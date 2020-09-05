import Remark from '@/components/Remark/remark.vue';
import listMixin from '@/mixins/list.mixin';
import { LateReturnPagingParams } from '@/data/behavior.analysis/late.return';
import lateReturnService from '@/service/behavior.analysis/late.return.service';
import buildingMixin from '@/mixins/building.mixin';
import { DateUtils } from '@/utils/time.utils';
import roomService from '@/service/room.service';
import CommonDef from '@/constants/common.def';
import LateHistory from './late.history/late.history.vue';
import CommonUtils from '@/utils/common.utils';
import conditionMixin from '@/mixins/condition.mixin';
import StringUtils from '@/utils/string.utils';
import SubjectDef from '@/constants/subject.def';
import subjectDetailMixin from '@/components/subject.detail/subject.detail.mixin';
import SubjectDetail from '@/components/subject.detail/subject.detail.vue';

export default {
    name: 'LateReturnVue',
    components: { LateHistory, Remark, SubjectDetail },
    mixins: [listMixin, buildingMixin, conditionMixin, subjectDetailMixin],
    data() {
        return {
            /**
             * 识别主体类型
             */
            subjectTypes: SubjectDef.TYPE,
            /**
             * 晚归历史是否显示
             */
            lateHistoryVisible: false,
            /**
             * 当前晚归历史的人员
             */
            currentSubject: null,
            /**
             * 晚归历史的参数
             */
            historyConditions: null,
            /**
             * 楼栋里的房间
             */
            roomsInBuilding: [],
            /**
             * 未分配宿舍
             */
            un_Distributed_Room: CommonDef.UN_DISTRIBUTED_ROOM
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
    watch: {
        /**
         * 条件中的楼栋变化时，获取相应的宿舍
         * @param buildingId
         */
        'conditions.buildingId'(buildingId) {
            // 重置
            this.conditions.roomId = '';
            this.roomsInBuilding = [];
            this.getRooms();
        }
    },
    created() {
        this.initPagingParams();
        this.service = lateReturnService;
        this.paging();
        this.getBuildings();
        this.getColleges();
    },
    methods: {
        /**
         * 初始化参数，楼栋为全部，房间为全部，起始时间为昨天，终止时间为今天
         */
        initPagingParams() {
            this.conditions = new LateReturnPagingParams();
            CommonUtils.formatConditions(this.conditions);
            this.conditions.beginDate = DateUtils.getLastDayDate();
            this.conditions.endDate = DateUtils.getLastDayDate();
        },
        /**
         * 打开晚归历史会话框
         */
        openLateHistory(subject) {
            const { beginDate, endDate } = this.conditions;
            const { id } = subject;
            this.historyConditions = {
                subjectId: id,
                beginDate,
                endDate
            };
            this.currentSubject = subject;
            this.lateHistoryVisible = true;
        },
        /**
         * 关闭晚归历史会话框
         */
        closeLateHistory() {
            this.historyConditions = null;
            this.lateHistoryVisible = false;
        },
        /**
         * 获取建筑物中的房间
         */
        async getRooms() {
            if (!this.conditions.buildingId) return;
            this.roomsInBuilding = await roomService.findByBuildingId(this.conditions.buildingId);
        }
    }
};
