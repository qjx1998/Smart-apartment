
import BaseEntity, { Page } from './base.entity';

/**
 * 人员信息视图
 */
export class SubjectView {
    /**
     * 人员信息
     * @link Subject
     */
    subject;
    /**
     * 宿舍信息
     * @link Room
     */
    room;
    /**
     * 楼栋信息
     * @link Building
     */
    building;

    constructor(subject, room, building) {
        this.subject = subject;
        this.room = room;
        this.building = building;
    }
}

/**
 * 人员信息
 */
export class Subject extends BaseEntity {
    /**
     * 学号/职工号 人员在组织内部的ID
     */
    opid;
    /**
     * 名称
     */
    name;
    /**
     * 识别主体类型:1.教职工/2.学生/3.访客
     */
    type;
    /**
     * 外部ID
     */
    externalId;

    /**
     * 外部照片ID
     */
    externalPhotoId;
    /**
     * 照片oss的url地址
     */
    photoUrl;
    /**
     * 性别:0.未知/1.男性/2.女性
     */
    gender;
    /**
     * 身份证
     */
    certificateIdentification;
    /**
     * 移动电话号码
     */
    phone;
    /**
     * 建筑物ID
     */
    buildingId;
    /**
     * 房间号
     */
    roomId;
    /**
     * 学校
     * @link College
     */
    college;
    /**
     * 院系
     * @link Institute
     */
    institute;
    /**
     * 班级
     * @link Class
     */
    clazz;
    /**
     * 部门
     * @link Department
     */
    department;
    /**
     * 单位
     */
    organization;
    /**
     * 访问起始时间
     */
    recogStartTime;
    /**
     * 访问终止事件
     */
    recogEndTime;
    /**
     * 访客来源
     */
    visitorSource;

    constructor(id, name, state, createdBy, createdDate, updatedBy, updatedDate, opid, type, externalId, externalPhotoId, photoUrl, gender, certificateIdentification, phone, buildingId, roomId, college, institute, clazz, department, organization, recogStartTime, recogEndTime, visitorSource) {
        super(id, name, state, createdBy, createdDate, updatedBy, updatedDate);
        this.opid = opid;
        this.name = name;
        this.type = type;
        this.externalId = externalId;
        this.externalPhotoId = externalPhotoId;
        this.photoUrl = photoUrl;
        this.gender = gender;
        this.certificateIdentification = certificateIdentification;
        this.phone = phone;
        this.buildingId = buildingId;
        this.roomId = roomId;
        this.college = college;
        this.institute = institute;
        this.clazz = clazz;
        this.department = department;
        this.organization = organization;
        this.recogStartTime = recogStartTime;
        this.recogEndTime = recogEndTime;
        this.visitorSource = visitorSource;
    }
}

/**
 * 人员基本参数（用于新建，更新）
 */
export class SubjectBaseParams extends BaseEntity {
    /**
     * 学号/职工号 人员在组织内部的ID
     */
    opid;
    /**
     * 名称
     */
    name;
    /**
     * 识别主体类型:1.教职工/2.学生/3.访客
     */
    type;
    /**
     * 外部ID
     */
    externalId;
    /**
     * 外部照片ID
     */
    externalPhotoId;
    /**
     * 照片oss的url地址
     */
    photoUrl;
    /**
     * 性别:0.未知/1.男性/2.女性
     */
    gender;
    /**
     * 身份证
     */
    certificateIdentification;
    /**
     * 移动电话号码
     */
    phone;
    /**
     * 建筑物ID
     */
    buildingId;
    /**
     * 房间号
     */
    roomId;
    /**
     * 访问起始时间
     */
    recogStartTime;
    /**
     * 访问终止事件
     */
    recogEndTime;
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
     * 访客来源
     */
    visitorSource;

    constructor(id, name, state, createdBy, createdDate, updatedBy, updatedDate, opid, type, externalId, externalPhotoId, photoUrl, gender, certificateIdentification, phone, buildingId, roomId, recogStartTime, recogEndTime, collegeId, instituteId, classId, departmentId, visitorSource) {
        super(id, name, state, createdBy, createdDate, updatedBy, updatedDate);
        this.opid = opid;
        this.name = name;
        this.type = type;
        this.externalId = externalId;
        this.externalPhotoId = externalPhotoId;
        this.photoUrl = photoUrl;
        this.gender = gender;
        this.certificateIdentification = certificateIdentification;
        this.phone = phone;
        this.buildingId = buildingId;
        this.roomId = roomId;
        this.recogStartTime = recogStartTime;
        this.recogEndTime = recogEndTime;
        this.collegeId = collegeId;
        this.instituteId = instituteId;
        this.classId = classId;
        this.departmentId = departmentId;
        this.visitorSource = visitorSource;
    }
}

/**
 * 分页请求参数
 */
export class SubjectPagingParams extends Page {
    name;
    gender;
    type;
    buildingId;
    roomId;
    /**
     * 身份证
     */
    certificateIdentification;
    /**
     * 面部上传状态
     */
    uploadFaceStatus;
    /**
     * 手机号
     */
    phone;
    /**
     * 用户id
     */
    subjectId;
    /**
     * 状态
     */
    state;
    /**
     * 访问起始时间
     */
    recogStartTime;
    /**
     * 访问终止时间
     */
    recogEndTime;
    /**
     * 学号/职工号 人员在组织内部的ID
     */
    opid;
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
     * 访客来源
     */
    visitorSource;
    /**
     * 异常类型(0:全部,1:未出,2:未归)
     */
    dangerType;

    constructor(page, size, total, name, gender, type, buildingId, roomId, certificateIdentification, uploadFaceStatus, phone, subjectId, state, recogStartTime, recogEndTime, opid, collegeId, instituteId, classId, departmentId, visitorSource, dangerType) {
        super(page, size, total);
        this.name = name;
        this.gender = gender;
        this.type = type;
        this.buildingId = buildingId;
        this.roomId = roomId;
        this.certificateIdentification = certificateIdentification;
        this.uploadFaceStatus = uploadFaceStatus;
        this.phone = phone;
        this.subjectId = subjectId;
        this.state = state;
        this.recogStartTime = recogStartTime;
        this.recogEndTime = recogEndTime;
        this.opid = opid;
        this.collegeId = collegeId;
        this.instituteId = instituteId;
        this.classId = classId;
        this.departmentId = departmentId;
        this.visitorSource = visitorSource;
        this.dangerType = dangerType;
    }
}

/**
 * 恢复主体参数
 */
export class RestoreSubjectParams {
    /**
     * 建筑物id
     */
    buildingId;
    /**
     * 房间id
     */
    roomId;
    /**
     * 访问起始时间
     */
    recogStartTime;
    /**
     * 访问终止时间
     */
    recogEndTime;
    /**
     * 用户id
     */
    subjectId;

    constructor(subjectId, recogStartTime, recogEndTime) {
        this.subjectId = subjectId;
        this.recogStartTime = recogStartTime;
        this.recogEndTime = recogEndTime;
    }
}

/**
 * 导入人脸照片结果视图
 */
export class BatchUploadPhotoResultView {
    /**
     * 总数量
     */
    totalNumber;
    /**
     * 错误数量
     */
    failNumber;
    /**
     * 成功数量
     */
    successNumber;
    /**
     * 文件名
     */
    fileName;

    constructor(subjectId, recogStartTime, recogEndTime) {
        this.subjectId = subjectId;
        this.recogStartTime = recogStartTime;
        this.recogEndTime = recogEndTime;
    }
}
