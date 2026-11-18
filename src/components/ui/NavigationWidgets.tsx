import React, { useState } from 'react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronRight,
  Columns2,
  Grid2x2,
  Italic,
  LayoutList,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Redo2,
  SlidersHorizontal,
  Underline,
  Undo2,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  GeoArchiveIcon,
  GeoCompassIcon,
  GeoGridIcon,
  GeoLayersIcon,
  GeoRulerIcon,
} from './BauhausIcons';

export const TopNavPreview: React.FC = () => {
  const [activeLink, setActiveLink] = useState('Collections');
  const [actionMsg, setActionMsg] = useState(false);

  return (
    <div className="border border-[#DEDAD2] dark:border-[#2D3139] bg-white dark:bg-[#1A1C21] rounded-[2px]">
      <div className="flex items-center justify-between gap-6 px-5 py-3.5">
        <span className="font-display text-base font-bold tracking-tight text-[#141413] dark:text-[#F4F3EF] whitespace-nowrap shrink-0">
          Atelier Exhibition
        </span>
        <nav className="hidden sm:flex items-center gap-5 text-sm font-medium">
          {['Collections', 'Catalog', 'Typographic Grid', 'Archive'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveLink(item)}
              className={`whitespace-nowrap shrink-0 pb-0.5 border-b-2 transition-colors cursor-pointer ${
                activeLink === item
                  ? 'border-[#1E40AF] text-[#141413] dark:border-[#3B82F6] dark:text-[#F4F3EF]'
                  : 'border-transparent text-[#575550] hover:text-[#141413] dark:text-[#A1A1AA] dark:hover:text-[#F4F3EF]'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setActionMsg((v) => !v)}
          className="px-3.5 py-2 text-xs font-semibold rounded-[2px] bg-[#1E40AF] text-white hover:bg-[#1E3A8A] dark:bg-[#3B82F6] dark:text-[#0B0F19] whitespace-nowrap shrink-0 cursor-pointer transition-colors"
        >
          {actionMsg ? 'Published' : 'Publish Kit'}
        </button>
      </div>
    </div>
  );
};

export const SidebarNavPreview: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Overview');

  const items = [
    { label: 'Overview', Icon: GeoGridIcon },
    { label: 'Foundations', Icon: GeoCompassIcon },
    { label: 'Components', Icon: GeoLayersIcon },
    { label: 'Spacing Rules', Icon: GeoRulerIcon },
    { label: 'Archive', Icon: GeoArchiveIcon },
  ];

  return (
    <div className="border border-[#DEDAD2] dark:border-[#2D3139] bg-white dark:bg-[#1A1C21] rounded-[2px] p-3 flex flex-col justify-between gap-4">
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#DEDAD2] dark:border-[#2D3139]">
        {!collapsed && (
          <span className="text-xs font-mono font-semibold text-[#575550] dark:text-[#A1A1AA]">
            Studio Rail
          </span>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="h-8 w-8 inline-flex items-center justify-center rounded-[2px] hover:bg-[#EFECE6] dark:hover:bg-[#22252C] text-[#141413] dark:text-[#F4F3EF] cursor-pointer"
        >
          {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      <nav className="flex flex-col gap-1" aria-label="Sample Studio Sidebar">
        {items.map(({ label, Icon }) => {
          const active = activeItem === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setActiveItem(label)}
              title={label}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-[2px] text-sm font-medium transition-colors cursor-pointer ${
                active
                  ? 'bg-[#141413] text-white dark:bg-[#F4F3EF] dark:text-[#121316]'
                  : 'text-[#575550] hover:bg-[#EFECE6] hover:text-[#141413] dark:text-[#A1A1AA] dark:hover:bg-[#22252C] dark:hover:text-[#F4F3EF]'
              }`}
            >
              <Icon size={18} />
              {!collapsed && <span className="whitespace-nowrap">{label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export const MobileMenuPreview: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('Dashboard');

  return (
    <div className="border border-[#DEDAD2] dark:border-[#2D3139] bg-white dark:bg-[#1A1C21] rounded-[2px] overflow-hidden max-w-[340px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#DEDAD2] dark:border-[#2D3139]">
        <span className="font-display text-sm font-bold text-[#141413] dark:text-[#F4F3EF]">
          Atelier Mobile
        </span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle mobile menu"
          className="h-9 w-9 inline-flex items-center justify-center border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] text-[#141413] dark:text-[#F4F3EF] hover:bg-[#EFECE6] dark:hover:bg-[#22252C] cursor-pointer"
        >
          {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {open ? (
        <nav className="p-3 bg-[#F8F7F4] dark:bg-[#121316] space-y-1" aria-label="Mobile drawer preview">
          {['Dashboard', 'Exhibitions', 'Components', 'Team Access'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setSelected(item);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-[2px] flex items-center justify-between cursor-pointer ${
                selected === item
                  ? 'bg-[#1E40AF] text-white dark:bg-[#3B82F6] dark:text-[#0B0F19]'
                  : 'text-[#141413] dark:text-[#F4F3EF] hover:bg-[#EFECE6] dark:hover:bg-[#22252C]'
              }`}
            >
              <span>{item}</span>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>
          ))}
        </nav>
      ) : (
        <div className="px-4 py-5 text-xs text-[#575550] dark:text-[#A1A1AA]">
          Active route: <strong className="text-[#141413] dark:text-[#F4F3EF]">{selected}</strong>. Tap the menu trigger to inspect the mobile drawer.
        </div>
      )}
    </div>
  );
};

export const BreadcrumbPreview: React.FC = () => {
  const crumbs = ['Atelier System', 'Design Tokens', 'Components', 'Button Matrix'];
  const [activeIndex, setActiveIndex] = useState(3);

  return (
    <nav
      aria-label="Breadcrumb navigation"
      className="border border-[#DEDAD2] dark:border-[#2D3139] bg-white dark:bg-[#1A1C21] rounded-[2px] px-4 py-3 flex flex-wrap items-center gap-1.5 text-sm"
    >
      {crumbs.slice(0, activeIndex + 1).map((crumb, idx, arr) => {
        const isLast = idx === arr.length - 1;
        return (
          <React.Fragment key={crumb}>
            {idx > 0 && (
              <ChevronRight className="w-3.5 h-3.5 text-[#78716C] dark:text-[#71717A]" aria-hidden="true" />
            )}
            <button
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-current={isLast ? 'page' : undefined}
              className={`px-1.5 py-0.5 rounded-[2px] transition-colors cursor-pointer ${
                isLast
                  ? 'font-semibold text-[#141413] dark:text-[#F4F3EF]'
                  : 'text-[#575550] hover:text-[#1E40AF] dark:text-[#A1A1AA] dark:hover:text-[#60A5FA]'
              }`}
            >
              {crumb}
            </button>
          </React.Fragment>
        );
      })}
      {activeIndex < crumbs.length - 1 && (
        <button
          type="button"
          onClick={() => setActiveIndex(3)}
          className="ml-auto text-xs font-mono text-[#1E40AF] dark:text-[#60A5FA] hover:underline cursor-pointer"
        >
          Reset path
        </button>
      )}
    </nav>
  );
};

export const EditingToolbarPreview: React.FC = () => {
  const [formats, setFormats] = useState<{ bold: boolean; italic: boolean; underline: boolean }>({
    bold: true,
    italic: false,
    underline: false,
  });
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('left');
  const [swatch, setSwatch] = useState('#141413');
  const [historyCount, setHistoryCount] = useState(0);

  return (
    <div className="border border-[#DEDAD2] dark:border-[#2D3139] bg-white dark:bg-[#1A1C21] rounded-[2px] p-3 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-0.5 bg-[#F8F7F4] dark:bg-[#121316]">
          {[
            { key: 'bold' as const, Icon: Bold, label: 'Bold' },
            { key: 'italic' as const, Icon: Italic, label: 'Italic' },
            { key: 'underline' as const, Icon: Underline, label: 'Underline' },
          ].map(({ key, Icon, label }) => (
            <button
              key={key}
              type="button"
              aria-pressed={formats[key]}
              aria-label={label}
              onClick={() => setFormats((prev) => ({ ...prev, [key]: !prev[key] }))}
              className={`h-8 w-8 inline-flex items-center justify-center rounded-[2px] cursor-pointer transition-colors ${
                formats[key]
                  ? 'bg-[#141413] text-white dark:bg-[#F4F3EF] dark:text-[#121316]'
                  : 'text-[#575550] hover:text-[#141413] dark:text-[#A1A1AA] dark:hover:text-[#F4F3EF]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>

        <div className="flex items-center border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-0.5 bg-[#F8F7F4] dark:bg-[#121316]">
          {[
            { key: 'left' as const, Icon: AlignLeft, label: 'Align left' },
            { key: 'center' as const, Icon: AlignCenter, label: 'Align center' },
            { key: 'right' as const, Icon: AlignRight, label: 'Align right' },
          ].map(({ key, Icon, label }) => (
            <button
              key={key}
              type="button"
              aria-pressed={align === key}
              aria-label={label}
              onClick={() => setAlign(key)}
              className={`h-8 w-8 inline-flex items-center justify-center rounded-[2px] cursor-pointer transition-colors ${
                align === key
                  ? 'bg-[#1E40AF] text-white dark:bg-[#3B82F6] dark:text-[#0B0F19]'
                  : 'text-[#575550] hover:text-[#141413] dark:text-[#A1A1AA] dark:hover:text-[#F4F3EF]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 px-2 py-1 border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px]">
          {[
            { name: 'Obsidian', hex: '#141413' },
            { name: 'Cobalt', hex: '#1E40AF' },
            { name: 'Vermilion', hex: '#D9381E' },
            { name: 'Ochre', hex: '#D97706' },
          ].map((c) => (
            <button
              key={c.hex}
              type="button"
              aria-label={`Select ${c.name} ink`}
              onClick={() => setSwatch(c.hex)}
              className={`w-5 h-5 rounded-full cursor-pointer transition-transform ${
                swatch === c.hex ? 'ring-2 ring-offset-2 ring-[#141413] dark:ring-[#F4F3EF] scale-110' : ''
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <button
            type="button"
            aria-label="Undo edit"
            onClick={() => setHistoryCount((c) => c - 1)}
            className="h-8 w-8 inline-flex items-center justify-center border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] text-[#575550] hover:text-[#141413] dark:text-[#A1A1AA] dark:hover:text-[#F4F3EF] cursor-pointer"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            aria-label="Redo edit"
            onClick={() => setHistoryCount((c) => c + 1)}
            className="h-8 w-8 inline-flex items-center justify-center border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] text-[#575550] hover:text-[#141413] dark:text-[#A1A1AA] dark:hover:text-[#F4F3EF] cursor-pointer"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div
        className={`px-3 py-2.5 bg-[#F8F7F4] dark:bg-[#121316] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] text-sm ${
          formats.bold ? 'font-bold' : 'font-normal'
        } ${formats.italic ? 'italic' : ''} ${formats.underline ? 'underline' : ''}`}
        style={{
          textAlign: align,
          color: swatch === '#141413' ? undefined : swatch,
        }}
      >
        Bauhaus Specimen Preview — Step #{historyCount}
      </div>
    </div>
  );
};

export const ViewingToolbarPreview: React.FC = () => {
  const [zoom, setZoom] = useState(100);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'split'>('grid');
  const [showGuides, setShowGuides] = useState(true);

  return (
    <div className="border border-[#DEDAD2] dark:border-[#2D3139] bg-white dark:bg-[#1A1C21] rounded-[2px] p-3 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-1 p-0.5 bg-[#EFECE6] dark:bg-[#22252C] rounded-[2px]">
        {[
          { key: 'grid' as const, label: 'Grid', Icon: Grid2x2 },
          { key: 'list' as const, label: 'List', Icon: LayoutList },
          { key: 'split' as const, label: 'Split', Icon: Columns2 },
        ].map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setViewMode(key)}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-[2px] inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
              viewMode === key
                ? 'bg-white text-[#141413] dark:bg-[#1A1C21] dark:text-[#F4F3EF] shadow-xs'
                : 'text-[#575550] hover:text-[#141413] dark:text-[#A1A1AA] dark:hover:text-[#F4F3EF]'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowGuides((g) => !g)}
          aria-pressed={showGuides}
          className={`px-2.5 py-1.5 text-xs font-medium rounded-[2px] border inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
            showGuides
              ? 'border-[#1E40AF] text-[#1E40AF] bg-[#1E40AF]/5 dark:border-[#3B82F6] dark:text-[#60A5FA]'
              : 'border-[#DEDAD2] dark:border-[#2D3139] text-[#575550] dark:text-[#A1A1AA]'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Guides {showGuides ? 'On' : 'Off'}</span>
        </button>

        <div className="flex items-center border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px]">
          <button
            type="button"
            aria-label="Zoom out"
            onClick={() => setZoom((z) => Math.max(50, z - 25))}
            className="h-8 w-8 inline-flex items-center justify-center text-[#575550] hover:text-[#141413] dark:text-[#A1A1AA] dark:hover:text-[#F4F3EF] cursor-pointer"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="px-2 text-xs font-mono tabular-nums text-[#141413] dark:text-[#F4F3EF]">
            {zoom}%
          </span>
          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => setZoom((z) => Math.min(200, z + 25))}
            className="h-8 w-8 inline-flex items-center justify-center text-[#575550] hover:text-[#141413] dark:text-[#A1A1AA] dark:hover:text-[#F4F3EF] cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
