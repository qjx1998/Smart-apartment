<template>
    <el-dialog v-loading="loading" :visible="true" width="790px" @close="close()">
        <el-form
            ref="validateForm"
            v-model="params"
            label-position="right"
            label-width="128px"
            :model="params"
            :rules="validateRules"
        >
            <el-form-item label="所属楼栋" prop="buildingId">
                <el-select v-model="params.buildingId" filterable :disabled="true">
                    <el-option
                        v-for="building in buildings"
                        :key="building.id"
                        :label="building.name"
                        :value="building.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="所属层数" prop="floors">
                <el-select v-model="params.floors" filterable :multiple="true">
                    <el-option v-for="floor in floors" :key="floor" :label="floor" :value="floor" />
                </el-select>
            </el-form-item>
            <el-form-item label="房间号命名长度" prop="nameLength">
                <el-select v-model.number="params.nameLength" filterable>
                    <el-option label="2" :value="2" />
                    <el-option label="3" :value="3" />
                    <el-option label="4" :value="4" />
                </el-select>
            </el-form-item>
            <el-form-item label="起始房间尾号" prop="startNum">
                <el-input v-model.number="params.startNum" />
            </el-form-item>
            <el-form-item label="结束房间尾号" prop="endNum">
                <el-input v-model.number="params.endNum" />
            </el-form-item>
            <el-form-item v-if="mode === 'create'" label="可容纳人数" prop="availablePlacesNum">
                <el-input v-model.number="params.availablePlacesNum" />
            </el-form-item>
        </el-form>

        <span slot="footer">
            <el-button type="primary" @click="submitForm()">确定</el-button>
            <el-button @click="close()">取消</el-button>
        </span>
    </el-dialog>
</template>

<script>
import batchDelete from './batch.delete';

export default batchDelete;
</script>

<style lang="scss" scoped>
    @import '~@/styles/input.dialog.scss';
    @import './batch.delete.scss';
</style>
