# Requirements Document

## Introduction

FM Wood Packers requires a complete premium redesign of their existing React/Tailwind/GSAP website to position the brand as a high-end industrial packaging company. The redesign targets a ₹2,00,000+ professional build quality — comparable in polish and hierarchy to brands like Herman Miller, Caterpillar, and Volvo Construction Equipment — while reusing existing data files (services.js, projects.js, testimonials.js, team.js) and preserving admin pages (AdminLogin.jsx, AdminDashboard.jsx). All code must be JavaScript only (no TypeScript), and use the pre-installed stack: React 19, Tailwind CSS v4, GSAP 3.15 with ScrollTrigger, Framer Motion, React Icons, React CountUp, Axios, and React Router DOM.

## Glossary

- **Website**: The FM Wood Packers frontend React application located at `frontend/src`
- **Design_System**: The shared color palette, typography, spacing, and component tokens defined in `index.css` under `@theme`
- **GSAP**: GreenSock Animation Platform v3.15.0 — used for all scroll-triggered and entrance animations
- **ScrollTrigger**: GSAP plugin for scroll-based animation control
- **Premium_Color_Palette**: Primary `#5B3A29` (Wood Brown), Secondary `#1F2937` (Charcoal), Accent `#C9A227` (Luxury Gold), Background `#FFFFFF`, Section Background `#F8F9FA`
- **Navbar**: The sticky top navigation component (`Navbar.jsx`)
- **Hero_Section**: The full-screen landing section at the top of the Home page
- **Services_Section**: The grid of service offering cards
- **Why_Choose_Section**: The icon grid showcasing company strengths
- **Stats_Section**: The animated counters section
- **Project_Showcase**: The horizontal-scroll project portfolio section
- **Gallery**: The masonry image grid with lightbox
- **Testimonials**: The testimonial slider component
- **CTA_Section**: Call-to-action banner component
- **Footer**: The dark premium footer component
- **Page_Hero**: Reusable inner-page hero banner with breadcrumb
- **Data_Files**: Existing `services.js`, `projects.js`, `testimonials.js`, `team.js` — must not be modified
- **Admin_Pages**: `AdminLogin.jsx` and `AdminDashboard.jsx` — must not be modified
- **ISPM-15**: International Standards for Phytosanitary Measures No. 15 — the wood packaging certification
- **Lightbox**: Full-screen overlay modal for viewing gallery images
- **Poppins**: Google Font used for all headings (ExtraBold / Black weight)
- **Inter**: Google Font used for all body text
- **Section_Background**: `#F8F9FA` — used for alternating section backgrounds

---

## Requirements

---

### Requirement 1: Design System Update

**User Story:** As a developer, I want the global CSS design tokens updated to the new Premium_Color_Palette and typography, so that all components automatically inherit the correct brand colours and fonts.

#### Acceptance Criteria

1. THE Design_System SHALL define `--color-primary` as `#5B3A29`, `--color-secondary` as `#1F2937`, `--color-accent` as `#C9A227`, and `--color-section` as `#F8F9FA` inside the `@theme` block in `index.css`.
2. THE Design_System SHALL define `--font-heading` as `'Poppins', sans-serif` and `--font-body` as `'Inter', sans-serif`.
3. THE Design_System SHALL import both Poppins (weights 400, 600, 700, 800, 900) and Inter (weights 300, 400, 500, 600, 700) from Google Fonts via `@import url(...)`.
4. THE Design_System SHALL expose Tailwind utility aliases (`text-primary`, `text-accent`, `bg-primary`, `bg-accent`, `bg-section`, `text-secondary`, `bg-secondary`) for all defined color tokens.
5. WHEN the design system changes, THE Website SHALL reflect updated colors and fonts across all pages without per-component color overrides.

---

### Requirement 2: Premium Sticky Navbar

**User Story:** As a visitor, I want a polished sticky navbar that transitions from transparent to frosted-glass on scroll, so that navigation feels premium and always accessible.

#### Acceptance Criteria

