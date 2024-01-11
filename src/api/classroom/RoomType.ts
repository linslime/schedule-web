export type RoomModel = {
    type:string,
    roomId:string,
    roomName:string,
    roomAddress:string,
    roomSize:string
}

export type ListParm = {
    pageSize:number;
    currentPage:number;
    roomName:string;
}
