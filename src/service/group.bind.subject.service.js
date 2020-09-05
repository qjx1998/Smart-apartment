import BaseService from '@/service/base.service';
import { requestServer } from '@/utils/request';
import { Room } from '@/data/room';
import Building from '@/data/building';
import { Subject } from '@/data/subject';
import DeviceGroupSubject, { DeviceGroupBindSubjectView } from '@/data/device.group.subject';

class GroupBindSubjectService extends BaseService {
    /**
     * 获取设备组下的授权人员
     * @param groupId 设备组id
     * @param conditions 查询条件
     * @returns {Promise<AxiosResponse<any>>}
     * @constructor
     */
    async PagingBind(groupId, conditions) {
        const json = await requestServer({
            url: `${this.path}/bind/group/${groupId}`,
            method: 'post',
            data: conditions
        });

        json.content = json.content.map(item => {
            let { subject, building, room, monitorGroupSubject } = item;
            subject = BaseService.convertWithEntityType(subject, Subject);
            building = BaseService.convertWithEntityType(building, Building);
            room = BaseService.convertWithEntityType(room, Room);
            monitorGroupSubject = BaseService.convertWithEntityType(monitorGroupSubject, DeviceGroupSubject);
            return new DeviceGroupBindSubjectView(subject, building, room, monitorGroupSubject);
        });
        return json;
    }

    async PagingUnbind(groupId, conditions) {
        const json = await requestServer({
            url: `${this.path}/nobind/group/${groupId}`,
            method: 'post',
            data: conditions
        });

        json.content = json.content.map(item => {
            let { subject, building, room, monitorGroupSubject } = item;
            subject = BaseService.convertWithEntityType(subject, Subject);
            building = BaseService.convertWithEntityType(building, Building);
            room = BaseService.convertWithEntityType(room, Room);
            monitorGroupSubject = BaseService.convertWithEntityType(monitorGroupSubject, DeviceGroupSubject);
            return new DeviceGroupBindSubjectView(subject, building, room, monitorGroupSubject);
        });
        return json;
    }
}

const groupBindSubjectService = new GroupBindSubjectService('/api/subject/paging', DeviceGroupSubject, requestServer);
export default groupBindSubjectService;

