<template>
  <div class="cart-list">
  <ul>
    <!-- <li v-for="item in cartList" :key="item.iid" >{{item}}</li> -->
    <cart-list-item v-for="item in cartList" :key="item.iid" :itemInfo="item" />
  </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CartListItem from './CartListItem.vue'


export default {
  name:'CarList',
  components:{
    CartListItem
  },
  computed:{
    ...mapGetters(['cartList'])
  }
}
</script>

<style scoped>

</style>
