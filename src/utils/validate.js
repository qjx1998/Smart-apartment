import subectService from '../service/subject.service';
import roomService from '../service/room.service';
import collegeService from '../service/college.service';
import clazzService from '@/service/clazz.service';
import StringUtils from './string.utils';

// todo 需要清理
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
    return true;
}

/**
 * 验证手机号码
 */
export class FormValidator {
    /**
     * 验证手机号码
     */
    static validatPhone(rule, value, callback) {
        if (value && (!(/^[1][34578]\d{9}$/).test(value) || !(/^[1-9]\d*$/).test(value) || value.length !== 11)) {
            callback(new Error('请输入正确的手机号码'));
        } else {
            callback();
        }
    }

    /**
     * 校验 包括中文字、英文字母、数字和下划线
     * 登录账号校验
     */
    static validateAccount(rule, value, callback) {
        const account = /^[a-zA-Z0-9]{1,16}$/;
        if (value && (!(account).test(value))) {
            callback(new Error('账号只能包含数字、英文字母，且少于16位数'));
        } else {
            callback();
        }
    }

    /**
     * 验证身份证或护照
     */
    static validateCidFormat(rule, value, callback) {
        if (StringUtils.isEmpty(value)) {
            callback();
            return;
        }

        const pattern = /^[a-zA-Z0-9]{0,18}$/;

        if (!(pattern).test(value)) {
            callback(new Error('请输入正确的身份证或护照号'));
        } else {
            callback();
        }
    }

    /**
     * 验证学号或者工号
     */
    static validateOpid(rule, value, callback) {
        if (StringUtils.isEmpty(value)) {
            callback(new Error('请输入学号/工号'));
            return;
        }

        if (value.length > 15) {
            callback(new Error('长度不能超过15个字符'));
            return;
        }

        const reg = /^[0-9]+$/;
        if (!(reg).test(value)) {
            callback(new Error('注意，学号和工号为数字'));
        }
        callback();
    }

    /**
     * 验证学号/工号是否存在
     */
    static async validateOpidExists(rule, value, callback) {
        if (StringUtils.isEmpty(value)) {
            callback();
            return;
        }
        const exist = await subectService.opidExists(value, rule.subjectId);
        if (!exist) callback();
        if (exist) callback(new Error('学号/工号已经存在'));
    }

    /**
     * 验证身份证是否存在
     */
    static validateCidExists(rule, value, callback) {
        if (StringUtils.isEmpty(value)) {
            callback();
            return;
        }

        subectService.cidExists(value, rule.subjectId).then(
            exists => {
                if (!exists) {
                    callback();
                } else {
                    callback('身份证已经存在');
                }
            }
        );
    }

    /**
     * 验证手机号码是否存在
     */
    static validatePhoneExists(rule, value, callback) {
        if (StringUtils.isEmpty(value)) {
            callback();
            return;
        }

        subectService.phoneExists(value, rule.subjectId).then(
            exists => {
                if (!exists) {
                    callback();
                } else {
                    callback('手机号码已经存在');
                }
            }
        );
    }

    /**
     * 验证学校是否重名
     * @returns {Promise<void>}
     */
    static validateSchoolExists(rule, value, callback) {
        if (StringUtils.isEmpty(value)) {
            callback();
            return;
        }

        collegeService.nameExists(rule.id, value).then(
            exists => {
                if (!exists) {
                    callback();
                } else {
                    callback('学校名称已经存在');
                }
            }
        );
    }

    /**
     * 验证班级是否重名
     * @returns {Promise<void>}
     */
    static async validateClassExists(rule, value, callback) {
        if (StringUtils.isEmpty(value)) {
            callback();
            return;
        }
        console.log(rule);
        const exists = await clazzService.nameExists(rule.collegeId, rule.instituteId, value);
        if (!exists) {
            callback();
        } else {
            callback(new Error('班级名称已经存在'));
        }
    }

    /**
     * 验证邮箱
     */
    static validateEmail(rule, value, callback) {
        const pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (value && !pattern.test(value)) {
            return callback(new Error('请输入正确格式的邮箱'));
        }
        callback();
    }

