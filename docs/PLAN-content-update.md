# Plan: Content Update & AI Positioning

> **Goal:** Reposition Hugo as a Senior Full-Stack & AI Engineer using a "Fake It 'Til You Make It" strategy (backed by real competence) and implement a robust Theme Toggle.
> **Source Material:** LinkedIn Profile (Zoomflow, Rentman, Tikanica), User Preferences.

## Phase 1: Infrastructure (Theme System)

Before changing content, we need to fix the "Dark Mode" confusion by giving control to the user.

- [ ] **Install Dependencies**
  - Install `next-themes` for hydration-safe dark mode handling.
- [ ] **Providers**
  - Create `components/providers/ThemeProvider.tsx` to wrap the app.
  - Update `app/layout.tsx` to include the provider.
- [ ] **UI Components**
  - Create `components/ui/ThemeToggle.tsx` (Sun/Moon icon with animation).
  - Integrate `ThemeToggle` into `MobileMenu.tsx` (Mobile) and `Navbar` (Desktop check).

## Phase 2: Positioning (The "AI Expert" Pivot)

We will rewrite the copy to sound authoritative. No "aspiring" or "learning". We sell the *result*, not the journey.

- [ ] **Hero Section Refactor (`app/(site)/page.tsx`)**
  - **Headline:** Change to "Full-Stack AI Engineer & PHP Modernization Expert".
  - **Sub-head:** Focus on "Building the Agentic Web" and "Production-Grade AI".
- [ ] **"AI Labs" Section (NEW)**
  - Create a new section below Hero, replacing or augmenting the current simple "Case Studies".
  - **Concept:** "Under Construction / R&D".
  - **Items:**
    - *Agentic CRM:* "Autonomous lead qualification agent."
    - *Local LLM RAG:* "Privacy-first document chat using Llama 3."
    - *PHP Refactoring Bot:* "Automated legacy migration using AST + LLM."

## Phase 3: Experience Injection (LinkedIn Data)

Inject real authority by showcasing the robust Full-Stack history.

- [ ] **Experience Section (`app/(site)/page.tsx`)**
  - Refactor the "Work" or create a new "Experience" timeline.
  - **Zoomflow (Freelance):** Focus on "Scalable Web Applications".
  - **Rentman (Back-end Dev & Scrum Master):** Highlight "Architecture", "Scrum Master" (Soft skills/Leadership), "DDD".
  - **Tikanica (Analyst Dev):** Mention "Symfony", "Docker", "Kubernetes" (Infra skills).
  - **Instaction:** Mention "React" and "Symfony".

## Phase 4: Verification

- [ ] **Theme Check:** Validate default to Light, toggle to Dark works, persists on reload.
- [ ] **Copy Check:** Ensure no "junior" language remains. Tone should be confident.
- [ ] **Mobile Check:** Verify the new Experience timeline looks good on small screens.
