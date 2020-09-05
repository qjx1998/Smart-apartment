
import inputMixin from '@/mixins/input.mixin';
import collegeService from '@/service/college.service';
import { FormValidator } from '@/utils/validate';

export default {
    name: 'SchoolInput',
    mixins: [inputMixin],
    data() {
        return {
            formRules: {
                name: [
                    { required: true, message: '请输入学校名称', trigger: 'blur' },
                    {
                        id: this.editingObject.id,
                        validator: FormValidator.validateSchoolExists,
                        trigger: 'blur'
                    }
                ],
                leaderId: [{ required: true, message: '请选择负责人', trigger: 'blur' }]
            }
        };
    },
    props: {
        /**
         * 负责人列表
         */
        leads: {
            type: Array
        }
    },
    methods: {
    },
    computed: {
        /**
         *
         * @returns {string}
         */
        title() {
            return this.editingObject.id != null ? '编辑学校' : '新建学校';
        }
    },
    created() {
        this.service = collegeService;
    }
};