1. THE Navbar SHALL be fixed to the top of the viewport with `z-index` high enough to overlay all page content.
2. WHEN the page scroll position is 0, THE Navbar SHALL display with a fully transparent background.
3. WHEN the page scroll position exceeds 30px, THE Navbar SHALL transition to a `backdrop-blur` frosted-glass background with a subtle bottom border.
4. THE Navbar SHALL display a logo mark (FM initials in a square badge with gold text on primary brown background) and the brand name "FM Wood Packers" with tagline "Premium Packaging" in gold.
5. THE Navbar SHALL render navigation links: Home, About, Services, Projects, Gallery, Contact — each in uppercase, bold, small-caps style.
6. WHEN a navigation link matches the current active route, THE Navbar SHALL display that link in gold (`--color-accent`) with an animated gold underline indicator.
7. THE Navbar SHALL display a "Get Free Quote" CTA button styled as a filled primary-brown button with gold border.
8. WHEN the viewport width is below 1024px, THE Navbar SHALL hide desktop links and show a hamburger icon toggle.
9. WHEN the hamburger icon is activated, THE Navbar SHALL slide down a full-width mobile menu with all navigation links and the CTA button.
10. THE Navbar SHALL display a top info bar with phone number and email on screens wider than 768px that collapses when the user scrolls.
11. IF a smooth transition duration is applied, THEN THE Navbar SHALL complete background transitions within 300ms using `cubic-bezier(0.4, 0, 0.2, 1)`.

---

### Requirement 3: Full-Screen Hero Section

**User Story:** As a visitor, I want a visually striking full-screen hero section with rich animations, so that FM Wood Packers immediately communicates a premium brand.

#### Acceptance Criteria

1. THE Hero_Section SHALL occupy 100% of the viewport height (`min-h-screen`) and center its content vertically.
2. THE Hero_Section SHALL use a two-column grid on desktop — left column containing headline, subheading, and CTAs; right column containing a featured industrial image.
3. THE Hero_Section SHALL display a headline using Poppins ExtraBold at minimum `text-5xl` on desktop, with gradient text spans using the Premium_Color_Palette.
4. THE Hero_Section SHALL display a subheading paragraph in Inter at `text-lg` with relaxed line height.
5. THE Hero_Section SHALL render two CTA buttons: "Get Free Quote" (primary filled) and "Explore Services" (outline) side by side.
6. WHEN the page loads, THE Hero_Section SHALL animate the headline sliding up from `y: 60` with `opacity: 0` to its natural position using GSAP with `power3.out` easing.
7. WHEN the page loads, THE Hero_Section SHALL animate the subheading fading in with a 0.3s delay after the headline animation starts.
8. WHEN the page loads, THE Hero_Section SHALL animate the CTA buttons staggering in from left to right with a 0.15s stagger interval.
9. WHEN the page loads, THE Hero_Section SHALL animate the right-side image sliding in from the right (`x: 100`) and performing a slow zoom-in from `scale: 1.05` to `scale: 1`.
10. THE Hero_Section SHALL display a subtle decorative background pattern (radial dot grid) at low opacity.
11. WHEN the viewport width is below 1024px, THE Hero_Section SHALL display only the left column content (no image column) and reduce font sizes responsively.

---

### Requirement 4: Services Section with Premium Cards

**User Story:** As a visitor, I want to see all packaging services displayed as premium cards with hover effects, so that I can quickly understand FM Wood Packers' offerings.

#### Acceptance Criteria

1. THE Services_Section SHALL display all services from `services.js` using `ServiceCard` components in a responsive grid (1 column mobile, 2 columns tablet, 3 columns desktop for the Services page; 2 columns on the Home page preview).
2. EACH ServiceCard SHALL display the service icon, title, short description, a top accent line on hover, and an "Explore Service" button.
3. WHEN a ServiceCard is hovered, THE ServiceCard SHALL lift (`translateY: -8px`), increase box-shadow with a gold glow, and reveal the top accent gradient line.
4. WHEN the Services_Section enters the viewport, THE Website SHALL stagger-animate all ServiceCards from `y: 60, opacity: 0` to their natural positions using GSAP ScrollTrigger with 0.15s stagger.
5. THE Services_Section SHALL include a `SectionHeading` with subtitle label and main title.
6. THE Home page Services_Section SHALL include a "View All Services" outline button linking to `/services`.
7. THE Services page SHALL display a `PageHero` banner above the services grid.
8. THE Services page SHALL display each service with an expanded card including features list and benefits list, in addition to the base ServiceCard layout.

---

### Requirement 5: Why Choose Us Section

**User Story:** As a visitor, I want to see FM Wood Packers' key differentiators displayed in a premium icon grid, so that I can quickly evaluate why to choose this company.

#### Acceptance Criteria

1. THE Why_Choose_Section SHALL display 6 feature cards covering: ISPM-15 Certified, High Quality Timber, Custom Solutions, Fast Delivery, Affordable Pricing, Experienced Team.
2. EACH feature card SHALL display a relevant icon, bold title, and short description paragraph.
3. WHEN a feature card is hovered, THE feature card SHALL lift slightly and display a gold glow border using `hover-gold-glow` CSS class.
4. WHEN the Why_Choose_Section enters the viewport, THE Website SHALL individually animate each card from `y: 40, opacity: 0` using GSAP ScrollTrigger with a 0.1s stagger.
5. THE Why_Choose_Section SHALL use a 2-column layout on tablet and 3-column layout on desktop.

