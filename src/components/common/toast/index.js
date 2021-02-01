import Toast from './Toast'

const obj = {}
obj.install = function(Vue) {
  // 1.创建组件构造器
  const toastContructor = Vue.extend(Toast)

  // 2.new一个实例
  var toast = new toastContructor()

  // 3.把组件对象挂载在某个元素上
  toast.$mount(document.createElement('div'))

  // 4.此时toast.$el就是上面创建出来的div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj