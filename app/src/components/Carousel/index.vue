<template>
  <div class="swiper-container" ref="cur" id="floor1Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel,index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl"/>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "Carousel",
  props:['list'],
  watch: {
    list: {
      immediate: true,
      //立即监听：不管数据有没有变化，先监听一次
      //为什么watch监听不了list，因为这个数据从来没有发生变化（数据是父亲给的，父亲给得时候就是一个对象，对象里面该有的数据都是有的）
      handler() {
        //只能监听到数据已经存在，但是v-for动态渲染结构我们还是没有办法确定的，因此还是需要用nextTick
        console.log("我在监听floor组件中list数据")
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      }
    }
  }
}
</script>

<style scoped>

</style>