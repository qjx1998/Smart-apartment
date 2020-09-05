<template>
    <el-dialog v-loading="loading" :visible="true" width="480px" @close="close()">
        <el-form
            ref="ruleForm"
            label-position="right"
            label-width="128px"
            :model="ruleForm"
            :rules="formValidateRules"
        >
            <el-form-item label="可容纳人数" prop="availablePlacesNum">
                <el-input v-model.number="ruleForm.availablePlacesNum" placeholder="必须大于0" />
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button type="primary" @click="batchUpdateRooms()">确定</el-button>
            <el-button @click="close()">取消</el-button>
        </span>
    </el-dialog>
</template>

<script>
import batchEdit from './batch.edit';

export default batchEdit;
</script>

<style lang="scss" scoped>
    @import '~@/styles/input.dialog.scss';
    @import './batch.edit.scss';
</style>
