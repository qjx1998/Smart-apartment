<template>
    <div class="subject-input">
        <el-dialog :visible="true" :title="title" width="790px" @close="close">
            <div class="input-container">
                <div class="input">
                    <el-form
                        :ref="formName"
                        class="input-form"
                        label-position="right"
                        label-width="80px"
                        :rules="formRules"
                        :model="editingObject"
                    >

                        <span class="pushMessage">规则信息:</span><div class="line" />

                        <el-form-item label="规则名称" class="input-item" prop="dangerRule.name">
                            <el-input v-model="editingObject.dangerRule.name" />
                        </el-form-item>

                        <el-form-item label="级别" class="input-item" prop="dangerRule.level">
                            <el-select v-model="editingObject.dangerRule.level">
                                <el-option
                                    v-for="level in levels.list"
                                    :key="level.code"
                                    :label="level.name"
                                    :value="level.code"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="规则种类" prop="dangerRule.type">
                            <template>
                                <el-radio v-model="editingObject.dangerRule.type" :label="1" :value="1">通用规则</el-radio>
                                <el-radio v-model="editingObject.dangerRule.type" :label="2" :value="2">自定义规则</el-radio>
                            </template>
                        </el-form-item>

                        <!--只用来占位，不做任何操作 -->
                        <el-form-item label="" class="input-item hide" />

                        <el-form-item label="类别" class="type" prop="dangerRule.dangerType">
                            <el-select v-model="editingObject.dangerRule.dangerType">
                                <el-option
                                    v-for="category in categories.list"
                                    :key="category.code"
                                    :label="category.name"
                                    :value="category.code"
                                />
                            </el-select>
                        </el-form-item>

                        <!--只用来占位，不做任何操作 -->
                        <el-form-item class="input-item hide" />

                        <el-form-item v-if="editingObject.dangerRule.type === 1 && editingObject.dangerRule.dangerType !== 5" label="规则关系" class="dangerRuleDomain" prop="dangerRule.domain">
                            <el-checkbox-group v-model="editingObject.dangerRule.domain">
                                <el-checkbox-button
                                    v-for="relation in relations.list"
                                    :key="relation.code"
                                    :label="relation.code"
                                >
                                    {{ relation.name }}
                                </el-checkbox-button>
                            </el-checkbox-group>
                            <p v-if="editingObject.dangerRule.domain.length !== 0">您的告警信息将会推送给所有的{{ relationName }}负责人</p>
                        </el-form-item>

                        <template v-if="editingObject.dangerRule.type === 2 && editingObject.dangerRule.dangerType !== 5">
                            <el-form-item class="input-item" label="学校" prop="dangerRule.dataSource.collegeId">
                                <el-select v-model="editingObject.dangerRule.dataSource.collegeId">
                                    <el-option
                                        v-for="schoolList in schoolLists"
                                        :key="schoolList.id"
                                        :label="schoolList.name"
                                        :value="schoolList.id"
                                    />
                                </el-select>
                            </el-form-item>
                            <el-form-item class="input-item" label="院系" prop="dangerRule.dataSource.instituteId">
                                <el-select v-model="editingObject.dangerRule.dataSource.instituteId">
                                    <el-option label="请选择" value="" />
                                    <el-option
                                        v-for="instituteList in instituteLists"
                                        :key="instituteList.id"
                                        :label="instituteList.name"
                                        :value="instituteList.id"
                                    />
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <div>
                                    <el-radio v-model="selectMode" label="0" border>部门</el-radio>
                                    <el-radio v-model="selectMode" label="1" border>班级</el-radio>
                                </div>
                            </el-form-item>
                            <el-form-item v-if="selectMode === '1'" class="showMode" prop="dangerRule.dataSource.clazzId">
                                <el-select
                                    v-model="editingObject.dangerRule.dataSource.clazzId"
                                    class="depart"
                                    multiple
                                    filterable
                                >
                                    <el-option label="请选择" value="" />
                                    <el-option
                                        v-for="clazz in classes"
                                        :key="clazz.id"
                                        :label="clazz.name"
                                        :value="clazz.id"
                                    />
                                </el-select>
                            </el-form-item>

                            <el-form-item v-else class="showMode" prop="dangerRule.dataSource.departmentId">
                                <el-select
                                    v-model="editingObject.dangerRule.dataSource.departmentId"
                                    class="depart"
                                    multiple
                                    filterable
                                >
                                    <el-option label="请选择" value="" />
                                    <el-option
                                        v-for="department in departments"
                                        :key="department.id"
                                        :label="department.name"
                                        :value="department.id"
                                    />
                                </el-select>
                            </el-form-item>
                        </template>
                        <div
                            v-for="(number, index) in conditionsLengthArr"
                            :key="number"
                            class="condition"
                        >
                            <el-form-item
                                class="drift indexItemWidth"
                                label="指标项"
                                :prop="'dangerRule.conditions[' + index + '].type'"
                            >
                                <el-select v-model="editingObject.dangerRule.conditions[index].type">
                                    <el-option label="请选择" value="" />
                                    <el-option
                                        v-for="condition in conditionTypes"
                                        :key="condition.code"
                                        :label="condition.name"
                                        :value="condition.code"
                                    />
                                </el-select>
                            </el-form-item>

                            <el-form-item class="drift judge" :prop="'dangerRule.conditions[' + index + '].operator'">
                                <el-select v-model="editingObject.dangerRule.conditions[index].operator">
                                    <el-option
                                        v-for="commont in commonts.list.slice(0,3)"
                                        :key="commont.code"
                                        :label="commont.symbol"
                                        :value="commont.code"
                                    />
                                </el-select>
                            </el-form-item>

                            <el-form-item class="input-item drift dangerRuleCondition" :prop="'dangerRule.conditions['+ index + '].num'">
                                <el-input v-model.number="editingObject.dangerRule.conditions[index].num" />
                            </el-form-item>

                            <el-button v-if="index >= 1" icon="el-icon-minus" class="deleteCondition" type="primary" @click="deleteCondition(index)" />

                            <el-button type="primary" icon="el-icon-plus" class="drift form-btn" @click="addCondition" />
                        </div>

                        <span class="pushMessage">推送信息:</span><div class="line" />

                        <el-form-item label="推送方式" class="input-item" prop="dangerRule.notifyType">
                            <el-select v-model="editingObject.dangerRule.notifyType">
                                <el-option
                                    v-for="pushStyle in pushStyles.list"
                                    :key="pushStyle.code"
                                    :label="pushStyle.name"
                                    :value="pushStyle.code"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item
                            v-if="editingObject.dangerRule.type === 2"
                            label="推送用户"
                            class="input-item"
                            prop="dangerRule.targetUserId"
                        >
                            <el-select
                                v-model="editingObject.dangerRule.targetUserId"
                                multiple
                                filterable
                            >
                                <el-option
                                    v-for="user in users"
                                    :key="user.id"
                                    :label="user.name"
                                    :value="user.id"
                                />
                            </el-select>
                        </el-form-item>

                        <!--只用来占位，不做任何操作 -->
                        <el-form-item v-else label="" class="input-item hide" />

                        <el-form-item label="推送周期" class="input-item" prop="cronData">
                            <el-input :value="cronDesc" @focus="showDatePicker" />
                        </el-form-item>

                        <el-form-item
                            label="推送时刻"
                            class="input-item"
                            prop="cronData.time"
                            :rules="[
                                { required: true, message: '请选择推送时刻', trigger: 'blur'},
                            ]"
                        >
                            <el-time-picker
                                v-model="editingObject.cronData.time"
                                type="datetime"
                                placeholder="选择日期时间"
                                format="HH:mm:ss"
                                value-format="HH:mm:ss"
                            />
                        </el-form-item>

                        <el-form-item v-if="editingObject.dangerRule.dangerType === categories.LATE_BACK || editingObject.dangerRule.dangerType === categories.NOT_BACK" label="短信预览" class="input-item textArea">
                            <el-input type="textarea" :value="inputLater" disabled />
                        </el-form-item>

                        <el-form-item v-if="editingObject.dangerRule.dangerType === categories.MUTI_NOT_BACK || editingObject.dangerRule.dangerType === categories.MUTI_NOT_OUT" label="短信预览" class="input-item textArea">
                            <el-input type="textarea" :value="inputLongLater" disabled />
                        </el-form-item>

                        <el-form-item v-if="editingObject.dangerRule.dangerType === categories.DEVICE_OFFLINE" label="短信预览" class="input-item textArea">
                            <el-input type="textarea" value="[告警级别]您好，xxxx（设备组）xxxx（设备）已离线，详情请进入系统查询。" disabled />
                        </el-form-item>

                    </el-form>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">{{ mode === 'create' ? '保存' : '更新信息' }}</el-button>
                <el-button type="info" @click="close">取消</el-button>
            </span>
        </el-dialog>
        <push-date v-if="datePickerVisible" v-model="editingObject.cronData" @close="hideDatePicker()" />
    </div>
</template>

<script>
export { default } from './rule.input';
</script>

<style lang="scss" scoped>
    @import "~@/styles/baseinfo.prompt.scss";
    @import "../rule.scss";
</style>
