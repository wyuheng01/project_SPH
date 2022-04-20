//home 的小仓库
import {reqCategoryList, reqGetBannerList, reqGetFloorList} from "@/api";
//state:仓库存储数据的地方
const state = {
//    state中数据默认初始值不能乱写
//    home仓库中存储三级菜单的数据
    categoryList: [],
    //轮播图的数据
    bannerList: [],
//    floor组件数据
    floorList:[],
}
//mutations:修改state的唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
        console.log('修改仓库中bannerList中的数据')
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
//actions：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({commit}) {
        let result = await reqCategoryList()
        // console.log(result)
        if (result.code === 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    async getBannerList({commit}) {
        //获取首页轮播图的数据
        console.log('在向服务器发起ajax请求，获取轮播图的数据')
        let result = await reqGetBannerList()
        // console.log(result)
        if (result.code === 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    async getFloorList({commit}) {
        console.log('在向服务器发起ajax请求，获取轮播图的数据')
        let result = await reqGetFloorList()
        if (result.code === 200){
            commit('GETFLOORLIST', result.data)
        }
    }

}
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}

//对外暴露Store类的一个实例
export default ({
    state,
    mutations,
    actions,
    getters,
})