
import BaseEntity, { Page } from './base.entity';

/**
 * 访客申请记录信息
 */
export class VisitorApplyRecord extends BaseEntity {
    /**
     * 识别主体
     * @link Subject
     */
    subject;
    /**
     * 建筑物
     * @link Building
     */
    building;
    /**
     * 房间
     * @link Room
     */
    room;
    /**
     * 访问开始时间
     */
    recogStartTime;
    /**
     * 访问结束时间
     */
    recogEndTime;
    /**
     * 申请事由
     */
    applyReason;
    /**
     * 审核状态：0.审核中/1.审核成功/2.审核失败
     */
    auditState;
    /**
     * 审批意见
     */
    auditOpinion;

    constructor(subject, building, room, recogStartTime, recogEndTime, applyReason, auditState, auditOpinion, id, name, state, createdBy, createdDate, updatedBy, updatedDate) {
        super(id, name, state, createdBy, createdDate, updatedBy, updatedDate);
        this.subject = subject;
        this.building = building;
        this.room = room;
        this.recogStartTime = recogStartTime;
        this.recogEndTime = recogEndTime;
        this.applyReason = applyReason;
        this.auditState = auditState;
        this.auditOpinion = auditOpinion;
    }
}

/**
 * 访客申请记录视图
 */
export class VisitorApplyRecordView {
    /**
     * 访客申请记录
     * @link VisitorApplyRecord
     */
    visitorApplyRecord;
    /**
     * 总申请天数
     */
    totalDays;

    constructor(visitorApplyRecord, totalDays) {
        this.visitorApplyRecord = visitorApplyRecord;
        this.totalDays = totalDays;
    }
}

/**
 * 访客审核参数
 */
export class VisitorApplyParam {
    /**
     * 建筑物Id
     */
    buildingId;
    /**
     * 房间Id
     */
    roomId;
    /**
     * 访问开始时间
     */
    recogStartTime;
    /**
     * 访问结束时间
     */
    recogEndTime;
    /**
     * 审核状态：0.审核中/1.审核成功/2.审核失败
     */
    auditState;
    /**
     * 审批意见
     */
    auditOpinion;

    constructor(buildingId, roomId, recogStartTime, recogEndTime, auditState, auditOpinion) {
        this.buildingId = buildingId;
        this.roomId = roomId;
        this.recogStartTime = recogStartTime;
        this.recogEndTime = recogEndTime;
        this.auditState = auditState;
        this.auditOpinion = auditOpinion;
    }
}

/**
 * 分页查询请求参数
 */
export class VisitorApplyRecordPagingParams extends Page {
    /**
     * 关键字
     */
    keyWord;
    /**
     * 审核状态
     */
    auditState;
    /**
     * 访客姓名
     */
    name;
    /**
     * 手机号码
     */
    phone;
    /**
     * 房间名称
     */
    roomName;
    /**
     * 访客性别
     */
    gender;
    /**
     * 时间范围
     */
    timeFrameOfApply;

    constructor(page, size, name, keyWord, auditState, phone, roomName, gender, timeFrameOfApply) {
        super(page, size, null);
        this.name = name;
        this.keyWord = keyWord;
        this.auditState = auditState;
        this.phone = phone;
        this.roomName = roomName;
        this.gender = gender;
        this.timeFrameOfApply = timeFrameOfApply;
    }
}
