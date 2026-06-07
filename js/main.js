/*
  Indo Cafe website interactions and rendering
  --------------------------------------------
  Normal content is edited in Google Sheets.
  data/menu.js is still used as a fallback if the sheet cannot load.
*/

let siteData = { ...(window.INDO_CAFE_DATA || {}) };
const sheetConfig = window.INDO_CAFE_SHEETS || {};

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

function splitList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

/*
  Lightweight CSV parser.
  Handles normal Google Sheets CSV output, including quoted cells and commas inside quoted cells.
*/
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      cell += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") i += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  row.push(cell);
  rows.push(row);

  return rows.filter((r) => r.some((value) => String(value).trim() !== ""));
}

function rowsToObjects(rows) {
  if (!rows.length) return [];

  const headers = rows[0].map((header) => String(header).trim());

  return rows.slice(1).map((row) => {
    const object = {};
    headers.forEach((header, index) => {
      object[header] = row[index] ?? "";
    });
    return object;
  });
}

async function fetchCsvObjects(url) {
  if (!url) return [];

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Could not load CSV: ${response.status}`);
  }

  const text = await response.text();
  return rowsToObjects(parseCsv(text));
}

function showRow(row) {
  return String(row.Show || row.show || "yes").trim().toLowerCase() !== "no";
}

function buildDataFromSheets(sheetResults) {
  const nextData = { ...siteData };

  const settingsRows = sheetResults.settings || [];
  const menuRows = sheetResults.menu || [];
  const hoursRows = sheetResults.hours || [];
  const popularRows = sheetResults.popular || [];

  // Settings tab: Key | Value | Notes
  settingsRows.forEach((row) => {
    const key = String(row.Key || row.key || "").trim();
    const value = row.Value ?? row.value;

    if (key && value !== undefined && String(value).trim() !== "") {
      nextData[key] = String(value).trim();
    }
  });

  // Menu tab: Name | Price | Description | Tags | TagStyle | Allergens | MayContain | Show
  if (menuRows.length) {
    const visibleMenu = menuRows.filter(showRow).filter((row) => String(row.Name || "").trim());

    if (visibleMenu.length) {
      nextData.menuItems = visibleMenu.map((row) => ({
        name: String(row.Name || "").trim(),
        price: String(row.Price || nextData.lunchboxPrice || "").trim(),
        description: String(row.Description || "").trim(),
        tags: splitList(row.Tags),
        tagStyle: String(row.TagStyle || "").trim(),
        allergens: splitList(row.Allergens),
        mayContain: splitList(row.MayContain)
      }));
    }
  }

  // Hours tab: Day | Time
  if (hoursRows.length) {
    const visibleHours = hoursRows.filter((row) => String(row.Day || "").trim());

    if (visibleHours.length) {
      nextData.openingHours = visibleHours.map((row) => ({
        day: String(row.Day || "").trim(),
        time: String(row.Time || "").trim()
      }));
    }
  }

  // Popular tab: Name | Description | ImageLabel | Alt | Show
  if (popularRows.length) {
    const visiblePopular = popularRows.filter(showRow).filter((row) => String(row.Name || "").trim());

    if (visiblePopular.length) {
      nextData.popularItems = visiblePopular.map((row) => ({
        name: String(row.Name || "").trim(),
        description: String(row.Description || "").trim(),
        imageLabel: String(row.ImageLabel || row.Name || "").trim(),
        alt: String(row.Alt || `Placeholder image for ${row.Name}`).trim()
      }));
    }
  }

  // Keep common allergens fresh if they were not manually supplied.
  if (nextData.menuItems?.length) {
    const allergens = new Set(nextData.commonAllergens || []);
    nextData.menuItems.forEach((item) => {
      [...(item.allergens || []), ...(item.mayContain || [])].forEach((allergen) => allergens.add(allergen));
    });
    nextData.commonAllergens = [...allergens].filter(Boolean);
  }

  return nextData;
}

async function loadSheetData() {
  if (!sheetConfig.enabled) return;

  try {
    const [settings, menu, hours, popular] = await Promise.allSettled([
      fetchCsvObjects(sheetConfig.settingsCsv),
      fetchCsvObjects(sheetConfig.menuCsv),
      fetchCsvObjects(sheetConfig.hoursCsv),
      fetchCsvObjects(sheetConfig.popularCsv)
    ]);

    const sheetResults = {
      settings: settings.status === "fulfilled" ? settings.value : [],
      menu: menu.status === "fulfilled" ? menu.value : [],
      hours: hours.status === "fulfilled" ? hours.value : [],
      popular: popular.status === "fulfilled" ? popular.value : []
    };

    const hasAnySheetData = Object.values(sheetResults).some((rows) => rows.length > 0);
    if (!hasAnySheetData) return;

    siteData = buildDataFromSheets(sheetResults);
    renderSite();

    document.documentElement.dataset.sheetStatus = "loaded";
    console.info("Indo Cafe: loaded content from Google Sheets.");
  } catch (error) {
    document.documentElement.dataset.sheetStatus = "fallback";
    console.warn("Indo Cafe: Google Sheet content could not be loaded. Using local fallback data.", error);
  }
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

// Render local fallback immediately, then replace it with Google Sheets content if available.
renderSite();
loadSheetData();

if (year) {
  year.textContent = new Date().getFullYear();
}

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

if (header) {
  const setHeaderState = () => {
    header.classList.toggle("has-shadow", window.scrollY > 8);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });
}
