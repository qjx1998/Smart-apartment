
import BaseEntity from './base.entity';

/**
 * 主机信息
 */
export default class Box extends BaseEntity {
    externalId;
    remark;

    constructor(id, name, state, externalId, remark, createdBy, createdDate, updatedBy, updatedDate) {
        super(id, name, state, createdBy, createdDate, updatedBy, updatedDate);
        this.externalId = externalId;
        this.remark = remark;
    }
}
