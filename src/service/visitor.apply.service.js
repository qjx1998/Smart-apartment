
import BaseService from './base.service';
import { Subject } from '../data/subject';
import { requestServer } from '../utils/request';
import { Room } from '../data/room';
import Building from '../data/building';
import { VisitorApplyRecord, VisitorApplyRecordView } from '../data/visitor.apply.record';

class VisitorApplyService extends BaseService {
    /**
     * 分页查询
     *
     * @param conditions
     * @link VisitorApplyRecordPagingParams 这个是conditions的类型
     */
    async paging(conditions) {
        const json = await requestServer({
            url: this.path + 'paging',
            method: 'get',
            params: conditions
        });

        const jsonList = json.content;
        json.content = jsonList.map(data => {
            let visitorApplyRecord = data.visitorApplyRecord;
            visitorApplyRecord.subject = BaseService.convertWithEntityType(data.visitorApplyRecord.subject, Subject);
            visitorApplyRecord.building = BaseService.convertWithEntityType(data.visitorApplyRecord.building, Building);
            visitorApplyRecord.room = BaseService.convertWithEntityType(data.visitorApplyRecord.room, Room);
            visitorApplyRecord = BaseService.convertWithEntityType(data.visitorApplyRecord, VisitorApplyRecord);
            return new VisitorApplyRecordView(visitorApplyRecord, data.totalDays);
        });
        return json;
    }

    /**
     * 审核访客申请
     */
    /**
     *
     * @param id 访客申请记录id
     * @param data 访客审核表单参数
     * @link VisitorApplyParam 这个是data的类型
     */
    async audit(id, data) {
        await requestServer({
            url: this.path + 'audit/' + id,
            method: 'put',
            data: data
        });
    }

    /**
     * 校验是否存在待审核状态的申请记录
     */
    async existAuditingState() {
        const exist = await requestServer({
            url: this.path + 'exist/state/auditing',
            method: 'get'
        });
        return exist;
    }
}

const visitorApplyService = new VisitorApplyService('/api/visitor/apply/', VisitorApplyRecord, requestServer);
export default visitorApplyService;
