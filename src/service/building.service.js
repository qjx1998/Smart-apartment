
import BaseService from './base.service';
import Building from '../data/building';
import { requestServer } from '@/utils/request';

class BuildingService extends BaseService {
    /**
     * 根据条件查询
     *
     * @param conditions
     * @returns {Promise<*>}
     */
    async find(conditions) {
        const json = await requestServer({
            url: '/api/building/all',
            method: 'get',
            params: conditions
        });

        return json.map(data => this.convert(data));
    }

    /**
     * 查询没有绑定设备组的楼栋
     */
    async findNoBindMonitorBuildings(params) {
        let { groupId } = params;
        groupId = groupId || '';
        const res = await requestServer({
            url: `${this.path}no/bind/monitor/${groupId}`,
            method: 'get',
            params
        });
        return res.map(item => this.convert(item));
    }

    /**
     * 查询楼栋的楼层集合
     * @param buildingId
     * @returns {Promise<AxiosResponse<any>>}
     */
    async getFloors(buildingId) {
        const data = await requestServer({
            url: this.path + 'floor',
            method: 'get',
            params: {
                'buildingId': buildingId
            }
        });

        return data;
    }
}

const buildingService = new BuildingService('/api/building/', Building, requestServer);

export default buildingService;
