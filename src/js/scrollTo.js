/**
 * @fnName ScrollTo;
 * @Description 页面内导航;
 * @param {obj}  TODO 保存了导航tap的id;
 * @return {type} ;
 * @author xuesong009
 * @Date 
 */

function ScrollTo(setObj) {
  // console.log('hi ScrollTo fn')
  if (this instanceof ScrollTo) {
    // 初始化
    this.__proto__.init(setObj);
  } else {
    return new ScrollTo(setObj);
  }
}

// obj = {
//   // 锚 className
//   anchorsClassName: "xxxx",
//   // active anchor className
//   activeAnchor: "vvv",
//   // 步长
//   step: 10,
//   // 模块间距
//   interval: 10,
//   // 导航条的高度或者宽度
//   navBarHeight:45
// }

// ScrollTo原型中添加方法
ScrollTo.prototype = {
  constructor: ScrollTo,
  // taps集合
  anchors: [],

  // targets集合
  /**
   * [
   *    tar1:{
   *      minRange: tar1.offsetTop - 45 - 10,
   *      maxRange: tar2.offsetTop - 45 - 10
   *    },
   *    tar2:{
   *      minRange: tar2.offsetTop - 45 - 10,
   *      maxRange: tar3.offsetTop - 45 - 10
   *    },
   *    ...
   *    // 需要判断是否是最后一个
   *    tarn:{
   *      minRange: tarn.offsetTop - 45 - 10
   *    },
   * ]
   */
  targets: [],

  // 默认导航anchor元素
  activeAnchor: null,

  // 初始化ScrollTo对象
  init: function (setObj) {
    // 初始化
    // 锚的className
    this.anchorsClassName = setObj.anchorsClassName;

    // active anchor className
    this.activeAnchorClassName = setObj.activeAnchorClassName;

    // 模块间距
    this.interval = setObj.interval;

    // 导航条的宽度或高度
    this.navBarHeight = setObj.navBarHeight;

    // 1.获取anchors集合
    this.anchors = document.querySelectorAll('.' + this.anchorsClassName);

    // 获取activeAnchor属性
    this.activeAnchor = document.querySelector("." + this.activeAnchorClassName);

    var that = this;
    for (var i = 0; i < this.anchors.length; i++) {
      (
        function (index) {
          // 2.获取target集合 data-targetId
          var targetId = that.anchors[index].getAttribute("data-targetId");
          that.targets[index] = document.querySelector('#' + targetId);

          // 3.tap事件监听
          // var that = this;
          that.anchors[index].addEventListener('click', function (e) {
            e = event || window.event;
            // 视图更新

            // console.log(that.activeAnchor)
            that.upDateView(that.activeAnchorClassName, this);
            // that.removeClass(that.activeAnchor, "activeAnchor");
            // that.activeAnchor = this;
            // that.addClass(this, "activeAnchor");
            // window.scrollTo(0, that.targets[index].offsetTop - 55);
            // window.scrollTop = (that.targets[index].offsetTop - 10) + "px";
            // document.documentElement.scrollTop = (that.targets[index].offsetTop - 10) + "px";

            // window.location.hash = "#" + this.getAttribute("data-targetId");

            // console.log(this)
            document.documentElement.scrollTop = that.targets[index].offsetTop - that.interval - that.navBarHeight;
            document.body.scrollTop = that.targets[index].offsetTop - that.interval - that.navBarHeight;

            return false;
          });
        }
      )(i);
    }

    // 4.初始化targets集合中元素的minRange属性和maxRange属性
    // minRange属性和maxRange属性 元素的范围 页面滑动监听中使用
    // minRange属性: 最小范围, 取值: tarn.offsetTop - 45 - 10
    // maxRange属性: 最大范围, 取值: tar(n+1).offsetTop - 45 - 10
    for (var i = 0; i < this.targets.length; i++) {
      if (i == 0) { // 第一个
        this.targets[i].minRange = 0;
      } else {
        this.targets[i].minRange = this.targets[i].offsetTop - this.navBarHeight - this.interval;
      }
      // if (i >= this.targets.length - 1) { // 最后一个元素
      this.targets[i].maxRange = this.targets[i].offsetTop + this.targets[i].offsetHeight;

      // } else {
      //   this.targets[i].maxRange = this.targets[i + 1].offsetTop - 45 - 10;
      // }
      console.log(this.targets[i].minRange)
      console.log(this.targets[i].maxRange)
    }
    console.log(this.targets)

    return window.ScrollTo = this;
  },
  // 删除某个class
  removeClass: function (ele, cn) {
    // console.log(ele.className)
    // console.log(ele.className.replace(new RegExp(" " + cn, "g"), " "));
    ele.className = ele.className.replace(new RegExp(" " + cn, "g"), " ");
    // console.log(ele.className)
  },
  // 添加class
  addClass: function (ele, csn) {
    ele.className += " " + csn;
  },
  // 页面更新(样式更新)
  upDateView: function (cn, newAnchor) {
    // 删除activeAnchor原有class
    this.removeClass(this.activeAnchor, cn);
    // 更新activeAnchor
    this.activeAnchor = newAnchor;
    // 更新视图
    this.addClass(this.activeAnchor, cn);
  },
  /**
   * @fnName watch;
   * @Description 页面滚动/滑动监听;
   * @Description 与anchor点击事件相反;
   * @param {Number} top TODO;
   * @return {type} ;
   * @author xuesong009
   * @Date 
   */
  watch: function (top) {
    // console.log(top);
    // 满足条件:
    // top>=minRange && top<=maxRange
    // 找到所在模块
    for (var n = 0; n < this.anchors.length; n++) {
      if (top >= this.targets[n].minRange && top < this.targets[n].maxRange) {
        // 视图更新
        this.upDateView(this.activeAnchorClassName, this.anchors[n]);
      }
    }
  }
};