import React, { useState } from 'react';
import { ArrowUpRight, Bookmark, Check, ShoppingBag, TrendingUp } from 'lucide-react';
import { Button } from './Primitives';
import { GeoCompassIcon, GeoLayersIcon } from './BauhausIcons';

const cardShellClass =
  'bg-white dark:bg-[#1A1C21] border border-[#DEDAD2] dark:border-[#2D3139] rounded-[2px] transition-colors duration-150';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#EFECE6] dark:bg-[#22252C] text-[#575550] dark:text-[#A1A1AA] p-6 ${className}`}
        role="img"
        aria-label={alt}
      >
        <GeoCompassIcon size={28} />
        <span className="mt-2 text-xs font-medium text-center">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

export interface InfoCardProps {
  kicker: string;
  title: string;
  description: string;
  meta: string;
  onInspect?: () => void;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  kicker,
  title,
  description,
  meta,
  onInspect,
}) => (
  <article className={`${cardShellClass} p-6 flex flex-col justify-between gap-4 hover:border-[#141413] dark:hover:border-[#71717A]`}>
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#575550] dark:text-[#A1A1AA]">
        <span>{kicker}</span>
        <GeoLayersIcon size={16} />
      </div>
      <h4 className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F3EF]">
        {title}
      </h4>
      <p className="text-sm leading-relaxed text-[#575550] dark:text-[#A1A1AA]">
        {description}
      </p>
    </div>
    <div className="pt-4 border-t border-[#DEDAD2] dark:border-[#2D3139] flex items-center justify-between gap-3">
      <span className="text-xs text-[#575550] dark:text-[#A1A1AA] font-mono tabular-nums">
        {meta}
      </span>
      <Button variant="ghost" size="sm" onClick={onInspect} rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
        Inspect
      </Button>
    </div>
  </article>
);

export interface MediaCardProps {
  imageSrc: string;
  imageAlt: string;
  kicker: string;
  title: string;
  caption: string;
  onOpenExhibition?: () => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  imageSrc,
  imageAlt,
  kicker,
  title,
  caption,
  onOpenExhibition,
}) => (
  <article className={`${cardShellClass} overflow-hidden flex flex-col hover:border-[#141413] dark:hover:border-[#71717A]`}>
    <div className="aspect-[4/3] w-full overflow-hidden bg-[#EFECE6] dark:bg-[#22252C]">
      <SafeImage
        src={imageSrc}
        alt={imageAlt}
        fallbackTitle={title}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
      />
    </div>
    <div className="p-6 flex-1 flex flex-col justify-between gap-4">
      <div className="space-y-2">
        <p className="text-xs font-mono text-[#D9381E] dark:text-[#EF4444]">{kicker}</p>
        <h4 className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F3EF]">
          {title}
        </h4>
        <p className="text-sm text-[#575550] dark:text-[#A1A1AA] leading-relaxed">
          {caption}
        </p>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-[#DEDAD2] dark:border-[#2D3139]">
        <span className="text-xs text-[#575550] dark:text-[#A1A1AA]">
          Archival Plate · 4:3 Ratio
        </span>
        <Button variant="outline" size="sm" onClick={onOpenExhibition}>
          View Plate
        </Button>
      </div>
    </div>
  </article>
);

export interface ProfileCardProps {
  avatarSrc: string;
  name: string;
  role: string;
  studio: string;
  bio: string;
  metrics: { label: string; value: string }[];
  onConnect?: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarSrc,
  name,
  role,
  studio,
  bio,
  metrics,
  onConnect,
}) => {
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnected((prev) => !prev);
    onConnect?.();
  };

  return (
    <article className={`${cardShellClass} p-6 flex flex-col justify-between gap-5`}>
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 shrink-0 rounded-[2px] overflow-hidden border border-[#DEDAD2] dark:border-[#2D3139] bg-[#EFECE6] dark:bg-[#22252C]">
          <SafeImage
            src={avatarSrc}
            alt={`Studio portrait of ${name}`}
            fallbackTitle={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F3EF] truncate">
            {name}
          </h4>
          <p className="text-sm font-medium text-[#1E40AF] dark:text-[#60A5FA]">{role}</p>
          <p className="text-xs text-[#575550] dark:text-[#A1A1AA] mt-0.5">{studio}</p>
        </div>
      </div>

      <p className="text-sm text-[#575550] dark:text-[#A1A1AA] leading-relaxed">{bio}</p>

      <div className="grid grid-cols-3 gap-3 py-3 border-y border-[#DEDAD2] dark:border-[#2D3139]">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="font-mono text-base font-semibold tabular-nums text-[#141413] dark:text-[#F4F3EF]">
              {m.value}
            </div>
            <div className="text-xs text-[#575550] dark:text-[#A1A1AA]">{m.label}</div>
          </div>
        ))}
      </div>

      <Button
        variant={connected ? 'outline' : 'secondary'}
        size="md"
        onClick={handleConnect}
        leftIcon={connected ? <Check className="w-4 h-4" /> : undefined}
        className="w-full"
      >
        {connected ? 'Following Designer' : 'Follow Studio'}
      </Button>
    </article>
  );
};

