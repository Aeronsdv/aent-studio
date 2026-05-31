"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { ArrowDown01Icon, HugeiconsIcon } from "@/components/icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { useTheme } from "next-themes";
import { Sun, Moon, Languages, Menu, X, ChevronDown } from "lucide-react";

export interface NavbarMenuLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
  description?: string;
  backgroundImage?: string;
  rowSpan?: number;
}

export interface NavbarMenuSection {
  id: string;
  links: NavbarMenuLink[];
  gridLayout?: string;
}

export interface NavbarMenuProps {
  activeMenu: string;
  sections: NavbarMenuSection[];
  onClose?: () => void;
}

export interface NavbarWithMenuProps {
  sections: NavbarMenuSection[];
  navItems?: Array<
    | { type: "link"; label: string; href: string }
    | { type: "dropdown"; label: string; menu: string }
  >;
  logo?: React.ReactNode;
  cta?: React.ReactNode;
}

const ListItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    title: string;
    children?: React.ReactNode;
    href: string;
    external?: boolean;
    icon?: React.ReactNode;
    backgroundImage?: string;
    rowSpan?: number;
  }
>(
  (
    {
      className,
      title,
      children,
      href,
      external,
      icon,
      backgroundImage,
      rowSpan,
      ...props
    },
    ref,
  ) => {
    return (
      <li className={cn("list-none", rowSpan === 2 && "row-span-2")}>
        <a
          ref={ref}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={cn(
            "group relative flex h-full min-h-18 w-full flex-col justify-center overflow-hidden rounded-2xl p-3.5 leading-none no-underline outline-none transition-all duration-150 select-none hover:bg-black/5 dark:hover:bg-white/5",
            className,
          )}
          {...props}
        >
          {backgroundImage && (
            <>
              <Image
                fill
                src={backgroundImage}
                alt={title}
                className="absolute inset-0 z-0 h-full w-full object-cover transition-all group-hover:brightness-60"
              />
              <div className="absolute inset-0 z-[1] bg-gradient-to-t dark:from-black/90 dark:via-black/50 dark:to-black/20 from-black/50 via-black/25 to-black/10" />
            </>
          )}
          <div
            className={cn(
              "flex items-start gap-3",
              backgroundImage && "relative z-[2] mt-auto",
            )}
          
          >
            {icon && (
              <span
                className={cn(
                  "relative flex min-h-10 min-w-10 items-center justify-center rounded-xl p-2 transition group-hover:text-zinc-500 dark:group-hover:text-zinc-300",
                  backgroundImage
                    ? "bg-white/90 dark:bg-black/90 backdrop-blur group-hover:bg-white/95 dark:group-hover:bg-black/95"
                    : "bg-black/5 group-hover:bg-black/10 dark:bg-white/5 dark:group-hover:bg-white/10",
                )}
              >
                {icon}
              </span>
            )}
            <div className="flex h-full flex-col justify-start gap-1 leading-none font-normal text-zinc-900 dark:text-zinc-100">
              <span 
                className={cn(
                    "dark:text-white",
                    backgroundImage && "!text-white",
                  )}
              >{title}</span>

              {children && (
                <p
                  className={cn(
                    "line-clamp-2 text-sm leading-tight font-light dark:text-white/50 text-black/50",
                    backgroundImage && "relative z-[2] dark:text-white/50 text-white/60",
                  )}
                >
                  {children}
                </p>
              )}
            </div>
          </div>
        </a>
      </li>
    );
  },
);

ListItem.displayName = "ListItem";

