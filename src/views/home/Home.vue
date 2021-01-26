<template>
<div id="home">
<nav-bar class="home-nav"><template #center>购物街</template></nav-bar>
<home-swiper :banners="banners" />
<recommend-view :recommend="recommend" />
<feature-view />
<tab-control class="tab-control" :title="['流行', '新款', '精选']"
@tabClick="tabClick" />
<goods-list :goodsList="showGoods" />
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList.vue'

import HomeSwiper from './childComponents/HomeSwiper'
import RecommendView from './childComponents/RecommendView'
import FeatureView from './childComponents/FeatureView'

import {getHomeMultidata, getHomeGoods} from 'network/home'

export default {
 name:'Home',
 data() {
   return {
     banners:[],
     recommend:[],
     dKeyword:[],
     keywords:[],
     goods: {
       pop:{page:0,list:[]},
       new:{page:0,list:[]},
       sell:{page:0,list:[]},
     },
     currentType:'pop'
   }
 },
 methods:{
   /**
    *   事件方法
   */
  tabClick(index) {
    switch(index) {
      case 0:
        this.currentType = 'pop'
        break
      case 1:
        this.currentType = 'new'
        break
      case 2:
        this.currentType = 'sell'
        break
    }
  },



   /**
   *    网络请求的方法
   */
   getHomeMultidata() {
     getHomeMultidata().then(res => {
     this.banners = res.data.data.banner.list
     this.dKeyword = res.data.data.dKeyword.list
     this.keywords = res.data.data.keywords.list
     this.recommend = res.data.data.recommend.list
     })
   },

   getHomeGoods(type) {
     let page = this.goods[type].page + 1
     getHomeGoods(type,page).then(res => {
       this.goods[type].list.push(...res.data.data.list)
       this.goods[type].page += 1
     })
   }
 },
 computed:{
   showGoods() {
     return this.goods[this.currentType].list
   }
 },
 components:{
   NavBar, TabControl, GoodsList, HomeSwiper, RecommendView, FeatureView
 },
 created() {
  //  1.请求Home页面的多个数据
   this.getHomeMultidata()
  // 2.请求Home页面的商品数据
   this.getHomeGoods('pop')
   this.getHomeGoods('new')
   this.getHomeGoods('sell')
 }
}
</script>

<style scoped>
#home {
padding-top:44px;
}
  .home-nav {
    background-color: var(--color-tint);
    color:#fff;
    position:fixed;
    z-index:999;
    left:0;
    right:0;
    top:0;
  }
  .tab-control {
    position:sticky;
    top:44px;
    background-color: #fff;
  }
</style>
