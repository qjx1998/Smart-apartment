<template>
    <div class="device">
        <div class="title-ar">
            <span class="title">
                <svg-icon icon-class="dashboard-device" />设备运行状况
            </span>
            <div class="dash-container">
                <div class="dash" />
            </div>
        </div>

        <div class="chart-container">
            <div class="data">
                <div class="data-item">
                    <div class="circle blue" />
                    <span class="key">在线：{{ monitorStatistics ? monitorStatistics.onlineTotal : 0 }} 台</span>
                </div>
                <div class="data-item">
                    <div class="circle orange" />
                    <span class="key">离线：{{ monitorStatistics ? monitorStatistics.offlineTotal : 0 }} 台</span>
                </div>
            </div>
            <div id="device-chart" class="chart" />
        </div>
    </div>
</template>

<script>
import device from './device';

export default device;
</script>

<style lang="scss" scoped>
    @import "~@/styles/dashboard/chart.scss";
    @import "~@/styles/dashboard/middle.chart.scss";
</style>
