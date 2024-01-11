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
                <a-form-item v-bind="validateInfos.roomAddress" label="门店地址">
                    <a-input v-model:value="addModel.roomAddress" placeholder="请输入门店地址"></a-input>
                </a-form-item>
                <a-form-item v-bind="validateInfos.roomSize" label="门店大小">
                    <a-input v-model:value="addModel.roomSize" placeholder="请输入门店大小"></a-input>
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
import { RoomModel } from '@/api/classroom/RoomType'
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
    roomAddress: [{
        required: true,
        message: '请输入门店地址',
        trigger: 'change'
    }],
    roomSize: [{
        required: true,
        message: '请输入门店地址',
        trigger: 'change'
    }]
})

//表单绑定的对象
const addModel = reactive<RoomModel>({
    type: '',
    roomId: '',
    roomAddress: '',
    roomName: '',
    roomSize:','
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
    if (type === EditType.ADD) {
        dialog.title = Title.ADD
    } else {
        dialog.title = Title.EDIT
        //设置回显的数据
        global.$objCoppy(row,addModel)
    }
    addModel.type = type;
    onShow()
}

defineExpose({
    show
})
</script>
<style scoped lang='scss'>
</style>
