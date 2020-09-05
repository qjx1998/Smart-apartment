
import BaseService from './base.service';
import Box from '../data/box';
import { requestServer } from '../utils/request';

/**
 * 主机相关服务
 */
class BoxService extends BaseService {
}

export default new BoxService('/api/box/', Box, requestServer);
