<template>
    <div class="container">
        <div class="filter">
            <span class="title">检索条件</span>
            <div class="conditions-operation">
                <div class="conditions">
                    <el-form
                        ref="form"
                        :model="conditions"
                        label-width="120px"
                        label-position="right"
                        size="small"
                        @keyup.enter.native="searchByConditions()"
                    >
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="conditions.name" />
                        </el-form-item>
                        <el-form-item label="手机" prop="phone">
                            <el-input v-model="conditions.phone" />
                        </el-form-item>
                        <el-form-item label="宿舍" prop="roomName">
                            <el-input v-model="conditions.roomName" />
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="conditions.gender" filterable>
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="gender in CONSTANTS.SUBJECT_GENDER.list"
                                    :key="gender.code"
                                    :label="gender.name"
                                    :value="gender.code"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="审核状态" prop="auditState">
                            <el-select v-model="conditions.auditState" filterable>
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="auditState in CONSTANTS.AUDIT_STATE.list"
                                    :key="auditState.code"
                                    :label="auditState.name"
                                    :value="auditState.code"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="申请提交时间" prop="timeFrameOfApply">
                            <el-select v-model="conditions.timeFrameOfApply" filterable>
                                <el-option
                                    v-for="time in CONSTANTS.APPLY_COMMIT_TIME.list"
                                    :key="time.code"
                                    :label="time.name"
                                    :value="time.code"
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
                    <el-button icon="el-icon-refresh" class="reset-btn" type="primary" @click="resetForm('form')">重置</el-button>
                </div>
            </div>
        </div>

        <div class="list">
            <div class="operations" />

            <el-table v-loading="loading" border stripe :data="pageData ? pageData.content : []">
                <el-table-column label="序号" type="index" align="center" width="84px" />

                <el-table-column label="姓名" align="center" prop="visitorApplyRecord.subject.name" />

                <el-table-column label="性别" align="center" prop="visitorApplyRecord.subject.gender">
                    <span slot-scope="apply">
                        {{ CONSTANTS.SUBJECT_GENDER[apply.row.visitorApplyRecord.subject.gender] }}
                    </span>
                </el-table-column>

                <el-table-column label="分配宿舍" align="center" prop="visitorApplyRecord.room.name" />
                <el-table-column label="联系电话" align="center" prop="visitorApplyRecord.subject.phone" />
                <el-table-column label="申请拜访时间段" align="center" width="180px">.
                    <span slot-scope="apply">{{ formatVisitTime(apply.row.visitorApplyRecord.recogStartTime, apply.row.visitorApplyRecord.recogEndTime) }}</span>
                </el-table-column>
                <el-table-column label="申请提交时间" align="center" prop="visitorApplyRecord.createdDate" width="180px">
                    <span slot-scope="apply">{{ apply.row.visitorApplyRecord.createdDate | dateFilter }}</span>
                </el-table-column>
                <el-table-column label="申请天数" align="center" prop="totalDays" />
                <el-table-column label="审核状态" align="center" prop="visitorApplyRecord.auditState">
                    <span slot-scope="apply">{{ CONSTANTS.AUDIT_STATE[apply.row.visitorApplyRecord.auditState] }}</span>
                </el-table-column>
                <el-table-column label="操作" align="center" prop="" width="150px">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="查看" placement="top-start">
                            <el-button
                                type="primary"
                                icon="el-icon-view"
                                circle
                                @click="showAudit(scope.row, 'view')"
                            />
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="审核" placement="top-start">
                            <el-button
                                v-if="scope.row.visitorApplyRecord.auditState === CONSTANTS.AUDIT_STATE.AUDITING"
                                type="primary"
                                circle
                                @click="showAudit(scope.row, 'audit')"
                            >
                                <svg-icon icon-class="audit" />
                            </el-button>
                        </el-tooltip>
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
        <visitor-apply-detail
            v-if="applyVisible"
            :mode="viewOrAudit"
            :application="currentApply"
            :total-days="totalDays"
            @close="closeAudit()"
            @reload="reload()"
        />
    </div>
</template>

<script>
export { default } from './visitor.audit';
</script>

<style lang="scss" scoped>
    @import "~@/styles/baseinfo.common.scss";
    @import "./visitor.audit.scss";
</style>
