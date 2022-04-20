//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";
//引入store
import store from '@/store'
//使用插件
Vue.use(VueRouter)

//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push

let originReplace = VueRouter.prototype.replace


//重写push|replace
//第一个参数：告诉原来push方法，往哪里跳（传递哪些参数）
//第二个参数：成功回调
//第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    // console.log(this)
    if (resolve && reject) {
        //call || apply
        //相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {
        }, () => {
        })
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    // console.log(this)
    if (resolve && reject) {
        //call || apply
        //相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {
        }, () => {
        })
    }
}
//配置路由
let router =  new VueRouter({
//    配置路由
    routes,
    scrollBehavior(){
        //返回的这个y=0，代表的滚动条在最上方
        return{ y:0 }
    }
})

//全局守卫，前置守卫(在路由跳转之前进行判断)
router.beforeEach(async (to, from,next) =>{
//    to:可以获取到你要跳哪
//    from：可以获取到你从哪个路由而来的信息
//    next：放行函数 next()放行 next(path)放行到指定函数   next（false）返回到from 的位置
//     next()
    console.log(store)
//    用户登录了，才会有token,未登录一定不会有
    let token = store.state.user.token
    //用户信息
    let name = store.state.user.userInfo.name
    if (token){
        //如果通湖已经登陆了，还想去login【不能去，停留在首页】
        if (to.path === '/login' || to.path==='/register'){
            next('/home')
        }else{
        //    登陆了，去的不是login
            if (name){
                next()
            }else {
                try {
                    await store.dispatch('getUserInfo')
                    next()
                }catch (error) {
                //    token失效了
                //    清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    }else {
        //    未登录
        let toPath = to.path
        if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') !== -1){
            //query参数  未登录的时候想去而没有去承德信息存储于地址栏中
            next('/login?redirect='+toPath)
        }else {
            //去的不是那几个
            next()
        }
    }
})
export default router