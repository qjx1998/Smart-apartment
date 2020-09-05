
import BaseEntity, { Page } from './base.entity';

/**
 * 监控信息
 */
class Monitor extends BaseEntity {
    /**
     * 在线状态
     */
    online;
    /**
     * 设备组ID
     */
    groupId;
    /**
     * 外部ID
     */
    externalId;
    /**
     * 监控器视频流地址
     */
    videoStreamUrl;

    /**
     * 监控方向：1.进/2.出
     */
    direction;

    /**
     * 网络开关IP
     */
    networkSwitcher;

    constructor(id, name, state, createdBy, createdDate, updatedBy, updatedDate, online, groupId, externalId, boxId, videoStreamUrl, direction, networkSwitcher) {
        super(id, name, state, createdBy, createdDate, updatedBy, updatedDate);
        this.online = online;
        this.groupId = groupId;
        this.externalId = externalId;
        this.boxId = boxId;
        this.videoStreamUrl = videoStreamUrl;
        this.direction = direction;
        this.networkSwitcher = networkSwitcher;
    }
}

export default Monitor;

/**
 * 监控器分页视图对象
 */
export class MonitorView {
    /**
     * 监控器
     * @link Monitor
     */
    monitor;
    /**
     * 设备组
     * @link DeviceGroup
     */
    deviceGroup;

    constructor(monitor, deviceGroup) {
        this.monitor = monitor;
        this.deviceGroup = deviceGroup;
    }
}

/**
 * 分页查询的参数
 */
export class MonitorPagingParams extends Page {
    /**
     * 监控点名称
     */
    name;
    /**
     * 设备组id
     */
    groupId;
    /**
     * 类型
     */
    type;
    /**
     * 在线状态
     */
    online;
    /**
     * 监控方向
     */
    direction;
    /**
     * 状态
     */
    state;

    constructor(page, size, total, name, groupId, type, online, direction, state) {
        super(page, size, total);
        this.name = name;
        this.groupId = groupId;
        this.type = type;
        this.online = online;
        this.direction = direction;
        this.state = state;
    }
}
