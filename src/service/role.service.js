
import BaseService from './base.service';
import { requestServer } from '@/utils/request';
import { Role } from '@/data/role';

class RoleService extends BaseService {
    /**
     * 分页查询
     * @param conditions
     *          分页查询参数
     *          @link RolePagingParams
     * @returns {Promise<void>}
     */
    async paging(conditions) {
        const json = await requestServer({
            url: this.path + 'paging',
            method: 'get',
            params: conditions
        });
        return json.map(data => this.convert(data));
    }

    /**
     * 查询所有角色
     * @param conditions
     * @returns {Promise<*>}
     */
    async find(conditions) {
        const json = await requestServer({
            url: this.path + 'all',
            method: 'get',
            params: conditions
        });
        return json.map(data => this.convert(data));
    }

    /**
     * 根据角色ID来获得权限ID列表
     * @param conditions
     * @returns {Promise<*>}
     */
    async findPermissionIdsByRoleId(conditions) {
        const json = await requestServer({
            url: this.path + 'findPermissionIds',
            method: 'get',
            params: conditions
        });
        return json;
    }

    /**
     * 根据角色ID获得关联用户ID列表
     * @param conditions
     * @returns {Promise<*>}
     */
    async findUserIdsByRoleId(conditions) {
        const json = await requestServer({
            url: this.path + 'findUserIds',
            method: 'get',
            params: conditions
        });
        return json;
    }
}

export const roleService = new RoleService('/api/role/', Role);
