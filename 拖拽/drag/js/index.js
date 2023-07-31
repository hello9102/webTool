Element.prototype.dragNclick = function (menu, elemClick) {
  let oPos = [],
    bTime = 0,
    eTime = 0,
    //点击事件
    cbTime = 0,
    ceTime = 0,
    counter = 0,
    t = null,
    wWidth = getViewportSize().width,
    wHeight = getViewportSize().height,
    eleWidth = getStyles(this, "width"),
    eleHeight = getStyles(this, "height"),
    mWidth = getStyles(menu, "width"),
    mHeight = getStyles(menu, "height");

  drag.call(this);

  function drag() {
    let x,
      y,
      _self = this;

    addEvent(this, "mousedown", function (ev) {
      let e = ev || window.event,
        btnCode = e.button;

      if (btnCode === 2) {
        let mLeft = pagePos(e).X,
          mTop = pagePos(e).Y;
        if (mLeft <= 0) {
          mLeft = 0;
        } else if (mLeft >= wWidth - mWidth) {
          mLeft = mLeft - mWidth;
        }

        if (mTop <= 0) {
          mTop = 0;
        } else if (mTop >= wHeight - mHeight) {
          mTop = mTop - mHeight;
        }

        menu.style.left = mLeft + "px";
        menu.style.top = mTop + "px";
        menu.style.display = "block";
      } else if (btnCode === 0) {
        bTime = new Date().getTime();
        oPos = [getStyles(_self, "left"), getStyles(_self, "top")];
        menu.style.display = "none";

        x = pagePos(e).X - getStyles(_self, "left");
        y = pagePos(e).Y - getStyles(_self, "top");

        addEvent(document, "mousemove", mouseMove);
        addEvent(document, "mouseup", mouseUp);

        cancelBubble(e);
        preventDefaultEvent(e);
      }
    });

    addEvent(document, "click", function () {
      menu.style.display = "none";
    });

    // 禁止右键菜单
    addEvent(document, "contextmenu", function (ev) {
      let e = ev || window.event;
      preventDefaultEvent(e);
    });

    addEvent(menu, "click", function (ev) {
      let e = ev || window.event;
      cancelBubble(e);
    });

    //鼠标移动的时候
    function mouseMove(ev) {
      let e = ev || window.event,
        eleLeft = pagePos(e).X - x,
        eleTop = pagePos(e).Y - y;

      if (eleLeft <= 0) {
        eleLeft = 0;
      } else if (eleLeft >= wWidth - eleWidth) {
        eleLeft = wWidth - eleWidth;
      }

      if (eleTop <= 0) {
        eleTop = 0;
      } else if (eleTop >= wHeight - eleHeight) {
        eleTop = wHeight - eleHeight;
      }

      _self.style.left = eleLeft + "px";
      _self.style.top = eleTop + "px";
    }

    // 鼠标抬起来的时候
    function mouseUp() {
      eTime = new Date().getTime();

      if (eTime - bTime < 200) {
        _self.style.left = oPos[0] + "px";
        _self.style.top = oPos[1] + "px";

        counter++;

        if (counter === 1) {
          cbTime = new Date().getTime();
        }

        if (counter === 2) {
          ceTime = new Date().getTime();
        }

        if (cbTime && ceTime && ceTime - cbTime < 200) {
          elemClick();
        }

        t = setTimeout(function () {
          cbTime = 0;
          ceTime = 0;
          counter = 0;
          clearTimeout(t);
        }, 200);
      }

      removeEvent(document, "mousemove", mouseMove);
      removeEvent(document, "mouseup", mouseUp);
    }
  }
};
