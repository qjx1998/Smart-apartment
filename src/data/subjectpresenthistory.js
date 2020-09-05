
/**
 * 识别主体的历史出席记录
 */
export class SubjectPresentHistoryView {
    /**
     * 识别人员信息
     * @link Subject
     */
    subject;
    /**
     * 楼栋
     * @link Building
     */
    building;
    /**
     * 宿舍
     * @link Room
     */
    room;
    /**
     * 出席历史记录
     * @link SubjectPresentHistory
     */
    history;

    constructor(subject, building, room, history) {
        this.subject = subject;
        this.building = building;
        this.room = room;
        this.history = history;
    }
}

export class SubjectPresentHistory {
    /**
     * 识别主体
     */
    subjectId;
    /**
     * 建筑物ID
     */
    buildingId;
    /**
     * 是否出席总数
     */
    presentTotal;

    constructor(subjectId, buildingId, presentTotal) {
        this.subjectId = subjectId;
        this.buildingId = buildingId;
        this.presentTotal = presentTotal;
    }
}
