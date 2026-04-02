export interface NavItemConfig {
  name: string;
  href: string;
  isScroll: boolean;
  icon?: string;
}

export const NAV_ITEMS: NavItemConfig[] = [
  { name: "About", href: "/#about", isScroll: true, icon: "∅" },
  { name: "Projects", href: "/#projects", isScroll: true, icon: "∑" },
  { name: "Skills", href: "/#skill", isScroll: true, icon: "λ" },
  { name: "Contact", href: "/#contact", isScroll: true, icon: "✉" },
];
