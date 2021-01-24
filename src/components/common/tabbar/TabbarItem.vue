<template>
 <div class="tab-bar-item" @click="itemClick">
   <div v-if="!isActive">
   <slot name="item-icon"></slot>
   </div>
   <div v-else>
   <slot name="item-icon-active"></slot>
   </div>
   <div :style="activeStyle" >
   <slot name="item-text"></slot>
   </div>
   <!-- <img src="" alt="">
   <div>首页</div> -->
</div>
</template>

<script>
export default {
  name:'TabBaritem',
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data() {
    return {
      // isActive:true
    }
  },computed:{
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods:{
    itemClick() {
      this.$router.replace(this.path)
    }
  }
}
</script>

<style>
.tab-bar-item {
  display:flex;
  flex:1;
  flex-direction: column;
  text-align:center;
  height: 49px;
  font-size:14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin:5px auto 0 auto;
}

</style>