---

### Requirement 6: Statistics Section with Animated Counters

**User Story:** As a visitor, I want to see key company statistics animate as I scroll to them, so that the numbers feel impactful and memorable.

#### Acceptance Criteria

1. THE Stats_Section SHALL display 4 counters: 10+ Years Experience, 500+ Projects Completed, 200+ Happy Clients, 100% Quality Assurance.
2. EACH counter card SHALL display a relevant icon, the animated numeric value with suffix, and a label.
3. WHEN a counter card's trigger element enters the viewport, THE counter SHALL animate from 0 to its target value using GSAP `textContent` tween with `power2.out` easing over 1.8 seconds.
4. THE Stats_Section SHALL use a 2-column layout on mobile and 4-column layout on desktop.
5. EACH counter card SHALL display a hover lift animation with gold accent border when hovered.

---

### Requirement 7: Project Showcase with Horizontal Scroll

**User Story:** As a visitor, I want to browse featured projects in a horizontal scrolling showcase on desktop, so that the portfolio feels dynamic and premium.

#### Acceptance Criteria

1. THE Project_Showcase SHALL display on screens wider than 768px as a horizontal-scroll section pinned by GSAP ScrollTrigger.
2. WHEN the user scrolls vertically through the Project_Showcase section, THE Website SHALL translate the project cards track horizontally using GSAP `scrub: 1` ScrollTrigger.
3. THE Project_Showcase SHALL display the first 6 projects from `projects.js` as `ProjectCard` components, each with a fixed width of 480px and height of 520px.
4. THE Project_Showcase SHALL display a final "call to action" card at the end of the track inviting users to view all case studies, linking to `/projects`.
5. WHEN the viewport width is 768px or below, THE Project_Showcase SHALL switch to a vertical grid layout with standard cards (no horizontal scroll), showing the first 4 projects.
6. EACH ProjectCard SHALL display the project image, title, industry badge, and a brief description.
7. WHEN a ProjectCard is hovered, THE ProjectCard image SHALL zoom in slightly (`scale: 1.05`) and an overlay SHALL fade in with project details.

---

### Requirement 8: Gallery with Masonry Layout and Lightbox

**User Story:** As a visitor, I want to browse the company's work gallery in a masonry grid with a lightbox viewer, so that I can appreciate the quality of packaging work.

#### Acceptance Criteria

1. THE Gallery SHALL display images from `public/` in a CSS masonry or multi-column grid layout on the Gallery page.
2. WHEN the Gallery page loads, THE Gallery SHALL stagger-reveal all images from `opacity: 0, scale: 0.95` using GSAP ScrollTrigger.
3. WHEN a gallery image is hovered, THE Gallery image SHALL zoom in (`scale: 1.08`) with a smooth 300ms transition and display an overlay icon.
4. WHEN a gallery image is clicked, THE Lightbox SHALL open displaying the full-resolution image with a dark overlay background.
5. THE Lightbox SHALL display previous/next navigation buttons to cycle through gallery images.
6. WHEN the Lightbox is open and the user presses the Escape key, THE Lightbox SHALL close.
7. IF the Lightbox overlay background is clicked, THEN THE Lightbox SHALL close.
8. THE Gallery page SHALL display a `PageHero` banner above the gallery grid.

---

### Requirement 9: About Page with Luxury Brand Story Layout

**User Story:** As a visitor, I want to read FM Wood Packers' company story in a premium editorial layout, so that I can build trust with the brand.

#### Acceptance Criteria

1. THE About page SHALL display a `PageHero` banner at the top.
2. THE About page SHALL display a two-column story section with left text content (company history, certifications checklist) and right image with experience badge overlay.
3. WHEN the story section enters the viewport, THE Website SHALL animate the left text column sliding in from `x: -60, opacity: 0` and the right image from `x: 80, opacity: 0` using GSAP ScrollTrigger.
4. THE About page SHALL display a Mission card (light background) and Vision card (dark charcoal background) side by side.
5. THE About page SHALL display a vertical timeline section using `companyTimeline` data from `team.js`.
6. THE About page SHALL display a values grid using `companyValues` data from `team.js` with icon, title, and description cards.
7. THE About page SHALL display a team section using `team` data from `team.js` with name, position, and description hover overlay.
8. WHEN team cards enter the viewport, THE Website SHALL stagger-animate them from `y: 40, opacity: 0` using GSAP ScrollTrigger.

