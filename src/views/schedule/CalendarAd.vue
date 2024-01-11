<template>
  <sys-dialog
      :title="dialog.title"
      :width="dialog.width"
      :height="dialog.height"
      :visible="dialog.visible"
      @onClose="onClose"
      @onConfirm="onConfirm"
  >
    <template #content>
      <a-form style="margin-right: 30px;">
        <a-row>
          <a-col :span="12">
            <a-form-item
                v-bind="validateInfos.dateTime"
                :labelCol="{ style: 'width:80px;' }"
                label="日期"
            >
              <a-date-picker
                  style="width: 100%;"
                  @change="openChange"
                  format="YYYY-MM-DD"
                  v-model:value="dataTime"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
                v-bind="validateInfos.roomId"
                :labelCol="{ style: 'width:80px;' }"
                label="门店"
            >
              <a-select
                  v-model:value="addModel.roomId"
                  show-search
                  placeholder="请选择门店"
                  style="width: 100%;"
                  :options="roomOptions"
                  :filter-option="filterRoomOption"
              ></a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
                v-bind="validateInfos.teacherId"
                :labelCol="{ style: 'width:80px;' }"
                label="员工"
            >
              <a-select
                  v-model:value="addModel.teacherId"
                  show-search
                  placeholder="请选择员工"
                  style="width: 100%;"
                  :options="teacherOptions"
                  :filter-option="filterTeacherOption"
              >
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
                v-bind="validateInfos.beginTime"
                :labelCol="{ style: 'width:80px;' }"
                label="上班时间"
            >
              <a-time-picker
                  style="width: 100%;"
                  :minuteStep="15"
                  @change="beginTimeChange"
                  v-model:value="beginTime1"
                  format="HH:mm"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="{ style: 'width:80px;' }" label="班次时长">
              <a-input-number style="width: 100%;"  v-model:value="inputNumber"></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item :labelCol="{ style: 'width:80px;' }" label="下班时间">
              <a-time-picker
                  style="width: 100%;"
                  v-model:value="endTime1"
                  format="HH:mm"
              />
            </a-form-item>
          </a-col>

        </a-row>

      </a-form>
    </template>
  </sys-dialog>
</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue'
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import { EditModel } from '@/api/schedule/ScheduleType';
import { EditType, Title } from '@/type/BaseEnum';
import useSelect from '@/composable/schedule/useSelect';
import dayjs, { Dayjs } from 'dayjs'
import useInstance from '@/hooks/useInstance';
import useForm from 'ant-design-vue/es/form/useForm';
import { addCalendarApi, updateCalendarApi } from '@/api/schedule/schedule'
const { global } = useInstance()
//下拉属性
const { roomOptions, teacherOptions, courseOptions, filterCourseOption, filterRoomOption, filterTeacherOption } = useSelect()

//弹框属性
const { dialog, onClose, onShow } = useDialog()

//表单绑定属性
const addModel = reactive({
  id: '',
  dateTime: '',
  roomId: '',
  teacherId: '',
  isDeleted:'',
  beginTime: '',
  endTime: '',
  duration: 0

})

//日期数据
const dataTime = ref<Dayjs>()
//日期选择事件
const openChange = (date: string, dateString: string) => {
  addModel.dateTime = dateString
}

//上课时间
const beginTime1 = ref<Dayjs>()
//上课时间点击事件
const beginTimeChange = () => {
  getEndTime()
}
//课程时长
const inputNumber = ref<number>(120)
//
//下课时间
const endTime1 = ref<Dayjs>()

//设置时间
const getEndTime = () => {
  //上课的时间，加上45分钟= 下课时间
  inputNumber.value = Number(inputNumber.value)
  addModel.duration = Number(inputNumber.value)
  endTime1.value = dayjs(beginTime1.value, "HH:mm").add(inputNumber.value, 'minute')
  addModel.beginTime = dayjs(beginTime1.value, "HH:mm").format("HH:mm")
  addModel.endTime = dayjs(endTime1.value, "HH:mm").format("HH:mm")

}
//表单验证

//表单验证规则
const rules = reactive({
  dateTime: [{
    required: true,
    message: '请选择日期',
    trigger: 'change'
  }],
  roomId: [{
    required: true,
    message: '请选择门店',
    trigger: 'change'
  }],
  teacherId: [{
    required: true,
    message: '请选择员工',
    trigger: 'change'
  }],
  beginTime: [{
    required: true,
    message: '请选择上班时间',
    trigger: 'change'
  }]
})
const { resetFields, validate, validateInfos } = useForm(addModel, rules);
//设置编辑或新增
const editType = ref('');
//定义方法给外部组件使用
const editCalender = (type: string, data?: EditModel) => {
  //清空表单
  resetFields()
  dataTime.value = undefined;
  beginTime1.value = undefined;
  endTime1.value = undefined;
  dialog.width = 700;
  if (type == EditType.ADD) {
    dialog.title = Title.ADD
  } else {
    dialog.title = Title.EDIT
    //编辑数据回显
    global.$objCoppy(data, addModel)
    dataTime.value = dayjs(data?.dateTime, 'YYYY-MM-DD')
    beginTime1.value = dayjs(data?.beginTime, 'HH:mm')
    endTime1.value = dayjs(data?.endTime, 'HH:mm')
  }
  editType.value = type;
  onShow()
}
//暴露给外部使用
defineExpose({
  editCalender
})

//注册事件
const emit = defineEmits(['upSuccess'])

//弹框确定
const onConfirm = () => {
  console.log(dataTime.value)
  validate().then(async () => {
    let res = null;
    if (editType.value == EditType.ADD) {
      res = await addCalendarApi(addModel)
    } else {
      res = await updateCalendarApi(addModel)
    }
    if (res && res.code == 200) {
      //刷新表格数据
      emit('upSuccess')
      onClose()
    }

  })
}
</script>
<style scoped lang='scss'>
</style>
