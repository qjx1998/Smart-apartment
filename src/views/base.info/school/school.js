import listMixin from '@/mixins/list.mixin';
import schoolInput from './school.input/school.input.vue';
import { College, CollegePagingParams } from '@/data/college';
import collegeService from '@/service/college.service';
import userService from '@/service/user.service';

export default {
    name: 'School',
    mixins: [listMixin],
    components: { schoolInput },
    data() {
        return {
            /**
             * 负责人列表
             */
            leads: []
        };
    },
    methods: {
        /**
         * 获取负责人
         * @returns {Promise<void>}
         */
        getLeader: async function() {
            this.leads = await this.userService.findAllUser();
        }
    },
    created() {
        this.DataType = College;
        this.conditions = new CollegePagingParams();
        this.service = collegeService;
        this.userService = userService;
        this.paging();
        this.getLeader();
    }
};
