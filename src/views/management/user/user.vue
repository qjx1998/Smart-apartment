<template>
    <div class="room-container container">
        <div class="filter">
            <span class="title">检索条件</span>
            <div class="conditions-operation">
                <div class="conditions">
                    <el-form
                        ref="form"
                        :model="conditions"
                        label-width="86px"
                        label-position="right"
                        size="small"
                        @keyup.enter.native="searchByConditions()"
                    >
                        <el-form-item label="用户名" prop="name">
                            <el-input v-model="conditions.accountName" />
                        </el-form-item>
                        <el-form-item label="真实姓名" prop="name">
                            <el-input v-model="conditions.name" />
                        </el-form-item>
                        <el-form-item label="状态" prop="name">
                            <el-radio v-model="conditions.state" :label="''">全部</el-radio>
                            <el-radio v-model="conditions.state" :label="userStates.IS_ACTIVE">启用</el-radio>
                            <el-radio v-model="conditions.state" :label="userStates.BANNED">禁用</el-radio>
                        </el-form-item>
                        <el-form-item label="是否管理员" prop="name">
                            <el-radio v-model="conditions.type" :label="''">全部</el-radio>
                            <el-radio v-model="conditions.type" :label="userTypes.GENERAL_USER">否</el-radio>
                            <el-radio v-model="conditions.type" :label="userTypes.ADMIN">是</el-radio>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="search">
                    <el-button
                        class="form-btn"
                        type="primary"
                        icon="el-icon-search"
                        @click="searchByConditions()"
                    >搜索
                    </el-button>
                    <el-button icon="el-icon-refresh" class="reset-btn" type="primary" @click="resetForm('form')">重置</el-button>
                </div>
            </div>
        </div>

        <div class="room-list list">
            <div class="operations">
                <el-button type="primary" icon="el-icon-plus" size="small" @click="showInputDialog()">
                    新增
                </el-button>
            </div>

            <el-table v-loading="loading" border stripe :data=" pageData ? pageData.content : []">
                <el-table-column label="序号" type="index" align="center" width="84px" />

                <el-table-column label="用户名" align="center" prop="accountName" />
                <el-table-column label="真实姓名" align="center" prop="name" />
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.state === userStates.IS_ACTIVE">启用</span>
                        <span v-if="scope.row.state === userStates.BANNED">禁用</span>
                    </template>
                </el-table-column>
                <el-table-column label="是否管理员" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type === userTypes.ADMIN">是</span>
                        <span v-else>否</span>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.createdDate">{{ scope.row.createdDate | dateFilter }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="修改时间" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.updatedDate">{{ scope.row.updatedDate | dateFilter }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="172px">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                            <el-button type="primary" icon="el-icon-edit" circle @click="showInputDialog(scope.row)" />
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="重置密码" placement="top-start">
                            <el-button
                                type="primary"
                                icon="el-icon-refresh"
                                circle
                                @click="resetUserPassword(scope.row)"
                            />
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
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
            <div v-if="pageData" class="pagination">
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

        <user-input
            v-if="inputDialogVisible && editingObject"
            :editing-object="editingObject"
            @close="closeInputDialog"
            @reload="reload"
        />

    </div>
</template>

<script>
import user from './user';
export default user;
</script>

<style lang="scss" scoped>
@import "../../../styles/baseinfo.common.scss";
@import "./user.scss";
</style>

