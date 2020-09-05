<template>
    <div class="history container">
        <div class="filter">
            <span class="title">检索条件</span>

            <div class="conditions-operation">
                <div class="conditions">
                    <el-form
                        ref="form"
                        :model="conditions"
                        label-position="right"
                        label-width="80px"
                        size="small"
                        @keyup.enter.native="searchByConditions()"
                    >
                        <el-form-item label="姓名" prop="subjectName">
                            <el-input v-model="conditions.subjectName" />
                        </el-form-item>

                        <el-form-item label="识别结果" prop="subjectType">
                            <el-select v-model="conditions.subjectType" filterable>
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="type in subjectTypes"
                                    :key="type.code"
                                    :label="type.name"
                                    :value="type.code"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="抓拍位置" prop="monitorId">
                            <el-select v-model="conditions.monitorId" filterable>
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="monitor in monitorList"
                                    :key="monitor.id"
                                    :label="monitor.name"
                                    :value="monitor.id"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="开始时间" prop="captureTimeStart">
                            <el-date-picker
                                v-model="conditions.captureTimeStart"
                                type="datetime"
                                placeholder="选择开始时间"
                                value-format="yyyy-MM-ddTHH:mm:ss"
                            />
                        </el-form-item>

                        <el-form-item label="结束时间" prop="captureTimeEnd">
                            <el-date-picker
                                v-model="conditions.captureTimeEnd"
                                type="datetime"
                                placeholder="选择结束时间"
                                value-format="yyyy-MM-ddTHH:mm:ss"
                            />
                        </el-form-item>
                        <el-form-item label="日期选项">
                            <el-select v-model="dateOption" filterable @change="setTime">
                                <el-option label="本月" value="thisMonth" />
                                <el-option label="本周" value="thisWeek" />
                                <el-option label="今日" value="today" />
                                <el-option label="近一小时" value="lastHour" />
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>

                <div class="search">
                    <el-button
                        class="form-btn"
                        type="primary"
                        icon="el-icon-search"
                        @click="searchByConditions"
                    >
                        搜索
                    </el-button>
                    <el-button icon="el-icon-refresh" class="reset-btn" type="primary" @click="resetForm('form')">
                        重置
                    </el-button>
                </div>
            </div>
        </div>

        <div v-if="pageData" class="list">
            <el-table v-loading="loading" stripe border :data="pageData.content" empty-text="没有数据">
                <el-table-column label="序号" type="index" align="center" width="84px" />

                <el-table-column label="抓拍照片" align="center">
                    <template slot-scope="scope">
                        <img :src="baseImageUrl + scope.row.historyRecord.captureImgUrl" class="capture-img">
                    </template>
                </el-table-column>
                <el-table-column label="识别照片" align="center">
                    <template slot-scope="scope">
                        <img
                            v-if="scope.row.historyRecord.subject"
                            :src="baseImageUrl + scope.row.historyRecord.subject.photoUrl"
                            class="capture-img"
                        >
                    </template>
                </el-table-column>
                <el-table-column label="姓名" align="center">
                    <template slot-scope="scope">
                        <span
                            v-if="scope.row.historyRecord.subject"
                            class="abnormal"
                            @click="showSubjectDetail(scope.row.historyRecord.subject)"
                        >{{ scope.row.historyRecord.subject.name }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column label="用户信息" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.building">{{ scope.row.building.name }}</span>
                        <span v-if="scope.row.room">#{{ scope.row.room.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="抓拍位置" align="center" prop="historyRecord.monitor.name">
                    <div slot-scope="scope" class="abnormal" @click="showDeviceDetail(scope.row.historyRecord.monitor)">
                        {{ scope.row.historyRecord.monitor.name }}
                    </div>
                </el-table-column>
                <el-table-column label="识别结果" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.historyRecord.subject ? getTypeName(scope.row.historyRecord.subject.type) : '陌生人' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="抓拍时间" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.historyRecord.captureTime.replace('T', ' ') }}</span>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next, jumper, sizes"
                    :current-page.sync="conditions.page"
                    :total="pageData.totalElements"
                    @current-change="changePage"
                    @size-change="changeSize"
                />
            </div>
        </div>

        <device-detail
            v-if="deviceDetailVisible"
            :device-groups="deviceGroups"
            :device="device"
            :device-defs="deviceDefs"
            @close="hideDeviceDetail"
        />

        <subject-detail
            v-if="subjectDetailVisible"
            :subject="showingSubject"
            :buildings="buildings || []"
            @close="hideSubjectDetail()"
        />

    </div>
</template>

<script>
import history from './history';

export default history;
</script>

<style lang="scss" scoped>
  @import "~@/styles/baseinfo.common.scss";
  @import "./history.scss";
</style>
