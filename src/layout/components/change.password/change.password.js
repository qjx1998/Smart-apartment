import userService from '@/service/user.service';
import { UpdatePasswordForm } from '@/data/user';

const changePassword = {
    data() {
        const validatePassword = (rule, value, callback) => {
            // 必须包含数字和字母
            const pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_~!@#$%^&*?]{8,16}$/;
            if (value && !pattern.test(value)) {
                return callback(new Error('密码必须包含数字和英文字母且长度不小于8'));
            }
            if (this.passwordData.retypedPassword !== '') {
                this.$refs.form.validateField('retypedPassword');
            }
            callback();
        };
        const validateRetypedPassword = (rule, value, callback) => {
            if (value !== this.passwordData.newPassword) {
                return callback(new Error('重复密码不一致'));
            }
            callback();
        };
        return {
            /**
             * 密码数据
             */
            passwordData: Object.assign(new UpdatePasswordForm(), { retypedPassword: null }),
            /**
             * 验证规则
             */
            rules: {
                oldPassword: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { validator: validatePassword, trigger: 'blur' }
                ],
                retypedPassword: [
                    { required: true, message: '请输入新重复密码', trigger: 'blur' },
                    { validator: validateRetypedPassword, trigger: 'blur' }
                ]
            },
            /**
             * 正在修改
             */
            loading: false
        };
    },
    computed: {
        userInfo() {
            return this.$store.getters.userInfo;
        }
    },
    methods: {
        /**
         * 关闭
         */
        close() {
            this.$store.commit('user/closeChangingPasswordDialog');
        },
        /**
         * 确定修改密码
         */
        confirm() {
            this.$refs.form.validate(async valid => {
                if (!valid) {
                    return;
                }
                this.loading = true;
                delete this.passwordData.retypedPassword;
                await userService.updatePassword(this.passwordData);
                this.loading = false;
                this.close();
                this.$message({
                    message: '修改密码成功',
                    type: 'success'
                });
                this.$store.dispatch('user/logout');
            });
        }
    }
};

export default changePassword;
