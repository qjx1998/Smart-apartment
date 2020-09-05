import BaseService from '@/service/base.service';
import ContinuousOut from '@/data/behavior.analysis/continuous.out';
import { requestServer } from '@/utils/request';
import DateUtils from '@/utils/data.utils';
import downloadService from '@/service/download.service';

// todo 删除该类 引用出用SubjectBehavior代替
class ContinuousOutService extends BaseService {
    /**
     * 导出所有的多日未归记录
     * @param conditions 过滤条件
     * @link ContinuousOutPagingParams
     */
    async export(conditions) {
        // 将数据导出到文件，并将文件缓存到服务器上
        const fileName = await requestServer({
            url: this.path + 'export',
            method: 'get',
            params: conditions
        });
        const downloadName = DateUtils.format(new Date(), 'yyyy年MM月dd日') + '连续多日未归人员列表.xls';
        downloadService.downloadFrExcel(fileName, downloadName);
    }
}

const continuousOutService = new ContinuousOutService('/api/subject/not/present/days/', ContinuousOut, requestServer);
export default continuousOutService;

