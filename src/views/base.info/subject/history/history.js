import dialogListMixin from '@/mixins/dialog.list.mixin';
import { HistoryPageParams, HistoryRecord } from '@/data/historyrecord';
import historyService from '@/service/historyrecord.service';
import subjectTypeDef from '@/constants/subject.def';

export default {
    name: 'History',
    mixins: [dialogListMixin],
    data() {
        return {
            /**
             * 图片地址
             */
            baseImageUrl: process.env.VUE_APP_OSS_BASE_URL,
            /**
             * 用户类别
             */
            subjectTypes: subjectTypeDef.TYPE.list
        };
    },
    props: {
        /**
         * 用户id
         */
        subjectId: {
            type: Number
        }
    },
    methods: {
        /**
         * 根据用户的类别code获取用户类别名
         * @param id subject的type id
         */
        getSubjectType(id) {
            return this.subjectTypes.filter(item => item.code === id)[0].name;
        }
    },
    created() {
        this.DataType = HistoryRecord;
        this.conditions = new HistoryPageParams();
        this.conditions.subjectId = this.subjectId;
        this.service = historyService;
        this.paging();
    }
};
