import BaseService from './base.service';
import { requestServer } from '../utils/request';
import { HistoryRecord, HistoryRecordView } from '../data/historyrecord';
import Building from '../data/building';
import { Room } from '../data/room';

class HistoryRecordService extends BaseService {
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
            const historyRecord = super.convert(data.historyRecord);

            let building, room;
            if (data.building) {
                building = BaseService.convertWithEntityType(data.building, Building);
            }

            if (data.room) {
                room = BaseService.convertWithEntityType(data.room, Room);
            }

            return new HistoryRecordView(historyRecord, building, room);
        });

        return json;
    }
}

export default new HistoryRecordService('/api/history/record/', HistoryRecord, requestServer);
