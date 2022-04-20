// 登录与注册模块
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from "@/api";
import {getToken, removeToken, setToken} from "@/utils/token";

const state = {
    code:'',
    token:getToken(),
    userInfo:{}
}
const actions = {
//    获取验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        if (result.code === 200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
//    用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
//登录业务【token】
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        if (result.code === 200){
            commit('USERLOGIN',result.data.token)
            //持久化存储token
            setToken(result.data.token)
            return'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        console.log(result)
        if (result.code === 200) {
            //提交用户信息
            commit("GETUSERINFO", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
//    退出登录
    async userLogout({commit}){
        //只是想服务器发起以此请求，通知服务器清除token
        let result = await reqLogout()
        //action里面不能操作state，提交mutation修改state
        if (result.code == 200){
            commit('CLEAR')
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }
    },
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token  = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    CLEAR(state){
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}