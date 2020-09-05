import listMixin from '@/mixins/list.mixin';
import { HistoryRecord, HistoryPageParams } from '@/data/historyrecord';
import historyService from '@/service/historyrecord.service';
import subjectTypeDef from '@/constants/subject.def';
import MonitorService from '@/service/monitor.service';
import CommonDef from '@/constants/common.def';
import TimeUtils from '@/utils/time.utils';
import DeviceDetail from '@/components/device.detail/device.detail.vue';
import deviceDetailMixin from '@/mixins/device.detail.parent.mixin';
import subjectDetailMixin from '@/components/subject.detail/subject.detail.mixin';
import SubjectDetail from '@/components/subject.detail/subject.detail.vue';
import buildingMixin from '@/mixins/building.mixin';

export default {
    name: 'History',
    components: { DeviceDetail, SubjectDetail },
    mixins: [listMixin, deviceDetailMixin, subjectDetailMixin, buildingMixin],
    data() {
        return {
            /**
             * 用户类别
             */
            subjectTypes: subjectTypeDef.TYPE.list,
            /**
             * 监视器列表
             */
            monitorList: null,
            /**
             * 图片地址
             */
            baseImageUrl: process.env.VUE_APP_OSS_BASE_URL,
            /**
             * 日期选项
             */
            dateOption: 'today'
        };
    },
    methods: {
        /**
         * 获取监控器
         */
        getMonitors: async function() {
            const res = await MonitorService.find();
            this.monitorList = res.filter(item => item.state === CommonDef.OBJECT_STATUS.IS_ACTIVE);
        },
        /**
         * 获取subhect的type名
         * @param id subject的type id
         */
        getTypeName(id) {
            return this.subjectTypes.filter(item => item.code === id)[0].name;
        },
        /**
         * 设置开始时间默认值
         */
        setStartTime() {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth();
            this.conditions.captureTimeStart = new Date(year, month, 1);
        },
        /**
         * 设置时间默认选项
         */
        setTime(type) {
            switch (type) {
                case 'lastHour':
                    this.conditions.captureTimeStart = TimeUtils.getLastHour().beginDate;
                    this.conditions.captureTimeEnd = TimeUtils.getLastHour().endDate;
                    break;
                case 'today':
                    this.conditions.captureTimeStart = TimeUtils.getToday().beginDate;
                    this.conditions.captureTimeEnd = TimeUtils.getToday().endDate;
                    break;
                case 'thisWeek':
                    this.conditions.captureTimeStart = TimeUtils.getThisWeek().beginDate;
                    this.conditions.captureTimeEnd = TimeUtils.getThisWeek().endDate;
                    break;
                default:
                    this.conditions.captureTimeStart = TimeUtils.getThisMonth().beginDate;
                    this.conditions.captureTimeEnd = TimeUtils.getThisMonth().endDate;
            }
        },
        /**
         * 初始化paging参数
         */
        initPagingParams() {
            this.conditions = new HistoryPageParams();
            this.conditions.subjectType = '';
            this.conditions.monitorId = '';
        }
    },
    created() {
        this.DataType = HistoryRecord;
        this.initPagingParams();
        this.setTime('today');
        this.service = historyService;
        this.paging();
        this.getMonitors();
        this.getBuildings();
    }
};
