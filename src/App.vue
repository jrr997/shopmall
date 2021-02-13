<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tabbar></main-tabbar>
    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>

<script>

import MainTabbar from 'components/content/mainTabbar/MainTabbar'
import SvgIcon from 'components/content/Icon/svg.vue'
import Icon from 'components/content/Icon/Icon.vue'

export default {
  name: 'App',
  components: {
    MainTabbar,SvgIcon,Icon
  }
}
</script>
<style>
@import "assets/css/base.css";
</style>
