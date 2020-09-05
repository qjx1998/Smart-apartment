<template>
    <el-dialog v-loading="loading" :title="title" :visible="true" width="684px" @close="close">
        <div class="input">
            <el-form ref="form" label-width="120px" label-position="right" :model="editingObject" :rules="formRules">
                <el-form-item label="用户名" prop="accountName">
                    <el-input v-model="editingObject.accountName" autocomplete="off" />
                </el-form-item>
                <el-form-item label="真实姓名" prop="name">
                    <el-input v-model="editingObject.name" />
                </el-form-item>
                <el-form-item v-if="mode === 'create'" label="密码" prop="password">
                    <el-input v-model="editingObject.password" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item v-if="mode === 'create'" label="确认密码" prop="retypedPassword">
                    <el-input v-model="editingObject.retypedPassword" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="是否系统管理员">
                    <el-radio v-model="editingObject.type" :label="userTypes.GENERAL_USER">否</el-radio>
                    <el-radio v-model="editingObject.type" :label="userTypes.ADMIN">是</el-radio>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio v-model="editingObject.state" :label="userStates.IS_ACTIVE">启用</el-radio>
                    <el-radio v-model="editingObject.state" :label="userStates.BANNED">禁用</el-radio>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editingObject.email" />
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="editingObject.phone" />
                </el-form-item>
                <el-form-item v-if="mode === 'update' && editingObject.createdDate" label="创建时间">
                    <el-date-picker v-model="editingObject.createdDate" type="datetime" :disabled="true" />
                </el-form-item>
                <el-form-item v-if="mode === 'update' && editingObject.updatedDate" label="更新时间">
                    <el-date-picker v-model="editingObject.updatedDate" type="datetime" :disabled="true" />
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm()">
                {{ mode === 'create' ? '保存' : '更新' }}
            </el-button>
            <el-button type="info" @click="close">取消</el-button>
        </span>
    </el-dialog>
</template>

<script>
import input from './input';
export default input;
</script>

<style lang="scss" scoped>
@import "./input.scss";
</style>
