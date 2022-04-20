import {v4 as uuidv4} from 'uuid'

export const getUUID = () =>{
//    单例
//    先从本地存储获取UUid（看一下存储里面是否有）
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if (!uuid_token){
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}