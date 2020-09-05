import { FormValidator } from '@/utils/validate';
import UserDef from '@/constants/user.def';
import commonDef from '@/constants/common.def';
import userService from '@/service/user.service';

export default {
    name: 'Input',
    data() {
        const validatePassword = (rule, value, callback) => {
            // 必须包含数字和字母
            const pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_~!@#$%^&*?]{8,16}$/;
            if (value && !pattern.test(value)) {
                return callback(new Error('密码必须包含数字和英文字母'));
            }
            if (this.editingObject.retypedPassword !== '') {
                this.$refs.form.validateField('retypedPassword');
            }
            callback();
        };
        const validateRetypedPassword = (rule, value, callback) => {
            if (value !== this.editingObject.password) {
                return callback(new Error('重复密码不一致'));
            }
            callback();
        };
        return {
            /**
             * 会话框模式：创建/更新
             */
            mode: typeof this.editingObject.id === 'undefined' ? 'create' : 'update',
            /**
             * 表单验证规则
             */
            formRules: {
                accountName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { validator: FormValidator.validateUserName, trigger: 'blur' }
                ],
                name: [
                    { max: 16, message: '中文名称的长度低于16' },
                    { required: true, message: '请输入中文名称', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 8, message: '密码不少于8位', trigger: 'blur' },
                    { validator: validatePassword, trigger: 'blur' }
                ],
                retypedPassword: [
                    { required: true, message: '请输入重复密码', trigger: 'blur' },
                    { validator: validateRetypedPassword, trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: FormValidator.validateEmail, trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入电话', trigger: 'blur' },
                    { validator: FormValidator.validatPhone, trigger: 'blur' }
                ]
            },
            /**
             * 用户类型
             */
            userTypes: UserDef.TYPE,
            /**
             * 用户状态
             */
            userStates: commonDef.OBJECT_STATUS,
            /**
             * 是否正在更新
             */
            loading: false
        };
    },
    computed: {
        /**
         * 标题
          */
        title() {
            return this.mode === 'create' ? '创建用户' : '更改用户';
        }
    },
    props: {
        // 用户信息
        editingObject: {
            type: Object,
            required: true
        }
    },
    methods: {
        // 关闭当前会话框
        close() {
            this.$emit('close');
        },
        // 重新加载
        reload() {
            this.$emit('reload');
        },
        // 确定创建或更新
        confirm() {
            this.$refs.form.validate(async valid => {
                if (!valid) {
                    return;
                }
                this.loading = true;
                // 删除为空的值
                Object.keys(this.editingObject).forEach(key => {
                    if (!this.editingObject[key]) {
                        delete this.editingObject[key];
                    }
                });
                // 删除重复密码
                delete this.editingObject.retypedPassword;

                if (this.mode === 'create') {
                    try {
                        await userService.create(this.editingObject);
                        this.$message({
                            message: '创建用户成功',
                            type: 'success'
                        });
                        this.loading = false;
                        this.reload();
                    } catch (e) {
                        this.loading = false;
                    }
                } else {
                    try {
                        await userService.update(this.editingObject);
                        this.$message({
                            message: '更新用户成功',
                            type: 'success'
                        });
                        this.loading = false;
                        this.reload();
                    } catch (e) {
                        this.loading = false;
                    }
                }
            });
        }
    },
    created() {
    }
};
