import buildingService from '../service/building.service';
import CommonDef from '../constants/common.def';

export default {
    data() {
        return {
            /**
             * 楼栋列表
             */
            buildings: []
        };
    },

    methods: {
        /**
         * 获取建筑物列表
         */
        getBuildings: async function() {
            const res = await buildingService.find();
            // 判断楼栋的状态
            this.buildings = res.filter(building => building.state === CommonDef.OBJECT_STATUS.IS_ACTIVE);
        }
    }
};
