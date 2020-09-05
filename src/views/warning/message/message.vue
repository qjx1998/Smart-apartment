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
                        <el-form-item label="规则名称" prop="ruleId">
                            <el-select v-model="conditions.ruleId" filterable>
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="rule in rules"
                                    :key="rule.id"
                                    :label="rule.name"
                                    :value="rule.id"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="类别" prop="dangerType">
                            <el-select v-model="conditions.dangerType">
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="category in categories.lists"
                                    :key="category.code"
                                    :label="category.name"
                                    :value="category.code"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="级别" prop="level">
                            <el-select v-model="conditions.level">
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="level in levels.lists"
                                    :key="level.code"
                                    :label="level.name"
                                    :value="level.code"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="推送状态" prop="pushState">
                            <el-select v-model="conditions.pushState">
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="push in pushes.lists"
                                    :key="push.code"
                                    :label="push.name"
                                    :value="push.code"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="推送用户" prop="targetUserId">
                            <el-select v-model="conditions.targetUserId" filterable>
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="user in pushUsers"
                                    :key="user.id"
                                    :label="user.name"
                                    :value="user.id"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="日期选项" prop="dateOption">
                            <el-select v-model="conditions.dateOption">
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="date in dates.lists"
                                    :key="date.code"
                                    :label="date.name"
                                    :value="date.code"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="开始时间" class="input-item" prop="beginTime">
                            <el-date-picker
                                v-model="conditions.beginTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-ddTHH:mm:ss"
                                style="width: 100%"
                            />
                        </el-form-item>

                        <el-form-item label="结束时间" class="input-item dateWidth" prop="endTime">
                            <el-date-picker
                                v-model="conditions.endTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-ddTHH:mm:ss"
                                style="width: 100%"
                            />
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
                    class="operation-btn"
                    @click="confirmExport('告警信息')"
                >
                    导出
                </el-button>
            </div>
            <el-table v-loading="loading" border stripe :data="pageData ? pageData.content : []">
                <el-table-column label="序号" type="index" align="center" width="84px" />

                <el-table-column label="级别" align="center" prop="dangerMessage.rule.level">
                    <template slot-scope="scope">
                        <span>{{ levels[scope.row.dangerMessage.rule.level] }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="内容" align="center" prop="dangerMessage.content.content" />

                <el-table-column label="类别" align="center" prop="dangerMessage.rule.dangerType">
                    <template slot-scope="scope">
                        <span>{{ categories[scope.row.dangerMessage.rule.dangerType] }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="推送时间" align="center" prop="dangerMessage.updatedDate">
                    <template slot-scope="scope">
                        <span>{{ scope.row.dangerMessage.updatedDate ? scope.row.dangerMessage.updatedDate.replace('T',' ') : undefined }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="推送用户" align="center" prop="user.name" />

                <el-table-column label="规则名称" align="center" prop="dangerMessage.rule.name" />

                <el-table-column label="推送状态" align="center" prop="dangerMessage.pushState">
                    <template slot-scope="scope">
                        <span>{{ pushState[scope.row.dangerMessage.pushState] }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-tooltip
                            v-if="scope.row.dangerMessage.state === 3"
                            class="item"
                            effect="dark"
                            content="重新推送"
                            placement="top-start"
                        >
                            <el-button
                                type="success"
                                icon="el-icon-message"
                                circle
                                @click="rePush(scope.row.dangerMessage.id)"
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
    </div>
</template>

<script>
export { default } from './message';
</script>

<style lang="scss" scoped>
    @import "~@/styles/baseinfo.common.scss";
    @import './message.scss';
</style>
