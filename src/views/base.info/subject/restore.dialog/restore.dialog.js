import { RestoreSubjectParams } from '@/data/subject';
import subjectService from '@/service/subject.service';
import SubjectDef from '@/constants/subject.def';
import roomService from '@/service/room.service';

export default {
    name: 'RestoreDialog',
    data() {
        return {
            /**
             * 是否加载数据
             */
            loading: false,
            /**
             * 是否显示dialog
             */
            visible: false,
            /**
             * 访问终止时间配置
             */
            pickerOptions: {
                shortcuts: [
                    {
                        text: '明天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 1000 * 3600 * 24);
                            picker.$emit('pick', date);
                        }
                    },
                    {
                        text: '一周后',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 1000 * 3600 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }
                ]
            },
            rules: {
                recogStartTime: [
                    { required: true, message: '请添加访问起始时间', trigger: 'blur' }
                ],
                recogEndTime: [
                    { required: true, message: '请添加访问终止时间', trigger: 'blur' }
                ]
            },
            ruleForm: new RestoreSubjectParams(),
            /**
             * 人员类型
             */
            subjectType: SubjectDef.TYPE,
            /**
             * 楼栋中的宿舍
             */
            roomsInBuilding: []
        };
    },
    watch: {
        'ruleForm.buildingId'() {
            this.getRooms();
        }
    },
    computed: {
        /**
         * 标题
         */
        title() {
            return `${SubjectDef.TYPE[this.subject.type]}恢复表单`;
        }
    },
    props: {
        /**
         * 用户
         */
        subject: {
            required: true
        },
        /**
         * 楼栋
         */
        buildings: {
            type: Array,
            required: true
        }
    },
    methods: {
        /**
         * 通知父组件关闭该组件
         */
        close() {
            this.$emit('close');
        },
        /**
         * 通知父组建重新加载
         */
        reload() {
            this.$emit('reload');
        },
        /**
         * 确定修改
         */
        async confirm() {
            const valid = await this.$refs['ruleForms'].validate();
            if (!valid) return;
            this.loading = true;
            this.ruleForm.subjectId = this.subject.id;
            try {
                await subjectService.reactivate(this.ruleForm);
                this.$message({
                    type: 'success',
                    message: '恢复成功'
                });
                this.loading = false;
                this.reload();
            } catch (e) {
                this.loading = false;
            }
        },
        /**
         * 改变终止时间范围
         */
        changeEnd() {
            const self = this;
            if (this.ruleForm.recogStartTime) {
                this.pickerOptions = {
                    ...this.pickerOptions,
                    disabledDate(time) {
                        return new Date(self.ruleForm.recogStartTime).getTime() > time.getTime();
                    }
                };
            }
        },
        /**
         * 获取建筑物中的房间
         *
         * @param buildingId 建筑物ID
         */
        async getRooms() {
            this.roomsInBuilding = await roomService.findByBuildingId(this.ruleForm.buildingId);
        }
    },
    created() {
        this.changeEnd();
        this.ruleForm.buildingId = this.buildings[0].id;
        this.getRooms();
    }
};
