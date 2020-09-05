import dialogMixin from '@/mixins/dialog.mixin';
import roomService from '@/service/room.service';

export default {
    name: 'BatchEditVue',
    mixins: [dialogMixin],
    props: {
        roomIds: {
            type: Array,
            required: true
        }
    },
    data() {
        /**
         * 校验可容纳人数
         */
        const checkAvailablePlacesNum = function(rule, value, callback) {
            if (!value) {
                callback(new Error('可容纳人数不可为空'));
            } else if (!Number.isInteger(value)) {
                callback(new Error('可容纳人数为数字'));
            } else if (value <= 0) {
                callback(new Error('可容纳人数必须大于0'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                /**
                 * 房间可容纳人数
                 */
                availablePlacesNum: null
            },
            /**
             * 验证规则
             */
            formValidateRules: {
                availablePlacesNum: [
                    { validator: checkAvailablePlacesNum, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        /**
         * 批量修改
         */
        batchUpdateRooms() {
            this.$refs['ruleForm'].validate(async(valid) => {
                if (!valid) return;
                this.loading = true;
                try {
                    await roomService.updateRooms(this.roomIds, this.ruleForm.availablePlacesNum);
                    this.reload();
                    this.loading = false;
                    this.$message({
                        message: '修改宿舍容纳人数成功',
                        type: 'success'
                    });
                } catch (e) {
                    this.loading = false;
                    console.log(e);
                }
            });
        }
    }
};
