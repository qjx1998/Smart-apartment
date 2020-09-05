import BaseService from '@/service/base.service';
import ContinuousIn from '@/data/behavior.analysis/continuous.in';
import { requestServer } from '@/utils/request';
import DateUtils from '@/utils/data.utils';
import downloadService from '@/service/download.service';

// todo 删除该类 引用出用SubjectBehavior代替
class ContinuousInService extends BaseService {
    /**
     * 导出所有的多日未出记录
     * @param conditions 过滤条件
     * @link ContinuousInPagingParams
     */
    async export(conditions) {
        // 将数据导出到文件，并将文件缓存到服务器上
        const fileName = await requestServer({
            url: this.path + 'export',
            method: 'get',
            params: conditions
        });
        const downloadName = DateUtils.format(new Date(), 'yyyy年MM月dd日') + '连续多日未出人员列表.xls';
        downloadService.downloadFrExcel(fileName, downloadName);
    }
}

const continuousInService = new ContinuousInService('/api/subject/not/out/days/', ContinuousIn, requestServer);
export default continuousInService;
