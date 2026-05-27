"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowUpRight, 
  Terminal, 
  Sparkles, 
  Activity, 
  Layers, 
  Smartphone,
  Eye,
  Sliders,
  Check,
  Zap,
  Flame,
  Droplet,
  Moon,
  ChevronsLeftRight,
  Users,
  Map,
  BookOpen,
  Award,
  MapPin,
  Route
} from "lucide-react";
import { useLanguage } from "@/context/language-context";

// Project 1 Types (Edebî Haritam Dashboard Tabs)
type DashboardTab = "discovery" | "clubs" | "map";

// Project 3 Types
type MobileScene = "sunset" | "ocean" | "midnight";

interface SceneConfig {
  name: string;
  class: string;
  glowColor: string;
  icon: React.ReactNode;
  themeColor: string;
}

export function ProjectsSection() {
  const { t, language } = useLanguage();

  // ----------------------------------------------------
  // PROJECT 1: EDEBÎ HARİTAM (Web App)
  // ----------------------------------------------------
  const [activeTab, setActiveTab] = useState<DashboardTab>("discovery");


  // ----------------------------------------------------
  // PROJECT 2: KRONA BRAND SYSTEM (Branding)
  // ----------------------------------------------------
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Auto-oscillate slider slightly on mount until user interacts, to highlight interactivity
  useEffect(() => {
    if (hasDragged) return;
    
    let angle = 0;
    const interval = setInterval(() => {
      angle += 0.05;
      const offset = Math.sin(angle) * 12; // Swing 12% left/right
      setSliderPos(50 + offset);
    }, 45);

    return () => clearInterval(interval);
  }, [hasDragged]);

  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setHasDragged(true);
    handleSliderMove(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleSliderMove(e.clientX);
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setHasDragged(true);
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };


  // ----------------------------------------------------
  // PROJECT 3: SOLAS MOBILE (UI/UX)
  // ----------------------------------------------------
  const [activeScene, setActiveScene] = useState<MobileScene>("sunset");
  const [intensity, setIntensity] = useState(70);

  const SCENES: Record<MobileScene, SceneConfig> = {
    sunset: {
      name: t("projects.solasMobile.sunsetGlow"),
      class: "bg-gradient-to-tr from-amber-600 via-orange-500 to-rose-500",
      glowColor: "rgba(239, 68, 68, 0.45)",
      themeColor: "text-amber-500",
      icon: <Flame className="h-4 w-4" />
    },
    ocean: {
      name: t("projects.solasMobile.oceanBreeze"),
      class: "bg-gradient-to-tr from-cyan-600 via-teal-500 to-blue-600",
      glowColor: "rgba(6, 182, 212, 0.45)",
      themeColor: "text-cyan-500",
      icon: <Droplet className="h-4 w-4" />
    },
    midnight: {
      name: t("projects.solasMobile.midnightOasis"),
      class: "bg-gradient-to-tr from-indigo-950 via-slate-900 to-blue-950",
      glowColor: "rgba(37, 99, 235, 0.35)",
      themeColor: "text-blue-400",
      icon: <Moon className="h-4 w-4" />
    }
  };

  const currentScene = SCENES[activeScene];

  return (
    <section className="mx-auto w-full max-w-7xl px-6 md:px-8">
      {/* Section Header */}
      <div className="mb-24 flex flex-col items-center text-center gap-6">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-white md:text-5xl lg:text-6xl max-w-3xl"
        >
          {t("projects.selectedWork")}<br />
          <span className="dark:text-white/80 text-black/80 font-light">{t("projects.subheading")}</span>
        </motion.h2>
      </div>

      {/* Stack of horizontal custom project cards */}
      <div className="flex flex-col gap-20 lg:gap-28 w-full">
              {/* ==================== PROJECT 1: EDEBÎ HARİTAM (Web App) ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group relative flex flex-col lg:flex-row overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950/20 backdrop-blur-xl transition-all duration-500 hover:border-zinc-300 dark:hover:border-white/10"
        >
          {/* Decorative Ambient Aura Glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none group-hover:bg-blue-500/15 transition-all duration-500" />
          
          {/* Card Info Column */}
          <div className="flex flex-1 flex-col p-8 md:p-12 lg:p-14 z-10 justify-between lg:max-w-xl">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">{t("projects.edebiHaritam.category")}</span>
              </div>

              <h3 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
                {t("projects.edebiHaritam.title")}
              </h3>

              <p className="mb-8 text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t("projects.edebiHaritam.desc")}
              </p>

              {/* Unique Features Bullet List */}
              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-md bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Map className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-xs text-zinc-800 dark:text-zinc-200 block">{t("projects.edebiHaritam.feature1Title")}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{t("projects.edebiHaritam.feature1Desc")}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-md bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-xs text-zinc-800 dark:text-zinc-200 block">{t("projects.edebiHaritam.feature2Title")}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{t("projects.edebiHaritam.feature2Desc")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study Trigger Button */}
            <div className="mt-auto">
              <button className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-black/10 dark:border-white/10 dark:bg-white/5 bg-black/5 hover:bg-black/90 dark:hover:bg-white hover:text-white dark:hover:text-black px-7 py-3.5 text-sm font-semibold transition-all duration-300 cursor-pointer">
                <span>{t("projects.edebiHaritam.btnText")}</span>
                <span className="rounded-full bg-blue-500 dark:bg-blue-500/20 text-white dark:text-blue-400 p-1 group-hover/btn:bg-white dark:group-hover/btn:bg-black dark:group-hover/btn:text-white group-hover/btn:text-black transition-colors duration-300">
                  <ArrowUpRight className="h-4.5 w-4.5" />
                </span>
              </button>
            </div>
          </div>

          {/* Interactive Showcase Preview Column */}
          <div className="flex-1 bg-zinc-50 dark:bg-zinc-950/60 p-6 md:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-zinc-150 dark:border-white/5 flex flex-col justify-center items-center min-h-[380px] lg:min-h-0 relative overflow-hidden">
            {/* Mesh background grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:16px_28px] pointer-events-none" />

            {/* Interactive Tab Dock Selector */}
            <div className="flex gap-1.5 p-1 rounded-full border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-black/45 backdrop-blur-md shadow-lg mb-6 z-15 select-none">
              {([
                { id: "discovery", label: t("projects.edebiHaritam.tabDiscovery") },
                { id: "clubs", label: t("projects.edebiHaritam.tabClubs") },
                { id: "map", label: t("projects.edebiHaritam.tabMap") }
              ]).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as DashboardTab)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all duration-300 cursor-pointer ${
                    activeTab === tab.id 
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-black shadow-sm" 
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Active Display Panel */}
            <div className="relative w-full max-w-md aspect-[16/10] rounded-2xl border border-zinc-250 dark:border-white/10 bg-white/95 dark:bg-zinc-900/90 shadow-2xl p-5 overflow-hidden z-10 select-none flex flex-col transition-all duration-500">
              
              <AnimatePresence mode="wait">
                {/* 1. DISCOVERY SCREEN */}
                {activeTab === "discovery" && (
                  <motion.div
                    key="discovery"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-full justify-between"
                  >
                    <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-3">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-extrabold block">{t("projects.edebiHaritam.discoveryTitle")}</span>
                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-100">{t("projects.edebiHaritam.featuredRoute")}</span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[8px] font-bold px-2 py-0.5 rounded-full border border-blue-100 dark:border-blue-900/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                        {t("projects.edebiHaritam.newRoute")}
                      </span>
                    </div>

                    {/* Timeline representation of the featured route */}
                    <div className="py-2 flex flex-col gap-2">
                      <div className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-950 p-2 rounded-lg border border-zinc-100 dark:border-zinc-800/80">
                        <div className="flex items-center gap-2 mb-1">
                          <Route className="h-3.5 w-3.5 text-blue-500" />
                          <span className="font-serif font-bold text-zinc-900 dark:text-white">{t("projects.edebiHaritam.routeTitle")}</span>
                        </div>
                        <p className="text-[9px] text-zinc-500 dark:text-zinc-400 font-normal leading-normal">
                          {t("projects.edebiHaritam.routeDesc")}
                        </p>
                      </div>

                      {/* Stops List */}
                      <div className="relative pl-4 border-l border-zinc-150 dark:border-zinc-800 flex flex-col gap-2.5 ml-2.5">
                        <div className="relative">
                          <div className="absolute -left-[20.5px] top-1 h-2 w-2 rounded-full bg-blue-600 ring-4 ring-blue-50 dark:ring-blue-950" />
                          <div className="text-[9px] font-bold text-zinc-800 dark:text-zinc-200">{t("projects.edebiHaritam.stop1Title")}</div>
                          <p className="text-[8px] text-zinc-400 dark:text-zinc-500">{t("projects.edebiHaritam.stop1Desc")}</p>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-[20.5px] top-1 h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                          <div className="text-[9px] font-bold text-zinc-600 dark:text-zinc-400">{t("projects.edebiHaritam.stop2Title")}</div>
                          <p className="text-[8px] text-zinc-400 dark:text-zinc-500">{t("projects.edebiHaritam.stop2Desc")}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[9px] border-t border-zinc-100 dark:border-zinc-800 pt-2 bg-zinc-50/50 dark:bg-zinc-950/20 p-2 rounded-xl border border-zinc-100 dark:border-zinc-800/80">
                      <span className="text-zinc-400 dark:text-zinc-500">{t("projects.edebiHaritam.totalDistance")}</span>
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{t("projects.edebiHaritam.distanceStats")}</span>
                    </div>
                  </motion.div>
                )}

                {/* 2. CLUBS SCREEN */}
                {activeTab === "clubs" && (
                  <motion.div
                    key="clubs"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-full justify-between"
                  >
                    <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-2.5">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-extrabold block">{t("projects.edebiHaritam.communityAnalytics")}</span>
                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-100">{t("projects.edebiHaritam.clubActivityStatus")}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[8px] font-bold px-2 py-0.5 rounded-full">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {language === "tr" ? "Canlı" : "Live"}
                      </span>
                    </div>

                    {/* Circular Vitality Gauge & Stats Side by Side */}
                    <div className="flex items-center justify-center py-1 gap-6">
                      <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="40" cy="40" r="33" className="stroke-zinc-100 dark:stroke-zinc-800" strokeWidth="5" fill="transparent" />
                          <motion.circle 
                            cx="40" 
                            cy="40" 
                            r="33" 
                            className="stroke-blue-600 dark:stroke-blue-500" 
                            strokeWidth="5" 
                            fill="transparent" 
                            strokeDasharray="207.3"
                            initial={{ strokeDashoffset: 207.3 }}
                            animate={{ strokeDashoffset: 207.3 - (207.3 * 0.98) }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                          />
                        </svg>
                        <div className="absolute text-center">
                          <span className="text-base font-black font-mono tracking-tight text-zinc-800 dark:text-white">98%</span>
                          <span className="text-[6.5px] uppercase tracking-wider text-zinc-400 block font-bold">{t("projects.edebiHaritam.vitality")}</span>
                        </div>
                      </div>

                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex items-start gap-1.5">
                          <Award className="h-3.5 w-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[7.5px] uppercase font-bold text-zinc-400 dark:text-zinc-500 block">{t("projects.edebiHaritam.clubScoreLabel")}</span>
                            <span className="text-[9.5px] font-bold text-zinc-700 dark:text-zinc-300">{t("projects.edebiHaritam.clubScoreVal")}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-1.5">
                          <Users className="h-3.5 w-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[7.5px] uppercase font-bold text-zinc-400 dark:text-zinc-500 block">{t("projects.edebiHaritam.activeMembersLabel")}</span>
                            <span className="text-[9.5px] font-bold text-zinc-700 dark:text-zinc-300">{t("projects.edebiHaritam.activeMembersVal")}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[9px] border-t border-zinc-100 dark:border-zinc-800 pt-2 bg-zinc-50/50 dark:bg-zinc-950/20 p-2 rounded-xl border border-zinc-100 dark:border-zinc-800/80">
                      <BookOpen className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                      <div className="min-w-0 flex-1 truncate">
                        <span className="text-zinc-400 dark:text-zinc-500 block text-[6.5px] uppercase font-extrabold">{t("projects.edebiHaritam.readingEvent")}</span>
                        <span className="font-bold text-zinc-800 dark:text-zinc-200 text-[9px] truncate block">{t("projects.edebiHaritam.readingEventTitle")}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. MAP SCREEN */}
                {activeTab === "map" && (
                  <motion.div
                    key="map"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-full justify-between"
                  >
                    <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-2">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-extrabold block">{t("projects.edebiHaritam.geoWorkDiscovery")}</span>
                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-100">{t("projects.edebiHaritam.interactiveLiteraryMap")}</span>
                      </div>
                      <span className="text-[8px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest bg-zinc-50 dark:bg-zinc-950 px-2 py-0.5 rounded border border-zinc-100 dark:border-zinc-850">
                        {t("projects.edebiHaritam.locationBadge")}
                      </span>
                    </div>

                    {/* Minimal Map SVG Grid Showcase */}
                    <div className="flex-1 my-2 rounded-xl bg-zinc-50/70 dark:bg-zinc-950/40 border border-zinc-100 dark:border-zinc-800 overflow-hidden relative flex items-center justify-center min-h-[95px]">
                      {/* Map grid lines */}
                      <div className="absolute inset-0 bg-[radial-gradient(#3b82f612_1px,transparent_1px)] [background-size:10px_10px]" />
                      
                      <svg className="absolute inset-0 w-full h-full text-zinc-200 dark:text-zinc-800 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                        {/* Draw a stylized curved pathway representing the route */}
                        <motion.path 
                          d="M 40 70 Q 120 20 180 65 T 320 30" 
                          fill="none" 
                          className="stroke-blue-600/40 dark:stroke-blue-500/30" 
                          strokeWidth="2" 
                          strokeDasharray="4"
                          initial={{ strokeDashoffset: 100 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                        />
                      </svg>

                      {/* Pulsing Pin A */}
                      <div className="absolute left-[40px] top-[62px] group/pin">
                        <span className="absolute inline-flex h-3 w-3 rounded-full bg-blue-500 opacity-75 animate-ping" />
                        <MapPin className="h-3.5 w-3.5 text-blue-600 relative z-10 animate-bounce" />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900/90 dark:bg-zinc-800 text-white text-[7px] py-0.5 px-1.5 rounded shadow-md whitespace-nowrap opacity-100 transition-opacity duration-300 pointer-events-none font-bold">
                          {t("projects.edebiHaritam.stop1Title").split(",")[0]}
                        </div>
                      </div>

                      {/* Pulsing Pin B */}
                      <div className="absolute left-[165px] top-[30px] group/pin">
                        <span className="absolute inline-flex h-3 w-3 rounded-full bg-blue-500 opacity-75 animate-ping" />
                        <MapPin className="h-3.5 w-3.5 text-blue-600 relative z-10" />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900/90 dark:bg-zinc-800 text-white text-[7px] py-0.5 px-1.5 rounded shadow-md whitespace-nowrap opacity-100 transition-opacity duration-300 pointer-events-none font-bold">
                          {language === "tr" ? "Aşiyan" : "Aşiyan"}
                        </div>
                      </div>

                      {/* Info Card Overlay on Map */}
                      <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border border-zinc-150 dark:border-zinc-800 p-1.5 rounded-lg flex items-center justify-between shadow-sm">
                        <span className="text-[8px] font-bold text-zinc-800 dark:text-zinc-200">{t("projects.edebiHaritam.bosphorusRoute")}</span>
                        <span className="text-[7.5px] text-blue-600 dark:text-blue-400 font-mono font-bold">{t("projects.edebiHaritam.activeQuest")}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </motion.div>


        {/* ==================== PROJECT 2: KRONA BRAND SYSTEM (Branding) ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group relative flex flex-col lg:flex-row-reverse overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950/20 backdrop-blur-xl transition-all duration-500 hover:border-zinc-300 dark:hover:border-white/10"
        >
          {/* Decorative Ambient Aura Glow */}
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none group-hover:bg-amber-500/15 transition-all duration-500" />

          {/* Card Info Column */}
          <div className="flex flex-1 flex-col p-8 md:p-12 lg:p-14 z-10 justify-between lg:max-w-xl">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">{t("projects.kronaBrand.category")}</span>
              </div>

              <h3 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
                {t("projects.kronaBrand.title")}
              </h3>

              <p className="mb-8 text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t("projects.kronaBrand.desc")}
              </p>

              {/* Unique Features Bullet List */}
              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-md bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Layers className="h-3 w-3" />
                  </div>
                  <div>
                    <span className="font-semibold text-xs text-zinc-800 dark:text-zinc-200 block">{t("projects.kronaBrand.feature1Title")}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{t("projects.kronaBrand.feature1Desc")}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-md bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sliders className="h-3 w-3" />
                  </div>
                  <div>
                    <span className="font-semibold text-xs text-zinc-800 dark:text-zinc-200 block">{t("projects.kronaBrand.feature2Title")}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{t("projects.kronaBrand.feature2Desc")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study Trigger Button */}
            <div className="mt-auto">
              <button className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-black/10 dark:border-white/10 dark:bg-white/5 bg-black/5 hover:bg-black/90 dark:hover:bg-white hover:text-white dark:hover:text-black px-7 py-3.5 text-sm font-semibold transition-all duration-300 cursor-pointer">
                <span>{t("projects.kronaBrand.btnText")}</span>
                <span className="rounded-full bg-amber-500 dark:bg-amber-500/20 text-white dark:text-amber-400 p-1 group-hover/btn:bg-white dark:group-hover/btn:bg-black dark:group-hover/btn:text-white group-hover/btn:text-black transition-colors duration-300">
                  <ArrowUpRight className="h-4.5 w-4.5" />
                </span>
              </button>
            </div>
          </div>

          {/* Draggable Before/After Image Slider Preview Column */}
          <div className="flex-1 bg-zinc-50 dark:bg-zinc-950/60 p-6 md:p-8 lg:p-10 border-t lg:border-t-0 lg:border-r border-zinc-150 dark:border-white/5 flex flex-col justify-center items-center min-h-[380px] lg:min-h-0 relative overflow-hidden select-none">
            {/* Mesh background grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:16px_28px] pointer-events-none" />

            {/* Info Badge */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-black/45 px-3.5 py-1 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 backdrop-blur-md">
              <Eye className="h-3 w-3 text-amber-500" />
              <span>{t("projects.kronaBrand.sliderBadge")}</span>
            </div>

            {/* Slider Container Frame */}
            <div 
              ref={sliderContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUpOrLeave}
              className="relative w-full max-w-md aspect-[4/3] rounded-2xl border border-zinc-250 dark:border-white/10 overflow-hidden cursor-ew-resize bg-zinc-100 dark:bg-zinc-900 shadow-2xl z-10"
            >
              {/* LAYER 1 (BEFORE): The Blueprint Wireframe */}
              <div className="absolute inset-0 h-full w-full flex items-center justify-center p-6 bg-zinc-900">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-70 pointer-events-none" />
                
                {/* Simulated Geometric Blueprint Vector Graphic */}
                <div className="relative w-48 h-48 rounded-full border border-amber-500/20 flex items-center justify-center">
                  <div className="absolute inset-2 rounded-full border border-amber-500/10" />
                  <div className="absolute inset-8 rounded-full border border-amber-500/15" />
                  
                  {/* Axis lines */}
                  <div className="absolute h-full w-px bg-amber-500/15" />
                  <div className="absolute w-full h-px bg-amber-500/15" />
                  
                  {/* Diagonal guides */}
                  <div className="absolute w-full h-px bg-amber-500/10 rotate-45" />
                  <div className="absolute w-full h-px bg-amber-500/10 -rotate-45" />
                  
                  {/* Glowing core math circle */}
                  <div className="absolute w-24 h-24 rounded-full border-2 border-amber-500/30 border-dashed animate-spin" style={{ animationDuration: "25s" }} />

                  {/* Math tags */}
                  <span className="absolute -top-4 font-mono text-[7px] text-amber-500/50 uppercase tracking-widest">{t("projects.kronaBrand.rVal")}</span>
                  <span className="absolute -bottom-4 font-mono text-[7px] text-amber-500/50 uppercase tracking-widest">{language === "tr" ? "Açı = 45.00°" : "Angle = 45.00°"}</span>
                  
                  {/* Golden Ratio Triangle */}
                  <svg className="absolute w-28 h-28 text-amber-500/20 overflow-visible" viewBox="0 0 100 100">
                    <polygon points="50,10 15,80 85,80" fill="none" stroke="currentColor" strokeWidth="1" />
                    <line x1="50" y1="10" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2" />
                  </svg>

                  {/* Core emblem outline */}
                  <div className="absolute w-20 h-28 border border-amber-500 flex items-center justify-center rounded-xl bg-zinc-950/20 font-serif text-3xl font-light text-amber-400/90 shadow-2xl">
                    K
                  </div>
                </div>
              </div>

              {/* LAYER 2 (AFTER): The Finished Textured Render */}
              <div 
                className="absolute inset-0 h-full overflow-hidden flex items-center justify-center p-6 bg-gradient-to-br from-amber-700 via-amber-900 to-zinc-950 transition-all duration-75"
                style={{
                  clipPath: `inset(0 ${100 - sliderPos}% 0 0)`
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                
                {/* Glowing finished branded shield mockup */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <div 
                    className="absolute w-44 h-44 rounded-full filter blur-xl opacity-35" 
                    style={{
                      background: "radial-gradient(circle, rgba(245,158,11,0.5) 0%, transparent 70%)"
                    }}
                  />
                  
                  {/* Realistic Textured 3D Golden Emblem */}
                  <motion.div 
                    className="relative w-28 h-36 border border-amber-400/35 bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-700 p-0.5 rounded-[22px] flex items-center justify-center shadow-2xl overflow-hidden"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    style={{
                      boxShadow: "0 25px 50px -12px rgba(245,158,11,0.3)"
                    }}
                  >
                    {/* Metal Sheen overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-150%] animate-sheen pointer-events-none" />
                    
                    {/* Emblem Inner Shell */}
                    <div className="w-full h-full bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-[20px] flex flex-col items-center justify-center p-4">
                      {/* Gold Emblem Art */}
                      <span className="font-serif text-5xl font-extralight bg-gradient-to-b from-amber-300 via-amber-100 to-amber-500 bg-clip-text text-transparent select-none">
                        K
                      </span>
                      <div className="h-0.5 w-10 bg-amber-400/20 rounded-full mt-2.5" />
                      <span className="text-[6.5px] uppercase tracking-widest text-amber-400/60 font-bold mt-1.5 font-sans">{t("projects.kronaBrand.kronaGroup")}</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* SLIDER HANDLE LINE AND CIRCLE */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-amber-400/80 z-30 transition-all duration-75"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-amber-300 dark:border-amber-400 bg-zinc-900 text-amber-400 shadow-3xl flex items-center justify-center cursor-ew-resize select-none">
                  <ChevronsLeftRight className="h-4.5 w-4.5 animate-pulse" />
                </div>
              </div>

            </div>
          </div>
        </motion.div>


        {/* ==================== PROJECT 3: SOLAS MOBILE (UI/UX) ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group relative flex flex-col lg:flex-row overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950/20 backdrop-blur-xl transition-all duration-500 hover:border-zinc-300 dark:hover:border-white/10"
        >
          {/* Decorative Ambient Aura Glow - Controlled by reactive active scene backlighting! */}
          <div 
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none transition-all duration-700" 
            style={{
              backgroundColor: currentScene.glowColor,
              opacity: (intensity / 100) * 0.7
            }}
          />

          {/* Card Info Column */}
          <div className="flex flex-1 flex-col p-8 md:p-12 lg:p-14 z-10 justify-between lg:max-w-xl">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">{t("projects.solasMobile.category")}</span>
              </div>

              <h3 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
                {t("projects.solasMobile.title")}
              </h3>

              <p className="mb-8 text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t("projects.solasMobile.desc")}
              </p>

              {/* Unique Features Bullet List */}
              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-md bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Smartphone className="h-3 w-3" />
                  </div>
                  <div>
                    <span className="font-semibold text-xs text-zinc-800 dark:text-zinc-200 block">{t("projects.solasMobile.feature1Title")}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{t("projects.solasMobile.feature1Desc")}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-md bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sliders className="h-3 w-3" />
                  </div>
                  <div>
                    <span className="font-semibold text-xs text-zinc-800 dark:text-zinc-200 block">{t("projects.solasMobile.feature2Title")}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{t("projects.solasMobile.feature2Desc")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study Trigger Button */}
            <div className="mt-auto">
              <button className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-black/10 dark:border-white/10 dark:bg-white/5 bg-black/5 hover:bg-black/90 dark:hover:bg-white hover:text-white dark:hover:text-black px-7 py-3.5 text-sm font-semibold transition-all duration-300 cursor-pointer">
                <span>{t("projects.solasMobile.btnText")}</span>
                <span className="rounded-full bg-blue-500 dark:bg-blue-500/20 text-white dark:text-blue-400 p-1 group-hover/btn:bg-white dark:group-hover/btn:bg-black dark:group-hover/btn:text-white group-hover/btn:text-black transition-colors duration-300">
                  <ArrowUpRight className="h-4.5 w-4.5" />
                </span>
              </button>
            </div>
          </div>

          {/* Interactive Phone Mockup Preview Column */}
          <div className="flex-1 bg-zinc-50 dark:bg-zinc-950/60 p-6 md:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-zinc-150 dark:border-white/5 flex flex-col justify-center items-center min-h-[440px] lg:min-h-0 relative overflow-hidden select-none">
            {/* Mesh background grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:16px_28px] pointer-events-none" />

            {/* Phone Container Box with dynamic scene shadow representing ambient room glow */}
            <div 
              className="relative w-[220px] aspect-[9/18.5] rounded-[38px] border-4 border-zinc-900 bg-zinc-950 shadow-2xl p-2 select-none z-10 flex flex-col overflow-hidden transition-all duration-700"
              style={{
                boxShadow: `0 35px 80px -15px ${currentScene.glowColor}`
              }}
            >
              {/* Phone Speaker & Camera Notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-zinc-900 rounded-full flex justify-center items-center z-30 select-none">
                <span className="w-6 h-0.5 rounded-full bg-zinc-800" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 border border-zinc-800 ml-2" />
              </div>

              {/* Dynamic Internal Screen Content */}
              <div className={`relative flex-1 rounded-[30px] overflow-hidden p-3.5 flex flex-col justify-between pt-7 transition-all duration-700 text-white ${currentScene.class}`}>
                {/* Overlay Ambient Dimmer (intensity linked) */}
                <div 
                  className="absolute inset-0 bg-black pointer-events-none transition-all duration-500" 
                  style={{ opacity: (100 - intensity) * 0.005 }}
                />

                {/* Phone Status Bar */}
                <div className="relative flex justify-between items-center text-[7px] font-bold opacity-60 z-20">
                  <span>09:41 AM</span>
                  <div className="flex gap-1 items-center">
                    <span>5G</span>
                    <span className="w-3.5 h-1.5 rounded-sm border border-white flex-shrink-0 relative">
                      <span className="absolute inset-px bg-white rounded-[0.5px]" />
                    </span>
                  </div>
                </div>

                {/* App Screen Content */}
                <div className="relative flex-1 flex flex-col justify-between py-2 z-20">
                  <div>
                    <span className="text-[6.5px] uppercase font-black tracking-widest opacity-60 block">{t("projects.solasMobile.ecosystemNode")}</span>
                    <h4 className="text-sm font-black tracking-tight leading-tight select-none">{t("projects.solasMobile.livingRoom")}</h4>
                    
                    {/* Dynamic Ambient lamp icon */}
                    <div className="flex justify-center items-center py-3 select-none">
                      <div 
                        className="p-3.5 rounded-full bg-white/10 border border-white/20 relative shadow-2xl transition-transform duration-500 group-hover:scale-105"
                        style={{
                          boxShadow: `0 0 ${intensity / 2}px rgba(255, 255, 255, ${intensity / 100})`
                        }}
                      >
                        {currentScene.icon}
                      </div>
                    </div>
                  </div>

                  {/* Scene Selectors */}
                  <div className="space-y-2">
                    <span className="text-[6px] uppercase font-extrabold tracking-widest opacity-60 block text-center">{t("projects.solasMobile.selectAmbience")}</span>
                    
                    <div className="grid grid-cols-3 gap-1 bg-black/20 border border-white/5 p-1 rounded-xl select-none">
                      {(["sunset", "ocean", "midnight"] as MobileScene[]).map((scene) => (
                        <button
                          key={scene}
                          onClick={() => setActiveScene(scene)}
                          className={`py-1 rounded-lg text-[6px] font-bold tracking-tight transition-all duration-300 flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                            activeScene === scene 
                              ? "bg-white text-zinc-900 shadow-md font-black" 
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <span className={activeScene === scene ? currentScene.themeColor : ""}>
                            {SCENES[scene].icon}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dimmer Interactive Range Slider */}
                  <div className="space-y-1.5 mt-2 bg-black/10 border border-white/5 p-2 rounded-xl">
                    <div className="flex justify-between items-center text-[6px] font-bold opacity-75">
                      <span>{t("projects.solasMobile.ambientIntensity")}</span>
                      <span className="font-mono">{intensity}%</span>
                    </div>
                    
                    {/* Real Custom Input Range */}
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={intensity} 
                      onChange={(e) => setIntensity(Number(e.target.value))}
                      className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white hover:accent-zinc-100 transition-colors focus:outline-none"
                    />
                  </div>
                </div>

                {/* Bottom Notch Bar indicator */}
                <div className="relative flex justify-center pb-0.5 z-20">
                  <span className="w-12 h-1 bg-white/40 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Decorative Elegant Divider Line */}
      <div className="relative my-32 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-zinc-200 dark:border-white/5" />
        </div>
        <div className="relative flex justify-center text-xs uppercase select-none">
          <span className="bg-white dark:bg-zinc-950 px-4 text-zinc-400 dark:text-zinc-500 font-mono tracking-widest text-[9px] flex items-center gap-2 border border-zinc-200/50 dark:border-white/5 rounded-full py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
            {t("projects.stats.trustSchema")}
          </span>
        </div>
      </div>

      {/* Trusted By / Stats Section */}
      <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-8 items-start justify-between py-8">
        <div className="max-w-md space-y-4">
          <h3 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-white md:text-4xl">
            {t("projects.stats.builtForFounders")}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-655 dark:text-zinc-400 max-w-sm">
            {t("projects.stats.partnerDesc")}
          </p>
        </div>

        {/* 2x2 Grid of Metrics */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-10 w-full lg:max-w-2xl select-none">
          {[
            { value: t("projects.stats.stat1Val"), label: t("projects.stats.stat1Label"), desc: t("projects.stats.stat1Desc") },
            { value: t("projects.stats.stat2Val"), label: t("projects.stats.stat2Label"), desc: t("projects.stats.stat2Desc") },
            { value: t("projects.stats.stat3Val"), label: t("projects.stats.stat3Label"), desc: t("projects.stats.stat3Desc") },
            { value: t("projects.stats.stat4Val"), label: t("projects.stats.stat4Label"), desc: t("projects.stats.stat4Desc") }
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              className="group/stat space-y-2 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <span className="font-serif text-4xl md:text-5xl font-black bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-900 dark:from-white dark:via-zinc-300 dark:to-zinc-400 bg-clip-text text-transparent group-hover/stat:from-orange-600 group-hover/stat:to-amber-400 dark:group-hover/stat:from-orange-500 dark:group-hover/stat:to-amber-300 transition-all duration-300">
                {stat.value}
              </span>
              <div>
                <span className="font-bold text-xs text-zinc-800 dark:text-zinc-200 block">
                  {stat.label}
                </span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block leading-normal mt-0.5">
                  {stat.desc}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}

