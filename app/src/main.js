import Vue from 'vue'
import App from './App.vue'

//三级联动组件---全局组件
//第一个参数：全局组件的名字，第二个参数：哪一个组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav)

//轮播图（全局组件）
import Carousel from "@/components/Carousel"
Vue.component(Carousel.name,Carousel)
//分页器
import pagination from "@/components/Pagination"
Vue.component(pagination.name,pagination)

import {reqGetSearchInfo} from '@/api/index'
console.log(reqGetSearchInfo({}))

//引入element UI
import { Button,MessageBox } from 'element-ui';
Vue.component(Button.name,Button)
//挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入swiper样式
import "swiper/css/swiper.css"
//引入路由
import router from  '@/router'
//引入仓库
import store from '@/store'

//引入MockServer.js ---- mock数据
import '@/mock/mockServe'
//  统一接口api文件夹里面全部请求函数
//  统一引入
import * as API from '@/api'
import atm from  '@/assets/1.gif'

//引入表单验证插件
import '@/plugins/validate'

//引入lazy插件
import VueLazyload from 'vue-lazyload'

import myPlugins from "@/plugins/myPlugins";
//全局指令
Vue.use(myPlugins,{
    name:'upper'
})


Vue.use(VueLazyload,{
  //懒加载默认图片
  loading:atm
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  //注册路由：底下的写法KV一致省略V【router小写的】
  //注册路由信息：当这李书写router的时候，组件身上都拥有$route,$router
  router,
  //注册仓库：组件实例的身上会多一个属性$store
  store
}).$mount('#app')
