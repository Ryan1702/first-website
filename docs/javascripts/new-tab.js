/* 让「离开本站」的链接都在新标签页打开，避免丢掉当前页面
 * 覆盖两类：
 *   1. PDF 等文件链接（如 讲义、历年考题）
 *   2. 指向其他网站的外链（如 洛谷题目、GitHub）
 * 站内页面跳转和页内锚点不受影响。
 */
(function () {
  "use strict";

  function isFileLink(href) {
    return /\.(pdf|zip|rar|7z|docx?|xlsx?|pptx?|txt|md)(\?|#|$)/i.test(href);
  }

  function isExternalLink(anchor) {
    var href = anchor.getAttribute("href") || "";
    if (!/^https?:\/\//i.test(href)) return false;
    try {
      return new URL(href, location.href).hostname !== location.hostname;
    } catch (e) {
      return false;
    }
  }

  function apply() {
    var anchors = document.querySelectorAll("a[href]");
    Array.prototype.forEach.call(anchors, function (a) {
      if (a.target === "_blank") return;

      var href = a.getAttribute("href") || "";
      // 页内锚点不算
      if (href.charAt(0) === "#") return;

      if (isFileLink(href) || isExternalLink(a)) {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      }
    });
  }

  // Material 主题用 document$ 派发页面切换事件；没有就退回 DOMContentLoaded
  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(apply);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();
