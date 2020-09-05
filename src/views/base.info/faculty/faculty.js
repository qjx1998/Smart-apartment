import listMixin from '@/mixins/list.mixin';
import facultyInput from './faculty.input/faculty.input.vue';
import { instituteService } from '@/service/institute.service';
import userService from '@/service/user.service';
import { Institute, InstitutePagingParams } from '@/data/institute';

export default {
    name: 'Faculty',
    mixins: [listMixin],
    components: { facultyInput },
    data() {
        return {
            /**
             * 学校列表
             */
            collegeLists: [],
            /**
             * 负责人列表
             */
            leads: [],
            editingCollege: ''
        };
    },
    methods: {
        /**
         * 获取负责人
         * @returns {Promise<void>}
         */
        getLeader: async function() {
            this.leads = await userService.findAllUser();
        },
        /**
         * 让所属学校默认选中第一个
         */
        selectedColleges() {
            this.conditions.collegeId = '';
        },
        /**
         * 关闭输入会话框
         * @param current 当前需要编辑的对象
         * @link DepartmentForm
         */
        showInput(current) {
            this.editingObject = current ? Object.assign({}, current) : new this.DataType();
            if (current) {
                this.$set(this.editingObject, 'collegeId', this.editingObject.college.id);
                delete this.editingObject.college;
            }
            this.inputVisible = true;
        }
    },
    created() {
        this.DataType = Institute;
        this.conditions = new InstitutePagingParams();
        this.service = instituteService;
        this.paging();
        this.getCollegeLists();
        this.getLeader();
        this.selectedColleges();
    }
};
