
import BaseEntity, { Page } from './base.entity';

/**
 * 部门信息
 */
class Department extends BaseEntity {
    /**
     * 部门名称
     */
    name;
    /**
     * 所属学校
     * @link College
     */
    college;
    /**
     * 所属院系
     * @link Institute
     */
    institute;
    /**
     * 负责人
     */
    leaderId;
    /**
     * 备注
     */
    remark;

    constructor(id, state, createdBy, createdDate, updatedBy, updatedDate, name, collage, institute, leaderId, remark) {
        super(id, state, createdBy, createdDate, updatedBy, updatedDate);
        this.name = name;
        this.college = collage;
        this.institute = institute;
        this.leaderId = leaderId;
        this.remark = remark;
    }
}

/**
 * 部门分页视图对象
 */
export class DepartmentView {
    /**
     * 部门
     * @link Department
     */
    department;
    /**
     * 负责人信息
     * @link User
     */
    user;

    constructor(department, user) {
        this.department = department;
        this.user = user;
    }
}

/**
 * 分页查询的参数
 */
export class DepartmentPagingParams extends Page {
    /**
     * 部门名称
     */
    name;
    /**
     * 大学id
     */
    collegeId;
    /**
     * 院系id
     */
    instituteId;

    constructor(page, size, total, name, collegeId, instituteId) {
        super(page, size, total);
        this.name = name;
        this.collegeId = collegeId;
        this.instituteId = instituteId;
    }
}

/**
 * 部门信息参数（用于新增，修改）
 */
export class DepartmentForm {
    /**
     * 部门名称
     */
    name;
    /**
     * 大学id
     */
    collegeId;
    /**
     * 院系id
     */
    instituteId;
    /**
     * 负责人
     */
    leaderId;
    /**
     * 备注
     */
    remark;

    constructor(name, collegeId, instituteId, leaderId, remark) {
        this.name = name;
        this.collegeId = collegeId;
        this.instituteId = instituteId;
        this.leaderId = leaderId;
        this.remark = remark;
    }
}

export default Department;
