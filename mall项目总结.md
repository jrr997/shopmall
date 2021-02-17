# 一条街商城项目(Vue)

## 一、项目初始化

#### 1.1划分目录结构

#### 1.2引入两个CSS文件

#### 1.3 vue.config.js和editconfig

#### 1.4 项目模块划分及配置路由



问题：

better-scroll滚动高度

better-scroll刷新频繁

better-scroll移动端卡顿闪屏

移动端详情页下拉到底部时数据显示不全（vh单位所致）

保持首页状态





## 二、Tabbar的封装及应用



组件：Tabbar和TabbarItem，应用时要再加一个MainTabbar组件

#### TabbarItem组件

- 三个插槽：两个图片互斥的插槽(V-if),分别为激活时和不激活时显示；一个文字插槽。


- props：文字激活的颜色(red)、path(用于点击事件的后跳转到对应路由)


- 组件如何判断是否处于激活？

用计算属性，判断传进来的path(点击哪个就传哪个)，与当前路由($route)的path是否一致。



#### Tabbar组件

一个插槽，主要是作为TabbarItem的父亲，设置flex布局和fixed定位，插入的内容由MainTabbar决定。



#### MainTabbar组件

模板根是tabbar标签，里面装的是tabbar-item并使用其三个插槽。



#### 小结

Tabbar及TabbarItem可复用，不需要作任何改变，与业务无关。而MainTabbar组件直接关乎业务，里面需要传入4个item:Home、Category、Cart和Profile。





## 三、网络请求封装(axios)

创建一个request.js文件，把axios封装到request文件里，项目面向request，不会过多依赖axios。





## 四、首页制作

#### 4.0 首页顶部导航栏NavBar组件

这个顶部导航栏组件在每一个页面会用到，因此封装成一个独立组件。

使用：在组件插槽中传入文字即可

#### 4.1 发送网络请求，获取首页数据。

这么早发请求的目的是测试端口是否可用。

#### 4.2 轮播图组件Swiper

#### 4.3 推荐组件

#### 4.4 FeatureView组件封装

由于没有更详细的数据，这里实则是封装一张大图片。

#### 4.5 TabControl组件封装

- 功能：

  - 点击切换商品展示的类目，本项目中有 流行、新款、精选 三个类目。

  - 当一个类目激活时，会改变按钮中文字的颜色，同时多一个border-bottom效果。

- 组件的实现：

  - 要求传入一个数组title，内容是类目，用v-for遍历数组创建多个按钮。

  - 每个按钮都有独自的index，动态绑定class。监听每个按钮的点击事件，把被点击按钮的index值赋给currentIndex。这样currentIndex永远控制着哪个按钮是激活的。

    ```javascript
     :class="{active:index === currentIndex}"
    ```

  - 点击的同时向父亲(Home组件)发射一个点击事件和被点击按钮的index值，目的是同步Home页面的两个TabbarControl组件。因为点击了一个，另一个还会停留在以前的按钮，我们希望这两个按钮是同步的，发射事件后分别让这两个组件的currentIndex为发射出来的index。

  - 发射index的另一个作用：告诉Home现在的index，让Home切换展示数据。

 

#### 4.6 商品展示组件封装

##### 4.6.1 GoodsList组件

要求Home传入一个商品数组(一次30个商品)，v-for数组，创建30个GoodsListItem子组件，并向每个子组件传入每个商品的信息Item

##### 4.6.2 GoodsListItem组件

- 结构：图片上 + 文字下，根据传入的Item信息来展示数据。
- 点击事件：点击后通过路由跳转到详情页，并且通过query方式传递商品的iid



## 五、对滚动进行重构：better-scroll

#### 5.1 对滚动组件进行封装

#### 5.2 Home.vue和Scroll.vue之间的通信

- Home往Scroll传入：

  - probetype=3，listenScroll=true用于监听滚动

  - pullup="true"，允许Scroll发射scrollToEnd事件，开启上拉加载更多功能

  - useTransition="false"，解决移动端滑动卡顿和闪屏问题。

  - data="scrollData"，scrollData为计算属性，监听目前展示的数据。当页面下拉到底部，触发网络请求，请求到数据后scrollData发生改变。Scroll组件中会监听data的变化，延时refreshDelay时间后调用refresh方法重新计算高度，保证滚动效果正常。

    由于这里用的是通过监听data变化来进行高度刷新，每次变化只会刷新一次，因此不需要防抖。

- Scroll通过$emit发送实时事件



## 六、回到顶部组件BackTop

- 这里用.native修饰符在Home中直接监听BackTop的点击。

- 回到顶部：滚动时Scroll监听并向Home发射滚动位置，Home根据滚动位置判断是否显示BackTop组件。

  点击组件后，在Home组件中利用$refs调用Scroll组件的ScrollTo方法回到顶部。

  

## 七、下拉加载更多

