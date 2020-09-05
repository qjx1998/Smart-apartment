import listMixin from '@/mixins/list.mixin';
import { ContinuousInPagingParams } from '@/data/behavior.analysis/continuous.in';
import continuousInService from '@/service/behavior.analysis/continuous.in.service';
import buildingMixin from '@/mixins/building.mixin';
import conditionsMixin from '@/mixins/condition.mixin';
import subjectDetailMixin from '@/components/subject.detail/subject.detail.mixin';
import CommonUtils from '@/utils/common.utils';
import Remark from '@/components/Remark/remark.vue';
import SubjectDef from '@/constants/subject.def';
import SubjectDetail from '@/components/subject.detail/subject.detail.vue';

export default {
    name: 'ContinuousIn',
    components: { Remark, SubjectDetail },
    mixins: [listMixin, buildingMixin, conditionsMixin, subjectDetailMixin],
    data() {
        return {
            subjectTypes: SubjectDef.TYPE
        };
    },
    methods: {
        /**
         * 初始化参数，楼栋设置为全部，异常评级设置为全部
         */
        initPagingParams: async function() {
            this.conditions = new ContinuousInPagingParams();
            CommonUtils.formatConditions(this.conditions);
            this.conditions.subjectId = this.$route.params.subjectId;
        },
        /**
         * 重置表单
         */
        resetForm() {
            this.$refs['form'].resetFields();
            this.conditions.subjectId = undefined;
            this.paging();
        }
    },
    created() {
        this.service = continuousInService;
        this.initPagingParams();
        this.getBuildings();
        this.paging();
        this.getColleges();
    }
};
