//search 的小仓库
import {reqGetSearchInfo} from "@/api";
//state:仓库存储数据的地方
const state = {
//    仓库初识状态
    searchList:{}
}
//mutations:修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state,searchList) {
        state.searchList = searchList
    },
}
//actions：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async getSearchList({commit}, params) {
        //当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if (result.code === 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
//可以把将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候方便使用】
const getters = {
    goodsList(state){
        //  || []
        //加入网络不给力或者没有网 state.searchList.goodsList 应该返回的是undefined
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
    attrsList(){
        return state.searchList.attrsList || []
    }
}

//对外暴露Store类的一个实例
export default ({
    state,
    mutations,
    actions,
    getters,
})