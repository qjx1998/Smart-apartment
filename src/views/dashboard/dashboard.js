import buildingMixin from '@/mixins/building.mixin';
import statisticsService from '@/service/statistics.service';
import DataEntry from './data.entry/data.entry.vue';
import Gender from './gender/gender.vue';
import Device from './device/device.vue';
import Inspection from './inspection/inspection.vue';
import Warning from './warning/warning.vue';
import SubjectFlow from './subject.flow/subject.flow.vue';
import FaceRecognition from './face.recognition/face.recognition.vue';
import AbnormalBehavior from './abnormal.behavior/abnormal.behavior.vue';
import PassStatics from './pass.statics/pass.statics.vue';

export default {
    name: 'Dashboard',
    mixins: [buildingMixin],
    components: {
        /* 数据录入 */
        DataEntry,
        /* 性别 */
        Gender,
        /* 设备运行状况 */
        Device,
        /* 在寝统计 */
        Inspection,
        /* 告警统计 */
        Warning,
        /* 人流量统计 */
        SubjectFlow,
        /* 人脸识别 */
        FaceRecognition,
        /* 异常行为分析 */
        AbnormalBehavior,
        /* 同行统计 */
        PassStatics
    },
    data() {
        return {
            /**
             * 当前选中楼栋
             */
            currentSelectedBuilding: null,
            /**
             * 人员相关数据
             */
            subjectStatics: {},
            /**
             * 通行相关数据
             */
            realtimePassStatistics: {}
        };
    },
    watch: {
        /**
         * 切换楼栋后，获取数据
         */
        currentSelectedBuilding() {
            this.setSubjectStatics();
            this.setRealtimePassStatistics();
        }
    },
    methods: {
        /**
         * 切换楼栋
         */
        handleBuilding(building) {
            this.currentSelectedBuilding = building;
        },
        /**
         * 获取人员数据
         */
        setSubjectStatics: async function() {
            const { id } = this.currentSelectedBuilding;
            this.subjectStatics = await statisticsService.getSubjectStatistics(id);
        },
        /**
         * 获取通行数据
         */
        /**
         * 设置通行数据
         */
        setRealtimePassStatistics: async function() {
            const { id } = this.currentSelectedBuilding;
            this.realtimePassStatistics = await statisticsService.getRealtimePassStatistics(id);
        }
    },
    created: async function() {
        await this.getBuildings();
        this.currentSelectedBuilding = this.buildings[0];
        this.setSubjectStatics();
        this.setRealtimePassStatistics();
    }
};
