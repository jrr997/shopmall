<template>
<div id="home">
<nav-bar class="home-nav"><template #center>购物街</template></nav-bar>

<scroll class="wrapper"
        ref="wrapper"
        :probeType="3"
        :listenScroll="true"
        :pullup="true"
        :data="scrollData"
        :pulldown="pulldown"
        @scroll="scrollPos"
        @scrollToEnd ="scrollToEnd" >
    <home-swiper :banners="banners" />
    <recommend-view :recommend="recommend" />
    <feature-view />
    <tab-control class="tab-control" :title="['流行', '新款', '精选']"
    @tabClick="tabClick" />
    <goods-list :goodsList="showGoods" />
</scroll>
<back-top @click.native="backTopClick" v-show="isBackTopShow" />
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

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
     currentType:'pop',
     scroll:null,
     pulldown:true,
     isBackTopShow:false
   }
 },
 methods:{
   /**
    *   事件方法
   */

  // tabbar点击事件，流行、新款、精选 按钮的切换
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
  // BackTop组件的点击事件，返回顶部
  backTopClick() {
    this.$refs.wrapper.scrollTo(0,0,500)
  },
  // 获取滚动position并判断是否显示子组件BackTop
  scrollPos(pos) {
    this.isBackTopShow = - pos.y > 1000
  },
  // 上拉加载更多
  scrollToEnd() {
    console.log('已经到底部');
    this.getHomeGoods(this.currentType);
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
   },
   scrollData() {
     return this.goods[this.currentType].list
   }
 },
 components:{
   NavBar, Scroll, TabControl, GoodsList, BackTop, HomeSwiper, RecommendView, FeatureView
 },
 created() {
  //  1.请求Home页面的多个数据
   this.getHomeMultidata()
  // 2.请求Home页面的商品数据
   this.getHomeGoods('pop')
   this.getHomeGoods('new')
   this.getHomeGoods('sell')
 },
 mounted() {
 }
}
</script>

<style scoped>
  #home {
    padding-top:44px;
    height: 100vh;
    position:relative;
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
  .wrapper {
    /* -webkit--transform:translate3d(0,0,0); */
    position:absolute;
    top:44px;
    bottom:49px;
    left:0;
    right:0;
    overflow: hidden;
  }
</style>
