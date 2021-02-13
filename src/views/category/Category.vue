<template>
  <div id="category">
    <nav-bar id="category-nav">
      <template #center>
        分类
      </template>
    </nav-bar>
    <tab-menu :categories="categories" @menuClick="menuClick" class="menu" />
    <scroll class="wrapper"
            ref="wrapper"
            :useTransition="false"
            :data="[categoryData,showCategoryDetail]"
            :probeType="3"
            :listenScroll="true"
            @scroll="scrollPos" >
      <tab-content-category class="content-category" :subcategories="showCategory" />
      <tab-control :title="['综合', '新品', '销量']" @tabClick="tabClick" ref="tab" />
      <goods-list :goodsList="showCategoryDetail" />
    </scroll>
    <back-top @click.native="backTopClick" v-show="isBackTopShow" />
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import NavBar from '../../components/common/navbar/NavBar.vue'
import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'
import TabMenu from './childComponent/TabMenu.vue'
import TabContentCategory from './childComponent/TabContentCategory.vue'
import TabControl from '../../components/content/tabControl/TabControl.vue'
import {POP, SELL, NEW} from 'common/const'
import GoodsList from '../../components/content/goods/GoodsList.vue'
import {backTopMixin} from 'common/mixin'


export default {
  name:'Category',
  components:{Scroll, NavBar,TabMenu, TabContentCategory, TabControl, GoodsList},
  mixins:[backTopMixin],
  data() {
    return {
      categories:[],
      categoryData:{},
      currentIndex:-1,
      currentType:-1
    }
  },
  methods:{
    // 网络请求相关方法
    // 获取左边菜单的数据
    _getCategory() {
      getCategory().then(res => {
        // 1.存储菜单分类
        this.categories = res.data.data.category.list;
        // 2.组织categoryData，为插入数据(_getSubcategories)做准备
        for (let i in this.categories) {
                      this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
        };

        // 3.请求第一个分类的数据
        this.menuClick(0);
      })
    },
    // 菜单详细的分类
    _getSubcategories(index) {
      const maitKey = this.categories[index].maitKey;
      getSubcategory(maitKey).then(res => {
          this.categoryData[index].subcategories = res.data;
          // 这一步让解决categoryData修改后，vue识别不出来的情况
          this.categoryData = {...this.categoryData}
          // 获取tab-control下内容
          this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
        })
    },
    // 获取tab-control下内容的方法
    _getCategoryDetail(type) {
      // this.currentType = type;
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      getCategoryDetail(miniWallkey, type).then(res => {
      // 保存数据
      this.categoryData[this.currentIndex].categoryDetail[type] = res
      this.categoryData = {...this.categoryData}
      })
    },


    // 事件方法
    menuClick(index) {
      this.$refs.wrapper.stop();
      // this.$refs.wrapper.scrollTo(0,0,0);
      this.currentIndex = index;
      // 发送请求获取菜单详细的分类
      this._getSubcategories(index);
      this.$refs.tab.itemClick(0);
    },
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = POP;
          console.log('pop');
          break;
        case 1:
          this.currentType = NEW;
          break;
        case 2:
          this.currentType = SELL;
      }
    },
    scrollPos(pos) {
      this.backTopShow(pos)
    }
  },
  computed:{
    showCategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories.data;
    },
    showCategoryDetail() {
      if(this.currentType === -1) return [];
      var data = this.categoryData[this.currentIndex].categoryDetail[this.currentType].data;
      return data;
    }
  },
  created() {
    // 获取左边菜单数据
    this._getCategory()
  }
}
</script>

<style scoped>
  #category {
  height: 100vh;
  /* position: relative; */
  }
  #category-nav {
    background-color: var(--color-tint);
    color:#fff;
  }

  /* .content-category {
    position:absolute;
    left:100px;
    right:0;
    top:44px;
    bottom:49px;
  } */
  .wrapper {
    overflow: hidden;
    position:absolute;
    left:100px;
    right:0;
    top:44px;
    bottom:49px;
  }
</style>
