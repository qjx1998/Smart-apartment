import chartMixin from '@/mixins/chart.mixin';
import echarts from 'echarts';
import statisticsService from '@/service/statistics.service';

const option = {
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '40px'
    },
    axisLabel: {
        formatter(value) {
            if (value >= 1000) {
                value = (value / 1000) + 'k';
            }
            return value;
        }
    },
    xAxis: [
        {
            type: 'category',
            data: ['1号门进口', '1号门出口', '2号门出口'],
            axisLabel: {
                interval: 0
            }

        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '告警量',
            type: 'bar',
            barWidth: 30,
            data: [322, 245, 117],
            itemStyle: {
                normal: {
                    color: '#ff6060'
                }
            }
        }
    ]
};

export default {
    name: 'Warning',
    mixins: [chartMixin],
    props: ['building'],
    data() {
        return {
            /**
             * 危险预警数据
             */
            monitorRegHistories: null
        };
    },
    watch: {
        /**
         * 切换楼栋时，获取新的数据
         */
        building() {
            this.setStrangerStatistics();
        },
        /**
         * 获取数据成功，重新渲染图表
         */
        monitorRegHistories() {
            this.configOption();
        }
    },
    methods: {
        initChart() {
            this.chart = echarts.init(document.getElementById('warning-chart'));
            this.chart.setOption(option);
        },
        /**
         * 绑定危险预警数据
         */
        setStrangerStatistics: async function() {
            if (!this.building) return;
            this.loading = true;
            const { id } = this.building;
            try {
                const { monitorRegHistories } = await statisticsService.getStrangerStatistics(id);
                this.monitorRegHistories = monitorRegHistories;
            } catch (e) {
                console.log(e);
                this.loading = false;
            }
        },
        configOption() {
            if (!this.monitorRegHistories) return;
            const xAxisData = [];
            const data = [];
            for (const history of this.monitorRegHistories) {
                xAxisData.push(history.monitor.name);
                console.log(xAxisData);
                data.push(history.total);
            }
            option.xAxis[0].data = xAxisData;
            option.series[0].data = data;
            this.chart.setOption(option);
        }
    },
    created() {
        this.setStrangerStatistics();
    }
};
