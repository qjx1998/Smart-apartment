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

                        <el-form-item label="所属学校" prop="collegeId">
                            <el-select v-model="editingObject.collegeId" filterable>
                                <el-option
                                    v-for="collegeList in collegeLists"
                                    :key="collegeList.id"
                                    :label="collegeList.name"
                                    :value="collegeList.id"
                                />
                            </el-select>
                        </el-form-item>
                        <!--只用来占位，不做任何操作 -->
                        <el-form-item label="" class="input-item hide" />

                        <el-form-item class="input-item" label="创办年月" prop="created">
                            <el-date-picker
                                v-model="editingObject.created"
                                type="month"
                                format="yyyy-MM"
                                value-format="yyyy-MM-ddTHH:mm:ss"
                                placeholder="选择日期时间"
                            />
                        </el-form-item>

                        <el-form-item label="负责人" style="width: 44%" prop="leadId">

                            <el-select v-model="editingObject.leaderId" filterable>
                                <el-option label="请选择" value="" />
                                <el-option
                                    v-for="lead in leads"
                                    :key="lead.id"
                                    :label="lead.name"
                                    :value="lead.id"
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
                                value-format="yyyy-MM-ddTHH:mm:ss"
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
export { default } from './faculty.input';
</script>

<style lang="scss" scoped>
    @import "~@/styles/baseinfo.prompt.scss";
    @import "../faculty.scss";
</style>
