import inputMixin from '@/mixins/input.mixin';
import deviceGroupService from '@/service/device.group.service';
import buildingService from '@/service/building.service';

export default {
    name: 'DeviceGroupInput',
    mixins: [inputMixin],
    data() {
        return {
            /**
             * 验证
             */
            formRules: {
                name: [
                    { required: true, message: '请填写设备组名称', trigger: 'blur' }
                ]
            },
            /**
             * 未绑定楼栋
             */
            noBindBuildings: null
        };
    },
    props: {
        /**
         * 设备组id
         */
        groupId: {
            default: ''
        },
        /**
         * 设备组拥有的楼栋数据
         */
        groupsBuildings: {
            default: []
        }
    },
    methods: {
        /**
         * 获取当前设备组可以绑定的楼栋
         */
        getBindableBuildings: async function() {
            if (this.buildingId === '') {
                this.noBindBuildings = await buildingService.findNoBindMonitorBuildings();
            } else {
                this.noBindBuildings = await buildingService.findNoBindMonitorBuildings({ groupId: this.groupId });
            }
        }
    },
    created() {
        // 设置service
        this.service = deviceGroupService;
        this.noBindBuildings = this.groupsBuildings;
        this.getBindableBuildings();
    }
};
