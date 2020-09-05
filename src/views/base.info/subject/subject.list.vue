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
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="conditions.name" />
                        </el-form-item>

                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="conditions.gender" filterable>
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="gender in genders.list"
                                    :key="gender.code"
                                    :label="gender.name"
                                    :value="gender.code"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="类别" prop="type">
                            <el-select v-model="conditions.type" filterable>
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="type in subjectTypeList"
                                    :key="type.code"
                                    :label="type.name"
                                    :value="type.code"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="楼栋" prop="buildingId">
                            <el-select v-model="conditions.buildingId" filterable @change="handleBuildingChanged">
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="build in buildings"
                                    :key="build.id"
                                    :label="build.name"
                                    :value="build.id"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="宿舍" prop="roomId">
                            <el-select
                                v-model="conditions.roomId"
                                filterable
                                :disabled="roomSelectorDisabled"
                                :placeholder="roomSelectorDisabled ? '请先选择楼栋': '全部'"
                            >
                                <el-option label="全部" value="" />
                                <el-option label="未分配" :value="un_Distributed_Room" />
                                <el-option
                                    v-for="room in roomsInBuilding"
                                    :key="room.id"
                                    :label="room.name"
                                    :value="room.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="学号/工号" prop="opid">
                            <el-input v-model="conditions.opid" />
                        </el-form-item>
                        <el-form-item label="证件号" prop="certificateIdentification">
                            <el-input v-model="conditions.certificateIdentification" />
                        </el-form-item>
                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model="conditions.phone" />
                        </el-form-item>
                        <el-form-item label="学校" prop="collegeId">
                            <el-select v-model="conditions.collegeId" filterable>
                                <el-option label="全部" value="" />
                                <el-option
                                    v-for="college in colleges"
                                    :key="college.id"
                                    :label="college.name"
                                    :value="college.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="院系" prop="instituteId">
                            <el-select
                                v-model="conditions.instituteId"
                                filterable
                                :disabled="instituteSelectorDisabled"
                            >
                                <el-option :label="instituteSelectorDisabled ? '请先选择学校': '全部'" value="" />
                                <el-option
                                    v-for="institute in institutesInCollege"
                                    :key="institute.id"
                                    :label="institute.name"
                                    :value="institute.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="班级" prop="classId">
                            <el-select
                                v-model="conditions.classId"
                                filterable
                                :disabled="classOrDepartmentSelectorDisabled"
                            >
                                <el-option :label="classOrDepartmentSelectorDisabled ? '请先选择院系': '全部'" value="" />
                                <el-option
                                    v-for="clazz in classesInInstitute"
                                    :key="clazz.id"
                                    :label="clazz.name"
                                    :value="clazz.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="部门" prop="departmentId">
                            <el-select
                                v-model="conditions.departmentId"
                                filterable
                                :disabled="classOrDepartmentSelectorDisabled"
                            >
                                <el-option :label="classOrDepartmentSelectorDisabled ? '请先选择院系': '全部'" value="" />
                                <el-option
                                    v-for="department in departmentsInInstitute"
                                    :key="department.id"
                                    :label="department.name"
                                    :value="department.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="访客来源" prop="visitorSource">
                            <el-input v-model="conditions.visitorSource" />
                        </el-form-item>
                        <el-form-item label="状态" prop="state">
                            <el-select v-model="conditions.state" filterable>
                                <el-option label="全部" value="" />
                                <el-option label="未归档" :value="subjectState.UN_ACHIEVED" />
                                <el-option
                                    v-for="state in subjectState.list"
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
                        class="form-btn"
                        type="primary"
                        icon="el-icon-search"
                        @click="searchByConditions()"
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
                    @click="showInput()"
                >
                    新增
                </el-button>

                <el-button type="primary" size="small" @click="confirmExportSubjects()">导出</el-button>
                <el-button type="primary" size="small" @click="openDialog('uploadPhoto')">导入人脸</el-button>

                <el-button size="small" type="primary" @click="openUploadDialog()">导入人员</el-button>
            </div>

            <el-table
                v-loading="loading"
                border
                stripe
                :data="pageData ? pageData.content : []"
                empty-text="没有数据"
            >
                <el-table-column label="序号" type="index" align="center" width="84px" />
                <el-table-column label="姓名" align="center" prop="subject.name" />
                <el-table-column label="性别" align="center" width="84px">
                    <span slot-scope="scope">{{ genders[scope.row.subject.gender] }}</span>
                </el-table-column>
                <el-table-column label="证件号" align="center" prop="subject.certificateIdentification" />
                <el-table-column label="手机号" align="center" prop="subject.phone" />
                <el-table-column label="宿舍" align="center">
                    <span slot-scope="scope">{{ getFullRoomName(scope.row.building.name, scope.row.room.name) }}</span>
                </el-table-column>
                <el-table-column label="备注" width="204px">
                    <remark slot-scope="scope" :subject-type="subjectTypes" :subject="scope.row.subject" />
                </el-table-column>
                <el-table-column label="类别" align="center">
                    <span slot-scope="scope">{{ subjectTypes[scope.row.subject.type] }}</span>
                </el-table-column>
                <el-table-column label="更新时间" align="center" width="180px">
                    <span slot-scope="scope">{{ scope.row.subject.updatedDate | dateFilter }}</span>
                </el-table-column>
                <el-table-column label="状态" align="center">
                    <span
                        slot-scope="scope"
                        :class="{ abnormal: scope.row.subject.state === subjectState.BIND_ERROR }"
                        @click="openAbnormalAuthorization(scope.row.subject)"
                    >
                        {{ subjectState[scope.row.subject.state] }}
                    </span>
                </el-table-column>
                <el-table-column label="操作" align="center" fixed="right" width="240px">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="识别记录" placement="top-start">
                            <el-button
                                type="primary"
                                icon="el-icon-view"
                                circle
                                @click="showSubjectHistory(scope.row.subject.id)"
                            />
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                            <el-button
                                v-if="scope.row.subject.state !== subjectState.BIND_ERROR && scope.row.subject.state !== subjectState.ACHIEVED"
                                type="primary"
                                icon="el-icon-edit"
                                circle
                                @click="showInput(scope.row.subject)"
                            />
                        </el-tooltip>

                        <el-tooltip
                            v-if="scope.row.subject.state === subjectState.ACHIEVED"
                            class="item"
                            effect="dark"
                            content="恢复"
                            placement="top-start"
                        >
                            <el-button
                                type="primary"
                                circle
                                @click="openRestoreDialog(scope.row.subject)"
                            >
                                <svg-icon icon-class="restore" />
                            </el-button>

                        </el-tooltip>

                        <el-tooltip
                            v-if="scope.row.subject.state === subjectState.BIND_ERROR"
                            class="item fr-svg"
                            effect="dark"
                            content="修复授权"
                            placement="top-start"
                        >
                            <el-button
                                type="primary"
                                circle
                                @click="repairAuthorization(scope.row.subject)"
                            >
                                <svg-icon icon-class="restore" />
                            </el-button>
                        </el-tooltip>

                        <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                            <el-button
                                v-if="scope.row.subject.state !== subjectState.ACHIEVED"
                                type="danger"
                                icon="el-icon-delete"
                                circle
                                @click="deleteObject(scope.row.subject.id)"
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

        <!-- 新建或编辑的输入框 -->
        <subject-input
            v-if="editingObject && inputVisible"
            :editing-object="editingObject"
            :subject="currentSubject"
            :buildings="buildings"
            :colleges="colleges"
            @close="closeInput"
            @reload="reload"
        />
        <!--主题识别历史记录-->
        <subject-history
            v-if="historyDialogVisible"
            :subject-id="historySubjectId"
            @close="historyDialogVisible = false"
        />
        <!--导入人员表格-->
        <upload-dialog
            ref="upload"
            title="导入人员表格"
            :uploader-config="uploaderConfig"
            :before-upload="beforeImport"
            :on-success="importSuccess"
            :on-error="importError"
        >
            <template>
                <p>表格中只包含人员资料，照片可后期通过Web端上传</p>
                <p>请<a class="dialog__download" :href="importSubjectTemplateUrl" download>下载</a>指定格式表格</p>
            </template>
        </upload-dialog>
        <!--批量导入人脸照片-->
        <upload-photo
            v-if="uploadPhotoVisible"
            @close="closeDialog('uploadPhoto')"
            @reload="reloadDialog('uploadPhoto')"
        />
        <!--恢复访客状态-->
        <restore-dialog
            v-if="restoreDialogVisible"
            ref="restoreDialog"
            :subject="restoringSubject"
            :buildings="buildings"
            @reload="reloadRestoreDialog"
            @close="closeRestoreDialog"
        />
        <abnormal-authorization
            v-if="abnormalAuthorizationVisible"
            :needed-devices-condition="true"
            :needed-name-condition="false"
            :subject-id="currentSubject.id"
            :title="currentSubject.name"
            @close="closeAbnormalAuthorization()"
        />
    </div>
</template>

<script>
export { default } from './subject.list';
</script>

<style lang='scss' scoped>
    @import "~@/styles/baseinfo.common.scss";
    @import "~@/styles/abnormal.authorization.scss";
    @import "~@/styles/svg.scss";
    @import "./subject.scss";
</style>
