export default {
    data() {
        return {
            /**
             * 人员细节列表是否展示
             */
            subjectDetailVisible: false,
            /**
             * 展示的人员
             */
            showingSubject: null
        };
    },
    methods: {
        /**
         * 展示人员
         * @param subject
         * @link Subject
         */
        showSubjectDetail(subject) {
            this.showingSubject = subject;
            this.subjectDetailVisible = true;
        },
        /**
         * 隐藏人员
         */
        hideSubjectDetail() {
            this.showingSubject = null;
            this.subjectDetailVisible = false;
        }
    }
};
