
import inputMixin from '@/mixins/input.mixin';
import dangerRule from '@/constants/danger.rule.def';
import common from '@/constants/common.def';
import { dangerRuleService } from '@/service/danger.rule.service';
import { instituteService } from '@/service/institute.service';
import PushDate from '@/components/push.date/push.date.vue';
import pushDateParentMixin from '@/components/push.date/push.date.parent.mixin';
import warningMessage from '@/constants/warning.def';
import collegeService from '@/service/college.service';
import clazzService from '@/service/clazz.service';
import { departmentService } from '@/service/department.service';
import { DangerCondition } from '@/data/danger.rule';
import ArraysUtils from '@/utils/array.utils';
import StringUtils from '@/utils/string.utils';
import UserService from '@/service/user.service';

const { PUSH_DATE, DAYS_IN_WEEK } = warningMessage;
export default {
    name: 'RuleInput',
    components: { PushDate },
    mixins: [inputMixin, pushDateParentMixin],
    data() {
        return {
            /**
             * 验证规则
             */
            formRules: {
                'dangerRule.name': [
                    { required: true, message: '请选择规则名称', trigger: 'blur' },
                    {
                        validator: this.ruleValidator,
                        trigger: 'blur'
                    }
                ],
                'dangerRule.level': [{ required: true, message: '请选择级别', trigger: 'blur' }],
                'dangerRule.type': [{ required: true, message: '请选择规则种类', trigger: 'blur' }],
                'dangerRule.dangerType': [{ required: true, message: '请选择年级名称', trigger: 'blur' }],
                'dangerRule.domain': [{ required: true, message: '请选择规则关系', trigger: 'blur' }],
                'dangerRule.notifyType': [{ required: true, message: '请选择推送方式', trigger: 'blur' }],
                'dangerRule.created': [{ required: true, message: '请选择推送用户', trigger: 'blur' }],
                'dangerRule.conditionsOperator': [{ required: true, message: '请选择指标项', trigger: 'blur' }],
                'cronData': [
                    { required: true, message: '请选择推送周期', trigger: 'blur' },
                    { validator: this.validatorTime }
                ],
                'dangerRule.dataSource.collegeId': [{ required: true, message: '请选择学校', trigger: 'blur' }],
                'dangerRule.targetUserId': [{ required: true, message: '请选择推送用户', trigger: 'blur' }],
                'dangerRule.conditions[0].type': [{ required: true, message: '请选择指标项', trigger: 'blur' }],
                'dangerRule.conditions[1].type': [{ required: true, message: '请选择指标项', trigger: 'blur' }],
                'dangerRule.conditions[2].type': [{ required: true, message: '请选择指标项', trigger: 'blur' }]
            },
            /**
             *级别选项
             */
            levels: dangerRule.LEVEL,
            /**
             * 异常行为类型
             */
            categories: dangerRule.DANGER_TYPE,
            /**
             * 通用规则下数据来源和消息接收目标
             */
            relations: dangerRule.DOMAIN,
            /**
             *推送方式
             */
            pushStyles: dangerRule.NOTIFY_TYPE,
            /**
             * 指标项类型
             */
            ConditionTypes: dangerRule.CONDITION_TYPE,
            /**
             * 异常行为类型
             */
            catetype: dangerRule.DANGER_TYPE,
            /**
             * 具体指标项
             */
            contentConditions: [],
            /**
             * 指标条件类型
             */
            contentType: dangerRule.CONDITION_TYPE,
            /**
             * 指标项运算符
             */
            commonts: common.MATH_OPERATORS,
            /**
             * 所有用户
             */
            users: null,
            /**
             * 所有学校
             */
            schoolLists: null,
            /**
             * 根据学校获取院系
             */
            instituteLists: null,
            /**
             * 所有班级
             */
            classes: null,
            /**
             * 所有院系
             */
            departments: null,
            /**
             * 选部门或班级
             */
            selectMode: '0',
            /**
             * 指标项类型数组
             */
            conditionTypes: [],
            /**
             * 代替editingObject.dangerRule
             */
            dangerRules: null
        };
    },
    props: {
        pushTime: Object
    },
    methods: {
        /**
         * 所有系
         */
        async findAll() {
            this.users = await UserService.findAllUser();
        },
        /**
         * 验证规则是否重名
         * @returns {Promise<void>}
         */
        async ruleValidator(rule, val, callback) {
            const res = await this.service.nameExists(this.editingObject.dangerRule.id, val);
            if (res) {
                callback(new Error('验证规则重复输入！'));
            } else {
                callback();
            }
        },
        /**
         * 获取所有学校
         */
        async obtainCollegeLists() {
            this.schoolLists = await collegeService.findAllCollege();
        },
        /**
         * 添加指标项
         */
        addCondition() {
            // 判断指标项是否达到3个，如果达到三个，提示
            if (this.editingObject.dangerRule.conditions.length === 3) {
                this.$message({
                    message: '对不起,最多三条!',
                    type: 'warning'
                });
                return;
            }
            this.editingObject.dangerRule.conditions.push(new DangerCondition());
        },
        /**
         * 删除指标项
         * @param index 指标项index
         */
        deleteCondition(index) {
            this.editingObject.dangerRule.conditions.splice(index, 1);
        },
        /**
         * 获取规则类型对应的指标项类型选项
         */
        getConditionTypes() {
            switch (this.editingObject.dangerRule.dangerType) {
                case dangerRule.DANGER_TYPE.LATE_BACK:
                    this.conditionTypes = dangerRule.LATE_BACK_CONDITION_TYPE.list;
                    break;
                case dangerRule.DANGER_TYPE.NOT_BACK:
                    this.conditionTypes = dangerRule.YESTERDAY_OUT_CONDITION_TYPE.list;
                    break;
                case dangerRule.DANGER_TYPE.MUTI_NOT_BACK:
                case dangerRule.DANGER_TYPE.MUTI_NOT_OUT:
                    this.conditionTypes = dangerRule.MULTI_DAYS_OUT_OR_IN_CONDITION_TYPE.list;
                    break;
                case dangerRule.DANGER_TYPE.DEVICE_OFFLINE:
                    this.conditionTypes = dangerRule.DEVICE_OFFLINE_CONDITION_TYPE.list;
                    break;
                default:
                    return;
            }
        },
        /**
         * 提交表单
         */
        async submitForm() {
            const valid = await this.$refs.form.validate();
            if (!valid) return;
            Object.keys(this.editingObject).forEach((key) => {
                // 判断数据类型不为object，包含子类array
                if (typeof this.editingObject[key] !== 'object' && StringUtils.isEmpty(this.editingObject[key])) {
                    this.editingObject[key] = '';
                }
            });
            // 新建
            if (this.editingObject.dangerRule.id === undefined) {
                this.createEntity();
            } else { // 更新
                this.updateEntity();
            }
        },
        /**
         * 新建实例
         */
        async createEntity() {
            try {
                this.loading = true;
                /**
                 * 选中自定义规则删除通用规则
                 * 选中通用规则删除自定义规则
                 */
                if (this.editingObject.dangerRule.type === 1) {
                    delete this.editingObject.dangerRule.dataSource;
                } if (this.editingObject.dangerRule.type === 2) {
                    delete this.editingObject.dangerRule.domain;
                }
                await this.service.create(this.editingObject);
                this.loading = false;
                this.reload();
                this.$message({
                    message: '创建成功',
                    type: 'success'
                });
            } catch (e) {
                this.loading = false;
            }
        },
        /**
         * 更新实例
         */
        async updateEntity() {
            try {
                this.loading = true;
                if (this.editingObject.dangerRule.type === 1) {
                    delete this.editingObject.dangerRule.dataSource;
                } if (this.editingObject.dangerRule.type === 2) {
                    delete this.editingObject.dangerRule.domain;
                }
                await this.service.update(this.editingObject);
                this.loading = false;
                this.reload();
                this.$message({
                    message: '更新成功',
                    type: 'success'
                });
            } catch (e) {
                this.loading = false;
            }
        },
        /**
         * 根据学校获取院系
         * 根据院系获取班级
         * 根据院系获取部门
         */
        async getDomain() {
            if (this.editingObject.dangerRule.dataSource.collegeId) {
                this.instituteLists = await instituteService.findByCollegeId(this.editingObject.dangerRule.dataSource.collegeId);
                if (this.editingObject.dangerRule.dataSource.instituteId) {
                    this.classes = await clazzService.findByInstituteId(this.editingObject.dangerRule.dataSource.instituteId);
                    this.departments = await departmentService.findByInstituteId(this.editingObject.dangerRule.dataSource.instituteId);
                }
            }
        },
        validatorTime(rule, value, callback) {
            if (value.cycleType !== 1 && value.cycleValue.length === 0) {
                callback(Error('请选时间'));
            } else {
                callback();
            }
        }
    },
    watch: {
        'editingObject.dangerRule.dangerType'() {
            const { conditions } = this.editingObject.dangerRule;
            conditions.splice(0, conditions.length, new DangerCondition());
            this.getConditionTypes();
        },
        'editingObject.dangerRule.dataSource.collegeId': {
            async handler() {
                /**
                 * 根据学校获取院系
                 */
                this.instituteLists = await instituteService.findByCollegeId(this.editingObject.dangerRule.dataSource.collegeId);
            }
        },
        'editingObject.dangerRule.dataSource.instituteId': {
            async handler() {
                /**
                 * 根据院系获取班级
                 * 根据院系获取部门
                 */
                this.classes = await clazzService.findByInstituteId(this.editingObject.dangerRule.dataSource.instituteId);
                this.departments = await departmentService.findByInstituteId(this.editingObject.dangerRule.dataSource.instituteId);
            }
        },
        'this.editingObject.cronData'() {
            this.$refs.forms.validateField('cronData');
        }
    },
    computed: {
        /**
         * 选中的规则关系
         */
        relationName() {
            return this.editingObject.dangerRule.domain.map(res => this.relations.list.filter(item => item.code === res)[0].name).join('、');
        },
        title() {
            return this.editingObject.dangerRule.id === undefined ? '新建规则' : '更新规则';
        },
        /**
         * 短信推送晚归未归
         */
        inputLater() {
            return `[告警级别]您好,${this.dangerRules.createdDate ? this.dangerRules.createdDate.slice(0, 10) : '2019-11-14'}(前一日)xxx（学校）xxxx（院系）xxxx(班级/单位)${this.catetype[this.dangerRules.dangerType]}人员${this.dangerRules.conditions[0] ? 'xxx' : this.dangerRules.conditions[0].num}人，详情请进入系统查询。`;
        },
        /**
         * 短信推送多日未归,多日未出
         */
        inputLongLater() {
            return `[告警级别]您好，${this.dangerRules.createdDate ? this.dangerRules.createdDate.slice(0, 10) : '2019-11-14'}(前一日)xxxx（学校）xxxx（院系）xxxx（班级/单位）${this.catetype[this.dangerRules.dangerType]}人员${this.dangerRules.conditions[0] ? 'xxx' : this.dangerRules.conditions[0].num}人，其中x天以上人员（指标项中设置）xx人，详情请进入系统查询。`;
        },
        /**
         * 推送周期描述
         */
        cronDesc() {
            const { cronData } = this.editingObject;
            const { cycleType, cycleValue } = cronData;
            let cycleDays = [];
            switch (cycleType) {
                case PUSH_DATE.DAY:
                    return `每日`;
                case PUSH_DATE.WEEK:
                    cycleDays = cycleValue.map(item => DAYS_IN_WEEK[item]);
                    return `每周${cycleDays.join('、')}`;
                case PUSH_DATE.MONTH:
                    cycleDays = cycleValue.map(item => item + '号');
                    return `每月${cycleDays.join('、')}`;
                default:
                    if (this.editingObject.dangerRule.id === undefined) {
                        return '';
                    }
            }
        },
        /**
         * 指标项数量数组
         */
        conditionsLengthArr() {
            return ArraysUtils.formNumberLengthArr(this.editingObject.dangerRule.conditions.length);
        }
    },
    created() {
        this.service = dangerRuleService;
        this.getConditionTypes();
        this.findAll();
        this.obtainCollegeLists();
        this.getDomain();
        this.dangerRules = this.editingObject.dangerRule;
    }
};