---

### Requirement 10: Testimonials Slider

**User Story:** As a visitor, I want to read client testimonials in a smooth, auto-playing slider, so that I can feel confident in FM Wood Packers' reputation.

#### Acceptance Criteria

1. THE Testimonials component SHALL render all 5 testimonials from `testimonials.js`.
2. THE Testimonials component SHALL auto-advance to the next testimonial every 4 seconds.
3. WHEN the user clicks a navigation dot indicator, THE Testimonials component SHALL navigate to the corresponding testimonial.
4. EACH testimonial card SHALL display the client name, company, position, review text, and a star rating (5 stars).
5. WHEN transitioning between testimonials, THE Testimonials component SHALL animate the outgoing card fading out and the incoming card fading in or sliding in smoothly.
6. THE Testimonials component SHALL pause auto-advance while the user hovers over the slider.

---

### Requirement 11: Contact Page with Form and Map

**User Story:** As a prospective client, I want to contact FM Wood Packers through a professional form with company info and a map, so that I can initiate a business inquiry easily.

#### Acceptance Criteria

1. THE Contact page SHALL display a `PageHero` banner at the top.
2. THE Contact page SHALL display a contact form with fields: Name, Email, Phone, Company (optional), Service Required (dropdown), Message — all with premium input styling.
3. WHEN the contact form is submitted with valid data, THE Website SHALL POST the form data to the backend API endpoint `/api/contact` using Axios.
4. WHEN the API responds with success, THE Website SHALL display a success notification and reset the form.
5. IF the API returns an error, THEN THE Website SHALL display an error notification without clearing the form.
6. THE Contact page SHALL display company contact information: address, phone, email, business hours in a styled info panel.
7. THE Contact page SHALL embed a Google Maps iframe showing the company location.
8. WHEN a contact form field receives focus, THE input SHALL display a gold `box-shadow` focus ring using the `input-premium` CSS class.

---

### Requirement 12: Get Quote Page

**User Story:** As a prospective client, I want to submit a detailed quote request with packaging specifications, so that FM Wood Packers can provide a tailored proposal.

#### Acceptance Criteria

1. THE GetQuote page SHALL display a `PageHero` banner at the top.
2. THE GetQuote page SHALL display a multi-field form: Name, Email, Phone, Company, Service Type (dropdown from services), Product Description, Dimensions/Weight, Quantity, Delivery Timeline, Special Requirements (textarea).
3. WHEN the quote form is submitted with valid data, THE Website SHALL POST the data to `/api/quotes` using Axios.
4. WHEN the API responds with success, THE Website SHALL display a premium success state with a confirmation message and an option to submit another quote.
5. IF any required form field is empty on submit, THEN THE Website SHALL display inline validation error messages below the relevant fields.

---

### Requirement 13: Premium Dark Footer

**User Story:** As a visitor reaching the bottom of any page, I want to see a premium dark footer with all important links and contact info, so that navigation remains accessible and the brand feels complete.

#### Acceptance Criteria

1. THE Footer SHALL use a dark charcoal (`#1F2937` or close equivalent) background with white text.
2. THE Footer SHALL display 4 columns on desktop: Company info (logo + description + social icons), Navigation links, Services links, Contact info.
3. THE Footer SHALL display the FM logo mark, brand name, tagline, and a brief company description.
4. THE Footer SHALL display social media icon buttons (Facebook, LinkedIn, Instagram, Twitter) with hover transition to gold background.
5. THE Footer SHALL display a bottom bar with copyright text and a scroll-to-top button.
6. WHEN the scroll-to-top button is clicked, THE Website SHALL smooth-scroll to the top of the page.
7. WHEN the viewport is below 768px, THE Footer SHALL stack all columns vertically.

---

### Requirement 14: Reusable Page Hero Component

**User Story:** As a developer, I want a reusable `PageHero` component for inner pages, so that every page has a consistent branded header with breadcrumb.

#### Acceptance Criteria

1. THE Page_Hero component SHALL accept `title`, `subtitle`, and `breadcrumb` props.
2. THE Page_Hero component SHALL display the title in Poppins ExtraBold at `text-4xl` minimum.
3. THE Page_Hero component SHALL display a breadcrumb trail showing "Home > [Page Name]".
4. THE Page_Hero component SHALL use a dark charcoal or primary-brown background with a subtle pattern overlay.
5. WHEN the Page_Hero mounts, THE Page_Hero SHALL animate its title from `y: 30, opacity: 0` to natural position using GSAP with `power3.out` easing.

