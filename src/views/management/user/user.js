import listMixin from '@/mixins/list.mixin';
import { User, UserPagingParams } from '@/data/user';
import userService from '@/service/user.service';
import UserDef from '@/constants/user.def';
import commonDef from '@/constants/common.def';
import userInput from './components/input/input.vue';

export default {
    name: 'User',
    components: { userInput },
    mixins: [listMixin],
    data() {
        return {
            /**
             * 是否显示新增/修改会话框，默认为false
             */
            inputDialogVisible: false,
            /**
             * 用户类型
             */
            userTypes: UserDef.TYPE,
            /**
             * 用户状态
             */
            userStates: commonDef.OBJECT_STATUS
        };
    },
    methods: {
        /**
         * 显示会话框
         */
        showInputDialog(editingObject) {
            if (editingObject) {
                this.editingObject = Object.assign({}, editingObject);
                delete this.editingObject.password;
            } else {
                this.editingObject = new this.DataType();
                this.editingObject.type = this.userTypes.GENERAL_USER;
                this.editingObject.state = this.userStates.IS_ACTIVE;
                this.$set(this.editingObject, 'retypedPassword', '');
            }
            this.inputDialogVisible = true;
        },
        /**
         * 关闭会话框
         */
        closeInputDialog() {
            this.inputDialogVisible = false;
        },
        /**
         * 关闭会话框，重新获取
         */
        reload() {
            this.closeInputDialog();
            this.paging();
        },
        /**
         * 重置密码
         */
        resetUserPassword: async function(user) {
            user.password = '123456';
            await this.service.update(user);
            this.paging();
            this.$message({
                message: '重置密码成功',
                type: 'success'
            });
        }
    },
    created() {
        this.DataType = User;
        this.conditions = new UserPagingParams();
        this.conditions.state = '';
        this.conditions.type = '';
        this.service = userService;
        this.paging();
    }
};
