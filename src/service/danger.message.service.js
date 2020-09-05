
import BaseService from './base.service';
import { requestDangerNotify } from '../utils/request';
import { User } from '@/data/user';

import DateUtils from '@/utils/data.utils';
import downloadService from '@/service/download.service';
import { DangerMessage, DangerMessageView } from '../data/danger.message';
import { DangerRule } from '../data/danger.rule';

class DangerMessageService extends BaseService {
    /**
     * 分页查询
     *
     * @param conditions 分页查询参数
     * @link DangerMessagePagingParams
     */
    async paging(conditions) {
        const json = await requestDangerNotify({
            url: this.path + 'paging',
            method: 'get',
            params: conditions
        });

        const jsonList = json.content;
        json.content = jsonList.map(data => {
            const dangerMessageJson = data.dangerMessage;
            const dangerMessage = super.convert(dangerMessageJson);
            dangerMessage.rule = BaseService.convertWithEntityType(dangerMessageJson.rule, DangerRule);
            const user = BaseService.convertWithEntityType(data.user, User);
            return new DangerMessageView(dangerMessage, user);
        });
        return json;
    }

    /**
     * 将告警信息导出为excel文件,并为文件重命名
     * @param conditions
     *              查询条件
     * @returns {Promise<void>}
     */
    async export(conditions) {
        const fileName = await requestDangerNotify({
            url: this.path + 'export',
            method: 'get',
            params: conditions
        });
        const downloadName = DateUtils.format(new Date(), 'yyyyMMddhhmmss') + '告警信息清单.xls';
        downloadService.downloadDangerNotifyExcel(fileName, downloadName);
    }

    /**
     * 重新推送告警信息
     * @param id 告警消息id
     */
    async rePush(id) {
        await requestDangerNotify({
            url: this.path + 'rePush/' + id,
            method: 'get'
        });
    }
}

export const dangerMessageService = new DangerMessageService('/api/danger/message/', DangerMessage, requestDangerNotify);