    /**
     * 验证房间编号
     */
    static validateRoomName(rule, value, callback) {
        const reg = /^[\d]+$/;
        if (!(reg).test(value)) {
            callback(new Error('宿舍编号为数字'));
        } else {
            callback();
        }
    }

    /**
     * 验证账号
     */
    static validateUserName(rule, value, callback) {
        if (!value) {
            return callback(new Error('请输入账号名称'));
        }
        if (value.length > 16) {
            return callback(new Error('账号不能超过16位'));
        }
        const pattern = /^[a-zA-Z0-9]+$/;
        if (value && !pattern.test(value)) {
            return callback(new Error('账号只能包含数字或者英文字母'));
        }
        callback();
    }

    /**
     * 验证密码
     */
    static validatePassword(rule, value, callback) {
        if (!value) {
            return callback(new Error('请填写密码'));
        }
        // 必须包含数字和字母
        const pattern = /^(?=.*?[0-9])(?=.*?[a-z])[0-9a-z]+$/;
        if (value && !pattern.test(value)) {
            return callback(new Error('密码必须包含数字和英文字母'));
        }
        callback();
    }

    /**
     * 验证重复密码
     */
    static validateRetypedPassword(rule, value, callback) {
        if (!value) {
            return callback(new Error('请输入重复密码'));
        }
        if (value !== rule.password) {
            return callback(new Error('重复密码不一致'));
        }
        callback();
    }

    /**
     * 验证ip地址
     */
    static validateIPAddress(rule, value, callback) {
        const reg = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (value && !(reg).test(value)) {
            callback(new Error('IP地址格式不正确'));
        } else {
            callback();
        }
    }

    /**
     * 验证楼层
     */
    static validateFloor(rule, value, callback) {
        if (StringUtils.isEmpty(value)) {
            callback();
            return;
        }

        if (value < 1 || value > 50) {
            callback('楼层必须在1至50之间');
            return;
        }

        // 插入记录不需要校验更高层是否存在未归档房间
        if (!rule.buildingId) {
            callback();
            return;
        }

        roomService.validateFloor(rule.buildingId, value).then(
            isNotPass => {
                if (!isNotPass) {
                    callback();
                } else {
                    callback('更高层包含未归档宿舍');
                }
            }
        );
    }

    /**
     * 验证可容纳人数
     */
    static validateAvailablePlacesNum(rule, value, callback) {
        if (!Number.isInteger(value)) {
            callback(new Error('可容纳人数为数字'));
        } else if (value <= 0) {
            callback(new Error('可容纳人数必须大于0'));
        } else {
            callback();
        }
    }

    /**
     * 验证floors
     */
    static validateFloors(rule, value, callback) {
        if (value.length === 0) {
            callback(new Error('请选择楼层'));
        } else {
            callback();
        }
    }
}

/**
 * 图片验证器
 */
export class ImageValidator {
    /**
     * 图片验证
     *
     * @param file 图片文件
     */
    static validateImage(file) {
        const typeOk = this.validateImageType(file);
        const sizeOk = FileValidator.validateSize(file);

        return typeOk && sizeOk;
    }

    /**
     * 验证图片类型
     *
     * @param file
     * @returns {boolean}
     */
    static validateImageType(file) {
        return file.raw.type === 'image/jpeg' || file.raw.type === 'image/png';
    }
}

/**
 * 文件验证器
 */
export class FileValidator {
    /**
     * 验证文件
     *
     * @param file 文件内容
     * @param targetType 期望的文件格式
     * @returns {*}
     */
    static validate(file, targetType) {
        return this.validateSize(file) && this.validateType(file, targetType);
    }

    /**
     * 大小验证
     */
    static validateSize(file) {
        return (file.size / (1024 * 1024)) < 20;
    }

    /**
     * 验证文件格式
     */
    static validateType(file, targetType) {
        const types = targetType.split(',');
        const fileType = file.name.split('.').pop();
        for (const type of types) {
            if (StringUtils.includes(fileType, type)) {
                return true;
            }
        }

        return false;
    }

    /**
     * 验证上传图片文件名
     */
    static validatePhotoName(value) {
        return Boolean(
            value && (!(/^[1][34578]\d{9}$/).test(value) || !(/^[1-9]\d*$/).test(value) || value.length !== 11)
        );
    }
}
