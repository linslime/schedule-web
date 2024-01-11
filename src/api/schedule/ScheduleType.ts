export type ScheduleParm = {
    courseId: string,
    roomId: string,
    teacherId: string,
    startDate: string, //开课时间
    endDate: string,   //结课时间
    weeks: number[],
    beginTime: string, //上课时间
    endTime: string,//下课时间
    duration: number | string
}
export type autoScheduleParm = {
    roomId: string,
    startDate: string, //开课时间
    endDate: string,   //结课时间
}
//列表参数
export type ListParm = {
    roomId: string,
    courseId: string,
    teacherId: string,
    startDate: string,
    endDate: string,
    beginTime: string,
    endTime: string,
    duration?: number | string
}
//编辑数据类型
export type EditModel = {
    beginTime: string,
    courseColor: string,
    courseId: string,
    courseName: string,
    dateTime: string,
    duration: number | string,
    endTime: string,
    id: string | number,
    roomAddress: string,
    roomId: string,
    roomName: string,
    teacherId: string,
    teacherName: string
}

//更新参数类型
export type UpdateParm = {
    id: string |number,
    dateTime: string,
    roomId?: string | number,
    isDeleted:string,
    teacherId?: string | number,
    beginTime: string,
    endTime: string,
    duration?: string | number
}

//移动日历参数类型
export type RemoveParm = {
    id: string |number,
    dateTime: string,
    beginTime: string,
    endTime: string
}
