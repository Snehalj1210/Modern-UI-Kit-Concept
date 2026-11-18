import React, { useState } from 'react';
import { ART_MOVEMENTS, MovementProfile } from '../../data/designSystemData';
import { SafeImage } from '../ui/Cards';
import { Check } from 'lucide-react';

const MovementMotifSvg: React.FC<{ id: MovementProfile['id'] }> = ({ id }) => {
  if (id === 'bauhaus') {
    return (
      <svg viewBox="0 0 180 90" className="w-full h-24" aria-label="Bauhaus geometric motif">
        <rect x="8" y="10" width="44" height="44" fill="#D9381E" />
        <circle cx="92" cy="45" r="24" fill="#1E40AF" />
        <polygon points="150,14 174,64 126,64" fill="#D97706" />
        <line x1="8" y1="74" x2="174" y2="74" stroke="currentColor" strokeWidth="3" />
      </svg>
    );
  }
  if (id === 'swiss') {
    return (
      <svg viewBox="0 0 180 90" className="w-full h-24" aria-label="Swiss grid motif">
        {[20, 60, 100, 140].map((x) => (
          <line key={x} x1={x} y1="6" x2={x} y2="84" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
        ))}
        {[20, 45, 70].map((y) => (
          <line key={y} x1="8" y1={y} x2="172" y2={y} stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
        ))}
        <rect x="20" y="20" width="40" height="25" fill="#D9381E" />
        <rect x="60" y="45" width="80" height="25" fill="currentColor" />
      </svg>
    );
  }
  if (id === 'art-deco') {
    return (
      <svg viewBox="0 0 180 90" className="w-full h-24" aria-label="Art Deco sunburst motif">
        <rect x="30" y="16" width="120" height="62" fill="none" stroke="#B48A3E" strokeWidth="2" />
        <rect x="46" y="28" width="88" height="50" fill="none" stroke="#B48A3E" strokeWidth="1.5" />
        <path d="M90 78 L54 28 M90 78 L72 28 M90 78 L90 22 M90 78 L108 28 M90 78 L126 28" stroke="#B48A3E" strokeWidth="1.5" />
        <circle cx="90" cy="78" r="10" fill="#B48A3E" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 180 90" className="w-full h-24" aria-label="Minimalist planes motif">
      <rect x="16" y="14" width="68" height="62" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.3" />
      <rect x="96" y="14" width="68" height="28" fill="currentColor" fillOpacity="0.85" />
      <line x1="96" y1="58" x2="164" y2="58" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
    </svg>
  );
};

export const ResearchMoodboardSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<MovementProfile['id']>('bauhaus');
  const activeMovement = ART_MOVEMENTS.find((m) => m.id === selectedId) ?? ART_MOVEMENTS[0];

  return (
    <section id="research" className="py-16 border-b border-[#DEDAD2] dark:border-[#2D3139]">
      <div className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-3">
            <p className="text-xs font-mono text-[#D9381E] dark:text-[#EF4444]">
              01. Historical Research & Mood Board
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] dark:text-[#F4F3EF] text-balance">
              Four Artistic Movements Distilled into Functional UI Grammar
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm text-[#575550] dark:text-[#A1A1AA] leading-relaxed">
              Comparative analysis of 20th-century visual systems across color, typography, geometric construction, and spatial discipline.
            </p>
          </div>
        </div>

        {/* Movement Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#EFECE6] dark:bg-[#22252C] rounded-[2px] w-fit">
          {ART_MOVEMENTS.map((movement) => {
            const isSelected = movement.id === selectedId;
            return (
              <button
                key={movement.id}
                type="button"
                onClick={() => setSelectedId(movement.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-[2px] whitespace-nowrap cursor-pointer transition-colors flex items-center gap-2 ${
                  isSelected
                    ? 'bg-white text-[#141413] dark:bg-[#1A1C21] dark:text-[#F4F3EF]'
                    : 'text-[#575550] hover:text-[#141413] dark:text-[#A1A1AA] dark:hover:text-[#F4F3EF]'
                }`}
              >
                <span>{movement.name}</span>
                {movement.selectedForKit && (
                  <span className="text-[11px] font-mono text-[#1E40AF] dark:text-[#60A5FA]">
                    · Core
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Movement Deep-Dive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-6 sm:p-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#575550] dark:text-[#A1A1AA]">
                <span>{activeMovement.era}</span>
                <span aria-hidden="true">·</span>
                <span>{activeMovement.origin}</span>
                {activeMovement.selectedForKit && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#1E40AF] dark:text-[#60A5FA] font-semibold">
                      Selected Primary Influence
                    </span>
                  </>
                )}
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#141413] dark:text-[#F4F3EF]">
                {activeMovement.name}
              </h3>

              <p className="text-base text-[#575550] dark:text-[#A1A1AA] leading-relaxed max-w-prose">
                {activeMovement.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono font-semibold text-[#141413] dark:text-[#F4F3EF]">
                    Typography DNA
                  </h4>
                  <p className="text-sm text-[#575550] dark:text-[#A1A1AA] leading-relaxed">
                    {activeMovement.typography}
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono font-semibold text-[#141413] dark:text-[#F4F3EF]">
                    Shapes & Patterns
                  </h4>
                  <p className="text-sm text-[#575550] dark:text-[#A1A1AA] leading-relaxed">
                    {activeMovement.shapesAndPatterns}
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-mono font-semibold text-[#141413] dark:text-[#F4F3EF]">
                  Signature Color Swatches
                </h4>
                <div className="flex flex-wrap gap-3">
                  {activeMovement.colors.map((swatch) => (
                    <div
                      key={swatch.name}
                      className="flex items-center gap-2 border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] px-2.5 py-1.5"
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/15"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span className="text-xs font-medium text-[#141413] dark:text-[#F4F3EF]">
                        {swatch.name}
                      </span>
                      <span className="text-[11px] font-mono text-[#575550] dark:text-[#A1A1AA]">
                        {swatch.hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-[#DEDAD2] dark:border-[#2D3139] space-y-2">
              <h4 className="text-xs font-mono font-semibold text-[#1E40AF] dark:text-[#60A5FA]">
                Translation to Modern UI System
              </h4>
              <p className="text-sm font-medium text-[#141413] dark:text-[#F4F3EF]">
                {activeMovement.uiTranslation}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-[2px] border border-[#DEDAD2] dark:border-[#2D3139] bg-[#EFECE6] dark:bg-[#22252C]">
              <SafeImage
                src={activeMovement.imageUrl}
                alt={activeMovement.imageCaption}
                fallbackTitle={activeMovement.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-[#575550] dark:text-[#A1A1AA] italic">
              {activeMovement.imageCaption}
            </p>
            <div className="p-4 bg-[#F8F7F4] dark:bg-[#121316] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px]">
              <p className="text-[11px] font-mono text-[#575550] dark:text-[#A1A1AA] mb-2">
                Extracted Geometric Grammar
              </p>
              <MovementMotifSvg id={activeMovement.id} />
            </div>
          </div>
        </div>

        {/* Mood Board 4-Plate Wall + Selected Direction Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-xl font-bold text-[#141413] dark:text-[#F4F3EF]">
                Visual Mood Board Plates
              </h3>
              <span className="text-xs font-mono text-[#575550] dark:text-[#A1A1AA]">
                Click any plate to inspect research profile
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ART_MOVEMENTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`text-left group border rounded-[2px] overflow-hidden bg-white dark:bg-[#1A1C21] transition-colors cursor-pointer ${
                    selectedId === item.id
                      ? 'border-[#1E40AF] dark:border-[#3B82F6] ring-1 ring-[#1E40AF]/30'
                      : 'border-[#DEDAD2] dark:border-[#2D3139] hover:border-[#141413]'
                  }`}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#EFECE6] dark:bg-[#22252C]">
                    <SafeImage
                      src={item.imageUrl}
                      alt={item.imageCaption}
                      fallbackTitle={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-3.5 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-[#141413] dark:text-[#F4F3EF]">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#575550] dark:text-[#A1A1AA]">{item.era}</p>
                    </div>
                    <span className="text-xs font-mono text-[#1E40AF] dark:text-[#60A5FA]">
                      {selectedId === item.id ? 'Active' : 'Inspect'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-6 sm:p-8 space-y-5">
            <p className="text-xs font-mono text-[#1E40AF] dark:text-[#60A5FA]">
              Selected Artistic Direction
            </p>
            <h3 className="font-display text-2xl font-bold text-[#141413] dark:text-[#F4F3EF]">
              Neo-Bauhaus × Swiss Grid
            </h3>
            <p className="text-sm text-[#575550] dark:text-[#A1A1AA] leading-relaxed">
              We selected <strong className="text-[#141413] dark:text-[#F4F3EF]">Bauhaus Constructivism</strong> as our primary aesthetic voice, structured by the <strong className="text-[#141413] dark:text-[#F4F3EF]">Swiss International Style</strong> grid and tempered by Minimalist negative space.
            </p>
            <ul className="space-y-3 text-sm text-[#141413] dark:text-[#F4F3EF]">
              {[
                'Bauhaus contributes intentional primary accents (Cobalt, Vermilion, Ochre) and 24×24 geometric icon primitives.',
                'Swiss Style enforces a strict 12-column mathematical grid, crisp 1px hairlines, and tabular data alignment.',
                'Modern UI Ergonomics adds WCAG AA contrast, 40–44px touch targets, ARIA form validation, and dual Light/Dark themes.',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#1E40AF] dark:text-[#60A5FA] mt-0.5 shrink-0" />
                  <span className="text-[#575550] dark:text-[#A1A1AA] leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
