import React, { useState } from 'react';
import {
  Check,
  ChevronRight,
  Grid2x2,
  LayoutList,
  Menu,
  Monitor,
  Plus,
  Smartphone,
  Tablet,
  X,
} from 'lucide-react';
import { Button, InputField } from '../ui/Primitives';
import { MediaCard, StatsCard } from '../ui/Cards';
import {
  GeoArchiveIcon,
  GeoCompassIcon,
  GeoGridIcon,
  GeoLayersIcon,
  GeoSliderIcon,
} from '../ui/BauhausIcons';
import { EditingToolbarPreview } from '../ui/NavigationWidgets';
import { GENERATED_ASSETS } from '../../data/designSystemData';

type ProtoNav = 'overview' | 'deliverables' | 'analytics' | 'specs';
type ProtoViewport = 'desktop' | 'tablet' | 'mobile';
type DeliverableStatus = 'In Progress' | 'Review' | 'Approved';

interface DeliverableItem {
  id: string;
  title: string;
  owner: string;
  ownerEmail: string;
  wing: string;
  status: DeliverableStatus;
  completion: number;
}

const INITIAL_DELIVERABLES: DeliverableItem[] = [
  {
    id: 'AT-101',
    title: 'Modular Grid Exhibition Signage',
    owner: 'Clara Vogel',
    ownerEmail: 'c.vogel@atelier.org',
    wing: 'Dessau Wing A',
    status: 'Approved',
    completion: 100,
  },
  {
    id: 'AT-102',
    title: 'Tubular Steel Seating Catalog',
    owner: 'Lukas Meyer',
    ownerEmail: 'l.meyer@atelier.org',
    wing: 'Industrial Gallery',
    status: 'Review',
    completion: 85,
  },
  {
    id: 'AT-103',
    title: 'Primary Triad Typography Poster',
    owner: 'Hannah Weber',
    ownerEmail: 'h.weber@atelier.org',
    wing: 'Print Archive',
    status: 'In Progress',
    completion: 60,
  },
  {
    id: 'AT-104',
    title: 'Accessible Wayfinding Kiosk UI',
    owner: 'Mateo Silva',
    ownerEmail: 'm.silva@atelier.org',
    wing: 'Central Atrium',
    status: 'In Progress',
    completion: 45,
  },
];

