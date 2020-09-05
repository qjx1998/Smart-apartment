import chartMixin from '@/mixins/chart.mixin';
import echarts from 'echarts';

const option = {
    color: ['#9cc3fe', '#edc5fb'],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['进流量', '出流量']
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23]
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
                formatter: '{value}人次'
            }
        }
    ],
    series: [
        {
            name: '进流量',
            type: 'line',
            smooth: 0.5,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            },
            markLine: {
                data: [
                    { type: 'average', name: '平均值' }
                ]
            },
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: '#9cc3fe'
                    }
                }
            }
        },
        {
            name: '出流量',
            type: 'line',
            smooth: 0.5,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            },
            markLine: {
                data: [
                    { type: 'average', name: '平均值' }
                ]
            },
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: '#edc5fb'
                    }
                }
            }
        }
    ]
};

export default {
    name: 'SubjectFlow',
    mixins: [chartMixin],
    props: ['building', 'realtimePassStatistics'],
    data() {
        return {
        };
    },
    watch: {
        realtimePassStatistics() {
            this.configOption();
        }
    },
    methods: {
        initChart() {
            this.chart = echarts.init(document.getElementById('subject-flow-chart'));
            this.chart.setOption(option);
        },
        /**
         * 绘制图表
         */
        configOption() {
            if (!this.realtimePassStatistics) return;
            const { todayHourlyPassInList, todayHourlyPassOutList } = this.realtimePassStatistics;
            const todayHourlyPassInListData = this.getSeriesData(todayHourlyPassInList);
            const todayHourlyPassOutListData = this.getSeriesData(todayHourlyPassOutList);
            option.series[0].data = todayHourlyPassInListData;
            option.series[1].data = todayHourlyPassOutListData;
            this.chart.setOption(option);
        },
        /**
         * 加工后端返回的数据
         * @param passList 通行数据
         */
        getSeriesData(passList) {
            return passList.map(item => item.passTotal);
        }
    }
};
