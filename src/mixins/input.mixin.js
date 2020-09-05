
import StringUtils from '../utils/string.utils';
import TimeUtils from '@/utils/time.utils';

/**
 * 混入input类型的组件
 */
export default {
    data() {
        return {
            /**
             * 新建或更新服务, 需要初始化!!!
             */
            service: null,
            /**
             * 页面模式: create/update
             */
            mode: this.editingObject.id != null ? 'update' : 'create',
            /**
             * 是否加载数据
             */
            loading: false,
            /**
             * 表单名称
             */
            formName: 'form',
            /**
             * 是否需要重加载
             */
            needReload: false
        };
    },
    props: {
        /**
         * 新增项或者修改项
         */
        editingObject: {
            type: Object
        }
    },
    methods: {
        /**
         * 关闭对话框
         */
        close() {
            if (!this.needReload) {
                this.$emit('close');
                return;
            }
            this.$emit('reload');
        },
        /**
         * 通知父组建重新加载
         */
        reload() {
            this.$emit('reload');
        },
        /**
         * 提交表单
         */
        async submitForm() {
            const valid = await this.$refs.form.validate();
            if (!valid) return;
            Object.keys(this.editingObject).forEach((key) => {
                // 判断数据类型不为object，包含子类array
                if (typeof this.editingObject[key] !== 'object' && StringUtils.isEmpty(this.editingObject[key])) {
                    this.editingObject[key] = '';
                }
            });
            // 新建
            if (this.mode === 'create') {
                this.createEntity();
            } else { // 更新
                this.updateEntity();
            }
        },
        /**
         * 新建实例
         */
        createEntity: async function() {
            try {
                this.loading = true;
                await this.service.create(this.editingObject);
                this.loading = false;
                this.reload();
                this.$message({
                    message: '创建成功',
                    type: 'success'
                });
            } catch (e) {
                this.loading = false;
            }
        },
        /**
         * 更新实例
         */
        updateEntity: async function() {
            try {
                this.loading = true;
                await this.service.update(this.editingObject);
                this.loading = false;
                this.reload();
                this.$message({
                    message: '更新成功',
                    type: 'success'
                });
            } catch (e) {
                this.loading = false;
            }
        },
        /**
         * 获取当前时间
         */
        getNowFormattedTime() {
            return TimeUtils.getNow().replace('T', ' ');
        }
    }
};
