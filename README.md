# Code Micros Projects

Clean, minimal, product-focused portfolio for **https://projects.codemicros.com/**.

## What is included

- `index.html` — main portfolio page
- `project-data.js` — one central data file for every app/website/tool
- `script.js` — homepage cards, filters and theme switch
- `detail.js` — reusable project-detail rendering and screenshot viewer
- `projects/<slug>/index.html` — clean GitHub Pages URL for each project
- `styles.css` — complete responsive light + dark UI
- `CNAME` — already set to `projects.codemicros.com`
- `robots.txt` / `sitemap.xml` — SEO basics

## Project flow

Project cards intentionally **do not send visitors straight away from Code Micros**.

Example:

`projects.codemicros.com` → `projects.codemicros.com/projects/calqen-scientific-calculator/` → Google Play / live website

Each detail page includes:

- Product icon and summary
- Platform/category tags
- Official store / website buttons
- About the project
- Key features
- Real product screenshots
- Privacy and support links where available
- Related Code Micros projects
- Screenshot lightbox
- Matching light/dark theme

## Edit or add a project

Project content now lives in `project-data.js`. Add a new object with a unique `slug`.

After adding the object, duplicate one existing detail folder inside `projects/`, rename the folder to your new slug, and change only this line in that folder's `index.html`:

```html
<body class="detail-page" data-project-slug="your-new-slug">
```

The shared `detail.js` automatically builds the rest of the page from `project-data.js`.

## Preview locally

Because the project now uses directory URLs, preview it through a local server instead of double-clicking individual files.

With VS Code Live Server, open the repository root. Or run:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Publish on GitHub Pages

1. Create a GitHub repository, for example `code-micros-projects`.
2. Push everything in this folder to the repository root.
3. Open **GitHub → Settings → Pages**.
4. Choose **Deploy from a branch**.
5. Choose `main` and `/ (root)`.
6. The included `CNAME` already contains `projects.codemicros.com`.
7. In GoDaddy DNS add:
   - **Type:** CNAME
   - **Name/Host:** `projects`
   - **Value:** `<YOUR-GITHUB-USERNAME>.github.io`
8. After DNS resolves, enable **Enforce HTTPS** in GitHub Pages.

## Imagery

The portfolio uses real product imagery from the Code Micros sites and official store listings. These assets are referenced by their live URLs, so if you later rename or remove an asset on one of those sites, update the corresponding URL in `project-data.js`.

## Design rules kept

- No gradients
- No AI-generated artwork
- Same layout in light and dark themes
- Clean, minimal, product-first UI
- Main homepage structure unchanged
- No framework or build dependency
- Responsive desktop and mobile layout
# projects
