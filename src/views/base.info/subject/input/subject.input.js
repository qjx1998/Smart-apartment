
import SubjectDef from '@/constants/subject.def';
import roomService from '@/service/room.service';
import subjectService from '@/service/subject.service';
import { FormValidator, ImageValidator } from '@/utils/validate';
import inputMixin from '@/mixins/input.mixin';
import ResponseHandler from '@/utils/response.handler';
import { Message } from 'element-ui';
import Compressor from 'compressorjs';
import { Subject } from '@/data/subject';
import { instituteService } from '@/service/institute.service';
import clazzService from '@/service/clazz.service';
import { departmentService } from '@/service/department.service';
import StringUtils from '@/utils/string.utils';

export default {
    mixins: [inputMixin],
    data() {
        return {
            /**
             * 性别列表
             */
            genderDef: SubjectDef.GENDER,
            /**
             * 识别主体类型
             */
            subjectTypeDef: SubjectDef.TYPE,
            /**
             * 识别主题类别列表
             */
            subjectTypeList: SubjectDef.TYPE.list.filter(item => item.code !== SubjectDef.TYPE.STRANGER),
            /**
             * 表单验证规则
             */
            formRules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    {
                        min: 2,
                        max: 64,
                        message: '长度在 2 到 64 个字符',
                        trigger: 'change'
                    }
                ],
                certificateIdentification: [
                    {
                        validator: FormValidator.validateCidFormat,
                        trigger: 'blur'
                    },
                    {
                        subjectId: this.editingObject.id,
                        validator: FormValidator.validateCidExists,
                        trigger: 'blur'
                    }
                ],
                type: [
                    { required: true, message: '请选择识别主体类别', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { validator: FormValidator.validatPhone, trigger: 'blur' },
                    {
                        subjectId: this.editingObject.id,
                        validator: FormValidator.validatePhoneExists,
                        trigger: 'blur'
                    }
                ],
                buildingId: [
                    { required: true, message: '请选择楼栋', trigger: 'blur' }
                ],
                opid: [
                    { validator: FormValidator.validateOpid, trigger: 'blur' },
                    {
                        subjectId: this.editingObject.id,
                        validator: FormValidator.validateOpidExists,
                        trigger: 'blur'
                    }
                ],
                institute: [
                    { max: 20, message: '院系不能超过20个字符', trigger: 'blur' }
                ],
                className: [
                    { max: 20, message: '班级不能超过20个字符', trigger: 'blur' }
                ],
                department: [
                    { max: 20, message: '部门不能超过20个字符', trigger: 'blur' }
                ],
                organization: [
                    { max: 20, message: '单位不能超过20个字符', trigger: 'blur' }
                ],
                recogStartTime: [
                    { required: true, message: '请添加访问起始时间', trigger: 'blur' }
                ],
                recogEndTime: [
                    { required: true, message: '请添加访问终止时间', trigger: 'blur' }
                ]
            },
            /**
             * 上传配置
             */
            uploaderConfig: {
                /**
                 * 上传请求url
                 */
                action: process.env.VUE_APP_SERVER_BASE_URL + '/api/subject',
                /**
                 * 请求headers
                 */
                headers: {
                    Authorization: 'Bearer ' + this.$store.state.user.token
                }
            },
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
            /**
             * 建筑物中的房
             */
            roomsInBuilding: [],
            /**
             * 图片本地地址
             */
            imageUrl: null,
            /**
             * 控制更新头像按钮的禁止功能
             */
            updateAvatarBtnDisabled: true,

            /**
             * 学校下的院系
             */
            institutesInCollege: [],
            /**
             * 院系下的班级
             */
            classesInInstitute: [],
            /**
             * 院系下的部门
             */
            departmentsInInstitute: []
        };
    },
    props: {
        /**
         * 建筑物列表
         */
        buildings: {
            type: Array
        },
        /**
         * 学校列表
         */
        colleges: {
            type: Array,
            required: true
        },
        /**
         * 人员数据
         */
        subject: {
            type: Subject || null,
            required: false
        }
    },
    watch: {
        'editingObject.buildingId'() {
            this.editingObject.roomId = '';
            this.roomsInBuilding.splice(0, this.roomsInBuilding.length);
            this.getRooms();
        },
        /**
         * 条件的学校变化时
         */
        'editingObject.collegeId'() {
            // 重置
            this.editingObject.instituteId = '';
            this.institutesInCollege = [];
            this.getInstitutes();
        },
        /**
         * 条件中的院系发生变化时
         */
        'editingObject.instituteId'() {
            this.editingObject.classId = '';
            this.editingObject.departmentId = '';
            this.classesInInstitute = [];
            this.departmentsInInstitute = [];
            this.getClasses();
            this.getDepartments();
        },
        /**
         * 条件中的类别发生变化时
         */
        'editingObject.type'() {
            this.editingObject.classId = '';
            this.editingObject.collegeId = '';
            this.editingObject.departmentId = '';
            this.editingObject.instituteId = '';
            this.editingObject.visitorSource = '';
            this.editingObject.recogStartTime = '';
            this.editingObject.recogEndTime = '';
        }
    },
    methods: {
        /**
         * 改变终止时间范围
         */
        changeEnd() {
            const { recogStartTime } = this.editingObject;
            if (recogStartTime) {
                this.pickerOptions = {
                    ...this.pickerOptions,
                    disabledDate(time) {
                        return new Date(recogStartTime).getTime() > time.getTime();
                    }
                };
            }
        },
        /**
         * 获取建筑物中的房间
         * @param buildingId 建筑物ID
         */
        async getRooms() {
            this.roomsInBuilding = await roomService.findByBuildingId(this.editingObject.buildingId);
        },
        /**
         * 获取学校下的院系
         */
        async getInstitutes() {
            if (!this.editingObject.collegeId) return;
            this.institutesInCollege = await instituteService.findByCollegeId(this.editingObject.collegeId);
        },
        /**
         * 获取院系下的班级
         */
        async getClasses() {
            if (!this.editingObject.instituteId) return;
            this.classesInInstitute = await clazzService.findByInstituteId(this.editingObject.instituteId);
        },
        /**
         * 获取院系下的部门
         */
        async getDepartments() {
            if (!this.editingObject.instituteId) return;
            this.departmentsInInstitute = await departmentService.findByInstituteId(this.editingObject.instituteId);
        },
        /**
         * 提交表单
         */
        submitForm() {
            this.$refs['form'].validate((valid) => {
                if (!valid) {
                    return;
                }

                const self = this;

                Object.keys(this.editingObject).forEach(function(key) {
                    if (!self.editingObject[key]) {
                        self.editingObject[key] = '';
                    }
                });

                // 判断访客起止时间是否正常
                const { recogStartTime, recogEndTime } = this.editingObject;
                if (recogStartTime && recogEndTime) {
                    if ((new Date(recogEndTime)).getTime() < (new Date(recogStartTime)).getTime()) {
                        this.$message({
                            type: 'error',
                            message: '起止时间异常'
                        });
                        return;
                    }
                }

                // 新建
                if (this.mode === 'create' && this.imageUrl) {
                    this.loading = true;
                    this.$refs.upload.submit();
                } else if (this.mode === 'create' && !this.imageUrl) {
                    this.loading = true;
                    this.service.createBaseInfo(this.editingObject).then(
                        res => {
                            this.loading = false;
                            this.reload();
                        }
                    ).catch(err => {
                        const body = JSON.parse(err.message);

                        const errMsg = ResponseHandler.getErrorMessage(body);

                        Message({
                            message: errMsg,
                            type: 'error',
                            duration: 3 * 1000
                        });
                        this.loading = false;
                    });
                } else if (this.mode === 'update') { // 更新
                    this.loading = true;
                    this.service.update(this.editingObject).then(
                        () => {
                            this.loading = false;
                            this.needReload = true;
                            this.$message({
                                message: '人员信息更新成功',
                                type: 'success'
                            });
                            this.reload();
                        }
                    ).catch(() => {
                        this.loading = false;
                    });
                }
            });
        },
        /**
         * 更新时上传用户头像
         */
        updateAvatar() {
            this.loading = true;
            this.$refs.upload.submit();
        },
        /**
         * 上传成功
         */
        onUploadSuccess(response, file, files) {
            this.$message({
                message: '图片上传成功',
                type: 'success'
            });
            this.needReload = true;
            this.loading = false;
            this.updateAvatarBtnDisabled = true;
            files.splice(0, files.length);
            // this.imageUrl = URL.createObjectURL(file.raw);

            // 新建时，上传成功将提交所有数据。会话框关闭，并属性列表
            if (this.mode === 'create') {
                this.reload();
            }
        },
        /**
         * 上传失败
         */
        onUploadError(err, file, files) {
            this.loading = false;
            files.splice(0, file.length);
            this.imageUrl = null;

            const body = JSON.parse(err.message);

            const errMsg = ResponseHandler.getErrorMessage(body);

            Message({
                message: errMsg,
                type: 'error',
                duration: 3 * 1000
            });
        },
        /**
         * 处理更换上传图片事件
         */
        handleAvatarChange(file, files) {
            // 准备状态时的处理
            if (file.status === 'ready') {
                if (!ImageValidator.validateImage(file)) {
                    files.splice(0, files.length);
                    this.imageUrl = null;
                    this.$message.error('图片格式必须为jpg,jpeg或png，大小必须小于20MB');
                    return;
                }

                this.updateAvatarBtnDisabled = false;

                const self = this;
                const reader = new FileReader();
                reader.onload = function(e) {
                    // 将图片路径赋值给src
                    self.imageUrl = e.target.result;
                };
                reader.readAsDataURL(file.raw);
            }
        },
        /**
         * 上传图片将图片压缩到1m大小
         */
        beforeUpload(image) {
            return new Promise(resolve => {
                new Compressor(image, {
                    checkOrientation: true,
                    convertSize: 1000000,
                    success(file) {
                        resolve(file);
                    }
                });
            });
        },
        /**
         * init when update
         */
        initWhenUpdate() {
            // 更新时的初始化配置
            if (this.mode === 'update') {
                // 如果后端返回的图片地址不为空，默认显示的图片地址
                if (this.editingObject.photoUrl) {
                    this.imageUrl = process.env.VUE_APP_OSS_BASE_URL + this.editingObject.photoUrl;
                }
                // 上传图片的url地址
                this.uploaderConfig.action = process.env.VUE_APP_SERVER_BASE_URL + '/api/subject/update/photo/' + this.editingObject.id;
                // 更新room复选框后选项
                this.getRooms();

                // 为了正确的展示院系，班级，部门
                if (this.subject.institute) {
                    this.institutesInCollege.push(this.subject.institute);
                }

                if (this.subject.clazz) {
                    this.classesInInstitute.push(this.subject.clazz);
                }

                if (this.subject.department) {
                    this.classesInInstitute.push(this.subject.department);
                }

                if (this.editingObject.collegeId) {
                    this.getInstitutes();
                }
                if (this.editingObject.instituteId) {
                    this.getClasses();
                    this.getDepartments();
                }
            }
            this.changeEnd();
        }
    },
    computed: {
        /**
         * 在识别主体类型为学生的时候显示'学号'，员工的时候显示'工号'
         */
        opidLabel() {
            return this.editingObject.type === this.subjectTypeDef.STUDENT ? '学号' : '工号';
        },
        /**
         * 会话框标M
         */
        title() {
            return this.editingObject.id != null ? '更新识别主体' : '新建识别主体';
        },
        /**
         * 人员创建时间
         */
        subjectCreatedDate() {
            const { editingObject } = this;
            return editingObject.createdDate.replace('T', ' ');
        },
        /**
         * 人员更新时间
         */
        subjectUpdatedDate() {
            const { editingObject } = this;
            return editingObject.updatedDate ? editingObject.updatedDate.replace('T', ' ') : null;
        },
        /**
         * 是否禁用院系表单
         */
        instituteSelectorDisabled() {
            return StringUtils.isEmpty(this.editingObject.collegeId);
        },
        /**
         * 是否禁用部门和班级表单
         */
        classOrDepartmentSelectorDisabled() {
            return StringUtils.isEmpty(this.editingObject.instituteId);
        }
    },
    created() {
        this.service = subjectService;
        // 设置默认性别,设置默认类型
        if (this.mode === 'create') {
            this.editingObject.gender = this.genderDef.MALE;
            this.editingObject.type = this.subjectTypeDef.EMPLOYEE;
        }
        this.initWhenUpdate();
    }
};
