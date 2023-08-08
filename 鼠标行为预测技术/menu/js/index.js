window.onload = function () {
  init();
};

function init() {
  initMenu();
}

let initMenu = function () {
  let oMenu = document.getElementsByClassName("menu-wrap")[0],
    oMenuItems = oMenu.getElementsByClassName("main-item"),
    oSub = oMenu.getElementsByClassName("sub")[0],
    oSubItems = oSub.getElementsByClassName("sub-item"),
    menuLen = oMenuItems.length,
    subLen = oSubItems.length,
    menuItem,
    subItem,
    isInSub = false,
    isFirst = true,
    t = null,
    mousePoses = [];

  for (let i = 0; i < menuLen; i++) {
    menuItem = oMenuItems[i];
    addEvent(menuItem, "mouseenter", menuItemMouseEnter);
  }

  addEvent(oMenu, "mouseenter", function () {
    addEvent(document, "mousemove", mouseMove);
  });

  addEvent(oMenu, "mouseleave", menuMouseOut);

  addEvent(oSub, "mouseenter", function () {
    isInSub = true;
  });

  addEvent(oSub, "mouseleave", function () {
    isInSub = false;
  });

  function menuItemMouseEnter(ev) {
    let e = ev || window.event,
      tar = e.target || e.srcElement,
      thisIdx = Array.prototype.indexOf.call(oMenuItems, tar),
      posLen = mousePoses.length,
      lastPos = mousePoses[posLen - 2] || { x: 0, y: 0 }, // a
      curPos = mousePoses[posLen - 1] || { x: 0, y: 0 }, // p
      toDelay = doTimeout(lastPos, curPos);

    oSub.className = "sub";

    if (t) {
      clearTimeout(t);
    }

    if (!isFirst) {
      if (toDelay) {
        t = setTimeout(function () {
          if (isInSub) {
            return;
          }
          addActive(thisIdx);
        }, 300);
      } else {
        addActive(thisIdx);
      }
    } else {
      addActive(thisIdx);
      isFirst = false;
    }
  }

  function addActive(index) {
    rempoveAllActive();

    oMenuItems[index].className += " active";
    oSubItems[index].className += " active";
  }

  function rempoveAllActive() {
    for (let i = 0; i < menuLen; i++) {
      menuItem = oMenuItems[i];
      menuItem.className = "main-item";
    }

    for (let i = 0; i < subLen; i++) {
      subItem = oSubItems[i];
      subItem.className = "sub-item";
    }
  }
  function mouseMove(ev) {
    let e = ev || window.event;

    mousePoses.push({
      x: pagePos(e).X,
      y: pagePos(e).Y,
    });

    if (mousePoses.length >= 3) {
      mousePoses.shift();
    }
  }

  function menuMouseOut() {
    oSub.className += " hide";
    rempoveAllActive();
    removeEvent(document, "mousemove", mouseMove);
  }

  function doTimeout(lastPos, curPos) {
    let topLeft = {
      x: getStyles(oMenu, "width") + getStyles(oMenu, "margin-left"),
      y: getStyles(oMenu, "margin-top"),
    };

    let bottomLeft = {
      x: getStyles(oMenu, "width") + getStyles(oMenu, "margin-left"),
      y: getStyles(oMenu, "margin-top") + getStyles(oSub, "height"),
    };

    return pointInTriangle({ curPos, lastPos, topLeft, bottomLeft });
  }
};
