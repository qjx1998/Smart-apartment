<template>
    <div class="inspection-chart">
        <div class="title-ar">
            <span class="title">
                <svg-icon icon-class="dashboard-inspection" />在寝统计
            </span>
            <div class="dash-container">
                <div class="dash" />
            </div>
        </div>

        <div class="chart-container">
            <div class="data">
                <div class="data-item">
                    <div class="circle blue" />
                    <span class="key">在寝: {{ presentTotal }}人</span>
                </div>
                <div class="data-item">
                    <div class="circle orange" />
                    <span class="key">外出：{{ noPresentTotal }}人</span>
                </div>
            </div>
            <div id="inspection-chart" class="chart" />
        </div>
    </div>
</template>

<script>
import inspection from './inspection';

export default inspection;
</script>

<style lang="scss" scoped>
    @import "~@/styles/dashboard/chart.scss";
    @import "~@/styles/dashboard/middle.chart.scss";
    @import './inspection.scss';
</style>
