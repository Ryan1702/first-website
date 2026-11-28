/* 给侧边栏测量顶栏与底栏的高度，写入 CSS 变量，
 * 让左右侧边栏的可滚动高度 = 视口高度 - 顶栏 - 底栏，滚到底时不会压到黑色底栏。
 */
(function () {
  "use strict";

  function update() {
    var header = document.querySelector(".md-header");
    var footer = document.querySelector(".md-footer");

    var headerH = header ? Math.round(header.getBoundingClientRect().height) : 0;
    var footerH = footer ? Math.round(footer.getBoundingClientRect().height) : 0;

    var root = document.documentElement;
    root.style.setProperty("--wyf-header-h", headerH + "px");
    root.style.setProperty("--wyf-footer-h", footerH + "px");
  }

  function init() {
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    // 字体加载完成后高度可能变化，再补一次
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(update);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("load", update);
})();
