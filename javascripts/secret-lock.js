/* 保密页面：输入密码后解锁正文
 * 密码写在对应页面的 .lock-gate[data-password] 上，每个页面独立解锁。
 * 这是「前端密码门」，只能挡住随手点进来的人，页面内容在 HTML 里仍是明文。
 */
(function () {
  "use strict";

  function init() {
    var gate = document.querySelector(".lock-gate");
    if (!gate) return;

    var password = gate.getAttribute("data-password") || "";
    var key = "wyf-secret:" + location.pathname;

    function unlock() {
      document.documentElement.classList.add("unlocked");
      gate.style.display = "none";
    }

    if (localStorage.getItem(key) === "1") {
      unlock();
      return;
    }

    var input = document.getElementById("lock-pass");
    var btn = document.getElementById("lock-btn");
    var msg = document.getElementById("lock-msg");
    if (!input || !btn) return;

    function tryUnlock() {
      if (input.value === password) {
        localStorage.setItem(key, "1");
        unlock();
      } else {
        if (msg) msg.textContent = "密码不对，再试一次。";
        input.value = "";
        input.focus();
      }
    }

    btn.addEventListener("click", tryUnlock);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") tryUnlock();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
