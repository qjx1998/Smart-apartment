<template>
    <div class="container">
        <div class="filter">
            <span class="title">检索条件</span>

            <div class="conditions-operation">
                <div class="conditions">
                    <el-form
                        ref="form"
                        :model="conditions"
                        label-width="98px"
                        label-position="right"
                        size="small"
                        @keyup.enter.native="searchByConditions()"
                    >
                        <el-form-item label="设备组名称" prop="name">
                            <el-input v-model="conditions.name" />
                        </el-form-item>
                        <el-form-item label="权限楼栋" prop="buildingId">
                            <el-select v-model="conditions.buildingId" filterable>
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="building in buildings"
                                    :key="building.id"
                                    :label="building.name"
                                    :value="building.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="状态" prop="state">
                            <el-select v-model="conditions.state" filterable>
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="status in deviceGroupStates.list"
                                    :key="status.code"
                                    :label="status.name"
                                    :value="status.code"
                                />
                            </el-select>
                        </el-form-item>
                    </el-form>

                </div>
                <div class="search" @click="paging">
                    <el-button
                        class="form-btn"
                        type="primary"
                        icon="el-icon-search"
                        @click="searchByConditions"
                    >搜索
                    </el-button>
                    <el-button icon="el-icon-refresh" class="reset-btn" type="primary" @click="resetForm('form')">重置</el-button>
                </div>
            </div>
        </div>
        <div class="room-list list">
            <div class="operations">
                <el-button type="primary" icon="el-icon-plus" size="small" @click="showInput()">
                    新增
                </el-button>
            </div>

            <el-table v-loading="loading" border stripe :data="pageData ? pageData.content : []">
                <el-table-column align="center" type="index" label="序号" width="84px" />
                <el-table-column label="设备组名称" align="center" prop="deviceGroup.name" />
                <el-table-column label="授权楼栋" align="center">
                    <span slot-scope="slot">{{ getBuildingNames(slot.row.buildings) }}</span>
                </el-table-column>
                <el-table-column label="备注" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.deviceGroup.remark ? scope.row.deviceGroup.remark : '-' }}
                    </template>
                </el-table-column>
                <el-table-column label="更新时间" align="center">
                    <span slot-scope="slot">{{ slot.row.deviceGroup.updatedDate | dateFilter }}</span>
                </el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <span
                            :class="{abnormal: scope.row.deviceGroup.state === deviceGroupStates.BIND_ERROR}"
                            @click="openAbnormalAuthorization(scope.row.deviceGroup.state, scope.row.deviceGroup)"
                        >{{ getKeyByValue(scope.row.deviceGroup.state) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" prop="" width="224px">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                            <el-button
                                v-if="
                                    scope.row.deviceGroup.state !== deviceGroupStates.BIND_ERROR &&
                                        scope.row.deviceGroup.state !== deviceGroupStates.PROCESSING"
                                type="primary"
                                icon="el-icon-edit"
                                circle
                                @click="showInput(scope.row)"
                            />
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                            <el-button
                                v-if="scope.row.deviceGroup.state !== deviceGroupStates.BIND_ERROR &&
                                    scope.row.deviceGroup.state !== deviceGroupStates.PROCESSING"
                                type="danger"
                                icon="el-icon-delete"
                                circle
                                @click="deleteObject(scope.row.deviceGroup.id)"
                            />
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="查看设备" placement="top-start">
                            <el-button type="primary" circle icon="el-icon-view" @click="navigateToDevices(scope.row.deviceGroup.id)" />
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="单独授权" placement="top-start">
                            <el-button
                                v-if="scope.row.deviceGroup.state !== deviceGroupStates.BIND_ERROR
                                    && scope.row.deviceGroup.state !== deviceGroupStates.PROCESSING"
                                type="primary"
                                circle
                                class="fr-svg"
                                @click="navigateToAuthorizeSubjects(scope.row.deviceGroup)"
                            >
                                <svg-icon icon-class="authorization" />
                            </el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="修复授权" placement="top-start">
                            <el-button
                                v-if="scope.row.deviceGroup.state === deviceGroupStates.BIND_ERROR &&
                                    scope.row.deviceGroup.state !== deviceGroupStates.PROCESSING"
                                type="primary"
                                circle
                                class="fr-svg"
                                @click="repairAuthorization(scope.row.deviceGroup.id)"
                            >
                                <svg-icon icon-class="re-authorization" />
                            </el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>

            </el-table>
            <div v-if="pageData" class="pagination">
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
        <device-input
            v-if="inputVisible"
            :editing-object="editingObject"
            :group-id="editingGroupId"
            :groups-buildings="currentGroupsBuildings"
            @close="closeInput"
            @reload="reload"
        />
        <abnormal-authorization
            v-if="abnormalAuthorizationVisible"
            :needed-devices-condition="true"
            :needed-name-condition="true"
            :group-id="currentGroup.id"
            :title="currentGroup.name"
            @close="closeAbnormalAuthorization()"
        />
    </div>
</template>

<script>
import deviceGroup from './device.group';

export default deviceGroup;
</script>

<style lang="scss" scoped>
    @import '~@/styles/baseinfo.common.scss';
    @import "~@/styles/abnormal.authorization.scss";
    @import "~@/styles/svg.scss";
    @import './device.group.scss';
</style>
