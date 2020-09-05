<template>
    <div class="inspect">
        <div class="head">
            <el-form
                class="condition"
                label-position="right"
                size="small"
            >
                <el-form-item label="楼栋" label-width="40px">
                    <el-select v-model="currentBuildingId" filterable @change="selectBuilding">
                        <el-option
                            v-for="building in buildings"
                            :key="building.id"
                            :label="building.name"
                            :value="building.id"
                        />
                    </el-select>
                </el-form-item>
            </el-form>

            <div v-if="inspectionResult" class="statistics">
                <div class="subject-number total-subject">
                    <div class="subject-state">
                        <img class="total" src="../../../assets/images/inspection-total-big.png" alt="总人数">
                        <span>总人数</span>
                    </div>
                    <span class="number">{{ inspectionResult.buildingView.subjectTotal }}人</span>
                </div>

                <div class="subject-number total-present">
                    <div class="subject-state">
                        <img class="line" src="../../../assets/images/inspection-online-big.png" alt="在寝">
                        <span>在寝</span>
                    </div>
                    <span class="number">{{ inspectionResult.buildingView.presentTotal }}人</span>
                </div>

                <div class="subject-number total-absent" @click="openDialog">
                    <div class="subject-state">
                        <img class="line" src="../../../assets/images/inspection-offline.png" alt="未归">
                        <span>未归</span>
                    </div>
                    <span class="number">{{ inspectionResult.buildingView.subjectTotal - inspectionResult.buildingView.presentTotal }}人</span>
                </div>

                <div
                    class="subject-number total-present"
                    :style="{color: presentRate < 30 ? 'red' : presentRate < 80 ? '#ffc000' : 'green'}"
                >
                    <div class="subject-state percentage">
                        <svg-icon icon-class="percentage" />
                        <span>在寝率</span>
                    </div>
                    <span class="number percentage-number">{{ presentRate !== null ? presentRate + '%' : '' }}</span>
                </div>
            </div>

        </div>

        <div v-if="inspectionResult" class="statistics">
            <div class="floors">
                <div
                    v-for="floorView in inspectionResult.buildingView.floorViews"
                    :key="floorView.floor"
                    class="floor"
                    :class="{selected: floorView.selected}"
                    @click="selectFloor(floorView)"
                >
                    <span class="floor-name">{{ floorView.floor }}楼</span>
                    <div class="statics">
                        <div class="total-number">
                            <div class="number-icon">
                                <img
                                    :src="!floorView.selected ?
                                        require('../../../assets/images/inspection-total.png') :
                                        require('../../../assets/images/inspection-total-selected.png')
                                    "
                                    alt="在寝"
                                >
                            </div>
                            <span :style="{color: floorView.selected ? '#fff' : '#509efe'}">
                                {{ floorView.subjectTotal }}
                            </span>
                        </div>
                        <div class="online-number">
                            <div class="number-icon">
                                <img
                                    :src="!floorView.selected ?
                                        require('../../../assets/images/inspection-online.png') :
                                        require('../../../assets/images/inspection-online-selected.png')
                                    "
                                    alt=""
                                >
                            </div>
                            <span :style="{color: floorView.selected ? '#fff' : '#5bb801'}">
                                {{ floorView.presentTotal }}
                            </span>
                        </div>
                        <div class="offline-number">
                            <div class="number-icon">
                                <img
                                    :src="!floorView.selected ?
                                        require('../../../assets/images/inspection-offline.png') :
                                        require('../../../assets/images/inspection-offline-selected.png')
                                    "
                                    alt=""
                                >
                            </div>
                            <span :style="{color: floorView.selected ? '#fff' : '#989898'}">
                                {{ floorView.subjectTotal - floorView.presentTotal }}
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    v-if="inspectionResult.buildingView.floorViews.length === 0"
                    class="floor nodata"
                >
                    暂无数据
                </div>
            </div>

            <div class="rooms">
                <div
                    v-for="roomView in roomViews"
                    :key="roomView.id"
                    class="room"
                    :class="{overNums: roomView.subjectPresents.length > roomView.maxPlaces}"
                >
                    <el-scrollbar wrap-class="room-list" :native="false">
                        <span class="room-name">{{ roomView.name }}</span>
                        <div class="subjects">
                            <div
                                v-for="subjectPresent in roomView.subjectPresents"
                                :key="subjectPresent.id"
                                class="subject-container container__has"
                                @click="showSubjectDetail(subjectPresent.id)"
                            >
                                <el-tooltip
                                    class="item"
                                    effect="dark"
                                    :content="subjectPresent.name"
                                    placement="top"
                                >
                                    <div class="subject" :class="{present: subjectPresent.present === 1}">
                                        <span class="subject-name">{{ subjectPresent.name }}</span>
                                    </div>
                                </el-tooltip>
                            </div>
                            <div
                                v-for="n in getAvailableNum(roomView)"
                                :key="n + roomView.name"
                                class="subject-container"
                            >
                                <div class="subject">
                                    <span class="subject-name" />
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
                <div v-if="!currentFloorView || !currentFloorView.roomViews" class="nodata">
                    暂无数据
                </div>
            </div>
        </div>
        <dialog-table
            v-if="noPresentSubjectDialogVisiable"
            :subject-ids="noPresentSubjectIds"
            @close="closeDialog"
        />
        <subject-detail v-if="subjectDetailVisible" :subject="showingSubject" :buildings="buildings" @close="hideSubjectDetail()" />
    </div>
</template>

<script>
import daily from './inspection.daily';

export default daily;
</script>

<style lang="scss" scoped>
  @import 'inspection.daily';
</style>
