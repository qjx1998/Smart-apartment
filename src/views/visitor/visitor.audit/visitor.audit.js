import listMixin from '@/mixins/list.mixin';
import { VisitorApplyRecordPagingParams } from '@/data/visitor.apply.record';
import visitorApplyService from '@/service/visitor.apply.service';
import SubjectDef from '@/constants/subject.def';
import { AUDIT_STATE, APPLY_COMMIT_TIME } from '@/constants/visitor.apply.def';
import VisitorApplyDetail from './visitor.apply.detail/visitor.apply.detail.vue';

export default {
    name: 'VisitorAudit',
    components: { VisitorApplyDetail },
    mixins: [listMixin],
    data() {
        return {
            /**
             * 常量
             */
            CONSTANTS: {
                SUBJECT_GENDER: SubjectDef.GENDER,
                AUDIT_STATE: AUDIT_STATE,
                APPLY_COMMIT_TIME: APPLY_COMMIT_TIME
            },
            /**
             * 展示的申请
             */
            currentApply: null,
            /**
             * 展示的申请的天数
             */
            totalDays: null,
            /**
             * 申请信息是否展示
             */
            applyVisible: false,
            /**
             * 是查看或是审核
             */
            viewOrAudit: 'view'
        };
    },
    methods: {

        /**
         * 查询分页信息
         */
        paging: async function() {
            this.loading = true;
            try {
                const res = await this.service.paging(this.conditions);
                await this.$store.dispatch('visitor/getExistAuditingVisitor');
                this.pageData = res;
                this.loading = false;
            } catch (e) {
                this.loading = false;
            }
        },
        /**
         * 查看申请或审核申请
         */
        showAudit(apply, viewOrAudit) {
            this.currentApply = apply.visitorApplyRecord;
            this.totalDays = apply.totalDays;
            this.applyVisible = true;
            this.viewOrAudit = viewOrAudit;
        },
        /**
         * 关闭申请
         */
        closeAudit() {
            this.currentApply = null;
            this.applyVisible = false;
        },
        /**
         * 关闭申请且重新加载
         */
        reload() {
            this.closeAudit();
            this.paging();
        },
        /**
         * 格式化访问请求时间
         */
        formatVisitTime(startTime, endTime) {
            startTime = startTime.split('T')[0];
            endTime = endTime.split('T')[0];
            return `${startTime}至${endTime}`;
        }
    },
    created() {
        this.conditions = new VisitorApplyRecordPagingParams();
        this.conditions.gender = '';
        this.conditions.auditState = AUDIT_STATE.AUDITING;
        this.conditions.timeFrameOfApply = APPLY_COMMIT_TIME.ALL;
        // this.conditions.auditState =
        this.service = visitorApplyService;
        this.paging();
    }
};
