<template>
  <FullCalendar ref="fullCalendar" class="demo-app-calendar" :options="calendarOptions">
    <template v-slot:eventContent="arg">
      <b>{{ arg.timeText }}</b>
      <i>{{ arg.event.title }}</i>
    </template>
  </FullCalendar>
  <!-- 编辑日历 -->
  <CalendarEdit ref="editRef" @upSuccess="upSuccess"></CalendarEdit>

  <CalendarAd ref="adRef" @upSuccess="Success"></CalendarAd>
</template>
<script lang='ts' setup>
import Schedule from './Schedule.vue';
import CalendarEdit from './CalendarEdit.vue';
import CalendarAd from './CalendarAd.vue';
import { onMounted, reactive, ref } from 'vue'
import { getScheduleListApi,updateCalendarApi } from '@/api/schedule/schedule'
import '@fullcalendar/core/vdom' // solve problem with Vite
import FullCalendar, { CalendarOptions, EventApi, DateSelectArg, EventClickArg } from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { EditType } from '@/type/BaseEnum';
import {ListParm, RemoveParm} from '@/api/schedule/ScheduleType';
import dayjs, { Dayjs } from 'dayjs'
//编辑弹框的ref属性
const editRef = ref();

const adRef = ref();

//日历的ref属性
const fullCalendar = ref()

//上周
const prevWeekCustomClick = () => {
  fullCalendar.value.getApi().prev();
}
//下周
const nextWeekCustomClick = () => {
  fullCalendar.value.getApi().next()
}
//今天
const todayCustomClick = () => {
  fullCalendar.value.getApi().today();
  fullCalendar.value.getApi().getDate();
}
//上月
const prevMonthCustomClick = () => {
  fullCalendar.value.getApi().prev();
}
//下月
const nextMonthCustomClick = () => {
  fullCalendar.value.getApi().next()
}
//本月
const thisMonthCustomClick = () => {
  fullCalendar.value.getApi().today();
  fullCalendar.value.getApi().getDate();
}
//日历新增点击
const addClick =(selectInfo:DateClickArg)=>{
  console.log(selectInfo)
  adRef.value.editCalender(EditType.ADD);
}
//编辑事件
const editClick = (clickInfo:EventClickArg)=>{
  console.log(clickInfo)
  editRef.value.editCalender(EditType.EDIT,clickInfo.event.extendedProps);
}
//移动参数
const removeParm = reactive<RemoveParm>({
  id: '',
  beginTime: '',
  endTime: '',
  dateTime: '',
})
//移动事件
const removeClick = async(item:EventClickArg)=>{
  console.log(item)
  removeParm.id = item.event.id;
  removeParm.dateTime = dayjs(item.event.start).format("YYYY-MM-DD");
  removeParm.beginTime = dayjs(item.event.start).format('HH:mm:ss');
  removeParm.endTime = dayjs(item.event.end).format('HH:mm:ss')
  //更新数据
  let res = await updateCalendarApi(removeParm)
  if(res && res.code == 200){
    //刷新列表
    getScheduleList("2","3","4")
  }
}
//日历属性
const calendarOptions = reactive({
  plugins: [
    dayGridPlugin,
    listPlugin,
    timeGridPlugin,
    interactionPlugin // needed for dateClick
  ],
  // 自定义按钮
  customButtons: {
    prevWeekCustom: {
      text: '上周',
      click: function () {
        prevWeekCustomClick();
      }
    },
    nextWeekCustom: {
      text: '下周',
      click: function () {
        nextWeekCustomClick();
      }
    },
    todayCustom: {
      text: '本周',
      click: function () {
        todayCustomClick();
      }
    },
    prevMonthCustom: {
      text: '上月',
      click: function () {
        prevMonthCustomClick();
      }
    },
    nextMonthCustom: {
      text: '下月',
      click: function () {
        nextMonthCustomClick();
      }
    },
    thisMonthCustom: {
      text: '本月',
      click: function () {
        thisMonthCustomClick();
      }
    }
  },
  headerToolbar: {
    start: 'timeGridWeek,prevWeekCustom,todayCustom,nextWeekCustom',
    right: 'dayGridMonth,prevMonthCustom,thisMonthCustom,nextMonthCustom',
    center: 'title'
  },
  //修改headerToolbar的文字
  buttonText: {
    today: '今天',
    month: '月视图',
    week: '周视图',
    day: '日',
    list: '周列表'
  },

  //设置日历的高度
  contentHeight: window.innerHeight - 200,
  // 默认为那个视图（月：dayGridMonth，周：timeGridWeek，日：timeGridDay）
  initialView: 'timeGridWeek',
  // 切换语言，当前为中文
  locale: 'zh-cn',
  //月视图的显示模式，fixed：固定显示6周高；liquid：高度随周数变化；variable: 高度固定
  // weekMode: 'liquid',

  // 设置一周中显示的第一天是哪天，周日是0，周一是1，
  firstDay: 1,
  // 时间轴间距
  slotMinTime: '08:00',
  slotMaxTime: '24:00',
  slotDuration: '00:' + '10',
  slotLabelFormat: {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false
  },
  eventTimeFormat: {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false
  },
  //日历数据
  events: [],
  //Event是否可以进行（拖动、缩放）修改
  editable: false,
  // 是否显示全天插槽
  allDaySlot: false,
  // 是否显示当前时间标记
  nowIndicator: true,
  //是否随浏览器窗口大小变化而自动变化
  handleWindowResize: true,
  // 日期否可点击
  navLinks: false,
  // 月视图，是否为指定周数高度
  fixedWeekCount: true,
  // 月视图，是否显示非本月日期
  showNonCurrentDates: false,
  //设置是否可被单击选中
  selectable: false,
  selectMirror: false,
  dayMaxEvents: false,
  weekends: true,
  //新增事件
  dateClick: addClick,
  eventClick: editClick,
  eventDrop: removeClick
} as CalendarOptions)


