

#  小型的购物商场项目，感兴趣的小伙伴可以了解一下，如果觉得项目开发的不错可以给个star，小生在这里先谢谢大家啦，下面是该商城的说明书：



## 1.项目使用：

```
git clone https://github.com/jrr997/shopmall.git
npm install
npm run serve
```

## 2.项目界面展示

![](https://github.com/jrr997/shopmall/blob/master/readmePic/home.png)

![](https://github.com/jrr997/shopmall/blob/master/readmePic/detail.png)

![](https://github.com/jrr997/shopmall/blob/master/readmePic/category.png)

![](https://github.com/jrr997/shopmall/blob/master/readmePic/cart.png)

![](https://github.com/jrr997/shopmall/blob/master/readmePic/profile.png)



###	项目功能划分主要是首页、分类页、购物车页、个人中心、详情页，采用vue、vuex、vue-router、axios、better-scroll等技术栈开发，相关模块的具体划分请拉取到本地后查看

------



### 3.相关技术问题的解决方案

1. 由于原生浏览器的滚动条无法实现拉到边界时回弹效果，停止滑动时的惯性向前运动效果，包括在移动端滑动时会有卡顿等效果，故而采用bette-scroll滚动框架解决，相关知识可以查询better-scroll官网[https://github.com/ustbhuangyi/better-scroll]:

2. 项目运行在移动端时点击时会有300ms的延迟，主要是由于一次点击之后不会立刻触发点击事件会有300ms等待下一次点击，若在300ms内再次点击则触发双击事件，为此引入fastclick插件相关知识可以从官网了解[https://github.com/ftlabs/fastclick]:

3. 为了保证用户对于网站的体验效果，故而采用vue-lazyload图片懒加载插件技术实现图片的动态加载，相关知识请了解官网[https://www.npmjs.com/package/vue-lazyload]:

4. 为防止项目在不同屏幕分别率设备上绝对像素给用户带来不好体验效果，故而引入postcss-px-to-viewport,将项目的px值转化为vw，以适应不同设备的显示大小

   

### 以上是项目是大概说明，小伙伴对于项目中有不懂的问题欢迎来我仓库发起评论。
### 最后有觉得不错的可以动动你们发财的小手点个星星，万分感谢大家！！！！！


