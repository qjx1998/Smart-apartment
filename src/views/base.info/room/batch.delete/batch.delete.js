import dialogMixin from '@/mixins/dialog.mixin';
import { FormValidator } from '@/utils/validate';
import roomService from '@/service/room.service';

export default {
    mixins: [dialogMixin],
    props: ['params', 'floors', 'buildings'],
    data() {
        return {
            /**
             * 是删除还是新增
             */
            mode: 'delete',
            /**
             * 验证规则
             */
            validateRules: {
                buildingId: [
                    { required: true, message: '请选择楼栋', trigger: 'blur' }
                ],
                floors: [
                    { required: true, message: '请选择楼层', trigger: 'blur' }
                ],
                nameLength: [
                    { type: 'number', required: true, message: '请填写房间号命名长度', trigger: 'blur' }
                ],
                startNum: [
                    { required: true, message: '起始房间尾号不能为空', trigger: 'blur' },
                    { validator: this.validateStartNum, trigger: 'blur' }
                ],
                endNum: [
                    { required: true, message: '结束房间尾号不能为空', trigger: 'blur' },
                    { validator: this.validateEndNum, trigger: 'blur' }
                ],
                availablePlacesNum: [
                    { required: true, message: '可容纳人数不可为空', trigger: 'blur' },
                    { validator: FormValidator.validateAvailablePlacesNum, trigger: 'blur' }
                ]
            }
        };
    },
    created() {
        this.setMode();
    },
    methods: {
        /**
         * 设置mode
         */
        setMode() {
            this.mode = this.params.hasOwnProperty('availablePlacesNum') ? 'create' : 'delete';
        },
        /**
         * 验证起始数字
         */
        validateStartNum(rule, value, callback) {
            const { nameLength } = this.params;
            if (!Number.isInteger(value)) {
                callback(new Error('起始房间尾号为数字'));
            } else if (value <= 0) {
                callback(new Error('起始房间尾号必须大于0'));
            } else if (value.toString().length > nameLength) {
                callback(new Error('起始房间尾号长度必须小于房间命名长度'));
            } else if (this.params.endNum !== undefined) {
                this.$refs.validateForm.validateField('endNum');
                callback();
            } else {
                callback();
            }
        },
        /**
         * 验证结束房间尾号
         */
        validateEndNum(rule, value, callback) {
            const { nameLength, startNum } = this.params;
            if (!value) {
                callback();
            }
            if (!Number.isInteger(value)) {
                callback(new Error('起始房间尾号为数字'));
            } else if (value <= 0) {
                callback(new Error('起始房间尾号必须大于0'));
            } else if (value.toString().length > nameLength) {
                callback(new Error('起始房间尾号长度必须小于房间命名长度'));
            } else if (value < startNum) {
                callback(new Error('结束房间尾号必须大于等于起始房间尾号'));
            } else {
                callback();
            }
        },
        /**
         * 确认提交表单
         */
        submitForm() {
            this.$refs['validateForm'].validate(async(valid) => {
                if (!valid) return;
                this.loading = true;
                if (this.mode === 'create') {
                    try {
                        await roomService.batchCreate(this.params);
                        this.loading = false;
                        this.reload();
                        this.$message({
                            message: '批量新增宿舍成功',
                            type: 'success'
                        });
                    } catch (e) {
                        this.loading = false;
                    }
                } else {
                    try {
                        await roomService.batchDelete(this.params);
                        this.loading = false;
                        this.reload();
                        this.$message({
                            message: '批量删除宿舍成功',
                            type: 'success'
                        });
                    } catch (e) {
                        this.loading = false;
                        console.log(e);
                    }
                }
            });
        }
    }
};
