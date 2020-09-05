
import { requestServer } from '@/utils/request';
import BaseService from '@/service/base.service';
import {
    DangerBehaviorStatistics, HourlyPass,
    MonitorRegHistory,
    MonitorStatistics, PassStatistics, RecognitionStatistics,
    StrangerStatistics, SubjectBehavior, SubjectRegHistory,
    SubjectStatistics
} from '@/data/dashboard/statistics';
import Monitor from '@/data/monitor';
import { Subject } from '@/data/subject';
import Building from '@/data/building';

class StatisticsService {
    /**
     * 人员统计
     *
     * @param buildingId 楼栋ID
     * @returns {Promise<SubjectStatistics>}
     */
    async getSubjectStatistics(buildingId) {
        const json = await requestServer({
            url: '/api/dashboard/subject',
            method: 'get',
            params: {
                buildingId: buildingId
            }
        });

        return BaseService.convertWithEntityType(json, SubjectStatistics);
    }

    /**
     * 设备统计
     *
     * @param buildingId 楼栋ID
     * @returns {Promise<MonitorStatistics>}
     */
    async getMonitorStatistics(buildingId) {
        const json = await requestServer({
            url: '/api/dashboard/monitor',
            method: 'get',
            params: {
                buildingId: buildingId
            }
        });

        return BaseService.convertWithEntityType(json, MonitorStatistics);
    }

    /**
     * 陌生人统计
     *
     * @param buildingId 楼栋ID
     * @returns {Promise<*>}
     * @returns {Promise<StrangerStatistics>}
     */
    async getStrangerStatistics(buildingId) {
        const json = await requestServer({
            url: '/api/dashboard/stranger',
            method: 'get',
            params: {
                buildingId: buildingId
            }
        });

        // 构建监控器的识别记录列表
        const monitorRegHistories = json.monitorRegHistories.map(data => {
            const monitor = BaseService.convertWithEntityType(data.monitor, Monitor);
            return new MonitorRegHistory(monitor, data.total);
        });

        return new StrangerStatistics(buildingId, monitorRegHistories);
    }

    /**
     * 识别统计
     *
     * @param buildingId 楼栋ID
     * @returns {Promise<*>}
     * @returns {Promise<RecognitionStatistics>}
     */
    async getRecognitionStatistics(buildingId) {
        const json = await requestServer({
            url: '/api/dashboard/recognition',
            method: 'get',
            params: {
                buildingId: buildingId
            }
        });

        // 构建人员识别数量统计
        const subjectRegHistories = json.subjectRegHistories.map(data => {
            const subject = BaseService.convertWithEntityType(data.subject, Subject);
            return new SubjectRegHistory(subject, data.total);
        });

        return new RecognitionStatistics(buildingId, subjectRegHistories);
    }

    /**
     * 异常行为统计
     *
     * @param buildingId 楼栋ID
     * @param page 页码
     * @param size 每页数量
     * @returns {Promise<DangerBehaviorStatistics>}
     */
    async getDangerBehaviorStatistics(buildingId, page, size) {
        const json = await requestServer({
            url: '/api/dashboard/danger/behavior',
            method: 'get',
            params: {
                buildingId: buildingId
            }
        });

        // 人员行为信息列表
        const subjectBehaviorList = json.dangerBehaviorPage.content;
        json.dangerBehaviorPage.content = subjectBehaviorList.map(data => {
            const subject = BaseService.convertWithEntityType(data.subject, Subject);
            const building = BaseService.convertWithEntityType(data.building, Building);
            return new SubjectBehavior(subject, data.dangerType, data.room, building, data.dangerBehaviorDays, data.lastCaptureDate, data.dangerLevel);
        });

        return new DangerBehaviorStatistics(json.lowDangerTotal, json.moderateDangerTotal, json.highDangerTotal, json.dangerBehaviorPage);
    }

    /**
     * 通行统计
     *
     * @param _buildingId 楼栋ID
     * @returns {Promise<PassStatistics>}
     */
    async getRealtimePassStatistics(_buildingId) {
        const json = await requestServer({
            url: '/api/dashboard/pass',
            method: 'get',
            params: {
                buildingId: _buildingId
            }
        });

        const { buildingId, monthlyPassTotal, strangerMonthlyPassTotal, visitorMonthlyPassTotal, todayHourlyPassInList, todayHourlyPassOutList } = json;
        // 格式化HourlyPassIn列表
        const formattedTodayHourlyPassInList = todayHourlyPassInList
            .map(data => BaseService.convertWithEntityType(data, HourlyPass));
        // 格式化HourlyPassOut列表
        const formattedTodayHourlyPassOutList = todayHourlyPassOutList
            .map(data => BaseService.convertWithEntityType(data, HourlyPass));

        return new PassStatistics(buildingId, monthlyPassTotal, strangerMonthlyPassTotal,
            visitorMonthlyPassTotal, formattedTodayHourlyPassInList, formattedTodayHourlyPassOutList);
    }
}

const statisticsService = new StatisticsService();

export default statisticsService;
