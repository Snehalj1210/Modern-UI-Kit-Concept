export interface MovementProfile {
  id: 'bauhaus' | 'art-deco' | 'swiss' | 'minimalism';
  name: string;
  era: string;
  origin: string;
  summary: string;
  colors: { name: string; hex: string }[];
  typography: string;
  shapesAndPatterns: string;
  characteristics: string[];
  uiTranslation: string;
  imageUrl: string;
  imageCaption: string;
  selectedForKit?: boolean;
}

export const GENERATED_ASSETS = {
  moodboardBauhaus: '/src/assets/images/moodboard_bauhaus_1794982866001.jpg',
  moodboardArtDeco: '/src/assets/images/moodboard_art_deco_1794982865942.jpg',
  moodboardSwiss: '/src/assets/images/moodboard_swiss_style_1794982867586.jpg',
  mediaArchitecture: '/src/assets/images/card_media_architecture_1794982867662.jpg',
  productLamp: '/src/assets/images/card_product_lamp_1794982867893.jpg',
  profileDesigner: '/src/assets/images/card_profile_designer_1794982867709.jpg',
};

export const ART_MOVEMENTS: MovementProfile[] = [
  {
    id: 'bauhaus',
    name: 'Bauhaus Constructivism',
    era: '1919 – 1933',
    origin: 'Weimar & Dessau, Germany',
    summary:
      'Founded by Walter Gropius, the Bauhaus unified fine art, craft, and industrial production around the principle that form follows function and geometric primitives carry universal legibility.',
    colors: [
      { name: 'Vermilion Red', hex: '#D9381E' },
      { name: 'Cobalt Blue', hex: '#1E40AF' },
      { name: 'Ochre Yellow', hex: '#D97706' },
      { name: 'Obsidian Ink', hex: '#141413' },
      { name: 'Plaster White', hex: '#F8F7F4' },
    ],
    typography:
      'Geometric sans-serif letterforms constructed from circles, straight bars, and uniform stroke weights (Herbert Bayer Universal, Futura).',
    shapesAndPatterns:
      'Primary geometric triad (circle, square, triangle), orthogonal structural bars, and high-contrast figure-ground blocks.',
    characteristics: [
      'Form follows function with zero gratuitous ornament',
      'Kandinsky color-shape correspondence (red square, blue circle, yellow triangle)',
      'Asymmetric balance anchored by crisp orthogonal axes',
      'Truth to materials and modular industrial scalability',
    ],
    uiTranslation:
      'Contributes the 10% primary color triad for semantic actions, geometric icon primitives on a 24x24 grid, and functional component anatomy.',
    imageUrl: GENERATED_ASSETS.moodboardBauhaus,
    imageCaption: 'Fig. 1 — Bauhaus gallery study: tubular steel, plaster light, and primary geometric blocks.',
    selectedForKit: true,
  },
  {
    id: 'swiss',
    name: 'Swiss International Style',
    era: '1950 – 1970',
    origin: 'Basel & Zurich, Switzerland',
    summary:
      'Pioneered by Josef Müller-Brockmann and Armin Hofmann, Swiss Style replaced subjective decoration with mathematical grid systems, asymmetric layouts, and objective sans-serif typography.',
    colors: [
      { name: 'Archival Paper', hex: '#F8F7F4' },
      { name: 'Signal Vermilion', hex: '#D9381E' },
      { name: 'Charcoal Black', hex: '#141413' },
      { name: 'Stone Rule', hex: '#DEDAD2' },
    ],
    typography:
      'Neo-grotesque sans-serifs set flush-left with tight typographic hierarchy, crisp scale jumps, and tabular numerical precision.',
    shapesAndPatterns:
      '12-column mathematical modular grids, 1px hairline rules, diagonal tension, and cropped objective photography.',
    characteristics: [
      'Strict mathematical grid as the invisible structural skeleton',
      'Asymmetric column distribution and generous negative space',
      'High typographic contrast between display headlines and body columns',
      'Objective clarity suited to complex information systems',
    ],
    uiTranslation:
      'Provides the 12-column responsive grid, hairline border discipline, spacing rhythm (4/8/16/24/32px), and tabular-numeral data tables.',
    imageUrl: GENERATED_ASSETS.moodboardSwiss,
    imageCaption: 'Fig. 2 — Swiss International Typographic prints demonstrating asymmetric grid discipline.',
    selectedForKit: true,
  },
  {
    id: 'art-deco',
    name: 'Art Deco',
    era: '1920 – 1939',
    origin: 'Paris, France & New York, USA',
    summary:
      'An architectural and decorative movement celebrating machine-age optimism through stepped ziggurat silhouettes, symmetrical sunbursts, metallic brass accents, and theatrical contrast.',
    colors: [
      { name: 'Obsidian Marble', hex: '#111215' },
      { name: 'Burnished Brass', hex: '#B48A3E' },
      { name: 'Champagne Ivory', hex: '#F3ECE0' },
      { name: 'Deep Emerald', hex: '#14532D' },
    ],
    typography:
      'Elongated geometric display lettering with stepped crossbars, bifocal stroke contrast, and monumental vertical proportion.',
    shapesAndPatterns:
      'Radial sunbursts, chevron repeating borders, stepped ziggurat corners, and symmetrical vertical framing.',
    characteristics: [
      'Bilaterally symmetrical monumentality and stepped geometry',
      'Luxurious metallic vs dark stone contrast',
      'Stepped rectangular borders and faceted octagonal frames',
      'Expressive vertical rhythm suited to hero marquees',
    ],
    uiTranslation:
      'Inspires crisp chamfered/flat corner discipline and disciplined dark-mode contrast without introducing heavy ornamental clutter.',
    imageUrl: GENERATED_ASSETS.moodboardArtDeco,
    imageCaption: 'Fig. 3 — Art Deco foyer study: symmetrical brass sunburst and stepped black marble.',
  },
  {
    id: 'minimalism',
    name: 'Minimalism',
    era: '1960 – Present',
    origin: 'New York & Tokyo',
    summary:
      'Rooted in Donald Judd’s spatial clarity and Dieter Rams’s "less, but better", Minimalism strips away non-essential visual noise so light, proportion, and usability command focus.',
    colors: [
      { name: 'Gallery White', hex: '#FFFFFF' },
      { name: 'Limestone Gray', hex: '#EFECE6' },
      { name: 'Muted Slate', hex: '#575550' },
      { name: 'Pure Graphite', hex: '#18181B' },
    ],
    typography:
      'Restrained neutral sans-serifs with ample line height, deliberate whitespace margins, and quiet muted captions.',
    shapesAndPatterns:
      'Monolithic flat planes, subtle elevation shifts (<= 7% brightness delta), and uninterrupted visual breathing room.',
    characteristics: [
      '60-30-10 neutral dominance with deliberate negative space',
      'Single-elevation surface hierarchy without nested boxes',
      'Quiet semantic clarity prioritizing cognitive ease',
      'Effortless scalability across desktop and mobile viewports',
    ],
    uiTranslation:
      'Governs our whitespace discipline, anti-clutter card layouts, and cognitive load reduction across dense productivity views.',
    imageUrl: GENERATED_ASSETS.mediaArchitecture,
    imageCaption: 'Fig. 4 — Minimalist concrete and glass pavilion showing pure plane and shadow rhythm.',
  },
];

