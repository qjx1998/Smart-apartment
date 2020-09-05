<template>
    <el-dialog v-loading="loading" :visible="true" title="修改密码" width="500px" @close="close">
        <el-form ref="form" label-width="86px" label-position="right" :model="passwordData" :rules="rules">
            <el-form-item label="原密码" prop="oldPassword">
                <el-input v-model="passwordData.oldPassword" type="password" />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="passwordData.newPassword" type="password" />
            </el-form-item>
            <el-form-item label="确认密码" prop="retypedPassword">
                <el-input v-model="passwordData.retypedPassword" type="password" />
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm()">确定</el-button>
            <el-button type="info" @click="close">取消</el-button>
        </span>
    </el-dialog>
</template>

<script>
import changePassword from './change.password';
export default {
    name: 'ChangePassword',
    data() {
        return changePassword.data.call(this);
    },
    computed: changePassword.computed,
    methods: changePassword.methods
};
</script>

<style lang="scss" scoped>
@import "./change.password.scss";
</style>
