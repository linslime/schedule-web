<template>
  <!-- 搜索栏 -->
  <a-form layout="inline" style="margin-bottom: 40px;">
    <a-form-item label="门店">
      <a-select
        v-model:value="listParm.roomId"
        show-search
        placeholder="请选择门店"
        style="width: 200px"
        :options="roomOptions"
        :filter-option="filterRoomOption"
      ></a-select>
    </a-form-item>
    <a-form-item label="分组查看">
      <a-input v-model:value="listParm.teacherId" placeholder="请输入关键字"></a-input>
    </a-form-item>
    <a-button @click="refreshList" style="margin-right: 15px;">
      <template #icon>
        <search-outlined />
      </template>
      搜索
    </a-button>
    <a-button @click="resetBtn" type="danger" style="margin-right: 20px;">
      <template #icon>
        <close-outlined />
      </template>
      重置
    </a-button>
    <a-button v-permission="['sys:schedule:add']" @click="courseBtn" type="primary" style="margin-right: 15px;">
      <template #icon>
        <plus-outlined />
      </template>
      手动排班
    </a-button>
    <a-button @click="autoCourseBtn" type="primary">
      <template #icon>
        <plus-outlined />
      </template>
      自动排班
    </a-button>
  </a-form>
  <!-- 日历 -->
  <calendar-list ref="refList"></calendar-list>
  <!-- 排课界面 -->
  <add-schedule ref="addCourse" @refreshList="refreshList"></add-schedule>
  <auto-schedule ref="autoCourse" @refreshList="refreshList"></auto-schedule>
</template>
<script setup lang='ts'>
import CalendarList from './CalendarList.vue';
import { ref, reactive } from 'vue'
import AddSchedule from './AddSchedule.vue';
import AutoSchedule from './AutoSchedule.vue';
import useSelect from '@/composable/schedule/useSelect';
//下拉属性
const { roomOptions, teacherOptions, courseOptions, filterCourseOption, filterRoomOption, filterTeacherOption } = useSelect()
const refList = ref();
//搜索参数
const listParm = reactive({
  roomId: '',
  teacherId: ''
})
//搜索参数
const defaultParm = reactive({
  roomId: '1'
})
//排课界面ref属性
const addCourse = ref<{show:()=>void}>();

//排课界面ref属性
const autoCourse = ref<{show:()=>void}>();

//排课按钮
const courseBtn = ()=>{
  addCourse.value?.show()
}
const resetBtn = () =>{
  listParm.roomId = ''
  listParm.teacherId = ''
  refList.value.reset()
}
//排课按钮
const autoCourseBtn = ()=>{
  autoCourse.value?.show()
}

//排课按钮
const searcherBtn = ()=>{
  autoCourse.value?.show()
}
//刷新列表
const refreshList = ()=>{
  refList.value.getScheduleList(listParm.roomId,listParm.teacherId,"0")
}

</script>
<style scoped lang='scss'>
</style>
