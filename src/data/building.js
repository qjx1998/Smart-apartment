
import BaseEntity, { Page } from './base.entity';

/**
 * 建筑物信息
 */
class Building extends BaseEntity {
    /**
     * 名称
     */
    name;
    /**
     * 层数
     */
    floor;
    /**
     * 备注
     */
    remark;

    constructor(id, name, floor, remark, state, createdBy, createdDate, updatedBy, updatedDate) {
        super(id, state, createdBy, createdDate, updatedBy, updatedDate);
        this.name = name;
        this.remark = remark;
        this.floor = floor;
    }
}

export default Building;

/**
 * 分页查询请求参数
 */
export class BuildingPagingParams extends Page {
    name;
    floor;

    constructor(page, size, name, floor) {
        super(page, size, null);
        this.name = name;
        this.floor = floor;
    }
}
