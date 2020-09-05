
export default {
    data() {
        return {
            /**
             * 页面对应的数据类型,需要初始化!!!
             */
            DataType: null,
            /**
             * 查询条件, 需要初始化!!!
             */
            conditions: null,
            /**
             * 分页服务, 需要初始化!!!
             */
            service: null,
            /**
             * 是否正在请求数据
             */
            loading: false,
            /**
             * 分页数据
             */
            pageData: null,
            /**
             * 是否显示dialog
             */
            visible: true
        };
    },
    methods: {
        /**
         * 变更分页
         *
         * @param current 新的页码
         */
        changePage(current) {
            this.conditions.page = current;
            this.paging();
        },
        /**
         * 变更每页数量
         *
         * @param size 新的每页数量
         */
        changeSize(size) {
            this.conditions.page = 1;
            this.conditions.size = size;
            this.paging();
        },
        /**
         * 查询分页信息
         */
        paging() {
            const self = this;
            self.loading = true;
            this.service.paging(this.conditions).then(
                res => {
                    self.loading = false;
                    self.pageData = res;
                }
            );
        },
        /**
         * 关闭弹出框
         */
        close() {
            this.$emit('close');
        }
    }
};
