import listMixin from '@/mixins/list.mixin';
import { SubjectMonitorPagingParams } from '@/data/subject.monitor';
import subjectMonitorService from '@/service/subject.monitor.service';
import subjectMonitorDef from '@/constants/subject.monitor.def';
import { MonitorPagingParams } from '@/data/monitor';
import monitorService from '@/service/monitor.service';

export default {
    name: 'AbnormalAuthorization',
    mixins: [listMixin],
    data() {
        return {
            /**
             * 授权subjectMonitor常量
             */
            subjectMonitorDef: subjectMonitorDef,
            /**
             * 当前路由名称
             */
            currentRouteName: null,
            /**
             * 授权设备列表
             */
            authorizedDevices: null
        };
    },
    methods: {
        /**
         * 关闭当前会话框
         */
        close() {
            this.$emit('close');
        },
        /**
         * 初始化分页conditions
         */
        initPagingParams() {
            this.conditions = new SubjectMonitorPagingParams();
            this.conditions.monitorId = this.monitorId;
            this.conditions.subjectId = this.subjectId;
            this.conditions.groupId = this.groupId;
            this.conditions.errorCode = '';
        },
        /**
         * 获取设备组下的授权设备
         */
        getGroupsDevices: async function(groupId) {
            // 获取授权设备列表
            const conditions = new MonitorPagingParams();
            conditions.groupId = groupId;
            this.authorizedDevices = await monitorService.find(conditions);
        }
    },
    props: {
        /**
         * 主体id
         */
        subjectId: {
            default: ''
        },
        /**
         * 设备id
         */
        monitorId: {
            default: ''
        },
        /**
         * 设备组id
         */
        groupId: {
            default: ''
        },
        /**
         * 是否需要姓名条件
         */
        neededNameCondition: {
            default: false
        },
        /**
         * 是否需要授权设备条件
         */
        neededDevicesCondition: {
            default: false
        },
        /**
         * 授权异常title
         */
        title: {
            default: ''
        }
    },
    created: async function() {
        this.initPagingParams();
        this.service = subjectMonitorService;
        this.paging();
        if (this.neededDevicesCondition) {
            this.getGroupsDevices(this.groupId);
        }
    }
};
