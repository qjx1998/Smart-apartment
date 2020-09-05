import echarts from 'echarts';
import chartMixin from '@/mixins/chart.mixin';
import subjectChartMixin from '@/mixins/subject.chart.mixin';

const option = {
    tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
        {
            name: '数据录入',
            type: 'gauge',
            axisLine: {
                lineStyle: {
                    color: [[0.2, '#00a5ff'], [0.8, '#ffd34e'], [1, '#f9796c']],
                    width: 8
                }
            },
            title: {
                offsetCenter: [0, '-20%'],
                textStyle: {
                    fontSize: 14
                }
            },
            detail: { formatter: '{value}%', offsetCenter: [0, '64%'], fontSize: 16 },
            data: [{ value: 0, name: '完成率' }],
            axisLabel: { show: false },
            splitLine: { length: 16 }
        }
    ]
};
export default {
    name: 'DataEntry',
    mixins: [chartMixin, subjectChartMixin],
    data() {
        return {};
    },
    methods: {
        /**
         * 初始化chart
         */
        initChart() {
            this.chart = echarts.init(document.getElementById('chart'));
            this.configOption();
        },
        /**
         * 配置option
         */
        configOption() {
            const { total, activatedTotal } = this.subjectData;
            const rate = total ? Math.floor((activatedTotal / total) * 100) : 0;
            option.series[0].data = [
                { value: rate, name: '完成率' }
            ];
            this.chart.setOption(option);
        }
    },
    created() {

    }
};
