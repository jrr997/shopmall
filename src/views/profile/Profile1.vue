<template>
  <div id="profile">
    <nav-bar class="profile-nav">
      <template #center>功能待完善...</template>
    </nav-bar>
    <user-info></user-info>
  </div>
</template>

<script>
import UserInfo from './childComponents/UserInfo.vue'
import NavBar from '../../components/common/navbar/NavBar.vue'


export default {
  name:'Profile',
  components:{NavBar,UserInfo}
}
</script>


<style scoped>
  .profile-nav {
    background-color: var(--color-tint);
    color:#fff;
  }

 #profile {
    background-color: #f2f2f2;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .account {
    display: flex;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }

  .order-list, .service-list {
    margin-top: 12px;
  }

</style>
