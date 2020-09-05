
import BaseEntity, { Page } from './base.entity';

/**
 * 设备组
 */
export default class DeviceGroup extends BaseEntity {
    /**
     * 授权楼栋集合
     */
    buildingIds;
    /**
     * 备注
     */
    remark;
    constructor(id, name, state, createdBy, createdDate, updatedBy, updatedDate, buildingIds, remark) {
        super(id, name, state, createdBy, createdDate, updatedBy, updatedDate);
        this.buildingIds = buildingIds;
        this.remark = remark;
    }
}

/**
 * 设备组信息视图
 */
export class DeviceGroupView {
    /**
     * 设备组
     */
    deviceGroup;
    /**
     * 楼栋组
     */
    buildings;

    constructor(deviceGroup, buildings) {
        this.deviceGroup = deviceGroup;
        this.buildings = buildings;
    }
}

export class DeviceGroupPagingParams extends Page {
    /**
     * 设备组名称
     */
    name;
    /**
     * 楼栋id
     */
    buildingId;
    /**
     * 状态
     */
    state;

    constructor(page, size, total, name, buildingId, state) {
        super(page, size, null);
        this.name = name;
        this.buildingId = buildingId;
        this.state = state;
    }
}

