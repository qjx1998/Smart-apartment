
import BaseService from './base.service';
import DeviceGroup from '../data/device.group';
import { requestServer } from '@/utils/request';
import { DeviceGroupView } from '@/data/device.group';
import Building from '@/data/building';

/**
 * 设备组相关服务
*/
class DeviceGroupService extends BaseService {
    /**
     * 分页查询
     *
     * @param conditions
     */
    async paging(conditions) {
        const json = await requestServer({
            url: this.path + 'paging',
            method: 'get',
            params: conditions
        });

        const jsonList = json.content;
        json.content = jsonList.map(data => {
            const deviceGroup = this.convert(data.monitorGroup);
            // 如果返回的数据中有buildings，对buildings进行处理
            let { buildings } = data;
            buildings = buildings ? data.buildings.map(item => BaseService.convertWithEntityType(item, Building)) : null;
            return new DeviceGroupView(deviceGroup, buildings);
        });
        return json;
    }

    /**
     * 根据条件查询
     *
     * @param conditions
     * @returns {Promise<*>}
     */
    async find(conditions) {
        const json = await requestServer({
            url: this.path + 'all',
            method: 'get',
            params: conditions
        });

        return json.map(data => this.convert(data));
    }

    /**
     * 添加主体到设备组
     * @param deviceGroupId 设备组id
     * @param subjectIds 主体ids
     * @returns {Promise<AxiosResponse<any>>}
     */
    async bindSubjects(deviceGroupId, subjectIds) {
        const res = await requestServer({
            url: `${this.path}${deviceGroupId}/bind/subjects`,
            method: 'post',
            data: { subjectIds }
        });
        return res;
    }

    /**
     * 从设备组中移除主体
     * @param deviceGroupId 设备组id
     * @param subjectIds 主体ids
     * @returns {Promise<AxiosResponse<any>>}
     */
    async unbindSubjects(deviceGroupId, subjectIds) {
        const res = await requestServer({
            url: `${this.path}${deviceGroupId}/unbind/subjects`,
            method: 'post',
            data: { subjectIds }
        });
        return res;
    }

    /**
     * 修复授权状态
     * @param groupId 设备组id
     * @returns {Promise<void>}
     */
    async repairAuthorization(groupId) {
        await requestServer({
            url: this.path + groupId + '/restore/subjects',
            method: 'post'
        });
    }
}

const deviceGroupService = new DeviceGroupService('/api/monitor/group/', DeviceGroup, requestServer);
export default deviceGroupService;
