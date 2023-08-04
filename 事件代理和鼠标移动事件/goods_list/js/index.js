(function (doc) {
  let oList = doc.getElementsByClassName("list")[0],
    oItems = oList.getElementsByClassName("list-item"),
    curIdx = 0;

  let init = function () {
    bindEvent();
  };

  function bindEvent() {
    addEvent(oList, "mouseover", slide);
    addEvent(oList, "mouseout", slide);
    // 另一个方法
    // addEvent(oList, "mouseover", function () {
    // mousemove解决鼠标滑入滑出和事件代理中产生的矛盾
    //   addEvent(document, "mousemove", slide);
    // });
    // addEvent(oList, "mouseout", function () {
    //   removeEvent(document, "mousemove", slide);
    // });
  }

  function slide(ev) {
    console.log(11);
    let e = ev || window.event,
      tar = e.target || e.srcElement,
      oParent = getParent(tar, "li"),
      thisIdx = Array.prototype.indexOf.call(oItems, oParent);

    if (curIdx !== thisIdx) {
      oItems[curIdx].className = "list-item";
      curIdx = thisIdx;
      oItems[curIdx].className += " active";
    }
  }

  function getParent(target, element) {
    while (target.tagName.toLowerCase() !== element) {
      target = target.parentNode;
    }
    return target;
  }

  init();
})(document);
