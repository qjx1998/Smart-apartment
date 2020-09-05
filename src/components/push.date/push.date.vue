<template>
    <div class="push-date">
        <el-dialog :visible="true" :show-close="false" width="380px" top="436px" append-to-body>
            <div class="tab">
                <span
                    class="tab-item"
                    :class="{ selected: pushData.cycleType === PUSH_DATE.MONTH }"
                    @click="switchCycleType(PUSH_DATE.MONTH)"
                >月</span>
                <span
                    class="tab-item"
                    :class="{ selected: pushData.cycleType === PUSH_DATE.WEEK }"
                    @click="switchCycleType(PUSH_DATE.WEEK)"
                >周</span>
                <span
                    class="tab-item"
                    :class="{ selected: pushData.cycleType === PUSH_DATE.DAY }"
                    @click="switchCycleType(PUSH_DATE.DAY)"
                >日</span>
            </div>
            <div v-if="pushData.cycleType === PUSH_DATE.MONTH" class="month">
                <span
                    v-for="day in daysInMonth"
                    :key="day"
                    :class="{selected: pushData.cycleValue.includes(day)}"
                    class="day"
                    @click="selectCycleValue(day)"
                >{{ day }}日</span>
            </div>
            <div v-else-if="pushData.cycleType === PUSH_DATE.WEEK" class="week">
                <span
                    v-for="day in daysInWeek"
                    :key="day.code"
                    :class="{selected: pushData.cycleValue.includes(day.code)}"
                    class="day"
                    @click="selectCycleValue(day.code)"
                >{{ day.name }}</span>
            </div>
            <div v-else-if="pushData.cycleType === PUSH_DATE.DAY" class="day-tab" />
            <div v-else class="day-tab" />
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" type="primary" @click="confirm()">确 定</el-button>
                <el-button size="mini" @click="$emit('close')">取 消</el-button>
            </span>
        </el-dialog>[
    </div>
</template>

<script>
export { default } from './push.date';
</script>

<style lang="scss" scoped>
    @import "./push.date.scss";
</style>
