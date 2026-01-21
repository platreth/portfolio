# PLAN-portfolio-completion

> **Goal:** Finalize the "Agentic" Portfolio skeleton, filling in critical missing sections and refining the UI for Mobile/Premium SEO.

## 1. Context & Objectives
- **Current State:** Skeleton exists (Hero, About, Bento). SEO Engine ready.
- **Missing:** Contact form, Blog pages, Case Study details, Mobile Nav, Assets.
- **Goal:** high E-E-A-T scores, perfect Core Web Vitals.

## 2. Socratic Questions (To Resolve)
> We need to lock these decisions before Phase 2.
1.  **Case Study UX:** Dedicated Pages (`/work/...`) vs Modals?
    *   *Recommendation:* **Dedicated Pages** for better SEO ranking surface.
2.  **Content Source:** MDX Files or Hardcoded Data?
    *   *Recommendation:* **MDX** (allows AI agents to write posts easily).
3.  **Icons:** Library choice?
    *   *Recommendation:* **Lucide React** (Standard, clean, lightweight).

## 3. Implementation Phases

### Phase 1: Assets & Core UI (The "Polish")
Fixing visual holes and mobile experience.
- [ ] **Asset Generation:** Create `public/grid.svg` (Simple SVG pattern).
- [ ] **Iconography:** Install `lucide-react`. Replace `->` with `<ArrowRight />`.
- [ ] **Mobile Navigation:** Create `MobileMenu` component (Sheet/Overlay) in `layout.tsx` or `Navbar`.

### Phase 2: Missing Sections (The "Meat")
 implementing the content promised in the Hero.
- [ ] **Contact Section:**
    - Create `components/Contact.tsx`.
    - Implement Semantic Form (HTML5 validation).
    - Add to `app/(site)/page.tsx`.
- [ ] **Blog Architecture (MDX):**
    - Install `next-mdx-remote` or configure `@next/mdx`.
    - Create `app/blog/page.tsx` (Archive with filtered list).
    - Create `app/blog/[slug]/page.tsx` (Article view with Typography plugin).
- [ ] **Case Study Architecture:**
    - Create `app/work/[slug]/page.tsx`.
    - Implement structured data for `Article` or `Product`.

### Phase 3: SEO Verification
- [ ] **Rich Results Test:** Validate JSON-LD output.
- [ ] **Metadata Audit:** Ensure `sitemap.xml` includes new Blog/Work routes.

## 4. Execution Order
1.  **Visuals:** Grid SVG + Icons + Mobile Menu.
2.  **Contact:** Finish the Homepage.
3.  **Blog:** Build the "Voice" (high E-E-A-T).
4.  **Work:** Build the "Proof" (Case Studies).
