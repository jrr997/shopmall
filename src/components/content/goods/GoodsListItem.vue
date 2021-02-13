<template>
<div class="goods-item">
  <img v-lazy="showImg" alt="" @click="itemClick" >
  <div class="goods-info">
    <p>{{goodsItem.title}}</p>
    <span class="price">{{goodsItem.price}}</span>
    <span class="cfav">{{goodsItem.cfav}}</span>
  </div>
</div>
</template>

<script>
export default {
  name:'GoodsListItem',
  props:{
    goodsItem:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  methods:{
    itemClick() {
      // 通过动态路由方式传递参数
      // this.$router.push('/detail/' + this.goodsItem.iid)

      // 通过query方式传递参数
      let iid = this.goodsItem.iid
      this.$router.push({
        path:'/detail',
        query:{
          iid
        }
      })
    },
  },
  computed:{
    showImg() {
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
    }
  }
}
</script>

<style scoped>
 .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
    border:3px solid var(--color-tint);
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .cfav {
    position: relative;
  }

  .goods-info .cfav::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
