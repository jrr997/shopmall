<template>
<swiper>
  <swiper-item v-for="item in banners" :key="item.title" >
    <a :href="item.link">
      <img :src="item.image" alt="" @load="swiperImgLoad">
    </a>
  </swiper-item>
</swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
 name:'HomeSwiper',
 props:{
   banners:{
     type:Array,
     default() {
       return []
     }
   }
 },
 data() {
   return {
     isLoad:false
   }
 },
 methods:{
   swiperImgLoad() {
     if (!this.isload){
     this.$emit('swiperImgLoad')
     this.isload = true
     }
   }
  },

 components:{
   Swiper, SwiperItem
 }
}
</script>

<style>

</style>