const listParm = reactive({
  courseId: '',
  roomId: '',
  teacherId: ''
})

const resetParm = reactive({
  roomId:'1'
})
//日历获取参数
const calendarParm = reactive<ListParm>({
  roomId: '',
  courseId: '',
  teacherId: '',
  startDate: '',
  endDate: '',
  beginTime: '',
  endTime: '',
  duration: 0
})
//获取日历数据
const getScheduleList = async (roomId:string,teacherId:string,key:string) => {

  if (key == "0"){
    calendarParm.roomId = roomId;
    calendarParm.teacherId = teacherId;
    console.log(calendarParm.roomId);
    console.log(calendarParm.teacherId);
  }
  if (roomId == ""){
    calendarParm.roomId = "1";

  }
  let res = await getScheduleListApi(calendarParm);
  if (res && res.code == 200) {
    console.log("hhh");
    console.log(calendarOptions.events);
    //清空原来的数据
    calendarOptions.events = [];
    console.log(calendarOptions.events);
    console.log("hhh")
    for (let i = 0; i < res.data.length; i++) {
      //日历数据格式
      let obj = {
        id: '',
        title: '',
        start: '',
        end: '',
        backgroundColor: '',
        className: '',
        //编辑的时候，可以从该属性获取数据
        extendedProps: Object
      }
      //后端返回的背景色字段
      let index = res.data[i].color.indexOf('-')
      //backgroundColor值
      let color = res.data[i].color.substring(index + 1, res.data[i].color.length);
      //className的值
      let clases = res.data[i].color.substring(0, index)

      obj.id = res.data[i].id,
          //日历展示标题
          obj.title = res.data[i].teacherName

      obj.start = res.data[i].dateTime + ' ' + res.data[i].beginTime,
          obj.end = res.data[i].dateTime + ' ' + res.data[i].endTime,
          obj.backgroundColor = color,
          obj.className = clases,
          obj.extendedProps = res.data[i]
      calendarOptions.events.push(obj)
    }
  }
}
//新增、编辑成功刷新
const upSuccess = ()=>{
  getScheduleList("","3","4")
}
const reset = ()=>{
  resetParm.roomId='1'
}
//新增、编辑成功刷新
const Success = ()=>{
  getScheduleList("","3","4")
}
onMounted(() => {
  getScheduleList("","3","4")
})
defineExpose({
  getScheduleList,
  reset,
})
</script>

<style scoped lang='scss'>
:deep(.fc-button-primary) {
  background-color: #1890ff !important;
  border-color: #fff !important;
}
:deep(.bgs1) {
  background: #ff7670 !important;
  border-color: #fff !important;
  color: #fff !important;
}
:deep(.bgs2) {
  background: #27ae60 !important;
  border-color: #fff !important;
  color: #fff !important;
}
:deep(.bgs3) {
  background: #1890ff !important;
  border-color: #fff !important;
  color: #fff !important;
}
:deep(.bgs4) {
  background: #009688 !important;
  border-color: #fff !important;
  color: #fff !important;
}
:deep(.bgs5) {
  background: #5fb878 !important;
  border-color: #fff !important;
  color: #fff !important;
}
:deep(.bgs6) {
  background: #ff5722 !important;
  border-color: #fff !important;
  color: #fff !important;
}
:deep(.bgs7) {
  background: #7705f9 !important;
  border-color: #fff !important;
  color: #fff !important;
}
:deep(.bgs8) {
  background: #009688 !important;
  border-color: #fff !important;
  color: #fff !important;
}
:deep(.bgs9) {
  background: #4c03f4 !important;
  border-color: #fff !important;
  color: #fff !important;
}
:deep(.bgs10) {
  background: #f22d6f !important;
  border-color: #fff !important;
  color: #fff !important;
}
:deep(.bgs11) {
  background: #f73838 !important;
  border-color: #fff !important;
  color: #fff !important;
}
:deep(.bgs12) {
  background: #3874f7 !important;
  border-color: #fff !important;
  color: #fff !important;
}
:deep(.bgs13) {
  background: #e066ff !important;
  border-color: #fff !important;
  color: #fff !important;
}
:deep(.bgs14) {
  background: #ffb800 !important;
  border-color: #fff !important;
  color: #fff !important;
}
</style>

