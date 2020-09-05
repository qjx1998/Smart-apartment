
import BaseEntity, { Page } from './base.entity';

/**
 * 告警规则-推送周期视图
 */
export class DangerRuleView {
    /**
     * 告警规则信息
     * @link DangerRule
     */
    dangerRule;
    /**
     * 推送周期信息
     * @link CronData
     */
    cronData;

    constructor(dangerRule, cronData) {
        this.dangerRule = dangerRule;
        this.cronData = cronData;
    }
}

/**
 * 告警规则表单信息（用于更新和新增）
 */
export class DangerRuleForm extends BaseEntity {
    /**
     * 规则级别
     */
    level;
    /**
     * 规则种类
     */
    type;
    /**
     * 告警类别
     */
    dangerType;
    /**
     * 推送方式
     */
    notifyType;
    /**
     * 推送周期信息
     * @link CronData
     */
    cronData;
    /**
     * 告警条件
     * @link DangerCondition
     */
    conditions;
    /**
     * 通用规则下定义的数据来源和消息的接收目标
     */
    domain;
    /**
     * 自定义规则下定义的数据来源
     * @link CustomerSourceInfo
     */
    dataSource;
    /**
     * 自定义规则下消息的接收目标
     */
    targetUserId;

    constructor(id, name, state, createdBy, createdDate, updatedBy, updatedDate, level, type, dangerType, notifyType, cronData, conditions, domain, dataSource, targetUserId) {
        super(id, name, state, createdBy, createdDate, updatedBy, updatedDate);
        this.level = level;
        this.type = type;
        this.dangerType = dangerType;
        this.notifyType = notifyType;
        this.cronData = cronData;
        this.conditions = conditions;
        this.domain = domain;
        this.dataSource = dataSource;
        this.targetUserId = targetUserId;
    }
}

/**
 * 告警规则信息
 */
export class DangerRule extends BaseEntity {
    /**
     * 规则级别
     */
    level;
    /**
     * 规则种类
     */
    type;
    /**
     * 告警类别
     */
    dangerType;
    /**
     * 推送方式
     */
    notifyType;
    /**
     * 推送周期
     */
    cron;
    /**
     * 推送周期描述
     */
    cronDesc;
    /**
     * 告警条件
     * @link DangerCondition
     */
    conditions;
    /**
     * 通用规则下定义的数据来源和消息的接收目标
     */
    domain;
    /**
     * 自定义规则下定义的数据来源
     * @link CustomerSourceInfo
     */
    dataSource;
    /**
     * 自定义规则下消息的接收目标
     */
    targetUserId;

    constructor(id, name, state, createdBy, createdDate, updatedBy, updatedDate, level, type, dangerType, notifyType, cron, cronDesc, conditions, domain, dataSource, targetUserId) {
        super(id, name, state, createdBy, createdDate, updatedBy, updatedDate);
        this.level = level;
        this.type = type;
        this.dangerType = dangerType;
        this.notifyType = notifyType;
        this.cron = cron;
        this.cronDesc = cronDesc;
        this.conditions = conditions;
        this.domain = domain;
        this.dataSource = dataSource;
        this.targetUserId = targetUserId;
    }
}

/**
 * 告警条件信息
 */
export class DangerCondition {
    /**
     * 类型
     */
    type;
    /**
     * 运算符
     */
    operator;
    /**
     * 阈值
     */
    num;

    constructor(type, operator, num) {
        this.type = type;
        this.operator = operator;
        this.num = num;
    }
}

/**
 * 自定义规则下来源信息
 */
export class CustomerSourceInfo {
    /**
     * 学校id
     */
    collegeId;
    /**
     * 院系id
     */
    instituteId;
    /**
     * 部门id
     */
    departmentId;
    /**
     * 班级id
     */
    clazzId;

    constructor(collegeId, instituteId, departmentId, clazzId) {
        this.collegeId = collegeId;
        this.instituteId = instituteId;
        this.departmentId = departmentId;
        this.clazzId = clazzId;
    }
}

/**
 * 推送周期
 */
export class CronData {
    /**
     * 周期类型
     */
    cycleType;
    /**
     * 周期值
     */
    cycleValue;
    /**
     * 推送时刻
     */
    time;

    constructor(cycleType, cycleValue, time) {
        this.cycleType = cycleType;
        this.cycleValue = cycleValue;
        this.time = time;
    }
}

/**
 * 分页查询的参数
 */
export class DangerRulePagingParams extends Page {
    /**
     * 规则名称
     */
    name;
    /**
     * 规则级别
     */
    level;
    /**
     * 规则状态
     */
    state;
    /**
     * 告警类别
     */
    dangerType;

    constructor(page, size, total, name, level, state, dangerType) {
        super(page, size, total);
        this.name = name;
        this.level = level;
        this.state = state;
        this.dangerType = dangerType;
    }
}
