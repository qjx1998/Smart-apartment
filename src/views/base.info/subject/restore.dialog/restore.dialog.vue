<template>
    <el-dialog v-loading="loading" :visible="true" :title="title" width="30%" @close="close()">
        <div v-if="subject" class="data">
            <el-form ref="ruleForms" :model="ruleForm" :rules="rules" label-position="right" label-width="120px">
                <el-form-item label="姓名">
                    <el-input :value="subject.name" :disabled="true" />
                </el-form-item>
                <el-form-item label="楼栋" prop="buildingId" class="is-required">
                    <el-select v-model="ruleForm.buildingId" filterable :value="ruleForm.buildingId">
                        <el-option
                            v-for="building in buildings"
                            :key="building.id"
                            :label="building.name"
                            :value="building.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="宿舍" prop="buildingId">
                    <el-select v-model="ruleForm.roomId" filterable :value="ruleForm.roomId">
                        <el-option
                            v-for="room in roomsInBuilding"
                            :key="room.id"
                            :label="room.name"
                            :value="room.id"
                        />
                    </el-select>
                </el-form-item>
                <template v-if="subject.type === subjectType.VISITOR">
                    <el-form-item label="访问起始时间" prop="recogStartTime">
                        <el-date-picker
                            v-model="ruleForm.recogStartTime"
                            type="datetime"
                            placeholder="请选择起始时间"
                            value-format="yyyy-MM-ddTHH:mm:ss"
                            @change="changeEnd"
                        />
                    </el-form-item>
                    <el-form-item label="访问终止时间" prop="recogEndTime">
                        <el-date-picker
                            v-model="ruleForm.recogEndTime"
                            type="datetime"
                            placeholder="访问终止时间"
                            value-format="yyyy-MM-ddTHH:mm:ss"
                            :picker-options="pickerOptions"
                        />
                    </el-form-item>
                </template>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="confirm()">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import restoreDialog from './restore.dialog';

export default restoreDialog;
</script>

<style lang="scss" scoped>
    @import './restore.dialog.scss';
</style>
