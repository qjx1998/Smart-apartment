
import BaseEntity, { Page } from './base.entity';

/**
 * 院系信息
 */
export class Institute extends BaseEntity {
    /**
     * 创建年月
     */
    created;
    /**
     * 所属学校
     */
    college;
    /**
     * 负责人id
     */
    leaderId;
    /**
     * 备注
     */
    remark;

    constructor(id, name, created, college, leaderId, remark, state, createdBy, createdDate, updatedBy, updatedDate) {
        super(id, name, state, createdBy, createdDate, updatedBy, updatedDate);
        this.created = created;
        this.college = college;
        this.leaderId = leaderId;
        this.remark = remark;
    }
}

/**
 * 院系视图信息
 */
export class InstituteView {
    /**
     * 院系信息
     * @link Institute
     */
    institute;
    /**
     * 负责人信息
     * @link User
     */
    user;

    constructor(institute, user) {
        this.institute = institute;
        this.user = user;
    }
}

/**
 * 分页查询请求参数
 */
export class InstitutePagingParams extends Page {
    /**
     * 院系名称
     */
    name;
    /**
     * 所属学校
     */
    collegeId;
    /**
     * 创办年月
     */
    created;

    constructor(page, size, name, collegeId, created) {
        super(page, size, null);
        this.name = name;
        this.collegeId = collegeId;
        this.created = created;
    }
}

/**
 * 传递的表单数据InstituteForm
 */
export class InstituteForm {
    /**
     * 院系名称
     */
    name;
    /**
     * 创办时间
     */
    created;
    /**
     * 所属学校id
     */
    collegeId;
    /**
     * 负责人id
     */
    leaderId;
    /**
     * 标记
     */
    remark;
    constructor(name, created, collegeId, leaderId, remark) {
        this.name = name;
        this.created = created;
        this.collegeId = collegeId;
        this.leaderId = leaderId;
        this.remark = remark;
    }
}
