
/**
 * 人员统计
 */
export class SubjectStatistics {
    /**
     * 楼栋ID
     */
    buildingId;
    /**
     * 人员信息总量
     */
    total;
    /**
     * 已激活的人员信息总量(上传了照片的人)
     */
    activatedTotal;
    /**
     * 男性总数
     */
    maleTotal;
    /**
     * 女性总数
     */
    femaleTotal;
    /**
     * 出席人员总数
     */
    presentTotal;
    /**
     * 未出席人员总数
     */
    noPresentTotal;

    constructor(buildingId, total, activatedTotal, maleTotal, femaleTotal, presentTotal, noPresentTotal) {
        this.buildingId = buildingId;
        this.total = total;
        this.activatedTotal = activatedTotal;
        this.maleTotal = maleTotal;
        this.femaleTotal = femaleTotal;
        this.presentTotal = presentTotal;
        this.noPresentTotal = noPresentTotal;
    }
}

/**
 * 设备统计
 */
export class MonitorStatistics {
    /**
     * 楼栋ID
     */
    buildingId;
    /**
     * 在线数量
     */
    onlineTotal;
    /**
     * 离线数量
     */
    offlineTotal;

    constructor(buildingId, onlineTotal, offlineTotal) {
        this.buildingId = buildingId;
        this.onlineTotal = onlineTotal;
        this.offlineTotal = offlineTotal;
    }
}

/**
 * 陌生人统计
 */
export class StrangerStatistics {
    /**
     * 楼栋ID
     */
    buildingId;
    /**
     * 监控器的识别记录列表
     * @link MonitorRegHistory
     */
    monitorRegHistories;

    constructor(buildingId, monitorRegHistories) {
        this.buildingId = buildingId;
        this.monitorRegHistories = monitorRegHistories;
    }
}

/**
 * 设备识别次数统计
 */
export class MonitorRegHistory {
    /**
     * 设备
     * @link Monitor
     */
    monitor;
    /**
     * 识别总数
     */
    total;

    constructor(monitor, total) {
        this.monitor = monitor;
        this.total = total;
    }
}

/**
 * 识别统计
 */
export class RecognitionStatistics {
    /**
     * 楼栋ID
     */
    buildingId;
    /**
     * 人员识别数量统计列表
     * @link SubjectRegHistory
     */
    subjectRegHistories;

    constructor(buildingId, subjectRegHistories) {
        this.buildingId = buildingId;
        this.subjectRegHistories = subjectRegHistories;
    }
}

/**
 * 人员识别次数统计
 */
export class SubjectRegHistory {
    /**
     * 人员
     * @link Subject
     */
    subject;
    /**
     * 识别总数
     */
    total;

    constructor(subject, total) {
        this.subject = subject;
        this.total = total;
    }
}

/**
 * 异常行为统计
 */
export class DangerBehaviorStatistics {
    /**
     * 低度异常人员总数
     */
    lowDangerTotal;
    /**
     * 中度异常人员总数
     */
    moderateDangerTotal;
    /**
     * 高度异常人员总数
     */
    highDangerTotal;
    /**
     * 人员异常行为信息的分页数据
     * @link SubjectBehavior
     */
    dangerBehaviorPage;

    constructor(lowDangerTotal, moderateDangerTotal, highDangerTotal, dangerBehaviorPage) {
        this.lowDangerTotal = lowDangerTotal;
        this.moderateDangerTotal = moderateDangerTotal;
        this.highDangerTotal = highDangerTotal;
        this.dangerBehaviorPage = dangerBehaviorPage;
    }
}

/**
 * 人员行为信息
 */
export class SubjectBehavior {
    /**
     * 人员信息
     * @link Subject
     */
    subject;
    /**
     * 异常类型
     */
    dangerType;
    /**
     * 房间信息
     * @link Room
     */
    room;
    /**
     * 楼栋信息
     * @link Building
     */
    building;
    /**
     * 连续异常行为天数
     */
    dangerBehaviorDays;
    /**
     * 最近捕捉时间
     */
    lastCaptureDate;
    /**
     * 异常评级
     */
    dangerLevel;

    constructor(subject, dangerType, room, building, dangerBehaviorDays, lastCaptureDate, dangerLevel) {
        this.subject = subject;
        this.dangerType = dangerType;
        this.room = room;
        this.building = building;
        this.dangerBehaviorDays = dangerBehaviorDays;
        this.lastCaptureDate = lastCaptureDate;
        this.dangerLevel = dangerLevel;
    }
}

/**
 * 通行统计
 */
export class PassStatistics {
    /**
     * 楼栋ID
     */
    buildingId;
    /**
     * 每月通行总数
     */
    monthlyPassTotal;
    /**
     * 陌生人每月通行总数
     */
    strangerMonthlyPassTotal;
    /**
     * 访客每月通行总数
     */
    visitorMonthlyPassTotal;
    /**
     * 当天每小时通行总数
     * @link HourlyPass
     */
    todayHourlyPassInList;
    /**
     * 当天每小时通行总数
     * @link HourlyPass
     */
    todayHourlyPassOutList;

    constructor(buildingId, monthlyPassTotal, strangerMonthlyPassTotal, visitorMonthlyPassTotal, todayHourlyPassInList, todayHourlyPassOutList) {
        this.buildingId = buildingId;
        this.monthlyPassTotal = monthlyPassTotal;
        this.strangerMonthlyPassTotal = strangerMonthlyPassTotal;
        this.visitorMonthlyPassTotal = visitorMonthlyPassTotal;
        this.todayHourlyPassInList = todayHourlyPassInList;
        this.todayHourlyPassOutList = todayHourlyPassOutList;
    }
}

/**
 * 每小时通行信息
 */
export class HourlyPass {
    /**
     * 小时
     */
    hour;
    /**
     * 通行总数；
     */
    passTotal;

    constructor(hour, passTotal) {
        this.hour = hour;
        this.passTotal = passTotal;
    }
}
