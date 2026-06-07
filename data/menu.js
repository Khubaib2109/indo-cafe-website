/*
  Indo Cafe editable website data
  --------------------------------
  To update the website, edit this file first.

  Common updates:
  - Change prices: edit lunchboxPrice or comboPrice
  - Change phone: edit phoneDisplay and phoneLink
  - Change address: edit addressHtml, mapsUrl and mapEmbedUrl
  - Change hours: edit openingHours
  - Change menu: edit menuItems
*/

window.INDO_CAFE_DATA = {
  businessName: "Indo Cafe",

  // Main offer details
  lunchboxPrice: "$10",
  comboPrice: "$13",
  offerDays: "Weekdays",
  lunchboxDescription: "Choose from curries, stir-fries, rice dishes and noodles.",
  comboDescription: "Lunchbox + curry puff or spring roll + can of soft drink.",
  foodNote: "Food is halal. Please ask staff about allergens before ordering.",
  foodNoteShort: "Halal food available",

  // Contact and location
  phoneDisplay: "0411 038 803",
  phoneLink: "+61411038803",
  shortLocation: "Canberra City",
  addressHtml: "Nesuto Apartments, Ground Floor<br />London Circuit, Canberra ACT 2601",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Indo%20Cafe%20Nesuto%20Apartments%20London%20Circuit%20Canberra",
  mapEmbedUrl: "https://www.google.com/maps?q=Indo%20Cafe%20Nesuto%20Apartments%20Ground%20Floor%20London%20Circuit%20Canberra%20ACT%202601&output=embed",

  // Homepage copy
  eyebrow: "Canberra City · Weekday lunch",
  heroTitle: "Indo Cafe",
  heroLead: "Indonesian lunchboxes in Canberra City.",
  quickLunchbox: "From $10",
  quickLunchboxText: "Curries, stir-fries, fried rice, noodles and vegetarian options.",
  quickComboText: "Add a curry puff or spring roll and a can of soft drink.",
  quickLocationText: "Ground floor of Nesuto Apartments on London Circuit.",
  aboutTitle: "Simple, filling, flavourful.",
  aboutCopy: `
    <p>Indo Cafe is a casual Canberra City lunch spot for people who want something warm, generous and full of flavour without overcomplicating lunch.</p>
    <p>The website keeps the essentials clear: menu, price, opening hours, location and allergen guidance.</p>
  `,
  comboIntro: "Choose your lunchbox, add one entrée, then pick up a can of soft drink.",
  menuIntro: "Lunchboxes are $10. The $13 combo includes one lunchbox, one curry puff or spring roll, and one can of soft drink.",
  allergenIntro: "Allergen notes on this website are a general guide only. Recipes and ingredients can change, and food may be prepared in a shared kitchen.",
  allergenDisclaimer: "Before launch, confirm each allergen note directly with Indo Cafe. Do not publish allergen information unless the business has checked it.",
  visitTitle: "Lunch on London Circuit.",
  visitText: "Find Indo Cafe on the ground floor of Nesuto Apartments in Canberra City.",
  finalCta: "Choose your lunchbox and visit Indo Cafe today.",
  footerTagline: "Indonesian lunchboxes in Canberra City.",
  footerNote: "Confirm menu and allergen details with the business before launch.",

  comboSteps: [
    {
      title: "Lunchbox",
      text: "Choose any available Indonesian lunchbox."
    },
    {
      title: "Entrée",
      text: "Curry puff or spring roll."
    },
    {
      title: "Drink",
      text: "Can of soft drink."
    }
  ],

  openingHours: [
    { day: "Monday", time: "11:00 am – 3:00 pm" },
    { day: "Tuesday", time: "11:00 am – 3:00 pm" },
    { day: "Wednesday", time: "11:00 am – 3:00 pm" },
    { day: "Thursday", time: "11:00 am – 3:00 pm" },
    { day: "Friday", time: "11:00 am – 3:00 pm" },
    { day: "Saturday", time: "Closed" },
    { day: "Sunday", time: "Closed" }
  ],

  commonAllergens: ["Peanut", "Soy", "Gluten", "Egg", "Coconut"],

  menuItems: [
    {
      name: "Rendang",
      price: "$10",
      description: "Spicy coconut curry with beef.",
      tags: ["Spicy"],
      tagStyle: "spicy",
      allergens: ["Coconut"],
      mayContain: ["Soy"]
    },
    {
      name: "Opor",
      price: "$10",
      description: "Coriander and coconut curry with chicken.",
      tags: ["Mild"],
      tagStyle: "mild",
      allergens: ["Coconut"],
      mayContain: ["Soy"]
    },
    {
      name: "Satay",
      price: "$10",
      description: "Peanut sauce with chicken or beef.",
      tags: ["Peanut sauce"],
      tagStyle: "",
      allergens: ["Peanut", "Soy"],
      mayContain: ["Gluten"]
    },
    {
      name: "Tumis",
      price: "$10",
      description: "Mild stir-fry with chicken, beef or vegetables.",
      tags: ["Mild", "Veg option"],
      tagStyle: "mild",
      allergens: ["Soy"],
      mayContain: ["Gluten"]
    },
    {
      name: "Semur",
      price: "$10",
      description: "Sweet soy pepper sauce with chicken or beef.",
      tags: ["Sweet soy"],
      tagStyle: "",
      allergens: ["Soy"],
      mayContain: ["Gluten"]
    },
    {
      name: "Sambal",
      price: "$10",
      description: "Hot stir-fry with chicken, beef or vegetables.",
      tags: ["Hot", "Veg option"],
      tagStyle: "spicy",
      allergens: ["Soy"],
      mayContain: ["Gluten"]
    },
    {
      name: "Nasi Goreng",
      price: "$10",
      description: "Fried rice with chicken, vegetables and fried egg.",
      tags: ["Fried rice"],
      tagStyle: "",
      allergens: ["Egg", "Soy"],
      mayContain: ["Gluten"]
    },
    {
      name: "Mie Goreng",
      price: "$10",
      description: "Fried egg noodles with chicken, vegetables and fried egg.",
      tags: ["Noodles"],
      tagStyle: "",
      allergens: ["Gluten", "Egg", "Soy"],
      mayContain: []
    },
    {
      name: "Gado-Gado",
      price: "$10",
      description: "Vegetable salad and tofu served with peanut dressing.",
      tags: ["Vegetarian"],
      tagStyle: "veg",
      allergens: ["Peanut", "Soy"],
      mayContain: ["Gluten"]
    },
    {
      name: "Tahu Campur",
      price: "$10",
      description: "Tofu and seasonal vegetable stir-fry.",
      tags: ["Vegetarian"],
      tagStyle: "veg",
      allergens: ["Soy"],
      mayContain: ["Gluten"]
    },
    {
      name: "Gulai",
      price: "$10",
      description: "Red coconut curry with chicken, lamb or vegetables.",
      tags: ["Coconut curry", "Veg option"],
      tagStyle: "veg",
      allergens: ["Coconut"],
      mayContain: ["Soy"]
    }
  ],

  popularItems: [
    {
      name: "Beef Rendang",
      description: "Rich coconut curry with a deeper, spicier finish.",
      imageLabel: "Rendang photo",
      alt: "Placeholder image for beef rendang lunchbox"
    },
    {
      name: "Chicken Satay",
      description: "A familiar favourite with savoury peanut sauce.",
      imageLabel: "Satay photo",
      alt: "Placeholder image for chicken satay lunchbox"
    },
    {
      name: "Nasi Goreng",
      description: "Fried rice with chicken, vegetables and fried egg.",
      imageLabel: "Nasi goreng photo",
      alt: "Placeholder image for nasi goreng lunchbox"
    }
  ]
};
