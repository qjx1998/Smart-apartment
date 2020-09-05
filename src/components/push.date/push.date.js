import warningMessage from '@/constants/warning.def';

export default {
    name: 'PushDate',
    props: {
        /**
         * 推送周期数据
         * @link CronData
         */
        value: {
            required: true
        }
    },
    data() {
        return {
            /**
             * 推送周期类型常量
             */
            PUSH_DATE: warningMessage.PUSH_DATE,
            /**
             * 月的日
             */
            daysInMonth: [
                1, 2, 3, 4, 5, 6, 7,
                8, 9, 10, 11, 12, 13, 14,
                15, 16, 17, 18, 19, 20, 21,
                22, 23, 24, 25, 26, 27, 28
            ],
            /**
             * 周的日
             */
            daysInWeek: warningMessage.DAYS_IN_WEEK.list,
            /**
             * 推送周期数据
             */
            pushData: {
                cycleType: this.value.cycleType,
                cycleValue: this.value.cycleValue ? [...this.value.cycleValue] : []
            }
        };
    },
    watch: {
        /**
         * 当周期类型发生改变时，初始化周期数据
         */
        'pushData.cycleType'() {
            this.pushData.cycleValue = [];
        }
    },
    methods: {
        /**
         * 切换周期类别
         * @param cycleType
         * @link warningMessage.PUSH_DATE
         */
        switchCycleType(cycleType) {
            this.pushData.cycleType = cycleType;
        },
        /**
         * 选择周期值
         * @param value
         */
        selectCycleValue(value) {
            const { cycleValue } = this.pushData;
            const valueIndex = cycleValue.indexOf(value);
            if (valueIndex === -1) {
                cycleValue.push(value);
            } else {
                cycleValue.splice(valueIndex, 1);
            }
            cycleValue.sort((x, y) => x - y);
        },
        /**
         * 确定按钮
         */
        confirm() {
            this.$emit('input', this.pushData);
            this.$emit('close');
        }
    }
};
