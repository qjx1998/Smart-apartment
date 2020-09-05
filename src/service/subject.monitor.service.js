import BaseService from '@/service/base.service';
import { requestServer } from '@/utils/request';
import { Subject } from '@/data/subject';
import Monitor from '@/data/monitor';
import SubjectMonitor, { SubjectMonitorView } from '@/data/subject.monitor';

class SubjectMonitorService extends BaseService {
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
        json.content = jsonList.map(item => {
            let { subjectMonitor, subject, monitor } = item;
            subjectMonitor = super.convert(subjectMonitor);
            subject = BaseService.convertWithEntityType(subject, Subject);
            monitor = BaseService.convertWithEntityType(monitor, Monitor);
            return new SubjectMonitorView(subjectMonitor, subject, monitor);
        });
        return json;
    }
}

const subjectMonitorService = new SubjectMonitorService('/api/subject/monitor/', SubjectMonitor, requestServer);

export default subjectMonitorService;
