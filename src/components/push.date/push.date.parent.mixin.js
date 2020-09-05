export default {
    data() {
        return {
            /**
             * datePicker 是否展示, 缺省值为false
             */
            datePickerVisible: false
        };
    },
    methods: {
        /**
         * 打开datePicker弹出框
         */
        showDatePicker() {
            this.datePickerVisible = true;
        },
        /**
         * 关闭datePicker弹出框
         */
        hideDatePicker() {
            this.datePickerVisible = false;
        }
    }
};
