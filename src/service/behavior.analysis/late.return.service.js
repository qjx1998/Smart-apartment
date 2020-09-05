import BaseService from '@/service/base.service';
import { LateHistory, LateReturn } from '@/data/behavior.analysis/late.return';
import { requestServer } from '@/utils/request';
import DateUtils from '@/utils/data.utils';
import downloadService from '@/service/download.service';

class LateReturnService extends BaseService {
    /**
     * 导出所有的晚归记录
     * @param conditions 过滤条件
     * @link LateReturnPagingParams
     */
    async export(conditions) {
        // 将数据导出到文件，并将文件缓存到服务器上
        const fileName = await requestServer({
            url: this.path + 'export',
            method: 'get',
            params: conditions
        });
        const downloadName = DateUtils.format(new Date(), 'yyyy年MM月dd日') + '晚归人员列表.xls';
        downloadService.downloadFrExcel(fileName, downloadName);
    }
}

/**
 * 晚归人员服务
 * @type {LateReturnService}
 */
const lateReturnService = new LateReturnService('/api/subject/stay/out/late/', LateReturn, requestServer);
export default lateReturnService;

class LateHistoryService extends BaseService {
    /**
     * 晚归历史paging
     * @param conditions
     * @returns {Promise<void>}
     */
    async paging(conditions) {
        const params = Object.assign({}, conditions);
        const { subjectId } = params;
        delete params.subjectId;
        const json = await requestServer({
            url: this.path + subjectId,
            method: 'get',
            params
        });

        const jsonData = json.content;
        json.content = jsonData.map(data => this.convert(data));
        return json;
    }
}

/**
 * 晚归详情服务
 * @type {LateHistoryService}
 */
export const lateHistoryService = new LateHistoryService('/api/subject/stay/out/late/detail/', LateHistory, requestServer);

