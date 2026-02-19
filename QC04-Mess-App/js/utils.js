export function isNonVeg(item) {
  const keywords = [
    "chicken","egg","fish","mutton",
    "meat","biryani","pakoda egg"
  ];

  return keywords.some(word =>
    item.toLowerCase().includes(word)
  );
}

export function getCurrentMeal() {
  const now = new Date();
  const time = now.getHours() + now.getMinutes() / 60;

  if (time >= 7 && time < 10) return "breakfast";
  if (time >= 12.5 && time < 15) return "lunch";
  if (time >= 18 && time < 19) return "snacks";
  if (time >= 20 && time < 22) return "dinner";

  return null;
}

export function renderItems(text) {
  return text.split(",")
    .map(item => {
      const type = isNonVeg(item) ? "nonveg" : "veg";
      return `
        <span class="meal-item ${type}">
          <span class="dot"></span>
          ${item.trim()}
        </span>
      `;
    })
    .join("");
}
