<template>
  <div class="" id="detail" ref="detail" :style="{height:detailHeight}">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" >
    </detail-nav-bar>
    <scroll ref="wrapper"
            class="wrapper"
            :useTransition="false"
            :probeType="3"
            :listenScroll="true"
            @scroll="contentScroll" >
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoaded="imageLoaded" />
      <detail-param-info :paramInfo="paramInfo" ref="params" />
      <detail-comment-info :commentInfo="commentInfo" ref="comments" />
      <goods-list :goodsList='recommends' ref="recommends" />
    </scroll>
    <back-top @click.native="backTopClick" v-show="isBackTopShow" />
    <detail-bottom-bar @addToCart="addToCart" />
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailBaseInfo from './childComponents/DetailBaseInfo'
import DetailShopInfo from './childComponents/DetailShopInfo'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
import DetailParamInfo from './childComponents/DetailParamInfo'
import DetailCommentInfo from './childComponents/DetailCommentInfo'
import DetailBottomBar from './childComponents/DetailBottomBar.vue'

import { mapActions } from 'vuex'
import {getDetail, GoodDetail, Shop, GoodsParam, getRecommend} from 'network/detail'
import {backTopMixin} from 'common/mixin'
import GoodsList from 'components/content/goods/GoodsList'
// import DetailRecommendInfo from './childComponents/DetailRecommendInfo.vue'

import Scroll from 'components/common/scroll/Scroll'





export default {
  name:'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
    // DetailRecommendInfo
  },
  mixins:[backTopMixin],
  data() {
    return {
      iid: null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      jumpY:[0],
      currentIndex:0,
      detailHeight: '0px'
    }
  },
  methods:{
    ...mapActions(['addCart']),
    imageLoaded() {
      this.$refs.wrapper.refresh()
      this.jumpY.push(this.$refs.params.$el.offsetTop - 60)
      this.jumpY.push(this.$refs.comments.$el.offsetTop - 60)
      this.jumpY.push(this.$refs.recommends.$el.offsetTop - 60)
      this.jumpY.push(Number.MAX_VALUE)
      // console.log(this.jumpY)
    },
    titleClick(index) {
      console.log(index);
      this.$refs.wrapper.scrollTo(0,-this.jumpY[index],250)

    },
    contentScroll(pos) {
      // backTop
      this.backTopShow(pos)

      let y = - pos.y
      // 发生滚动时，监听pos变化，如果在某个区间0-1、1-2、2-3、3-4，则跳转到
      for(let i = 0; i < this.jumpY.length - 1; i++) {
        if((this.currentIndex != i) && (y >= this.jumpY[i] && y < this.jumpY[i+1])) {
          this.currentIndex = i
          // 父访子
          this.$refs.nav.currentIndex = this.currentIndex
          console.log(i);
        }
      }
    },
    addToCart() {
      // 获取需要在购物车展示的信息
      const product = {}
      product.iid = this.iid
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.image = this.topImages[0]
      product.price = this.goods.realPrice

      // 把信息传入state中
      // this.$store.commit('addCart',product)
      // 把信息传入action中，对数据进行处理
      this.addCart(product).then(res => {
        // console.log(res);
        // 弹出Toast
        this.$toast.show(res,1000);
      })

      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res);
      // })

    },
    getViewHeight() {
      this.detailHeight = window.innerHeight + 'px'
      // console.log('detailHeight: ' + this.viewHeight);
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.query.iid

    // 2.根据iid请求详细数据
    getDetail(this.iid).then(res => {
      const data = res.data.result
      // console.log(data);
      this.topImages = data.itemInfo.topImages;

      // 3.保存DetailBaseInfo组件的信息
      this.goods = new GoodDetail(data.itemInfo, data.columns, data.shopInfo)
      // console.log(this.goods);

      // 4.保存DetailShopInfo组件的信息
      this.shop = new Shop(data.shopInfo)

      // 5.保存商品详细信息
      this.detailInfo = data.detailInfo

      // 6.保存DetailGoodsParam组件信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      // 7.保存商品评论信息
      if(data.rate.cRate !== 0) {
      this.commentInfo = data.rate.list[0]
      }

      // 8.获取推荐信息
      getRecommend().then(res => {
        this.recommends = res.data.data.list
      })
    })

    this.$nextTick(() => {
      this.getViewHeight()
    });

  },
  mounted() {
  }
}
</script>

<style scoped>
  #detail {
    position:relative;
    z-index:999;
    background-color: #fff;
    /* height: 100vh; */
  }
  .wrapper {
    height: calc(100% - 102px)
  }
  .detail-nav {
    position:relative;
    z-index:999;
    background-color: #fff;
  }
</style>
