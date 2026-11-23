/* 给 <html> 打一个按页面区分的 class，方便只针对某一页写样式
 * 例如 /teaching/ 会得到 .page-teaching
 */
(function () {
  "use strict";
  var path = location.pathname.replace(/\/+$/, "");
  var seg = path.substring(path.lastIndexOf("/") + 1) || "home";
  document.documentElement.classList.add("page-" + seg);
})();
