
import BaseService from './base.service';
import { CronData, CustomerSourceInfo, DangerCondition, DangerRule, DangerRuleView, DangerRuleForm } from '../data/danger.rule';
import { requestDangerNotify } from '../utils/request';
import DateUtils from '@/utils/data.utils';
import downloadService from '@/service/download.service';

class DangerRuleService extends BaseService {
    /**
     * 分页查询
     * @param conditions 分页查询参数
     * @link DangerRulePagingParams
     */
    async paging(conditions) {
        const json = await requestDangerNotify({
            url: this.path + 'paging',
            method: 'get',
            params: conditions
        });

        const jsonList = json.content;
        json.content = jsonList.map(data => {
            const dangerRuleJson = data.dangerRule;
            const conditionsList = dangerRuleJson.conditions;
            dangerRuleJson.conditions = conditionsList.map(data => {
                return BaseService.convertWithEntityType(data, DangerCondition);
            });
            dangerRuleJson.dataSource = BaseService.convertWithEntityType(data.dangerRule.dataSource, CustomerSourceInfo);
            const dangerRule = BaseService.convertWithEntityType(data.dangerRule, DangerRule);
            const cronData = BaseService.convertWithEntityType(data.cronData, CronData);
            return new DangerRuleView(dangerRule, cronData);
        });
        return json;
    }

    /**
     * 查询所有规则
     */
    async findAll() {
        const json = await requestDangerNotify({
            url: this.path + 'all',
            method: 'get'
        });
        return json.map(data => this.convert(data));
    }

    /**
     * 按条件导出所有规则信息
     * @param conditions 分页查询参数
     */
    async export(conditions) {
        // 将数据导出到文件，并将文件缓存到服务器上
        const fileName = await requestDangerNotify({
            url: this.path + 'export',
            method: 'post',
            data: conditions
        });
        const downloadName = DateUtils.format(new Date(), 'yyyyMMddhhmmss') + '告警规则信息清单.xls';
        downloadService.downloadDangerNotifyExcel(fileName, downloadName);
    }

    /**
     * 验证规则名称是否存在
     *
     * @param id 规则id
     * @param name 规则名称
     */
    async nameExists(id, name) {
        const isExists = await requestDangerNotify({
            url: this.path + 'exists/name',
            method: 'get',
            params: {
                'id': id,
                'name': name
            }
        });
        return isExists;
    }

    /**
     * 更新规则状态
     *
     * @param id 规则id
     * @param state 规则状态
     */
    async updateState(data) {
        await requestDangerNotify({
            url: this.path + data.id + '/' + data.state,
            method: 'put',
            data: data
        });
    }

    /**
     * 新建
     *
     * @param data
     * @returns {Promise<void>}
     */
    async create(data) {
        const createData = new DangerRuleForm();
        createData.cronData = data.cronData;
        Object.assign(createData, data.dangerRule);
        await this.client({
            url: this.path,
            method: 'post',
            data: createData
        });
    }

    /**
     * 更新
     *
     * @param data
     * @returns {Promise<void>}
     */
    async update(data) {
        const createData = new DangerRuleForm();
        createData.cronData = data.cronData;
        Object.assign(createData, data.dangerRule);
        await this.client({
            url: this.path + createData.id,
            method: 'put',
            data: createData
        });
    }
}

export const dangerRuleService = new DangerRuleService('/api/danger/rule/', DangerRule, requestDangerNotify);
