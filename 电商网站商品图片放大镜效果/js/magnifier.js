window.onload = function () {
  init();
};

function init() {
  initMagnifier();
}

let initMagnifier = function () {
  let oImgWrap = document.getElementsByClassName("img-wrap")[0],
    oMagWrap = oImgWrap.getElementsByClassName("mag-wrap")[0],
    oMagImg = oMagWrap.getElementsByClassName("mag-img")[0],
    magWidth = getStyles(oMagWrap, "width"),
    magHeight = getStyles(oMagWrap, "height"),
    imgX = getElemDocPosition(oImgWrap).left,
    imgY = getElemDocPosition(oImgWrap).top;

  addEvent(oImgWrap, "mouseover", function (e) {
    oMagWrap.className += " show";

    showMag(getXY(e).x, getXY(e).y);

    addEvent(document, "mousemove", mouseMove);
  });

  addEvent(oImgWrap, "mouseout", mouseOut);

  function mouseMove(e) {
    showMag(getXY(e).x, getXY(e).y, getXY(e).mouseX, getXY(e).mouseY);
  }

  function mouseOut() {
    oMagWrap.className = "mag-wrap";
    removeEvent(document, "mousemove", mouseMove);
  }

  function getXY(ev) {
    let e = ev || window.event;

    return {
      x: pagePos(e).X - imgX - magWidth / 2,
      y: pagePos(e).Y - imgY - magHeight / 2,
      mouseX: pagePos(e).X - imgX,
      mouseY: pagePos(e).Y - imgY,
    };
  }

  function showMag(x, y, mouseX, mouseY) {
    oMagWrap.style.left = x + "px";
    oMagWrap.style.top = y + "px";
    oMagImg.style.left = -x + "px";
    oMagImg.style.top = -y + "px";

    if (mouseX && mouseY) {
      if (
        mouseX < 0 ||
        mouseX > getStyles(oImgWrap, "width") ||
        mouseY < 0 ||
        mouseY > getStyles(oImgWrap, "height")
      ) {
        oMagWrap.className = "mag-wrap";
      }
    }
  }
};
