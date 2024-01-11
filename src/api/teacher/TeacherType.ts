//列表查询参数
export type ListParm = {
    pageSize:number;
    currentPage:number;
    teacherName:string;
    roomId:string;
}
//表单类型
export type TeacherModel = {
    type:string,
    teacherId:string,
    teacherName:string,
    teacherNum:string,
    teacherDesc:string,
    teacherStores:string,
    teacherEmail:string,
    teacherSkill:string,
}
