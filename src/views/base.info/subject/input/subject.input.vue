<template>
    <div class="subject-input">
        <el-dialog v-loading="loading" :visible="true" :title="title" width="1060px" @close="close">
            <div class="input-container">
                <!-- 上传头像 -->
                <el-upload
                    v-if="mode === 'create'"
                    ref="upload"
                    class="avatar-uploader"
                    :action="uploaderConfig.action"
                    :headers="uploaderConfig.headers"
                    :auto-upload="false"
                    :show-file-list="false"
                    :on-change="handleAvatarChange"
                    :on-success="onUploadSuccess"
                    :on-error="onUploadError"
                    :data="editingObject"
                    :before-upload="beforeUpload"
                >
                    <img v-if="imageUrl" :src="imageUrl" alt="" class="card">
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>

                <!-- 更新头像 -->
                <el-upload
                    v-if="mode === 'update'"
                    ref="upload"
                    class="avatar-uploader"
                    :action="uploaderConfig.action"
                    :headers="uploaderConfig.headers"
                    :auto-upload="false"
                    :show-file-list="false"
                    :on-change="handleAvatarChange"
                    :on-success="onUploadSuccess"
                    :on-error="onUploadError"
                    :before-upload="beforeUpload"
                >
                    <img v-if="imageUrl" :src="imageUrl" alt="" class="card">
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>

                <div class="input" :class="{split: mode === 'update'}">
                    <el-form
                        :ref="formName"
                        :model="editingObject"
                        :rules="formRules"
                        class="input-form"
                        label-width="108px"
                        label-position="right"
                    >
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="editingObject.name" />
                        </el-form-item>

                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="editingObject.gender" filterable value="">
                                <el-option
                                    v-for="gender in genderDef.list"
                                    :key="gender.code"
                                    :label="gender.name"
                                    :value="gender.code"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="类别" prop="type">
                            <el-select v-model="editingObject.type" filterable>
                                <el-option
                                    v-for="type in subjectTypeList"
                                    :key="type.code"
                                    :label="type.name"
                                    :value="type.code"
                                />
                            </el-select>
                        </el-form-item>

                        <!--工号或学号-->
                        <el-form-item
                            v-if="editingObject.type === subjectTypeDef.STUDENT || editingObject.type === subjectTypeDef.EMPLOYEE"
                            :label="opidLabel"
                            class="is-required"
                            prop="opid"
                        >
                            <el-input v-model="editingObject.opid" />
                        </el-form-item>

                        <div v-else class="blank" />

                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model="editingObject.phone" />
                        </el-form-item>

                        <el-form-item label="证件号" prop="certificateIdentification">
                            <el-input v-model="editingObject.certificateIdentification" />
                        </el-form-item>

                        <el-form-item label="楼栋" prop="buildingId">
                            <el-select v-model="editingObject.buildingId" filterable>
                                <el-option v-for="build in buildings" :key="build.id" :label="build.name" :value="build.id" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="宿舍" prop="roomId">
                            <el-select v-model="editingObject.roomId" filterable>
                                <el-option label="请选择" value="" />
                                <el-option v-for="room in roomsInBuilding" :key="room.id" :label="room.name" :value="room.id" />
                            </el-select>
                        </el-form-item>

                        <template v-if="editingObject.type !== subjectTypeDef.VISITOR">
                            <el-form-item label="学校" prop="collegeId">
                                <el-select v-model="editingObject.collegeId" filterable>
                                    <el-option label="请选择" value="" />
                                    <el-option
                                        v-for="college in colleges"
                                        :key="college.id"
                                        :label="college.name"
                                        :value="college.id"
                                    />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="院系" prop="instituteId">
                                <el-select v-model="editingObject.instituteId" :disabled="instituteSelectorDisabled" filterable>
                                    <el-option :label="instituteSelectorDisabled ? '请先选择学校' : '请选择'" value="" />
                                    <el-option
                                        v-for="institute in institutesInCollege"
                                        :key="institute.id"
                                        :label="institute.name"
                                        :value="institute.id"
                                    />
                                </el-select>
                            </el-form-item>
                        </template>

                        <el-form-item v-if="editingObject.type === subjectTypeDef.STUDENT" label="班级" prop="classId">
                            <el-select v-model="editingObject.classId" :disabled="classOrDepartmentSelectorDisabled" filterable>
                                <el-option :label="classOrDepartmentSelectorDisabled ? '请先选择院系' : '请选择'" value="" />
                                <el-option
                                    v-for="clazz in classesInInstitute"
                                    :key="clazz.id"
                                    :label="clazz.name"
                                    :value="clazz.id"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item v-if="editingObject.type === subjectTypeDef.EMPLOYEE" label="部门" prop="departmentId">
                            <el-select v-model="editingObject.departmentId" :disabled="classOrDepartmentSelectorDisabled" filterable>
                                <el-option :label="classOrDepartmentSelectorDisabled ? '请先选择院系' : '请选择'" value="" />
                                <el-option
                                    v-for="department in departmentsInInstitute"
                                    :key="department.id"
                                    :label="department.name"
                                    :value="department.id"
                                />
                            </el-select>
                        </el-form-item>

                        <template v-if="editingObject.type === subjectTypeDef.VISITOR">
                            <el-form-item label="访客来源" prop="visitorSource">
                                <el-input v-model="editingObject.visitorSource" />
                            </el-form-item>
                            <div class="blank" />
                            <el-form-item label="访问起始时间" prop="recogStartTime">
                                <el-date-picker
                                    v-model="editingObject.recogStartTime"
                                    type="datetime"
                                    value-format="yyyy-MM-ddTHH:mm:ss"
                                    @change="changeEnd"
                                />
                            </el-form-item>
                            <el-form-item label="访问终止时间" prop="recogEndTime">
                                <el-date-picker
                                    v-model="editingObject.recogEndTime"
                                    type="datetime"
                                    :picker-options="pickerOptions"
                                    value-format="yyyy-MM-ddTHH:mm:ss"
                                />
                            </el-form-item>
                        </template>
                        <template v-if="mode === 'update'">
                            <el-form-item label="创建时间">
                                <el-input :value="subjectCreatedDate.replace('T', ' ')" :disabled="true" />
                            </el-form-item>
                            <el-form-item label="更新时间">
                                <el-input :value="subjectUpdatedDate" :disabled="true" />
                            </el-form-item>
                        </template>
                    </el-form>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button
                    v-if="mode === 'update'"
                    :disabled="updateAvatarBtnDisabled"
                    type="primary"
                    class="upload-btn"
                    @click="updateAvatar"
                >
                    更新图片
                </el-button>
                <el-button type="primary" @click="submitForm">
                    {{ mode === 'create' ? '保存' : '更新信息' }}
                </el-button>
                <el-button type="info" @click="close">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

import subjectInput from './subject.input.js';

export default subjectInput;
</script>

<style lang="scss" scoped>
@import "./subject.input.scss";
</style>
