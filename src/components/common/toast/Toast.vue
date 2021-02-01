<template>
  <div class="toast" v-show="isShow">{{message}}</div>
</template>

<script>
export default {
  name:'Toast',
  data() {
    return {
      message:'',
      isShow:false
    }
  },
  methods:{
    show(message='默认文字',duration) {
      duration = duration || 2000
      this.isShow = true
      this.message = message
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      },duration)
    }
  }
}
</script>

<style scoped>
  .toast {
    position:fixed;
    top:50%;
    left:50%;
    width: 150px;
    height: 30px;
    line-height: 30px;
    transform: translate(-50%,-50%);
    border-radius: 20px;
    color:#fff;
    background-color: rgba(0,0,0,.5);
    text-align:center;
    font-size:14px;
    z-index: 999;
  }
</style>