export interface ColorToken {
  token: string;
  name: string;
  hexLight: string;
  hexDark: string;
  role: 'Canvas (60%)' | 'Surface (30%)' | 'Accent (10%)' | 'Semantic';
  contrastNote: string;
}

export const COLOR_TOKENS: ColorToken[] = [
  {
    token: '--canvas-bg',
    name: 'Archival Canvas',
    hexLight: '#F8F7F4',
    hexDark: '#121316',
    role: 'Canvas (60%)',
    contrastNote: 'Primary reading field; <5% warm/cool tint',
  },
  {
    token: '--surface-primary',
    name: 'Gallery Surface',
    hexLight: '#FFFFFF',
    hexDark: '#1A1C21',
    role: 'Surface (30%)',
    contrastNote: 'Elevated card & panel planes (<=7% delta)',
  },
  {
    token: '--surface-secondary',
    name: 'Limestone / Slate Well',
    hexLight: '#EFECE6',
    hexDark: '#22252C',
    role: 'Surface (30%)',
    contrastNote: 'Segmented tracks, table headers, input wells',
  },
  {
    token: '--border-hairline',
    name: 'Swiss Rule Hairline',
    hexLight: '#DEDAD2',
    hexDark: '#2D3139',
    role: 'Surface (30%)',
    contrastNote: '1px structural grid & card boundary',
  },
  {
    token: '--text-primary',
    name: 'Obsidian / Chalk Ink',
    hexLight: '#141413',
    hexDark: '#F4F3EF',
    role: 'Surface (30%)',
    contrastNote: '16.8:1 contrast ratio on canvas (AAA)',
  },
  {
    token: '--text-secondary',
    name: 'Graphite / Ash',
    hexLight: '#575550',
    hexDark: '#A1A1AA',
    role: 'Surface (30%)',
    contrastNote: '6.9:1 contrast ratio on canvas (AA+)',
  },
  {
    token: '--accent-cobalt',
    name: 'Bauhaus Cobalt',
    hexLight: '#1E40AF',
    hexDark: '#3B82F6',
    role: 'Accent (10%)',
    contrastNote: 'Primary CTA, active nav, focus rings',
  },
  {
    token: '--accent-vermilion',
    name: 'Bauhaus Vermilion',
    hexLight: '#D9381E',
    hexDark: '#EF4444',
    role: 'Accent (10%)',
    contrastNote: 'Editorial highlight & destructive / error state',
  },
  {
    token: '--accent-ochre',
    name: 'Bauhaus Ochre',
    hexLight: '#B45309',
    hexDark: '#F59E0B',
    role: 'Semantic',
    contrastNote: 'Warning banners & attention highlights (paired with icon)',
  },
  {
    token: '--accent-emerald',
    name: 'Constructivist Emerald',
    hexLight: '#15803D',
    hexDark: '#22C55E',
    role: 'Semantic',
    contrastNote: 'Validation success & nominal telemetry (paired with icon)',
  },
];

