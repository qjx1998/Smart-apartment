
import BaseService from './base.service';
import { requestServer } from '../utils/request';
import { User } from '@/data/user';
import Department, { DepartmentView } from '../data/department';
import { College } from '../data/college';
import { Institute } from '../data/institute';
import DateUtils from '@/utils/data.utils';
import downloadService from '@/service/download.service';

class DepartmentService extends BaseService {
    /**
     * 分页查询
     *
     * @param conditions 分页查询参数
     * @link DepartmentPagingParams
     */
    async paging(conditions) {
        const json = await requestServer({
            url: this.path + 'paging',
            method: 'get',
            params: conditions
        });

        const jsonList = json.content;
        json.content = jsonList.map(data => {
            const departmentJson = data.department;
            const department = super.convert(departmentJson);
            department.college = BaseService.convertWithEntityType(departmentJson.college, College);
            department.institute = BaseService.convertWithEntityType(departmentJson.institute, Institute);
            const user = BaseService.convertWithEntityType(data.user, User);
            return new DepartmentView(department, user);
        });
        return json;
    }

    /**
     * 查询所有部门
     */
    async findAllDepartment() {
        const json = await requestServer({
            url: this.path + 'all',
            method: 'get'
        });
        return json.map(data => this.convert(data));
    }

    /**
     * 通过院系id查询部门
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
     * 将部门导出为excel文件,并为文件重命名
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
        const downloadName = DateUtils.format(new Date(), 'yyyyMMddhhmmss') + '部门信息清单.xls';
        downloadService.downloadFrExcel(fileName, downloadName);
    }
}

export const departmentService = new DepartmentService('/api/department/', Department, requestServer);
