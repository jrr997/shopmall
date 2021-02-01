<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <template #center >购物车({{cartLength}})</template>
    </nav-bar>
    <toast />
    <scroll class="wrapper" ref="wrapper">
    <cart-list />
    </scroll>
    <cart-botton-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import {mapGetters} from 'vuex'
import CartList from './childComponents/CartList.vue'
import CartBottonBar from './childComponents/CartBottonBar.vue'
import Toast from '../../components/common/toast/Toast.vue'


export default {
  name:'Cart',
  components:{
    NavBar,
    CartList,
    Scroll,
    CartBottonBar,
    Toast
  },
  computed:{
    ...mapGetters(['cartLength','cartList'])
  },
  methods: {
  },
  activated() {
    this.$refs.wrapper.refresh()
  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}
.cart-nav {
  color:#fff;
  background-color: var(--color-tint);
}
  .wrapper {
    position:absolute;
    top:44px;
    bottom:89px;
    left:0;
    right:0;
    overflow: hidden;
  }
</style>