export function NavbarMenu({ activeMenu, sections }: NavbarMenuProps) {
  const activeSection = sections.find((section) => section.id === activeMenu);

  if (!activeSection) return null;

  const gridLayout =
    activeSection.gridLayout || "grid w-full grid-cols-2 gap-4";

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: { duration: 0.25, ease: "easeOut" },
        layout: { duration: 0.35, ease: "easeOut" },
      }}
      className={cn(
        "absolute top-full left-0 z-40 w-full origin-top overflow-hidden rounded-b-3xl border border-t-0 outline-none backdrop-blur-2xl",
        "border-black/10 bg-gradient-to-b from-white to-zinc-50/95",
        "dark:border-white/10 dark:bg-gradient-to-b dark:from-zinc-950 dark:to-zinc-900/30",
      )}
    >
      <div className="p-3 overflow-hidden">
          <motion.div
            key={activeMenu}
            initial={{ x: 40, opacity: 0, filter: "blur(12px)" }}
            animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ul className={gridLayout}>
              {activeSection.links.map((link) => (
                <ListItem
                  key={link.href}
                  href={link.href}
                  title={link.label}
                  external={link.external}
                  icon={link.icon}
                  backgroundImage={link.backgroundImage}
                  rowSpan={link.rowSpan}
                >
                  {link.description}
                </ListItem>
              ))}
            </ul>
          </motion.div>
      </div>
    </motion.div>
  );
}

