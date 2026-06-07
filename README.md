# Indo Cafe Static Website

A clean, responsive static website for Indo Cafe, built with HTML, CSS and JavaScript only.

## File structure

```text
indo-cafe-website/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── README.md
```

## What to edit before launch

Open `index.html` and update:

- phone number: replace `02 0000 0000` and `+61200000000`
- address: confirm the exact address wording
- menu items and descriptions
- opening hours
- Google Maps links and embed query
- placeholder image blocks with real photos if available

Open `css/styles.css` and update:

- colours in the `:root` section
- fonts in the `:root` section
- spacing and border radius values if needed

## Run locally

Option 1: open `index.html` directly in your browser.

Option 2: run a local development server:

```bash
cd indo-cafe-website
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deploy

This site has no build step. It can be deployed to GitHub Pages, Cloudflare Pages, Netlify or any static hosting platform.
