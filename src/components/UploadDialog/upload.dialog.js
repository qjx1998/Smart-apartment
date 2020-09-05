export default {
    data() {
        return {
            /**
             * 文件列表
             */
            fileList: [],
            /**
             * 是否显示dialog
             */
            dialogVisible: false
        };
    },
    props: {
        /**
         * 会话框标题
         */
        title: {
            default: '',
            type: String
        },
        /**
         * 上传配置
         */
        uploaderConfig: {
            required: true,
            type: Object
        },
        /**
         * 上传文件前触发的钩子函数
         */
        beforeUpload: Function,
        /**
         * 文件上传成功的钩子函数
         */
        onSuccess: Function,
        /**
         * 文件上传失败的钩子函数
         */
        onError: Function
    },
    methods: {
        /**
         * 确认上传
         */
        confirmUpload() {
            this.$confirm('确定上传文件？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$refs.upload.submit();
            }).catch(e => {
                this.$message({
                    type: 'info',
                    message: '已取消上传'
                });
            });
        },
        /**
         * 关闭dialog
         */
        close() {
            this.dialogVisible = false;
        },
        /**
         * 监听open事件，打开dialog
         */
        onOpen() {
            this.$on('open', function() {
                this.dialogVisible = true;
            });
        },
        /**
         * 监听close事件，
         */
        onClose() {
            this.$on('close', function() {
                this.dialogVisible = false;
            });
        }
    },
    created() {
        this.onOpen();
        this.onClose();
    }
};
