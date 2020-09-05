import { Page } from '@/data/base.entity';

export default class ContinuousIn {
    /**
     * 人员
     */
    subject;
    /**
     * 房间
     */
    room;
    /**
     * 连续未归天数
     */
    dangerBehaviorDays;
    /**
     * 最近进入的时间
     */
    lastCaptureDate;
    /**
     * 异常评级
     */
    dangerLevel;

    constructor(subject, room, dangerBehaviorDays, lastCaptureDate, dangerLevel) {
        this.subject = subject;
        this.room = room;
        this.dangerBehaviorDays = dangerBehaviorDays;
        this.lastCaptureDate = lastCaptureDate;
        this.dangerLevel = dangerLevel;
    }
}

export class ContinuousInPagingParams extends Page {
    /**
     * 姓名
     */
    name;
    /**
     * 楼栋
     */
    buildingId;
    /**
     * 异常评级
     */
    dangerLevel;
    /**
     * 人员id
     */
    subjectId;
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

    constructor(page, size, total, name, buildingId, dangerLevel, subjectId, collegeId, instituteId, classId, departmentId) {
        super(page, size, total);
        this.name = name;
        this.buildingId = buildingId;
        this.dangerLevel = dangerLevel;
        this.subjectId = subjectId;
        this.collegeId = collegeId;
        this.instituteId = instituteId;
        this.classId = classId;
        this.departmentId = departmentId;
    }
}
