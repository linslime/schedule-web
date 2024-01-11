<template>
    <sys-dialog
        :title="dialog.title"
        :height="dialog.height"
        :width="dialog.width"
        :visible="dialog.visible"
        @onClose="onClose"
        @onConfirm="onConfirm"
    >
        <template #content>
            <a-form>
                <!-- <a-row> 代表的是一行，横向排列，一行分为24等分 -->
                <a-row>
                    <a-col :span="8">
                        <a-form-item
                            v-bind="validateInfos.roomId"
                            :labelCol="{ style: 'width:80px;' }"
                            label="门店"
                        >
                            <a-select
                                v-model:value="addParm.roomId"
                                show-search
                                placeholder="请选择门店"
                                style="width: 200px"
                                :options="roomOptions"
                                :filter-option="filterRoomOption"
                            ></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item
                            v-bind="validateInfos.teacherId"
                            :labelCol="{ style: 'width:80px;' }"
                            label="员工"
                        >
                            <a-select
                                v-model:value="addParm.teacherId"
                                show-search
                                placeholder="请选择员工"
                                style="width: 200px"
                                :options="teacherOptions"
                                :filter-option="filterTeacherOption"
                            ></a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-form-item
                    v-bind="validateInfos.startDate"
                    :labelCol="{ style: 'width:80px;' }"
                    label="上班日期"
                >
                    <a-range-picker
                        v-model:value="selectTime"
                        format="YYYY-MM-DD"
                        :placeholder="['开始时间', '结束时间']"
                        @change="openChange"
                    />
                </a-form-item>
                <a-form-item
                    v-bind="validateInfos.weeks"
                    :labelCol="{ style: 'width:80px;' }"
                    label="周几上班"
                >
                    <a-checkbox-group :options="weekOptions" v-model:value="addParm.weeks"></a-checkbox-group>
                </a-form-item>
                <a-row>
                    <a-col :span="8">
                        <a-form-item v-bind="validateInfos.beginTime" label="上班时间">
                            <a-time-picker
                                :minuteStep="15"
                                @change="beginTimeChange"
                                v-model:value="beginTime1"
                                format="HH:mm"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="班次时长">
                            <a-input-number v-model:value="inputNumber"></a-input-number>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="下班时间">
                            <a-time-picker v-model:value="endTime1" format="HH:mm" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </template>
    </sys-dialog>
</template>
<script setup lang='ts'>
import { ref, reactive, onMounted, nextTick } from 'vue'
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import useSelect from '@/composable/schedule/useSelect';
import { saveScheduleApi } from '@/api/schedule/schedule'
import dayjs, { Dayjs } from 'dayjs'
import useForm from 'ant-design-vue/es/form/useForm';
//下拉属性
const { roomOptions, teacherOptions, courseOptions, filterCourseOption, filterRoomOption, filterTeacherOption } = useSelect()

//获取弹框属性
const { dialog, onShow, onClose } = useDialog()


//定义弹框显示的方法
const show = () => {
    resetFields()
    selectTime.value = undefined;
    addParm.beginTime = dayjs(beginTime1.value, "HH:mm").format("HH:mm")
    addParm.endTime = dayjs(endTime1.value, "HH:mm").format("HH:mm")
    addParm.duration = inputNumber.value
    //设置弹框属性
    dialog.title = '排班'
    dialog.height = 300;
    dialog.width = 900
    //显示弹框
    onShow()
}
//暴露出去，给外部组件使用
defineExpose({
    show
})

//表单绑定的对象
const addParm = reactive({
    courseId: '',
    teacherId: '',
    roomId: '',
    startDate: '', //开课时间
    endDate: '',//结课时间
    weeks: [1, 2, 3, 4, 5],//周几上课
    beginTime: '', //上课时间
    endTime: '',//下课时间
    duration: 0
})


//表单验证规则
const rules = reactive({
    weeks: [{
        required: true,
        message: '请选择周几上班',
        trigger: 'change'
    }],
    startDate: [{
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
const { resetFields, validate, validateInfos } = useForm(addParm, rules);
//上课日期选择
const selectTime = ref<Dayjs>()
//日期选择事件回调
const openChange = (data: string, dateString: string) => {
    console.log(data)
    console.log(dateString)
    addParm.startDate = dateString[0];
    addParm.endDate = dateString[1];
}

const weekOptions = [
    { value: 1, label: '周一' },
    { value: 2, label: '周二' },
    { value: 3, label: '周三' },
    { value: 4, label: '周四' },
    { value: 5, label: '周五' },
    { value: 6, label: '周六' },
    { value: 7, label: '周七' }
];

//上课时间
const beginTime1 = ref<Dayjs>(dayjs('08:00', 'HH:mm'))
//上课时间点击事件
const beginTimeChange = () => {
    getEndTime()
}
//课程时长
const inputNumber = ref<number>(60)

//下课时间
const endTime1 = ref<Dayjs>()

//设置时间
const getEndTime = () => {
    //上课的时间，加上45分钟= 下课时间
    endTime1.value = dayjs(beginTime1.value, "HH:mm").add(inputNumber.value, 'minute')
    addParm.beginTime = dayjs(beginTime1.value, "HH:mm").format("HH:mm")
    addParm.endTime = dayjs(endTime1.value, "HH:mm").format("HH:mm")
    addParm.duration = inputNumber.value
    console.log('初始时间')
    console.log(addParm)
}
//注册事件
const emit = defineEmits(['refreshList'])
//弹框确定
const onConfirm = () => {
    console.log(beginTime1.value)
    console.log(addParm)
    validate().then(async () => {
        console.log(addParm)
        const res = await saveScheduleApi(addParm)
        if (res && res.code == 200) {
            emit('refreshList')
            onClose()
        }
    })
}
onMounted(() => {
    getEndTime()
})
</script>
<style scoped lang='scss'>
</style>
