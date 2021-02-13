<template>
  <div class="cart-buttom-bar">
    <div class="checkAll" @click="checkAll">
    <check-button class="check-button" :isChecked="isSelectAll"></check-button>
    <span>全选</span>
    </div>
    <div class="total">合计{{total}}</div>
    <div class="pay" @click="pay" >去结算({{cartLength}})</div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  name:'CartBottomBar',
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList','cartLength']),
    total() {
      return '￥' + this.cartList.filter(item => item.isChecked
        ).reduce((preValue,item) =>{
        return preValue + item.price * item.count
      },0)
    },
    isSelectAll() {
      // return !this.cartList.filter(item => !item.isChecked).length
      if(this.cartLength == 0) {return false}
      return !this.cartList.find(item => !item.isChecked)
    }
  },
  methods:{
    checkAll() {
      console.log('check all');
      if(this.isSelectAll) {
        this.cartList.forEach(item => {
          item.isChecked = false
        })
      }
      else {
         this.cartList.forEach(item => {
          item.isChecked = true
        })
      }
    },
    pay() {
      if(this.cartLength == 0) {
        this.$toast.show('购物车没有商品！',1000);
      }else {
      this.$toast.show('别买，省点钱！',2000);
      }
    }
  }
}
</script>

<style scoped>
.cart-buttom-bar {
  display: flex;
  position:fixed;
  bottom:49PX; /* px-to-viewport-ignore */
  left:0;
  right:0;
  line-height: 40px;
  height: 40px;
  background-color: #ccc;
}
.checkAll {
  display:flex;
  align-items: center;
  height: 100%;
  padding-left:10px;
  margin-right:20px;
  text-align:center;
}
.check-button {
  width: 20px;
  height: 20px;
  margin-right:5px;
  line-height: 20px;
}
.total {
  flex:1;
  text-align: right;
  margin-right:20px;
}
.pay {
  width: 80px;
  height: 100%;
  background: red;
  text-align:center;
  color:aliceblue;
}
</style>
