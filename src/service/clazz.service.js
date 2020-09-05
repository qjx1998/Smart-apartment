
import BaseService from './base.service';
import { requestServer } from '@/utils/request';
import { User } from '@/data/user';
import { Clazz, ClazzView } from '@/data/clazz';
import { College } from '@/data/college';
import { Institute } from '@/data/institute';
import DateUtils from '@/utils/data.utils';
import downloadService from '@/service/download.service';
import { Grade } from '@/data/grade';

class ClazzService extends BaseService {
    /**
     * 分页查询
     * @param conditions
     *          分页查询参数
     *          @link ClazzPagingParams
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
            const clazzJson = data.clazz;
            const clazz = super.convert(clazzJson);
            clazz.college = BaseService.convertWithEntityType(clazzJson.college, College);
            clazz.grade = BaseService.convertWithEntityType(clazzJson.grade, Grade);
            clazz.institute = BaseService.convertWithEntityType(clazzJson.institute, Institute);
            const user = BaseService.convertWithEntityType(data.user, User);
            return new ClazzView(clazz, user);
        });
        return json;
    }

    /**
     * 查询所有的班级
     */
    async find() {
        const json = await requestServer({
            url: this.path + 'all',
            method: 'get'
        });

        return json.map(data => this.convert(data));
    }

    /**
     * 通过院系id查询
     * @param instituteId 院系id
     */
    async findByInstituteId(instituteId) {
        const json = await requestServer({
            url: this.path + 'find/by/institute/' + instituteId,
            method: 'get'
        });
        return json.map(data => this.convert(data));
    }

    /**
     * 将班级导出为excel文件,并为文件重命名
     * @param conditions
     *              查询条件
     * @returns {Promise<void>}
     */
    async export(conditions) {
        const fileName = await requestServer({
            url: this.path + 'export',
            method: 'get',
            params: conditions
        });
        const downloadName = DateUtils.format(new Date(), 'yyyyMMddhhmmss') + '班级信息清单.xls';
        downloadService.downloadFrExcel(fileName, downloadName);
    }

    /**
     * 验证是否重名
     */
    async nameExists(collegeId, instituteId, name) {
        return requestServer({
            url: this.path + 'exist/name',
            method: 'get',
            params: {
                'collegeId': collegeId,
                'instituteId': instituteId,
                'name': name
            }
        });
    }
}

const clazzService = new ClazzService('/api/clazz/', Clazz, requestServer);

export default clazzService;
