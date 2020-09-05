
import BaseService from './base.service';
import { requestServer } from '../utils/request';
import { Inspection } from '../data/inspection';
import { SubjectPresentHistoryView, SubjectPresentHistory } from '../data/subjectpresenthistory';
import { Subject } from '../data/subject';
import { Room } from '../data/room';
import Building from '../data/building';
import DateUtils from '@/utils/data.utils';
import downloadService from '@/service/download.service';

class InspectionService extends BaseService {
    /**
     * 根据建筑ID查询
     *
     * @param buildingId
     * @returns {Promise<*>}
     */
    async findByBuildingId(buildingId) {
        const json = await requestServer({
            url: this.path + buildingId,
            method: 'get'
        });

        return this.convert(json);
    }
    /**
     * 分页查询
     *
     * @param conditions
     * @returns {Promise<void>}
     */
    async paging(conditions) {
        const json = await requestServer({
            url: this.path + 'history',
            method: 'get',
            params: conditions
        });

        const jsonList = json.content;
        json.content = jsonList.map(data => {
            const subject = BaseService.convertWithEntityType(data.subject, Subject);
            const history = BaseService.convertWithEntityType(data.history, SubjectPresentHistory);
            const room = BaseService.convertWithEntityType(data.room, Room);
            const building = BaseService.convertWithEntityType(data.building, Building);
            return new SubjectPresentHistoryView(subject, building, room, history);
        });
        return json;
    }

    async pagingPersonHistoryPresentRecord(conditions) {
        const json = await requestServer({
            url: `${this.path}detail/${conditions.subjectId}`,
            method: 'get',
            params: conditions
        });

        return json;
    }

    /**
     * 导出所有识别主体
     *
     * @param conditions 过滤条件
     * @returns {Promise<void>}
     */
    async export(conditions) {
        // 将数据导出到文件，并将文件缓存到服务器上
        const fileName = await requestServer({
            url: this.path + 'export',
            method: 'get',
            params: conditions
        });
        let downloadName = '';
        downloadName = DateUtils.format(new Date(), 'yyyy年MM月dd日') + '历史在寝天数统计清单' + '.xls';
        downloadService.downloadFrExcel(fileName, downloadName);
    }
}

export default new InspectionService('/api/inspection/', Inspection, requestServer);
