export const SpaceObjects: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Satellite SVG */}
    <div 
      className="absolute animate-float-slow opacity-80"
      style={{
        top: '20%',
        right: '15%',
        animationDelay: '0s',
        animationDuration: '20s'
      }}
    >
      <svg width="60" height="60" viewBox="0 0 100 100" className="drop-shadow-lg">
        <defs>
          <linearGradient id="satelliteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0e7ff" />
            <stop offset="100%" stopColor="#c7d2fe" />
          </linearGradient>
        </defs>
        {/* Satellite body */}
        <rect x="35" y="35" width="30" height="20" fill="url(#satelliteGrad)" rx="3" />
        {/* Solar panels */}
        <rect x="15" y="30" width="15" height="30" fill="#60a5fa" opacity="0.8" />
        <rect x="70" y="30" width="15" height="30" fill="#60a5fa" opacity="0.8" />
        {/* Antenna */}
        <line x1="50" y1="35" x2="50" y2="20" stroke="#fbbf24" strokeWidth="2" />
        <circle cx="50" cy="18" r="3" fill="#fbbf24" />
        {/* Details */}
        <rect x="38" y="40" width="24" height="3" fill="#3b82f6" />
        <rect x="38" y="46" width="24" height="3" fill="#3b82f6" />
      </svg>
    </div>

    {/* Spaceship SVG */}
    <div 
      className="absolute animate-float-slow opacity-90"
      style={{
        top: '60%',
        left: '10%',
        animationDelay: '10s',
        animationDuration: '25s'
      }}
    >
      <svg width="80" height="40" viewBox="0 0 120 60" className="drop-shadow-lg">
        <defs>
          <linearGradient id="spaceshipGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f3f4f6" />
            <stop offset="50%" stopColor="#e5e7eb" />
            <stop offset="100%" stopColor="#d1d5db" />
          </linearGradient>
          <radialGradient id="thrusterGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>
        </defs>
        {/* Main body */}
        <ellipse cx="60" cy="30" rx="35" ry="12" fill="url(#spaceshipGrad)" />
        {/* Cockpit */}
        <ellipse cx="75" cy="30" rx="15" ry="8" fill="#3b82f6" opacity="0.7" />
        {/* Wings */}
        <polygon points="25,25 35,15 45,25 35,35" fill="#9ca3af" />
        <polygon points="25,35 35,45 45,35 35,25" fill="#9ca3af" />
        {/* Thruster */}
        <circle cx="25" cy="30" r="6" fill="url(#thrusterGrad)" />
        <circle cx="25" cy="30" r="3" fill="#fef3c7" />
      </svg>
    </div>

    {/* Additional satellite in different position */}
    <div 
      className="absolute animate-orbit opacity-70"
      style={{
        bottom: '25%',
        right: '25%',
        animationDelay: '15s',
        animationDuration: '30s'
      }}
    >
      <svg width="45" height="45" viewBox="0 0 80 80" className="drop-shadow-md">
        <defs>
          <linearGradient id="satellite2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ddd6fe" />
            <stop offset="100%" stopColor="#c4b5fd" />
          </linearGradient>
        </defs>
        {/* Main body */}
        <circle cx="40" cy="40" r="12" fill="url(#satellite2Grad)" />
        {/* Solar panels */}
        <rect x="15" y="35" width="10" height="20" fill="#34d399" opacity="0.8" />
        <rect x="55" y="35" width="10" height="20" fill="#34d399" opacity="0.8" />
        {/* Dish */}
        <ellipse cx="40" cy="25" rx="8" ry="4" fill="#f8fafc" />
        <ellipse cx="40" cy="25" rx="6" ry="3" fill="#e2e8f0" />
      </svg>
    </div>
  </div>
);