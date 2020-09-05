import StringUtils from '@/utils/string.utils';
import collegeService from '@/service/college.service';
import CommonDef from '@/constants/common.def';
import SubjectDef from '@/constants/subject.def';
import { instituteService } from '@/service/institute.service';
import clazzService from '@/service/clazz.service';
import { departmentService } from '@/service/department.service';

export default {
    data() {
        return {
            /**
             * 所有的学校
             */
            colleges: [],
            /**
             * 学校下的院系
             */
            institutesInCollege: [],
            /**
             * 院系下的班级
             */
            classesInInstitute: [],
            /**
             * 院系下的部门
             */
            departmentsInInstitute: [],
            /**
             * 异常等级常数
             */
            DANGER_CODE: CommonDef.DANGER_CODE,
            /**
             * 主体性别常数
             */
            SUBJECT_GENDERS: SubjectDef.GENDER,
            /**
             * 主体类别
             */
            SUBJECT_TYPES: SubjectDef.TYPE
        };
    },
    computed: {
        /**
         * 是否禁用院系表单
         */
        instituteSelectorDisabled() {
            return StringUtils.isEmpty(this.conditions.collegeId);
        },
        /**
         * 是否禁用部门和班级表单
         */
        classOrDepartmentSelectorDisabled() {
            return StringUtils.isEmpty(this.conditions.instituteId);
        }
    },
    watch: {
        /**
         * 条件的学校变化时
         */
        'conditions.collegeId'(collegeId) {
            // 重置
            this.conditions.instituteId = '';
            this.institutesInCollege = [];
            this.getInstitutes();
        },
        /**
         * 条件中的院系发生变化时
         */
        'conditions.instituteId'(instituteId) {
            this.conditions.classId = '';
            this.conditions.departmentId = '';
            this.classesInInstitute = [];
            this.departmentsInInstitute = [];
            this.getClasses();
            this.getDepartments();
        }
    },
    methods: {
        /**
         * 获取所有的学校
         */
        async getColleges() {
            this.colleges = await collegeService.findAllCollege();
        },
        /**
         * 获取学校下的院系
         */
        async getInstitutes() {
            if (!this.conditions.collegeId) return;
            this.institutesInCollege = await instituteService.findByCollegeId(this.conditions.collegeId);
        },
        /**
         * 获取院系下的班级
         */
        async getClasses() {
            if (!this.conditions.instituteId) return;
            this.classesInInstitute = await clazzService.findByInstituteId(this.conditions.instituteId);
        },
        /**
         * 获取院系下的部门
         */
        async getDepartments() {
            if (!this.conditions.instituteId) return;
            this.departmentsInInstitute = await departmentService.findByInstituteId(this.conditions.instituteId);
        }
    }
};
