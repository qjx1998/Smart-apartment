<template>
    <el-dialog :visible="true" :title="subjectName + '晚归明细'" @close="close()">
        <div class="list">
            <el-table v-loading="loading" border stripe :data="pageData ? pageData.content : []">
                <el-table-column align="center" label="序号" type="index" width="84px" />
                <el-table-column align="center" label="晚归日期" prop="date">
                    <span slot-scope="scope">{{ scope.row.date.replace('T00:00:00', '') }}</span>
                </el-table-column>
                <el-table-column align="center" label="晚归时间" prop="captureTime">
                    <span slot-scope="scope">{{ scope.row.captureTime | dateFilter }}</span>
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
    </el-dialog>
</template>

<script>
import lateHistory from './late.history';
export default lateHistory;
</script>

<style lang="scss" scoped>
    @import '~@/styles/baseinfo.common.scss';
    @import './late.history.scss';
</style>
