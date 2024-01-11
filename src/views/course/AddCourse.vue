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
            <a-form labelAlign="right">
                <a-form-item
                    v-bind="validateInfos.courseName"
                    :labelCol="{ style: 'width:80px;' }"
                    label="偏好类型"
                >
                    <a-input v-model:value="addModel.courseName" placeholder="请填写偏好类型"></a-input>
                </a-form-item>

            </a-form>
          <a-form labelAlign="right">
            <a-form-item
                v-bind="validateInfos.courseType"
                :labelCol="{ style: 'width:80px;' }"
                label="员工"
            >
              <a-input v-model:value="addModel.courseType" placeholder="请填写员工"></a-input>
            </a-form-item>

          </a-form>
          <a-form labelAlign="right">
            <a-form-item
                v-bind="validateInfos.courseYear"
                :labelCol="{ style: 'width:80px;' }"
                label="偏好值"
            >
              <a-input v-model:value="addModel.courseYear" placeholder="请填写偏好值"></a-input>
            </a-form-item>

          </a-form>
        </template>
    </sys-dialog>
</template>
<script setup lang='ts'>
import { reactive, ref } from 'vue'
import SysDialog from '@/components/SysDialog.vue';
import dayjs, { Dayjs } from 'dayjs';
import { useForm } from 'ant-design-vue/lib/form';
import { CourseModel } from '@/api/course/BaseCourse';
import { EditType, Title } from '@/type/BaseEnum';
import useDialog from '@/hooks/useDialog';
import useInstance from '@/hooks/useInstance';
//获取全局属性
const { global } = useInstance()
//弹框属性
const { dialog, onClose, onShow } = useDialog()
//年份数据
const inputYear = ref<Dayjs>()

//表单验证规则
const rules = reactive({
    courseName: [{
        required: true,
        message: '请输入偏好类型',
        trigger: 'change'
    }],
    courseYear: [{
        required: true,
        message: '请输入偏好值',
        trigger: 'change'
    }],
    courseType: [{
        required: true,
        message: '请输入员工',
        trigger: 'change'
    }],

})
//表单绑定的数据
const addModel = reactive<CourseModel>({
    courseId: '',
    courseName: '',
    courseType: '',
    courseYear: '',
    type: ''
})

//获取表单验证相关的属性
const { resetFields, validate, validateInfos } = useForm(addModel, rules)
//日历事件
const openChange = () => {
    addModel.courseYear = dayjs(inputYear.value).format('YYYY')
}
//注册事件
const emits = defineEmits(['save'])
//弹框确定事件
const onConfirm = () => {
    validate().then(async () => {
        emits('save',addModel)
        onClose();
        // let res = await addCourseApi(addModel)
        // if (res && res.code == 200) {
        //     message.success(res.msg)
        //     dialog.visible = false;
        // }
    })

}

//显示弹框
const show = (type: string, row: CourseModel) => {
    //清空表单
    resetFields()
    //判断是新增还是编辑
    if (type === EditType.ADD) {
        inputYear.value = undefined;
        dialog.title = Title.ADD
    } else {
        dialog.title = Title.EDIT
        //编辑回显，把当前编辑的数据，设置到表单绑定的数据对象addModel里面
        global.$objCoppy(row, addModel)
        //设置回显时间
        inputYear.value = dayjs(row.courseYear)
    }
    //设置编辑的类型
    addModel.type = type;
    //弹框显示
    onShow();
}

//暴露方法给外部使用
defineExpose({
    show
})
</script>
<style scoped lang='scss'>
</style>
