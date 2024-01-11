export type RoomModel = {
    type:string,
    id:string,
    roomName:string,
    dateTime:string,
    beginTime:string,
    endTime:string,
    passagerFlow:number,
    passagerNumber:number,
}

export type ListParm = {
    pageSize:number;
    currentPage:number;
    roomName:string;
    dateTime:string;
}
