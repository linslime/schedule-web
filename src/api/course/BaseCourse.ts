//列表参数
export interface ListParm{
    currentPage:number;
    pageSize:number;
    courseName:string;
    roomName:string;
    courseType:string;

}
//新增、编辑
export interface CourseModel{
    courseId:string;
    courseName:string;
    courseYear:string;
    courseType:string;
    type:string;
}
