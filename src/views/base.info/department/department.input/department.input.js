
import inputMixin from '@/mixins/input.mixin';
import userService from '@/service/user.service';
import { departmentService } from '@/service/department.service';

export default {
    name: 'DepartmentInput',
    mixins: [inputMixin],
    data() {
        return {
            formRules: {
                name: [
                    { required: true, message: '请选择班级名称', trigger: 'blur' },
                    { max: 12, message: '字数过多', trigger: 'blur' }
                ],
                collegeId: [{ required: true, message: '请选择学校名称', trigger: 'blur' }],
                instituteId: [{ required: true, message: '请选择院系名称', trigger: 'blur' }],
                gradeId: [{ required: true, message: '请选择年级名称', trigger: 'blur' }],
                remark: [{ max: 100, message: '字数过多', trigger: 'blur' }]
            },
            allUsers: []
        };
    },
    props: {
        /**
         * 获取已经选择的学校信息
         */
        selectedCollege: {
            type: Object
        },
        /**
         * 获取已经选择的学校的班级信息
         */
        selectedInstitute: {
            type: Object
        }
    },
    methods: {
        /**
         * 获取所有用户
         * @returns {Promise<void>}
         */
        async getAllUser() {
            this.allUsers = await userService.findAllUser();
        },
        /**
         * 将要传给后台的collegeId和instituteId进行绑定
         */
        getMessage() {
            this.editingObject.collegeId = this.selectedCollege.id;
            this.editingObject.instituteId = this.selectedInstitute.id;
        }
    },
    computed: {
        title() {
            return this.editingObject.id != null ? '更新部门' : '新建部门';
        }
    },
    created() {
        this.service = departmentService;
        this.getMessage();
        this.getAllUser();
    }
};

