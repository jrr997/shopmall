<template>
<div id="home">
<nav-bar class="home-nav"><template #center>购物街</template></nav-bar>
<tab-control class="tab-control" :title="['流行', '新款', '精选']"  v-show="isTabFixed"
                ref="tabControl1"
                @tabClick="tabClick" />
<scroll class="wrapper"
        ref="wrapper"
        :probeType="3"
        :listenScroll="true"
        :useTransition="false"
        :pullup="true"
        :data="scrollData"
        :pulldown="pulldown"
        @scroll="scrollPos"
        @scrollToEnd ="scrollToEnd" >
    <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
    <recommend-view :recommend="recommend" />
    <feature-view />
    <tab-control :title="['流行', '新款', '精选']"
                 ref="tabControl"
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

import HomeSwiper from './childComponents/HomeSwiper'
import RecommendView from './childComponents/RecommendView'
import FeatureView from './childComponents/FeatureView'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {backTopMixin} from 'common/mixin'


export default {
 name:'Home',
 components:{
   NavBar, Scroll, TabControl, GoodsList, HomeSwiper, RecommendView, FeatureView
 },
 mixins:[backTopMixin],
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
     tabOffsetTop:0,
     isTabFixed:false,
     saveY:0
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
    this.$refs.tabControl.currentIndex = index;
    this.$refs.tabControl1.currentIndex = index;

  },
  // BackTop组件的点击事件，返回顶部
  backTopClick() {
    this.$refs.wrapper.scrollTo(0,0,500)
  },
  // 滚动位置监听，获取滚动position
  scrollPos(pos) {
    // 判断是否显示子组件BackTop
  this.backTopShow(pos)
  // console.log(pos.y);
    // TabControl的吸顶效果
    this.isTabFixed = (- pos.y) > this.offsetTop

  },
  // 上拉加载更多
  scrollToEnd() {
    // console.log('已经到底部');
    this.getHomeGoods(this.currentType);
  },
  // 监听轮播图图片是否加载完成
  swiperImgLoad() {
      //  获取tab-control的offsetTop
    this.offsetTop = this.$refs.tabControl.$el.offsetTop
    console.log(this.$refs.tabControl.$el.offsetTop);
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
       this.$refs.wrapper.refresh()

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
 created() {
  //  1.请求Home页面的多个数据
   this.getHomeMultidata()
  // 2.请求Home页面的商品数据
   this.getHomeGoods('pop')
   this.getHomeGoods('new')
   this.getHomeGoods('sell')
 },
 mounted() {
 },
 destroyed(){
 },
 activated() {
   this.$refs.wrapper.scrollTo(0,this.saveY,0)
   this.$refs.wrapper.refresh()
 },
 deactivated() {
   this.saveY = this.$refs.wrapper.scroll.y
 }
}
</script>

<style scoped>
  #home {
    /* padding-top:44px; */
    height: 100vh;
    position:relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color:#fff;
    /* position:fixed; */
    /* z-index:999;
    left:0;
    right:0;
    top:0; */
  }
  .tab-control {
    position:relative;
    z-index:999;
    top:-2px;
    background-color: #fff;
    /* margin:-2px; */
  }
  .wrapper {
    position:absolute;
    top:44px;
    bottom:49px;
    left:0;
    right:0;
    overflow: hidden;
  }
</style>
