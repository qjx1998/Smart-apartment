
import SubjectDef from '@/constants/subject.def';
import dialogMixin from '@/mixins/dialog.mixin';
import roomService from '@/service/room.service';

export default {
    name: 'SubjectDetail',
    mixins: [dialogMixin],
    data() {
        return {
            /**
             * 性别列表
             */
            genderDef: SubjectDef.GENDER,
            /**
             * 识别主体类型
             */
            subjectTypeDef: SubjectDef.TYPE,
            /**
             * 图片本地地址
             */
            imageBaseUrl: process.env.VUE_APP_OSS_BASE_URL,
            /**
             * 楼栋中的房间
             */
            roomsInBuilding: []
        };
    },
    props: {
        /**
         * 建筑物列表
         */
        buildings: {
            type: Array
        },
        /**
         * 人员数据
         * @link Subject
         */
        subject: {
            type: Object || null,
            required: false
        }
    },
    methods: {
        /**
         * 获取建筑物中的房间
         *
         * @param buildingId 建筑物ID
         */
        async getRooms(buildingId) {
            this.roomsInBuilding = await roomService.findByBuildingId(buildingId);
        }
    },
    created() {
        this.getRooms(this.subject.buildingId);
    }
};
