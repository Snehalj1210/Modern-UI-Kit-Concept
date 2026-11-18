import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, X } from 'lucide-react';
import {
  ART_MOVEMENTS,
  COLOR_TOKENS,
  GENERATED_ASSETS,
  PRESENTATION_SLIDES,
} from '../../data/designSystemData';
import { Button } from '../ui/Primitives';
import { SafeImage } from '../ui/Cards';
import { BAUHAUS_ICON_CATALOG } from '../ui/BauhausIcons';

interface PresentationDeckModalProps {
  open: boolean;
  onClose: () => void;
  onJumpToSection: (sectionId: string) => void;
}

export const PresentationDeckModal: React.FC<PresentationDeckModalProps> = ({
  open,
  onClose,
  onJumpToSection,
}) => {
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setSlideIdx((i) => Math.min(PRESENTATION_SLIDES.length - 1, i + 1));
      if (e.key === 'ArrowLeft') setSlideIdx((i) => Math.max(0, i - 1));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const slide = PRESENTATION_SLIDES[slideIdx];
  const progressPct = ((slideIdx + 1) / PRESENTATION_SLIDES.length) * 100;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#F8F7F4] dark:bg-[#121316] text-[#141413] dark:text-[#F4F3EF] flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Final UI Kit Presentation Deck"
    >
      {/* Presentation Header */}
      <div className="border-b border-[#DEDAD2] dark:border-[#2D3139] bg-white dark:bg-[#1A1C21] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="font-display text-base font-bold">Atelier Raster Deck</span>
          <span className="text-xs font-mono tabular-nums text-[#575550] dark:text-[#A1A1AA]">
            Slide {slide.number} / {String(PRESENTATION_SLIDES.length).padStart(2, '0')}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onClose();
              onJumpToSection(slide.sectionAnchor);
            }}
            rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
          >
            Inspect Live Section
          </Button>
          <Button
            variant="icon"
            size="sm"
            onClick={onClose}
            aria-label="Close presentation deck"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-[#EFECE6] dark:bg-[#22252C]">
        <div
          className="h-full bg-[#1E40AF] dark:bg-[#3B82F6] transition-all duration-200"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Body Grid */}
      <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12">
        {/* Chapter Index Rail */}
        <aside className="hidden lg:block lg:col-span-3 border-r border-[#DEDAD2] dark:border-[#2D3139] bg-white dark:bg-[#1A1C21] p-5 overflow-y-auto">
          <p className="text-xs font-mono text-[#575550] dark:text-[#A1A1AA] mb-3">
            Presentation Chapters
          </p>
          <nav className="space-y-1">
            {PRESENTATION_SLIDES.map((s, idx) => (
              <button
                key={s.number}
                type="button"
                onClick={() => setSlideIdx(idx)}
                className={`w-full text-left px-3 py-2 text-xs rounded-[2px] flex items-center gap-2.5 transition-colors cursor-pointer ${
                  idx === slideIdx
                    ? 'bg-[#141413] text-white dark:bg-[#F4F3EF] dark:text-[#121316] font-semibold'
                    : 'text-[#575550] hover:bg-[#EFECE6] hover:text-[#141413] dark:text-[#A1A1AA] dark:hover:bg-[#22252C]'
                }`}
              >
                <span className="font-mono">{s.number}</span>
                <span className="truncate">{s.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Slide Stage */}
        <main className="lg:col-span-9 p-6 sm:p-10 lg:p-14 flex flex-col justify-between gap-8 max-w-5xl">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-mono text-[#D9381E] dark:text-[#EF4444]">
                Chapter {slide.number} · Final Presentation
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-balance">
                {slide.title}
              </h2>
              <p className="text-lg text-[#575550] dark:text-[#A1A1AA] leading-relaxed">
                {slide.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-7 space-y-4">
                {slide.keyPoints.map((pt, i) => (
                  <div
                    key={pt}
                    className="p-4 bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] flex items-start gap-3"
                  >
                    <span className="font-mono text-xs font-semibold text-[#1E40AF] dark:text-[#60A5FA] mt-0.5">
                      0{i + 1}
                    </span>
                    <p className="text-sm sm:text-base leading-relaxed text-[#141413] dark:text-[#F4F3EF]">
                      {pt}
                    </p>
                  </div>
                ))}
              </div>

              {/* Contextual Visual Plate per Slide */}
              <div className="md:col-span-5 bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-4 space-y-3">
                {slide.visualFocus === 'moodboard' || slide.visualFocus === 'research' ? (
                  <div className="grid grid-cols-2 gap-2">
                    {ART_MOVEMENTS.map((m) => (
                      <div key={m.id} className="aspect-[4/3] overflow-hidden rounded-[2px]">
                        <SafeImage
                          src={m.imageUrl}
                          alt={m.name}
                          fallbackTitle={m.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : slide.visualFocus === 'tokens' ? (
                  <div className="grid grid-cols-2 gap-2">
                    {COLOR_TOKENS.slice(0, 8).map((c) => (
                      <div
                        key={c.token}
                        className="p-2.5 border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] flex items-center gap-2"
                      >
                        <span
                          className="w-5 h-5 rounded-full shrink-0 border border-black/10"
                          style={{ backgroundColor: c.hexLight }}
                        />
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold truncate">{c.name}</p>
                          <p className="text-[10px] font-mono text-[#575550]">{c.hexLight}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : slide.visualFocus === 'primitives' ? (
                  <div className="space-y-4 p-2">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="primary" size="sm">Primary</Button>
                      <Button variant="secondary" size="sm">Secondary</Button>
                      <Button variant="outline" size="sm">Outline</Button>
                    </div>
                    <div className="grid grid-cols-4 gap-3 pt-2">
                      {BAUHAUS_ICON_CATALOG.slice(0, 8).map(({ id, Component }) => (
                        <div
                          key={id}
                          className="p-2.5 bg-[#F8F7F4] dark:bg-[#121316] rounded-[2px] flex items-center justify-center"
                        >
                          <Component size={20} />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[4/3] overflow-hidden rounded-[2px]">
                    <SafeImage
                      src={
                        slide.visualFocus === 'cards'
                          ? GENERATED_ASSETS.productLamp
                          : slide.visualFocus === 'prototype' || slide.visualFocus === 'showcase'
                            ? GENERATED_ASSETS.mediaArchitecture
                            : GENERATED_ASSETS.moodboardBauhaus
                      }
                      alt={slide.title}
                      fallbackTitle={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <p className="text-xs font-mono text-[#575550] dark:text-[#A1A1AA]">
                  Atelier Raster · Slide {slide.number} Specimen
                </p>
              </div>
            </div>
          </div>

          {/* Slide Navigation Footer */}
          <div className="pt-6 border-t border-[#DEDAD2] dark:border-[#2D3139] flex items-center justify-between gap-4">
            <Button
              variant="outline"
              size="md"
              disabled={slideIdx === 0}
              onClick={() => setSlideIdx((i) => Math.max(0, i - 1))}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Previous Slide
            </Button>

            <span className="text-xs font-mono text-[#575550] dark:text-[#A1A1AA] hidden sm:inline">
              Use ← / → arrow keys to navigate
            </span>

            {slideIdx < PRESENTATION_SLIDES.length - 1 ? (
              <Button
                variant="primary"
                size="md"
                onClick={() => setSlideIdx((i) => Math.min(PRESENTATION_SLIDES.length - 1, i + 1))}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Next Slide
              </Button>
            ) : (
              <Button variant="primary" size="md" onClick={onClose}>
                Finish & Explore Live Kit
              </Button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
