<template>
    <div class="subject-input">
        <el-dialog v-loading="loading" :title="title" :visible="true" width="790px" @close="close">
            <div class="input-container">
                <div class="input">
                    <el-form
                        :ref="formName"
                        :model="editingObject"
                        :rules="formRules"
                        class="input-form"
                        label-position="right"
                        label-width="128px"
                    >
                        <el-form-item label="设备名称" prop="name">
                            <el-input v-model="editingObject.name" />
                        </el-form-item>

                        <el-form-item label="设备类型" prop="type">
                            <el-select v-model="editingObject.type" filterable :disabled="mode === 'update'">
                                <el-option
                                    v-for="type in deviceDefs.TYPES.list"
                                    :key="type.code"
                                    :label="type.name"
                                    :value="type.code"
                                    :disabled="type.code === deviceDefs.TYPES.PAD"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="通行方向" prop="direction">
                            <el-select v-model="editingObject.direction" filterable>
                                <el-option
                                    v-for="direction in deviceDefs.DIRECTIONS.list"
                                    :key="direction.code"
                                    :label="direction.name"
                                    :value="direction.code"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="设备组" prop="groupId">
                            <el-select v-model="editingObject.groupId" filterable>
                                <el-option
                                    v-for="deviceGroup in deviceGroups"
                                    :key="deviceGroup.id"
                                    :label="deviceGroup.name"
                                    :value="deviceGroup.id"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="视频流URL地址" prop="videoStreamUrl" class="long-item">
                            <el-input v-model="editingObject.videoStreamUrl" />
                        </el-form-item>
                        <el-form-item label="网络继电器IP" prop="networkSwitcher" class="long-item">
                            <el-input v-model="editingObject.networkSwitcher" />
                        </el-form-item>

                        <el-form-item v-if="mode === 'create'" label="创建时间" class="input-item">
                            <el-input :disabled="true" :value="getNowFormattedTime()" />
                        </el-form-item>

                        <el-form-item v-if="editingObject.updatedDate" label="更新时间" class="input-item">
                            <el-input :value="editingObject.updatedDate.replace('T', ' ')" :disabled="true" />
                        </el-form-item>

                    </el-form>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">保存</el-button>
                <el-button type="info" @click="close">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import monitorInput from './device.input';

export default monitorInput;
</script>

<style lang="scss" scoped>
    @import "./device.input.scss";
</style>
