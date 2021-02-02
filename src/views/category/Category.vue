<template>
  <div id="category">
  <scroll class="wrapper" ref="wrapper">
    分类
    <goods-list />
  </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
// 测试bScroll中有图片时是否会卡顿
import GoodsList from 'components/content/goods/GoodsList'
export default {
  name:'Category',
  components:{Scroll, GoodsList},
  mounted:function() {
  }
}
</script>

<style scoped>
.wrapper {
  height: 600px;
  background-color: pink;
  overflow: hidden;
}
</style>
