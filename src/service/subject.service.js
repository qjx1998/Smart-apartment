
import BaseService from './base.service';
import { Subject, SubjectView } from '../data/subject';
import Building from '../data/building';
import { requestServer } from '../utils/request';
import { Room } from '../data/room';
import DateUtils from '../utils/data.utils';
import downloadService from './download.service';
import Department from '@/data/department';
import { Clazz } from '@/data/clazz';
import { Institute } from '@/data/institute';
import { College } from '@/data/college';

class SubjectService extends BaseService {
    /**
     * 分页查询
     *
     * @param conditions
     * @link SubjectPagingParams 这个是conditions的类型
     */
    async paging(conditions) {
        const json = await requestServer({
            url: this.path + 'paging',
            method: 'post',
            data: conditions
        });

        const jsonList = json.content;
        json.content = jsonList.map(data => {
            const subjectJson = data.subject;
            subjectJson.college = BaseService.convertWithEntityType(data.subject.college, College);
            subjectJson.institute = BaseService.convertWithEntityType(data.subject.institute, Institute);
            subjectJson.clazz = BaseService.convertWithEntityType(data.subject.clazz, Clazz);
            subjectJson.department = BaseService.convertWithEntityType(data.subject.department, Department);
            const subject = BaseService.convertWithEntityType(data.subject, Subject);
            const room = BaseService.convertWithEntityType(data.room, Room);
            const building = BaseService.convertWithEntityType(data.building, Building);
            return new SubjectView(subject, room, building);
        });
        return json;
    }

    /**
     * 新建识别主体，只有基础信息，没有照片
     *
     * @param data
     * @link SubjectBaseParams
     */
    async createBaseInfo(data) {
        await requestServer({
            url: this.path + 'base/info',
            method: 'post',
            data: data
        });
    }

    /**
     * 重新激活人员
     * @param conditions
     * @link RestoreSubjectParams
     */
    async reactivate(conditions) {
        await requestServer({
            url: this.path + 'reactivate/' + conditions.subjectId,
            method: 'put',
            data: conditions
        });
    }

    /**
     * 修复人员授权状态
     */
    async repairAuthorization(subjectId) {
        await requestServer({
            url: this.path + 'restore/' + subjectId,
            method: 'get'
        });
    }

    /**
     * 验证身份证是否存在
     *
     * @param cid 身份证
     * @param subjectId 识别主体ID
     */
    async cidExists(cid, subjectId) {
        const res = await requestServer({
            url: this.path + 'cid/' + cid + '/exists',
            method: 'get',
            params: {
                subjectId: subjectId
            }
        });
        return res;
    }

    /**
     * 验证手机号码是否存在
     *
     * @param phone 手机号码
     * @param subjectId 识别主体ID
     */
    async phoneExists(phone, subjectId) {
        const res = await requestServer({
            url: this.path + 'phone/' + phone + '/exists',
            method: 'get',
            params: {
                subjectId: subjectId
            }
        });
        return res;
    }

    /**
     * 验证学号/工号是否存在
     *
     * @param opid 学号/工号
     * @param subjectId 识别主体id
     * @return Promise<boolean>
     */
    async opidExists(opid, subjectId) {
        const res = await requestServer({
            url: this.path + 'opid/' + opid + '/exists',
            method: 'get',
            params: { subjectId }
        });
        return res;
    }

    /**
     * 导出所有识别主体
     * @param conditions 过滤条件
     * @returns {Promise<void>}
     */
    async export(conditions) {
        // 将数据导出到文件，并将文件缓存到服务器上
        const fileName = await requestServer({
            url: this.path + 'export',
            method: 'post',
            data: conditions
        });
        let downloadName = '';
        if (conditions.subjectIds) {
            downloadName = '未归人员名单_' + DateUtils.format(new Date(), 'yyyyMMddhhmmss') + '.xls';
        } else {
            downloadName = '所有人员名单_' + DateUtils.format(new Date(), 'yyyyMMddhhmmss') + '.xls';
        }
        downloadService.downloadFrExcel(fileName, downloadName);
    }
}

export default new SubjectService('/api/subject/', Subject, requestServer);
