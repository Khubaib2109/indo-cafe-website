/*
  Google Sheets connection for Indo Cafe
  --------------------------------------
  The website loads this file first, then tries to fetch the four public CSV tabs.
  If Google Sheets fails, the site falls back to data/menu.js.
*/

window.INDO_CAFE_SHEETS = {
  enabled: true,

  // Assumed order from the links supplied:
  // 1. Settings, 2. Menu, 3. Hours, 4. Popular
  settingsCsv: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTWysRSD1oyLDcXNQHEASBct4rPwCmYaF1FLSmcLNUcOKs3908yYk7K0JuRU0ryxw/pub?gid=1020280127&single=true&output=csv",
  menuCsv: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTWysRSD1oyLDcXNQHEASBct4rPwCmYaF1FLSmcLNUcOKs3908yYk7K0JuRU0ryxw/pub?gid=1147068784&single=true&output=csv",
  hoursCsv: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTWysRSD1oyLDcXNQHEASBct4rPwCmYaF1FLSmcLNUcOKs3908yYk7K0JuRU0ryxw/pub?gid=998182446&single=true&output=csv",
  popularCsv: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTWysRSD1oyLDcXNQHEASBct4rPwCmYaF1FLSmcLNUcOKs3908yYk7K0JuRU0ryxw/pub?gid=1171003790&single=true&output=csv"
};
