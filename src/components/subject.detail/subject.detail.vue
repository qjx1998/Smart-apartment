<template>
    <div class="subject-input">
        <el-dialog :visible="true" :title="subject.name + '详细信息'" width="1060px" @close="close">
            <div class="input-container">
                <div class="img">
                    <img v-if="subject.photoUrl" :src="imageBaseUrl + subject.photoUrl" alt="" class="avatar">
                    <div v-else class="no-img">尚未上传头像</div>
                </div>

                <div class="input split">
                    <el-form
                        :model="subject"
                        class="input-form"
                        label-width="108px"
                        label-position="right"
                        :disabled="true"
                    >
                        <el-form-item label="姓名">
                            <el-input :value="subject.name" />
                        </el-form-item>

                        <el-form-item label="性别" prop="gender">
                            <el-input :value="genderDef[subject.gender]" />
                        </el-form-item>

                        <el-form-item label="类别" prop="type">
                            <el-input :value="subjectTypeDef[subject.type]" />
                        </el-form-item>

                        <!--工号或学号-->
                        <el-form-item
                            v-if="subject.type === subjectTypeDef.STUDENT"
                            label="学号"
                            prop="opid"
                        >
                            <el-input :value="subject.opid" />
                        </el-form-item>

                        <el-form-item
                            v-else-if="subject.type === subjectTypeDef.STUDENT"
                            label="工号"
                            prop="opid"
                        >
                            <el-input :value="subject.opid" />
                        </el-form-item>

                        <div v-else class="blank" />

                        <el-form-item label="手机号" prop="phone">
                            <el-input :value="subject.phone" />
                        </el-form-item>

                        <el-form-item label="证件号" prop="certificateIdentification">
                            <el-input :value="subject.certificateIdentification" />
                        </el-form-item>

                        <el-form-item label="楼栋" prop="buildingId">
                            <el-select :value="subject.buildingId">
                                <el-option v-for="build in buildings" :key="build.id" :label="build.name" :value="build.id" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="宿舍" prop="roomId">
                            <el-select :value="subject.roomId" placeholder="">
                                <el-option label="" value="" />
                                <el-option v-for="room in roomsInBuilding" :key="room.id" :label="room.name" :value="room.id" />
                            </el-select>
                        </el-form-item>

                        <template v-if="subject.type !== subjectTypeDef.VISITOR">
                            <el-form-item label="学校" prop="collegeId">
                                <el-input :value="subject.college && subject.college.name" />
                            </el-form-item>
                            <el-form-item label="院系" prop="instituteId">
                                <el-input :value="subject.institute && subject.institute.name" />
                            </el-form-item>
                        </template>

                        <el-form-item v-if="subject.type === subjectTypeDef.STUDENT" label="班级" prop="classId">
                            <el-input :value="subject.clazz && subject.clazz.name" />
                        </el-form-item>

                        <el-form-item v-if="subject.type === subjectTypeDef.EMPLOYEE" label="部门" prop="departmentId">
                            <el-input :value="subject.department && subject.department.name" />
                        </el-form-item>

                        <template v-if="subject.type === subjectTypeDef.VISITOR">
                            <el-form-item label="访客来源" prop="visitorSource">
                                <el-input :value="subject.visitorSource" />
                            </el-form-item>
                            <el-form-item label="访问起始时间" prop="recogStartTime">
                                <el-date-picker
                                    :value="subject.recogStartTime"
                                    type="datetime"
                                    value-format="yyyy-MM-ddTHH:mm:ss"
                                />
                            </el-form-item>
                            <el-form-item label="访问终止时间" prop="recogEndTime">
                                <el-date-picker
                                    :value="subject.recogEndTime"
                                    type="datetime"
                                    value-format="yyyy-MM-ddTHH:mm:ss"
                                />
                            </el-form-item>
                        </template>
                        <div class="blank" />
                        <template>
                            <el-form-item label="创建时间">
                                <el-input :value="subject.createdDate.replace('T', ' ')" />
                            </el-form-item>
                            <el-form-item label="更新时间">
                                <el-input :value="subject.updatedDate.replace('T', ' ')" />
                            </el-form-item>
                        </template>
                    </el-form>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export { default } from './subject.detail';
</script>

<style lang="scss" scoped>
@import "subject.detail";
</style>
