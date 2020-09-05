<template>
    <div class="face-recognition">
        <div class="title-ar">
            <span class="title">
                <svg-icon icon-class="dashboard-data-entry" />刷脸统计
            </span>
            <div class="dash-container">
                <div class="dash" />
            </div>
        </div>
        <div class="rank">
            <p v-if="!subjectRegHistories || !subjectRegHistories.length" class="no-data">暂无数据</p>
            <div v-for="({ subject, total}, index) in subjectRegHistories" v-else :key="subject.id" class="rank-item">
                <span class="name">{{ `${index + 1}. ${subject.name}${getRemark(subject)}` }}</span>
                <el-progress :percentage="(total / maxNumber) * 100" :stroke-width="10" />
                <span class="times"> {{ total }}次</span>
            </div>
        </div>
    </div>
</template>

<script>
import faceRecognition from './face.recognition';

export default faceRecognition;
</script>

<style lang="scss" scoped>
    @import "~@/styles/dashboard/chart.scss";
    @import './face.recognition.scss';
</style>
