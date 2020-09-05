export default {
    data() {
        return {
            /**
             * 数据图表
             */
            chart: null
        };
    },
    mounted() {
        /**
         * 需要在各图表组件里定义initChart方法
         */
        this.initChart();
    },
    beforeDestroy() {
        this.destroyChart();
    },
    methods: {
        /**
         * 销毁图表
         */
        destroyChart() {
            if (!this.chart) { return; }
            this.chart.dispose();
            this.chart = null;
        }
    }
};
