import http from "@/http";
import { ListParm, RoomModel } from "./FlowType";
//新增
export const addApi = (parm: RoomModel) => {
    return http.post({
        url: '/api/passagerFlow',
        data: parm
    })
}
//列表查询
export const getListApi = (parm: ListParm) => {
    return http.get({
        url: '/api/passagerFlow/list',
        params: parm
    })
}

//编辑
export const editApi = (parm: RoomModel) => {
    return http.put({
        url: '/api/passagerFlow',
        data: parm
    })
}

//删除
export const deleteApi = (roomId:string)=>{
    return http.delete({
        url:`/api/passagerFlow/${roomId}`
    })
}
