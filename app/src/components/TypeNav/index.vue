<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!--      事件的委派 | 事件委托-->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!--        三级联动-->
<!--        过渡动画-->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item bo" v-for="(c1,index) in categoryList" :key="c1.categoryId"
                   :class="{cur:currentIndex === index}">
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                  <!--<router-link to="/search">{{c1.categoryName}}</router-link>-->
                </h3>
                <!--二级、三级分类-->
                <div class="item-list clearfix" :style="{display:currentIndex===index?'block':'none'}">
                  <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{
                            c2.categoryName
                          }}</a>
                        <!-- <router-link to="/search">{{c2.categoryName}}</router-link>-->
                      </dt>
                      <dd>
                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{
                              c3.categoryName
                            }}</a>
                          <!--<router-link to="/search">{{ c3.categoryName }}</router-link>-->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
//引入方式：是把lodash全部功能函数引入
import _ from 'lodash'

import {mapState} from 'vuex'

export default {
  name: "TypeNav",
  computed: {
    ...mapState({
      //对象写法：右侧需要的是一个函数，当时用这个计算属性的时候，右侧函数会立即执行一次
      //注入一个参数state，其实为大仓库中的数据
      categoryList: state => state.home.categoryList
    })
  },
  data() {
    return {
      currentIndex: -1,
      show:true
    }
  },
  methods: {
    //鼠标进入修改响应式数据currentIndex属性
    changeIndex: _.throttle(function (index) {
      //throttle回调函数别用箭头函数，可能出现上下文this问题
      //  index:鼠标移上某一个一级分类的元素的索引值
      //正常情况(用户慢慢的操作)：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
      //非正常情况（用户操作很快）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
      //就是由于用户的行为过快，导致浏览器反应不过来。如果当前回调函数中有大量业务，有可能出现卡顿现象
      this.currentIndex = index
    }, 50),
    leaveIndex() {
      //  鼠标移出currentIndex
      if (this.$route.path !== '/home'){
        this.show = false
      }
      this.currentIndex = -1
    },
    //进行路由跳转的方法
    goSearch(event) {
      //最好的解决方案：编程式路由导航 + 事件委派
      //利用事件委派存在一些问题：1、点击一定是a标签？2、如何获取参数
      //存在另一个问题，即使你能确定点击的是a标签，如何区分是一级、二级、三级分类的标签

      //第一个问题：把子节点当中a标签，加上自定义属性data-categoryName，其余的子节点没有
      let node = event.target
      console.log(node.dataset)
      let {categoryname, category1id, category2id, category3id} = node.dataset
      if (categoryname) {
        //  一级、二级、三级分类的a标签
        let location = {name: 'search'}
        let query = {categoryName: categoryname}
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
      //  判断：如果路由跳转的时候，带有params参数，顺便传过去
        if (this.$route.params){
          //  整理参数
          location.query = query
          location.params = this.$route.params
          //  路由跳转
          this.$router.push(location)
        }
      }
      // 获取当前触发的这个事件的节点【h3，a,dt,dl】，需要带有data-categoryName这样的节点一定是a标签
      //节点有一个属性dataset属性，可以获取节点的自定义属性与属性值

      // this.$router.push({
      //   name: 'search'
      // })
    },
    //当鼠标移入的时候，让商品分类列表进行展示
    enterShow(){
      if (this.$route.path !== '/home') {
        this.show = true
      }
    }

  },
  mounted() {
    //  当组件挂载完毕，让show属性变为false
    //  如果不是Home路由组件，将typeNav进行隐藏
    if(this.$route.path !== '/home'){
         this.show = false
    }
  },
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          //&:hover {
          //  .item-list {
          //    display: block;
          //  }
          //}
        }

        .cur {
          background-color: skyblue;
        }
      }
    }
  }
//  过渡动画的样式
//  过渡动画的开始状态（进入）
  .sort-enter{
    height: 0;
    //transform: rotate(0deg);
  }
  .sort-enter-to{
    height: 461px;
    //transform: rotate(360deg);
  }
  .sort-enter-active{
    transition: all 0.5s linear;
  }
}

</style>