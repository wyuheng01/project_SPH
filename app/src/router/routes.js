import Detail from "@/pages/Detail";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
//引入二级路由
// import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default [
    {
        path: '/center',
        name: 'Center',
        component: ()=> import('@/pages/Center'), //路由懒加载
        meta: {show: true},
        children: [
            {
                path: 'myorder',
                name: 'MyOrder',
                component: ()=>import('@/pages/Center/myOrder')
            },
            {
                path: 'grouporder',
                name: 'GroupOrder',
                component: GroupOrder
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        name: 'PaySuccess',
        component: PaySuccess,
        meta: {show: true}
    },
    {
        path: '/pay',
        name: 'Pay',
        component: Pay,
        meta: {show: true},
        beforeEnter: (to, from, next) => {
            if (from.path === '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/trade',
        name: 'Trade',
        component: Trade,
        meta: {show: true},
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去交易页面，必须是从购物车来
            if (from.path === '/shopcart') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/shopcart',
        name: 'ShopCart',
        component: ShopCart,
        meta: {show: true}
    },
    {
        path: '/addcartsuccess',
        name: 'AddCartSuccess',
        component: AddCartSuccess,
        meta: {show: true}
    },
    {
        path: '/detail/:skuId?',
        name: 'Detail',
        component: Detail,
        meta: {show: true}
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {show: true}
    },
    {
        path: '/search/:keyword?',
        component: Search,
        meta: {show: true},
        name: 'search',
    },
    {
        path: '/login',
        component: Login,
        meta: {show: false}
    },
    {
        path: '/register',
        component: Register,
        meta: {show: false}
    },
    //    重定向，在项目跑起来的时候，访问、，立马让他重定向到首页
    {
        path: '*',
        redirect: '/home'
    }
]