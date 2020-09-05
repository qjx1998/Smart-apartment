
import BaseEntity, { Page } from './base.entity';

/**
 * 学校信息
 */
export class College extends BaseEntity {
    /**
     * 地址
     */
    address;
    /**
     * 创建年月
     */
    created;
    /**
     * 负责人id
     */
    leaderId;
    /**
     * 备注
     */
    remark;

    constructor(id, name, address, created, leaderId, remark, state, createdBy, createdDate, updatedBy, updatedDate) {
        super(id, name, state, createdBy, createdDate, updatedBy, updatedDate);
        this.address = address;
        this.created = created;
        this.leaderId = leaderId;
        this.remark = remark;
    }
}

/**
 * 学校视图信息
 */
export class CollegeView {
    /**
     * 学校信息
     * @link College
     */
    college;
    /**
     * 负责人信息
     * @link User
     */
    user;

    constructor(college, user) {
        this.college = college;
        this.user = user;
    }
}

/**
 * 分页查询请求参数
 */
export class CollegePagingParams extends Page {
    /**
     * 学校名称
     */
    name;
    /**
     * 地址
     */
    address;
    /**
     * 创办年月
     */
    created;

    constructor(page, size, name, address, created) {
        super(page, size, null);
        this.name = name;
        this.address = address;
        this.created = created;
    }
}
