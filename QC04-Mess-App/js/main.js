import { initUI } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  initUI();

  setTimeout(() => {
    const splash = document.getElementById("splash");
    if (splash) splash.classList.add("hide");
  }, 1200);
});
