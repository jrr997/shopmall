<template>
  <div id="tab-content-category">
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
      <div class="subcategories" v-for="(item,index) in subcategories.list" :key="index" >
        <a :href="item.link">
          <img :src="item.image" alt="" class="item-img">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>

  <!-- <div>
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
      <div class="item" v-for="(item, index) in subcategories.list" :key="index">
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt="">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div> -->
</template>

<script>
import GridView from 'components/common/gridView/GridView.vue';
export default {
  name:'TabContentCategory',
  components:{GridView},
  props:{
    subcategories:{
      type: Object,
      default() {
        return {};
      }
    }
  }
}
</script>

<style scoped>
  .item-img {
    width: 80%;
    /* height: 80%; */
  }
  .subcategories {
    font-size:12px;
    text-align: center;
  }
</style>
