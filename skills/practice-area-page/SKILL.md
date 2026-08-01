---
name: practice-area-page
description: "Standard for building a new single-topic practice-area landing page (e.g. an Arbitration sub-topic, or a new practice area sub-topic in another category) for the Ismail Ibrahim Alhosani Advocates & Legal Consultants website (serelldc.github.io/ISMAIL-IBRAHIM-ALHOSANI). Based on the completed pattern used for the 7 Arbitration pages (DIFC-LCIA, DIAC, Award Enforcement, Clause Drafting, Emergency Measures, International Arbitration, Institutional & Ad Hoc). Read this file BEFORE creating a new practice-area page. Update this file whenever the shared structure changes."
---

# Practice-Area Page Skill

This skill documents the exact, working pattern for a single-topic practice-area landing page on this site. It was reverse-engineered from the 7 completed Arbitration sub-pages and is the template to follow for any future practice-area sub-page (Arbitration or any other category — Family Law, Criminal Law, Civil Law, Commercial & Corporate Law, Real Estate Law, Labor & Employment Law, Inheritance Law, Company Formation, Construction Law, Banking Law, Intellectual Property Law, Maritime Law, Sports Law, etc.).

**Reference pages (live, working examples):**
- `difc-lcia-arbitration-lawyer-dubai.html` — legacy variant, see note in Section 6
- `diac-arbitration-lawyer-dubai.html` — standard template (recommended base to copy)
- `arbitration-award-enforcement-lawyer-dubai.html`
- `arbitration-clause-contract-drafting-lawyer-dubai.html`
- `emergency-interim-measures-lawyer-dubai.html`
- `international-arbitration-lawyer-dubai.html`
- `institutional-adhoc-arbitration-lawyer-dubai.html`

When creating a new page, **copy `diac-arbitration-lawyer-dubai.html` as the starting file**, not the DIFC-LCIA page (that one predates a few structural cleanups).

---

## 1. File naming

`[topic-slug]-lawyer-dubai.html` in kebab-case, saved at the repo root (same folder as `index.html`), e.g.:
- `diac-arbitration-lawyer-dubai.html`
- `arbitration-award-enforcement-lawyer-dubai.html`

Keep the slug descriptive and keyword-relevant (SEO) — it becomes the URL.

---

## 2. Page structure (in order)

Every page is a single self-contained `.html` file: inline `<style>`, inline `<script>`, no external CSS/JS files (matches the rest of the site).

1. **`<head>`**
   - Inline dark/light theme bootstrap script (reads `localStorage.alhosani_theme`, defaults `dark`)
   - `<title>` — `"[Page Title] | Ismail Ibrahim Alhosani Advocates & Legal Consultants"`
   - `<meta name="description">` — one-sentence, topic-specific summary (unique per page, not reused)
   - Google Fonts: Cinzel (headings), Montserrat (body), Noto Naskh Arabic (AR), Noto Sans SC (ZH)
   - Full `<style>` block — see Section 5, copy verbatim from an existing page
2. **`<body data-lang="en">`**
   a. **Chat widget** — fixed WhatsApp bubble, bottom-left
   b. **`<header>`** (sticky) — firm logo/name, "All Practice Areas" link, phone number (`tel:` link), "Contact" button, language switcher (5 buttons), theme toggle
   c. **Breadcrumb** — `Home › Practice Areas › [Category] › [Page Title]`
   d. **`<article>`**
      - `<h1>` page title
      - `<p class="lead">` intro paragraph (1–2 sentences, topic summary)
      - **CTA row (top)** — Book a Consultation + Message on WhatsApp
      - **Definition box** (`<div class="box">`) — gold left-border highlight, 1 paragraph defining "what a [topic] lawyer in Dubai does"
      - **2–3 body paragraphs** (`<p class="body-p">`) — context, firm's role, why it matters
      - **`<h2>` "How [Topic] Works"** — `<ol class="steps">` with exactly **6 numbered steps**, each `<strong>` title + description
      - **`<h2>` "When You Need a [Topic] Lawyer"** — `<ul class="scenario-list">` with exactly **6 scenario bullets** (▸ marker)
      - **`<h2>` "Services We Provide"** — `<ul class="service-list">` with exactly **7 service bullets** (✓ marker)
      - **`<h2>` "Frequently Asked Questions"** — `<div class="faq-list">` with exactly **5 `<details>/<summary>` FAQ items**
      - **CTA row (bottom)** — same two buttons repeated
   e. **`<footer>`** — credit line + email + back-to-homepage link (see Section 4)
   f. **`<script>`** — `I18N` object + `applyLanguage()` + `DOMContentLoaded` init (see Section 3)
   g. **`<script>`** — theme toggle logic (copy verbatim, unrelated to i18n)

