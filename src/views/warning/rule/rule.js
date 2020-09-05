import listMixin from '@/mixins/list.mixin';
import ruleInput from './rule.input/rule.input.vue';
import { DangerCondition, DangerRuleView, DangerRulePagingParams, DangerRule, CronData, CustomerSourceInfo } from '@/data/danger.rule';
import { dangerRuleService } from '@/service/danger.rule.service';
import dangerRule from '@/constants/danger.rule.def';

export default {
    name: 'Rule',
    mixins: [listMixin],
    components: { ruleInput },

    data() {
        return {
            /**
             *级别选项
             */
            levels: dangerRule.LEVEL,
            /**
             *规则状态
             */
            pushes: dangerRule.STATE,
            /**
             * 异常行为类型
             */
            categories: dangerRule.DANGER_TYPE,
            /**
             * 推送时间
             */
            pushTime: null,
            /**
             * 对应的推送周期
             */
            Cron: ''
        };
    },
    methods: {
        /**
         * 更新规则状态
         */
        async updateState(current) {
            try {
                await this.$confirm(`确认启用或禁用？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                });
                try {
                    await this.service.updateState();
                    this.paging();
                } catch (e) {
                    console.log(e.message);
                }
            } catch (e) {
                console.log(e.message);
            }
        },
        /**
         * 默认选中全部
         */
        selectedAll() {
            this.conditions.level = '';
            this.conditions.state = '';
            this.conditions.dangerType = '';
        },
        /**
         * 打开输入会话框
         * @param current 当前需要编辑的对象
         */
        showInput(current) {
            if (current) {
                const cronDatas = { ...current.cronData };
                const dangerRules = { ...current.dangerRule };
                this.editingObject = new this.DataType(DangerRule, CronData);
                this.editingObject.dangerRule = dangerRules;
                this.editingObject.cronData = cronDatas;
                if (this.editingObject.dangerRule.type === 2) {
                    this.editingObject.dangerRule.domain = [];
                }
            } else {
                const dangerCondition = [];
                const dangerRule = new DangerRule();
                const cronData = new CronData();
                cronData.cycleValue = [];
                dangerRule.domain = [];
                dangerRule.targetUserId = [];
                dangerRule.createdDate = '';
                dangerRule.dataSource = new CustomerSourceInfo();
                dangerCondition.push(new DangerCondition());
                dangerRule.conditions = dangerCondition;
                this.editingObject = new this.DataType(dangerRule, cronData);
            }
            this.inputVisible = true;
        },
        /**
         * 更改规则状态
         */
        async updateRule(id, state) {
            let mode = '';
            mode = state === this.pushes.NORMAL ? '禁用' : '启用';
            state = state === this.pushes.DISABLED ? this.pushes.NORMAL : this.pushes.DISABLED;
            try {
                await this.$confirm(`确认${mode}规则？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                });
                try {
                    await this.service.updateState({ 'id': id, 'state': state });
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                    this.paging();
                } catch (e) {
                    this.$message({
                        message: '操作失败！',
                        type: 'warning'
                    });
                    console.log(e);
                }
            } catch (e) {
                console.log(e);
            }
        }
    },
    created() {
        this.DataType = DangerRuleView;
        this.conditions = new DangerRulePagingParams();
        this.service = dangerRuleService;
        this.paging();
        this.selectedAll();
    }
};
