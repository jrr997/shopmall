<template>
<div class="tab-menu-box" :style="{height:menuHeight}" >
<scroll class="tab-menu" ref="wrapper">
  <div class="menu-item" v-for="(item, index) in categories"
        :key="item.title"
        :class="{active:index==currentIndex}"
        @click="itemClick(index)">
  {{item.title}}</div>
</scroll>
</div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll';

export default {
  name:'TabMenu',
  components:{
    Scroll
  },
  data() {
    return {
      currentIndex:0,
      viewHeight:"100%"
    }
  },
  props:{
    categories:{
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods:{
    itemClick(index) {
      this.currentIndex = index;
      // 发射事件，通知Category发送请求
      this.$emit('menuClick',index)
    },
    // 获取menu高度，避免用vh
    getViewHeight() {
      this.viewHeight = window.innerHeight;
    }
  },
  computed:{
    menuHeight() {
      return (this.viewHeight - 93) + "px"
    }
  },
  created(){
    this.$nextTick(() => {
      this.getViewHeight();
      // this.$refs.wrapper.refresh();
    })
  }
}
</script>

<style scoped>
.tab-menu-box {
   background-color: rgba(246,246,246);
    width: 100px;
    overflow: hidden;
}
  .tab-menu {
    height: 100%;
    width: 100px;
    overflow: hidden;
  }
  .menu-item {
    height: 45px;
    line-height: 45px;
    font-size:14px;
    text-align:center;
  }

   .active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>