---

### Requirement 15: CTA Section Component

**User Story:** As a developer, I want a reusable CTA section component that can appear at the bottom of pages, so that every page drives visitors toward quote requests.

#### Acceptance Criteria

1. THE CTA_Section component SHALL accept `headline`, `subtitle`, and `buttonText` props.
2. THE CTA_Section component SHALL display a visually distinct dark-background section with contrasting gold or white text.
3. THE CTA_Section component SHALL render a prominently styled button linking to `/get-quote`.
4. WHEN the CTA_Section enters the viewport, THE CTA_Section SHALL fade-in or slide-up using GSAP ScrollTrigger.

---

### Requirement 16: Scroll-Based Reveal Animations (Global)

**User Story:** As a visitor, I want sections and components to animate into view as I scroll, so that the website feels dynamic and premium throughout.

#### Acceptance Criteria

1. THE Website SHALL register `ScrollTrigger` with GSAP at the application root level.
2. WHEN any scroll-based GSAP animation's trigger enters the viewport, THE animation SHALL use `toggleActions: 'play none none none'` so it fires only once.
3. THE Website SHALL clean up all GSAP ScrollTrigger instances on component unmount to prevent memory leaks.
4. WHEN component animations are defined, THE Website SHALL use `gsap.context()` scoping or explicit `.kill()` calls on cleanup to prevent cross-component animation conflicts.
5. ALL scroll-based reveal animations SHALL use `start: 'top bottom-=100'` or similar offset to trigger slightly before the element fully enters the viewport.

---

### Requirement 17: Responsive Design

**User Story:** As a visitor on any device, I want the website to display correctly and beautifully on mobile, tablet, desktop, and large screens, so that the experience is consistent.

#### Acceptance Criteria

1. THE Website SHALL use Tailwind CSS responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) throughout all layouts.
2. THE Website SHALL display a single-column layout for all major sections on viewport widths below 640px.
3. THE Website SHALL hide the horizontal project scroll section on viewport widths below 768px and display a vertical grid fallback instead.
4. THE Website SHALL display a hamburger mobile menu on viewport widths below 1024px.
5. THE Website SHALL use `overflow-x: hidden` on the `html` element to prevent horizontal scroll on mobile.
6. THE container SHALL have responsive horizontal padding: `3.5rem` on desktop and `2rem` on mobile.

---

### Requirement 18: Projects Page with Filter

**User Story:** As a visitor, I want to filter projects by category on the Projects page, so that I can find relevant case studies for my industry.

#### Acceptance Criteria

1. THE Projects page SHALL display a `PageHero` banner at the top.
2. THE Projects page SHALL display category filter buttons for: All, Wooden Pallets, Wooden Crates, Export Packaging, Machinery Packing, Industrial Packing, Container Stuffing.
3. WHEN a filter button is clicked, THE Projects page SHALL display only the projects matching the selected category.
4. WHEN a filter is applied, THE Projects page SHALL animate the filtered cards using a stagger reveal.
5. THE Projects page SHALL display all 8 projects from `projects.js` as `ProjectCard` components in a responsive grid.
6. WHEN the "All" filter is selected, THE Projects page SHALL display all 8 projects.

---

### Requirement 19: Loading and Utility Components

**User Story:** As a developer, I want consistent loading spinner, scroll-to-top, and section heading utility components, so that the UI is polished at all interaction states.

#### Acceptance Criteria

1. THE LoadingSpinner component SHALL display a centered animated spinner using the accent gold color.
2. THE ScrollToTop component SHALL scroll the window to `top: 0` on every route navigation change.
3. THE SectionHeading component SHALL accept `title`, `subtitle`, `light` (boolean), and `center` (boolean) props.
4. THE SectionHeading component SHALL display the subtitle in gold uppercase with flanking gold accent lines, and the title in Poppins Black below it.
5. WHEN `light` prop is `true`, THE SectionHeading SHALL render the title in white text for use on dark backgrounds.

---

### Requirement 20: Admin Pages Preservation

**User Story:** As an admin, I want the AdminLogin and AdminDashboard pages to remain fully functional and unchanged, so that back-office operations are not disrupted by the redesign.

#### Acceptance Criteria

1. THE Admin_Pages (AdminLogin.jsx, AdminDashboard.jsx) SHALL NOT be modified during the redesign.
2. THE Website routing in `App.jsx` SHALL continue to render `/admin/login` and `/admin/dashboard` routes outside of the main Navbar/Footer layout wrapper.
3. THE Admin_Pages SHALL continue to connect to backend API endpoints as configured.
