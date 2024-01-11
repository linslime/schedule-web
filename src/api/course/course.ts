import http from "@/http/index";
import { ListParm, CourseModel } from "./BaseCourse";
//新增课程
export const addCourseApi = (parm: CourseModel) => {
    return http.post({
        url: '/api/course',
        data: parm
    })
}
//列表查询
export const getListApi = (parm: ListParm) => {
    return http.get({
        url: '/api/course/list',
        params: parm
    })
}
//编辑
export const editCourseApi = (parm: CourseModel) => {
    return http.put({
        url: '/api/course',
        data: parm
    })
}
//删除
export const deleteCourseApi = (courseId:string)=>{
    return http.delete({
        url:`/api/course/${courseId}`
    })
}