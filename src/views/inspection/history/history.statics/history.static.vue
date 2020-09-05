<template>
    <el-dialog :visible="true" :title="`${subjectName}在寝明细`" @close="close()">
        <div class="container">
            <div class="header">

                <el-form
                    ref="detailForm"
                    :rules="formRules"
                    :model="conditions"
                    label-width="84px"
                    label-position="right"
                    size="small"
                    @keyup.enter.native="searchByConditions()"
                >
                    <el-form-item label="开始日期" prop="beginDate">
                        <el-date-picker
                            ref="beginDate"
                            v-model="conditions.beginDate"
                            type="date"
                            placeholder="选择开始日期"
                            value-format="yyyy-MM-ddTHH:mm:ss"
                        />
                    </el-form-item>
                    <el-form-item label="结束日期" prop="endDate">
                        <el-date-picker
                            ref="endDate"
                            v-model="conditions.endDate"
                            type="date"
                            placeholder="选择结束日期"
                            value-format="yyyy-MM-ddTHH:mm:ss"
                        />
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="conditions.present" filterable>
                            <el-option label="全部" value="" />
                            <el-option label="在寝" :value="SubjectDef.IS_PRESENT.YES" />
                            <el-option label="不在寝" :value="SubjectDef.IS_PRESENT.NO" />
                        </el-select>
                    </el-form-item>
                </el-form>

                <div class="btns">
                    <el-button
                        type="primary"
                        class="search-btn"
                        size="small"
                        @click="pagingPersonHistoryPresentRecord"
                    >搜索</el-button>
                    <el-button
                        type="primary"
                        class="reset-btn"
                        size="small"
                        @click="resetConditionsDate()"
                    >重置</el-button>
                </div>
            </div>
            <div class="list">
                <el-table v-loading="loading" border stripe :data="pageData ? pageData.content : []">
                    <el-table-column label="序号" type="index" align="center" width="84px" />
                    <el-table-column label="日期" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.inspectionDate.split('T')[0] }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="在寝状态" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.present === SubjectDef.IS_PRESENT.YES">在寝</span>
                            <span v-if="scope.row.present === SubjectDef.IS_PRESENT.NO">未归</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div v-if="pageData" class="pagination">
                    <el-pagination
                        background
                        layout="total, prev, pager, next, jumper, sizes"
                        :current-page="conditions.page"
                        :total="pageData.totalElements"
                        @current-change="changePage"
                        @size-change="changeSize"
                    />
                </div>
            </div>
        </div>

    </el-dialog>
</template>

<script>
import historyStatics from './history.static';

export default historyStatics;
</script>

<style lang="scss" scoped>
    @import './history.static.scss';
</style>
