<template>
    <div class="container">
        <div class="filter">
            <span class="title">检索条件</span>
            <div class="conditions-operation">
                <div class="conditions">
                    <el-form
                        ref="form"
                        :model="conditions"
                        label-width="85px"
                        label-position="right"
                        size="small"
                        @keyup.enter.native="searchByConditions()"
                    >
                        <el-form-item label="设备名称" prop="name">
                            <el-input v-model="conditions.name" />
                        </el-form-item>
                        <el-form-item label="设备类型" prop="type">
                            <el-select v-model="conditions.type" filterable>
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="type in deviceDefs.TYPES.list"
                                    :key="type.code"
                                    :label="type.name"
                                    :value="type.code"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="设备组" prop="groupId">
                            <el-select v-model="conditions.groupId" filterable>
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="deviceGroup in deviceGroups"
                                    :key="deviceGroup.id"
                                    :label="deviceGroup.name"
                                    :value="deviceGroup.id"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="通行方向" prop="direction">
                            <el-select v-model="conditions.direction" filterable>
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="direction in deviceDefs.DIRECTIONS.list"
                                    :key="direction.code"
                                    :label="direction.name"
                                    :value="direction.code"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="在线情况" prop="online">
                            <el-select v-model="conditions.online" filterable>
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="status in deviceDefs.ONLINE_STATUSES.list"
                                    :key="status.code"
                                    :label="status.name"
                                    :value="status.code"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="状态" prop="state">
                            <el-select v-model="conditions.state" filterable>
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="state in deviceDefs.STATES.list"
                                    :key="state.code"
                                    :label="state.name"
                                    :value="state.code"
                                />
                            </el-select>
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
                    <el-button
                        icon="el-icon-refresh"
                        class="reset-btn"
                        type="primary"
                        @click="resetForm('form')"
                    >重置
                    </el-button>
                </div>

            </div>
        </div>
        <div v-if="pageData" class="list">
            <div class="operations">
                <el-button type="primary" icon="el-icon-plus" size="small" @click="showInput()">
                    新增
                </el-button>
            </div>
            <el-table v-loading="loading" border stripe :data="pageData.content" empty-text="没有数据">
                <el-table-column align="center" type="index" label="序号" width="84px" />
                <el-table-column label="设备名称" align="center" prop="monitor.name" />
                <el-table-column label="设备类型" align="center">
                    <span slot-scope="scope">{{ getNameByCode(scope.row.monitor.type, deviceDefs.TYPES.list) }}</span>
                </el-table-column>
                <el-table-column label="设备组" align="center">
                    <span slot-scope="scope">{{ scope.row.deviceGroup.name }}</span>
                </el-table-column>
                <el-table-column label="通行方向" align="center">
                    <span slot-scope="scope">
                        {{ getNameByCode(scope.row.monitor.direction, deviceDefs.DIRECTIONS.list) }}
                    </span>
                </el-table-column>
                <el-table-column label="在线情况" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.monitor.online === deviceDefs.ONLINE_STATUSES.online" class="online">在线</span>
                        <span v-if="scope.row.monitor.online === deviceDefs.ONLINE_STATUSES.offline" class="offline">离线</span>
                    </template>
                </el-table-column>
                <el-table-column label="更新时间" align="center" width="155px">
                    <span slot-scope="scope">{{ scope.row.monitor.updatedDate | dateFilter }}</span>
                </el-table-column>
                <el-table-column label="状态" align="center">
                    <span
                        slot-scope="scope"
                        :class="{ abnormal: scope.row.monitor.state === deviceDefs.STATES.BIND_ERROR }"
                        @click="openAbnormalAuthorization(scope.row.monitor.state, scope.row.monitor)"
                    >{{ getNameByCode(scope.row.monitor.state, deviceDefs.STATES.list) }}</span>
                </el-table-column>
                <el-table-column label="操作" align="center" prop="" width="189px">
                    <template slot-scope="scope">
                        <template v-if="scope.row.monitor.state !== deviceDefs.STATES.BIND_ERROR && scope.row.monitor.state !== deviceDefs.STATES.PROCESSING">
                            <el-tooltip
                                v-if="scope.row.deviceGroup.state !== deviceDefs.STATES.BIND_ERROR"
                                class="item"
                                effect="dark"
                                content="编辑"
                                placement="top-start"
                            >
                                <el-button
                                    type="primary"
                                    icon="el-icon-edit"
                                    circle
                                    @click="showInput(scope.row.monitor)"
                                />
                            </el-tooltip>
                            <el-tooltip
                                class="item"
                                effect="dark"
                                content="删除"
                                placement="top-start"
                            >
                                <el-button
                                    v-if="scope.row.monitor.state !== deviceDefs.STATES.ACHIEVED"
                                    type="danger"
                                    icon="el-icon-delete"
                                    circle
                                    @click="deleteObject(scope.row.monitor.id)"
                                />
                            </el-tooltip>
                        </template>

                        <el-tooltip
                            class="item fr-svg"
                            effect="dark"
                            content="修复授权"
                            placement="top-start"
                        >
                            <el-button
                                v-if="scope.row.monitor.state === deviceDefs.STATES.BIND_ERROR"
                                type="primary"
                                circle
                                @click="repairAuthorization(scope.row.monitor.id)"
                            >
                                <svg-icon icon-class="restore" />
                            </el-button>
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
        <!-- 新建或编辑的输入框 -->
        <device-input
            v-if="editingObject && inputVisible"
            :editing-object="editingObject"
            :device-groups="deviceGroups"
            @close="closeInput"
            @reload="reload"
        />
        <!--授权异常详细-->
        <abnormal-authorization
            v-if="abnormalAuthorizationVisible"
            :monitor-id="currentDevice.id"
            :needed-name-condition="true"
            :title="currentDevice.name"
            @close="closeAbnormalAuthorization()"
        />
    </div>
</template>

<script>
import devices from './devices';

export default devices;
</script>

<style lang="scss" scoped>
    @import "~@/styles/baseinfo.common.scss";
    @import "~@/styles/abnormal.authorization.scss";
    @import "~@/styles/svg.scss";
    @import "./device.scss";
</style>
