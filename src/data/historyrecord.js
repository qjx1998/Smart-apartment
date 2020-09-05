
import BaseEntity, { Page } from './base.entity';

/**
 * 历史记录
 */
export class HistoryRecord extends BaseEntity {
    /**
     * 抓拍时间
     */
    captureTime;
    /**
     * 抓拍图片的url
     */
    captureImgUrl;
    /**
     * 抓拍的监控屏幕
     * @link Monitor
     */
    monitor;
    /**
     * 识别人员信息
     * @link Subject
     */
    subject;

    constructor(id, name, state, captureTime, captureImgUrl, monitor, subject, createdBy, createdDate, updatedBy, updatedDate) {
        super(id, name, state, createdBy, createdDate, updatedBy, updatedDate);
        this.captureTime = captureTime;
        this.captureImgUrl = captureImgUrl;
        this.monitor = monitor;
        this.subject = subject;
    }
}

/**
 * 历史记录视图
 */
export class HistoryRecordView {
    /**
     * 历史记录
     * @link HistoryRecord
     */
    historyRecord;
    /**
     * 建筑物
     * @link Building
     */
    building;
    /**
     * 宿舍
     * @link Room
     */
    room;

    constructor(historyRecord, building, room) {
        this.historyRecord = historyRecord;
        this.building = building;
        this.room = room;
    }
}

export class HistoryPageParams extends Page {
    /**
     * 抓拍的监视器id
     */
    monitorId;
    /**
     * 抓拍对象类型
     */
    subjectType;
    /**
     * 开始时间
     */
    captureTimeStart;
    /**
     * 结束时间
     */
    captureTimeEnd;

    /**
     * 姓名
     */
    subjectName;

    /**
     * id
     */

    constructor(
        page, size, monitorId, subjectType, captureTimeStart,
        captureTimeEnd, subjectName) {
        super(page, size, null);
        this.monitorId = monitorId;
        this.subjectType = subjectType;
        this.captureTimeStart = captureTimeStart;
        this.captureTimeEnd = captureTimeEnd;
        this.subjectName = subjectName;
    }
}

export class PersonHistoryPresentRecordPageParams extends Page {
    /**
     * 在寝状态
     */
    present;
    /**
     * 开始日期
     */
    beginDate;
    /**
     * 结束日期
     */
    endDate;

    constructor(page, size, total, present, beginDate, endDate) {
        super(page, size, total);
        this.present = present;
        this.beginDate = beginDate;
        this.endDate = endDate;
    }
}
