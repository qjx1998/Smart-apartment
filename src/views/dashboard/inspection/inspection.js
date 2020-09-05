import chartMixin from '@/mixins/chart.mixin';
import echarts from 'echarts';
import subjectChartMixin from '@/mixins/subject.chart.mixin';

const option = {
    color: ['#00a4ff', '#ff6060'],
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br />{b} : {c} ({d}%)'
    },
    series: [
        {
            name: '在寝率',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            center: ['40%', '50%'],
            data: [
                { name: '在寝', value: 0 },
                { name: '外出', value: 0 }
            ],
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
            }
        }
    ]
};

export default {
    name: 'Inspection',
    mixins: [chartMixin, subjectChartMixin],
    data() {
        return {
            /**
             * 在寝总人数
             */
            presentTotal: 0,
            /**
             * 不在寝总人数
             */
            noPresentTotal: 0
        };
    },
    methods: {
        initChart() {
            this.chart = echarts.init(document.getElementById('inspection-chart'));
            this.configOption();
        },
        /**
         * 配置option
         */
        configOption() {
            const { presentTotal, noPresentTotal } = this.subjectData;
            this.presentTotal = presentTotal || 0;
            this.noPresentTotal = noPresentTotal || 0;
            option.series[0].data = [
                { name: '在寝', value: this.presentTotal },
                { name: '外出', value: this.noPresentTotal }
            ];
            this.chart.setOption(option);
        }
    },
    created() {

    }
};
