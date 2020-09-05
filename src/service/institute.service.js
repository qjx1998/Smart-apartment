
import BaseService from './base.service';
import { Institute, InstituteView } from '../data/institute';
import { requestServer } from '../utils/request';
import { User } from '@/data/user';
import { College } from '@/data/college';
import DateUtils from '@/utils/data.utils';
import downloadService from '@/service/download.service';

class InstituteService extends BaseService {
    /**
     * 分页查询
     * @param conditions 分页查询参数
     * @link InstitutePagingParams
     */
    async paging(conditions) {
        const json = await requestServer({
            url: this.path + 'paging',
            method: 'get',
            params: conditions
        });

        const jsonList = json.content;
        json.content = jsonList.map(data => {
            const instituteJson = data.institute;
            instituteJson.college = BaseService.convertWithEntityType(instituteJson.college, College);
            const institute = super.convert(instituteJson);
            const user = BaseService.convertWithEntityType(data.user, User);
            return new InstituteView(institute, user);
        });
        return json;
    }

    /**
     * 查询所有院系
     * @param conditions
     */
    async find(conditions) {
        const json = await requestServer({
            url: '/api/institute/all',
            method: 'get',
            params: conditions
        });
        return json.map(data => this.convert(data));
    }

    /**
     * 通过学校id查询院系
     * @param collegeId 学校id
     */
    async findByCollegeId(collegeId) {
        const json = await requestServer({
            url: this.path + 'find/by/college/' + collegeId,
            method: 'get'
        });
        return json.map(data => this.convert(data));
    }

    /**
     * 导出所有识别主体
     * @param conditions
     */
    async export(conditions) {
        // 将数据导出到文件，并将文件缓存到服务器上
        const fileName = await requestServer({
            url: this.path + 'export',
            method: 'get',
            params: conditions
        });
        const downloadName = DateUtils.format(new Date(), 'yyyyMMddhhmmss') + '学校信息清单.xls';
        downloadService.downloadFrExcel(fileName, downloadName);
    }
}

export const instituteService = new InstituteService('/api/institute/', Institute, requestServer);

