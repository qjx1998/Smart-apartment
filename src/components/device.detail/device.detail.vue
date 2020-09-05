<template functional>
    <div class="subject-input">
        <el-dialog :title="props.device.name + '设备详情'" :visible="true" width="790px" @close="listeners.close">
            <div class="input-container">
                <div class="input">
                    <el-form
                        :model="props.device"
                        class="input-form"
                        label-position="right"
                        label-width="128px"
                        :disabled="true"
                    >
                        <el-form-item label="设备名称" prop="name">
                            <el-input :value="props.device.name" />
                        </el-form-item>

                        <el-form-item label="设备类型" prop="type">
                            <el-select :value="props.device.type">
                                <el-option
                                    v-for="type in props.deviceDefs.TYPES.list"
                                    :key="type.code"
                                    :label="type.name"
                                    :value="type.code"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="通行方向" prop="direction">
                            <el-select :value="props.device.direction">
                                <el-option
                                    v-for="direction in props.deviceDefs.DIRECTIONS.list"
                                    :key="direction.code"
                                    :label="direction.name"
                                    :value="direction.code"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="设备组" prop="groupId">
                            <el-select :value="props.device.groupId">
                                <el-option
                                    v-for="deviceGroup in props.deviceGroups"
                                    :key="deviceGroup.id"
                                    :label="deviceGroup.name"
                                    :value="deviceGroup.id"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="视频流URL地址" prop="videoStreamUrl" class="long-item">
                            <el-input :value="props.device.videoStreamUrl" />
                        </el-form-item>
                        <el-form-item label="网络继电器IP" prop="networkSwitcher" class="long-item">
                            <el-input :value="props.device.networkSwitcher" />
                        </el-form-item>

                        <el-form-item label="创建时间" class="input-item">
                            <el-input :disabled="true" :value="props.device.createdDate.replace('T', ' ')" />
                        </el-form-item>

                        <el-form-item label="更新时间" class="input-item">
                            <el-input :value="props.device.updatedDate.replace('T', ' ')" />
                        </el-form-item>

                    </el-form>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export { default } from './device.detail';
</script>

<style lang="scss" scoped>
    @import "./device.detail.scss";
</style>
