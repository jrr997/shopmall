import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'


// 1.安装插件
Vue.use(Vuex)

// 2.使用插件
// const state = {
//   cartList: []
// }
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  actions,
  mutations,
  getters
})


// 3.挂载插件
export default store