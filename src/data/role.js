
import BaseEntity, { Page } from './base.entity';

/**
 *角色信息
 */
export class Role extends BaseEntity {
    /**
     * 角色名称
     */
    name;
    /**
     * 备注
     */
    remark;

    constructor(name, remark, id, state, createdBy, createdDate, updatedBy, updatedDate) {
        super(id, state, createdBy, createdDate, updatedBy, updatedDate);
        this.name = name;
        this.remark = remark;
    }
}

/**
 * 分页请求参数
 */
export class RolePagingParams extends Page {
    /**
     * 角色名称
     */
    name;

    constructor(name, page, size) {
        super(page, size);
        this.name = name;
    }
}

/**
 * 角色相关视图
 */
export class RoleView {
    /**
     * 角色名称
     */
    name
    /**
     * 权限ID列表
     */
    permissionIds
    /**
     * 用户ID列表
     */
    userIds
    /**
     * 备注
     */
    remark
    /**
     * 创建时间
     */
    createdDate
    /**
     * 更新时间
     */
    updatedDate

    constructor(name, permissionIds, userIds, remark, createdDate, updatedDate) {
        this.name = name;
        this.permissionIds = permissionIds;
        this.userIds = userIds;
        this.remark = remark;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }
}

/**
 * 传递的表单信息RoleForm
 */
export class RoleForm {
    /**
     * 角色名称
     */
    name;
    /**
     * 权限参数列表
     */
    permissionIds;
    /**
     * 关联用户Id列表
     */
    userIds;
    /**
     * 备注
     */
    remark;

    constructor(name, permissionIds, userIds, remark) {
        this.name = name;
        this.permissionIds = permissionIds;
        this.userIds = userIds;
        this.remark = remark;
    }
}
