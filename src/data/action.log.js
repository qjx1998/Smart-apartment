
import BaseEntity, { Page } from './base.entity';
/**
 * 操作日志视图信息
 */
export class ActionLogView {
    /**
     * 操作日志信息
     * @link ActionLog
     */
    actionLog;
    /**
     * 用户信息
     * @link User
     */
    user;

    constructor(actionLog, user) {
        this.actionLog = actionLog;
        this.user = user;
    }
}

/**
 * 操作日志信息
 */
export class ActionLog extends BaseEntity {
    /**
     * 用户ID
     */
    userId;

    /**
     * 操作
     * @link Action
     */
    action;

    /**
     * 操作IP
     */
    remoteAddr;

    /**
     * 内容
     */
    content;

    constructor(id, name, state, createdBy, createdDate, updatedBy, updatedDate, userId, action, remoteAddr, content) {
        super(id, name, state, createdBy, createdDate, updatedBy, updatedDate);
        this.userId = userId;
        this.action = action;
        this.remoteAddr = remoteAddr;
        this.content = content;
    }
}

/**
 * 操作信息
 */
export class Action extends BaseEntity {
    /**
     * 标识码
     */
    code;

    /**
     * 操作类型
     */
    type;

    /**
     * 中文模板
     */
    templateZh;

    /**
     * 英文模板
     */
    templateEn;

    constructor(id, name, state, createdBy, createdDate, updatedBy, updatedDate, code, type, templateZh, templateEn) {
        super(id, name, state, createdBy, createdDate, updatedBy, updatedDate);
        this.code = code;
        this.type = type;
        this.templateZh = templateZh;
        this.templateEn = templateEn;
    }
}

/**
 * 分页查询的参数
 */
export class ActionLogParams extends Page {
    /**
     * 用户真实姓名
     */
    name;
    /**
     * 用户手机号
     */
    phone;
    /**
     * 操作类型
     */
    type;
    /**
     * 操作IP
     */
    remoteAddr;
    /**
     * 操作内容
     */
    content;
    /**
     * 起始时间
     */
    beginTime;
    /**
     * 终止时间
     */
    endTime;

    constructor(page, size, total, name, phone, type, remoteAddr, content, beginTime, endTime) {
        super(page, size, total);
        this.name = name;
        this.phone = phone;
        this.type = type;
        this.remoteAddr = remoteAddr;
        this.content = content;
        this.beginTime = beginTime;
        this.endTime = endTime;
    }
}
