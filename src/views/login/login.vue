<template>
    <div class="login-container">
        <div class="header">
            <img src="../../assets/images/thlogo.png" alt="泰豪" class="logo">
        </div>
        <div class="login">
            <el-form
                ref="loginForm"
                :model="loginForm"
                :rules="loginRules"
                class="login-form"
                auto-complete="on"
                label-position="left"
            >

                <div class="title-container">
                    <h3 class="title">{{ $t('login.title') }}</h3>
                </div>

                <el-form-item prop="username">
                    <span class="svg-container">
                        <svg-icon icon-class="user" />
                    </span>
                    <el-input
                        ref="username"
                        v-model="loginForm.username"
                        placeholder="请输入用户名"
                        name="username"
                        type="text"
                        tabindex="1"
                        auto-complete="on"
                    />
                </el-form-item>

                <el-form-item prop="password">
                    <span class="svg-container">
                        <svg-icon icon-class="password" />
                    </span>
                    <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        placeholder="请输入密码"
                        name="password"
                        tabindex="2"
                        auto-complete="on"
                        @keyup.enter.native="handleLogin"
                    />
                    <span class="show-pwd" @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </el-form-item>

                <div class="remember">
                    <el-checkbox v-model="isPasswdRemed">记录密码</el-checkbox>
                </div>

                <el-button :loading="loading" :disabled="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">
                    {{ $t('login.loginBtn') }}
                </el-button>

                <div class="tips">
                    <span style="margin-right:20px;color:#F56C6C;">{{ msg }}</span>
                </div>

            </el-form>
            <div class="footer">
                <p>Copyright©2019 技术支持：AI应用研发中心</p>
                <p class="version">版本号：{{ appVersion }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import loginVue from './login';

export default loginVue;

</script>

<style lang="scss">
    @import "./login.scss";
</style>