Section counts (6 steps / 6 scenarios / 7 services / 5 FAQs) are the established convention — keep new pages consistent with this so the site reads uniformly across topics.

---

## 3. Language switcher system — how it works

**Do not build this from scratch.** Copy the two `<script>` blocks verbatim from `diac-arbitration-lawyer-dubai.html` and only edit the `I18N` object's content.

### `I18N` object
A single JS object keyed by language code, one block per language: `en`, `ar`, `zh`, `ru`, `de`.

```js
var I18N = {
en:{
  home:"Home", practice_areas:"Practice Areas", arbitration:"Arbitration", all_practice:"All Practice Areas",
  contact:"Contact", book:"Book a Consultation", whatsapp:"Message on WhatsApp",
  footer_firm:"Ismail Ibrahim Alhosani Advocates & Legal Consultants — Dubai, UAE | DET License No. 1210668.",
  footer_back:"Back to homepage",
  page_title:"...", lead:"...", box:"...",
  p1:"...", p2:"...", p3:"...",
  h2_how:"...",
  step1_t:"...", step1_d:"...", step2_t:"...", step2_d:"...", step3_t:"...", step3_d:"...",
  step4_t:"...", step4_d:"...", step5_t:"...", step5_d:"...", step6_t:"...", step6_d:"...",
  h2_when:"...",
  sc1:"...", sc2:"...", sc3:"...", sc4:"...", sc5:"...", sc6:"...",
  h2_services:"...",
  sv1:"...", sv2:"...", sv3:"...", sv4:"...", sv5:"...", sv6:"...", sv7:"...",
  h2_faq:"...",
  faq1_q:"...", faq1_a:"...", faq2_q:"...", faq2_a:"...", faq3_q:"...", faq3_a:"...",
  faq4_q:"...", faq4_a:"...", faq5_q:"...", faq5_a:"..."
},
ar:{ dir:"rtl", /* same keys, Arabic values */ },
zh:{ /* same keys, Chinese values */ },
ru:{ /* same keys, Russian values */ },
de:{ /* same keys, German values */ }
};
```

Only the `ar` block sets `dir:"rtl"` explicitly (all others default to `ltr` via the fallback in `applyLanguage`).

### `applyLanguage(lang)` function

```js
function applyLanguage(lang){
  var dict = I18N[lang] || I18N.en;
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var key = el.getAttribute('data-i18n');
    if(dict[key] !== undefined) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el){
    var key = el.getAttribute('data-i18n-placeholder');
    if(dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
  });
  document.body.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('dir', dict.dir || 'ltr');
  document.documentElement.setAttribute('lang', lang);
  document.querySelectorAll('[data-lang-btn]').forEach(function(btn){
    btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === lang);
  });
  try{ localStorage.setItem('alhosani_lang', lang); }catch(e){}
}
document.addEventListener('DOMContentLoaded', function(){
  var saved = 'en';
  try{ saved = localStorage.getItem('alhosani_lang') || 'en'; }catch(e){}
  applyLanguage(saved);
  document.querySelectorAll('[data-lang-btn]').forEach(function(btn){
    btn.addEventListener('click', function(){ applyLanguage(btn.getAttribute('data-lang-btn')); });
  });
});
```

