import React, { useState } from 'react';
import { ArrowRight, Check, Plus, Settings2 } from 'lucide-react';
import {
  Button,
  ButtonState,
  ButtonVariant,
  InputField,
} from '../ui/Primitives';
import { BAUHAUS_ICON_CATALOG } from '../ui/BauhausIcons';
import {
  ActionCard,
  InfoCard,
  MediaCard,
  ProductCard,
  ProfileCard,
  StatsCard,
} from '../ui/Cards';
import {
  BreadcrumbPreview,
  EditingToolbarPreview,
  MobileMenuPreview,
  SidebarNavPreview,
  TopNavPreview,
  ViewingToolbarPreview,
} from '../ui/NavigationWidgets';
import { FormsSuite } from '../ui/FormsSuite';
import { GENERATED_ASSETS } from '../../data/designSystemData';

type SubTab = 'elements' | 'cards' | 'navigation' | 'forms';

export const ComponentsShowcaseSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SubTab>('elements');
  const [showIconGrid, setShowIconGrid] = useState(true);
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  // Interactive Input Playground states
  const [liveText, setLiveText] = useState('Bauhaus Dessau Wing');
  const [liveEmail, setLiveEmail] = useState('curator@atelier.org');
  const [livePassword, setLivePassword] = useState('Grid1926!');
  const [liveSearch, setLiveSearch] = useState('Tubular Steel');
  const [liveNumber, setLiveNumber] = useState(24);
  const [cardNotice, setCardNotice] = useState<string | null>(null);

  const buttonVariants: { variant: ButtonVariant; label: string }[] = [
    { variant: 'primary', label: 'Primary' },
    { variant: 'secondary', label: 'Secondary' },
    { variant: 'outline', label: 'Outline' },
    { variant: 'ghost', label: 'Ghost' },
    { variant: 'icon', label: 'Icon' },
  ];

  const buttonStates: { state: ButtonState; label: string }[] = [
    { state: 'default', label: 'Default' },
    { state: 'hover', label: 'Hover' },
    { state: 'active', label: 'Active' },
    { state: 'focus', label: 'Focus' },
    { state: 'disabled', label: 'Disabled' },
  ];

  const handleCopyIcon = (token: string) => {
    navigator.clipboard?.writeText(`<${token} size={20} />`);
    setCopiedIcon(token);
    setTimeout(() => setCopiedIcon(null), 1600);
  };

  return (
    <section id="components" className="py-16 border-b border-[#DEDAD2] dark:border-[#2D3139]">
      <div className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-3">
            <p className="text-xs font-mono text-[#1E40AF] dark:text-[#60A5FA]">
              02 – 05. Reusable Component Library
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] dark:text-[#F4F3EF] text-balance">
              Primitives, Cards, Navigation, and Validated Forms
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm text-[#575550] dark:text-[#A1A1AA] leading-relaxed">
              Every UI element is interactive, keyboard-accessible, and rendered across complete state matrices in both Light and Dark themes.
            </p>
          </div>
        </div>

        {/* Category Switcher */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#EFECE6] dark:bg-[#22252C] rounded-[2px] w-fit">
          {[
            { id: 'elements' as const, label: '02. Buttons, Inputs & Icons' },
            { id: 'cards' as const, label: '03. Card Components (6)' },
            { id: 'navigation' as const, label: '04. Navigation & Toolbars (6)' },
            { id: 'forms' as const, label: '05. Forms & Validation (3)' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-[2px] whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-[#141413] dark:bg-[#1A1C21] dark:text-[#F4F3EF]'
                  : 'text-[#575550] hover:text-[#141413] dark:text-[#A1A1AA] dark:hover:text-[#F4F3EF]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: BASIC UI ELEMENTS */}
        {activeTab === 'elements' && (
          <div className="space-y-12">
            {/* Button State Matrix */}
            <div className="bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#141413] dark:text-[#F4F3EF]">
                    Button Variants & Five-State Matrix
                  </h3>
                  <p className="text-sm text-[#575550] dark:text-[#A1A1AA] mt-1">
                    40px minimum height, 2:1 horizontal-to-vertical padding rhythm, and 2px Bauhaus corner radius.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#575550] dark:text-[#A1A1AA]">
                  5 Variants × 5 States = 25 Specs
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#DEDAD2] dark:border-[#2D3139] text-xs font-mono text-[#575550] dark:text-[#A1A1AA]">
                      <th className="py-3 pr-4 font-semibold">Variant</th>
                      {buttonStates.map((st) => (
                        <th key={st.state} className="py-3 px-3 font-semibold">
                          {st.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DEDAD2] dark:divide-[#2D3139]">
                    {buttonVariants.map(({ variant, label }) => (
                      <tr key={variant}>
                        <td className="py-4 pr-4 text-sm font-semibold text-[#141413] dark:text-[#F4F3EF]">
                          {label}
                        </td>
                        {buttonStates.map(({ state }) => (
                          <td key={state} className="py-4 px-3">
                            {variant === 'icon' ? (
                              <Button
                                variant="icon"
                                simulatedState={state}
                                aria-label={`${label} button ${state} state`}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            ) : (
                              <Button
                                variant={variant}
                                simulatedState={state}
                                rightIcon={
                                  variant === 'primary' ? (
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  ) : undefined
                                }
                              >
                                {label}
                              </Button>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Interactive Input Types + Input State Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-6 sm:p-8 space-y-5">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#141413] dark:text-[#F4F3EF]">
                    Interactive Input Types
                  </h3>
                  <p className="text-sm text-[#575550] dark:text-[#A1A1AA] mt-1">
                    Live Text, Email, Password (show/hide), Search (clearable), and Number (stepper) controls.
                  </p>
                </div>

                <InputField
                  id="demo-text"
                  label="Text Input — Project Title"
                  type="text"
                  value={liveText}
                  onChange={(e) => setLiveText(e.target.value)}
                  helperText="Standard single-line text entry."
                />
                <InputField
                  id="demo-email"
                  label="Email Input — Curator Contact"
                  type="email"
                  value={liveEmail}
                  onChange={(e) => setLiveEmail(e.target.value)}
                  helperText="RFC-compliant email field."
                />
                <InputField
                  id="demo-password"
                  label="Password Input — Studio Key"
                  type="password"
                  value={livePassword}
                  onChange={(e) => setLivePassword(e.target.value)}
                  helperText="Toggle visibility using the eye icon."
                />
                <InputField
                  id="demo-search"
                  label="Search Input — Archive Filter"
                  type="search"
                  value={liveSearch}
                  onChange={(e) => setLiveSearch(e.target.value)}
                  onClearSearch={() => setLiveSearch('')}
                  helperText="Click × to clear the search query."
                />
                <InputField
                  id="demo-number"
                  label="Number Input — Grid Spacing (px)"
                  type="number"
                  value={liveNumber}
                  onChange={(e) => setLiveNumber(Number(e.target.value) || 0)}
                  onNumberStep={(val) => setLiveNumber(Math.max(4, val))}
                  helperText="Tabular numerals with ± stepper controls."
                />
              </div>

              <div className="lg:col-span-6 bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-6 sm:p-8 space-y-5">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#141413] dark:text-[#F4F3EF]">
                    Input Five-State Specimen
                  </h3>
                  <p className="text-sm text-[#575550] dark:text-[#A1A1AA] mt-1">
                    Explicit border, ring, icon, and text feedback across all five lifecycle states.
                  </p>
                </div>

                <InputField
                  id="state-default"
                  label="01. Default State"
                  type="text"
                  state="default"
                  defaultValue="Atelier Grid Module"
                  helperText="Resting state with 1px hairline border."
                />
                <InputField
                  id="state-focus"
                  label="02. Focus State"
                  type="text"
                  state="focus"
                  defaultValue="Active keyboard focus"
                  helperText="2px Bauhaus Cobalt focus ring for WCAG visibility."
                />
                <InputField
                  id="state-error"
                  label="03. Error State"
                  type="email"
                  defaultValue="invalid-domain@"
                  errorMessage="Email domain is incomplete. Include a valid top-level domain."
                />
                <InputField
                  id="state-success"
                  label="04. Success State"
                  type="email"
                  defaultValue="clara.vogel@bauhaus.org"
                  successMessage="Address verified against studio directory."
                />
                <InputField
                  id="state-disabled"
                  label="05. Disabled State"
                  type="text"
                  state="disabled"
                  defaultValue="Read-only system identifier"
                  helperText="Non-interactive field locked by permissions."
                />
              </div>
            </div>

            {/* Bauhaus Geometric Icon Set */}
            <div className="bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#141413] dark:text-[#F4F3EF]">
                    Bespoke Geometric Icon System (24×24 Keyline Grid)
                  </h3>
                  <p className="text-sm text-[#575550] dark:text-[#A1A1AA] mt-1">
                    Constructed from pure circles, squares, and 45°/90° strokes at uniform 1.75px weight. Click any icon to copy JSX.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowIconGrid((g) => !g)}
                  leftIcon={<Settings2 className="w-3.5 h-3.5" />}
                >
                  {showIconGrid ? 'Hide 24×24 Grid' : 'Show 24×24 Grid'}
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {BAUHAUS_ICON_CATALOG.map(({ id, name, token, Component }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleCopyIcon(token)}
                    className="group p-4 border border-[#DEDAD2] dark:border-[#2D3139] hover:border-[#1E40AF] dark:hover:border-[#3B82F6] bg-[#F8F7F4] dark:bg-[#121316] rounded-[2px] flex flex-col items-center gap-3 text-center transition-colors cursor-pointer"
                  >
                    <div className="text-[#141413] dark:text-[#F4F3EF] group-hover:text-[#1E40AF] dark:group-hover:text-[#60A5FA] transition-colors">
                      <Component size={32} showGrid={showIconGrid} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#141413] dark:text-[#F4F3EF]">
                        {name}
                      </p>
                      <p className="text-[11px] font-mono text-[#575550] dark:text-[#A1A1AA] mt-0.5 flex items-center justify-center gap-1">
                        {copiedIcon === token ? (
                          <>
                            <Check className="w-3 h-3 text-[#15803D]" />
                            <span className="text-[#15803D] dark:text-[#22C55E]">Copied</span>
                          </>
                        ) : (
                          <span>{token}</span>
                        )}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CARD COMPONENTS */}
        {activeTab === 'cards' && (
          <div className="space-y-6">
            {cardNotice && (
              <div
                role="status"
                className="px-4 py-3 bg-white dark:bg-[#1A1C21] border border-[#1E40AF] dark:border-[#3B82F6] rounded-[2px] text-sm flex items-center justify-between"
              >
                <span className="text-[#141413] dark:text-[#F4F3EF]">{cardNotice}</span>
                <button
                  type="button"
                  onClick={() => setCardNotice(null)}
                  className="text-xs font-mono text-[#1E40AF] dark:text-[#60A5FA] cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoCard
                kicker="01 · Information Card"
                title="Modular Typographic Rhythm"
                description="Swiss grid modules separate hierarchy through clean 24px internal padding, hairline dividers, and zero nested box clutter."
                meta="Spec 1.4 · 24px Pad"
                onInspect={() => setCardNotice('Inspected Information Card specifications (24px padding, 1px hairline border).')}
              />

              <MediaCard
                imageSrc={GENERATED_ASSETS.mediaArchitecture}
                imageAlt="Minimalist concrete and glass exhibition pavilion"
                kicker="02 · Image & Media Card"
                title="Dessau Pavilion Light Study"
                caption="Architectural planes photographed at 4:3 museum aspect ratio with balanced typographic caption framing."
                onOpenExhibition={() => setCardNotice('Opened Dessau Pavilion Light Study archival plate.')}
              />

              <ProfileCard
                avatarSrc={GENERATED_ASSETS.profileDesigner}
                name="Clara Vogel"
                role="Principal Systems Designer"
                studio="Atelier Raster · Zurich"
                bio="Specializes in geometric grid architectures, accessible typography systems, and cross-platform token pipelines."
                metrics={[
                  { label: 'Components', value: '48' },
                  { label: 'Tokens', value: '124' },
                  { label: 'Audits', value: '19' },
                ]}
              />

              <ProductCard
                imageSrc={GENERATED_ASSETS.productLamp}
                title="MT8 Opal Table Lamp"
                designer="Wilhelm Wagenfeld Edition"
                price="$420"
                edition="Numbered Series"
              />

              <StatsCard
                label="05 · Component Adoption Rate"
                value="94.6%"
                delta="+12.4%"
                period="Active across 14 studio templates"
                bars={[38, 44, 52, 60, 68, 74, 86, 95]}
                accent="cobalt"
              />

              <ActionCard
                title="06 · Export Design Token Bundle"
                description="Generate synchronized CSS custom properties and Tailwind v4 theme variables for Light and Dark studio modes."
                primaryLabel="Generate Bundle"
                secondaryLabel="Review Changelog"
                onPrimaryAction={() => setCardNotice('Design token bundle queued for export.')}
              />
            </div>
          </div>
        )}

        {/* TAB 3: NAVIGATION & TOOLBARS */}
        {activeTab === 'navigation' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-12 space-y-3">
              <h3 className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F3EF]">
                01. Responsive Top Navigation Bar (3-Zone Contract)
              </h3>
              <TopNavPreview />
            </div>

            <div className="lg:col-span-12 space-y-3">
              <h3 className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F3EF]">
                02. Interactive Breadcrumb Trail
              </h3>
              <BreadcrumbPreview />
            </div>

            <div className="lg:col-span-4 space-y-3">
              <h3 className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F3EF]">
                03. Collapsible Sidebar Rail
              </h3>
              <SidebarNavPreview />
            </div>

            <div className="lg:col-span-4 space-y-3">
              <h3 className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F3EF]">
                04. Mobile Navigation Menu
              </h3>
              <MobileMenuPreview />
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-3">
                <h3 className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F3EF]">
                  05. Editing Toolbar
                </h3>
                <EditingToolbarPreview />
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F3EF]">
                  06. Viewing Toolbar
                </h3>
                <ViewingToolbarPreview />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FORMS & VALIDATION */}
        {activeTab === 'forms' && <FormsSuite />}
      </div>
    </section>
  );
};
