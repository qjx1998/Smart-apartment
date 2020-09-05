export class ConfirmDialog {
    constructor(title, confirmButtonText, showCancelButton, cancelButtonText, message) {
        this.title = title || '注意';
        this.confirmButtonText = confirmButtonText || '确定';
        this.showCancelButton = showCancelButton || true;
        this.cancelButtonText = cancelButtonText || '取消';
        this.message = message || '确定删除该项？';
    }

    create(msgBox) {
        return msgBox({
            title: this.title,
            message: this.message,
            showCancelButton: this.showCancelButton,
            confirmButtonText: this.confirmButtonText,
            cancelButtonText: this.cancelButtonText
        });
    }
}
