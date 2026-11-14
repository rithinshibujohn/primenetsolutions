# PrimeNet Solutions FZC — Official Web Platform

Official website for **PrimeNet Solutions FZC**, an enterprise technology integrator and hardware supply partner based in Sharjah, United Arab Emirates.

## Overview

- **Core focus:** Enterprise networking, SIRA-compliant IP security & biometrics, server & storage arrays, web/e-commerce, invoicing software, and 24/7 IT AMC support.
- **Architecture:** Single self-contained `index.html` (inline Tailwind CSS + JS). Images, PDF and icons live under `logo/`, `asset/` and `brochure/`.
- **Stack:** Semantic HTML5, Tailwind CSS (compiled locally and inlined), 2D canvas particle field, vanilla JS. No runtime CSS/JS framework dependencies.
- **SEO:** `robots.txt` + `sitemap.xml`, JSON-LD `@graph` (Organization/LocalBusiness, WebSite, WebPage), Open Graph + Twitter cards.
- **Deployment:** GitHub Pages.

## Live preview

Once deployed via GitHub Pages:
`https://<your-username>.github.io/<repository-name>/`

## Repository structure

```text
├── index.html          # Complete single-page site
├── logo/               # Brand logo, favicon, apple-touch icon
├── asset/              # Social preview image (og-cover.jpg)
├── brochure/           # Enterprise product & services PDF
├── robots.txt
├── sitemap.xml
└── README.md
```

## Local development

Open `index.html` directly in a browser, or serve the folder:

```sh
python -m http.server 8765
```

Then visit http://localhost:8765/

## License

All rights reserved — PrimeNet Solutions FZC.
