<template>
  <div id="app">
<!--    <h1 v-upper="msg"></h1>-->
    <Header/>
<!--    路由组件出口的地方-->
    <router-view></router-view>
<!--    在Home、Search显示，登录注册隐藏-->
<!--    <Footer v-show="$route.path === '/home' || $route.path === '/search'"/>-->
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from  "@/components/Footer";
export default {
  name: 'App',
  data(){
    return{
      msg:'abc'
    }
  },
  components: {
    Header,
    Footer
  },
  mounted() {
    //  通知vuex发请求，获取数据，存储于仓库之中
    // 获取商品分类的三级列表的数据
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>i