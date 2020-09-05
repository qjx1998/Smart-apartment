<template>
    <div class="container">
        <div class="filter">
            <span class="title">检索条件</span>
            <div class="conditions-operation clearfix">
                <div class="conditions">
                    <el-form
                        ref="form"
                        :model="conditions"
                        label-width="80px"
                        label-position="right"
                        size="small"
                        @keyup.enter.native="searchByConditions()"
                    >
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="conditions.name" />
                        </el-form-item>

                        <el-form-item label="所属学校" prop="collegeId" filterable>
                            <el-select v-model="conditions.collegeId" filterable>
                                <el-option label="全部" value="" />
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

        <div class="list">
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
                    @click="confirmExport('院系')"
                >
                    导出
                </el-button>
            </div>
            <el-table v-loading="loading" border stripe :data="pageData ? pageData.content : []">
                <el-table-column label="序号" type="index" align="center" width="84px" />

                <el-table-column label="名称" align="center" prop="institute.name" />

                <el-table-column label="所属学校" align="center" prop="institute.college.name" />

                <el-table-column label="创办年月" align="center" prop="institute.created">
                    <template slot-scope="scope">
                        <span>{{ scope.row.institute.created ? scope.row.institute.created.slice(0,7) : undefined }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="负责人" align="center" prop="user.name" />

                <el-table-column label="备注" align="center" prop="institute.remark" />

                <el-table-column label="更新时间" align="center" prop="institute.updatedDate">
                    <template slot-scope="scope">
                        <span>{{ scope.row.institute.updatedDate ? scope.row.institute.updatedDate.replace('T',' ') : undefined }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                            <el-button type="primary" icon="el-icon-edit" circle @click="showInput(scope.row.institute)" />
                        </el-tooltip>
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="删除"
                            placement="top-start"
                        >
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                circle
                                @click="deleteObject(scope.row.institute.id)"
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
        <faculty-input
            v-if="editingObject && inputVisible"
            :editing-object="editingObject"
            :college-lists="collegeLists"
            :editing-college="editingCollege"
            :leads="leads"
            @close="closeInput()"
            @reload="reload()"
        />
    </div>
</template>

<script>
export { default } from './faculty';
</script>

<style lang="scss" scoped>
    @import "~@/styles/baseinfo.common.scss";
    @import './faculty.scss';
</style>
