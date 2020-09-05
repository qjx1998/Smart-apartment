<template>
    <el-dialog :visible="true" title="人员信息" @close="close()">
        <div class="content">
            <div class="header clearfix">
                <el-button type="primary" size="mini" class="export-btn" @click="exportSubjects()">导出excel</el-button>
            </div>

            <el-table
                v-loading="loading"
                stripe
                border
                :data="pageData ? pageData.content : []"
                empty-text="没有数据"
            >
                <el-table-column label="序号" type="index" align="center" />
                <el-table-column label="姓名" align="center" prop="subject.name" />
                <el-table-column label="性别" align="center">
                    <span slot-scope="scope">{{ subjectGenders[scope.row.subject.gender] }}</span>
                </el-table-column>
                <el-table-column label="类别" align="center">
                    <span slot-scope="scope">{{ subjectTypes[scope.row.subject.type] }}</span>
                </el-table-column>
                <el-table-column label="手机号" align="center" prop="subject.phone" />
                <el-table-column align="center" label="宿舍">
                    <span slot-scope="scope">{{ (scope.row.building.name ? scope.row.building.name : '') + ((scope.row.room && scope.row.room.name) ? scope.row.room.name.toString() : '') }}</span>
                </el-table-column>
                <el-table-column label="备注" width="204px">
                    <remark slot-scope="scope" :subject-type="subjectTypes" :subject="scope.row.subject" />
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next, jumper, sizes"
                    :current-page.sync="conditions.page"
                    :total="pageData ? pageData.totalElements : 0"
                    @current-change="changePage"
                    @size-change="changeSize"
                />
            </div>
        </div>
    </el-dialog>
</template>

<script>
import dialog from './dialog';

export default dialog;
</script>

<style lang="scss" scoped>
  @import "./dialog.scss";
</style>
