
import BaseService from './base.service';
import Monitor, { MonitorView } from '../data/monitor';
import { requestServer } from '../utils/request';
import DeviceGroup from '../data/device.group';

class MonitorService extends BaseService {
    /**
     * 分页查询
     *
     * @param conditions
     * @returns {Promise<void>}
     */
    async paging(conditions) {
        const json = await requestServer({
            url: this.path + 'paging',
            method: 'get',
            params: conditions
        });

        const jsonList = json.content;
        json.content = jsonList.map(data => {
            const monitor = super.convert(data.monitor);
            const deviceGroup = BaseService.convertWithEntityType(data.monitorGroup, DeviceGroup);
            return new MonitorView(monitor, deviceGroup);
        });
        return json;
    }

    /**
     * 根据条件查询
     * @param conditions
     * @returns {Promise<*>}
     */
    async find(conditions) {
        const json = await requestServer({
            url: '/api/monitor/all',
            method: 'get',
            params: conditions
        });

        return json.map(data => this.convert(data));
    }

    /**
     * 修复授权状态
     * @param subjectId
     * @returns {Promise<void>}
     */
    async repairAuthorization(monitorId) {
        await requestServer({
            url: this.path + 'restore/' + monitorId,
            method: 'get'
        });
    }
}

const monitorService = new MonitorService('/api/monitor/', Monitor, requestServer);

export default monitorService;
