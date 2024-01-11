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
          <div class="uploader">
            <input
                type="file"
                class="fonts"
                name=""
                @change="afterRead"
                ref="updata"
                id="upload"
            />
          </div>

          <label for="upload">
            <div class="laber-up">
              <div v-show="src"><img :src="src" alt="" srcset="" /></div>
              <div v-show="!src" ><van-icon name="plus" />
                <p><span class="step-color">点击</span>上传文件</p>
              </div>
            </div>
          </label>

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
    dialog.height = 180;
    dialog.title = Title.ADD
    addModel.type = type;
    onShow()
}


defineExpose({
    show
})

</script>
<style scoped lang='scss'>
/* 图片上传 */
.uploader {
  display: none;
}
.laber-up {
  width: 100%;
  height: 10.2rem;
  /* background: skyblue; */
  margin-bottom: 1rem;
}
.laber-up>div{
  width: 100%;
  height: 100%;
  border: 1px solid #00f;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ccc;
  position: relative;
}
.laber-up>div>p{
  font-size: 1.5rem;
  font-style: italic;
  position: absolute;
  top: 3.5rem;
  color: #333;
}
.laber-up>div>img{
  height: 100%;
}
.delog{
  text-align: right;
}

</style>