export function NavbarWithMenu({
  sections,
  navItems,
  logo,
  cta,
}: NavbarWithMenuProps) {
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
    null,
  );
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null);

  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  const defaultNavItems = [
    { type: "dropdown", label: "Product", menu: "product" },
    { type: "dropdown", label: "Resources", menu: "resources" },
    { type: "dropdown", label: "Socials", menu: "socials" },
  ] as const;

  const items = navItems || defaultNavItems;

  const getSectionLabel = (sectionId: string) => {
    const item = navItems?.find(
      (item) => item.type === "dropdown" && item.menu === sectionId
    );
    return item ? item.label : sectionId;
  };

  const handleNavbarMouseLeave = () => {
    setActiveDropdown(null);
    setHoveredItem(null);
  };

  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
    setHoveredItem(menu);
  };

  return (
    <div className="w-full flex items-start justify-center transition">
      {/* biome-ignore lint/a11y/noStaticElementInteractions: Hover container for menu, not interactive content */}
      <div
        className="relative mx-auto w-full max-w-4xl"
        onMouseLeave={handleNavbarMouseLeave}
      >
        <div
          className={cn(
            "navbar_content flex h-14 w-full items-center justify-between px-3 max-md:px-2 backdrop-blur-md transition-all  ease-out",
            "border-1 border-black/10 dark:border-white/10",
            activeDropdown || mobileOpen
              ? "rounded-t-3xl border-b-0 bg-white dark:bg-zinc-950"
              : "rounded-3xl bg-white/50 dark:bg-black/50",
          )}
        >
          <div className="flex items-center gap-2 px-2">
            <Link href="/" className="font-bold text-lg text-zinc-900 dark:text-white tracking-tight flex items-center gap-1.5 select-none cursor-pointer">
              Aent Studio
            </Link>
          </div>

          {/* Desktop Navigation links */}
          <div className="hidden md:flex items-center gap-1 rounded-lg px-1 py-1">
            {items.map((item) =>
              item.type === "link" ? (
                <button
                  type="button"
                  key={item.href}
                  className={cn(
                    "relative flex h-9 cursor-pointer items-center rounded-xl px-4 py-2 text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/40",
                    hoveredItem === item.label.toLowerCase()
                      ? "text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
                  )}
                  onMouseEnter={() => {
                    setHoveredItem(item.label.toLowerCase());
                    setActiveDropdown(null);
                  }}
                >
                  <span className="relative z-10">{item.label}</span>
                </button>
              ) : (
                <button
                  type="button"
                  key={item.menu}
                  className="relative flex h-9 cursor-pointer items-center rounded-xl px-4 py-2 text-sm dark:text-white/60 text-black/60 capitalize transition-colors hover:text-black dark:hover:text-white"
                  onMouseEnter={() => handleMouseEnter(item.menu)}
                >
                  {hoveredItem === item.menu && (
                    <div className="absolute inset-0 h-full w-full rounded-xl bg-black/5 dark:bg-white/5 transition-all duration-300 ease-out" />
                  )}
                  <div className="relative z-10 flex items-center gap-2">
                    <span>
                      {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                    </span>
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      size={17}
                      className={cn(
                        "transition duration-200",
                        hoveredItem === item.menu && "rotate-180",
                      )}
                    />
                  </div>
                </button>
              ),
            )}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-2">
            {cta || <Button variant="default">Contact Us</Button>}
          </div>

          {/* Mobile Hamburger toggle button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="h-10 w-10 rounded-xl flex items-center justify-center bg-[#dc885f] hover:bg-[#c9754c] dark:bg-[#92370b] dark:hover:bg-[#7e2f09] text-white border border-transparent shadow-md transition-all cursor-pointer"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Menu Panel */}
        <AnimatePresence>
          {activeDropdown && (
            <NavbarMenu activeMenu={activeDropdown} sections={sections} />
          )}
        </AnimatePresence>

        {/* Mobile slide-down accordion drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn(
                "absolute top-full left-0 z-40 w-full overflow-hidden rounded-b-3xl border border-t-0 backdrop-blur-2xl px-5 py-6 flex flex-col gap-6",
                "border-black/10 bg-white/95 dark:border-white/10 dark:bg-zinc-950/95"
              )}
            >
              {/* Accordion List */}
              <div className="flex flex-col gap-2.5">
                {sections.map((section) => {
                  const isExpanded = expandedSection === section.id;
                  const sectionLabel = getSectionLabel(section.id);
                  return (
                    <div key={section.id} className="border-b border-black/5 dark:border-white/5 pb-2">
                      <button
                        type="button"
                        onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                        className="flex w-full items-center justify-between py-2.5 text-base font-semibold text-zinc-900 dark:text-zinc-100 select-none cursor-pointer"
                      >
                        <span>{sectionLabel}</span>
                        <ChevronDown className={cn("h-4 w-4 text-zinc-400 transition-transform duration-300", isExpanded && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden flex flex-col gap-1.5 mt-1 pl-2"
                          >
                            {section.links.map((link) => (
                              <a
                                key={link.href}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noopener noreferrer" : undefined}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-start gap-3.5 py-2.5 rounded-xl px-2 hover:bg-black/5 dark:hover:bg-white/5 text-sm text-zinc-650 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all"
                              >
                                {link.icon && (
                                  <span className="h-9 w-9 min-w-9 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center text-zinc-900 dark:text-zinc-100">
                                    {link.icon}
                                  </span>
                                )}
                                <div className="flex flex-col justify-center min-h-9">
                                  <span className="font-semibold text-sm leading-none text-zinc-900 dark:text-zinc-100">{link.label}</span>
                                  {link.description && (
                                    <span className="text-xs text-zinc-400 leading-normal mt-1">{link.description}</span>
                                  )}
                                </div>
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Control buttons (Language Switcher, Theme Switcher & Full Width CTA) */}
              <div className="flex flex-col gap-4 mt-2 pt-5 border-t border-black/10 dark:border-white/10">
                <div className="flex items-center justify-between gap-3">
                  
                  {/* Mobile Language Switcher button */}
                  <div className="flex-1 flex items-center justify-center h-12 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 rounded-2xl px-3 backdrop-blur-md">
                    <button 
                      type="button" 
                      onClick={() => setLanguage(language === "en" ? "tr" : "en")}
                      className="w-full h-full flex items-center justify-center gap-2 dark:text-white text-zinc-900 focus:ring-0 focus-visible:ring-0 font-mono text-xs font-bold transition-all duration-300 select-none cursor-pointer"
                    >
                      <Languages className="h-4 w-4 mr-1" />
                      <span>{language === "en" ? "TÜRKÇE (TR)" : "ENGLISH (EN)"}</span>
                    </button>
                  </div>

                  {/* Mobile Theme Toggle Button */}
                  <div className="h-12 w-12 flex items-center justify-center border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 rounded-2xl backdrop-blur-md">
                    <button 
                      type="button"
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
                      className="h-full w-full rounded-2xl flex items-center justify-center dark:text-white text-zinc-900 cursor-pointer"
                    >
                      <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                      <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    </button>
                  </div>
                </div>

                {/* Mobile Full-width CTA Button wrapper */}
                <div className="w-full [&>button]:w-full [&>button]:h-12 [&>button]:rounded-2xl [&>button]:cursor-pointer [&>button]:shadow-xl [&>button]:bg-zinc-900 [&>button]:dark:bg-white [&>button]:text-white [&>button]:dark:text-black">
                  {cta || (
                    <Button variant="default">
                      {t("footer.contactUs")}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

