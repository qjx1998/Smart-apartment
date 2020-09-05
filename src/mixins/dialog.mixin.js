export default {
    data() {
        return {
            /**
             * api 请求中
             */
            loading: false
        };
    },
    methods: {
        /**
         * 通知父组件关闭会话框
         */
        close() {
            this.$emit('close');
        },
        /**
         * 通知父组建重新加载
         */
        reload() {
            this.$emit('reload');
        }
    }
};
