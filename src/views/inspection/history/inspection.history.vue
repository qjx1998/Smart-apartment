<template>
    <div class="container">
        <div class="filter">
            <span class="title">检索条件</span>
            <div class="conditions-operation">
                <div class="conditions">
                    <el-form
                        ref="form"
                        :model="conditions"
                        :rules="formRules"
                        label-width="84px"
                        label-position="right"
                        size="small"
                        @keyup.enter.native="searchByConditions()"
                    >
                        <el-form-item label="姓名" prop="subjectName">
                            <el-input v-model="conditions.subjectName" />
                        </el-form-item>
                        <el-form-item label="楼栋" prop="buildingId">
                            <el-select v-model="conditions.buildingId" filterable @change="onBuildingChanged">
                                <el-option
                                    v-for="building in buildings"
                                    :key="building.id"
                                    :label="building.name"
                                    :value="building.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="宿舍" prop="roomId">
                            <el-select v-model="conditions.roomId" filterable>
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="room in roomsInBuilding"
                                    :key="room.id"
                                    :label="room.name"
                                    :value="room.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="学校" prop="collegeId">
                            <el-select v-model="conditions.collegeId" filterable>
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="college in colleges"
                                    :key="college.id"
                                    :label="college.name"
                                    :value="college.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="院系" prop="instituteId">
                            <el-select
                                v-model="conditions.instituteId"
                                filterable
                                :disabled="instituteSelectorDisabled"
                            >
                                <el-option :label="instituteSelectorDisabled ? '请先选择学校': '全部'" value="" />
                                <el-option
                                    v-for="institute in institutesInCollege"
                                    :key="institute.id"
                                    :label="institute.name"
                                    :value="institute.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="班级" prop="classId">
                            <el-select
                                v-model="conditions.classId"
                                filterable
                                :disabled="classOrDepartmentSelectorDisabled"
                            >
                                <el-option :label="classOrDepartmentSelectorDisabled ? '请先选择院系': '全部'" value="" />
                                <el-option
                                    v-for="clazz in classesInInstitute"
                                    :key="clazz.id"
                                    :label="clazz.name"
                                    :value="clazz.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="部门" prop="departmentId">
                            <el-select
                                v-model="conditions.departmentId"
                                filterable
                                :disabled="classOrDepartmentSelectorDisabled"
                            >
                                <el-option :label="classOrDepartmentSelectorDisabled ? '请先选择院系': '全部'" value="" />
                                <el-option
                                    v-for="department in departmentsInInstitute"
                                    :key="department.id"
                                    :label="department.name"
                                    :value="department.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="访客来源" prop="visitorSource">
                            <el-input v-model="conditions.visitorSource" />
                        </el-form-item>
                        <el-form-item label="起始日期" prop="beginDate">
                            <el-date-picker
                                ref="beginDate"
                                v-model="conditions.beginDate"
                                type="date"
                                placeholder="选择开始日期"
                                value-format="yyyy-MM-ddTHH:mm:ss"
                            />
                        </el-form-item>
                        <el-form-item label="终止日期" prop="endDate">
                            <el-date-picker
                                ref="endDate"
                                v-model="conditions.endDate"
                                type="date"
                                placeholder="选择结束日期"
                                value-format="yyyy-MM-ddTHH:mm:ss"
                            />
                        </el-form-item>
                        <el-form-item class="operator-input" label="在寝天数" prop="presentOperator">
                            <el-select v-model="conditions.presentOperator" filterable class="operator">
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="operator in MATH_OPERATORS"
                                    :key="operator.code"
                                    :value="operator.code"
                                    :label="operator.symbol"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item class="days-input" prop="presentValue">
                            <el-input-number v-model="conditions.presentValue" class="days" :max="7" :min="1" />
                        </el-form-item>

                        <el-form-item label="日期选项">
                            <el-select v-model="dateOption" filterable @change="setTime">
                                <el-option label="本月" value="thisMonth" />
                                <el-option label="本周" value="thisWeek" />
                                <el-option label="上周" value="lastWeek" />
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>

                <div class="search">
                    <el-button
                        class="form-btn"
                        type="primary"
                        icon="el-icon-search"
                        @click="search"
                    >
                        搜索
                    </el-button>
                    <el-button icon="el-icon-refresh" class="reset-btn" type="primary" @click="resetConditions()">
                        重置
                    </el-button>
                </div>
            </div>
        </div>

        <div class="list">
            <div class="operations">
                <el-button type="primary" size="small" @click="confirmExportInspections()">导出</el-button>
            </div>
            <el-table v-loading="loading" border stripe :data="pageData ? pageData.content : []">
                <el-table-column label="序号" type="index" align="center" width="84px" />
                <el-table-column label="姓名" prop="subject.name" align="center">
                    <span
                        slot-scope="scope"
                        class="abnormal"
                        @click="showSubjectDetail(scope.row.subject)"
                    >{{ scope.row.subject.name }}</span>
                </el-table-column>
                <el-table-column label="性别" align="center">
                    <span slot-scope="scope">{{ subjectGenders[scope.row.subject.gender] }}</span>
                </el-table-column>
                <el-table-column label="类别" align="center">
                    <span slot-scope="scope">{{ subjectTypes[scope.row.subject.type] }}</span>
                </el-table-column>
                <el-table-column label="手机号" align="center" prop="subject.phone" />
                <el-table-column align="center" label="宿舍">
                    <span slot-scope="scope">{{ (scope.row.building.name ? scope.row.building.name : '') + ((scope.row.room && scope.row.room.name) ? scope.row.room.name.toString() : '') }}</span>
                </el-table-column>
                <el-table-column label="备注">
                    <remark slot-scope="scope" :subject-type="subjectTypes" :subject="scope.row.subject" />
                </el-table-column>
                <el-table-column label="在寝天数" prop="history.presentTotal" align="center" />
                <el-table-column label="查看明细" align="center">
                    <template slot-scope="slot">
                        <el-tooltip content="查看明细" placement="top">
                            <el-button
                                type="primary"
                                icon="el-icon-view"
                                circle
                                @click="openHistoryStatic(slot.row.subject)"
                            />
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next, jumper, sizes"
                    :current-page="conditions.page"
                    :total="pageData ? pageData.totalElements : 0"
                    @current-change="changePage"
                    @size-change="changeSize"
                />
            </div>
        </div>
        <history-static
            v-if="showHistoryStatic"
            :search-conditions="staticConditions"
            :subject-name="selectedSubject.name"
            @close="closeHistoryStatic()"
        />

        <subject-detail v-if="subjectDetailVisible" :subject="showingSubject" :buildings="buildings" @close="hideSubjectDetail()" />

    </div>
</template>

<script>
import weekly from './inspection.history.js';

export default weekly;
</script>

<style lang="scss" scoped>
  @import "./inspection.history.scss";
  @import '~@/styles/baseinfo.common.scss';
</style>