监听滑到底部事件(Scroll发送到Home)，发送网络请求获取更多数据(以page的形式)。



## 八、Tabbar吸顶效果

- 实现思路：在Home的NavBar下面再弄一个Tabbar，默认隐藏。监听滚动事件，只有滚到到某个位置时，上面的NavBar才会显示，用v-show。
- 注意要使两个Tabbar的currentIndex同步，上面有介绍方法。



## 九、详情页的制作

#### 9.1 请求详情页数据

通过this.$route.query获取iid并请求数据。

把零散的数据汇总到一个对象中。

#### 9.2 展示商品数据

包括轮播图、商品基本信息、店铺信息、参数信息、评论信息等，这些信息都由一个个独立的组件来展示。

在评论信息中注意把时间戳转为需要的时间格式。

#### 9.3 请求并展示推荐数据

#### 9.4 引入Scroll组件

#### 9.5 [mixin]

和首页一样用到BackTop组件，有代码重复的情况

#### 9.6 标题和内容的联动效果

实现思路：当详情页图片（主要是轮播图中的图片）加载完成后，详情页的高度也就确定了。因此可以让轮播图图片加载完后往详情页发射一个事件，在这个事件中获取 商品(0)、参数、评论和推荐 这些组件的offsetTop。当点击某个标题时，就可以利用offsetTop实现跳转。





## 十、解决问题：首页保持状态

- 问题：跳转到详情页再返回首页，首页会回到顶部。

- 原因：跳转到详情页时Home组件被销毁

- 解决方法：
  - 使用keep-alive保持Home组件。
  - 跳转时(deactivated)记录离开前的滚动位置，回到Home时(activated)调用scrollTo方法滚到离开前的位置，并且刷新一次高度。



## 十一、点击加入购物车

- 引入vuex，把商品加入state.cartList
- vuex代码重构，抽离actions、mutations等。



## 十二、购物车页面的制作

#### 12.1 顶部导航栏

#### 12.2 商品展示

- cartList和cartListItem组件

#### 12.3 商品选中和不选中

实现逻辑：

- 在详细页中点击加入购物车时，加入购物车按钮所在的子组件发出一个事件到父组件Detail，Detail把需要在购物车展示的信息包装到一个对象product中，然后通过addCart方法把product传到中actions。
- addCart是actions中的方法，被映射到详情页，因此详情页能用addCart方法。addCart所做的事如下：
  - 从state中获取购物车商品信息(cartList)，遍历查看物品列表是否存在product
  - 存在则product.count ++
  - 不存在则push到购物车列表中，并且添加isChecked属性为true，表示已选中
  - 提交到mutations。
  - 由于addCart用promise包装，在resolve中传递 "已加入购物车" 或 "商品数量+1" 到详情页，详情页可以通过then把该信息传入到Toast组件，实现"已加入购物车"的提示。
- 不选中：
  - CartItem中的选中和不选中按钮与product的itemInfo.isChecked进行绑定，itemInfo从父组件传入。
  - 这里的ItemInfo实际上就是vuex.state中cartList的某个商品。
    - 因为父组件中通过映射的方式获取到vuex的getter中的cartList，放在getter是为了cartList监听变化，获取商品的数量展示到购物车中。
    - 父组件用v-for遍历cartList来创建子组件CartListItem，并绑定属性:itemInfo="item"，因此ItemInfo实际上就是vuex.state中cartList的某个商品。
- 当点击选中和不选中按钮时，在cartItem中让itemInfo.isChecked的值取反，这样就通过改变state中商品的isChekced属性来控制选中和不选中。

**简单地讲：**

- 选中和不选中按钮与state.cartListItem.item.isChecked进行绑定，通过修改ischecked属性来控制按钮选中和不选中的显示。
- 按钮点击事件：点击后item.isChecked属性取反，选中与不选中也随之更新。

#### 12.4 购物车全选按钮

实现逻辑：

- 全选按钮在CartBottomBar组件中，组件通过映射拿到vuex的getters的cartList。
- cartList为空则按钮不激活
- carList每个元素的isChecked都为true则激活。



## 十三、Toast封装

因为之后Toast可能在不同页面中用到很多次，利用组件构造器对Toast进行封装，这样利于复用。



## 十四、fastclick，解决移动端300ms延迟

改善用户体验

## 十五、图片懒加载vue-lazyload



## 十六、px2vw-css单位转化插件



## 十七、分类页面的制作

#### 17.1 编写网络请求

#### 17.2 NavBar

#### 17.3 左菜单组件

## 遇到的坑

- 在vue中，数据直接用索引赋值时，数据不能理解响应。
- 父子组件样式冲突：尽管在style标签中加上了scoped，组件样式仍然会有冲突，原因是子组件的最外层标签（根元素）会继承父亲中相同标签的样式。解决方法有两个，一是不要起相同的组件名，二是在子组件中用一层div包住所有内容。