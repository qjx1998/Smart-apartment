<template>
    <div class="subject-flow">
        <section class="subject-flow-chart">
            <div class="title-ar">
                <span class="title">
                    <svg-icon icon-class="dashboard-in-out" />实时出入流量
                </span>
                <div class="dash-container">
                    <div class="dash" />
                </div>
            </div>
            <div id="subject-flow-chart" class="chart" />
        </section>
    </div>
</template>

<script>
import subjectFlow from './subject.flow';

export default subjectFlow;
</script>

<style lang="scss" scoped>
    @import "~@/styles/dashboard/chart.scss";
    @import './subject.flow.scss';
</style>
