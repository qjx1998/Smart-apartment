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
                        <el-form-item label="楼栋名称" prop="name">
                            <el-input v-model="conditions.name" />
                        </el-form-item>
                        <el-form-item label="层数" prop="floor">
                            <el-input v-model="conditions.floor" />
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

        <div v-if="pageData" class="list">
            <div class="operations">
                <el-button type="primary" icon="el-icon-plus" size="small" @click="showInput()">
                    新增
                </el-button>
            </div>

            <el-table v-loading="loading" border stripe :data="pageData.content">
                <el-table-column label="序号" type="index" align="center" width="84px" />

                <el-table-column label="名称" align="center" prop="name" />

                <el-table-column label="层数" align="center" prop="floor" />

                <el-table-column label="备注" align="center" prop="remark" />

                <el-table-column label="操作" align="center" prop="">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                            <el-button type="primary" icon="el-icon-edit" circle @click="showInput(scope.row)" />
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
                                @click="deleteObject(scope.row.id)"
                            />
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next, jumper, sizes"
                    :total="pageData.totalElements"
                    :current-page.sync="conditions.page"
                    @current-change="changePage"
                    @size-change="changeSize"
                />
            </div>
        </div>

        <building-input
            v-if="editingObject && inputVisible"
            :editing-object="editingObject"
            @close="closeInput()"
            @reload="reload()"
        />
    </div>
</template>

<script>

export { default } from './building.list.js';
</script>

<style lang="scss" scoped>
   @import "~@/styles/baseinfo.common.scss";
   @import "./building.scss";
</style>