export const PrototypeSection: React.FC = () => {
  const [viewport, setViewport] = useState<ProtoViewport>('desktop');
  const [activeNav, setActiveNav] = useState<ProtoNav>('overview');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [statusFilter, setStatusFilter] = useState<'All' | DeliverableStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [deliverables, setDeliverables] = useState<DeliverableItem[]>(INITIAL_DELIVERABLES);

  // Modal state for validated task creation inside prototype
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newWing, setNewWing] = useState('Dessau Wing B');
  const [formErrors, setFormErrors] = useState<{ title?: string; owner?: string; email?: string }>({});

  const filteredDeliverables = deliverables.filter((item) => {
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.wing.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCycleStatus = (id: string) => {
    const order: DeliverableStatus[] = ['In Progress', 'Review', 'Approved'];
    setDeliverables((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        const nextStatus = order[(order.indexOf(d.status) + 1) % order.length];
        return {
          ...d,
          status: nextStatus,
          completion: nextStatus === 'Approved' ? 100 : nextStatus === 'Review' ? 85 : 50,
        };
      })
    );
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { title?: string; owner?: string; email?: string } = {};
    if (newTitle.trim().length < 3) errs.title = 'Enter a deliverable title (3+ characters).';
    if (newOwner.trim().length < 2) errs.owner = 'Enter the assigned designer name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail.trim()))
      errs.email = 'Provide a valid studio email address.';

    setFormErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const nextItem: DeliverableItem = {
      id: `AT-${105 + deliverables.length}`,
      title: newTitle.trim(),
      owner: newOwner.trim(),
      ownerEmail: newEmail.trim(),
      wing: newWing,
      status: 'In Progress',
      completion: 25,
    };

    setDeliverables((prev) => [nextItem, ...prev]);
    setNewTitle('');
    setNewOwner('');
    setNewEmail('');
    setFormErrors({});
    setShowCreateModal(false);
    setActiveNav('deliverables');
  };

  const navItems: { id: ProtoNav; label: string; Icon: React.FC<{ size?: number }> }[] = [
    { id: 'overview', label: 'Overview', Icon: GeoGridIcon },
    { id: 'deliverables', label: 'Deliverables', Icon: GeoLayersIcon },
    { id: 'analytics', label: 'Analytics', Icon: GeoCompassIcon },
    { id: 'specs', label: 'Spec Editor', Icon: GeoSliderIcon },
  ];

  const isCompactFrame = viewport !== 'desktop';

  return (
    <section id="prototype" className="py-16 border-b border-[#DEDAD2] dark:border-[#2D3139]">
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-3">
            <p className="text-xs font-mono text-[#D9381E] dark:text-[#EF4444]">
              07A. Interactive Application Prototype
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] dark:text-[#F4F3EF] text-balance">
              Atelier Studio — Exhibition & Design Ops Dashboard
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-wrap items-center lg:justify-end gap-2">
            <div className="flex items-center gap-1 p-1 bg-[#EFECE6] dark:bg-[#22252C] rounded-[2px]">
              {[
                { id: 'desktop' as const, label: 'Desktop', Icon: Monitor },
                { id: 'tablet' as const, label: 'Tablet 768px', Icon: Tablet },
                { id: 'mobile' as const, label: 'Mobile 390px', Icon: Smartphone },
              ].map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setViewport(id);
                    setMobileDrawerOpen(false);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-[2px] inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                    viewport === id
                      ? 'bg-white text-[#141413] dark:bg-[#1A1C21] dark:text-[#F4F3EF]'
                      : 'text-[#575550] hover:text-[#141413] dark:text-[#A1A1AA] dark:hover:text-[#F4F3EF]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Prototype Shell Container */}
        <div className="flex justify-center bg-[#EFECE6]/70 dark:bg-[#0D0E10] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-3 sm:p-6">
          <div
            className={`relative bg-[#F8F7F4] dark:bg-[#121316] border border-[#141413]/25 dark:border-[#3F3F46] rounded-[2px] overflow-hidden transition-all duration-300 w-full ${
              viewport === 'mobile'
                ? 'max-w-[390px]'
                : viewport === 'tablet'
                  ? 'max-w-[768px]'
                  : 'max-w-full'
            }`}
          >
            {/* Prototype Top Bar */}
            <div className="bg-white dark:bg-[#1A1C21] border-b border-[#DEDAD2] dark:border-[#2D3139] px-4 py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {isCompactFrame && (
                  <button
                    type="button"
                    aria-label="Toggle prototype mobile menu"
                    onClick={() => setMobileDrawerOpen((o) => !o)}
                    className="h-9 w-9 inline-flex items-center justify-center border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] text-[#141413] dark:text-[#F4F3EF] cursor-pointer"
                  >
                    {mobileDrawerOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                  </button>
                )}
                <span className="font-display text-base font-bold text-[#141413] dark:text-[#F4F3EF] whitespace-nowrap">
                  Atelier Studio
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowCreateModal(true)}
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                >
                  New Deliverable
                </Button>
              </div>
            </div>

            {/* Mobile/Tablet Drawer */}
            {isCompactFrame && mobileDrawerOpen && (
              <nav
                aria-label="Prototype mobile navigation"
                className="bg-white dark:bg-[#1A1C21] border-b border-[#DEDAD2] dark:border-[#2D3139] p-3 space-y-1"
              >
                {navItems.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setActiveNav(id);
                      setMobileDrawerOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium rounded-[2px] cursor-pointer ${
                      activeNav === id
                        ? 'bg-[#141413] text-white dark:bg-[#F4F3EF] dark:text-[#121316]'
                        : 'text-[#575550] dark:text-[#A1A1AA] hover:bg-[#EFECE6] dark:hover:bg-[#22252C]'
                    }`}
                  >
                    <Icon size={17} />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
            )}

            <div className="flex min-h-[560px]">
              {/* Desktop Persistent Sidebar */}
              {!isCompactFrame && (
                <aside className="w-56 shrink-0 bg-white dark:bg-[#1A1C21] border-r border-[#DEDAD2] dark:border-[#2D3139] p-4 flex flex-col justify-between">
                  <nav className="space-y-1" aria-label="Prototype desktop navigation">
                    {navItems.map(({ id, label, Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setActiveNav(id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-[2px] transition-colors cursor-pointer ${
                          activeNav === id
                            ? 'bg-[#141413] text-white dark:bg-[#F4F3EF] dark:text-[#121316]'
                            : 'text-[#575550] hover:bg-[#EFECE6] hover:text-[#141413] dark:text-[#A1A1AA] dark:hover:bg-[#22252C] dark:hover:text-[#F4F3EF]'
                        }`}
                      >
                        <Icon size={17} />
                        <span>{label}</span>
                      </button>
                    ))}
                  </nav>

                  <div className="p-3 bg-[#F8F7F4] dark:bg-[#121316] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] space-y-1">
                    <p className="text-xs font-semibold text-[#141413] dark:text-[#F4F3EF]">
                      2026 Dessau Exhibition
                    </p>
                    <p className="text-xs text-[#575550] dark:text-[#A1A1AA] tabular-nums">
                      {deliverables.filter((d) => d.status === 'Approved').length} / {deliverables.length} approved
                    </p>
                  </div>
                </aside>
              )}

              {/* Prototype Main Viewport */}
              <div className="flex-1 p-4 sm:p-6 space-y-6 min-w-0">
                {/* Breadcrumb */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <nav className="flex items-center gap-1.5 text-xs text-[#575550] dark:text-[#A1A1AA]">
                    <button
                      type="button"
                      onClick={() => setActiveNav('overview')}
                      className="hover:text-[#141413] dark:hover:text-[#F4F3EF] cursor-pointer"
                    >
                      Atelier Studio
                    </button>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="font-semibold text-[#141413] dark:text-[#F4F3EF] capitalize">
                      {activeNav}
                    </span>
                  </nav>

                  <span className="text-xs font-mono text-[#575550] dark:text-[#A1A1AA]">
                    Viewport: {viewport === 'desktop' ? '1440px Grid' : viewport === 'tablet' ? '768px Tablet' : '390px Mobile'}
                  </span>
                </div>

                {activeNav === 'overview' && (
                  <div className="space-y-6">
                    <div
                      className={`grid gap-4 ${
                        viewport === 'mobile'
                          ? 'grid-cols-1'
                          : viewport === 'tablet'
                            ? 'grid-cols-2'
                            : 'grid-cols-3'
                      }`}
                    >
                      <StatsCard
                        label="Active Deliverables"
                        value={String(deliverables.length)}
                        delta="+2 this week"
                        period="Studio Sprint 04"
                        bars={[40, 55, 62, 70, 82, 90]}
                        accent="cobalt"
                      />
                      <StatsCard
                        label="Approved Plates"
                        value={`${Math.round(
                          (deliverables.filter((d) => d.status === 'Approved').length /
                            Math.max(1, deliverables.length)) *
                            100
                        )}%`}
                        delta="On Schedule"
                        period="Curatorial QA"
                        bars={[30, 45, 58, 66, 75, 88]}
                        accent="vermilion"
                      />
                      <div className={viewport === 'tablet' ? 'col-span-2' : ''}>
                        <MediaCard
                          imageSrc={GENERATED_ASSETS.mediaArchitecture}
                          imageAlt="Exhibition pavilion reference"
                          kicker="Featured Venue"
                          title="North Light Pavilion"
                          caption="Primary gallery installation layout verified against 12-column signage system."
                          onOpenExhibition={() => setActiveNav('deliverables')}
                        />
                      </div>
                    </div>

                    <div className="bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-5 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h4 className="font-display text-base font-bold text-[#141413] dark:text-[#F4F3EF]">
                          Quick Workspace Actions
                        </h4>
                        <p className="text-xs text-[#575550] dark:text-[#A1A1AA] mt-0.5">
                          Jump directly to deliverables filtering or inspect the typographic editing toolbar.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" onClick={() => setActiveNav('deliverables')}>
                          Manage Deliverables
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => setActiveNav('specs')}>
                          Open Spec Editor
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {activeNav === 'deliverables' && (
                  <div className="space-y-5">
                    {/* Prototype Viewing & Filter Toolbar */}
                    <div className="bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-4 flex flex-col gap-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-1 p-1 bg-[#EFECE6] dark:bg-[#22252C] rounded-[2px]">
                          {(['All', 'In Progress', 'Review', 'Approved'] as const).map((st) => (
                            <button
                              key={st}
                              type="button"
                              onClick={() => setStatusFilter(st)}
                              className={`px-2.5 py-1.5 text-xs font-semibold rounded-[2px] cursor-pointer transition-colors ${
                                statusFilter === st
                                  ? 'bg-white text-[#141413] dark:bg-[#1A1C21] dark:text-[#F4F3EF]'
                                  : 'text-[#575550] hover:text-[#141413] dark:text-[#A1A1AA]'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center gap-1 p-1 bg-[#EFECE6] dark:bg-[#22252C] rounded-[2px]">
                          <button
                            type="button"
                            aria-label="List view"
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-[2px] cursor-pointer ${
                              viewMode === 'list'
                                ? 'bg-white text-[#141413] dark:bg-[#1A1C21] dark:text-[#F4F3EF]'
                                : 'text-[#575550] dark:text-[#A1A1AA]'
                            }`}
                          >
                            <LayoutList className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            aria-label="Grid view"
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-[2px] cursor-pointer ${
                              viewMode === 'grid'
                                ? 'bg-white text-[#141413] dark:bg-[#1A1C21] dark:text-[#F4F3EF]'
                                : 'text-[#575550] dark:text-[#A1A1AA]'
                            }`}
                          >
                            <Grid2x2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <InputField
                        id="proto-search"
                        label="Filter Deliverables"
                        type="search"
                        placeholder="Search by deliverable, designer, or wing..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClearSearch={() => setSearchQuery('')}
                      />
                    </div>

                    {filteredDeliverables.length === 0 ? (
                      <div className="bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-8 text-center space-y-3">
                        <GeoArchiveIcon size={28} className="mx-auto text-[#575550]" />
                        <p className="text-sm font-semibold text-[#141413] dark:text-[#F4F3EF]">
                          No deliverables match your current filter.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setStatusFilter('All');
                            setSearchQuery('');
                          }}
                        >
                          Clear Filters
                        </Button>
                      </div>
                    ) : viewMode === 'grid' || viewport === 'mobile' ? (
                      <div
                        className={`grid gap-4 ${
                          viewport === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'
                        }`}
                      >
                        {filteredDeliverables.map((item) => (
                          <div
                            key={item.id}
                            className="bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] p-4 space-y-3"
                          >
                            <div className="flex items-center justify-between text-xs font-mono text-[#575550] dark:text-[#A1A1AA]">
                              <span>{item.id}</span>
                              <span>{item.completion}%</span>
                            </div>
                            <h4 className="font-display text-base font-bold text-[#141413] dark:text-[#F4F3EF]">
                              {item.title}
                            </h4>
                            <p className="text-xs text-[#575550] dark:text-[#A1A1AA]">
                              {item.owner} · {item.wing}
                            </p>
                            <div className="pt-3 border-t border-[#DEDAD2] dark:border-[#2D3139] flex items-center justify-between">
                              <span
                                className={`text-xs font-semibold ${
                                  item.status === 'Approved'
                                    ? 'text-[#15803D] dark:text-[#22C55E]'
                                    : item.status === 'Review'
                                      ? 'text-[#B45309] dark:text-[#F59E0B]'
                                      : 'text-[#1E40AF] dark:text-[#60A5FA]'
                                }`}
                              >
                                {item.status}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCycleStatus(item.id)}
                              >
                                Advance Status
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-[#DEDAD2] dark:border-[#2D3139] text-xs font-mono text-[#575550] dark:text-[#A1A1AA]">
                              <th className="py-3 px-4">ID</th>
                              <th className="py-3 px-4">Deliverable</th>
                              <th className="py-3 px-4">Owner</th>
                              <th className="py-3 px-4">Status</th>
                              <th className="py-3 px-4 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#DEDAD2] dark:divide-[#2D3139] text-sm">
                            {filteredDeliverables.map((item) => (
                              <tr key={item.id} className="hover:bg-[#F8F7F4] dark:hover:bg-[#121316]">
                                <td className="py-3 px-4 font-mono text-xs text-[#575550] dark:text-[#A1A1AA]">
                                  {item.id}
                                </td>
                                <td className="py-3 px-4 font-medium text-[#141413] dark:text-[#F4F3EF]">
                                  <div>{item.title}</div>
                                  <div className="text-xs text-[#575550] dark:text-[#A1A1AA]">
                                    {item.wing}
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-xs text-[#575550] dark:text-[#A1A1AA]">
                                  {item.owner}
                                </td>
                                <td className="py-3 px-4 text-xs font-semibold">
                                  <span
                                    className={
                                      item.status === 'Approved'
                                        ? 'text-[#15803D] dark:text-[#22C55E]'
                                        : item.status === 'Review'
                                          ? 'text-[#B45309] dark:text-[#F59E0B]'
                                          : 'text-[#1E40AF] dark:text-[#60A5FA]'
                                    }
                                  >
                                    {item.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleCycleStatus(item.id)}
                                    leftIcon={<Check className="w-3.5 h-3.5" />}
                                  >
                                    Cycle
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {activeNav === 'analytics' && (
                  <div
                    className={`grid gap-4 ${
                      viewport === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'
                    }`}
                  >
                    <StatsCard
                      label="Grid Alignment Consistency"
                      value="98.2%"
                      delta="+4.1%"
                      period="Automated Layout Audit"
                      bars={[72, 78, 84, 89, 94, 98]}
                      accent="cobalt"
                    />
                    <StatsCard
                      label="WCAG AA Contrast Pass"
                      value="100%"
                      delta="Verified"
                      period="Light & Dark Pairs"
                      bars={[90, 92, 95, 97, 99, 100]}
                      accent="ochre"
                    />
                  </div>
                )}

                {activeNav === 'specs' && (
                  <div className="space-y-4">
                    <h4 className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F3EF]">
                      Exhibition Wall Label Formatting Toolbar
                    </h4>
                    <EditingToolbarPreview />
                  </div>
                )}
              </div>
            </div>

            {/* Validated Modal inside Prototype */}
            {showCreateModal && (
              <div
                className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center p-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-deliverable-title"
              >
                <div className="w-full max-w-md bg-white dark:bg-[#1A1C21] border border-[#141413] dark:border-[#52525B] rounded-[2px] p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4
                      id="create-deliverable-title"
                      className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F3EF]"
                    >
                      Add Studio Deliverable
                    </h4>
                    <button
                      type="button"
                      aria-label="Close modal"
                      onClick={() => setShowCreateModal(false)}
                      className="h-8 w-8 inline-flex items-center justify-center rounded-[2px] hover:bg-[#EFECE6] dark:hover:bg-[#22252C] cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateSubmit} noValidate className="space-y-4">
                    <InputField
                      id="proto-new-title"
                      label="Deliverable Title"
                      required
                      placeholder="e.g., Bauhaus Signage Kit"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      errorMessage={formErrors.title}
                    />
                    <InputField
                      id="proto-new-owner"
                      label="Lead Designer"
                      required
                      placeholder="e.g., Marcel Breuer"
                      value={newOwner}
                      onChange={(e) => setNewOwner(e.target.value)}
                      errorMessage={formErrors.owner}
                    />
                    <InputField
                      id="proto-new-email"
                      label="Designer Email"
                      type="email"
                      required
                      placeholder="m.breuer@atelier.org"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      errorMessage={formErrors.email}
                    />
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="proto-new-wing"
                        className="text-sm font-semibold text-[#141413] dark:text-[#F4F3EF]"
                      >
                        Exhibition Wing
                      </label>
                      <select
                        id="proto-new-wing"
                        value={newWing}
                        onChange={(e) => setNewWing(e.target.value)}
                        className="min-h-[42px] px-3 bg-white dark:bg-[#1A1C21] text-sm border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px]"
                      >
                        <option>Dessau Wing A</option>
                        <option>Dessau Wing B</option>
                        <option>Industrial Gallery</option>
                        <option>Print Archive</option>
                      </select>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="ghost" size="md" onClick={() => setShowCreateModal(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="primary" size="md">
                        Save Deliverable
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
