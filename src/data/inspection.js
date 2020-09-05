
import { Page } from './base.entity';

/**
 * 查寝数据
 */
export class Inspection {
    /**
     * 建筑物的数据
     * @link BuildingView
     */
    buildingView;

    constructor(buildingView) {
        this.buildingView = buildingView;
    }
}
/**
 * 建筑物的数据
 */
export class BuildingView {
    /**
     * 总人数
     */
    subjectTotal;
    /**
     * 出席人数
     */
    presentTotal;
    /**
     * 楼层的信息
     * @link FloorView
     */
    floorViews;

    constructor(subjectTotal, presentTotal, floorViews) {
        this.subjectTotal = subjectTotal;
        this.presentTotal = presentTotal;
        this.floorViews = floorViews;
    }
}

/**
 * 楼层信息
 */
export class FloorView {
    /**
     * 楼层号
     */
    floor;
    /**
     * 总人数
     */
    subjectTotal;
    /**
     * 出席人数
     */
    presentTotal;

    /**
     * 房间信息
     * @link RoomView
     */
    roomViews;

    constructor(floor, subjectTotal, presentTotal, roomViews) {
        this.floor = floor;
        this.subjectTotal = subjectTotal;
        this.presentTotal = presentTotal;
        this.roomViews = roomViews;
    }
}
export class RoomView {
    /**
     * 房间ID
     */
    id;

    /**
     * 房间号
     */
    name;

    /**
     * 识别主体出席信息
     * @link SubjectPresent
     */
    subjectPresents;
}
/**
 * 识别主体出席信息
 */
export class SubjectPresent {
    /**
     * 识别主体ID
     */
    id;
    /**
     * 识别主体名称
     */
    name;
    /**
     * 出席状态
     */
    present;
    /**
     * 楼层
     */
    floor;
    /**
     * 房间ID
     */
    roomId;
    /**
     * 房间名称
     */
    roomName;

    constructor(id, name, present, floor, roomId, roomName) {
        this.id = id;
        this.name = name;
        this.present = present;
        this.floor = floor;
        this.roomId = roomId;
        this.roomName = roomName;
    }
}

/**
 * 分页查询请求参数
 */
export class SuspectionPagingParams extends Page {
    /**
     * 姓名
     */
    subjectName;
    /**
     * 楼栋Id
     */
    buildingId;
    /**
     * 房间id
     */
    roomId;
    /**
     * 开始时间
     */
    beginDate;
    /**
     * 结束时间
     */
    endDate;
    /**
     * 在寝条件判断符号
     */
    presentOperator;
    /**
     * 在寝天数
     */
    presentValue;
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

    constructor(page, size, total, subjectName, buildingId, roomId, beginDate, endDate, presentOperator, presentValue, collegeId, instituteId, classId, departmentId) {
        super(page, size, total);
        this.subjectName = subjectName;
        this.buildingId = buildingId;
        this.roomId = roomId;
        this.beginDate = beginDate;
        this.endDate = endDate;
        this.presentOperator = presentOperator;
        this.presentValue = presentValue;
        this.collegeId = collegeId;
        this.instituteId = instituteId;
        this.classId = classId;
        this.departmentId = departmentId;
    }
}
