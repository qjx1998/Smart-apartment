
import BaseEntity, { Page } from './base.entity';

/**
 * 告警信息
 */
export class DangerMessage extends BaseEntity {
    /**
     * 告警规则
     */
    rule;
    /**
     * 消息内容
     */
    dangerMessageData;
    /**
     * 推送用户
     */
    targetUserId;
    /**
     * 推送状态：1推送中，2已推送，3未推送
     */
    pushState;

    constructor(id, name, state, createdBy, createdDate, updatedBy, updatedDate, rule, dangerMessageData, targetUserId, pushState) {
        super(id, name, state, createdBy, createdDate, updatedBy, updatedDate);
        this.rule = rule;
        this.dangerMessageData = dangerMessageData;
        this.targetUserId = targetUserId;
        this.pushState = pushState;
    }
}

/**
 * 告警信息分页视图对象
 */
export class DangerMessageView {
    /**
     * 告警信息
     * @link DangerMessage
     */
    dangerMessage;
    /**
     * 推送用户信息
     * @link User
     */
    user;

    constructor(dangerMessage, user) {
        this.dangerMessage = dangerMessage;
        this.user = user;
    }
}

/**
 * 分页查询的参数
 */
export class DangerMessagePagingParams extends Page {
    /**
     * 告警规则id
     */
    ruleId;
    /**
     * 告警类别:1.晚归/2.未归/3.多日未归/4.多日未出/5.设备离线',
     */
    dangerType;
    /**
     * '规则级别:1.紧急/2.严重/3.一般',
     */
    level;
    /**
     * 推送状态：1推送中，2推送成功，3推送失败
     */
    pushState;
    /**
     * 推送用户id
     */
    targetUserId;
    /**
     * 日期选项: 1:当日,2:本周,3:本月
     */
    dateOption;
    /**
     * 开始时间
     */
    beginTime;
    /**
     * 结束时间
     */
    endTime;

    constructor(page, size, total, ruleId, dangerType, level, pushState, targetUserId, dateOption, beginTime, endTime) {
        super(page, size, total);
        this.ruleId = ruleId;
        this.dangerType = dangerType;
        this.level = level;
        this.pushState = pushState;
        this.targetUserId = targetUserId;
        this.dateOption = dateOption;
        this.beginTime = beginTime;
        this.endTime = endTime;
    }
}

