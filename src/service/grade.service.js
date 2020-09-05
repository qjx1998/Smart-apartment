
import BaseService from '@/service/base.service';
import { requestServer } from '@/utils/request';
import { Grade } from '@/data/grade';

class GradeService extends BaseService {
    /**
     * 查询所有的年级
     */
    async find() {
        const json = await requestServer({
            url: this.path + 'all',
            method: 'get'
        });

        return json.map(data => this.convert(data));
    }
}
const gradeService = new GradeService('/api/grade/', Grade, requestServer);

export default gradeService;
