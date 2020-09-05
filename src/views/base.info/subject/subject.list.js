import subjectService from '@/service/subject.service';
import roomService from '@/service/room.service';
import { SubjectPagingParams, SubjectBaseParams, Subject } from '@/data/subject';
import SubjectDef from '@/constants/subject.def';
import listMixin from '@/mixins/list.mixin';
import buildingMixin from '@/mixins/building.mixin';
import { FileValidator } from '@/utils/validate';
import CommonDef from '@/constants/common.def';
import StringUtils from '@/utils/string.utils';
import { ConfirmDialog } from '@/utils/dialog.utils';
import subjectInput from './input/subject.input.vue';
import subjectHistory from './history/history.vue';
import uploadDialog from '@/components/UploadDialog/upload.dialog.vue';
import uploadPhoto from './upload.photo/upload.photo.vue';
import restoreDialog from './restore.dialog/restore.dialog.vue';
import AbnormalAuthorization from '@/views/pass/device/abnormal.authorization/abnormal.authorization.vue';
import Remark from '@/components/Remark/remark.vue';
import conditionMixin from '@/mixins/condition.mixin';
import restoreDialogParentMixin from './restore.dialog/restore.dialog.parent.mixin';

export default {
    name: 'SubjectList',
    mixins: [listMixin, buildingMixin, conditionMixin, restoreDialogParentMixin],
    components: {
        subjectInput,
        subjectHistory,
        uploadDialog,
        uploadPhoto,
        restoreDialog,
        AbnormalAuthorization,
        Remark
    },
    data() {
        return {
            /**
             * 性别列表
             */
            genders: SubjectDef.GENDER,
            /**
             * 识别主体类型
             */
            subjectTypes: SubjectDef.TYPE,
            /**
             * 人员状态列表
             */
            subjectState: SubjectDef.STATES,
            /**
             * 建筑物中的房间
             */
            roomsInBuilding: [],
            /**
             * 上传配置
             */
            uploaderConfig: {
                /**
                 * 导入识别主体文件的url
                 */
                action: process.env.VUE_APP_SERVER_BASE_URL + '/api/subject/import',
                /**
                 * 请求headers
                 */
                headers: {
                    Authorization: null
                }
            },
            /**
             * 抓拍记录是否显示
             */
            historyDialogVisible: false,
            /**
             * 抓拍对象id
             */
            historySubjectId: null,
            /**
             * 人员基础信息导入模版地址
             */
            importSubjectTemplateUrl: CommonDef.IMPORT_SUBJECT_TEMPLATE_URL,
            /**
             * 当前恢复主体
             */
            restoringSubject: null,
            /**
             * 未分配宿舍
             */
            un_Distributed_Room: CommonDef.UN_DISTRIBUTED_ROOM,
            /**
             * 识别主题类别列表
             */
            subjectTypeList: SubjectDef.TYPE.list.filter(item => item.code !== SubjectDef.TYPE.STRANGER),
            /**
             * 授权异常明细是否显示
             */
            abnormalAuthorizationVisible: false,
            /**
             * 当前的主体
             */
            currentSubject: null,
            /**
             * 批量上传图片是否展示
             */
            uploadPhotoVisible: false
        };
    },
    computed: {
        /**
         * 是否禁用宿舍表单
         * @returns {*|boolean|*}
         */
        roomSelectorDisabled() {
            return StringUtils.isEmpty(this.conditions.buildingId);
        }
    },
    methods: {
        /**
         * 新建或者编辑subject
         * @param subject
         * @link Subject
         */
        showInput(subject) {
            if (!subject) {
                this.editingObject = new SubjectBaseParams();
                this.inputVisible = true;
                return;
            }
            this.currentSubject = Object.assign(new Subject(), subject);
            subject.collegeId = subject.college && subject.college.id;
            subject.instituteId = subject.institute && subject.institute.id;
            subject.classId = subject.clazz && subject.clazz.id;
            subject.departmentId = subject.department && subject.department.id;
            this.editingObject = Object.assign(new SubjectBaseParams(), subject);
            delete this.editingObject.college;
            delete this.editingObject.institute;
            delete this.editingObject.clazz;
            delete this.editingObject.department;
            delete this.editingObject.grade;
            this.inputVisible = true;
        },
        /**
         * 处理建筑物改变事件
         */
        handleBuildingChanged() {
            this.conditions.roomId = '';
            this.roomsInBuilding.splice(0, this.roomsInBuilding.length);
            this.getRooms();
        },
        /**
         * 获取建筑物中的房间
         */
        getRooms: async function() {
            if (!this.conditions.buildingId) return;
            this.roomsInBuilding = await roomService.findByBuildingId(this.conditions.buildingId);
        },
        /**
         * 上传之前的验证
         */
        beforeImport(file) {
            if (!FileValidator.validate(file, CommonDef.IMPORT_FILE_TYPE)) {
                this.$message.error('文件格式格式必须为' + CommonDef.IMPORT_FILE_TYPE + '，大小必须小于5MB');
                return false;
            }
            this.loading = true;
        },
        /**
         * 上传成功
         */
        importSuccess(response, file, files) {
            this.loading = false;
            files.splice(0, files.length);
            // 关闭dialog
            this.$refs.upload.$emit('close');
            // this.dialogVisible = false;
            this.paging();
            this.$message({
                message: '上传成功！',
                type: 'success'
            });
        },
        /**
         * 上传失败
         */
        importError(response) {
            this.loading = false;
            const errorData = JSON.parse(response.message);
            let msg;
            switch (errorData.code) {
                case CommonDef.API_RESPONSE_CODE.PARAMETER_ERROR:
                case CommonDef.API_RESPONSE_CODE.BAD_REQUEST:
                    // 如果返回的错误信息里，存在errors，则提示errors里错误, 否则提示返回的错误message
                    msg = errorData.errors ? errorData.errors[0].message : errorData.message;
                    break;
                default:
                    msg = '请求异常';
            }
            this.$message.error(msg);
        },
        /**
         * 显示用户抓拍历史记录
         */
        showSubjectHistory(subjectId) {
            this.historySubjectId = subjectId;
            this.historyDialogVisible = true;
        },
        /**
         * 显示上传会话框
         */
        openUploadDialog() {
            this.$refs.upload.$emit('open');
        },
        /**
         * 导出识别主体
         * @returns {Promise<void>}
         */
        exportSubjects: async function() {
            await subjectService.export(this.conditions);
        },
        /**
         * 确认导出
         */
        confirmExportSubjects: async function() {
            try {
                await this.$confirm('确认导出人员表格？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                });
                this.exportSubjects();
            } catch (e) {
                this.$message('已取消导出');
            }
        },
        /**
         * 修复授权状态
         */
        repairAuthorization: async function(subject) {
            const restoreDialog = new ConfirmDialog();
            restoreDialog.message = '确认修复该人员的授权状态？';
            await restoreDialog.create(this.$msgbox);
            this.loading = true;
            try {
                await subjectService.repairAuthorization(subject.id);
                this.loading = false;
                this.paging();
                this.$message({
                    type: 'success',
                    message: '修复授权完毕'
                });
            } catch (e) {
                this.loading = false;
            }
        },
        /**
         * 获得完整的宿舍
         */
        getFullRoomName(buildingName, roomName) {
            return roomName ? buildingName + roomName : buildingName || '';
        },
        /**
         * 打开授权异常明细
         * @param subject 用户id
         */
        openAbnormalAuthorization(subject) {
            if (subject.state !== SubjectDef.STATES.BIND_ERROR) return;
            // 设置主体id为选中主体的id，再打开授权异常明细
            this.currentSubject = subject;
            this.abnormalAuthorizationVisible = true;
        },
        /**
         * 关闭授权异常明细
         */
        closeAbnormalAuthorization() {
            // 初始化主体id为null,关闭授权异常明细
            this.currentSubjectId = null;
            this.abnormalAuthorizationVisible = false;
        },
        /**
         * 初始化页面paging参数
         */
        initPagingParams() {
            this.conditions = new SubjectPagingParams();
            this.conditions.gender = '';
            this.conditions.type = '';
            this.conditions.buildingId = '';
            this.conditions.collegeId = '';
            this.conditions.instituteId = '';
            this.conditions.classId = '';
            this.conditions.departmentId = '';
            this.conditions.state = CommonDef.OBJECT_STATUS.UN_ACHIEVED;
        },
        /**
         * 关闭会话框
         * @param dialogName
         */
        closeDialog(dialogName) {
            if (dialogName === 'uploadPhoto') {
                this.uploadPhotoVisible = false;
            }
        },
        /**
         * 开启会话框
         * @param dialogName
         */
        openDialog(dialogName) {
            if (dialogName === 'uploadPhoto') {
                this.uploadPhotoVisible = true;
            }
        },
        /**
         * 关闭会话框且重新paging
         * @param dialogName
         */
        reloadDialog(dialogName) {
            this.closeDialog(dialogName);
            this.paging();
        }
    },
    created() {
        this.uploaderConfig.headers.Authorization = 'Bearer ' + this.$store.state.user.token;
        this.DataType = SubjectBaseParams;
        this.initPagingParams();
        this.service = subjectService;
        this.paging();
        this.getBuildings();
        this.getColleges();
    }
};
