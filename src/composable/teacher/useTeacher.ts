import { TeacherModel } from "@/api/teacher/TeacherType";
import { EditType } from "@/type/BaseEnum";
import { ref } from "vue"
import { addTeacherApi, editApi, deleteApi } from "@/api/teacher/teacher";
import { message } from "ant-design-vue";
import { FuncList } from "@/type/BaseType";
import useInstance from "@/hooks/useInstance";
export default function useTeacher(getList: FuncList) {
    //获取全局属性
    const { global } = useInstance()
    //新增弹框ref属性
    const addRef = ref<{ show: (type: string, row?: TeacherModel) => void }>();
    //新增
    const addBtn = () => {
        addRef.value?.show(EditType.ADD)
    }
    //新增
    const showBtn = () => {
        addRef.value?.show(EditType.ADD)
    }
    //编辑
    const editBtn = (row: TeacherModel) => {
        addRef.value?.show(EditType.EDIT, row)
    }
    //删除
    const deleteBtn = async (row: TeacherModel) => {
        //信息确认
        const confirm = await global.$myconfirm()
        if (confirm) {
            let res = await deleteApi(row.teacherId)
            if (res && res.code == 200) {
                //信息提示
                message.success(res.msg)
                //刷新表格
                getList()
            }
        }
    }

    //保存
    const save = async (data: TeacherModel) => {
        console.log('父组件接收数据')
        console.log(data)
        let res = null;
        //判断新增还是编辑
        if (data.type === EditType.ADD) {
            res = await addTeacherApi(data)
        } else {
            res = await editApi(data);
        }
        if (res && res.code == 200) {
            //信息提示
            message.success(res.msg)
            //刷新表格
            getList()
        }
    }
    return {
        addBtn,
        editBtn,
        deleteBtn,
        save,
        addRef,
        showBtn,
    }
}
