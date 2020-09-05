
import BaseService from './base.service';
import { Room, RoomView } from '../data/room';
import { requestServer } from '../utils/request';
import Building from '../data/building';

class RoomService extends BaseService {
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
            const room = super.convert(data.room);
            const building = BaseService.convertWithEntityType(data.building, Building);
            return new RoomView(room, building);
        });
        return json;
    }

    /**
     * 查询建筑物中所有房间
     *
     * @param buildingId
     * @returns {Promise<void>}
     */
    async findByBuildingId(buildingId) {
        const json = await requestServer({
            url: this.path + 'list/building/' + buildingId,
            method: 'get'
        });

        return json.map(data => super.convert(data));
    }

    /**
     * 查询建筑物中指定的房间是否存在
     * @param buildingId
     * @param name
     * @returns {Promise<*>}
     */
    async examin(buildingId, name) {
        const json = await requestServer({
            url: this.path + 'find',
            method: 'get',
            params: {
                'buildingId': buildingId,
                'name': name
            }
        });

        return json ? super.convert(json) : json;
    }

    /**
     * 批量创建房间（匹配）
     * @param data 参数
     * @returns {Promise<void>}
     * @link BatchCreateRoomsParam 批量创建房间的参数
     */
    async batchCreate(data) {
        await requestServer({
            url: this.path + 'batch/create',
            method: 'post',
            data: data
        });
    }

    /**
     * 删除房间（勾选）
     * @param ids 房间id集合
     * @returns {Promise<void>}
     */
    async deleteRooms(ids) {
        await requestServer({
            url: this.path + 'delete',
            method: 'delete',
            data: {
                'ids': ids
            }
        });
    }

    /**
     * 批量删除房间（匹配）
     * @param data 参数
     * @returns {Promise<void>}
     * @link BatchDeleteRoomsParam 批量删除房间的参数
     */
    async batchDelete(data) {
        await requestServer({
            url: this.path + 'batch/delete',
            method: 'delete',
            data: data
        });
    }

    /**
     * 更新房间（勾选）
     * @param ids 房间id集合
     * @param availablePlacesNum 房间可容纳人数
     * @returns {Promise<void>}
     */
    async updateRooms(ids, availablePlacesNum) {
        await requestServer({
            url: this.path + 'update',
            method: 'put',
            data: {
                'ids': ids,
                'availablePlacesNum': availablePlacesNum
            }
        });
    }

    /**
     * 校验楼层数(判断指定建筑的大于指定层数的楼层是否存在未归档的房间)
     *
     * @param buildingId
     * @param floor
     * @returns {Promise<*>}
     */
    async validateFloor(buildingId, floor) {
        const json = await requestServer({
            url: this.path + 'validate/floor',
            method: 'get',
            params: {
                'buildingId': buildingId,
                'floor': floor
            }
        });

        return json;
    }
}

const roomService = new RoomService('/api/room/', Room, requestServer);

export default roomService;
