
import BaseEntity, { Page } from './base.entity';

export class RoomView {
    /**
     * 宿舍信息
     * @link Room
     */
    room;
    /**
     * 建筑物信息
     * @link Building
     */
    building;

    constructor(room, building) {
        this.room = room;
        this.building = building;
    }
}

/**
 * 宿舍信息
 */
export class Room extends BaseEntity {
    /**
     * 所属楼栋ID
     */
    buildingId;

    /**
     * 所属楼层
     */
    floor;

    /**
     * 可容纳人数
     */
    availablePlacesNum;

    constructor(id, name, state, buildingId, floor, availablePlacesNum, createdBy, createdDate, updatedBy, updatedDate) {
        super(id, name, state, createdBy, createdDate, updatedBy, updatedDate);
        this.buildingId = buildingId;
        this.floor = floor;
        this.availablePlacesNum = availablePlacesNum;
    }
}

/**
 * 分页请求参数
 */
export class RoomPagingParams extends Page {
    buildingId;
    floor;
    /**
     * 可容纳人数
     */
    availablePlacesNum;
    name;

    constructor(page, size, buildingId, floor, availablePlacesNum, name) {
        super(page, size, null);
        this.buildingId = buildingId;
        this.floor = floor;
        this.availablePlacesNum = availablePlacesNum;
        this.name = name;
    }
}

/**
 * 批量操作参数
 */
export class BatchOperateRoomsParam {
    buildingId;
    /**
     * 楼层集合
     */
    floors;
    /**
     * 房间命令长度
     */
    nameLength;
    /**
     * 开始房间尾号
     */
    startNum;
    /**
     * 结束房间尾号
     */
    endNum;

    constructor(buildingId, floors, nameLength, startNum, endNum) {
        this.buildingId = buildingId;
        this.floors = floors;
        this.nameLength = nameLength;
        this.startNum = startNum;
        this.endNum = endNum;
    }
}

/**
 * 批量删除
 */
export class BatchDeleteRoomsParam extends BatchOperateRoomsParam {
}

/**
 * 批量新增房间的参数
 */
export class BatchCreateRoomsParam extends BatchOperateRoomsParam {
    /**
     * 房间可容纳人数
     */
    availablePlacesNum;

    constructor(buildingId, floors, nameLength, startNum, endNum, availablePlacesNum) {
        super(buildingId, floors, nameLength, startNum, endNum);
        this.availablePlacesNum = availablePlacesNum;
    }
}
