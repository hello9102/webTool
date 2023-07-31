(function () {
  let playing = false,
    t = null;

  let AutoReader = function (opt) {
    this.playBtn = opt.playBtn;
    this.sTopBtn = opt.sTopBtn;
    this.playImg = opt.playImg;
    this.pauseImg = opt.pauseImg;

    if (!this.playBtn || !this.sTopBtn || !this.playImg || !this.pauseImg) {
      console.log("对不起，4个配置项必须全部配置");
      return;
    }

    let _self = this;

    addEvent(this.sTopBtn, "click", function () {
      window.scroll(0, 0);
      clearInterval(t);
      _self.playBtn.style.backgroundImage = `url(${_self.playImg})`;
      playing = false;
    });

    addEvent(window, "scroll", function () {
      _self.sTopBtnShow.call(_self);
    });

    addEvent(this.playBtn, "click", function () {
      _self.setAutoPlay.call(_self);
    });
  };

  AutoReader.prototype = {
    setAutoPlay: function () {
      let _self = this,
        sTop = getScrollOffset().top,
        sHeight = getScrollSize().height,
        wHeight = getViewportSize().height;

      if (sHeight + 44 <= wHeight + sTop) {
        return;
      }

      if (!playing) {
        t = setInterval(function () {
          sTop = getScrollOffset().top;

          if (sHeight + 44 <= wHeight + sTop) {
            clearInterval(t);
            _self.playBtn.style.backgroundImage = `url(${_self.playImg})`;
            playing = false;
          } else {
            window.scrollBy(0, 10);
          }
        }, 1);
        _self.playBtn.style.backgroundImage = `url(${_self.pauseImg})`;
        playing = true;
      } else {
        clearInterval(t);
        _self.playBtn.style.backgroundImage = `url(${_self.playImg})`;
        playing = false;
      }
    },
    sTopBtnShow: function () {
      let sTop = getScrollOffset().top;

      this.sTopBtn.style.display = sTop ? "block" : "none";
    },
  };

  window.AutoReader = AutoReader;
})();
