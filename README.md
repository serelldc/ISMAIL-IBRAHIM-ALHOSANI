# Ismail Ibrahim Alhosani Advocates & Legal Consultants

Multi-file site (index.html + css/style.css + js/i18n.js + js/script.js) styled after professionallawyer.me:
topbar, hero slider, stats bar, about, why-choose-us, CTA banner, our approach, practice areas grid, testimonials, FAQ, contact, footer.
5 languages: Arabic (UAE), English, Chinese, Russian, German — flag + text switch in the top bar.

## What's a placeholder (fill in before publishing)
- Stats bar: "[X]+ years in practice" and "[X]+ cases handled" — real numbers not provided, need client input.
- Testimonials: 3 placeholder quotes — replace with real, permission-cleared client quotes.
- Contact: exact building/street name — only "Office 317, Dubai, UAE" was confirmed from the office plaque.
- Office hours — not provided yet.
- Advocate photo — placeholder box, add a real photo when available.

Everything else (practice areas, about text, why-choose-us, FAQ, contact email/phone) is real content, already filled in.

## Go live with GitHub Pages
1. Create a new GitHub repo (e.g. `alhosani-law-firm`) — Public.
2. "Add file → Upload files" → drag in the **whole folder contents**: `index.html`, the `css` folder, and the `js` folder (keep the same folder structure — don't flatten them).
3. Settings → Pages → Source → branch `main`, folder `/root` → Save.
4. Live URL: `https://<username>.github.io/alhosani-law-firm/` within a minute or two.

## Editing later
- Text/translations: open `js/i18n.js` — one block per language (`en`, `ar`, `zh`, `ru`, `de`), same keys throughout.
- Layout/colors: `css/style.css`.
- Behavior (slider, mobile menu, form): `js/script.js`.
No build step — just edit and re-upload the changed file.
