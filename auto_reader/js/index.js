let sTopBtn = document.getElementsByClassName("s-top-btn")[0],
  header = document.getElementsByClassName("list-hd")[0];

addEvent(window, "scroll", function () {
  let sTop = getScrollOffset().top;

  sTopBtn.style.display = sTop ? "block" : "none";
});

addEvent(sTopBtn, "click", function () {
  window.scroll(0, 0);
});

addEvent(header, "click", function () {
  window.scroll(0, 0);
});
