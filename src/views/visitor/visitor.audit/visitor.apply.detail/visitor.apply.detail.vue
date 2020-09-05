<template>
    <el-dialog v-loading="loading" :visible="true" :title="title" width="1060px" @close="close">
        <div class="input-container">
            <img :src="getFullImagePath(application.subject.photoUrl)" alt="" class="card">
            <div class="input">
                <el-form
                    ref="form"
                    :model="form"
                    :rules="formRules"
                    class="input-form"
                    label-width="108px"
                    label-position="right"
                >
                    <el-form-item label="姓名" class="input-item">
                        <el-input :disabled="true" :value="application.subject.name" />
                    </el-form-item>

                    <el-form-item label="性别" class="input-item">
                        <el-input :disabled="true" :value="CONSTANTS.SUBJECT_GENDER[application.subject.gender]" />
                    </el-form-item>

                    <el-form-item label="手机号" class="input-item">
                        <el-input :disabled="true" :value="application.subject.phone" />
                    </el-form-item>

                    <el-form-item label="身份证" class="input-item">
                        <el-input :disabled="true" :value="application.subject.certificateIdentification" />
                    </el-form-item>

                    <el-form-item label="申请楼栋" class="input-item">
                        <el-input :disabled="true" value="13栋" />
                    </el-form-item>

                    <el-form-item label="审核状态" class="input-item">
                        <el-input :disabled="true" :value="CONSTANTS.AUDIT_STATE[application.auditState]" />
                    </el-form-item>

                    <el-form-item label="申请提交时间" class="input-item">
                        <el-date-picker
                            v-model="application.createdDate"
                            type="datetime"
                            value-format="yyyy-MM-ddTHH:mm:ss"
                            :disabled="true"
                        />
                    </el-form-item>

                    <el-form-item label="访客来源" class="input-item">
                        <el-input :disabled="true" :value="application.subject.visitorSource" />
                    </el-form-item>

                    <el-form-item label="申请事由" class="input-item">
                        <el-input :disabled="true" :value="application.applyReason" />
                    </el-form-item>

                    <el-form-item label="分配宿舍" class="input-item" prop="roomName">
                        <el-input v-if="mode !== 'view'" v-model="form.roomName" />
                        <el-input v-else v-model="application.room.name" disabled="" />
                    </el-form-item>

                    <el-form-item label="访问起始时间" prop="recogStartTime">
                        <el-date-picker
                            v-model="form.recogStartTime"
                            type="datetime"
                            value-format="yyyy-MM-ddTHH:mm:ss"
                            :disabled="mode === 'view'"
                        />
                    </el-form-item>

                    <div class="blank" />

                    <el-form-item label="访问终止时间" prop="recogEndTime">
                        <el-date-picker
                            v-model="form.recogEndTime"
                            type="datetime"
                            value-format="yyyy-MM-ddTHH:mm:ss"
                            :disabled="mode === 'view'"
                        />
                    </el-form-item>

                    <el-form-item v-if="mode === 'view'" label="共计">
                        <el-input :disabled="true" :value="`${totalDays}天`" />
                    </el-form-item>

                    <el-form-item label="审批意见" prop="auditOpinion" class="opinion">
                        <el-input v-if="mode !=='view'" v-model="form.auditOpinion" :disabled="mode === 'view'" type="textarea" />
                        <el-input v-else v-model="application.auditOpinion" :disabled="mode === 'view'" type="textarea" />
                    </el-form-item>

                </el-form>
            </div>
        </div>

        <span v-if="mode !== 'view'" slot="footer">
            <el-button
                type="primary"
                @click="passAudit()"
            >
                通过
            </el-button>
            <el-button type="primary" @click="notPassAudit()">不通过</el-button>
            <el-button type="info" @click="close">取消</el-button>
        </span>
    </el-dialog>
</template>

<script>
export { default } from './visitor.apply.detail';
</script>

<style lang="scss" scoped>
@import '~@/views/base.info/subject/input/subject.input.scss';
@import './visitor.apply.detail.scss';
</style>
