
import BaseService from './base.service';
import { requestAudit } from '../utils/request';
import { User } from '../data/user';
import { Action, ActionLog, ActionLogView } from '../data/action.log';

class ActionLogService extends BaseService {
    /**
     * 分页查询
     * @param conditions 分页查询参数
     * @link ActionLogParams
     */
    async paging(conditions) {
        const json = await requestAudit({
            url: this.path + 'paging',
            method: 'get',
            params: conditions
        });
        const jsonList = json.content;
        json.content = jsonList.map(data => {
            const actionLogJson = data.actionLog;
            actionLogJson.action = BaseService.convertWithEntityType(data.actionLog.action, Action);
            const actionLog = super.convert(data.actionLog);
            const user = BaseService.convertWithEntityType(data.user, User);
            return new ActionLogView(actionLog, user);
        });
        return json;
    }

    /**
     * 查询所有操作类型
     */
    async findAll() {
        const json = await requestAudit({
            url: this.path + 'all/type',
            method: 'get'
        });
        return json;
    }
}

export const actionLogService = new ActionLogService('/api/action/log/', ActionLog, requestAudit);
