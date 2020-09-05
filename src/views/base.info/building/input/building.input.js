
import buildingService from '@/service/building.service';
import inputMixin from '@/mixins/input.mixin';
import { FormValidator } from '@/utils/validate';

const buildingInput = {
    mixins: [inputMixin],
    data() {
        return {
            formRules: {
                name: [
                    { required: true, message: '请输入编号', trigger: 'blur' },
                    { max: '4', message: '楼栋不超过100栋', trigger: 'blur' }
                ],
                floor: [
                    { required: true, message: '请输入层数', trigger: 'blur' },
                    { type: 'number', message: '楼栋层数必须为数字值' },
                    {
                        buildingId: this.editingObject.id,
                        validator: FormValidator.validateFloor,
                        trigger: 'blur'
                    }
                ],
                remark: [
                    { max: 200, message: '备注字数不超过200', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        /**
         * 会话框标题
         */
        title() {
            return this.editingObject.id != null ? '更新楼栋' : '创建楼栋';
        }
    },
    created() {
        this.service = buildingService;
    }
};

export default buildingInput;
