/**
 * 添加事件
 * @param {节点} el
 * @param {事件类型} type
 * @param {回调函数} fn
 */
function addEvent(el, type, fn) {
  if (el.addEventListener) {
    el.addEventListener(type, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent("on" + type, function () {
      fn.call(el);
    });
  } else {
    el["on" + type] = fn;
  }
}

/**
 * 获取滚动距离
 * @returns {
 *  left: 'x轴滚动距离',
 *  top: 'y轴滚动距离'
 * }
 */
function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset,
    };
  } else {
    return {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop,
    };
  }
}

/**
 * 获取可视窗口宽高
 * @returns {
 *  width: "宽",
 *  height: "高"
 * }
 */
function getViewportSize() {
  if (window.innerHeight) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  } else {
    if (document.compatMode === "BackCompat") {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
      };
    } else {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      };
    }
  }
}

/**
 * 整个HTML页面的宽高
 * @returns {
 *  width: "宽",
 *  height: "高"
 * }
 */
function getScrollSize() {
  if (document.body.scrollWidth) {
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight,
    };
  } else {
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
    };
  }
}
