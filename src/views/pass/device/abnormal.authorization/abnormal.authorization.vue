<template>
    <el-dialog :visible="true" :title="title + '授权异常明细'" width="1080px" @close="close">
        <div class="filter">
            <div class="conditions">
                <el-form ref="form" label-position="right" :model="conditions" label-width="84px">
                    <el-form-item v-if="neededNameCondition" label-width="48px" label="姓名" prop="subjectName" class="name-condition">
                        <el-input v-model="conditions.subjectName" />
                    </el-form-item>
                    <el-form-item v-if="neededDevicesCondition" label="授权设备" prop="monitorId" class="device-condition">
                        <el-select v-model="conditions.monitorId" filterable>
                            <el-option label="全部" value="" />
                            <el-option
                                v-for="authorizedDevice in authorizedDevices"
                                :key="authorizedDevice.id"
                                :label="authorizedDevice.name"
                                :value="authorizedDevice.id"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="授权异常原因" label-width="108px" prop="errorCode">
                        <el-select v-model="conditions.errorCode" filterable>
                            <el-option label="全部" value="" />
                            <el-option
                                v-for="error in subjectMonitorDef.ERRORS.list"
                                :key="error.code"
                                :label="error.name"
                                :value="error.code"
                            />
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>

            <div class="search">
                <el-button
                    type="primary"
                    icon="el-icon-search"
                    class="form-btn"
                    @click="searchByConditions"
                >搜索
                </el-button>
                <el-button
                    icon="el-icon-refresh"
                    class="reset-btn"
                    type="primary"
                    @click="resetForm('form')"
                >重置
                </el-button>
            </div>
        </div>
        <div class="data-table">
            <el-table
                v-loading="loading"
                border
                stripe
                :data="pageData ? pageData.content : []"
                empty-text="没有数据"
            >
                <el-table-column label="序号" type="index" align="center" width="84px" />
                <el-table-column label="姓名" align="center" prop="subject.name" />
                <el-table-column label="授权设备" align="center" prop="monitor.name" />
                <el-table-column label="上次授权时间" align="center">
                    <span slot-scope="scope">{{ scope.row.subjectMonitor.updatedDate | dateFilter }}</span>
                </el-table-column>
                <el-table-column label="授权状态" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.subjectMonitor.state === subjectMonitorDef.STATES.IS_ACTIVE">正常</span>
                        <span
                            v-if="scope.row.subjectMonitor.state === subjectMonitorDef.STATES.ABNORMAL_AUTHORIZED
                                || scope.row.subjectMonitor.state === subjectMonitorDef.STATES.ERROR"
                        >授权异常</span>
                    </template>
                </el-table-column>
                <el-table-column label="授权异常原因" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.subjectMonitor.errorCode === subjectMonitorDef.ERRORS.MONITOR_BIND_SUBJECT_ERROR">新增</span>
                        <span v-if="scope.row.subjectMonitor.errorCode === subjectMonitorDef.ERRORS.MONITOR_UNBIND_SUBJECT_ERROR">删除</span>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next, jumper, sizes"
                    :total="pageData ? pageData.totalElements : 0"
                    :current-page.sync="conditions.page"
                    @current-change="changePage"
                    @size-change="changeSize"
                />
            </div>
        </div>
    </el-dialog>
</template>

<script>
import abnormalAuthorization from './abnormal.authorization';
export default abnormalAuthorization;
</script>

<style lang="scss" scoped>
    @import '~@/styles/table.dialog.scss';
    @import './abnormal.authorization.scss';
</style>
