<template>
    <div class="container">
        <div class="filter">
            <span class="title">检索条件</span>
            <div class="conditions-operation">
                <div class="conditions">
                    <el-form
                        ref="form"
                        :model="conditions"
                        label-width="80px"
                        label-position="right"
                        size="small"
                        @keyup.enter.native="searchByConditions()"
                    >
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="conditions.name" />
                        </el-form-item>
                        <el-form-item label="楼栋" prop="buildingId">
                            <el-select v-model="conditions.buildingId" filterable>
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="building in buildings"
                                    :key="building.id"
                                    :label="building.name"
                                    :value="building.id"
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
                        <el-form-item label="异常评级" prop="dangerLevel">
                            <el-select v-model="conditions.dangerLevel" filterable>
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="dangerLevel in DANGER_CODE.LIST"
                                    :key="dangerLevel.code"
                                    :label="dangerLevel.name"
                                    :value="dangerLevel.code"
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
                    <el-button icon="el-icon-refresh" class="reset-btn" type="primary" @click="resetForm()">重置
                    </el-button>
                </div>
            </div>
        </div>

        <div class="list">
            <div class="operations">
                <el-button type="primary" size="small" @click="confirmExport('连续多日未出人员')">
                    导出
                </el-button>
            </div>

            <el-table v-loading="loading" border stripe :data="pageData ? pageData.content : []">
                <el-table-column align="center" label="序号" type="index" width="84px" />
                <el-table-column align="center" label="姓名" prop="subject.name">
                    <span
                        slot-scope="scope"
                        class="abnormal"
                        @click="showSubjectDetail(scope.row.subject)"
                    >{{ scope.row.subject.name }}</span>
                </el-table-column>
                <el-table-column align="center" label="性别" prop="subject.gender">
                    <span slot-scope="scope">{{ SUBJECT_GENDERS[scope.row.subject.gender] }}</span>
                </el-table-column>
                <el-table-column align="center" label="手机号" prop="subject.phone" />
                <el-table-column align="center" label="宿舍">
                    <span slot-scope="scope">{{ (scope.row.building.name ? scope.row.building.name : '') + ((scope.row.room && scope.row.room.name) ? scope.row.room.name.toString() : '') }}</span>
                </el-table-column>
                <el-table-column align="center" label="备注" width="204px">
                    <remark slot-scope="scope" :subject-type="subjectTypes" :subject="scope.row.subject" />
                </el-table-column>
                <el-table-column align="center" label="连续未出天数" prop="dangerBehaviorDays" />
                <el-table-column align="center" label="最近进入时间" prop="lastCaptureDate">
                    <span slot-scope="scope">{{ scope.row.lastCaptureDate | dateFilter }}</span>
                </el-table-column>
                <el-table-column label="异常评级" align="center">
                    <span slot-scope="scope">{{ DANGER_CODE[scope.row.dangerLevel] }}</span>
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

        <subject-detail v-if="subjectDetailVisible" :subject="showingSubject" :buildings="buildings" @close="hideSubjectDetail()" />
    </div>
</template>

<script>
import continuousIn from './continuous.in';

export default continuousIn;
</script>

<style lang="scss" scoped>
    @import '~@/styles/baseinfo.common.scss';
    @import './continuous.in.scss';
</style>
