import React from 'react';

export interface BauhausIconProps {
  size?: number;
  className?: string;
  showGrid?: boolean;
}

const BaseSvg: React.FC<
  BauhausIconProps & { children: React.ReactNode; label: string }
> = ({ size = 20, className = '', showGrid = false, children, label }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="square"
    strokeLinejoin="miter"
    className={`shrink-0 ${className}`}
    role="img"
    aria-label={label}
  >
    {showGrid && (
      <g stroke="currentColor" strokeOpacity={0.18} strokeWidth={0.5}>
        <line x1="6" y1="0" x2="6" y2="24" />
        <line x1="12" y1="0" x2="12" y2="24" />
        <line x1="18" y1="0" x2="18" y2="24" />
        <line x1="0" y1="6" x2="24" y2="6" />
        <line x1="0" y1="12" x2="24" y2="12" />
        <line x1="0" y1="18" x2="24" y2="18" />
        <rect x="2" y="2" width="20" height="20" />
      </g>
    )}
    {children}
  </svg>
);

export const GeoGridIcon: React.FC<BauhausIconProps> = (props) => (
  <BaseSvg {...props} label="Modular Grid">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <circle cx="17.5" cy="17.5" r="3.5" />
  </BaseSvg>
);

export const GeoTriadIcon: React.FC<BauhausIconProps> = (props) => (
  <BaseSvg {...props} label="Bauhaus Triad">
    <circle cx="8" cy="16" r="4" />
    <rect x="13" y="12" width="8" height="8" />
    <polygon points="12,3 17,10 7,10" />
  </BaseSvg>
);

export const GeoCompassIcon: React.FC<BauhausIconProps> = (props) => (
  <BaseSvg {...props} label="Compass Square">
    <rect x="3" y="3" width="18" height="18" />
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="3" x2="12" y2="7" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </BaseSvg>
);

export const GeoLayersIcon: React.FC<BauhausIconProps> = (props) => (
  <BaseSvg {...props} label="Stacked Planes">
    <rect x="3" y="4" width="13" height="13" />
    <path d="M8 20H20V8" />
  </BaseSvg>
);

export const GeoTypeScaleIcon: React.FC<BauhausIconProps> = (props) => (
  <BaseSvg {...props} label="Typography Scale">
    <line x1="4" y1="5" x2="16" y2="5" />
    <line x1="10" y1="5" x2="10" y2="19" />
    <line x1="14" y1="12" x2="21" y2="12" />
    <line x1="17.5" y1="12" x2="17.5" y2="19" />
  </BaseSvg>
);

export const GeoRulerIcon: React.FC<BauhausIconProps> = (props) => (
  <BaseSvg {...props} label="Spacing Ruler">
    <rect x="3" y="7" width="18" height="10" />
    <line x1="7" y1="7" x2="7" y2="11" />
    <line x1="12" y1="7" x2="12" y2="13" />
    <line x1="17" y1="7" x2="17" y2="11" />
  </BaseSvg>
);

export const GeoContrastIcon: React.FC<BauhausIconProps> = (props) => (
  <BaseSvg {...props} label="Contrast Split">
    <circle cx="12" cy="12" r="8" />
    <path d="M12 4A8 8 0 0 1 12 20Z" fill="currentColor" stroke="none" />
  </BaseSvg>
);

export const GeoSliderIcon: React.FC<BauhausIconProps> = (props) => (
  <BaseSvg {...props} label="Control Sliders">
    <line x1="4" y1="7" x2="20" y2="7" />
    <rect x="8" y="4.5" width="4" height="5" fill="currentColor" stroke="none" />
    <line x1="4" y1="17" x2="20" y2="17" />
    <circle cx="15" cy="17" r="2.5" fill="currentColor" stroke="none" />
  </BaseSvg>
);

export const GeoFrameIcon: React.FC<BauhausIconProps> = (props) => (
  <BaseSvg {...props} label="Crop Frame">
    <path d="M6 3V18H21" />
    <path d="M3 6H18V21" />
  </BaseSvg>
);

export const GeoArchiveIcon: React.FC<BauhausIconProps> = (props) => (
  <BaseSvg {...props} label="Exhibition Archive">
    <rect x="3" y="4" width="18" height="5" />
    <rect x="4" y="9" width="16" height="11" />
    <line x1="9" y1="13.5" x2="15" y2="13.5" />
  </BaseSvg>
);

export const GeoCheckIcon: React.FC<BauhausIconProps> = (props) => (
  <BaseSvg {...props} label="Verified Check">
    <rect x="3" y="3" width="18" height="18" />
    <polyline points="7.5,12.5 10.5,15.5 16.5,9" />
  </BaseSvg>
);

export const GeoAlertIcon: React.FC<BauhausIconProps> = (props) => (
  <BaseSvg {...props} label="Geometric Alert">
    <polygon points="12,3 21,20 3,20" />
    <line x1="12" y1="9" x2="12" y2="14" />
    <rect x="11.25" y="16.5" width="1.5" height="1.5" fill="currentColor" stroke="none" />
  </BaseSvg>
);

export const BAUHAUS_ICON_CATALOG = [
  { id: 'grid', name: 'Modular Grid', token: 'GeoGridIcon', Component: GeoGridIcon },
  { id: 'triad', name: 'Bauhaus Triad', token: 'GeoTriadIcon', Component: GeoTriadIcon },
  { id: 'compass', name: 'Compass Square', token: 'GeoCompassIcon', Component: GeoCompassIcon },
  { id: 'layers', name: 'Stacked Planes', token: 'GeoLayersIcon', Component: GeoLayersIcon },
  { id: 'type', name: 'Type Scale', token: 'GeoTypeScaleIcon', Component: GeoTypeScaleIcon },
  { id: 'ruler', name: 'Spacing Ruler', token: 'GeoRulerIcon', Component: GeoRulerIcon },
  { id: 'contrast', name: 'Contrast Split', token: 'GeoContrastIcon', Component: GeoContrastIcon },
  { id: 'slider', name: 'Control Sliders', token: 'GeoSliderIcon', Component: GeoSliderIcon },
  { id: 'frame', name: 'Crop Frame', token: 'GeoFrameIcon', Component: GeoFrameIcon },
  { id: 'archive', name: 'Exhibition Archive', token: 'GeoArchiveIcon', Component: GeoArchiveIcon },
  { id: 'check', name: 'Verified Check', token: 'GeoCheckIcon', Component: GeoCheckIcon },
  { id: 'alert', name: 'Geometric Alert', token: 'GeoAlertIcon', Component: GeoAlertIcon },
];
