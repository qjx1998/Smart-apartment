
import inputMixin from '@/mixins/input.mixin';
import clazzService from '@/service/clazz.service';
import userService from '@/service/user.service';

export default {
    name: 'ClassInput',
    mixins: [inputMixin],
    data() {
        return {
            formRules: {
                name: [
                    { required: true, max: 12, message: '请选择班级名称', trigger: 'blur' },
                    {
                        validator: this.classValidator,
                        trigger: 'blur'
                    }
                ],
                collegeId: [{ required: true, message: '请选择学校名称', trigger: 'blur' }],
                instituteId: [{ required: true, message: '请选择院系名称', trigger: 'blur' }],
                gradeId: [{ required: true, message: '请选择年级名称', trigger: 'blur' }]
            },
            allUsers: [],
            aboutInstitutes: []
        };
    },
    props: {
        /**
         * 获取学校列表
         */
        collegeLists: {
            type: Array
        },
        /**
         * 获取班级列表
         */
        institutes: {
            type: Array
        },
        /**
         * 获取年级列表
         */
        allGrades: {
            type: Array
        },
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
        },
        /**
         * 验证班级是否重名
         * @returns {Promise<void>}
         */
        async classValidator(rule, val, callback) {
            const res = await this.service.nameExists(this.editingObject.collegeId, this.editingObject.instituteId, val);
            if (res && this.editingObject.id === '新建班级') {
                callback(new Error('班级重复输入！'));
            } else {
                callback();
            }
        }
    },
    computed: {
        title() {
            return this.editingObject.id != null ? '更新班级' : '新建班级';
        }
    },
    created() {
        this.service = clazzService;
        this.getAllUser();
        this.getMessage();
        /**
         * 删除多余传参项
         */
        delete this.editingObject.grade;
    }
};