export const TYPE_SCALE = [
  {
    role: 'Display Hero',
    font: 'Bricolage Grotesque',
    size: '48px / 3rem',
    weight: '700 (Bold)',
    lineHeight: '1.08',
    tracking: '-0.025em',
    sample: 'Form follows clarity.',
  },
  {
    role: 'Section Heading (H2)',
    font: 'Bricolage Grotesque',
    size: '32px / 2rem',
    weight: '700 (Bold)',
    lineHeight: '1.15',
    tracking: '-0.02em',
    sample: '01. Architectural Grid & Proportions',
  },
  {
    role: 'Card / Subheading (H3)',
    font: 'Bricolage Grotesque',
    size: '20px / 1.25rem',
    weight: '600 (SemiBold)',
    lineHeight: '1.25',
    tracking: '-0.01em',
    sample: 'Modular Navigation & Toolbar Primitives',
  },
  {
    role: 'Body Prose',
    font: 'Plus Jakarta Sans',
    size: '16px / 1rem',
    weight: '400 (Regular)',
    lineHeight: '1.6',
    tracking: '0em',
    sample: 'Generous line height and 65-character measure ensure effortless academic readability.',
  },
  {
    role: 'UI Label & Control',
    font: 'Plus Jakarta Sans',
    size: '14px / 0.875rem',
    weight: '600 (SemiBold)',
    lineHeight: '1.4',
    tracking: '0em',
    sample: 'Save Component Token',
  },
  {
    role: 'Tabular / Token Mono',
    font: 'JetBrains Mono',
    size: '12px / 0.75rem',
    weight: '500 (Medium)',
    lineHeight: '1.4',
    tracking: '0.02em',
    sample: '1440px · 12-Col · #1E40AF',
  },
];

export const SPACING_TOKENS = [
  { token: 'space-1', px: 4, rem: '0.25rem', usage: 'Tight icon-to-label gap, micro keyline offset' },
  { token: 'space-2', px: 8, rem: '0.5rem', usage: 'Button inline gap, form label-to-input rhythm' },
  { token: 'space-4', px: 16, rem: '1rem', usage: 'Base component padding, mobile container gutter' },
  { token: 'space-6', px: 24, rem: '1.5rem', usage: 'Standard card padding, 12-column grid gutter' },
  { token: 'space-8', px: 32, rem: '2rem', usage: 'Section sub-block separation, panel margins' },
  { token: 'space-12', px: 48, rem: '3rem', usage: 'Major editorial rhythm between modules' },
];

