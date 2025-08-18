
import React, { ReactNode, MouseEvent } from 'react';
import { X } from 'lucide-react';

// Enhanced types to support hex colors
export type ChipColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type ChipVariant = 'solid' | 'outline' | 'soft' | 'gradient';
export type ChipSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ChipProps {
  children: ReactNode;
  color?: ChipColor | string; // Allow hex colors as string
  variant?: ChipVariant;
  size?: ChipSize;
  closable?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  className?: string;
  icon?: ReactNode;
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
  onClose?: () => void;
}

// Predefined color configurations
const CHIP_VARIANTS: Record<ChipVariant, Record<ChipColor, string>> = {
  solid: {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    info: 'bg-cyan-500 text-white hover:bg-cyan-600',
  },
  outline: {
    primary: 'bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-50',
    secondary: 'bg-transparent border-2 border-gray-500 text-gray-500 hover:bg-gray-50',
    success: 'bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-50',
    warning: 'bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-50',
    danger: 'bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-50',
    info: 'bg-transparent border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-50',
  },
  soft: {
    primary: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    success: 'bg-green-100 text-green-700 hover:bg-green-200',
    warning: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
    danger: 'bg-red-100 text-red-700 hover:bg-red-200',
    info: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200',
  },
  gradient: {
    primary: 'bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700',
    secondary: 'bg-gradient-to-r from-gray-400 to-gray-600 text-white hover:from-gray-500 hover:to-gray-700',
    success: 'bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700',
    warning: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700',
    danger: 'bg-gradient-to-r from-red-400 to-red-600 text-white hover:from-red-500 hover:to-red-700',
    info: 'bg-gradient-to-r from-cyan-400 to-cyan-600 text-white hover:from-cyan-500 hover:to-cyan-700',
  }
};

const CHIP_SIZES: Record<ChipSize, string> = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2 text-base',
  xl: 'px-6 py-3 text-lg',
};

// Helper functions
const isHexColor = (color: string): boolean => {
  return /^#([0-9A-F]{3}){1,2}$/i.test(color);
};

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const getContrastColor = (hex: string): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#000000';
  
  // Calculate luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
};

const lightenColor = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const r = Math.min(255, Math.floor(rgb.r + (255 - rgb.r) * percent));
  const g = Math.min(255, Math.floor(rgb.g + (255 - rgb.g) * percent));
  const b = Math.min(255, Math.floor(rgb.b + (255 - rgb.b) * percent));
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const darkenColor = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const r = Math.floor(rgb.r * (1 - percent));
  const g = Math.floor(rgb.g * (1 - percent));
  const b = Math.floor(rgb.b * (1 - percent));
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

// Generate custom styles for hex colors
const generateHexStyles = (hex: string, variant: ChipVariant): React.CSSProperties => {
  const textColor = getContrastColor(hex);
  const lightBg = lightenColor(hex, 0.9);
  const hoverDark = darkenColor(hex, 0.1);
  const hoverLight = lightenColor(hex, 0.1);
  
  switch (variant) {
    case 'solid':
      return {
        backgroundColor: hex,
        color: textColor,
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        border: `2px solid ${hex}`,
        color: hex,
      };
    case 'soft':
      return {
        backgroundColor: lightBg,
        color: hex,
      };
    case 'gradient':
      return {
        background: `linear-gradient(to right, ${hex}, ${darkenColor(hex, 0.2)})`,
        color: textColor,
      };
    default:
      return {
        backgroundColor: hex,
        color: textColor,
      };
  }
};

export const Chip: React.FC<ChipProps> = ({ 
  children,
  color = 'primary',
  variant = 'solid',
  size = 'md',
  closable = false,
  disabled = false,
  rounded = true,
  className = '',
  onClick,
  onClose,
  icon,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center gap-1 font-medium transition-all duration-200 select-none';
  const sizeClasses = CHIP_SIZES[size];
  const roundedClasses = rounded ? 'rounded-full' : 'rounded-md';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-default';
  const clickableClasses = onClick && !disabled ? 'hover:shadow-md active:scale-95 cursor-pointer' : '';

  // Check if color is hex or predefined
  const isCustomHex = typeof color === 'string' && isHexColor(color);
  const isPredefinedColor = typeof color === 'string' && color in CHIP_VARIANTS[variant];
  
  let variantClasses = '';
  let customStyles: React.CSSProperties = {};

  if (isCustomHex) {
    customStyles = generateHexStyles(color, variant);
  } else if (isPredefinedColor) {
    variantClasses = CHIP_VARIANTS[variant][color as ChipColor];
  } else {
    // Fallback to primary if invalid color
    variantClasses = CHIP_VARIANTS[variant].primary;
  }

  const handleClose = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    if (onClose && !disabled) {
      onClose();
    }
  };

  const handleClick = (e: MouseEvent<HTMLSpanElement>): void => {
    if (onClick && !disabled) {
      onClick(e);
    }
  };

  return (
    <span
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${roundedClasses} ${disabledClasses} ${clickableClasses} ${className}`.trim()}
      style={customStyles}
      onClick={handleClick}
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{children}</span>
      {closable && (
        <button
          type="button"
          onClick={handleClose}
          className="flex items-center justify-center hover:bg-black hover:bg-opacity-10 rounded-full p-0.5 ml-1"
          disabled={disabled}
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
};