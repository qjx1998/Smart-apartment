
import inputMixin from '@/mixins/input.mixin';
import { instituteService } from '@/service/institute.service';

export default {
    name: 'FacultyInput',
    mixins: [inputMixin],
    data() {
        return {
            formRules: {
                name: [{ required: true, max: 12, message: '请选择院系名称', trigger: 'blur' }],
                collegeId: [{ required: true, message: '请选择学校名称', trigger: 'blur' }]
            }
        };
    },
    props: {
        /**
         * 所属学校列表
         */
        collegeLists: {
            type: Array
        },
        /**
         * 负责人列表
         */
        leads: {
            type: Array
        },
        editingCollege: {
            type: String
        }
    },
    methods: {
    },
    computed: {
        title() {
            return this.editingObject.id != null ? '更新院系' : '新建院系';
        }
    },
    watch: {
        /**
         * 切换学校，默认选中全部
         */
        'editingObject.collegeId': {
            handler() {
                this.editingObject.leaderId = '';
            }
        }
    },
    created() {
        this.service = instituteService;
    }
};

