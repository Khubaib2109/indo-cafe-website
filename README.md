[README.md](https://github.com/user-attachments/files/28675602/README.md)
# Indo Cafe Website — Editable Version

This is a static HTML/CSS/JS website for Indo Cafe.

## Most updates should be made in this file

```text
data/menu.js
```

That file controls:

- business name
- phone number
- address
- map links
- lunchbox price
- combo price
- menu items
- menu descriptions
- tags
- allergens
- opening hours
- popular items
- homepage copy

## File structure

```text
indo-cafe-website/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── data/
│   └── menu.js
├── README.md
└── .nojekyll
```

## How to update the lunchbox price

Open:

```text
data/menu.js
```

Find:

```js
lunchboxPrice: "$10",
```

Change it, for example:

```js
lunchboxPrice: "$11",
```

If individual menu cards also use the old price, update each `price` field in `menuItems`.

## How to update the combo price

Find:

```js
comboPrice: "$13",
```

Change it to the new price.

## How to update the phone number

Find:

```js
phoneDisplay: "0411 038 803",
phoneLink: "+61411038803",
```

Use a readable version for `phoneDisplay` and the international no-spaces version for `phoneLink`.

## How to add a menu item

Add a new object inside `menuItems`, for example:

```js
{
  name: "New Dish",
  price: "$10",
  description: "Short dish description.",
  tags: ["Mild", "Veg option"],
  tagStyle: "mild",
  allergens: ["Soy"],
  mayContain: ["Gluten"]
}
```

## Important

Confirm menu, halal wording, opening hours and allergen information with the business before launch.


## Version 5 changes

This version has a clearer hero with Indo Cafe as the main headline, a more compact menu grid, smaller cards, and subtle angled section transitions.


## Google Sheets setup

The website now loads content from the published Google Sheet CSV links in:

```text
data/sheet-config.js
```

The local fallback remains in:

```text
data/menu.js
```

Normal workflow:
1. Edit the Google Sheet.
2. Wait a few minutes for Google to republish the CSV.
3. Refresh the website.

If Google Sheets cannot be loaded, the site uses `data/menu.js` instead.
