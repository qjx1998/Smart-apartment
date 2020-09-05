
/**
 * 基础实体的信息
 */
class BaseEntity {
    /**
     * 主键
     */
    id;
    /**
     * 名称
     */
    name;
    /**
     * 状态
     */
    state;
    /**
     * 创建人
     */
    createdBy;
    /**
     * 创建时间
     */
    createdDate;
    /**
     * 更新人
     */
    updatedBy;
    /**
     * 更新时间
     */
    updatedDate;

    constructor(id, name, state, createdBy, createdDate, updatedBy, updatedDate) {
        this.id = id;
        this.name = name;
        this.state = state;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.updatedBy = updatedBy;
        this.updatedDate = updatedDate;
    }
}

export default BaseEntity;

/**
 * 分页信息
 */
export class Page {
    page;
    size;
    total;

    constructor(page, size, total) {
        this.page = page;
        this.size = size;
        this.total = total;
    }
}
