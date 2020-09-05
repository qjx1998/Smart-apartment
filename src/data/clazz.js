
import BaseEntity, { Page } from './base.entity';

/**
 * 班级信息
 */
export class Clazz extends BaseEntity {
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
     * 年级
     * @link Grade
     */
    grade;

    /**
     * 班主任id
     */
    masterId;

    /**
     * 备注
     */
    remark;

    constructor(id, name, state, college, institute, grade, masterId, remark, createBy, createDate, updateBy, updatedDate) {
        super(id, name, state, createBy, createDate, updateBy, updatedDate);
        this.college = college;
        this.institute = institute;
        this.grade = grade;
        this.masterId = masterId;
    }
}

/**
 * 班级视图信息
 */
export class ClazzView {
    /**
     * 班级信息
     * @link Clazz
     */
    clazz;

    /**
     * 班主任信息
     * @link User
     */
    user;

    constructor(clazz, user) {
        this.clazz = clazz;
        this.user = user;
    }
}
/**
 * 更新 新增时的表单数据
 */
export class ClazzForm extends BaseEntity {
    /**
     *学校id
     */
    collegeId;

    /**
     * 院系id
     */
    instituteId;

    /**
     * 年级id
     */
    gradeId;

    /**
     * 班主任id
     */
    masterId;

    /**
     * 备注
     */
    remark;

    constructor(id, name, state, collegeId, instituteId, gradeId, masterId, remark, createBy, createDate, updateBy, updatedDate) {
        super(id, name, state, createBy, createDate, updateBy, updatedDate);
        this.collegeId = collegeId;
        this.instituteId = instituteId;
        this.gradeId = gradeId;
        this.masterId = masterId;
        this.remark = remark;
    }
}

/**
 * 分页请求参数
 */
export class ClazzPagingParams extends Page {
    /**
     * 班级名称
     */
    name;

    /**
     * 所属学校id
     */
    collegeId;

    /**
     * 所属院系id
     */
    instituteId;

    /**
     * 所属年级id
     */
    gradeId;

    /**
     * 班主任id
     */
    masterId;

    constructor(page, size, name, collegeId, instituteId, gradeId, masterId) {
        super(page, size, null);
        this.name = name;
        this.collegeId = collegeId;
        this.instituteId = instituteId;
        this.gradeId = gradeId;
        this.masterId = masterId;
    }
}

