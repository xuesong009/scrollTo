# scrollTo.js

## 说明

页面内导航, 使用很常见;

仿m.jd.com商品详情页导航点击跳转至页内相应模块;
具体m.jd.com商品详情页 or imgs(effect.png);

## 使用

js文件中,

```js
  // 初始化affix对象
  // 监听页面滚动
  var scrollTo = new ScrollTo({
    // 锚 className
    anchorsClassName: "anchor-item",
    // active anchor className
    activeAnchorClassName: "activeAnchor",
    // 步长
    // step: 10,
    // 模块间距
    interval: 10,
    // 导航条的高度或者宽度
    navBarHeight: 45
  });
```

window滚动/滑动监听中调用watch(top)方法:

```js
  /** 2.affix视图更新 **/
  scrollTo.watch(top);
```

## 实现

.html文件中,
[1] 锚 给定data-targetId属性,该属性指向每个模块的id;
[2] 给每个模块一个id;

scrollTo.js;