import dialogListMixin from '@/mixins/dialog.list.mixin';
import { SubjectPagingParams, Subject } from '@/data/subject';
import subjectService from '@/service/subject.service';
import subjectTypeDef from '@/constants/subject.def';
import Remark from '@/components/Remark/remark.vue';
import ABNORMAL_DEF from '@/constants/abnormal.def';

export default {
    name: 'Dialog',
    components: { Remark },
    mixins: [dialogListMixin],
    data() {
        return {
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
    props: {
        subjectIds: {
            type: Array,
            required: true
        }
    },
    methods: {
        /**
         * 导出识别主体
         * @returns {Promise<void>}
         */
        exportSubjects: async function() {
            await subjectService.export(this.conditions);
        }
    },
    created() {
        this.DataType = Subject;
        this.conditions = new SubjectPagingParams();
        this.conditions.subjectIds = this.subjectIds;
        this.conditions.dangerType = ABNORMAL_DEF.DANGER_TYPES.NO_PRESENT;
        this.service = subjectService;
        this.paging();
    }
};
