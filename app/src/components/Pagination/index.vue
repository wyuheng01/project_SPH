<template>
  <div class="pagination">
    <button :disabled="pageNo===1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1"  @click="$emit('getPageNo',1)" :class="{active:pageNo===1}">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page >= startNumAndEndNum.start"  @click="$emit('getPageNo',page)" :class="{active:pageNo===page}">{{ page }}</button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage"  @click="$emit('getPageNo',total)" :class="{active:pageNo===totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo===totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    //总共多少页
    totalPage() {
      //向上取整
      return Math.ceil(this.total / this.pageSize)
    },
    //  计算出连续的页码的起始数字与结束数字[连续的页码的数字至少是五]
    startNumAndEndNum() {
      const {pageNo, totalPage, continues} = this
      //  定义两个变量存储起始数字与结束数字
      let start = 0, end = 0
      //  连续页码数字5【至少是五页】，如果不够五页
      //  不正常现象
      if (continues > totalPage) {
        start = 1
        end = totalPage
      } else {
        //  正常現象
        start = pageNo - Math.floor(continues / 2)
        end = pageNo + Math.floor(continues / 2)
      //  把出现不正常的现象【start数字出现0|负数】纠正
        if (start < 1){
          start = 1
          end = continues
        }
      //end数字大雨总页码
        if (end > totalPage){
            end = totalPage
            start =totalPage - continues + 1
        }
      }
      return {start,end}
    },
  }
}
</script>

<style lang="less">
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
  background-color: skyblue;
}
</style>
