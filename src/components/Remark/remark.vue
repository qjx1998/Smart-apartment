<template functional>
    <div class="remark">
        <template v-if="props.subject.type === props.subjectType.STUDENT">
            <span>学号：{{ props.subject.opid }}</span>
            <span>学校：{{ props.subject.college && props.subject.college.name }}</span>
            <span>院系：{{ props.subject.institute && props.subject.institute.name }}</span>
            <span>班级：{{ props.subject.clazz && props.subject.clazz.name }}</span>
        </template>
        <template v-if="props.subject.type === props.subjectType.EMPLOYEE">
            <span>工号：{{ props.subject.opid }}</span>
            <span>学校：{{ props.subject.college && props.subject.college.name }}</span>
            <span>院系：{{ props.subject.institute && props.subject.institute.name }}</span>
            <span>部门：{{ props.subject.department && props.subject.department.name }}</span>
        </template>
        <template v-if="props.subject.type === props.subjectType.VISITOR">
            <span>访客来源：{{ props.subject.visitorSource }}</span>
            <span>从：{{ props.subject.recogStartTime && props.subject.recogStartTime.replace('T', ' ') }}</span>
            <span>从：{{ props.subject.recogEndTime && props.subject.recogEndTime.replace('T', ' ') }}</span>
        </template>
    </div>
</template>

<script>
export { default } from './remark';
</script>

<style lang="scss" scoped>
.remark {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>
