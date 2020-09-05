<template>
    <el-dialog :visible="true" title="抓拍记录" @close="close()">
        <div class="content">
            <el-table
                v-loading="loading"
                stripe
                border
                :data="pageData ? pageData.content : []"
                empty-text="没有数据"
            >
                <el-table-column label="抓拍照片" align="center">
                    <template slot-scope="scope">
                        <img :src="baseImageUrl + scope.row.historyRecord.captureImgUrl" class="capture-img">
                    </template>
                </el-table-column>
                <el-table-column label="识别照片" align="center">
                    <template slot-scope="scope">
                        <img
                            v-if="scope.row.historyRecord.subject"
                            :src="baseImageUrl + scope.row.historyRecord.subject.photoUrl"
                            class="capture-img"
                        >
                    </template>
                </el-table-column>
                <el-table-column label="姓名" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.historyRecord.subject ? scope.row.historyRecord.subject.name : '-' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="用户信息" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.building">{{ scope.row.building.name }}</span>
                        <span v-if="scope.row.room">#{{ scope.row.room.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="抓拍位置" align="center" prop="historyRecord.monitor.name" />
                <el-table-column label="识别结果" align="center">
                    <template slot-scope="scope">
                        <span>
                            {{ scope.row.historyRecord.subject ? getSubjectType(scope.row.historyRecord.subject.type) : '陌生人' }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="抓拍时间" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.historyRecord.captureTime.replace('T', ' ') }}</span>
                    </template>
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
import history from './history';

export default history;
</script>

<style lang="scss" scoped>
  @import "./history.scss";
</style>
