import { Page } from '@/data/base.entity';

export class LateReturn {
    /**
     * 人员信息
     */
    subject;
    /**
     * 楼栋
     */
    building;
    /**
     * 宿舍
     */
    room;
    /**
     * 累计晚归次数
     */
    stayOutLateTotal;

    constructor(subject, building, room, stayOutLateTotal) {
        this.subject = subject;
        this.building = building;
        this.room = room;
        this.stayOutLateTotal = stayOutLateTotal;
    }
}

export class LateReturnPagingParams extends Page {
    /**
     * 楼栋id
     */
    buildingId;
    /**
     * 宿舍id
     */
    roomId;
    /**
     * 学校id
     */
    collegeId;
    /**
     * 院系id
     */
    instituteId;
    /**
     * 班级id
     */
    classId;
    /**
     * 部门id
     */
    departmentId;
    /**
     * 姓名
     */
    name;
    /**
     * 开始日期
     */
    beginDate;
    /**
     * 结束日期
     */
    endDate;

    constructor(page, size, total, buildingId, roomId, collegeId, instituteId, classId, departmentId, name, beginDate, endDate) {
        super(page, size, total);
        this.buildingId = buildingId;
        this.roomId = roomId;
        this.collegeId = collegeId;
        this.instituteId = instituteId;
        this.classId = classId;
        this.departmentId = departmentId;
        this.name = name;
        this.beginDate = beginDate;
        this.endDate = endDate;
    }
}

export class LateHistory {
    /**
     * 人员
     */
    subject;
    /**
     * 抓拍的监控屏幕
     */
    monitor;
    /**
     * 晚归日期
     */
    date;
    /**
     * 晚归时间
     */
    captureTime;

    constructor(subject, monitor, date, captureTime) {
        this.subject = subject;
        this.monitor = monitor;
        this.date = date;
        this.captureTime = captureTime;
    }
}

export class LateHistoryPagingParams extends Page {
    /**
     * 用户id
     */
    subjectId;
    /**
     * 开始日期
     */
    beginDate;
    /**
     * 终止日期
     */
    endDate;

    constructor(page, size, total, subjectId, beginDate, endDate) {
        super(page, size, total);
        this.subjectId = subjectId;
        this.beginDate = beginDate;
        this.endDate = endDate;
    }
}
