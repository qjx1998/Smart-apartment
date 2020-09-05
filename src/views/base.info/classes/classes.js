import listMixin from '@/mixins/list.mixin';
import classesInput from './classes.input/classes.input.vue';
import { Clazz, ClazzPagingParams } from '@/data/clazz';
import clazzService from '@/service/clazz.service';
import { instituteService } from '@/service/institute.service';
import gradeService from '@/service/grade.service';
import collegeService from '@/service/college.service';

export default {
    name: 'Class',
    mixins: [listMixin],
    components: { classesInput },
    data() {
        return {
            /**
             * 获取所有班级
             */
            allClasses: [],
            /**
             * 获取学校所有院系
             */
            institutes: [],
            /**
             * 获取所有年级
             */
            allGrades: [],

            selectedCollege: null,

            selectedInstitute: null

        };
    },
    methods: {
        /**
         * 获取所有的年级
         * @returns {Promise<void>}
         */
        async getAllGrade() {
            this.allGrades = await gradeService.find();
        },
        /**
         * 给点击的院系更新信息
         */
        addClass(instituteId) {
            this.conditions.instituteId = instituteId;
        },
        /**
         * 获取所有学校，默认选中第一个学校,并且获取所有院系并默认选中第一个院系
         */
        async initCollege() {
            this.collegeLists = await collegeService.findAllCollege();
            if (this.collegeLists.length) {
                this.conditions.collegeId = this.collegeLists[0].id;
            }
        },
        /**
         * 打开输入会话框
         * @param current 当前需要编辑的对象
         */
        showInput(current) {
            this.editingObject = current ? Object.assign({}, current) : new this.DataType();
            if (current) {
                this.editingObject.collegeId = this.editingObject.college.id;
                this.editingObject.instituteId = this.editingObject.institute.id;
                this.$set(this.editingObject, 'gradeId', this.editingObject.grade.id);
                delete this.editingObject.college;
                delete this.editingObject.institute;
                this.inputVisible = true;
            } else if (this.conditions.instituteId) {
                this.inputVisible = true;
            } else {
                this.$message({
                    type: 'warning',
                    message: `选好班级院系之后才能新增`
                });
            }
        },
        /**
         * 让所属学校默认选中第一个
         */
        selectedColleges() {
            this.conditions.gradeId = '';
        }
    },
    watch: {
        /**
         * 当切换学校时,获取院系,和分页数据
         */
        'conditions.collegeId': {
            handler: async function() {
                this.conditions.instituteId = '';
                this.institutes = [];
                if (this.conditions.collegeId === '') return;
                this.selectedCollege = this.collegeLists.filter(item => item.id === this.conditions.collegeId)[0];
                this.institutes = await instituteService.findByCollegeId(this.conditions.collegeId);
                if (!this.institutes.length) return;
                this.conditions.instituteId = this.institutes[0].id;
            }
        },
        /**
         * 切换院系获取数据
         */
        'conditions.instituteId': {
            handler: async function() {
                this.pageData = [];
                if (this.conditions.instituteId === '') return;
                this.selectedInstitute = this.institutes.filter(item => item.id === this.conditions.instituteId)[0];
                this.pageData = await this.service.paging(this.conditions);
            }
        }
    },
    created() {
        this.DataType = Clazz;
        this.conditions = new ClazzPagingParams();
        this.service = clazzService;
        this.initCollege();
        this.getAllGrade();
        this.selectedColleges();
    }
};
