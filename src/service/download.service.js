
class DownloadService {
    /**
     * 下载excel文件
     *
     * @param fileName 缓存在服务器上的文件名称
     * @param downloadName 下载到本地时，文件的名称
     * @param baseUrl api根路径
     */
    downloadExcel(fileName, downloadName, baseUrl) {
        fileName = fileName.substr(0, fileName.indexOf('.'));
        const location = baseUrl + '/api/download/excel/' + fileName + '?downloadName=' + downloadName;
        window.open(location, '_blank');
    }

    /**
     * 下载fr-server相关的excel文件
     *
     * @param fileName 缓存在服务器上的文件名称
     * @param downloadName 下载到本地时，文件的名称
     */
    downloadFrExcel(fileName, downloadName) {
        this.downloadExcel(fileName, downloadName, process.env.VUE_APP_SERVER_BASE_URL);
    }

    /**
     * 下载danger-notify-api相关的excel文件
     *
     * @param fileName 缓存在服务器上的文件名称
     * @param downloadName 下载到本地时，文件的名称
     */
    downloadDangerNotifyExcel(fileName, downloadName) {
        this.downloadExcel(fileName, downloadName, process.env.VUE_APP_DANGER_NOTIFY_BASE_URL);
    }
}

export default new DownloadService();