export const RADIUS_AND_ELEVATION = {
  radii: [
    { name: 'Sharp Ortho', token: 'rounded-none', value: '0px', usage: 'Full-bleed editorial dividers, structural tables' },
    { name: 'Bauhaus Crisp', token: 'rounded-[2px]', value: '2px', usage: 'Default buttons, inputs, cards, and toolbars' },
    { name: 'Soft Instrument', token: 'rounded-[4px]', value: '4px', usage: 'Modals, floating menus, outer shell frames' },
    { name: 'Pure Circle', token: 'rounded-full', value: '9999px', usage: 'Avatars, radio dots, geometric color swatches' },
  ],
  elevations: [
    {
      level: 'Level 0 — Flat Canvas',
      spec: 'No shadow · Canvas background',
      usage: 'Page field and editorial prose columns',
    },
    {
      level: 'Level 1 — Hairline Card',
      spec: '1px solid var(--border-hairline) · 0px shadow',
      usage: 'Information, stats, and form containers (Single-elevation rule)',
    },
    {
      level: 'Level 2 — Interactive Lift',
      spec: '0 6px 20px -4px rgba(20,20,19,0.08) + 1px crisp border',
      usage: 'Focused drawers, dropdown toolbars, and modal dialogs',
    },
  ],
  breakpoints: [
    { name: 'Mobile (sm)', width: '390px – 639px', columns: '4 Columns', gutter: '16px', notes: 'Single-column stack, 44px minimum touch targets' },
    { name: 'Tablet (md)', width: '768px – 1023px', columns: '8 Columns', gutter: '24px', notes: '2-column card grid, collapsible drawer nav' },
    { name: 'Desktop (lg/xl)', width: '1024px – 1279px', columns: '12 Columns', gutter: '24px', notes: '240px persistent sidebar + fluid workspace' },
    { name: 'Wide Studio (2xl)', width: '1440px+', columns: '12 Columns (Max 1240px)', gutter: '24px', notes: 'Baseline studio artboard with generous margins' },
  ],
};

export interface UsabilityTask {
  id: string;
  title: string;
  scenario: string;
  targetOutcome: string;
  heuristicFocus: string;
}

export const USABILITY_PLAN = {
  objectives: [
    'Evaluate whether users can distinguish primary, secondary, and destructive actions without relying on color alone.',
    'Measure task completion clarity and form-error recovery speed across the validated Registration and Studio Task forms.',
    'Verify navigation predictability across Desktop (1440px), Tablet (768px), and Mobile (390px) viewports.',
    'Assess legibility and visual fatigue across both Archival Light and Weimar Dark themes.',
  ],
  methodology:
    'Moderated Think-Aloud Protocol (30 minutes per participant) paired with Single Ease Question (SEQ, 1–7) after each task and System Usability Scale (SUS, 0–100) at session close. Screen & audio notes are logged without leading prompts.',
  participantCriteria:
    '5–8 participants spanning 2 UX/UI designers, 2 frontend engineers, and 2–4 non-specialist productivity users across desktop and mobile devices.',
  tasks: [
    {
      id: 'T1',
      title: 'Inspect Component States & Theme Contrast',
      scenario: 'Locate the Button and Input state matrices, switch between Light and Dark themes, and verify error vs. success feedback.',
      targetOutcome: 'Participant accurately identifies error, success, and disabled states within 20 seconds without confusion.',
      heuristicFocus: 'Visibility of System Status & WCAG Contrast',
    },
    {
      id: 'T2',
      title: 'Complete Validated Registration Form',
      scenario: 'Submit the Registration form first with an invalid email and weak password, then correct fields using inline helper messages.',
      targetOutcome: 'Participant recovers from validation errors on the first correction pass.',
      heuristicFocus: 'Help Users Recognize, Diagnose, and Recover from Errors',
    },
    {
      id: 'T3',
      title: 'Filter & Create Exhibition Task in Prototype',
      scenario: 'Open the Interactive Prototype, filter tasks by status, switch to List view, and create a new studio deliverable.',
      targetOutcome: 'Participant completes task creation and sees the new item rendered in the active workspace.',
      heuristicFocus: 'User Control and Freedom & Flexibility',
    },
    {
      id: 'T4',
      title: 'Navigate Prototype on Mobile Viewport',
      scenario: 'Switch the prototype viewport to Mobile (390px), open the mobile navigation drawer, and navigate to Analytics.',
      targetOutcome: 'Participant locates and triggers the mobile menu cleanly with zero clipped labels.',
      heuristicFocus: 'Consistency and Standards & Mobile Ergonomics',
    },
    {
      id: 'T5',
      title: 'Locate Spacing & Color Tokens in Style Guide',
      scenario: 'Find the Bauhaus Cobalt hex token and the 24px card padding spacing guideline in the Style Guide.',
      targetOutcome: 'Participant copies the hex value in one click and confirms copy confirmation.',
      heuristicFocus: 'Recognition Rather Than Recall',
    },
  ] as UsabilityTask[],
};