**How it works:**
- Every translatable element in the HTML carries `data-i18n="key"` (for text content) or `data-i18n-placeholder="key"` (for input placeholders).
- `applyLanguage()` walks all `[data-i18n]` elements and swaps their `textContent` for the matching key in the selected language's dictionary.
- The selected language is persisted to `localStorage` under the key **`alhosani_lang`** (shared across the whole site — the homepage and all 7 arbitration pages use the same key, so a visitor's language choice carries over between pages).
- On page load, `DOMContentLoaded` reads `localStorage.alhosani_lang` (default `"en"`) and applies it immediately, then wires up the 5 language-switch buttons.
- This system is **duplicated independently in every page** (not a shared external JS file) — each page must have its own complete `I18N` object and its own copy of `applyLanguage()`.

### Critical rule: translate from the start, not after

**Write all 5 languages (EN/AR/中文/RU/DE) for every content key at the same time you write the English content — never publish a page with only English and "translate later."** Every single `data-i18n` key used in the HTML (title, lead, box, all 3 body paragraphs, all 6 step titles+descriptions, all 6 scenarios, all 7 services, all 5 FAQ Q&As, footer strings) must have a value in all 5 language blocks before the page is committed. A page with an incomplete `I18N` object will silently show blank/English fallback text in other languages — check every language switch visually before treating a page as done.

---

## 4. Contact info standard

Use these exact values everywhere contact info appears on a practice-area page. Do not use any other phone number, email, or address.

- **Phone:** `+971 50 338 9154` → `tel:+971503389154` (header link) and `https://wa.me/971503389154` (WhatsApp bubble + "Message on WhatsApp" buttons)
- **Email:** `advo@ismailibrahimalhos.com` (footer `mailto:` link)
- **Address:** Salem Building, Al Garhoud, Office 317, 3rd Floor, Dubai, UAE
- **Office Hours:** Sunday–Thursday, 9:00 AM – 6:00 PM
- **DET License No. 1210668** — appended to the footer credit line in every language (see exact strings below)

**Note on address / hours / Google Maps:** the full "Get in Touch" contact block (address, office hours, embedded Google Map) lives **only on the homepage** (`index.html#contact`). Practice-area sub-pages do **not** duplicate that block — they link out to it via `<a href="index.html#contact">` (the "Contact" nav link and "Book a Consultation" CTA buttons both point there). Do not embed a separate Google Map on a practice-area sub-page; keep contact/address/hours/map centralized on the homepage.

**Footer line (per language)** — pattern is `<firm name/tagline in that language>. | <DET license note in that language>`:

- EN: `Ismail Ibrahim Alhosani Advocates & Legal Consultants — Dubai, UAE | DET License No. 1210668.`
- AR: `إسماعيل إبراهيم الحوسني للمحاماة والاستشارات القانونية — دبي، الإمارات العربية المتحدة | رخصة DET رقم 1210668.`
- ZH: `Ismail Ibrahim Alhosani律师事务所 — 阿联酋迪拜 | DET许可证号1210668。`
- RU: `Ismail Ibrahim Alhosani Advocates & Legal Consultants — Дубай, ОАЭ | Лицензия DET № 1210668.`
- DE: `Ismail Ibrahim Alhosani Advocates & Legal Consultants — Dubai, VAE | DET-Lizenznummer 1210668.`

Footer HTML (identical structure on every page, only the `footer_firm` text differs by language):

```html
<footer>
<span data-i18n="footer_firm">Ismail Ibrahim Alhosani Advocates &amp; Legal Consultants — Dubai, UAE | DET License No. 1210668.</span> <a href="mailto:advo@ismailibrahimalhos.com">advo@ismailibrahimalhos.com</a> &middot; <a href="index.html" data-i18n="footer_back">Back to homepage</a>
</footer>
```

Remember: the `footer_firm` value is written **twice** in the file — once as the raw HTML `<span>` content (with `&amp;`) and once as the JS `I18N.en.footer_firm` string literal (with plain `&`). Both must be updated if this line ever changes.

---

## 5. CSS (copy verbatim)

The `<style>` block is identical across all 6 standard-template pages (DIAC, Award Enforcement, Clause Drafting, Emergency Measures, International Arbitration, Institutional & Ad Hoc). Copy it as-is from any of those pages — do not rewrite it. Key class reference:

| Class | Purpose |
|---|---|
| `.headwrap` / `.headlinks` | sticky header layout |
| `.breadcrumb` | breadcrumb trail under header |
| `.lead` | intro paragraph under `<h1>` |
| `.box` | gold-left-border definition callout |
| `.body-p` | standard body paragraph |
| `.cta-row` / `.cta-row.top` | button row (top variant has no top margin) |
| `.btn-primary` / `.btn-outline` | Book a Consultation (filled) / WhatsApp (outline) buttons |
| `.steps` | numbered "How it works" list (auto-numbered circles via `counter()`) |
| `.scenario-list` | ▸-marker "when you need" bullets |
| `.service-list` | ✓-marker "services" bullets |
| `.faq-list` | `<details>` accordion FAQ |
| `.lang-switch` | 5-button language switcher |
| `.theme-toggle` | light/dark mode toggle |
| `.chat-widget` / `.chat-bubble` | fixed WhatsApp bubble |

---

## 6. Legacy note — DIFC-LCIA page

`difc-lcia-arbitration-lawyer-dubai.html` was built before the pattern above was standardized and differs in a few ways: uses `const I18N` instead of `var I18N`, sets `dir:'ltr'`/`dir:'rtl'` explicitly in every language block (not just `ar`), and has its own slightly different footer_firm phrasing per language. It still works correctly and should not be rewritten just for consistency, but **new pages should follow the standard template (Section 2–5) above, not the DIFC-LCIA file.**

---

## 7. Content guidelines

- **Each page needs a genuinely unique angle.** Do not reuse sentences, paragraph structure, or phrasing across pages in the same category (e.g. don't let the Arbitration Clause Drafting page and the DIAC page read like find-and-replace copies of each other). Write the intro, body paragraphs, steps, scenarios, services, and FAQs fresh for each topic's actual substance. This matters for SEO (duplicate/near-duplicate content across pages on the same site can suppress rankings for all of them) and for genuinely being useful to a reader comparing pages.
- Keep the **6 steps / 6 scenarios / 7 services / 5 FAQs** counts consistent — this is now an established site convention.
- Meta `<title>` and `<meta name="description">` must be unique per page and reflect that page's specific topic, not a generic template sentence.
- All new body content must ship translated into all 5 languages at creation time (Section 3).

---

## 8. Checklist for creating a new practice-area page

1. Copy `diac-arbitration-lawyer-dubai.html` to the new filename (`[topic-slug]-lawyer-dubai.html`).
2. Update `<title>` and `<meta name="description">`.
3. Update breadcrumb: `Home › Practice Areas › [Category] › [Page Title]` (link the category page if one exists, e.g. `arbitration.html`).
4. Write unique EN content for: `page_title`, `lead`, `box`, `p1`–`p3`, 6 steps, 6 scenarios, 7 services, 5 FAQs.
5. Translate every one of those keys into AR, ZH, RU, DE — do this before committing, not after.
6. Confirm phone/email/footer values match Section 4 exactly (they should already be correct if copied from a post-update reference page).
7. Verify all CTA links (`index.html#contact`, `https://wa.me/971503389154`) and the `arbitration.html`/category breadcrumb link work.
8. Add the new page as a link from its category hub page (e.g. `arbitration.html`) and, if applicable, from `index.html`'s mega-menu.
9. Commit, then live-verify: load the page and switch through all 5 languages, confirming no blank/fallback text appears anywhere.
10. If this checklist or the shared structure changes, **update this SKILL.md to match.**
