/*
  Indo Cafe website interactions and rendering
  Most content is edited in data/menu.js.
*/

const siteData = window.INDO_CAFE_DATA || {};

const navToggle = document.querySelector('[data-nav-toggle]');
const primaryNav = document.querySelector('[data-primary-nav]');
const header = document.querySelector('[data-header]');
const year = document.querySelector('[data-year]');

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setTextContent() {
  document.querySelectorAll("[data-content]").forEach((element) => {
    const key = element.getAttribute("data-content");
    if (siteData[key] !== undefined) {
      element.textContent = siteData[key];
    }
  });
}

function setHtmlContent() {
  document.querySelectorAll("[data-html]").forEach((element) => {
    const key = element.getAttribute("data-html");
    if (siteData[key] !== undefined) {
      element.innerHTML = siteData[key];
    }
  });
}

function setLinks() {
  document.querySelectorAll('[data-link="maps"]').forEach((link) => {
    link.href = siteData.mapsUrl || "#";
  });

  document.querySelectorAll('[data-link="phone"]').forEach((link) => {
    link.href = `tel:${siteData.phoneLink || ""}`;
  });

  const mapIframe = document.querySelector("[data-map-iframe]");
  if (mapIframe && siteData.mapEmbedUrl) {
    mapIframe.src = siteData.mapEmbedUrl;
  }
}

function renderComboSteps() {
  const target = document.querySelector('[data-render="comboSteps"]');
  if (!target || !Array.isArray(siteData.comboSteps)) return;

  target.innerHTML = siteData.comboSteps.map((step, index) => `
    <article class="step-card">
      <span class="step-number">${index + 1}</span>
      <h3>${escapeHtml(step.title)}</h3>
      <p>${escapeHtml(step.text)}</p>
    </article>
  `).join("");
}

function getTagClass(label, itemStyle) {
  const normalised = String(label).toLowerCase();

  if (normalised.includes("spicy") || normalised.includes("hot")) return "tag-spicy";
  if (normalised.includes("mild")) return "tag-mild";
  if (normalised.includes("veg") || normalised.includes("vegetarian")) return "tag-veg";

  if (itemStyle === "spicy") return "tag-spicy";
  if (itemStyle === "mild") return "tag-mild";
  if (itemStyle === "veg") return "tag-veg";

  return "";
}

function formatAllergens(item) {
  const allergens = item.allergens || [];
  const mayContain = item.mayContain || [];

  if (!allergens.length && !mayContain.length) {
    return "Please ask staff.";
  }

  const containsText = allergens.length ? `<strong>Contains:</strong> ${escapeHtml(allergens.join(", "))}.` : "";
  const mayContainText = mayContain.length ? ` <span>May contain ${escapeHtml(mayContain.join(", "))}.</span>` : "";

  return `${containsText}${mayContainText}`;
}

function renderMenuItems() {
  const target = document.querySelector('[data-render="menuItems"]');
  if (!target || !Array.isArray(siteData.menuItems)) return;

  target.innerHTML = siteData.menuItems.map((item) => {
    const tags = (item.tags || []).map((tag) => {
      const tagClass = getTagClass(tag, item.tagStyle);
      return `<span class="tag ${tagClass}">${escapeHtml(tag)}</span>`;
    }).join("");

    return `
      <article class="menu-card">
        <div class="card-topline">
          <h3>${escapeHtml(item.name)}</h3>
          <span class="price">${escapeHtml(item.price || siteData.lunchboxPrice || "")}</span>
        </div>
        <p>${escapeHtml(item.description)}</p>
        ${tags ? `<div class="tag-row">${tags}</div>` : ""}
        <p class="allergen-line">${formatAllergens(item)}</p>
      </article>
    `;
  }).join("");
}

function renderPopularItems() {
  const target = document.querySelector('[data-render="popularItems"]');
  if (!target || !Array.isArray(siteData.popularItems)) return;

  target.innerHTML = siteData.popularItems.map((item) => `
    <article class="dish-card">
      <div class="dish-image placeholder-image" role="img" aria-label="${escapeHtml(item.alt)}">${escapeHtml(item.imageLabel)}</div>
      <div class="dish-card-body">
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.description)}</p>
      </div>
    </article>
  `).join("");
}

function renderAllergenList() {
  const target = document.querySelector('[data-render="allergenList"]');
  if (!target || !Array.isArray(siteData.commonAllergens)) return;

  target.innerHTML = siteData.commonAllergens
    .map((allergen) => `<span>${escapeHtml(allergen)}</span>`)
    .join("");
}

function renderOpeningHours() {
  const target = document.querySelector('[data-render="openingHours"]');
  if (!target || !Array.isArray(siteData.openingHours)) return;

  target.innerHTML = siteData.openingHours.map((entry) => `
    <div>
      <dt>${escapeHtml(entry.day)}</dt>
      <dd>${escapeHtml(entry.time)}</dd>
    </div>
  `).join("");
}

function renderSite() {
  setTextContent();
  setHtmlContent();
  setLinks();
  renderComboSteps();
  renderMenuItems();
  renderPopularItems();
  renderAllergenList();
  renderOpeningHours();
}

renderSite();

if (year) {
  year.textContent = new Date().getFullYear();
}

// Mobile navigation toggle with accessible aria-expanded state.
if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  primaryNav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;

    primaryNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!primaryNav.classList.contains("is-open")) return;

    primaryNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.focus();
  });
}

// Sticky header shadow after scrolling.
if (header) {
  const setHeaderState = () => {
    header.classList.toggle("has-shadow", window.scrollY > 8);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });
}
