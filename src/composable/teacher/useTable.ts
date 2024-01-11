import { getListApi } from "@/api/teacher/teacher"
import { ListParm } from "@/api/teacher/TeacherType"
import { nextTick, onMounted, reactive, ref } from "vue"
export default function useTable() {
    //定义表格高度
    const tableHeight = ref(0)
    //定义获取数据的参数
    const listParm = reactive<ListParm>({
        currentPage: 1,
        pageSize: 10,
        teacherName: '',
        roomId:''
    })
    //定义表格数据
    const tableList = reactive({
        list: []
    })
    //定义表格的列
    const columns = [
        {
            title: '员工姓名',
            key: 'teacherName',
            dataIndex: 'teacherName',
        },
        {
            title: '员工编号',
            key: 'teacherNum',
            dataIndex: 'teacherNum',
        },
        {
            title: '岗位',
            key: 'teacherDesc',
            dataIndex: 'teacherDesc'
        },
        {
            title: '技能',
            key: 'teacherSkill',
            dataIndex: 'teacherSkill'
        },
        {
            title: '邮箱',
            key: 'teacherEmail',
            dataIndex: 'teacherEmail'
        },
        {
            title: '所属门店',
            key: 'teacherStores',
            dataIndex: 'teacherStores'
        },
        {
            title: "操作",
            key: "action",
            align: "center",
            width: 220
        }
    ];
    const rolePage = reactive({
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '50'],
        showTotal: (total: number) => `共有${total}条数据`,
        //页数、页容量改变时触发
        onChange: (current: number, size: number) => {
            console.log('页数改变时触发')
            listParm.currentPage = current;
            listParm.pageSize = size;
            rolePage.current = current;
            rolePage.pageSize = size;
            getList()
        },
    })

    //获取表格数据
    const getList = async () => {
        let res = await getListApi(listParm)
        if (res && res.code == 200) {
            console.log(res)
            //设置表格数据
            tableList.list = res.data.records;
            //设置分页的总条数
            rolePage.total = res.data.total;
        }
    }
        //搜索
    const searchBtn = () => {
        getList()
    }
    //重置
    const resetBtn = () => {
        listParm.currentPage = 1;
        listParm.teacherName = ''
        getList()
    }
    onMounted(() => {
        getList()
        nextTick(() => {
            tableHeight.value = window.innerHeight - 300
        })
    })
    return {
        listParm,
        tableList,
        columns,
        rolePage,
        getList,
        tableHeight,
        searchBtn,
        resetBtn
    }
}
