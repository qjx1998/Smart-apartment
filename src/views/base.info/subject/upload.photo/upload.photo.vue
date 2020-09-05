<template>
    <el-dialog
        v-loading="loading"
        :visible="true"
        width="30%"
        title="导入人脸"
        @close="close()"
    >
        <div class="upload-tips">
            <div class="my-uploader">
                <label for="files" class="uploader-label">{{ !hasChosen ? '选择文件夹' : '重新选择' }}</label>
                <input id="files" type="file" name="files" webkitdirectory @change="changeHandler">
            </div>

            <span class="tips">{{ hasChosen ? `已选择${fileList.length}张图片` : '支持jpg、jpeg、png格式图片' }}</span>
        </div>
        <div class="file-name-type">
            <span class="label">文件名匹配方式</span>
            <div class="type-radio">
                <el-radio v-for="type in NUMBER_TYPE.list" :key="type.code" v-model="numberType" :label="type.code">
                    {{ type.name }}
                </el-radio>
            </div>
        </div>
        <p>{{ errorMsg }}</p>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close()">取消</el-button>
            <el-button type="primary" @click="uploadPhotos">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import uploadPhoto from './upload.photo';

export default uploadPhoto;
</script>

<style lang="scss" scoped>
    @import "./upload.photo.scss";
</style>
