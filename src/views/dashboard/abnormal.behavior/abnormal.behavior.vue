<template>
    <div class="abnormal-behavior">
        <div class="title-ar">
            <span class="title">
                <svg-icon icon-class="dashboard-behavior-analysis" />异常行为分析
            </span>
            <div class="dash-container">
                <div class="dash" />
            </div>
        </div>
        <div class="data">
            <div class="data-item">
                <span class="subject-nums">2天未出现：{{ dangerBehaviorStatistics ? dangerBehaviorStatistics.lowDangerTotal : 0 }}人</span>
            </div>
            <div class="data-item">
                <span class="subject-nums">3-4天未出现：{{ dangerBehaviorStatistics ? dangerBehaviorStatistics.moderateDangerTotal : 0 }}人</span>
            </div>
            <div class="data-item">
                <span class="subject-nums">5天以上未出现：{{ dangerBehaviorStatistics ? dangerBehaviorStatistics.highDangerTotal : 0 }}人</span>
            </div>
        </div>
        <div class="table">
            <el-table border width="80%" :data="abnormalTableData">
                <el-table-column align="center" width="64px" label="序号" prop="index" />
                <el-table-column align="center" label="姓名" prop="subject.name">
                    <span slot-scope="scope" class="subject-name" @click="showSubjectDetail(scope.row.subject.id)">
                        {{ scope.row.subject.name }}
                    </span>
                </el-table-column>
                <el-table-column align="center" label="宿舍" prop="building.name">
                    <span slot-scope="scope">{{ scope.row.building.name + (scope.row.room ? scope.row.room.name : '') }}</span>
                </el-table-column>
                <el-table-column align="center" width="110" label="未出现天数" prop="dangerBehaviorDays" />
                <el-table-column align="center" label="最后一次活跃" prop="lastCaptureDate">
                    <span slot-scope="scope">{{ scope.row.lastCaptureDate | dateFilter }}</span>
                </el-table-column>
                <el-table-column width="92px" align="center" label="异常评级">
                    <span slot-scope="scope">{{ ABNORMAL_DEF.DANGER_CODE[scope.row.dangerLevel] }}</span>
                </el-table-column>
            </el-table>
        </div>
        <subject-detail v-if="subjectDetailVisible" :subject="showingSubject" :buildings="buildings" @close="hideSubjectDetail()" />
    </div>
</template>

<script>
import abnormalBehavior from './abnormal.behavior';

export default abnormalBehavior;
</script>

<style lang="scss" scoped>
    @import "~@/styles/dashboard/chart.scss";
    @import "./abnormal.behavior.scss";
</style>
