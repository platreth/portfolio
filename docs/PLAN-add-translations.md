# Implement Multi-language Support (EN, NL, FR)

This plan outlines the architecture for adding Dutch and French translations to the Zaamsflow portfolio using `next-intl`.

## User Review Required

> [!IMPORTANT]
> **URL Structure Change**: The site will move from `zaamsflow.com/` to `zaamsflow.com/en/`, `zaamsflow.com/nl/`, etc. The root URL will redirect to the preferred locale.

> [!QUESTION]
> **Blog Content**: The current blog posts are hardcoded. Do you want to:
> A) Use AI to translate all full articles now?
> B) Keep articles in English for now and only translate the UI (Navbar, Hero, Services)?
> *This plan assumes Option A (Infrastructure + Basic Translation), but full content review is needed.*

## Proposed Changes

### dependencies
- Install `next-intl`.

### Configuration
#### [NEW] [middleware.ts](file:///Users/hugoplatret/freelance/portfolio/middleware.ts)
- Implement `createMiddleware` from `next-intl/middleware`.
- Configure locales: `['en', 'nl', 'fr']`.
- Default locale: `en`.

#### [NEW] [i18n/request.ts](file:///Users/hugoplatret/freelance/portfolio/i18n/request.ts)
- Configure request-scoped translation loading.

#### [MODIFY] [next.config.ts](file:///Users/hugoplatret/freelance/portfolio/next.config.ts)
- Wrap configuration with `withNextIntl`.

### Content & Routing
#### [NEW] [messages/*.json](file:///Users/hugoplatret/freelance/portfolio/messages/en.json)
- Create `en.json`, `nl.json`, `fr.json`.
- Extract text from Hero, About, Services, Navbar, and Footer.

#### [MOVE] Refactor Page Structure
- Move `app/(site)/page.tsx` → `app/[locale]/page.tsx`.
- Move `app/blog/*` → `app/[locale]/blog/*`.
- Update `app/layout.tsx` to `app/[locale]/layout.tsx`.
- Establish a Root Layout for global providers if needed.

#### [MODIFY] [Navbar.tsx](file:///Users/hugoplatret/freelance/portfolio/components/ui/Navbar.tsx)
- Add a Language Switcher component.
- Replace hardcoded links with `Link` from `next-intl/navigation`.

### Data Layer
#### [NEW] [utils/blog-data.ts](file:///Users/hugoplatret/freelance/portfolio/utils/blog-data.ts)
- Extract `POSTS` constant from `app/blog/[slug]/page.tsx`.
- restructure to supported nested locales or localized fields.

## Verification Plan

### Automated
- Build project `npm run build` to ensure route structure is valid.

### Manual
1.  Visit `/` -> should redirect to `/en` (or browser default).
2.  Switch to `/nl` -> Verify Hero text is in Dutch.
3.  Switch to `/fr` -> Verify Hero text is in French.
4.  Navigate to Blog -> Verify URLs preserve the locale.
