import { onMounted, reactive, ref } from "vue"
import { getListApi } from '@/api/user/user'
import { ListParm } from "@/api/user/UserType"
export default function useTable() {
    //表格高度
    const tableHeight = ref(0)
    //表格的列
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
        },
        {
            title: '登录账户',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: "center",
            width: 220
        },
    ]
    //表格数据
    const tableList = reactive({
        list: []
    })
    //表单列表参数
    const listParm = reactive<ListParm>({
        pageSize: 10,
        currentPage: 1,
        phone: '',
        name: ''
    })
    //分页对象
    const page = reactive({
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '50'],
        showTotal: (total: number) => `共有${total}条数据`,
        //页数改变时触发
        onChange: (current: number, size: number) => {
            listParm.currentPage = current;
            listParm.pageSize = size;
            page.current = current;
            page.pageSize = size;
            getList()
        }
    })
    //获取表格的数据
    const getList = async () => {
        let res = await getListApi(listParm)
        if (res && res.code == 200) {
            //设置表格的数据
            tableList.list = res.data.records;
            //设置分页总数
            page.total = res.data.total;
        }
    }
    //搜索
    const searchBtn = () => {
        getList()
    }
    //重置
    const resetBtn = () => {
        //清空表单
        listParm.currentPage = 1
        listParm.name = ''
        listParm.phone = ''
        //重新加载表格
        getList()
    }
    //刷新表格
    const refresh = ()=>{
        getList()
    }
    onMounted(() => {
        getList();
        //计算表格的高度
        tableHeight.value = window.innerHeight - 300
    })
    return {
        tableHeight,
        tableList,
        listParm,
        page,
        getList,
        columns,
        searchBtn,
        resetBtn,
        refresh
    }
}