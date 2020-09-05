<template>
    <el-dialog :visible="true" width="1282px" :title="title" @close="close()">
        <div class="container">
            <div class="filter">
                <span class="title">检索条件</span>
                <div class="conditions-operation">
                    <div class="conditions">

                        <el-form
                            ref="form"
                            :model="conditions"
                            label-width="98px"
                            label-position="right"
                            size="small"
                            @keyup.enter.native="searchByConditions()"
                        >
                            <el-form-item label="姓名" prop="name">
                                <el-input v-model="conditions.name" />
                            </el-form-item>
                            <el-form-item label="性别" prop="gender">
                                <el-select v-model="conditions.gender" filterable>
                                    <el-option label="全部" value="" />
                                    <el-option
                                        v-for="gender in genders.list"
                                        :key="gender.code"
                                        :label="gender.name"
                                        :value="gender.code"
                                    />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="类别" prop="type">
                                <el-select v-model="conditions.type" filterable>
                                    <el-option label="全部" value="" />
                                    <el-option
                                        v-for="type in subjectTypes.list"
                                        :key="type.code"
                                        :label="type.name"
                                        :value="type.code"
                                    />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="楼栋" prop="buildingId">
                                <el-select v-model="conditions.buildingId" filterable @change="handleBuildingChanged">
                                    <el-option label="全部" value="" />
                                    <el-option
                                        v-for="build in buildings"
                                        :key="build.id"
                                        :label="build.name"
                                        :value="build.id"
                                    />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="宿舍" prop="roomId">
                                <el-select
                                    v-model="conditions.roomId"
                                    filterable
                                    :disabled="roomSelectorDisabled"
                                    :placeholder="roomSelectorDisabled ? '请先选择楼栋': '全部'"
                                >
                                    <el-option label="全部" value="" />
                                    <el-option label="未分配" :value="un_Distributed_Room" />
                                    <el-option
                                        v-for="room in roomsInBuilding"
                                        :key="room.id"
                                        :label="room.name"
                                        :value="room.id"
                                    />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="手机号" prop="phone">
                                <el-input v-model="conditions.phone" />
                            </el-form-item>
                            <el-form-item label="学号/工号" prop="opid">
                                <el-input v-model="conditions.opid" />
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
                                <el-select v-model="conditions.instituteId" filterable :disabled="instituteSelectorDisabled">
                                    <el-option label="全部" value="" />
                                    <el-option
                                        v-for="institute in institutesInCollege"
                                        :key="institute.id"
                                        :label="institute.name"
                                        :value="institute.id"
                                    />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="班级" prop="classId">
                                <el-select v-model="conditions.classId" filterable :disabled="classOrDepartmentSelectorDisabled">
                                    <el-option label="全部" value="" />
                                    <el-option
                                        v-for="clazz in classesInInstitute"
                                        :key="clazz.id"
                                        :label="clazz.name"
                                        :value="clazz.id"
                                    />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="部门" prop="departmentId">
                                <el-select v-model="conditions.departmentId" filterable :disabled="classOrDepartmentSelectorDisabled">
                                    <el-option label="全部" value="" />
                                    <el-option
                                        v-for="department in departmentsInInstitute"
                                        :key="department.id"
                                        :label="department.name"
                                        :value="department.id"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-form>

                    </div>
                    <div class="search" @click="paging">
                        <el-button
                            class="form-btn"
                            type="primary"
                            icon="el-icon-search"
                            @click="searchByConditions"
                        >搜索
                        </el-button>
                        <el-button icon="el-icon-refresh" class="reset-btn" type="primary" @click="resetForm('form')">重置
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="room-list list">
                <div class="operations">
                    <el-button type="primary" icon="el-icon-plus" size="small" @click="addSubjectsToDeviceGroup()">
                        执行授权
                    </el-button>
                </div>

                <el-table
                    v-loading="loading"
                    border
                    stripe
                    :row-key="getRowKey"
                    :data="pageData ? pageData.content : []"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" align="center" :reserve-selection="true" />
                    <el-table-column align="center" type="index" label="序号" width="84px" />
                    <el-table-column label="姓名" align="center" prop="subject.name" />
                    <el-table-column label="性别" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.subject.gender === genders.MALE">
                                男
                            </span>
                            <span v-if="scope.row.subject.gender === genders.FEMALE">
                                女
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="宿舍" align="center">
                        <span slot-scope="scope">{{ getFullRoomName(scope.row.building.name, scope.row.room.name) }}</span>
                    </el-table-column>
                    <el-table-column label="备注" align="center" width="204px">
                        <remark slot-scope="scope" :subject-type="subjectTypes" :subject="scope.row.subject" />
                    </el-table-column>

                    <el-table-column label="类别" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.subject.type === subjectTypes.EMPLOYEE">教职工</span>
                            <span v-if="scope.row.subject.type === subjectTypes.STUDENT">学生</span>
                            <span v-if="scope.row.subject.type === subjectTypes.VISITOR">访客</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div v-if="pageData" class="pagination">
                    <el-pagination
                        background
                        layout="total, prev, pager, next, jumper"
                        :total="pageData ? pageData.totalElements : 0"
                        :current-page.sync="conditions.page"
                        @current-change="changePage"
                        @size-change="changeSize"
                    />
                </div>
            </div>

        </div>
    </el-dialog>
</template>

<script>
import addSubjects from './add.subjects';

export default addSubjects;
</script>

<style lang="scss" scoped>
    @import "~@/styles/baseinfo.common.scss";
    @import "./add.subjects.scss";
</style>
