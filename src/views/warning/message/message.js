import listMixin from '@/mixins/list.mixin';
import userService from '@/service/user.service';
import { dangerMessageService } from '@/service/danger.message.service';
import { DangerMessage, DangerMessagePagingParams } from '@/data/danger.message';
import warningMessage from '@/constants/warning.def';
import { dangerRuleService } from '@/service/danger.rule.service';
import CommonUtils from '@/utils/common.utils';

export default {
    name: 'Message',
    mixins: [listMixin],
    data() {
        return {
            /**
             * 异常行为类型
             */
            categories: warningMessage.DANGER_TYPES,
            /**
             *级别选项
             */
            levels: warningMessage.LEVEL,
            /**
             *推送状态
             */
            pushes: warningMessage.PUSH_STATES,
            /**
             *推送日期
             */
            dates: warningMessage.PUSH_DATE,
            /**
             * 推送状态
             */
            pushState: warningMessage.PUSH_STATES,
            /**
             * 推送用户
             */
            pushUsers: {},
            /**
             * 告警规则
             */
            rules: ''
        };
    },
    methods: {
        /**
         * 获取推送用户
         * @returns {Promise<void>}
         */
        async getUser() {
            this.pushUsers = await userService.findAllUser();
        },
        /**
         * 获取告警规则
         */
        async getRule() {
            this.rules = await dangerRuleService.findAll();
        },
        /**
         * 检索条件默认选中全部
         */
        selectedAll() {
            CommonUtils.formatConditions(this.conditions);
        },
        /**
         *重新推送
         */
        async rePush(id) {
            try {
                await this.$confirm(`确认推送信息？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                });
                try {
                    await this.service.rePush(id);
                } catch (e) {
                    console.log(e);
                }
            } catch (e) {
                console.log(e);
            }
        }
    },
    created() {
        this.DataType = DangerMessage;
        this.conditions = new DangerMessagePagingParams();
        this.service = dangerMessageService;
        this.paging();
        this.getUser();
        this.getRule();
        this.selectedAll();
    }
};
