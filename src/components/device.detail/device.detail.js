
import inputMixin from '@/mixins/input.mixin';

export default {
    name: 'DeviceDetail',
    mixins: [inputMixin],
    props: {
        /**
         * 设备组列表
         */
        deviceGroups: {
            type: Array,
            required: true
        },
        /**
         * 设备的常量
         */
        deviceDefs: {
            type: Object,
            required: true
        },
        /**
         * 设备
         */
        device: {
            type: Object,
            required: true
        }
    }
};
