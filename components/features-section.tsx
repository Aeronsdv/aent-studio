"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowUpRight, 
  Terminal, 
  Sparkles, 
  Activity, 
  Cpu, 
  Palette, 
  Layers, 
  Monitor, 
  PenTool, 
  MousePointer2, 
  Smartphone,
  CheckCircle2
} from "lucide-react";
import { useLanguage } from "@/context/language-context";

// Types for the Interactive color palettes in the Graphic Design card
type PaletteTheme = "cyberpunk" | "sunset" | "ocean";

interface ColorScheme {
  primary: string;
  secondary: string;
  glow: string;
  circleClass: string;
  rectClass: string;
}

const PALETTES: Record<PaletteTheme, ColorScheme> = {
  cyberpunk: {
    primary: "#d946ef", // fuchsia
    secondary: "#10b981", // emerald
    glow: "rgba(217, 70, 239, 0.25)",
    circleClass: "bg-fuchsia-500",
    rectClass: "bg-emerald-500"
  },
  sunset: {
    primary: "#ec4e02", // sunset orange
    secondary: "#eab308", // yellow-gold
    glow: "rgba(236, 78, 2, 0.25)",
    circleClass: "bg-orange-500",
    rectClass: "bg-amber-400"
  },
  ocean: {
    primary: "#06b6d4", // cyan
    secondary: "#3b82f6", // blue
    glow: "rgba(6, 182, 212, 0.25)",
    circleClass: "bg-cyan-500",
    rectClass: "bg-blue-600"
  }
};

