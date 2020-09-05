
import { ConfirmDialog } from '../utils/dialog.utils';
import throttle from '../utils/throttle';
import collegeService from '@/service/college.service';

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
             * 控制输入框的显示
             */
            inputVisible: false,
            /**
             * 是否正在请求数据
             */
            loading: false,
            /**
             * 正在编辑的对象
             */
            editingObject: null,
            /**
             * 分页数据
             */
            pageData: null,
            /**
             * 所有学校
             */
            collegeLists: null
        };
    },
    methods: {
        /**
         * 确认导出
         */
        confirmExport: async function(excelName) {
            try {
                await this.$confirm(`确认导出${excelName}表格？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                });
                try {
                    const conditions = Object.assign({}, this.conditions);
                    delete conditions.page;
                    delete conditions.size;
                    await this.service.export(this.conditions);
                } catch (e) {
                    console.log(e);
                }
            } catch (e) {
                console.log(e);
            }
        },
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
        paging: async function() {
            this.loading = true;
            try {
                const res = await this.service.paging(this.conditions);
                this.pageData = res;
                this.loading = false;
            } catch (e) {
                this.loading = false;
            }
        },
        /**
         * 根据条件查询
         */
        searchByConditions: throttle.bind(this)(function() {
            this.conditions.page = 1;
            this.paging();
        }),
        /**
         * 重置表单
         */
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.paging();
        },
        /**
         * 打开输入会话框
         * @param current 当前需要编辑的对象
         */
        showInput(current) {
            this.editingObject = current ? Object.assign({}, current) : new this.DataType();
            this.inputVisible = true;
        },
        /**
         * 关闭输入会话框
         */
        closeInput() {
            this.inputVisible = false;
            this.editingObject = null;
        },
        /**
         * 重载
         */
        reload() {
            this.closeInput();
            this.paging();
        },
        /**
         * 删除
         * @param id 对象ID
         */
        deleteObject: async function(id) {
            const deleteDialog = new ConfirmDialog();
            await deleteDialog.create(this.$msgbox);
            this.loading = true;
            try {
                await this.service.delete(id);
                this.$message({
                    type: 'success',
                    message: '删除成功'
                });
                this.loading = false;
                this.paging();
            } catch (e) {
                this.loading = false;
            }
        },
        /**
         * 获取所有学校
         */
        getCollegeLists: async function() {
            this.collegeLists = await collegeService.findAllCollege();
        }
    }

};
