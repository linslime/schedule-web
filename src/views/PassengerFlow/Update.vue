<template>
  <sys-dialog
      :title="dialog.title"
      :height="dialog.height"
      :width="dialog.width"
      :visible="dialog.visible"
      @onClose="onClose"
      @onConfirm="confirm"
  >
    <template #content>
      <a-form>
        <a-form-item v-bind="validateInfos.roomName" label="门店名称">
          <a-input v-model:value="addModel.roomName" placeholder="请输入门店名称"></a-input>
        </a-form-item>
        <a-form-item v-bind="validateInfos.dateTime" label="日期">
          <a-input v-model:value="addModel.dateTime" placeholder="请输入日期"></a-input>
        </a-form-item>
        <a-form-item v-bind="validateInfos.beginTim" label="开始时间">
          <a-input v-model:value="addModel.beginTime" placeholder="请输入开始时间"></a-input>
        </a-form-item>
        <a-form-item v-bind="validateInfos.endTime" label="结束时间">
          <a-input v-model:value="addModel.endTime" placeholder="请输入结束时间"></a-input>
        </a-form-item>
        <a-form-item v-bind="validateInfos.passagerFlow" label="预测客流量">
          <a-input v-model:value="addModel.passagerFlow" placeholder="请输入预测客流量"></a-input>
        </a-form-item>
        <a-form-item v-bind="validateInfos.passagerNumber" label="预计店员人数">
          <a-input v-model:value="addModel.passagerNumber" placeholder="请输入计店员人数"></a-input>
        </a-form-item>
      </a-form>
    </template>
  </sys-dialog>
</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue'
import useDialog from '@/hooks/useDialog';
import SysDialog from '@/components/SysDialog.vue';
import { EditType, Title } from '@/type/BaseEnum';
import { RoomModel } from '@/api/PassengerFlow/FlowType'
import useForm from 'ant-design-vue/es/form/useForm';
import useInstance from '@/hooks/useInstance';
//获取全局属性
const { global } = useInstance()

//获取弹框属性
const { dialog, onShow, onClose } = useDialog()

//表单验证规则
const rules = reactive({
  roomName: [{
    required: true,
    message: '请输入门店名称',
    trigger: 'change'
  }],
  dateTime: [{
    required: true,
    message: '日期',
    trigger: 'change'
  }],
  beginTime: [{
    required: true,
    message: '请输入开始时间',
    trigger: 'change'
  }],
  endTime: [{
    required: true,
    message: '请输入结束时间',
    trigger: 'change'
  }],
  passagerFlow: [{
    required: true,
    message: '请输入预测顾客流量',
    trigger: 'change'
  }],
  passagerNumber: [{
    required: true,
    message: '请输入预计店员数量',
    trigger: 'change'
  }],
})

//表单绑定的对象
const addModel = reactive<RoomModel>({
  type: '',
  id: '',
  roomName: '',
  dateTime :',',
  beginTime:'',
  endTime:'',
  passagerFlow:0,
  passagerNumber:0,
})

//获取表单验证属性
const { validate, resetFields, validateInfos } = useForm(addModel, rules)

//注册事件
const emit = defineEmits(['save'])

//弹框确定
const confirm = () => {
  validate().then(() => {
    emit('save', addModel)
    onClose();
  })
}

//显示弹框
const show = (type: string, row: RoomModel) => {
  //清空表单
  resetFields()
  dialog.height = 350;
  dialog.title = Title.EDIT
  //设置回显的数据
  global.$objCoppy(row,addModel)
  addModel.type = type;
  onShow()
}

defineExpose({
  show
})
</script>
<style scoped lang='scss'>
</style>
