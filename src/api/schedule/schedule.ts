import http from "@/http";
import { ListParm, ScheduleParm, UpdateParm, autoScheduleParm } from "./ScheduleType";
//获取教室列表
export const getRoomListApi = () => {
    return http.get({
        url: '/api/schedule/getRoomList'
    })
}
//获取教师列表
export const getTeacherApi = () => {
    return http.get({
        url: "/api/schedule/getTeacher"
    })
}
//获取课程列表
export const getCourseListApi = () => {
    return http.get({
        url: "/api/schedule/getCourseList"
    })
}
//排课
export const saveScheduleApi = (parm: ScheduleParm) => {
    return http.post({
        url: '/api/schedule/saveSchedule',
        data: parm
    })
}
//自动排课
export const autoScheduleApi = (parm: autoScheduleParm) => {
    return http.post({
        url: '/api/schedule/autoSchedule',
        data: parm
    })
}
//排课列表
export const getScheduleListApi = (parm: ListParm) => {
    return http.get({
        url: "/api/schedule/getScheduleList",
        params: parm
    })
}
//新增排课
export const addCalendarApi = (parm: UpdateParm) => {
    return http.post({
        url: '/api/schedule/addSchedule',
        data: parm
    })
}
//编辑
export const updateCalendarApi = (parm: UpdateParm) => {
    return http.put({
        url: "/api/schedule/updateScheduleById",
        data: parm
    })
}
