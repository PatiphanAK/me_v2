"use client";
import { useState, useCallback, useEffect } from 'react';
import { Menu, X, User, FolderOpen, BookOpen, Mail } from 'lucide-react';

// ===== TYPES =====
interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  isScroll?: boolean;
}

interface IconProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  size?: number;
  className?: string;
}

interface NavItemProps extends NavItem {
  onClick?: (e: React.MouseEvent) => void;
  colorClass?: string;
  isActive?: boolean;
  isMobile?: boolean;
}

// ===== CONSTANTS =====
const NAV_ITEMS: NavItem[] = [
  { name: 'About', href: '/#about', icon: User, isScroll: true },
  { name: 'Project', href: '/#projects', icon: FolderOpen, isScroll: true },
  { name: 'Skill', href: '/#skill', icon: BookOpen, isScroll: true },
  { name: 'Contact', href: '/#contact', icon: Mail, isScroll: true },
  { name: 'Certification', href: '/certification', icon: BookOpen, isScroll: false }
];

const NAV_COLORS = [
  'hover:text-yellow-400 hover:bg-yellow-900/30',
  'hover:text-orange-400 hover:bg-orange-900/30',
  'hover:text-green-400 hover:bg-green-800/30',
  'hover:text-red-400 hover:bg-red-900/30'
];

const STYLES = {
  gradientBorder: 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white border-2 border-yellow-500 hover:border-yellow-400',
  baseTransition: 'transition-all duration-300 transform hover:scale-105',
  navItemBase: 'group flex items-center space-x-2 text-green-100 px-4 py-2 rounded-xl text-sm font-bold font-mono tracking-wide border-2 border-transparent hover:border-current relative overflow-hidden'
} as const;

// ===== HOOKS =====
const useClientSide = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient;
};

