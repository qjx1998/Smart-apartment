<template>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
    >
        <el-upload
            ref="upload"
            class="uploader"
            drag
            :action="uploaderConfig.action"
            :headers="uploaderConfig.headers"
            :file-list="fileList"
            :auto-upload="false"
            :before-upload="beforeUpload"
            :on-success="onSuccess"
            :on-error="onError"
        >
            <div class="upload-area">从本地选取</div>
        </el-upload>
        <slot>
            <!--      <p>表格中只包含人员资料，照片可后期通过Web端上传</p>-->
            <!--      <p>请<a class="dialog__download" :href="importSubjectTemplateUrl" download>下载</a>指定格式表格</p>-->
        </slot>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="confirmUpload">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export { default } from './upload.dialog';
</script>

<style lang="scss" scoped>
@import "./upload.dialog.scss";
</style>
