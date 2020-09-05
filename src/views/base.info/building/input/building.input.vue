<template>
    <div class="subject-input">
        <el-dialog v-loading="loading" :title="title" :visible="true" width="1060px" @close="close">
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
                        <el-form-item label="名称" class="input-item" prop="name">
                            <el-input v-model="editingObject.name" />
                        </el-form-item>

                        <el-form-item label="层数" class="input-item" prop="floor">
                            <el-input v-model.number="editingObject.floor" />
                        </el-form-item>

                        <el-form-item label="备注" class="textarea" prop="remark">
                            <el-input v-model="editingObject.remark" type="textarea" />
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
import buildingInputVue from './building.input.js';

export default buildingInputVue;
</script>

<style lang="scss" scoped>
    @import "~@/styles/baseinfo.prompt.scss";
    @import "../building.scss";
</style>
