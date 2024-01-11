import { nextTick, onMounted, reactive, ref } from "vue"
import { getListApi } from "@/api/course/course"
import {ListParm} from "@/api/course/BaseCourse";
export default function useTable() {
    //表格高度
    const tableHeight = ref(0)
    //表格数据
    const tableList = reactive({
        list: []
    })
    //表格的列
    const columns = [
        {
            title: '偏好类型',
            key: 'courseName',
            dataIndex: 'courseName',
        },
        {
            title: '员工',
            key: 'courseType',
            dataIndex: 'courseType'
        },
        {
            title: '门店',
            key: 'roomName',
            dataIndex: 'roomName',
        },
        {
            title: '偏好值',
            key: 'courseYear',
            dataIndex: 'courseYear',
        },

        {
            title: "操作",
            key: "action",
            align: "center",
            width: 220
        }]

    //分页对象
    const rolePage = reactive({
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '50'],
        // pageSizeOptions: ['1', '2', '3', '5'],
        showTotal: (total: number) => `共有${total}条数据`,
        //页容量改变时触发
        // onShowSizeChange: (current: number, pageSize: number) => {
        //    console.log('页容量改变时触发')
        // },
        //页数改变时触发
        onChange: (current: number, size: number) => {
            console.log('页数改变时触发')
            listParm.currentPage = current;
            listParm.pageSize = size;
            rolePage.current = current;
            rolePage.pageSize = size;
            getList()
        }
    })
    //列表查询的参数
    const listParm = reactive<ListParm>({
        courseName: '',
        courseType: '',
        roomName: '',
        currentPage: rolePage.current,
        pageSize: rolePage.pageSize
    })

    //表格数据查询
    const getList = async () => {
        console.log(listParm)
        let res = await getListApi(listParm)
        if (res && res.code == 200) {
            // console.log(res)
            //把后端返回的数据，设置到表格数据里面
            tableList.list = res.data.records
            //设置分页的总条数
            rolePage.total = res.data.total
        }
    }
    onMounted(() => {
        //表格数据查询
        getList()
        //计算表格高度
        nextTick(() => {
            tableHeight.value = window.innerHeight - 300
        })
    })
    return {
        tableHeight,
        tableList,
        rolePage,
        listParm,
        columns,
        getList
    }
}
