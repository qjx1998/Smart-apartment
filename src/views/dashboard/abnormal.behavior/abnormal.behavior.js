import statisticsService from '@/service/statistics.service';
import ABNORMAL_DEF from '@/constants/abnormal.def';
import subjectService from '@/service/subject.service';
import subjectDetailMixin from '@/components/subject.detail/subject.detail.mixin';
import SubjectDetail from '@/components/subject.detail/subject.detail.vue';

export default {
    name: 'AbnormalBehavior',
    components: { SubjectDetail },
    props: ['building'],
    mixins: [subjectDetailMixin],
    data() {
        return {
            /**
             * 异常行为统计数据
             */
            dangerBehaviorStatistics: null,
            /**
             * 异常评级参数
             */
            ABNORMAL_DEF: ABNORMAL_DEF,
            /**
             * 展示数据
             */
            abnormalTableData: [],
            /**
             * 是否显示人员信息弹框
             */
            subjectInfoVisible: false,
            /**
             * 当前的用户信息
             */
            currentSubject: null,
            /**
             * current page
             */
            currentIndex: 0,
            /**
             * interval id
             */
            intervalId: null
        };
    },
    watch: {
        /**
         * 切换楼栋时，获取数据
         */
        building() {
            this.setDangerBehaviorStatistics();
        }
    },
    created() {
        this.setDangerBehaviorStatistics();
    },
    beforeDestroy() {
        if (this.intervalId) {
            window.clearInterval(this.intervalId);
        }
    },
    methods: {
        /**
         * 设置异常行为统计
         */
        setDangerBehaviorStatistics: async function() {
            if (!this.building) return;
            if (this.intervalId) { window.clearInterval(this.intervalId); }
            this.loading = true;
            try {
                const { id } = this.building;
                this.dangerBehaviorStatistics = await statisticsService.getDangerBehaviorStatistics(id);
                const { content } = this.dangerBehaviorStatistics.dangerBehaviorPage;
                this.dangerBehaviorStatistics.dangerBehaviorPage.content = content.map((item, index) => {
                    item.index = index + 1;
                    return item;
                });
                this.abnormalTableData = this.dangerBehaviorStatistics.dangerBehaviorPage.content.slice(0, 5);
                this.updateData();
                this.loading = false;
            } catch (e) {
                console.log(e);
                this.loading = false;
            }
        },
        /**
         * 显示用户信息
         */
        chooseSubject: async function(id) {
            this.currentSubject = await subjectService.get(id);
            // 开启弹出框
            this.subjectInfoVisible = true;
        },
        /**
         * 关闭人员信息会话框
         */
        closeSubjectInfoDialog() {
            this.currentSubject = null;
            this.subjectInfoVisible = false;
        },
        /**
         * 展示人员
         * @param subject
         * @link Subject
         */
        async showSubjectDetail(subjectId) {
            this.showingSubject = await subjectService.get(subjectId);
            this.subjectDetailVisible = true;
        },
        /**
         * 更新数据
         */
        updateData() {
            const { content } = this.dangerBehaviorStatistics.dangerBehaviorPage;
            if (content.length <= 5) {
                this.abnormalTableData = content;
            } else {
                this.intervalId = window.setInterval(() => {
                    if (this.currentIndex === 0) {
                        this.currentIndex = 1;
                        this.abnormalTableData = content.slice(5);
                    } else {
                        this.currentIndex = 0;
                        this.abnormalTableData = content.slice(0, 5);
                    }
                }, 10000);
            }
        }
    }
};
