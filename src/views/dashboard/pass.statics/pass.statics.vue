<template>
    <div class="pass-statics">
        <div class="title-ar">
            <span class="title">
                <svg-icon icon-class="dashboard-passcard" />通行统计
            </span>
            <div class="dash-container">
                <div class="dash" />
            </div>
        </div>
        <div class="data">
            <div class="data-item">
                <span class="total-title">本月通行总人次</span>
                <span class="total-number">{{ realtimePassStatistics ? realtimePassStatistics.monthlyPassTotal : 0 }}</span>
            </div>
            <div class="data-item">
                <span class="total-title">本月陌生人告警人次</span>
                <span class="total-number">{{ realtimePassStatistics ? realtimePassStatistics.strangerMonthlyPassTotal : 0 }}</span>
            </div>
            <div class="data-item">
                <span class="total-title">本月访客通行总人次</span>
                <span class="total-number">{{ realtimePassStatistics ? realtimePassStatistics.visitorMonthlyPassTotal : 0 }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import passStatics from './pass.statics';

export default passStatics;
</script>

<style lang="scss" scoped>
    @import "~@/styles/dashboard/chart.scss";
    @import "./pass.statics.scss";
</style>
