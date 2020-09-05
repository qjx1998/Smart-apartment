<template>
    <div class="room-container container">
        <div class="header">
            <div class="building-selector">
                <el-form label-width="40px" label-position="right">
                    <el-form-item label="楼栋" prop="buildingId">
                        <el-select v-model="conditions.buildingId" filterable>
                            <el-option
                                v-for="building in buildings"
                                :key="building.id"
                                :label="building.name"
                                :value="building.id"
                            />
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>

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
                            <el-form-item label="名称" prop="name">
                                <el-input v-model="conditions.name" />
                            </el-form-item>

                            <el-form-item label="容纳人数" prop="availablePlacesNum">
                                <el-input v-model="conditions.availablePlacesNum" />
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="search" @click="paging">
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
        </div>

        <div class="data">
            <div class="floors">
                <div v-if="!floorsInBuilding || !floorsInBuilding.length" class="floor">暂无数据</div>
                <div
                    v-for="floor in floorsInBuilding"
                    v-else
                    :key="floor"
                    class="floor"
                    :class="{selected: conditions.floor === floor}"
                    @click="selectFloor(floor)"
                >
                    {{ floor }}层
                </div>
            </div>
            <div class="room-list list">
                <div class="operations">
                    <el-button class="add-btn" type="primary" size="small" @click="showInput()">
                        新增
                    </el-button>
                    <el-button type="primary" size="small" @click="deleteSelectedRooms()">
                        删除
                    </el-button>
                    <el-button type="primary" size="small" @click="openDialog('batchAdd')">
                        批量新增
                    </el-button>
                    <el-button type="primary" size="small" @click="openDialog('batchDelete')">
                        批量删除
                    </el-button>
                    <el-button type="primary" size="small" @click="openDialog('batchEdit')">
                        批量修改
                    </el-button>
                </div>

                <el-table
                    v-loading="loading"
                    border
                    stripe
                    :data="pageData ? pageData.content : []"
                    @selection-change="selectRooms"
                >
                    <el-table-column type="selection" width="55" />
                    <el-table-column label="序号" type="index" align="center" width="84px" />
                    <el-table-column label="名称" align="center" prop="room.name" />
                    <el-table-column label="楼栋" align="center" prop="building.name" />
                    <el-table-column label="楼层" align="center" prop="room.floor" />
                    <el-table-column
                        label="容纳人数"
                        align="center"
                        prop="room.availablePlacesNum"
                    />

                    <el-table-column label="操作" align="center" prop="">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                                <el-button
                                    type="primary"
                                    icon="el-icon-edit"
                                    circle
                                    @click="showInput(scope.row.room)"
                                />
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                                <el-button
                                    type="danger"
                                    icon="el-icon-delete"
                                    circle
                                    @click="deleteObject(scope.row.room.id)"
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
                        :current-page.sync="conditions.page"
                        @current-change="changePage"
                        @size-change="changeSize"
                    />
                </div>
            </div>

        </div>

        <room-input
            v-if="editingObject && inputVisible"
            :editing-object="editingObject"
            :buildings="buildings"
            :floors="floorsInBuilding"
            :building-id="conditions.buildingId"
            @reload="reload()"
            @close="closeInput()"
        />
        <batch-edit
            v-if="batchEditVisible"
            :room-ids="selectedRoomIds"
            @close="closeDialog('batchEdit')"
            @reload="reloadDialog('batchEdit')"
        />
        <batch-delete
            v-if="batchDeleteVisible"
            :params="batchAddOrDeleteParams"
            :floors="floorsInBuilding"
            :buildings="buildings"
            @reload="reloadDialog('batchDelete')"
            @close="closeDialog('batchDelete')"
        />
    </div>
</template>

<script>

import roomList from './room.list.js';

export default roomList;
</script>

<style lang="scss" scoped>
    @import "~@/styles/baseinfo.common.scss";
    @import "./room.scss";
</style>
