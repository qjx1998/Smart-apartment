import Building, { BuildingPagingParams } from '../../../data/building';
import buildingService from '../../../service/building.service';
import listMixin from '../../../mixins/list.mixin';
import buildingMixin from '../../../mixins/building.mixin';
import buildingInput from './input/building.input.vue';

const buildingList = {
    mixins: [listMixin, buildingMixin],
    components: { buildingInput },
    data() {
        return {
        };
    },
    methods: {
    },
    created() {
        this.DataType = Building;
        this.conditions = new BuildingPagingParams();
        this.service = buildingService;
        this.paging();
        this.getBuildings();
    }
};

export default buildingList;