export interface PresentationSlide {
  number: string;
  title: string;
  sectionAnchor: string;
  subtitle: string;
  keyPoints: string[];
  visualFocus: 'intro' | 'research' | 'moodboard' | 'direction' | 'tokens' | 'primitives' | 'cards' | 'navigation' | 'forms' | 'responsive' | 'prototype' | 'testing' | 'showcase';
}

export const PRESENTATION_SLIDES: PresentationSlide[] = [
  {
    number: '01',
    title: 'Project Introduction',
    sectionAnchor: 'research',
    subtitle: 'Atelier Raster: Bridging 20th-Century Avant-Garde Geometry with Modern Accessible UI',
    keyPoints: [
      'Objective: Build a cohesive, scalable, reusable UI Kit rooted in authentic art-historical movements.',
      'Deliverables: Movement research, mood board, component library, design system, interactive prototype, and usability testing protocol.',
      'Engineering Standard: WCAG AA contrast, keyboard focus rings, zero-pill restraint, and dual light/dark parity.',
    ],
    visualFocus: 'intro',
  },
  {
    number: '02',
    title: 'Research on Artistic Movements',
    sectionAnchor: 'research',
    subtitle: 'Comparative Audit of Bauhaus, Art Deco, Swiss Style, and Minimalism',
    keyPoints: [
      'Bauhaus (1919–1933): Functional geometry, primary triad accents, truth to materials.',
      'Swiss Style (1950–1970): 12-column mathematical grid, flush-left grotesque type, hairline rules.',
      'Art Deco (1920–1939): Stepped architectural symmetry and high-contrast metallic warmth.',
      'Minimalism (1960–Present): Negative space dominance and cognitive load reduction.',
    ],
    visualFocus: 'research',
  },
  {
    number: '03',
    title: 'Inspiration & Mood Board',
    sectionAnchor: 'research',
    subtitle: 'Archival Photography, Material Studies, and Geometric Motif Extraction',
    keyPoints: [
      'Extracted tangible surfaces: matte plaster, brushed tubular steel, archival off-white paper, and concrete.',
      'Studied figure-ground contrast across museum posters and modernist architectural pavilions.',
      'Translated physical framing ratios into crisp 2px component corners and 1px hairline dividers.',
    ],
    visualFocus: 'moodboard',
  },
  {
    number: '04',
    title: 'Selected Artistic Direction',
    sectionAnchor: 'research',
    subtitle: 'Primary Direction: Neo-Bauhaus Constructivism × Swiss International Grid',
    keyPoints: [
      'Why this fusion: Swiss grids solve complex layout density; Bauhaus provides unmistakable geometric personality.',
      '60-30-10 Ratio: 60% archival neutral canvas, 30% crisp structural surfaces, 10% Cobalt/Vermilion/Ochre accents.',
      'Modern Guardrails: Replaces decorative nostalgia with WCAG AA legibility and 44px touch ergonomics.',
    ],
    visualFocus: 'direction',
  },
  {
    number: '05',
    title: 'Color & Typography System',
    sectionAnchor: 'style-guide',
    subtitle: 'Semantic Design Tokens, 2+1 Font Architecture, and 4px/8px Spatial Scale',
    keyPoints: [
      'Display: Bricolage Grotesque · Body: Plus Jakarta Sans · Telemetry & Tokens: JetBrains Mono (tabular-nums).',
      'Strict 4px/8px/16px/24px/32px spacing progression with nested corner radius math.',
      'Dual Light ("Archival Paper") and Dark ("Weimar Slate") surfaces calibrated for contrast.',
    ],
    visualFocus: 'tokens',
  },
  {
    number: '06',
    title: 'Buttons, Inputs & Icons',
    sectionAnchor: 'components',
    subtitle: 'Complete 5×5 State Matrices and a 24×24 Geometric Bauhaus Icon System',
    keyPoints: [
      '5 Button Variants (Primary, Secondary, Outline, Ghost, Icon) across Default, Hover, Active, Focus, Disabled.',
      '5 Input Types (Text, Email, Password, Search, Number) across Default, Focus, Error, Success, Disabled.',
      'Custom geometric SVG icon set built on a 24×24 keyline grid with uniform 1.75px strokes.',
    ],
    visualFocus: 'primitives',
  },
  {
    number: '07',
    title: 'Card Components',
    sectionAnchor: 'components',
    subtitle: 'Six Modular, Single-Elevation Card Archetypes',
    keyPoints: [
      'Information, Image/Media, Profile, Product, Statistics, and Action cards.',
      'Zero nested card boxes: hierarchy is established through typography, 1px hairline borders, and 24px outer padding.',
      'Interactive controls wired directly into cards (bookmarking, add-to-bag, workflow triggers).',
    ],
    visualFocus: 'cards',
  },
  {
    number: '08',
    title: 'Navigation & Toolbars',
    sectionAnchor: 'components',
    subtitle: 'Coherent Wayfinding Across Desktop, Tablet, Mobile, and Canvas Editors',
    keyPoints: [
      'Strict 3-zone Top Bar, collapsible Sidebar Navigation, and accessible Mobile Drawer.',
      'Interactive Breadcrumb trail for deep studio hierarchies.',
      'Functional Editing Toolbar (formatting, alignment, color swatches) and Viewing Toolbar (zoom, Grid/List/Split).',
    ],
    visualFocus: 'navigation',
  },
  {
    number: '09',
    title: 'Forms & Validation States',
    sectionAnchor: 'components',
    subtitle: 'Accessible Login, Registration, and Contact/Feedback Workflows',
    keyPoints: [
      'Every state (Success, Warning, Error, Focus, Disabled) pairs color with explicit icons and ARIA alerts.',
      'Live password strength metering, character counters, and instant field-level recovery hints.',
      '100% keyboard-navigable with clear focus-visible Cobalt rings.',
    ],
    visualFocus: 'forms',
  },
  {
    number: '10',
    title: 'Responsive Layouts',
    sectionAnchor: 'style-guide',
    subtitle: '12-Column Desktop, 8-Column Tablet, and 4-Column Mobile Grid Architecture',
    keyPoints: [
      'Breakpoints: 390px (Mobile), 768px (Tablet), 1024px (Desktop), 1440px (Baseline Studio).',
      'Live interactive 12-column Swiss Grid overlay toggle across the entire design system.',
      'Zero horizontal overflow and single-line controls across all screen widths.',
    ],
    visualFocus: 'responsive',
  },
  {
    number: '11',
    title: 'Interactive Prototype',
    sectionAnchor: 'prototype',
    subtitle: 'Atelier Studio — Live Exhibition & Design Operations Workspace',
    keyPoints: [
      'Assembled exclusively from Atelier Raster UI Kit primitives, cards, toolbars, and validated modals.',
      'Includes an interactive Desktop / Tablet / Mobile viewport switcher inside the prototype frame.',
      'Supports real task creation, live search, status filtering, view switching, and theme toggling.',
    ],
    visualFocus: 'prototype',
  },
  {
    number: '12',
    title: 'Usability Testing & Improvements',
    sectionAnchor: 'testing',
    subtitle: 'Empirical Testing Protocol & Unfabricated Research Session Logger',
    keyPoints: [
      '5 structured usability test scenarios targeting contrast, form recovery, navigation, and token lookup.',
      'Zero fabricated results: includes a live session & issue recorder to capture authentic participant feedback.',
      'Supports severity tagging, heuristic mapping, proposed UI fixes, and Markdown/JSON export.',
    ],
    visualFocus: 'testing',
  },
  {
    number: '13',
    title: 'Final Design Showcase',
    sectionAnchor: 'prototype',
    subtitle: 'Unified System Architecture Ready for Production & Academic Review',
    keyPoints: [
      'All 8 project deliverables integrated into one cohesive, interactive design system application.',
      'Consistent Neo-Bauhaus × Swiss identity maintained from micro-buttons to full-screen studio layouts.',
      'Exit presentation anytime to inspect live components, copy tokens, or run user test sessions.',
    ],
    visualFocus: 'showcase',
  },
];
