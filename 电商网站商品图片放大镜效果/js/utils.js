/**
 * 添加事件
 * @param { 节点 } el
 * @param { 事件类型 } type
 * @param { 回调函数 } fn
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
 * 解除事件处理函数
 * @param { 节点 } el
 * @param { 事件类型 } type
 * @param { 回调函数 } fn
 */
function removeEvent(el, type, fn) {
  if (el.addEventListener) {
    el.removeEventListener(type, fn, false);
  } else if (el.attachEvent) {
    el.detachEvent("on" + type, fn);
  } else {
    el["on" + type] = null;
  }
}

/**
 * 取消冒泡行为
 * @param { 事件对象 } ev
 */
function cancelBubble(ev) {
  let e = ev || window.event;

  if (e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }
}

/**
 * 阻止默认行为
 * @param { 事件对象 } ev
 */
function preventDefaultEvent(ev) {
  let e = ev || window.event;

  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
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

/**
 * 获取元素的样式属性
 * @param { 节点 } el
 * @param { 具体哪个样式属性 } prop
 * @returns
 */
function getStyles(el, prop) {
  if (window.getComputedStyle) {
    if (prop) {
      return parseInt(window.getComputedStyle(el, null)[prop]);
    } else {
      return window.getComputedStyle(el, null);
    }
  } else {
    if (prop) {
      return parseInt(el.currentStyle[prop]);
    } else {
      return el.currentStyle;
    }
  }
}

/**
 * 相对于当前文档的坐标(包含滚动条的距离)
 * pageX/pageY的兼容性写法
 * @param { 事件对象 } e
 * @returns {
 *  X: x轴坐标,
 *  Y: y轴坐标
 * }
 */
function pagePos(e) {
  let sLeft = getScrollOffset().left,
    sTop = getScrollOffset().top,
    //获取文档偏移的距离
    cLeft = document.documentElement.clientLeft || 0,
    cTop = document.documentElement.clientTop || 0;

  return {
    X: e.clientX + sLeft - cLeft,
    Y: e.clientY + sTop - cTop,
  };
}

/**
 * @param {*} el
 * @returns {
 *  DOM元素相对于HTML文档的x、y距离
 * }
 */
function getElemDocPosition(el) {
  let parent = el.offsetParent,
    offsetLeft = el.offsetLeft,
    offsetTop = el.offsetTop;

  while (parent) {
    offsetLeft += parent.offsetLeft;
    offsetTop += parent.offsetTop;
    parent = parent.offsetParent;
  }

  return {
    left: offsetLeft,
    top: offsetTop,
  };
}
