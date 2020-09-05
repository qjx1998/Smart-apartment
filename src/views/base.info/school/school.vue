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
                    @click="confirmExport('学校')"
                >
                    导出
                </el-button>
            </div>
            <el-table v-loading="loading" border stripe :data="pageData ? pageData.content : []">
                <el-table-column label="序号" type="index" align="center" width="84px" />

                <el-table-column label="名称" align="center" prop="college.name" />

                <el-table-column label="创办年月" align="center" prop="college.created">
                    <template slot-scope="scope">
                        <span>{{ scope.row.college.created ? scope.row.college.created.slice(0,7) : undefined }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="地址" align="center" prop="college.address" />

                <el-table-column label="负责人" align="center" prop="user.name" />

                <el-table-column label="备注" align="center" prop="college.remark" />

                <el-table-column label="更新时间" align="center" prop="college.updatedDate">
                    <template slot-scope="scope">
                        <span>{{ scope.row.college.updatedDate ? scope.row.college.updatedDate.replace('T',' ') : undefined }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                            <el-button type="primary" icon="el-icon-edit" circle @click="showInput(scope.row.college)" />
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
                                @click="deleteObject(scope.row.college.id)"
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
        <school-input
            v-if="editingObject && inputVisible"
            :editing-object="editingObject"
            :leads="leads"
            @close="closeInput()"
            @reload="reload()"
        />
    </div>
</template>

<script>
export { default } from './school.js';
</script>

<style lang="scss" scoped>
    @import "~@/styles/baseinfo.common.scss";
    @import "./school.scss";
</style>
