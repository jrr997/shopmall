<template>
  <div class="goods-list">
    <goods-list-item v-for="item in goodsList" :key="item.iid"
    :goods-item="item"
    class="goods-list-item" />
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
  name:'GoodsList',
  components: { GoodsListItem },
  props:{
    goodsList:{
        type:Array,
        default:[]
      }
  }
}
</script>

<style scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: var(--color-background);
    padding: 2px;
  }
</style>
