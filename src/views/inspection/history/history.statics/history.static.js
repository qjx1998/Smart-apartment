import dialogListMixin from '@/mixins/dialog.list.mixin.js';
import inspectionService from '@/service/inspection.service';
import SubjectDef from '@/constants/subject.def';
import listMixin from '@/mixins/list.mixin';
import { PersonHistoryPresentRecordPageParams } from '@/data/historyrecord';

export default {
    name: 'HistoryStatics',
    mixins: [listMixin, dialogListMixin],
    data() {
        return {
            /**
             * 表单数据验证规则
             */
            formRules: {
                beginDate: [
                    { required: true, message: '请选择开始时间', trigger: 'blur' }
                ],
                endDate: [
                    { required: true, message: '请选择结束时间', trigger: 'blur' }
                ]
            },
            SubjectDef: SubjectDef,
            /**
             * 搜索条件
             */
            conditions: Object.assign(new PersonHistoryPresentRecordPageParams(), this.searchConditions),
            /**
             * 备份查询条件
             */
            backupConditions: Object.assign(new PersonHistoryPresentRecordPageParams(), this.searchConditions)
        };
    },
    props: {
        subjectName: {
            type: String
        },
        searchConditions: {
            type: Object
        }
    },
    methods: {
        /**
         * 发起关闭会话框事件，通知傅组件关闭事件
         */
        close() {
            this.$emit('close');
        },
        /**
         * 如果通过表单验证，查询个人查寝历史记录明细
         */
        pagingPersonHistoryPresentRecord() {
            this.$refs.detailForm.validate((valid) => {
                if (!valid) {
                    return;
                }
                this.pagingPersonHistoryPresentRecordCreated();
            });
        },
        /**
         * 查询个人查寝历史记录明细
         */
        pagingPersonHistoryPresentRecordCreated() {
            const self = this;
            self.loading = true;
            this.service.pagingPersonHistoryPresentRecord(this.conditions).then(
                res => {
                    self.loading = false;
                    self.pageData = res;
                }
            );
        },
        /**
         * 变更分页
         *
         * @param current 新的页码
         */
        changePage(current) {
            this.conditions.page = current;
            this.pagingPersonHistoryPresentRecord();
        },
        /**
         * 变更每页数量
         *
         * @param size 新的每页数量
         */
        changeSize(size) {
            this.conditions.page = 1;
            this.conditions.size = size;
            this.pagingPersonHistoryPresentRecord();
        },
        /**
         * 重置时间
         */
        resetConditionsDate() {
            this.conditions.beginDate = this.backupConditions.beginDate;
            this.conditions.endDate = this.backupConditions.endDate;
            this.pagingPersonHistoryPresentRecordCreated();
        }
    },
    created: async function() {
        this.service = inspectionService;
        this.conditions.present = '';
        await this.pagingPersonHistoryPresentRecordCreated();
    }
};
