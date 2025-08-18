import type { PracticalSkillProps } from "@/app/types/skill/skill.interface";
import React from "react";

export const TechLogo: React.FC<PracticalSkillProps> = ({ 
  name, 
  logoUrl, 
  color, 
  description, 
  tags 
}) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // ใช้ useCallback เพื่อ optimize performance
  const showTooltipWithDelay = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowTooltip(true);
  }, []);

  const hideTooltipWithDelay = React.useCallback(() => {
    timeoutRef.current = setTimeout(() => setShowTooltip(false), 150);
  }, []);

  const clearDelayedHide = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Handle mouse events (desktop)
  const handleMouseEnter = React.useCallback(() => {
    showTooltipWithDelay();
  }, [showTooltipWithDelay]);

  const handleMouseLeave = React.useCallback(() => {
    hideTooltipWithDelay();
  }, [hideTooltipWithDelay]);

  // Handle click/touch events (mobile)
  const handleClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(prev => !prev);
  }, []);

  const handleTooltipClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  // Close on outside click - ใช้ useCallback และ optimize
  React.useEffect(() => {
    if (!showTooltip) return;

    const handleClickOutside = (event: Event) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };

    // ใช้ timeout เล็กน้อยเพื่อหลีกเลี่ยง immediate close
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside, { passive: true });
      document.addEventListener('touchstart', handleClickOutside, { passive: true });
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showTooltip]);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Dynamic positioning based on screen space
  const getTooltipPosition = () => {
    // Default to bottom
    return 'bottom';
    // TODO: เพิ่ม logic สำหรับ detect screen edges และปรับตำแหน่ง
  };

  const tooltipPosition = getTooltipPosition();
  
  return (
    <div 
      ref={containerRef}
      className="group relative inline-block"
      role="button"
      tabIndex={0}
      aria-label={`${name} technology`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setShowTooltip(prev => !prev);
        } else if (e.key === 'Escape') {
          setShowTooltip(false);
        }
      }}
    >
      {/* Main logo container */}
      <div 
        className={`
          relative w-20 h-20 flex items-center justify-center
          transform transition-all duration-300 ease-out
          rounded-2xl backdrop-blur-sm shadow-lg cursor-pointer
          border border-white/10 bg-white/90
          hover:scale-110 hover:border-white/30 hover:bg-white hover:shadow-xl
          active:scale-95 active:border-white/40
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50
          touch-manipulation select-none
        `}
        style={{ 
          backgroundColor: color ? `$white` : undefined,
          borderColor: color ? `$white` : undefined 
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <img 
          src={logoUrl} 
          alt={`${name} logo`}
          className="w-12 h-12 object-contain filter drop-shadow-lg pointer-events-none"
          loading="lazy"
          onError={(e) => {
            // Fallback เมื่อโหลดรูปไม่ได้
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 text-xs font-bold';
            fallback.textContent = name.substring(0, 2).toUpperCase();
            target.parentNode?.appendChild(fallback);
          }}
        />
        
        {/* Loading state indicator */}
        <div className="absolute inset-0 bg-white/50 rounded-2xl opacity-0 group-active:opacity-100 transition-opacity duration-150" />
      </div>

      {/* Tooltip */}
      <div 
        className={`
          absolute left-1/2 transform -translate-x-1/2 z-50
          transition-all duration-300 ease-out
          ${tooltipPosition === 'bottom' ? '-bottom-20' : '-top-20'}
          ${showTooltip 
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
          }
        `}
        onMouseEnter={clearDelayedHide}
        onMouseLeave={hideTooltipWithDelay}
        onClick={handleTooltipClick}
        role="tooltip"
        aria-live="polite"
      >
        <div className="relative bg-gray-900/95 backdrop-blur-md text-white text-sm px-4 py-3 rounded-xl border border-white/20 shadow-2xl min-w-64 max-w-sm">
          
          {/* Close button - แสดงเฉพาะบน mobile */}
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500/90 hover:bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold border border-white/30 backdrop-blur-sm transition-all duration-200 sm:hidden focus:outline-none focus:ring-2 focus:ring-red-400/50"
            aria-label="Close tooltip"
          >
            ×
          </button>
          
          {/* Content */}
          <div className="font-semibold text-center mb-2 text-base">{name}</div>
          
          {description && (
            <div className="text-xs text-gray-300 text-center leading-relaxed mb-3 px-2">
              {description}
            </div>
          )}
          
          {tags && tags.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs text-blue-300 text-center font-medium">
                Experience with:
              </div>
              <div className="flex flex-wrap justify-center gap-1">
                {tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="inline-block bg-blue-600/90 text-white text-xs px-2 py-1 rounded-full border border-blue-400/50 backdrop-blur-sm hover:bg-blue-500/90 transition-colors duration-200 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Arrow */}
          <div 
            className={`
              absolute left-1/2 transform -translate-x-1/2 w-0 h-0
              ${tooltipPosition === 'bottom' 
                ? '-top-2 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900/95' 
                : '-bottom-2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95'
              }
            `}
          />
        </div>
      </div>
    </div>
  );
};