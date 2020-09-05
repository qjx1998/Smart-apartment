import BaseEntity, { Page } from '@/data/base.entity';

export default class SubjectMonitor extends BaseEntity {
    /**
     * 主体id
     */
    subjectId;
    /**
     * 设备id
     */
    monitorId;
    /**
     * 异常代码
     */
    errorCode;

    constructor(id, name, state, createdBy, createdDate, updatedBy, updatedDate, subjectId, monitorId, errorCode) {
        super(id, name, state, createdBy, createdDate, updatedBy, updatedDate);
        this.subjectId = subjectId;
        this.monitorId = monitorId;
        this.errorCode = errorCode;
    }
}

export class SubjectMonitorView {
    /**
     * subjectMonitor
     */
    subjectMonitor;
    /**
     * 主体
     */
    subject;
    /**
     * 设备
     */
    monitor;

    constructor(subjectMonitor, subject, monitor) {
        this.subjectMonitor = subjectMonitor;
        this.subject = subject;
        this.monitor = monitor;
    }
}

export class SubjectMonitorPagingParams extends Page {
    /**
     * 主体姓名
     */
    subjectName;
    /**
     * 主体id
     */
    subjectId;
    /**
     * 设备id
     */
    monitorId;
    /**
     * 错误码
     */
    errorCode;

    constructor(page, size, total, subjectName, subjectId, monitorId, errorCode) {
        super(page, size, null);
        this.subjectName = subjectName;
        this.subjectId = subjectId;
        this.monitorId = monitorId;
        this.errorCode = errorCode;
    }
}
