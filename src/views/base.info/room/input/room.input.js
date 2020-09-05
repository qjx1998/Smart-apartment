
import roomService from '@/service/room.service';
import inputMixin from '@/mixins/input.mixin';

export default {
    mixins: [inputMixin],
    data() {
        return {
            formRules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { max: 20, message: '名称不超过20个字符', trigger: 'blur' }
                ],
                buildingId: [
                    { required: true, message: '请输入楼栋', trigger: 'blur' }
                ],
                availablePlacesNum: [
                    { required: true, message: '请输入容纳人数', trigger: 'blur' }
                ],
                floor: [{ required: true, message: '请输入楼层', trigger: 'blur' }]
            }
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
         * 楼栋id
         */
        buildingId: {
            required: true,
            type: Number
        },
        /**
         * 楼层
         */
        floors: {
            required: true,
            type: Array
        }
    },
    computed: {
        /**
         *
         * @returns {string}
         */
        title() {
            return this.editingObject.id != null ? '更新宿舍' : '新建宿舍';
        }
    },
    created() {
        this.service = roomService;
        this.editingObject.buildingId = this.buildingId;
    }

};