export interface ProductCardProps {
  imageSrc: string;
  title: string;
  designer: string;
  price: string;
  edition: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  title,
  designer,
  price,
  edition,
}) => {
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState(false);

  return (
    <article className={`${cardShellClass} overflow-hidden flex flex-col`}>
      <div className="relative aspect-[4/3] bg-[#EFECE6] dark:bg-[#22252C] overflow-hidden">
        <SafeImage
          src={imageSrc}
          alt={title}
          fallbackTitle={title}
          className="w-full h-full object-cover"
        />
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-label={saved ? `Remove ${title} from saved` : `Save ${title}`}
          className={`absolute top-3 right-3 h-9 w-9 inline-flex items-center justify-center rounded-[2px] border transition-colors cursor-pointer ${
            saved
              ? 'bg-[#141413] text-white border-[#141413] dark:bg-[#F4F3EF] dark:text-[#121316]'
              : 'bg-white/95 text-[#141413] border-[#DEDAD2] hover:border-[#141413] dark:bg-[#1A1C21]/95 dark:text-[#F4F3EF] dark:border-[#2D3139]'
          }`}
        >
          <Bookmark className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between gap-4">
        <div>
          <div className="text-xs text-[#575550] dark:text-[#A1A1AA]">
            <span>{designer}</span>
            <span className="mx-1.5" aria-hidden="true">·</span>
            <span>{edition}</span>
          </div>
          <div className="mt-1.5 flex items-baseline justify-between gap-2">
            <h4 className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F3EF]">
              {title}
            </h4>
            <span className="font-mono text-base font-semibold tabular-nums text-[#141413] dark:text-[#F4F3EF]">
              {price}
            </span>
          </div>
        </div>

        <Button
          variant={added ? 'outline' : 'primary'}
          size="md"
          onClick={() => setAdded((a) => !a)}
          leftIcon={added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          className="w-full"
        >
          {added ? 'Added to Bag' : 'Add Edition'}
        </Button>
      </div>
    </article>
  );
};

export interface StatsCardProps {
  label: string;
  value: string;
  delta: string;
  period: string;
  bars: number[];
  accent?: 'cobalt' | 'vermilion' | 'ochre';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  delta,
  period,
  bars,
  accent = 'cobalt',
}) => {
  const accentColor =
    accent === 'vermilion'
      ? 'bg-[#D9381E] dark:bg-[#EF4444]'
      : accent === 'ochre'
        ? 'bg-[#D97706] dark:bg-[#F59E0B]'
        : 'bg-[#1E40AF] dark:bg-[#3B82F6]';

  return (
    <article className={`${cardShellClass} p-6 flex flex-col justify-between gap-5`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-[#575550] dark:text-[#A1A1AA]">{label}</p>
          <p className="mt-1 font-display text-3xl font-bold tabular-nums text-[#141413] dark:text-[#F4F3EF]">
            {value}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#15803D] dark:text-[#22C55E]">
          <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
          {delta}
        </span>
      </div>

      <div className="flex items-end gap-1.5 h-12 pt-2" aria-hidden="true">
        {bars.map((pct, idx) => (
          <div
            key={idx}
            className="flex-1 bg-[#EFECE6] dark:bg-[#22252C] h-full flex items-end rounded-[1px] overflow-hidden"
          >
            <div
              className={`w-full transition-all duration-300 ${
                idx === bars.length - 1 ? accentColor : 'bg-[#141413]/70 dark:bg-[#F4F3EF]/60'
              }`}
              style={{ height: `${Math.max(12, Math.min(100, pct))}%` }}
            />
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-[#DEDAD2] dark:border-[#2D3139] flex items-center justify-between text-xs text-[#575550] dark:text-[#A1A1AA]">
        <span>{period}</span>
        <span className="font-mono tabular-nums">8-Wk Rhythm</span>
      </div>
    </article>
  );
};

export interface ActionCardProps {
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
  onPrimaryAction?: () => void;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  primaryLabel,
  secondaryLabel,
  onPrimaryAction,
}) => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handlePrimary = () => {
    setStatusMessage('Action queued in studio log.');
    onPrimaryAction?.();
  };

  return (
    <article className={`${cardShellClass} p-6 flex flex-col justify-between gap-5`}>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-[#1E40AF] dark:text-[#60A5FA]">
          <span>Workflow Prompt</span>
        </div>
        <h4 className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F3EF]">
          {title}
        </h4>
        <p className="text-sm text-[#575550] dark:text-[#A1A1AA] leading-relaxed">
          {description}
        </p>
      </div>

      {statusMessage && (
        <div className="px-3 py-2 text-xs font-medium bg-[#EFECE6] dark:bg-[#22252C] text-[#15803D] dark:text-[#22C55E] rounded-[2px] flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{statusMessage}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#DEDAD2] dark:border-[#2D3139]">
        <Button variant="primary" size="md" onClick={handlePrimary}>
          {primaryLabel}
        </Button>
        <Button
          variant="ghost"
          size="md"
          onClick={() => setStatusMessage('Deferred to next review cycle.')}
        >
          {secondaryLabel}
        </Button>
      </div>
    </article>
  );
};
