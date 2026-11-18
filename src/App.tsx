import React, { useEffect, useState } from 'react';
import { Columns3, Menu, Moon, Presentation, Sun, X } from 'lucide-react';
import { GENERATED_ASSETS } from './data/designSystemData';
import { Button } from './components/ui/Primitives';
import { SafeImage } from './components/ui/Cards';
import { ResearchMoodboardSection } from './components/sections/ResearchMoodboardSection';
import { ComponentsShowcaseSection } from './components/sections/ComponentsShowcaseSection';
import { StyleGuideSection } from './components/sections/StyleGuideSection';
import { PrototypeSection } from './components/sections/PrototypeSection';
import { UsabilityTestingSection } from './components/sections/UsabilityTestingSection';
import { PresentationDeckModal } from './components/sections/PresentationDeckModal';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('atelier_theme') === 'dark';
    } catch {
      return false;
    }
  });
  const [showGridOverlay, setShowGridOverlay] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [presentationOpen, setPresentationOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('atelier_theme', darkMode ? 'dark' : 'light');
    } catch {
      // ignore storage failure
    }
  }, [darkMode]);

  const jumpToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { id: 'research', label: 'Research' },
    { id: 'components', label: 'Components' },
    { id: 'style-guide', label: 'Style Guide' },
    { id: 'prototype', label: 'Prototype' },
    { id: 'testing', label: 'Testing' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#141413] dark:bg-[#121316] dark:text-[#F4F3EF] transition-colors duration-200 relative">
      {/* Sticky Top Header — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-[#F8F7F4]/95 dark:bg-[#121316]/95 backdrop-blur-sm border-b border-[#DEDAD2] dark:border-[#2D3139]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Wordmark */}
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight text-[#141413] dark:text-[#F4F3EF] whitespace-nowrap shrink-0"
          >
            Atelier Raster
          </a>

          {/* Zone 2: 5 Concise Single-Line Nav Links */}
          <nav
            aria-label="Primary sections"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-[#575550] dark:text-[#A1A1AA]"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="whitespace-nowrap shrink-0 hover:text-[#141413] dark:hover:text-[#F4F3EF] border-b border-transparent hover:border-[#141413] dark:hover:border-[#F4F3EF] py-0.5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary CTA + Mobile Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setPresentationOpen(true)}
              leftIcon={<Presentation className="w-3.5 h-3.5" />}
            >
              Presentation
            </Button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="md:hidden h-9 w-9 inline-flex items-center justify-center border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] text-[#141413] dark:text-[#F4F3EF] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile sections"
            className="md:hidden border-t border-[#DEDAD2] dark:border-[#2D3139] bg-white dark:bg-[#1A1C21] px-4 py-3 space-y-1"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => jumpToSection(link.id)}
                className="w-full text-left px-3 py-2.5 text-sm font-medium rounded-[2px] hover:bg-[#EFECE6] dark:hover:bg-[#22252C] cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Main Content Container with Optional 12-Col Swiss Grid Overlay */}
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {showGridOverlay && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 inset-x-4 sm:inset-x-6 lg:inset-x-8 swiss-grid-overlay z-30 border-x border-[#D9381E]/15"
          />
        )}

        {/* Hero Section */}
        <section id="top" className="pt-12 pb-14 border-b border-[#DEDAD2] dark:border-[#2D3139]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between gap-8">
              <div className="space-y-5">
                <p className="text-xs font-mono text-[#D9381E] dark:text-[#EF4444]">
                  Artistic UI Kit & Design System · Bauhaus × Swiss International Style
                </p>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.06] text-[#141413] dark:text-[#F4F3EF] text-balance">
                  Geometric Precision Meets Accessible Interface Design
                </h1>
                <p className="text-base sm:text-lg text-[#575550] dark:text-[#A1A1AA] leading-relaxed max-w-2xl">
                  Atelier Raster translates Bauhaus primary geometry and Swiss modular grid discipline into a complete, reusable UI design system—featuring verified component states, responsive layouts, a live productivity prototype, and an unfabricated usability research protocol.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => jumpToSection('prototype')}
                >
                  Explore Live Prototype
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setPresentationOpen(true)}
                >
                  Open 13-Slide Presentation
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full min-h-[280px] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] overflow-hidden bg-[#EFECE6] dark:bg-[#22252C]">
                <SafeImage
                  src={GENERATED_ASSETS.moodboardBauhaus}
                  alt="Bauhaus modernist gallery study with tubular steel chair and primary geometric composition"
                  fallbackTitle="Bauhaus Gallery Study"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* 4-Column System Scope Strip + Workspace Mode Controls */}
          <div className="mt-10 pt-8 border-t border-[#DEDAD2] dark:border-[#2D3139] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { label: 'Movements Analyzed', value: '04' },
                { label: 'Component States', value: '30+' },
                { label: 'Card Archetypes', value: '06' },
                { label: 'Presentation Slides', value: '13' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-display text-2xl font-bold tabular-nums text-[#141413] dark:text-[#F4F3EF]">
                    {item.value}
                  </p>
                  <p className="text-xs text-[#575550] dark:text-[#A1A1AA] mt-0.5">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4 flex flex-wrap items-center lg:justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDarkMode((d) => !d)}
                leftIcon={darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              >
                {darkMode ? 'Light Paper' : 'Dark Studio'}
              </Button>
              <Button
                variant={showGridOverlay ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setShowGridOverlay((g) => !g)}
                leftIcon={<Columns3 className="w-3.5 h-3.5" />}
              >
                {showGridOverlay ? 'Grid: On' : '12-Col Grid'}
              </Button>
            </div>
          </div>
        </section>

        {/* Deliverable 1: Research & Mood Board */}
        <ResearchMoodboardSection />

        {/* Deliverables 2–5: Buttons, Inputs, Icons, Cards, Navigation/Toolbars, Forms */}
        <ComponentsShowcaseSection />

        {/* Deliverable 6: Complete Style Guide */}
        <StyleGuideSection
          showGridOverlay={showGridOverlay}
          onToggleGridOverlay={() => setShowGridOverlay((g) => !g)}
        />

        {/* Deliverable 7A: Interactive Prototype */}
        <PrototypeSection />

        {/* Deliverable 7B: Usability Testing Plan & Live Research Capture */}
        <UsabilityTestingSection />

        {/* Deliverable 8: Final Design Showcase Banner */}
        <section className="py-16">
          <div className="bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <p className="text-xs font-mono text-[#1E40AF] dark:text-[#60A5FA]">
                08. Final Academic & Design Showcase
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#141413] dark:text-[#F4F3EF]">
                Present the Complete Atelier Raster UI Kit
              </h2>
              <p className="text-sm sm:text-base text-[#575550] dark:text-[#A1A1AA] max-w-2xl leading-relaxed">
                Launch the 13-chapter presentation deck to walk reviewers sequentially through movement research, mood board synthesis, token architecture, component matrices, responsive prototype, and usability testing methodology.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setPresentationOpen(true)}
                leftIcon={<Presentation className="w-4 h-4" />}
              >
                Launch Presentation Deck
              </Button>
            </div>
          </div>
        </section>

        <footer className="py-8 border-t border-[#DEDAD2] dark:border-[#2D3139] flex flex-wrap items-center justify-between gap-4 text-xs text-[#575550] dark:text-[#A1A1AA]">
          <span>Atelier Raster UI Design System · Neo-Bauhaus × Swiss Grid</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => jumpToSection('top')}
              className="hover:text-[#141413] dark:hover:text-[#F4F3EF] cursor-pointer"
            >
              Back to Top
            </button>
            <button
              type="button"
              onClick={() => setPresentationOpen(true)}
              className="hover:text-[#141413] dark:hover:text-[#F4F3EF] cursor-pointer"
            >
              Presentation Mode
            </button>
          </div>
        </footer>
      </div>

      {/* 13-Slide Interactive Presentation Deck */}
      <PresentationDeckModal
        open={presentationOpen}
        onClose={() => setPresentationOpen(false)}
        onJumpToSection={jumpToSection}
      />
    </div>
  );
}
