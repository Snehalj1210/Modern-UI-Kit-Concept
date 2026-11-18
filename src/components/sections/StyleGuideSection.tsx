import React, { useState } from 'react';
import { Check, Copy, Columns3 } from 'lucide-react';
import {
  COLOR_TOKENS,
  RADIUS_AND_ELEVATION,
  SPACING_TOKENS,
  TYPE_SCALE,
} from '../../data/designSystemData';
import { Button } from '../ui/Primitives';

interface StyleGuideSectionProps {
  showGridOverlay: boolean;
  onToggleGridOverlay: () => void;
}

export const StyleGuideSection: React.FC<StyleGuideSectionProps> = ({
  showGridOverlay,
  onToggleGridOverlay,
}) => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleCopy = (val: string) => {
    navigator.clipboard?.writeText(val);
    setCopiedToken(val);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  return (
    <section id="style-guide" className="py-16 border-b border-[#DEDAD2] dark:border-[#2D3139]">
      <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-3">
            <p className="text-xs font-mono text-[#B45309] dark:text-[#F59E0B]">
              06. Complete Design System & Style Guide
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] dark:text-[#F4F3EF] text-balance">
              Tokens, Typographic Scale, Spatial Rhythm, and Swiss Grid
            </h2>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Button
              variant={showGridOverlay ? 'primary' : 'outline'}
              size="md"
              onClick={onToggleGridOverlay}
              leftIcon={<Columns3 className="w-4 h-4" />}
            >
              {showGridOverlay ? 'Hide 12-Col Grid Overlay' : 'Preview 12-Col Grid Overlay'}
            </Button>
          </div>
        </div>

        {/* 60-30-10 Ratio + Color Tokens */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F3EF]">
                60-30-10 Color Allocation Rule
              </h3>
              <span className="text-xs font-mono text-[#575550] dark:text-[#A1A1AA]">
                Click any hex value below to copy token
              </span>
            </div>
            <div className="h-8 w-full flex rounded-[2px] overflow-hidden border border-[#DEDAD2] dark:border-[#2D3139] text-xs font-mono">
              <div className="w-[60%] bg-[#F8F7F4] dark:bg-[#121316] text-[#141413] dark:text-[#F4F3EF] flex items-center px-3 font-medium">
                60% Neutral Canvas
              </div>
              <div className="w-[30%] bg-[#EFECE6] dark:bg-[#22252C] text-[#141413] dark:text-[#F4F3EF] border-x border-[#DEDAD2] dark:border-[#2D3139] flex items-center px-3 font-medium">
                30% Surfaces & Rules
              </div>
              <div className="w-[10%] bg-[#1E40AF] dark:bg-[#3B82F6] text-white flex items-center justify-center font-semibold">
                10%
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {COLOR_TOKENS.map((c) => (
              <div
                key={c.token}
                className="bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] overflow-hidden flex flex-col justify-between"
              >
                <div className="grid grid-cols-2 h-16 border-b border-[#DEDAD2] dark:border-[#2D3139]">
                  <div
                    className="p-2 flex items-end text-[10px] font-mono"
                    style={{ backgroundColor: c.hexLight }}
                  >
                    <span className="px-1 py-0.5 bg-white/85 text-[#141413] rounded-[1px]">
                      Light
                    </span>
                  </div>
                  <div
                    className="p-2 flex items-end text-[10px] font-mono"
                    style={{ backgroundColor: c.hexDark }}
                  >
                    <span className="px-1 py-0.5 bg-black/75 text-white rounded-[1px]">
                      Dark
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] font-mono text-[#575550] dark:text-[#A1A1AA]">
                      {c.role}
                    </p>
                    <h4 className="font-display text-sm font-bold text-[#141413] dark:text-[#F4F3EF] mt-0.5">
                      {c.name}
                    </h4>
                    <p className="text-xs text-[#575550] dark:text-[#A1A1AA] mt-1 leading-snug">
                      {c.contrastNote}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#DEDAD2] dark:border-[#2D3139] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(c.hexLight)}
                      className="text-[11px] font-mono text-[#141413] dark:text-[#F4F3EF] hover:text-[#1E40AF] dark:hover:text-[#60A5FA] inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedToken === c.hexLight ? (
                        <Check className="w-3 h-3 text-[#15803D]" />
                      ) : (
                        <Copy className="w-3 h-3 opacity-60" />
                      )}
                      <span>{c.hexLight}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopy(c.hexDark)}
                      className="text-[11px] font-mono text-[#575550] dark:text-[#A1A1AA] hover:text-[#1E40AF] dark:hover:text-[#60A5FA] cursor-pointer"
                    >
                      {copiedToken === c.hexDark ? 'Copied' : c.hexDark}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography Scale */}
        <div className="bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-xl font-bold text-[#141413] dark:text-[#F4F3EF]">
              Typography Hierarchy (2+1 Font Discipline)
            </h3>
            <span className="text-xs font-mono text-[#575550] dark:text-[#A1A1AA]">
              Bricolage Grotesque · Plus Jakarta Sans · JetBrains Mono
            </span>
          </div>

          <div className="divide-y divide-[#DEDAD2] dark:divide-[#2D3139]">
            {TYPE_SCALE.map((row) => (
              <div
                key={row.role}
                className="py-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
              >
                <div className="lg:col-span-4 space-y-1">
                  <p className="text-sm font-semibold text-[#141413] dark:text-[#F4F3EF]">
                    {row.role}
                  </p>
                  <p className="text-xs font-mono text-[#575550] dark:text-[#A1A1AA]">
                    {row.font} · {row.size} · {row.weight}
                  </p>
                </div>
                <div className="lg:col-span-8">
                  <p
                    className={`text-[#141413] dark:text-[#F4F3EF] ${
                      row.role.includes('Hero')
                        ? 'font-display text-3xl sm:text-4xl font-bold tracking-tight'
                        : row.role.includes('H2')
                          ? 'font-display text-2xl font-bold'
                          : row.role.includes('H3')
                            ? 'font-display text-xl font-semibold'
                            : row.role.includes('Mono')
                              ? 'font-mono text-xs tabular-nums'
                              : row.role.includes('Control')
                                ? 'text-sm font-semibold'
                                : 'text-base'
                    }`}
                  >
                    {row.sample}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spacing + Radius + Elevation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-6 sm:p-8 space-y-5">
            <h3 className="font-display text-xl font-bold text-[#141413] dark:text-[#F4F3EF]">
              Spatial System (4px / 8px Base Grid)
            </h3>
            <div className="space-y-4">
              {SPACING_TOKENS.map((s) => (
                <div key={s.token} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold text-[#141413] dark:text-[#F4F3EF]">
                      {s.px}px ({s.rem})
                    </span>
                    <span className="text-[#575550] dark:text-[#A1A1AA]">{s.token}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="h-3 bg-[#1E40AF] dark:bg-[#3B82F6] rounded-[1px]"
                      style={{ width: `${Math.min(180, s.px * 3)}px` }}
                    />
                    <span className="text-xs text-[#575550] dark:text-[#A1A1AA]">{s.usage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-6 space-y-4">
              <h3 className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F3EF]">
                Border Radius Guidelines
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {RADIUS_AND_ELEVATION.radii.map((r) => (
                  <div
                    key={r.name}
                    className="p-3 border border-[#DEDAD2] dark:border-[#2D3139] bg-[#F8F7F4] dark:bg-[#121316] space-y-2"
                    style={{ borderRadius: r.value === '9999px' ? '12px' : r.value }}
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-semibold text-[#141413] dark:text-[#F4F3EF]">{r.name}</span>
                      <span className="text-[#D9381E] dark:text-[#EF4444]">{r.value}</span>
                    </div>
                    <p className="text-xs text-[#575550] dark:text-[#A1A1AA]">{r.usage}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-6 space-y-4">
              <h3 className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F3EF]">
                Shadow & Single-Elevation Rules
              </h3>
              <div className="space-y-3">
                {RADIUS_AND_ELEVATION.elevations.map((el) => (
                  <div
                    key={el.level}
                    className="p-3 border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px]"
                  >
                    <p className="text-sm font-semibold text-[#141413] dark:text-[#F4F3EF]">
                      {el.level}
                    </p>
                    <p className="text-xs font-mono text-[#1E40AF] dark:text-[#60A5FA] mt-0.5">
                      {el.spec}
                    </p>
                    <p className="text-xs text-[#575550] dark:text-[#A1A1AA] mt-1">{el.usage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grid & Breakpoints */}
        <div className="bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-6 sm:p-8 space-y-5">
          <h3 className="font-display text-xl font-bold text-[#141413] dark:text-[#F4F3EF]">
            Responsive Grid & Breakpoint Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left border-collapse">
              <thead>
                <tr className="border-b border-[#DEDAD2] dark:border-[#2D3139] text-xs font-mono text-[#575550] dark:text-[#A1A1AA]">
                  <th className="py-3 pr-4">Breakpoint</th>
                  <th className="py-3 px-4">Viewport Range</th>
                  <th className="py-3 px-4">Columns</th>
                  <th className="py-3 px-4">Gutter</th>
                  <th className="py-3 pl-4">Layout Guidance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DEDAD2] dark:divide-[#2D3139] text-sm">
                {RADIUS_AND_ELEVATION.breakpoints.map((bp) => (
                  <tr key={bp.name}>
                    <td className="py-3.5 pr-4 font-semibold text-[#141413] dark:text-[#F4F3EF]">
                      {bp.name}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs tabular-nums text-[#1E40AF] dark:text-[#60A5FA]">
                      {bp.width}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-[#141413] dark:text-[#F4F3EF]">
                      {bp.columns}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs tabular-nums text-[#575550] dark:text-[#A1A1AA]">
                      {bp.gutter}
                    </td>
                    <td className="py-3.5 pl-4 text-[#575550] dark:text-[#A1A1AA]">
                      {bp.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
