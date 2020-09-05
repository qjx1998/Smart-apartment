<template>
    <div class="subject-input">
        <el-dialog :visible="true" :title="title" width="790px" @close="close">
            <div class="input-container">
                <div class="input">
                    <el-form
                        :ref="formName"
                        class="input-form"
                        :rules="formRules"
                        :model="editingObject"
                        label-position="right"
                        label-width="80px"
                    >
                        <el-form-item label="名称" class="input-item" style="width: 94%;" prop="name">
                            <el-input v-model="editingObject.name" />
                        </el-form-item>

                        <el-form-item label="所属学校" class="input-item" prop="collegeId" disabled>
                            <el-input :value="selectedCollege.name" :disabled="true" />
                        </el-form-item>

                        <el-form-item label="所属院系" class="input-item" prop="instituteId">
                            <el-input :value="selectedInstitute.name" :disabled="true" />
                        </el-form-item>

                        <el-form-item label="负责人" style="width: 44%" prop="leaderId">
                            <el-select v-model="editingObject.leaderId" filterable>
                                <el-option label="请选择" value="" />
                                <el-option
                                    v-for="allUsers in allUsers"
                                    :key="allUsers.id"
                                    :label="allUsers.name"
                                    :value="allUsers.id"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="备注" class="input-item" style="width: 94%;" prop="remark">
                            <el-input v-model="editingObject.remark" type="textarea" />
                        </el-form-item>

                        <el-form-item v-if="mode === 'update' " label="创建时间" class="input-item" prop="createdDate">
                            <el-date-picker
                                v-model="editingObject.createdDate"
                                type="datetime"
                                placeholder="选择日期时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                :disabled="true"
                            />
                        </el-form-item>

                        <el-form-item v-if="mode === 'update' " label="更新时间" class="input-item" prop="updatedDate">
                            <el-date-picker
                                v-model="editingObject.updatedDate"
                                type="datetime"
                                placeholder="选择日期时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                :disabled="true"
                            />
                        </el-form-item>

                    </el-form>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">{{ mode === 'create' ? '保存' : '更新信息' }}</el-button>
                <el-button type="info" @click="close">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export { default } from './department.input.js';
</script>

<style lang="scss" scoped>
    @import "~@/styles/baseinfo.prompt.scss";
    @import "../department.scss";
</style>
