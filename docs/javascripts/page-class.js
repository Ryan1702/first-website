/* 把当前路径的每一段都写成 <html> 的 class，方便按页面/按栏目写样式
 * 例如 /teaching/刷题合集/ 会得到 .page-teaching 和 .page-刷题合集
 * （中文段先做 decodeURIComponent，避免拿到 %E5%88%B7 这种编码）
 */
(function () {
  "use strict";
  var segs = location.pathname.split("/").filter(Boolean);
  segs.forEach(function (seg) {
    var name = seg;
    try {
      name = decodeURIComponent(seg);
    } catch (e) {
      /* 交给浏览器原始值 */
    }
    name = name.replace(/\s+/g, "-").replace(/[^\w\u4e00-\u9fa5-]/g, "");
    if (name) {
      document.documentElement.classList.add("page-" + name);
    }
  });
})();
