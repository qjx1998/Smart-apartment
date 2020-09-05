<template>
    <div class="warning">
        <div class="title-ar">
            <span class="title">
                <svg-icon icon-class="dashboard-stranger" />本周陌生人告警
            </span>
            <div class="dash-container">
                <div class="dash" />
            </div>
        </div>
        <div id="warning-chart" class="chart" />
    </div>
</template>

<script>
import warning from './warning';

export default warning;
</script>

<style lang="scss" scoped>
    @import "~@/styles/dashboard/chart.scss";
    @import './warning.scss';
</style>
