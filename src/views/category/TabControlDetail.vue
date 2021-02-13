<template>
  <grid-view>
    <!-- <goods-list-item /> -->
  </grid-view>
</template>

<script>
import GridView from '../../components/common/gridView/GridView.vue'
import GoodsListItem from '../../components/content/goods/GoodsListItem.vue'
export default {
  name:'TabControlDetail',
  components:{GridView, GoodsListItem},
  props:{
    categoryDetail:{
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>

</style>
