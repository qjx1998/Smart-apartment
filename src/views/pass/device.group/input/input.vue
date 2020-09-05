<template>
    <el-dialog
        v-loading="loading"
        :visible="true"
        :title="mode === 'create' ? '新增设备组' : '修改设备组'"
        width="580px"
        @close="close()"
    >
        <div class="device-group-input input-container">
            <el-form
                ref="form"
                :model="editingObject"
                :rules="formRules"
                class="input-form"
                label-width="120px"
                label-position="right"
            >
                <el-form-item label="设备组名称" prop="name">
                    <el-input v-model="editingObject.name" />
                </el-form-item>
                <el-form-item label="授权通行楼栋" prop="buildingIds">
                    <el-select v-model="editingObject.buildingIds" filterable value-key="id" multiple>
                        <el-option v-for="building in noBindBuildings" :key="building.id" :label="building.name" :value="building.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="mask">
                    <el-input v-model="editingObject.remark" type="textarea" :rows="4" />
                </el-form-item>
                <el-form-item v-if="mode === 'create'" label="创建时间" class="input-item">
                    <el-input :disabled="true" :value="getNowFormattedTime()" />
                </el-form-item>
                <el-form-item v-if="editingObject.updatedDate" label="更新时间">
                    <el-input :value="editingObject.updatedDate.replace('T', ' ')" :disabled="true" />
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog_footer">
            <el-button type="primary" @click="submitForm">
                保存
            </el-button>
            <el-button type="info" @click="close">取消</el-button>
        </span>
    </el-dialog>
</template>

<script>
import deviceGroupInput from '@/views/pass/device.group/input/input';

export default deviceGroupInput;
</script>

<style lang="scss" scoped>
@import "./input.scss";
</style>
