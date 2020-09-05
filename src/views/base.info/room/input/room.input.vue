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
                        label-width="80px"
                    >
                        <el-form-item label="名称" class="input-item" prop="name">
                            <el-input v-model="editingObject.name" />
                        </el-form-item>

                        <el-form-item label="楼栋" class="input-item" prop="buildingId">
                            <el-select v-model="editingObject.buildingId" filterable :disabled="true">
                                <el-option
                                    v-for="building in buildings"
                                    :key="building.id"
                                    :label="building.name"
                                    :value="building.id"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="楼层" class="input-item" prop="floor">
                            <el-select v-model="editingObject.floor" filterable class="item-number">
                                <el-option v-for="floor in floors" :key="floor" :label="floor" :value="floor" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="容纳人数" class="input-item" prop="availablePlacesNum">
                            <el-input-number
                                v-model.number="editingObject.availablePlacesNum"
                                :min="1"
                                :max="8"
                                class="item-number"
                            />
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm()">{{ mode === 'create' ? '保存' : '更新信息' }}</el-button>
                <el-button type="info" @click="close">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import roomInput from './room.input.js';

export default roomInput;
</script>

<style lang="scss" scoped>
  @import "@/styles/baseinfo.prompt.scss";
</style>