export function FeaturesSection() {
  const { t, language } = useLanguage();

  // Web Applications Card spotlight tracking
  const [webCoords, setWebCoords] = useState({ x: 0, y: 0 });
  const [isWebHovered, setIsWebHovered] = useState(false);
  const webRef = useRef<HTMLDivElement>(null);

  // Graphic Design Card spotlight tracking
  const [designCoords, setDesignCoords] = useState({ x: 0, y: 0 });
  const [isDesignHovered, setIsDesignHovered] = useState(false);
  const designRef = useRef<HTMLDivElement>(null);

  // Graphic Design interactivity
  const [activePalette, setActivePalette] = useState<PaletteTheme>("cyberpunk");
  const currentPalette = PALETTES[activePalette];

  // Typing effect inside Web Apps code mockup
  const [codeSnippet, setCodeSnippet] = useState("");
  const fullCode = `const studio = new AentStudio({
  performance: "100%",
  experience: "outstanding",
  ux: "intuitive"
});

await studio.launchServer();`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setCodeSnippet((prev) => prev + fullCode.charAt(index));
      index++;
      if (index >= fullCode.length) {
        setTimeout(() => {
          setCodeSnippet("");
          index = 0;
        }, 3000); // Wait before clearing and typing again
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  const handleWebMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!webRef.current) return;
    const rect = webRef.current.getBoundingClientRect();
    setWebCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleDesignMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!designRef.current) return;
    const rect = designRef.current.getBoundingClientRect();
    setDesignCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-6 md:px-8">
      {/* Section Header */}
      <div className="mb-20 flex flex-col items-center text-center gap-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-white md:text-5xl lg:text-6xl max-w-3xl"
        >
          {t("features.whatWeDo")}<br />
          <span className="dark:text-white/80 text-black/80 font-light">{t("features.harmony")}</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-base leading-relaxed dark:text-white/60 text-black/60"
        >
          {t("features.desc")}
        </motion.p>
      </div>

      {/* Grid Layout */}
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-8 items-stretch">
        
        {/* ==================== CARD 1: WEB APPLICATIONS ==================== */}
        <motion.div
          ref={webRef}
          onMouseMove={handleWebMouseMove}
          onMouseEnter={() => setIsWebHovered(true)}
          onMouseLeave={() => setIsWebHovered(false)}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950/20 backdrop-blur-xl transition-all duration-500 hover:border-zinc-300 dark:hover:border-white/10 hover:shadow-3xl hover:shadow-cyan-500/5"
        >
          {/* Spotlight Glow behind card */}
          {isWebHovered && (
            <div 
              className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100 z-0"
              style={{
                background: `radial-gradient(400px circle at ${webCoords.x}px ${webCoords.y}px, rgba(6, 182, 212, 0.15), transparent)`,
              }}
            />
          )}

          {/* Upper Interactive Preview */}
          <div className="relative aspect-[16/10] w-full bg-zinc-50 dark:bg-zinc-950/50 p-6 flex flex-col justify-between border-b border-zinc-100 dark:border-white/5 overflow-hidden z-10">
            {/* Ambient Background Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

            {/* Mock Browser Window */}
            <div className="relative flex flex-col h-full w-full rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-lg overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]">
              {/* Browser Header */}
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-white/5 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>
                <div className="w-1/2 bg-zinc-200/50 dark:bg-white/5 text-[9px] text-zinc-400 dark:text-zinc-500 py-0.5 rounded-md text-center font-mono select-none">
                  {t("features.webApps.analytics")}
                </div>
                <div className="w-4 h-2" /> {/* Spacer */}
              </div>

              {/* Browser Content */}
              <div className="flex flex-1 p-4 gap-4 overflow-hidden relative">
                {/* Mini Sidebar */}
                <div className="flex flex-col gap-2.5 border-r border-zinc-200 dark:border-white/5 pr-3">
                  <div className="h-4.5 w-4.5 rounded-md bg-cyan-500/10 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                    <Activity className="h-3 w-3" />
                  </div>
                  <div className="h-4.5 w-4.5 rounded-md bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-400">
                    <Cpu className="h-3 w-3" />
                  </div>
                  <div className="h-4.5 w-4.5 rounded-md bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-400">
                    <Terminal className="h-3 w-3" />
                  </div>
                </div>

                {/* Dashboard Metrics Area */}
                <div className="flex-1 flex flex-col gap-3 justify-between">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[9px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block font-sans">{t("features.webApps.activeSessions")}</span>
                      <span className="text-lg font-bold text-zinc-800 dark:text-zinc-100 font-mono leading-none">1,482</span>
                    </div>
                    {/* Live indicator pulsing */}
                    <span className="inline-flex items-center gap-1 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[8px] font-medium px-2 py-0.5 rounded-full select-none">
                      <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                      {language === "tr" ? "Canlı" : "Live"}
                    </span>
                  </div>

                  {/* SVG Line Chart that animates */}
                  <div className="h-20 w-full relative flex items-end">
                    <svg className="w-full h-full text-cyan-500 dark:text-cyan-400 overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(6, 182, 212, 0.4)" />
                          <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
                        </linearGradient>
                      </defs>
                      {/* Area beneath chart line */}
                      <path 
                        d="M0,60 C30,45 60,10 90,35 C120,60 150,15 200,5 L200,60 L0,60 Z" 
                        fill="url(#chartGradient)"
                      />
                      {/* Chart line itself */}
                      <motion.path
                        d="M0,60 C30,45 60,10 90,35 C120,60 150,15 200,5"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={isWebHovered ? { pathLength: 1 } : { pathLength: 0.8 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                    </svg>
                  </div>
                </div>

                {/* Floating Metric Card over browser content */}
                <motion.div 
                  className="absolute right-3 bottom-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 px-3.5 py-2 shadow-2xl flex items-center gap-2 select-none"
                  animate={{ y: isWebHovered ? -5 : 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                >
                  <div className="h-7 w-7 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[7.5px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold block">{t("features.webApps.performance")}</span>
                    <span className="text-xs font-black font-mono text-zinc-800 dark:text-zinc-100">{t("features.webApps.ultra")}</span>
                  </div>
                </motion.div>

                {/* Micro Terminal Typing overlay */}
                <AnimatePresence>
                  {isWebHovered && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="absolute left-10 bottom-3 w-[200px] border border-zinc-200 dark:border-white/10 bg-zinc-900 text-[8px] font-mono text-zinc-300 p-2.5 rounded-xl shadow-xl select-none"
                    >
                      <div className="flex gap-1 mb-1.5 opacity-50">
                        <span className="w-1 h-1 rounded-full bg-zinc-500" />
                        <span className="w-1 h-1 rounded-full bg-zinc-500" />
                        <span className="w-1 h-1 rounded-full bg-zinc-500" />
                      </div>
                      <span className="text-zinc-500">{"// Engine typing"}</span>
                      <pre className="text-cyan-400 overflow-x-auto select-none mt-1 leading-normal whitespace-pre-wrap">{codeSnippet}</pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Lower Content Details */}
          <div className="flex flex-1 flex-col p-8 md:p-10 z-10">

            <h3 className="mb-4 text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center justify-between">
              {t("features.webApps.title")}
              <span className="rounded-full dark:bg-[#00818a] bg-[#64e5f5] dark:text-white/90 text-white p-2.5 transition-all duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </h3>

            <p className="mb-8 text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("features.webApps.desc")}
            </p>

            {/* Bullet features */}
            <div className="grid gap-3.5 mb-8">
              {[
                { title: t("features.webApps.f1Title"), desc: t("features.webApps.f1Desc") },
                { title: t("features.webApps.f2Title"), desc: t("features.webApps.f2Desc") },
                { title: t("features.webApps.f3Title"), desc: t("features.webApps.f3Desc") }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-xs text-zinc-800 dark:text-zinc-200 block">{item.title}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tags Row */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion", "Node.js"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-white/5 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ==================== CARD 2: GRAPHIC DESIGN ==================== */}
        <motion.div
          ref={designRef}
          onMouseMove={handleDesignMouseMove}
          onMouseEnter={() => setIsDesignHovered(true)}
          onMouseLeave={() => setIsDesignHovered(false)}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950/20 backdrop-blur-xl transition-all duration-500 hover:border-zinc-300 dark:hover:border-white/10 hover:shadow-3xl hover:shadow-orange-500/5"
        >
          {/* Spotlight Glow behind card */}
          {isDesignHovered && (
            <div 
              className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100 z-0"
              style={{
                background: `radial-gradient(400px circle at ${designCoords.x}px ${designCoords.y}px, rgba(236, 78, 2, 0.15), transparent)`,
              }}
            />
          )}

          {/* Upper Interactive Preview */}
          <div className="relative aspect-[16/10] w-full bg-zinc-50 dark:bg-zinc-950/50 p-6 flex flex-col justify-between border-b border-zinc-100 dark:border-white/5 overflow-hidden z-10">
            {/* Ambient Background Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

            {/* Artboard Window */}
            <div className="relative flex flex-col h-full w-full rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-lg overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]">
              {/* Artboard Header */}
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-white/5 px-4 py-3">
                <div className="flex gap-1.5 items-center">
                  <Palette className="h-3.5 w-3.5 text-orange-500" />
                  <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 select-none font-sans">
                    {t("features.graphicDesign.paletteTitle")}
                  </span>
                </div>
                {/* Visual canvas zoom mockup */}
                <div className="bg-zinc-200/50 dark:bg-white/5 px-2 py-0.5 rounded-md text-[9px] text-zinc-400 dark:text-zinc-500 select-none">
                  {t("features.graphicDesign.zoom")}
                </div>
              </div>

              {/* Artboard Content */}
              <div className="flex flex-1 p-4 gap-4 overflow-hidden relative items-center justify-center">
                {/* Left floating toolbar */}
                <div className="absolute left-3 top-3 bottom-3 border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-900/95 shadow-xl w-8 rounded-xl flex flex-col items-center py-2.5 gap-3 select-none">
                  <div className="h-5 w-5 rounded-md bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-400 hover:text-orange-500 transition-colors">
                    <MousePointer2 className="h-3 w-3" />
                  </div>
                  <div className="h-5 w-5 rounded-md bg-orange-500/10 dark:bg-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                    <PenTool className="h-3 w-3" />
                  </div>
                  <div className="h-5 w-5 rounded-md bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-400">
                    <Layers className="h-3 w-3" />
                  </div>
                  <div className="h-5 w-5 rounded-md bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-400">
                    <Smartphone className="h-3 w-3" />
                  </div>
                </div>

                {/* Right style panel */}
                <div className="absolute right-3 top-3 bottom-3 border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-900/95 shadow-xl w-24 rounded-xl flex flex-col p-2 gap-2 select-none text-[8px] font-sans">
                  <span className="font-bold text-zinc-400 uppercase tracking-wider block border-b border-zinc-100 dark:border-white/5 pb-1">{t("features.graphicDesign.layers")}</span>
                  <div className="flex flex-col gap-1.5 text-zinc-700 dark:text-zinc-300">
                    <div className="flex items-center gap-1 opacity-100">
                      <span className={`w-2 h-2 rounded-full ${currentPalette.circleClass}`} />
                      <span>{t("features.graphicDesign.ellipse")}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-80">
                      <span className={`w-2 h-2 rounded-sm ${currentPalette.rectClass}`} />
                      <span>{t("features.graphicDesign.box")}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-50">
                      <span className="w-2 h-2 rounded-full bg-zinc-400" />
                      <span>{t("features.graphicDesign.mask")}</span>
                    </div>
                  </div>
                </div>

                {/* Core Interactive Canvas Art Piece */}
                <div className="relative h-28 w-28 flex items-center justify-center rounded-2xl border border-zinc-200/50 dark:border-white/5 bg-zinc-100/50 dark:bg-zinc-900/20 backdrop-blur-sm overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />

                  {/* Circle shape drifting on hover */}
                  <motion.div 
                    className="absolute rounded-full filter blur-[1px] cursor-pointer"
                    style={{
                      backgroundColor: currentPalette.primary,
                      boxShadow: `0 0 20px ${currentPalette.glow}`
                    }}
                    animate={{ 
                      scale: isDesignHovered ? 1.1 : 1.0,
                      x: isDesignHovered ? 10 : 0, 
                      y: isDesignHovered ? -5 : 0 
                    }}
                    transition={{ type: "spring", stiffness: 80, damping: 12 }}
                    className={`h-14 w-14 rounded-full absolute`}
                  />

                  {/* Frosted Glass Overlapping Square drifting opposite */}
                  <motion.div 
                    className="absolute border border-white/20 backdrop-blur-md rounded-xl p-3 flex flex-col justify-between shadow-lg"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                    }}
                    animate={{ 
                      x: isDesignHovered ? -8 : 0, 
                      y: isDesignHovered ? 8 : 0,
                      rotate: isDesignHovered ? 5 : 0
                    }}
                    transition={{ type: "spring", stiffness: 80, damping: 12 }}
                  >
                    <div className={`h-6 w-6 rounded-md ${currentPalette.rectClass} shadow-md mb-2`} />
                    <div className="h-1.5 w-8 rounded-full bg-zinc-500/50" />
                  </motion.div>
                </div>

                {/* Interactive Palette Controls overlay */}
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/95 dark:bg-zinc-900/95 border border-zinc-200 dark:border-white/10 px-2.5 py-1.5 rounded-full shadow-2xl select-none">
                  <span className="text-[8px] font-bold text-zinc-400 dark:text-zinc-500 uppercase mr-1 select-none">{t("features.graphicDesign.themes")}</span>
                  {(["cyberpunk", "sunset", "ocean"] as PaletteTheme[]).map((themeName) => (
                    <button
                      key={themeName}
                      onClick={() => setActivePalette(themeName)}
                      className={`h-3.5 w-3.5 rounded-full border transition-all duration-300 ${
                        activePalette === themeName 
                          ? "border-orange-500 scale-110 shadow-sm" 
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${PALETTES[themeName].primary} 0%, ${PALETTES[themeName].secondary} 100%)`
                      }}
                      title={themeName}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lower Content Details */}
          <div className="flex flex-1 flex-col p-8 md:p-10 z-10">

            <h3 className="mb-4 text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center justify-between">
              {t("features.graphicDesign.title")}
              <span className="rounded-full dark:bg-[#92370b] bg-[#dc885f] dark:text-white/90 text-white p-2.5 transition-all duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </h3>

            <p className="mb-8 text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("features.graphicDesign.desc")}
            </p>

            {/* Bullet features */}
            <div className="grid gap-3.5 mb-8">
              {[
                { title: t("features.graphicDesign.f1Title"), desc: t("features.graphicDesign.f1Desc") },
                { title: t("features.graphicDesign.f2Title"), desc: t("features.graphicDesign.f2Desc") },
                { title: t("features.graphicDesign.f3Title"), desc: t("features.graphicDesign.f3Desc") }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-xs text-zinc-800 dark:text-zinc-200 block">{item.title}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tags Row */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {["Brand Identity", "UI/UX Design", "Figma", "Vector Art", "3D Assets", "Brand Book"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-white/5 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
