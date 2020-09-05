
import MonitorDef from '@/constants/monitor.def';
import inputMixin from '@/mixins/input.mixin';
import monitorService from '@/service/monitor.service';
import { FormValidator } from '@/utils/validate';

export default {
    name: 'DeviceInput',
    mixins: [inputMixin],
    data() {
        return {
            /**
             * 设备常量
             */
            deviceDefs: MonitorDef,
            /**
             * 主机列表
             */
            boxes: null,
            /**
             * 表单验证规则
             */
            formRules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 2, max: 64, message: '长度在 2 到 64 个字符', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择设备类型', trigger: 'blur' }
                ],
                boxId: [
                    { required: true, message: '请选择主机', trigger: 'blur' }
                ],
                groupId: [
                    { required: true, message: '请选择设备组', trigger: 'blur' }
                ],
                videoStreamUrl: [
                    { required: true, message: '请添加视频流地址', trigger: 'blur' },
                    { max: 100, message: '长度不能超过100字符', trigger: 'change' }
                ],
                networkSwitcher: [
                    { validator: FormValidator.validateIPAddress, trigger: 'blur' }
                ],
                direction: [
                    { required: true, message: '请选择方向', trigger: 'blur' }
                ]
            }
        };
    },
    props: {
        /**
         * 设备组列表
         */
        deviceGroups: {
            type: Array
        }
    },
    methods: {
    },
    computed: {
        /**
         * 会话框标题
         */
        title() {
            return this.editingObject.id != null ? '更新设备' : '新建设备';
        }
    },
    created() {
        this.service = monitorService;
        if (this.mode === 'create') {
            this.editingObject.type = this.deviceDefs.TYPES.CAMERA;
        }
    }
};
