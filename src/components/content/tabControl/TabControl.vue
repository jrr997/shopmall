<template>
  <div class="tab-control">
    <div v-for="(item, index) in title" :key="item"
    class="tab-control-item"
    :class="{active:index === currentIndex}"
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  data() {
    return {
      currentIndex:0
    }
  },
  methods:{
    itemClick:function(index) {
      this.currentIndex = index
      this.$emit('tabClick',index)
    }
  },
  props:{
    title:{
      type:Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.tab-control {
  display:flex;
  text-align: center;
  font-size: 15px;
  line-height: 40px;
  height: 40px;
  z-index: 999;
}
.tab-control-item {
  flex:1;
}
.tab-control-item span {
  padding:5px;
}
.active span {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-high-text);
}
</style>
