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

                        <el-form-item class="input-item" label="创办年月" prop="created">
                            <el-date-picker
                                v-model="editingObject.created"
                                type="month"
                                placeholder="选择日期时间"
                                format="yyyy-MM"
                                value-format="yyyy-MM-ddTHH:mm:ss"
                            />
                        </el-form-item>

                        <el-form-item label="负责人" style="width: 44%" prop="leaderId">
                            <el-select v-model="editingObject.leaderId" filterable>
                                <el-option
                                    v-for="lead in leads"
                                    :key="lead.id"
                                    :label="lead.name"
                                    :value="lead.id"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="地址" class="input-item" style="width: 94%;" prop="address">
                            <el-input v-model="editingObject.address" />
                        </el-form-item>

                        <el-form-item label="备注" class="input-item" style="width: 94%;" prop="remark">
                            <el-input v-model="editingObject.remark" type="textarea" />
                        </el-form-item>

                        <el-form-item v-if="mode === 'update' " class="input-item" label="创建时间" prop="createdDate">
                            <el-date-picker
                                v-model="editingObject.createdDate"
                                type="datetime"
                                placeholder="选择日期时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                :disabled="true"
                            />
                        </el-form-item>

                        <el-form-item v-if="mode === 'update' " class="input-item" label="更新时间" prop="updatedDate">
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
export { default } from './school.input';
</script>

<style lang="scss" scoped>
    @import "~@/styles/baseinfo.prompt.scss";
    @import "../school.scss";
</style>
