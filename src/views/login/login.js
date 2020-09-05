import { validUsername } from '../../utils/validate';

export default {
    name: 'Login',
    data() {
        return {
            /**
             * 登录表单数据
             */
            loginForm: {
                username: '',
                password: ''
            },
            /**
             * 登录数据验证规则
             */
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: this.validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: this.validatePassword }]
            },
            /**
             * 是否正在登录
             */
            loading: false,
            passwordType: 'password',
            redirect: undefined,
            /**
             * 提示信息
             */
            msg: null,
            /**
             * 登录密码是否被记住
             */
            isPasswdRemed: true,
            /**
             * 版本号
             */
            appVersion: process.env.VUE_APP_VERSION
        };
    },
    watch: {
        $route: {
            handler(route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true
        }
    },
    methods: {
        /**
         * 显示密码
         */
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = '';
            } else {
                this.passwordType = 'password';
            }
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        },
        /**
         * 处理登录操作
         */
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    const loginPayload = {
                        userInfo: this.loginForm,
                        isPasswdRemed: this.isPasswdRemed
                    };
                    this.$store.dispatch('user/login', loginPayload)
                        .then(() => {
                            const path = this.redirect ? this.redirect : '/';
                            this.$router.push({ path });
                            this.loading = false;
                        })
                        .catch(err => {
                            this.msg = err;
                            this.loading = false;
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        /**
         * 验证用户名
         */
        validateUsername(rule, value, callback) {
            if (!validUsername(value)) {
                callback(new Error('Please enter the correct user name'));
            } else {
                callback();
            }
        },
        /**
         * 验证密码
         */
        validatePassword(rule, value, callback) {
            if (value.length < 6) {
                callback(new Error('The password can not be less than 6 digits'));
            } else {
                callback();
            }
        }
    }
};
