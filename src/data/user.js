
import BaseEntity, { Page } from './base.entity';

/**
 * 用户信息
 */
export class User extends BaseEntity {
    /**
     * 用户名
     */
    accountName;

    /**
     * 密码
     */
    password;

    /**
     * 邮箱
     */
    email;

    /**
     * 手机号
     */
    phone;

    /**
     * 用户类型
     */
    type;

    constructor(id, name, state, accountName, password, email, phone, type, createdBy, createdDate, updatedBy, updatedDate) {
        super(id, name, state, createdBy, createdDate, updatedBy, updatedDate);
        this.accountName = accountName;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.type = type;
    }
}

/**
 * 分页请求参数
 */
export class UserPagingParams extends Page {
    /**
     * 用户名
     */
    accountName;
    /**
     * 真实姓名
     */
    name;
    /**
     * 状态
     */
    state;
    /**
     * 用户类型
     */
    type;

    constructor(page, size, accountName, name, state, type) {
        super(page, size, null);
        this.accountName = accountName;
        this.name = name;
        this.state = state;
        this.type = type;
    }
}

/**
 * 修改密码请求参数表单
 */
export class UpdatePasswordForm {
    /**
     * 原密码
     */
    oldPassword;
    /**
     * 新密码
     */
   newPassword;

   constructor(oldPassword, newPassword) {
       this.oldPassword = oldPassword;
       this.newPassword = newPassword;
   }
}
