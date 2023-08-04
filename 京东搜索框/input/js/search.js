window.onload = function () {
  init();
};

function init() {
  keySearch();
}

let keySearch = (function () {
  let searchKw = document.getElementById("J_search_kw"),
    autoKw = document.getElementById("J_autoKw"),
    recomKw = JSON.parse(document.getElementById("J_recomKw").innerText),
    kwOrder = 0,
    t = null;

  addEvent(searchKw, "focus", function () {
    clearInterval(t);
    autoKw.style.color = "#ccc";
  });

  addEvent(searchKw, "blur", function () {
    autoKwShow(this.value, true);
    t = setInterval(autoKwChange, 3000);
  });

  addEvent(searchKw, "input", function () {
    autoKwShow(this.value);
  });

  addEvent(searchKw, "propertychange", function () {
    autoKwShow(this.value);
  });

  function serAutoKws() {
    autoKwChange();
    t = setInterval(autoKwChange, 3000);
  }

  function autoKwChange() {
    let len = recomKw.length;
    autoKw.innerText = recomKw[kwOrder];

    kwOrder = kwOrder >= len - 1 ? 0 : kwOrder + 1;
  }

  function autoKwShow(val, isBlur = false) {
    console.log(val);
    if (val.length <= 0) {
      autoKw.className = "auto-kw show";
      autoKw.style.color = isBlur ? "#989898" : "#ccc";
    } else {
      autoKw.className = "auto-kw hide";
    }
  }

  return function () {
    serAutoKws();
  };
})();
