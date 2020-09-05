
import BaseService from './base.service';
import { College, CollegeView } from '../data/college';
import { requestServer } from '../utils/request';
import { User } from '@/data/user';
import DateUtils from '@/utils/data.utils';
import downloadService from '@/service/download.service';

class CollegeService extends BaseService {
    /**
     * 分页查询
     * @param conditions 分页查询参数
     * @link CollegePagingParams
     */
    async paging(conditions) {
        const json = await requestServer({
            url: this.path + 'paging',
            method: 'get',
            params: conditions
        });

        const jsonList = json.content;
        json.content = jsonList.map(data => {
            const college = super.convert(data.college);
            const user = BaseService.convertWithEntityType(data.user, User);
            return new CollegeView(college, user);
        });
        return json;
    }

    /**
     * 查询所有学校
     */
    async findAllCollege() {
        const json = await requestServer({
            url: this.path + 'all',
            method: 'get'
        });
        return json.map(data => this.convert(data));
    }

    /**
     * 导出所有识别主体
     * @param conditions 分页查询参数
     */
    async export(conditions) {
        // 将数据导出到文件，并将文件缓存到服务器上
        const fileName = await requestServer({
            url: this.path + 'export',
            method: 'post',
            data: conditions
        });
        const downloadName = DateUtils.format(new Date(), 'yyyyMMddhhmmss') + '学校信息清单.xls';
        downloadService.downloadFrExcel(fileName, downloadName);
    }

    /**
     * 验证学校名称是否存在
     *
     * @param id 学校id
     * @param name 学校名称
     */
    async nameExists(id, name) {
        const isExists = await requestServer({
            url: this.path + 'exists/name',
            method: 'get',
            params: {
                'id': id,
                'name': name
            }
        });
        return isExists;
    }
}

const collegeService = new CollegeService('/api/college/', College, requestServer);

export default collegeService;
