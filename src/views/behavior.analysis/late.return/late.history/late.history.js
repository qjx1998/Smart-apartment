import listMixin from '@/mixins/list.mixin';
import { lateHistoryService } from '@/service/behavior.analysis/late.return.service';
import { LateHistoryPagingParams } from '@/data/behavior.analysis/late.return';

export default {
    name: 'LateHistory',
    mixins: [listMixin],
    props: {
        /**
         * 历史记录查询条件
         * 包含属性，subjectId，beginDate, endDate
         */
        historyConditions: {
            required: true,
            type: Object
        },
        /**
         * 人员姓名
         */
        subjectName: {
            type: String,
            required: true
        }
    },
    data() {
        return {

        };
    },
    created() {
        this.initPagingParams();
        this.service = lateHistoryService;
        this.paging();
    },
    methods: {
        /**
         * 通知父组件关闭该组件
         */
        close() {
            this.$emit('close');
        },
        /**
         * 初始化参数
         */
        initPagingParams() {
            this.conditions = new LateHistoryPagingParams();
            this.conditions = Object.assign(this.conditions, this.historyConditions);
        }
    }
};
