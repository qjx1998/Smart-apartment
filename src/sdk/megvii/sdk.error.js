
const SDK_ERROR = {
    UNKNOW: {
        code: -999,
        desc: '未知异常'
    },
    '-5000': {
        code: -5000,
        desc: '未检测到人脸'
    },
    '-5001': {
        code: -5001,
        desc: '摄像头配置不正确'
    },
    '-5002': {
        code: -5002,
        desc: '不是有效的 JSON 格式'
    },
    '-5003': {
        code: -5003,
        desc: '名称已存在'
    },
    '-5004': {
        code: -5004,
        desc: '人脸质量太低'
    },
    '-5005': {
        code: -5005,
        desc: '人脸的亮度过低'
    },
    '-5006': {
        code: -5006,
        desc: '人脸的亮度过高'
    },
    '-5007': {
        code: -5007,
        desc: '人脸的亮度不均匀 ，请提供脸部光照均匀的图片'
    },
    '-5008': {
        code: -5008,
        desc: '人脸角度过大，请提供正脸图片'
    },
    '-5009': {
        code: -5009,
        desc: '人脸角度过大，请提供正脸图片'
    },
    '-5010': {
        code: -5010,
        desc: '人脸角度过大，请提供正脸图片'
    },
    '-5011': {
        code: -5011,
        desc: '人脸不清晰，请提供清晰人脸图片'
    },
    '-5012': {
        code: -5012,
        desc: '眼部有遮挡，请提供无遮挡的人脸图片'
    },
    '-5013': {
        code: -5013,
        desc: '人脸过小，请提供足够像素的人脸图片'
    },
    '-5014': {
        code: -5014,
        desc: '眼部有遮挡，请提供无遮挡的人脸图片'
    },
    '-5015': {
        code: -5015,
        desc: '请提供彩色人脸图片'
    },
    '-5016': {
        code: -5016,
        desc: '脸部缺失，请提供完整的人脸图片'
    },
    '-1010': {
        code: -1010,
        desc: '图片文件格式不正确'
    },
    '-20170': {
        code: -20170,
        desc: '上传图片过大'
    },
    '-20171': {
        code: -20171,
        desc: '上传图片过小'
    },
    '-300': {
        code: -300,
        desc: '请上传人脸图片'
    }
};

/**
 * sdk错误信息相关的工具类
 */
export class SdkErrorUtils {
    /**
     * 获取sdk消息
     *
     * @param code
     * @returns {string}
     */
    static getMessage(code) {
        const error = SDK_ERROR[code];
        return error ? error.desc : SDK_ERROR.UNKNOW.desc;
    }
}

export default SdkErrorUtils;
