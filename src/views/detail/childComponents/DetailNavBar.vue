<template>
  <nav-bar>
    <template #left >
      <div @click="leftClick">
      <img src="~assets/img/common/back.svg" alt="" class="back">
      </div>
    </template>
    <template #center >
      <div class="item">
        <div v-for="(item, index) in title"
        :key="item" class="title"
        :class="{active: currentIndex === index}"
        @click="itemClick(index)">
        {{item}}
        </div>
      </div>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  name:'DetailNavBar',
  components:{
    NavBar
  },
  data() {
    return {
      title:['商品', '参数', '评论', '推荐'],
      currentIndex:0
    }
  },
  methods:{
    itemClick(index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    leftClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .item {
    display:flex;
    flex-flow:row nowrap;
    font-size:13px;
  }
  .title {
    flex:1;
  }
  .active {
    color: var(--color-high-text);
  }
  .back {
    vertical-align: middle;
  }
</style>
