export default {
    data() {
        return {
            /**
             * 恢复弹出框是否展示
             */
            restoreDialogVisible: false,
            /**
             * 正在恢复的对象
             */
            restoringSubject: null
        };
    },
    methods: {
        /**
         * 开启恢复弹出框
         */
        openRestoreDialog(subject) {
            this.restoringSubject = subject;
            this.restoreDialogVisible = true;
        },
        /**
         * 关闭弹出框
         */
        closeRestoreDialog() {
            this.restoringSubject = null;
            this.restoreDialogVisible = false;
        },
        /**
         * 关闭且重新加载
         */
        reloadRestoreDialog() {
            this.closeRestoreDialog();
            this.paging();
        }
    }
};
