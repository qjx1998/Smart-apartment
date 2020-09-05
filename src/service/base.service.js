
class BaseService {
    /**
     * 对象对应的相对路径
     */
    path;
    /**
     * 数据类型
     */
    EntityType;
    /**
     * 请求的客户端
     */
    client;

    constructor(path, EntityType, client) {
        this.path = path;
        this.EntityType = EntityType;
        this.client = client;
    }

    /**
     * 将json数据转换成指定类型的数据
     *
     * @param jsonData
     * @returns {*}
     */
    convert(jsonData) {
        return Object.assign(new this.EntityType(), jsonData);
    }

    /**
     * 将json数据转换成指定类型的数据
     *
     * @param jsonData
     * @param EntityType
     * @returns {*}
     */
    static convertWithEntityType(jsonData, EntityType) {
        return Object.assign(new EntityType(), jsonData);
    }

    /**
     * 根据条件查询
     *
     * @param conditions
     * @returns {Promise<*>}
     */
    async find(conditions) {
        const json = await this.client({
            url: this.path,
            method: 'get',
            params: conditions
        });

        return json.map(data => this.convert(data));
    }

    /**
     * 分页查询
     *
     * @param conditions
     * @returns {Promise<void>}
     */
    async paging(conditions) {
        const json = await this.client({
            url: this.path + 'paging',
            method: 'get',
            params: conditions
        });

        const jsonData = json.content;
        json.content = jsonData.map(data => this.convert(data));
        return json;
    }

    /**
     * 根据ID查询
     *
     * @param id
     * @returns {Promise<*>}
     */
    async get(id) {
        const json = await this.client({
            url: this.path + id,
            method: 'get'
        });

        return this.convert(json);
    }

    /**
     * 新建
     *
     * @param data
     * @returns {Promise<void>}
     */
    async create(data) {
        await this.client({
            url: this.path,
            method: 'post',
            data: data
        });
    }

    /**
     * 更新
     *
     * @param data
     * @returns {Promise<void>}
     */
    async update(data) {
        await this.client({
            url: this.path + data.id,
            method: 'put',
            data: data
        });
    }

    /**
     * 删除
     *
     * @param id
     * @returns {Promise<void>}
     */
    async delete(id) {
        await this.client({
            url: this.path + id,
            method: 'delete'
        });
    }
}

export default BaseService;
