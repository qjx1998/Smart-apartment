import uploadPhotosRequest from '@/service/upload.service';
import SubjectDef from '@/constants/subject.def';
import Compressor from 'compressorjs';
import dialogMixin from '@/mixins/dialog.mixin';
import downloadService from '@/service/download.service';

export default {
    name: 'UploadPhoto',
    mixins: [dialogMixin],
    data() {
        return {
            /**
             * 上传文件列表
             */
            fileList: [],
            /**
             * 错误提示
             */
            errorMsg: '',
            /**
             * 号码类型常量
             */
            NUMBER_TYPE: SubjectDef.NUMBER_TYPE,
            /**
             * 号码类型
             */
            numberType: SubjectDef.NUMBER_TYPE.PHONE_NUMBER
        };
    },
    computed: {
        /**
         * 是否已选择文件
         * @returns {boolean}
         */
        hasChosen() {
            return Boolean(this.fileList.length);
        },
        /**
         * 文件夹名
         */
        directoryName() {
            if (this.hasChosen) {
                return '';
            }
        }
    },
    methods: {
        /**
         * 更改文件夹下的文件名
         * @param file 文件对象
         * @returns {File} 新建的文件对象
         */
        changeFolderFileName(file) {
            if (file.webkitRelativePath) {
                const fileName = file.name;
                file = new File([file], fileName, {
                    type: file.type
                });
                return file;
            }
            return file;
        },
        /**
         * 获取文件名
         */
        getFileName(file) {
            return file.name;
        },
        /**
         * 文件过滤
         */
        uploadFilter(file) {
            return /\.(jpeg|jpg|png)$/i.test(file.name);
        },
        /**
         * 上传图片将图片压缩到1m大小
         */
        compressFile(image) {
            return new Promise(resolve => {
                new Compressor(image, {
                    checkOrientation: true,
                    convertSize: 1000000,
                    success(file) {
                        resolve(file);
                    }
                });
            });
        },
        /**
         * 上传文件夹
         */
        // TODO: // 单一功能原则
        async uploadPhotos() {
            if (!this.validateUploadingPhotos()) return;

            const formData = await this.buildFormData();
            this.loading = true;
            const res = await uploadPhotosRequest(formData);
            const { totalNumber, failNumber, successNumber, fileName } = res.data;
            const downloadHandler = function() {
                downloadService.downloadExcel(fileName, '导入结果.xls');
            };
            const h = this.$createElement;
            const numbersNode = h('p', `本次导入${totalNumber}张，导入成功${successNumber}张，导入失败${failNumber}张`);
            const downloadNode = h('p', [
                h('span', '请'),
                h('a', {
                    class: 'dialog__download',
                    on: { click: downloadHandler }
                }, '点击此处'),
                h('span', '进行导入结果下载')
            ]);
            this.$msgbox({
                title: '',
                message: h('div', [numbersNode, downloadNode]),
                center: true,
                showConfirmButton: false
            });
            this.loading = false;
            this.reload();
        },
        /**
         * 验证是否可以上传文件
         */
        validateUploadingPhotos() {
            if (this.fileList.length === 0) {
                this.errorMsg = '请选择含有图片的文件夹';
                return false;
            }
            if (this.fileList.length > 100) {
                this.errorMsg = '一次性一个文件夹不能超过100张照片';
                return false;
            }
            return true;
        },
        /**
         * 构建formData,将符合条件的图片添加到formData中
         */
        async buildFormData() {
            const formData = new FormData();

            formData.append('fileNameType', this.numberType);

            for (let i = 0; i < this.fileList.length; i++) {
                if (this.uploadFilter(this.fileList[i])) {
                    let file = this.fileList[i];
                    const fileName = this.getFileName(file);
                    file = await this.compressFile(file);
                    formData.append('file', file, fileName);
                }
            }
            return formData;
        },
        /**
         * 清除文件
         */
        clearFiles() {
            const uploader = document.getElementById('files');
            uploader.value = '';
        },
        /**
         * 监听文件变更事件
         */
        changeHandler() {
            const uploader = document.getElementById('files');
            this.fileList = uploader.files;
        }
    },
    created() {
    }
};

