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
                        <el-form-item label="规则名称" prop="name">
                            <el-input v-model="conditions.name" />
                        </el-form-item>

                        <el-form-item label="级别" prop="level">
                            <el-select v-model="conditions.level">
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="level in levels.list"
                                    :key="level.code"
                                    :label="level.name"
                                    :value="level.code"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="规则状态" prop="state">
                            <el-select v-model="conditions.state">
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="push in pushes.list"
                                    :key="push.code"
                                    :label="push.name"
                                    :value="push.code"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="类别" prop="dangerType">
                            <el-select v-model="conditions.dangerType">
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="categorie in categories.list"
                                    :key="categorie.code"
                                    :label="categorie.name"
                                    :value="categorie.code"
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
                    @click="confirmExport('规则设置')"
                >
                    导出
                </el-button>
            </div>
            <el-table v-loading="loading" border stripe :data="pageData ? pageData.content : []">
                <el-table-column label="序号" type="index" align="center" width="84px" />

                <el-table-column label="规则名称" align="center" prop="dangerRule.name" />

                <el-table-column label="类别" align="center" prop="dangerRule.dangerType">
                    <template slot-scope="scope">
                        <span>{{ categories[scope.row.dangerRule.dangerType] }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="级别" align="center" prop="dangerRule.level">
                    <template slot-scope="scope">
                        <span>{{ levels[scope.row.dangerRule.level] }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="推送周期" align="center" prop="dangerRule.cronDesc" />

                <el-table-column label="规则状态" align="center" prop="dangerRule.level">
                    <template slot-scope="scope">
                        <span>{{ pushes[scope.row.dangerRule.state] }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                            <el-button type="primary" icon="el-icon-edit" circle @click="showInput(scope.row)" />
                        </el-tooltip>
                        <el-tooltip
                            v-if="scope.row.dangerRule.state === 0"
                            class="item"
                            effect="dark"
                            content="启用"
                            placement="top-start"
                        >
                            <el-button
                                type="success"
                                icon="el-icon-check"
                                circle
                                @click="updateRule(scope.row.dangerRule.id,scope.row.dangerRule.state)"
                            />
                        </el-tooltip>

                        <el-tooltip
                            v-if="scope.row.dangerRule.state === 1"
                            class="item"
                            effect="dark"
                            content="禁用"
                            placement="top-start"
                        >
                            <el-button
                                type="info"
                                icon="el-icon-check"
                                circle
                                @click="updateRule(scope.row.dangerRule.id,scope.row.dangerRule.state)"
                            />
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
                                @click="deleteObject(scope.row.dangerRule.id)"
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
                    @current-change="changePage"
                    @size-change="changeSize"
                />
            </div>
        </div>
        <rule-input
            v-if="editingObject && inputVisible"
            :editing-object="editingObject"
            :push-time="pushTime"
            @close="closeInput()"
            @reload="reload()"
        />
    </div>
</template>

<script>
export { default } from './rule';
</script>

<style lang="scss" scoped>
    @import "~@/styles/baseinfo.common.scss";
    @import './rule.scss';
</style>
