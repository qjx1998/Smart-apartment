<template>
    <div class="data-entry">
        <div class="title-ar">
            <span class="title">
                <svg-icon icon-class="dashboard-data-entry" />数据录入
            </span>
            <div class="dash-container">
                <div class="dash" />
            </div>
        </div>

        <div class="chart-container">
            <div class="data">
                <div class="data-item">
                    <span class="key">基础信息录入量： </span>
                    <span class="value">{{ subjectData.total || 0 }}人</span>
                </div>
                <div class="data-item">
                    <span class="key">已完成人脸上传：</span>
                    <span class="value">{{ subjectData.activatedTotal || 0 }}人</span>
                </div>
            </div>
            <div id="chart" class="chart" />
        </div>
    </div>
</template>

<script>
import dataEntry from './data.entry';

export default dataEntry;
</script>

<style lang="scss" scoped>
    @import "~@/styles/dashboard/chart.scss";
    @import "~@/styles/dashboard/middle.chart.scss";
    @import "./data.entry.scss";
</style>
