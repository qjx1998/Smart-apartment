export default {
    props: {
        /**
         * 数据
         */
        subjectData: {
            type: Object,
            required: true
        }
    },
    watch: {
        subjectData() {
            this.configOption();
        }
    }
};
