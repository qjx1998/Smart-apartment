import echarts from 'echarts';
import chartMixin from '@/mixins/chart.mixin';
import statisticsService from '@/service/statistics.service';

const option = {
    color: ['#00a4ff', '#ff6060'],
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    series: [
        {
            name: '设备状态',
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
                { name: '在线', value: 0 },
                { name: '离线', value: 0 }
            ]
        }
    ]
};

export default {
    name: 'DeviceVue',
    mixins: [chartMixin],
    data() {
        return {
            /**
             * 设备运行数据
             */
            monitorStatistics: null,
            /**
             * loading
             */
            loading: false
        };
    },
    props: {
        building: {
            type: Object
        }
    },
    watch: {
        /**
         * 楼栋id变化，调用接口
         */
        building() {
            this.setMonitorStatistics();
        },
        /**
         * 数据发生变化，重新绘制图表
         */
        monitorStatistics() {
            this.configOption();
        }
    },
    methods: {
        initChart() {
            this.chart = echarts.init(document.getElementById('device-chart'));
            this.chart.setOption(option);
        },
        /**
         * 设置设备运行数据
         */
        setMonitorStatistics: async function() {
            if (!this.building) return;
            this.loading = true;
            try {
                const { id } = this.building;
                this.monitorStatistics = await statisticsService.getMonitorStatistics(id);
            } catch (e) {
                this.loading = false;
            }
        },
        /**
         * 更新图表
         */
        configOption() {
            if (!this.monitorStatistics) { return; }
            let { onlineTotal, offlineTotal } = this.monitorStatistics;
            onlineTotal = onlineTotal || 0;
            offlineTotal = offlineTotal || 0;
            const data = [
                { name: '在线', value: onlineTotal },
                { name: '离线', value: offlineTotal }
            ];
            option.series[0].data = data;
            this.chart.setOption(option);
        }
    },
    created() {
        this.setMonitorStatistics();
    }
};
