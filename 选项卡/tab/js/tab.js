(function () {
  let Tab = function (opt) {
    this.tabs = document.getElementsByClassName(opt.tabItem);
    this.pages = document.getElementsByClassName(opt.pageItem);
    this.bindClick(opt);
  };

  Tab.prototype = {
    bindClick: function ({ tabItem, pageItem, cur, active }) {
      let tab = this.tabs;
      let page = this.pages;
      let len = tab.length;

      for (let i = 0; i < len; i++) {
        (function (j) {
          tab[j].onclick = function () {
            for (let k = 0; k < len; k++) {
              tab[k].className = tabItem;
              page[k].className = pageItem;
            }

            page[j].className += " " + cur;
            this.className += " " + active;
          };
        })(i);
      }
    },
  };
  window.Tab = Tab;
})();
