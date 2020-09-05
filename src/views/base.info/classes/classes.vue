<template>
    <div class="room-container container">
        <div class="header">
            <div class="building-selector">
                <el-form label-width="40px" label-position="right">
                    <el-form-item label="学校" prop="collegeId">
                        <el-select v-model="conditions.collegeId" filterable>
                            <el-option
                                v-for="collegeList in collegeLists"
                                :key="collegeList.id"
                                :label="collegeList.name"
                                :value="collegeList.id"
                            />
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>

            <div class="filter">
                <span class="title">检索条件</span>
                <div class="conditions-operation">
                    <div class="conditions">
                        <el-form
                            ref="form"
                            label-width="80px"
                            label-position="right"
                            size="small"
                            :model="conditions"
                            @keyup.enter.native="searchByConditions()"
                        >
                            <el-form-item label="名称" prop="name">
                                <el-input v-model="conditions.name" />
                            </el-form-item>

                            <el-form-item label="年级" prop="gradeId">
                                <el-select v-model="conditions.gradeId" filterable>
                                    <el-option label="全部" value="" />
                                    <el-option
                                        v-for="allGrade in allGrades"
                                        :key="allGrade.id"
                                        :label="allGrade.name"
                                        :value="allGrade.id"
                                    />
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
        </div>

        <div class="data">
            <div class="institute">
                <el-scrollbar class="floors">
                    <div v-if="!institutes || !institutes.length" class="floor">暂无数据</div>
                    <div
                        v-for="institute in institutes"
                        :key="institute.id"
                        class="floor"
                        :class="{selected: conditions.instituteId === institute.id}"
                        :label="institute.name"
                        :value="institute.id"
                        @click="addClass(institute.id)"
                    >{{ institute.name }}
                    </div>
                </el-scrollbar>
            </div>

            <div class="room-list list">
                <div class="operations">
                    <el-button
                        size="small"
                        type="primary"
                        icon="el-icon-plus"
                        class="add-btn"
                        @click="showInput()"
                    >
                        新增
                    </el-button>
                    <el-button
                        size="small"
                        type="primary"
                        icon="el-icon-plus"
                        class="operation-btn"
                        @click="confirmExport('班级')"
                    >
                        导出
                    </el-button>
                </div>

                <el-table border stripe :data="pageData ? pageData.content : []">

                    <el-table-column label="序号" type="index" align="center" />

                    <el-table-column label="名称" align="center" prop="clazz.name" />

                    <el-table-column label="年级" align="center" prop="clazz.grade.name" />

                    <el-table-column label="班主任" align="center" prop="user.name" />

                    <el-table-column label="备注" align="center" prop="clazz.remark" />

                    <el-table-column label="更新时间" align="center" prop="clazz.updatedDate">
                        <template slot-scope="scope">
                            <span>{{ scope.row.clazz.updatedDate ? scope.row.clazz.updatedDate.replace('T',' ') : undefined }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                                <el-button
                                    type="primary"
                                    icon="el-icon-edit"
                                    circle
                                    @click="showInput(scope.row.clazz)"
                                />
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                                <el-button
                                    type="danger"
                                    icon="el-icon-delete"
                                    circle
                                    @click="deleteObject(scope.row.clazz.id)"
                                />
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
        </div>
        <classes-input
            v-if="editingObject && inputVisible"
            :editing-object="editingObject"
            :college-lists="collegeLists"
            :all-grades="allGrades"
            :selected-college="selectedCollege"
            :selected-institute="selectedInstitute"
            @close="closeInput()"
            @reload="reload()"
        />
    </div>
</template>

<script>
export { default } from './classes.js';
</script>

<style lang="scss" scoped>
    @import "~@/styles/baseinfo.common.scss";
    @import "./classes.scss";
</style>
