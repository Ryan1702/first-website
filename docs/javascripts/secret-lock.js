/* 保密页面：输入密码后解锁正文
 * 说明：这是「前端密码门」，只能挡住随手点进来的人，
 * 页面内容在 HTML 里仍然是明文，不能当作真正的安全措施。
 */
(function () {
  "use strict";

  var PASSWORD = "siluqingxi";
  var STORAGE_KEY = "wyf-secret-unlocked";

  function unlock() {
    document.documentElement.classList.add("unlocked");
    document.querySelectorAll(".lock-gate").forEach(function (el) {
      el.style.display = "none";
    });
  }

  function init() {
    if (localStorage.getItem(STORAGE_KEY) === "1") {
      unlock();
      return;
    }

    var input = document.getElementById("lock-pass");
    var btn = document.getElementById("lock-btn");
    var msg = document.getElementById("lock-msg");
    if (!input || !btn) return;

    function tryUnlock() {
      if (input.value === PASSWORD) {
        localStorage.setItem(STORAGE_KEY, "1");
        unlock();
      } else if (msg) {
        msg.textContent = "密码不对，再试一次。";
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
