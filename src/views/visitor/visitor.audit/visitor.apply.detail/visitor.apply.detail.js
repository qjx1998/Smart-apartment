import dialogMixin from '@/mixins/dialog.mixin';
import SubjectDef from '@/constants/subject.def';
import { AUDIT_STATE } from '@/constants/visitor.apply.def';
import { VisitorApplyParam } from '@/data/visitor.apply.record';
import roomService from '@/service/room.service';
import visitorApplyService from '@/service/visitor.apply.service';

export default {
    name: 'VisitorApplyDetail',
    mixins: [dialogMixin],
    props: {
        application: { required: true },
        totalDays: { required: true },
        mode: { default: 'view' }
    },
    computed: {
        /**
         * 标题
         * @returns {string}
         */
        title() {
            return this.mode === 'view' ? '详情查看' : '访客审核';
        }
    },
    data() {
        return {
            /**
             * 常量
             */
            CONSTANTS: {
                SUBJECT_GENDER: SubjectDef.GENDER,
                AUDIT_STATE
            },
            /**
             * 表单
             */
            form: new VisitorApplyParam(),
            /**
             * 表单验证规则
             */
            formRules: {
                roomName: [
                    { validator: this.roomValidator, trigger: 'blur' }
                ],
                recogStartTime: [
                    { required: true, message: '请选择访问起始时间', trigger: 'blur' }
                ],
                recogEndTime: [
                    { required: true, message: '请选择访问截止时间', trigger: 'blur' }
                ]
            }
        };
    },
    created() {
        this.form.buildingId = this.application.building.id;
        this.form.recogStartTime = this.application.recogStartTime;
        this.form.recogEndTime = this.application.recogEndTime;
    },
    methods: {
        /**
         * 获取图片的全部地址
         */
        getFullImagePath(relativeImageUrl) {
            return process.env.VUE_APP_OSS_BASE_URL + relativeImageUrl;
        },
        /**
         * 验证房间号
         */
        roomValidator: async function(rule, value, callback) {
            if (!value) {
                callback();
                return;
            }
            const buildingId = this.application.building.id;
            const room = await roomService.examin(buildingId, value);
            if (!room) {
                callback(new Error('此楼栋中不存在该房间号'));
                return;
            }
            this.form.roomId = room.id;
            callback();
        },
        /**
         * 验证访问时间
         */
        validateVisitTimeRange() {
            const { recogStartTime, recogEndTime } = this.form;
            if (recogStartTime && recogEndTime) {
                const endTime = (new Date(recogEndTime)).getTime();
                const startTime = (new Date(recogStartTime)).getTime();
                if (endTime < startTime) {
                    this.$message({
                        type: 'error',
                        message: '访问起始时间大于访问终止时间',
                        duration: 3000
                    });
                    return false;
                }
                if ((endTime - startTime) > 3 * 24 * 60 * 60 * 1000) {
                    this.$message({
                        type: 'error',
                        message: '访问起始时间与访问终止时间间隔应小于3天',
                        duration: 3000
                    });
                    return false;
                }
            }
            return true;
        },
        /**
         * 审核
         */
        async audit() {
            try {
                this.loading = true;
                const formValid = await this.$refs.form.validate();
                const visitTimeValid = this.validateVisitTimeRange();
                const valid = formValid && visitTimeValid;
                if (!valid) return;
                await visitorApplyService.audit(this.application.id, this.form);
                this.loading = false;
                this.reload();
            } catch (e) {
                this.loading = false;
            }
        },
        /**
         * 通过
         */
        passAudit() {
            this.form.auditState = AUDIT_STATE.AUDIT_SUCCESS;
            this.audit();
        },
        /**
         * 不通过
         */
        notPassAudit() {
            this.form.auditState = AUDIT_STATE.AUDIT_FAIL;
            this.audit();
        }
    }
};
