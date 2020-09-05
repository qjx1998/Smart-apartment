<template>
    <div class="gender">
        <div class="title-ar">
            <span class="title">
                <svg-icon icon-class="dashboard-gender" />性别分布
            </span>
            <div class="dash-container">
                <div class="dash" />
            </div>
        </div>
        <div class="chart-container">
            <div class="data">
                <div class="data-item">
                    <div class="circle blue" />
                    <span class="key">男：</span>
                    <span class="value">{{ subjectData.maleTotal || 0 }}人</span>
                </div>
                <div class="data-item">
                    <div class="circle orange" />
                    <span class="key">女：</span>
                    <span class="value">{{ subjectData.femaleTotal || 0 }}人</span>
                </div>
            </div>
            <div id="gender-chart" class="chart" />
        </div>

    </div>
</template>

<script>
import gender from './gender';

export default gender;
</script>

<style lang="scss" scoped>
    @import "~@/styles/dashboard/chart.scss";
    @import "~@/styles/dashboard/middle.chart.scss";
    @import './gender.scss';
</style>
