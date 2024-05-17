import { AxiosError, AxiosResponse } from "axios"

export interface IResponse {
    status:number | undefined,
    error?: AxiosError<AxiosResponse<any,any>,any> |
    AxiosResponse<AxiosResponse<any,any>, any> | undefined
}

//function ที่โยนค่าเข้ามา แล้วโยน function ออกไปเป็นตัวจัดการ error
export const handleResponse = {
    success: (res:AxiosResponse) => { //กรณี Success จะ return status , data ค่าเดิม
        return {
            status: res.status,
            data:res.data
        }
    },error:(res:AxiosError<AxiosResponse>)=>{ //กรณี error
        if(res.message === 'Network Error'){
            return {
                status:500,
                error:res
            }
        }else{
            return{
                status:res.response?.status,
                error:res.response?.data
            }
        }
    } 
}