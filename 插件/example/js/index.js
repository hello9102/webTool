(function () {
  let Test = function (opt) {
    this.num1 = opt.num1;
    this.num2 = opt.num2;
    this.btnGroup = opt.btnGroup;
  };

  Test.prototype = {
    init: function () {
      this.bindEvent();
    },
    bindEvent: function () {
      let btns = this.btnGroup,
        _self = this;
      addEvent(btns, "click", function (e) {
        _self.compute.call(_self, e);
      });
    },

    compute: function (ev) {
      let e = ev || window.event,
        tar = e.target || e.srcElement,
        val1 = Number(this.num1.value),
        val2 = Number(this.num2.value),
        sign;
      sign = tar.getAttribute("data-sign");

      switch (sign) {
        case "plus":
          console.log(val1 + val2);
          break;
        case "minus":
          console.log(val1 - val2);
          break;
        case "mul":
          console.log(val1 * val2);
          break;
        case "div":
          console.log(val1 / val2);
          break;
        default:
          console.log("输入得数字有错");
          break;
      }
    },
  };

  window.Test = Test;
})();
