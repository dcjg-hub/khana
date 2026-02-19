import { weekDays, menus } from "./data.js";
import { getCurrentMeal, renderItems } from "./utils.js";

let currentMenuType = localStorage.getItem("menuType") || "indian";
let currentDayIndex = new Date().getDay();

const dayTabsDiv = document.getElementById("dayTabs");
const menuDiv = document.getElementById("menu");
const indianBtn = document.getElementById("indianBtn");
const internationalBtn = document.getElementById("internationalBtn");

export function initUI() {
  renderDayTabs();
  switchMenu(currentMenuType);
  showDay(currentDayIndex);

  indianBtn.onclick = () => switchMenu("indian");
  internationalBtn.onclick = () => switchMenu("international");

  initSwipe();
}

function renderDayTabs() {
  dayTabsDiv.innerHTML = "";

  weekDays.forEach((day, index) => {
    const btn = document.createElement("button");
    btn.textContent = day.slice(0,3).toUpperCase();

    btn.addEventListener("click", () => {
      showDay(index);
      btn.scrollIntoView({ behavior:"smooth", inline:"center" });
    });

    dayTabsDiv.appendChild(btn);
  });
}

function showDay(index) {
  currentDayIndex = index;

  const todayIndex = new Date().getDay();
  const currentMeal =
    index === todayIndex ? getCurrentMeal() : null;

  const dayName = weekDays[index];
  const menu = menus[currentMenuType][dayName];

  document.querySelectorAll(".day-tabs button")
    .forEach((btn,i) =>
      btn.classList.toggle("active", i===index)
    );

  menuDiv.style.opacity="0";
  menuDiv.style.transform="translateX(10px)";

  menuDiv.innerHTML = `
    ${renderSection("🍳 Breakfast","breakfast","7:00 AM – 10:00 AM",menu.Breakfast,currentMeal)}
    ${renderSection("🍛 Lunch","lunch","12:30 PM – 3:00 PM",menu.Lunch,currentMeal)}
    ${renderSection("☕ Snacks","snacks","6:00 PM – 7:00 PM",menu.Snacks,currentMeal)}
    ${renderSection("🍽️ Dinner","dinner","8:30 PM – 10:00 PM",menu.Dinner,currentMeal)}
  `;

  setTimeout(()=>{
    menuDiv.style.opacity="1";
    menuDiv.style.transform="translateX(0)";
  },50);

  if (navigator.vibrate) navigator.vibrate(10);
}

function renderSection(title,type,time,data,currentMeal){
  return `
  <div class="section meal ${type} ${currentMeal===type?"current-meal":""}">
    <div class="meal-header">
      <h3>${title}</h3>
      <span class="time-badge">${time}</span>
    </div>
    <div class="meal-items">
      ${renderItems(data)}
    </div>
  </div>`;
}

function switchMenu(type){
  currentMenuType=type;
  localStorage.setItem("menuType",type);

  indianBtn.classList.toggle("active",type==="indian");
  internationalBtn.classList.toggle("active",type==="international");

  showDay(currentDayIndex);
}

function initSwipe(){
  let touchStartX=0;

  document.addEventListener("touchstart",e=>{
    touchStartX=e.touches[0].clientX;
  },{passive:true});

  document.addEventListener("touchend",e=>{
    const dx=e.changedTouches[0].clientX-touchStartX;

    if(Math.abs(dx)>60){
      if(dx<0 && currentDayIndex<6) showDay(currentDayIndex+1);
      if(dx>0 && currentDayIndex>0) showDay(currentDayIndex-1);
    }
  });
}
