import Remark from '@/components/Remark/remark.vue';
import listMixin from '@/mixins/list.mixin';
import { ContinuousOutPagingParams } from '@/data/behavior.analysis/continuous.out';
import continuousOutService from '@/service/behavior.analysis/continuous.out.service';
import buildingMixin from '@/mixins/building.mixin';
import conditionMixin from '@/mixins/condition.mixin';
import CommonUtils from '@/utils/common.utils';
import SubjectDef from '@/constants/subject.def';
import subjectDetailMixin from '@/components/subject.detail/subject.detail.mixin';
import SubjectDetail from '@/components/subject.detail/subject.detail.vue';

export default {
    name: 'ContinuousOut',
    components: { Remark, SubjectDetail },
    mixins: [listMixin, buildingMixin, conditionMixin, subjectDetailMixin],
    data() {
        return {
            /**
             * 识别主体类型
             */
            subjectTypes: SubjectDef.TYPE
        };
    },
    created() {
        this.service = continuousOutService;
        this.initPagingParams();
        this.getBuildings();
        this.paging();
        this.getColleges();
    },
    methods: {
        /**
         * 初始化参数，楼栋设置为全部，异常评级设置为全部
         */
        initPagingParams: async function() {
            this.conditions = new ContinuousOutPagingParams();
            CommonUtils.formatConditions(this.conditions);
        },
        /**
         * 重置表单
         */
        resetForm() {
            this.$refs['form'].resetFields();
            this.conditions.subjectId = undefined;
            this.paging();
        }
    }
};

