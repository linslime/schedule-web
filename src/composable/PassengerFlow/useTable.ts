import { ListParm } from "@/api/PassengerFlow/FlowType";
import { nextTick, onMounted, reactive, ref } from "vue"
import { getListApi } from "@/api/PassengerFlow/PassengerFlow";
export default function useTable() {
    //定义表格高度
    const tableHeight = ref(0)

    //定义表格的数据
    const tableList = reactive({
        list: []
    })

    //表格列
    const columns = [
        {
            title: '门店名称',
            key: 'roomName',
            dataIndex: 'roomName',
        },
        {
            title: '日期',
            key: 'roomAddress',
            dataIndex: 'dateTime',
        },
        {
            title: '开始时间',
            key: 'roomSize',
            dataIndex: 'beginTime',
        },
        {
            title: '结束时间',
            key: 'roomET',
            dataIndex: 'endTime',
        },
        {
            title: '预测顾客流量',
            key: 'roomFL',
            dataIndex: 'passagerFlow',
        },
        {
            title: '预计店员数量',
            key: 'roomFN',
            dataIndex: 'passagerNumber',
        },
        {
            title: "操作",
            key: "action",
            align: "center",
            width: 220
        }
    ];

    //表格分页
    const rolePage = reactive({
        total: 0,
        current: 1,
        showSizeChanger: true,
        pageSize: 10,
        name: '',  //搜索关键字
        pageSizeOptions: [
            '10', '20', '30', '40', '50'
        ],
        showTotal: (total: number) => `共有 ${total} 条数据`,
        // 页数改变时触发
        onChange: (current: number, size: number) => {
            console.log('999999999')
            rolePage.current = current;
            rolePage.pageSize = size;
            listParm.currentPage = current;
            listParm.pageSize = size;
            getList();
        }
    })

    //列表查询的参数
    const listParm = reactive<ListParm>({
        dateTime:'',
        roomName: '',
        currentPage: 1,
        pageSize: 10
    })

    //列表查询
    const getList = async () => {
        let res = await getListApi(listParm)
        if (res && res.code == 200) {
            //设置表格数据
            tableList.list = res.data.records;
            //设置分页总条数
            rolePage.total = res.data.total;
        }
    }

    //搜索
    const searchBtn = () => {
        getList()
    }
    //重置按钮
    const resetBtn = () => {
        listParm.currentPage = 1;
        listParm.roomName = '';
        getList()
    }
    onMounted(() => {
        getList();
        nextTick(() => {
            //计算表格高度
            tableHeight.value = window.innerHeight - 300
        })
    })
    return {
        tableHeight,
        columns,
        rolePage,
        listParm,
        tableList,
        searchBtn,
        resetBtn,
        getList
    }
}
