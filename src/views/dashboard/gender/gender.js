import echarts from 'echarts';
import chartMixin from '@/mixins/chart.mixin';
import subjectChartMixin from '@/mixins/subject.chart.mixin';

const option = {
    color: ['#00a4ff', '#ff6060'],
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [
        {
            name: '性别分布',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
                { value: 0, name: '男' },
                { value: 0, name: '女' }
            ]
        }
    ]
};

export default {
    name: 'Gender',
    mixins: [chartMixin, subjectChartMixin],
    data() {
        return {
        };
    },
    methods: {
        /**
         * 初始化图表
         */
        initChart() {
            this.chart = echarts.init(document.getElementById('gender-chart'));
            this.configOption();
        },
        /**
         * 设置图表配置
         */
        configOption() {
            let { maleTotal, femaleTotal } = this.subjectData;
            maleTotal = maleTotal || 0;
            femaleTotal = femaleTotal || 0;
            option.series[0].data = [
                { value: maleTotal, name: '男' },
                { value: femaleTotal, name: '女' }
            ];
            this.chart.setOption(option);
        }
    },
    created() {

    }
};
