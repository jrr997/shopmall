<template>
<div class="recommend">
  <a :href="item.link" v-for="item in recommend" :key="item.title" class="recommend-item">
    <img :src="item.image" alt="">
    <div>{{item.title}}</div>
  </a>
</div>
</template>

<script>
export default {
name:'RecommendView',
props:{
  recommend:{
    type:Array,
    default() {
      return []
    }
  }
}
}
</script>

<style scoped>
.recommend {
  display:flex;
  text-align: center;
  font-size:12px;
  padding:10px 0 20px;
  border-bottom:10px solid #eee;
}
.recommend-item {
  flex:1;
}
.recommend-item img {
  margin-bottom:10px;
  width: 70px;
  height: 70px;
}
</style>
