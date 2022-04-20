import {reqCartList, reqDeleteCartById, reqUpdateCheckedById} from "@/api";

const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }

}
const actions = {
//    获取购物车列表数据
    async getCartList({commit}) {
        let result = await reqCartList()
        if (result.code === 200) {
            commit('GETCARTLIST', result.data)
            if (result.code === 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('failed'))
            }
        }
    },
    //删除购物车某一产品
    async deleteCartListBySkuId({commit}, skuId) {
        let result = await reqDeleteCartById(skuId)
    },
//    修改购物车某一个产品的选中状态
    async updateCheckedById({commit}, {skuId, isChecked}) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    deleteAllCheckedCart({dispatch, getters}) {
        //    context ：小仓库，commit【提交mutations修改state】  getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
            //    将每一次返回的Promise添加到数组当中
            PromiseAll.push(promise)
        })
        //只要元素全部成功，返回即为成功；有一个失败，返回结果都是失败
        return Promise.all(PromiseAll)
    },
//    修改全部产品的状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        let promiseAll =[]
        state.cartList[0].cartInfoList.forEach(item =>{
           let promise = dispatch('updateCheckedById',{skuId:item.skuId, isChecked})
            promiseAll.push(promise)
        })
    //    最终返回的结果
        return Promise.all(promiseAll)
    },
}
const getters = {
    cartList(state) {
        return state.cartList[0] || []
    },

}

export default {
    state,
    getters,
    mutations,
    actions
}