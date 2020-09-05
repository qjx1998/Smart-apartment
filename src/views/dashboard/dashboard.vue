<template>
    <div class="dashboard">
        <div class="header">
            <span class="building-name">{{ currentSelectedBuilding && currentSelectedBuilding.name }}公寓数据看板</span>
            <div class="dropdown">
                <el-dropdown @command="handleBuilding">
                    <el-button>
                        {{ currentSelectedBuilding ? currentSelectedBuilding.name : '切换楼栋' }}<i
                            class="el-icon-arrow-down el-icon--right"
                        />
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            v-for="building in buildings"
                            :key="building.id"
                            :command="building"
                        >
                            {{ building.name }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="top">
            <pass-statics class="chart-c sm-chart" :realtime-pass-statistics="realtimePassStatistics" />
            <subject-flow class="chart-c bg-chart" :realtime-pass-statistics="realtimePassStatistics" />
            <warning class="chart-c sm-chart" :building="currentSelectedBuilding" />
        </div>
        <div class="middle">
            <data-entry class="chart-c" :subject-data="subjectStatics" />
            <inspection class="chart-c" :subject-data="subjectStatics" />
            <gender class="chart-c" :subject-data="subjectStatics" />
            <device class="chart-c" :building="currentSelectedBuilding" />
        </div>
        <div class="bottom">
            <abnormal-behavior :building="currentSelectedBuilding" class="chart-c" />
            <face-recognition :building="currentSelectedBuilding" class="chart-c" />
        </div>
    </div>
</template>

<script src="./dashboard.js">
</script>

<style lang="scss" scoped src="./dashboard.scss">
</style>
