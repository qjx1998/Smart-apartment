import statisticsService from '@/service/statistics.service';
import SubjectDef from '@/constants/subject.def';

export default {
    name: 'FaceRecognition',
    props: ['building'],
    data() {
        return {
            /**
             * 识别数据
             */
            subjectRegHistories: null,
            /**
             * 是否正在加载
             */
            loading: false,
            /**
             * 最大的数
             */
            maxNumber: null
        };
    },
    watch: {
        /**
         * 切换楼栋时，绑定识别李璐
         */
        building() {
            this.setRecognitionStatistics();
        },
        /**
         * 数据变化时，求最大值
         */
        subjectRegHistories() {
            if (this.subjectRegHistories) {
                this.getMaxNum();
            }
        }
    },
    methods: {
        /**
         * 绑定识别记录
         */
        setRecognitionStatistics: async function() {
            if (!this.building) return;
            this.loading = true;
            try {
                const { id } = this.building;
                const { subjectRegHistories } = await statisticsService.getRecognitionStatistics(id);
                this.subjectRegHistories = subjectRegHistories;
            } catch (e) {
                this.loading = false;
            }
        },
        /**
         * 获取备注,教职工备注为院系，学生备注为院系，访客备注为访客来源
         * @param subject
         * @link Subject
         */
        getRemark(subject) {
            switch (subject.type) {
                case SubjectDef.TYPE.STUDENT:
                case SubjectDef.TYPE.EMPLOYEE:
                    return subject.institute ? `(${subject.institute.name})` : '';
                default:
                    return subject.visitorSource ? `(${subject.visitorSource})` : '';
            }
        },
        /**
         * 获取最大的值
         */
        getMaxNum() {
            const nums = this.subjectRegHistories.map(({ total }) => total);
            this.maxNumber = Math.max.apply(null, nums);
        }
    },
    created() {
        this.setRecognitionStatistics();
    }
};
