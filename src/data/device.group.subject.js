import BaseEntity from '@/data/base.entity';

export default class DeviceGroupSubject extends BaseEntity {
    /**
     * 设备组id
     */
    monitorGroupId;
    /**
     * 主体id
     */
    subjectId;

    constructor(id, name, state, createdBy, createdDate, updatedBy, updatedDate, monitorGroupId, subjectId) {
        super(id, name, state, createdBy, createdDate, updatedBy, updatedDate);
        this.monitorGroupId = monitorGroupId;
        this.subjectId = subjectId;
    }
}

export class DeviceGroupBindSubjectView {
    /**
     * 主体
     */
    subject;
    /**
     * 建筑
     */
    building;
    /**
     * 宿舍
     */
    room;
    /**
     * 设备组人员
     */
    monitorGroupSubject;

    constructor(subject, building, room, monitorGroupSubject) {
        this.subject = subject;
        this.building = building;
        this.room = room;
        this.monitorGroupSubject = monitorGroupSubject;
    }
}