// ===== UTILITY FUNCTIONS =====
const scrollToSection = (href: string): void => {
  if (typeof window !== 'undefined') {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
};

// ===== ATOMS =====
const Icon = ({ icon: IconComponent, size = 18, className = "" }: IconProps) => (
  <IconComponent size={size} className={className} />
);

const Link = ({ 
  href, 
  children, 
  onClick, 
  className = "" 
}: {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}) => (
  <a
    href={href}
    onClick={onClick}
    className={`transition-colors duration-300 ${className}`}
  >
    {children}
  </a>
);

// ===== MOLECULES =====
const Logo = ({ onHomeClick }: { onHomeClick?: (e: React.MouseEvent) => void }) => (
  <Link
    href="#home"
    onClick={onHomeClick}
    className="text-2xl font-bold text-yellow-400 tracking-wider font-mono hover:text-orange-400"
  >
    DINOFOLIO
  </Link>
);

const NavItemComponent = ({ 
  name, 
  href, 
  icon, 
  onClick, 
  colorClass = "", 
  isActive = false,
  isMobile = false
}: NavItemProps) => {
  const baseClass = isMobile 
    ? `flex items-center space-x-4 text-green-100 px-4 py-3 rounded-xl text-base font-bold ${STYLES.baseTransition} group border-2 border-transparent hover:border-current`
    : `${STYLES.navItemBase} ${STYLES.baseTransition} ${isActive ? 'bg-green-700/30' : ''}`;
    
  const iconSize = isMobile ? 20 : 18;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${baseClass} ${colorClass}`}
    >
      <Icon icon={icon} size={iconSize} className="group-hover:animate-pulse" />
      <span>{name.toUpperCase()}</span>
      {!isMobile && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      )}
    </Link>
  );
};

const ContactButton = ({ 
  onClick, 
  isMobile = false 
}: { 
  onClick: (e: React.MouseEvent) => void;
  isMobile?: boolean;
}) => {
  const className = `${STYLES.gradientBorder} ${STYLES.baseTransition} px-6 py-3 rounded-2xl text-sm font-bold font-mono tracking-wider relative overflow-hidden ${
    isMobile ? '' : 'shadow-lg hover:shadow-2xl hover:scale-110'
  }`;

  return (
    <Link
      href="#contact"
      onClick={onClick}
      className={className}
    >
      <span className="relative z-10">CONTACT ME</span>
    </Link>
  );
};

const MobileMenuToggle = ({ 
  isOpen, 
  onToggle 
}: { 
  isOpen: boolean; 
  onToggle: () => void;
}) => (
  <button
    onClick={onToggle}
    className="text-green-100 hover:text-yellow-400 p-2 rounded-lg transition-all duration-200 transform hover:scale-110"
    aria-label="Toggle menu"
    aria-expanded={isOpen}
  >
    {isOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
);

// ===== ORGANISMS =====
const DesktopMenu = ({ 
  navItems, 
  onNavClick, 
  onContactClick 
}: {
  navItems: NavItem[];
  onNavClick: (href: string, isScroll?: boolean, e?: React.MouseEvent) => void;
  onContactClick: (e: React.MouseEvent) => void;
}) => (
  <div className="hidden md:flex items-center justify-between w-full">
    <nav className="ml-10 flex items-center space-x-2" role="navigation">
      {navItems.map((item, index) => (
        <NavItemComponent
          key={item.name}
          {...item}
          onClick={(e) => onNavClick(item.href, item.isScroll, e)}
          colorClass={NAV_COLORS[index % NAV_COLORS.length]}
        />
      ))}
    </nav>
    
    <ContactButton onClick={onContactClick} />
  </div>
);

const MobileMenu = ({ 
  navItems, 
  isOpen, 
  onNavClick, 
  onContactClick 
}: {
  navItems: NavItem[];
  isOpen: boolean;
  onNavClick: (href: string, isScroll?: boolean, e?: React.MouseEvent) => void;
  onContactClick: (e: React.MouseEvent) => void;
}) => (
  <div 
    className={`md:hidden transition-all duration-500 overflow-hidden ${
      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
    }`}
  >
    <div className="px-2 pt-2 pb-4 space-y-3 bg-gradient-to-b from-green-800/90 to-green-900/90 backdrop-blur-sm border-t-2 border-yellow-600 rounded-b-2xl">
      <nav className="space-y-3" role="navigation">
        {navItems.map((item, index) => (
          <NavItemComponent
            key={item.name}
            {...item}
            onClick={(e) => onNavClick(item.href, item.isScroll, e)}
            colorClass={NAV_COLORS[index % NAV_COLORS.length]}
            isMobile={true}
          />
        ))}
      </nav>
      
      <div className="pt-4 flex justify-center">
        <ContactButton onClick={onContactClick} isMobile={true} />
      </div>
    </div>
  </div>
);

// ===== MAIN COMPONENT =====
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const isClient = useClientSide();

  const toggleMenu = useCallback((): void => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleNavClick = useCallback((href: string, isScroll: boolean = false, e?: React.MouseEvent) => {
    if (isScroll && href.startsWith('#') && isClient) {
      e?.preventDefault();
      scrollToSection(href);
    }
    setIsMenuOpen(false);
  }, [isClient]);

  const handleContactClick = useCallback((e: React.MouseEvent) => {
    handleNavClick('#contact', true, e);
  }, [handleNavClick]);

  const handleHomeClick = useCallback((e: React.MouseEvent) => {
    handleNavClick('#home', true, e);
  }, [handleNavClick]);

  return (
    <>
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 via-yellow-500 to-orange-500" />
      
      <nav className="bg-gradient-to-r from-green-900/95 to-green-800/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b-2 border-yellow-600/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo onHomeClick={handleHomeClick} />
            
            <DesktopMenu 
              navItems={NAV_ITEMS}
              onNavClick={handleNavClick}
              onContactClick={handleContactClick}
            />

            <div className="md:hidden">
              <MobileMenuToggle 
                isOpen={isMenuOpen}
                onToggle={toggleMenu}
              />
            </div>
          </div>

          <MobileMenu
            navItems={NAV_ITEMS}
            isOpen={isMenuOpen}
            onNavClick={handleNavClick}
            onContactClick={handleContactClick}
          />
        </div>
      </nav>

      {/* Decorative bottom accent */}
      <div className="h-0.5 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500" />
    </>
  );
}