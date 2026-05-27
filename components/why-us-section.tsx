"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  Sparkles, 
  MessageSquare, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Compass,
  ArrowRight,
  TrendingUp,
  Award
} from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function WhyUsSection() {
  const { t, language } = useLanguage();

  // Card 1: Founder-focused roadmap states
  const [activeTask, setActiveTask] = useState(0);
  const tasks = [
    { title: t("whyUs.tasks.commercialValidation"), status: language === "tr" ? "Doğrulandı" : "Validated", progress: 100, desc: t("whyUs.tasks.commercialValidationDesc") },
    { title: t("whyUs.tasks.interactivePrototypes"), status: language === "tr" ? "Yayınlandı" : "Shipped", progress: 100, desc: t("whyUs.tasks.interactivePrototypesDesc") },
    { title: t("whyUs.tasks.scalingArchitecture"), status: language === "tr" ? "Optimize Ediliyor" : "Optimizing", progress: 68, desc: t("whyUs.tasks.scalingArchitectureDesc") }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTask((prev) => (prev + 1) % tasks.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Card 3: Performance dial state
  const [ttfb, setTtfb] = useState(88);
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate micro-fluctuations in server response time
      setTtfb(Math.floor(80 + Math.random() * 15));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Card 4: Brand selector state
  const [brandColor, setBrandColor] = useState("orange");

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
          {t("whyUs.title")}<br />
          <span className="dark:text-white/80 text-black/80 font-light">{t("whyUs.studio")}</span>
        </motion.h2>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        
        {/* ==================== CARD 1: FOUNDER-FOCUSED PRODUCT THINKING (Vertical - Row-span 2) ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-950/20 backdrop-blur-xl p-8 transition-all duration-500 hover:border-zinc-300 dark:hover:border-white/10 hover:shadow-2xl lg:row-span-2"
        >
          {/* Subtle Orange Glow Backdrop on hover */}
          <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none -z-10" />

          {/* Upper: Text copy */}
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Compass className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-300">
              {t("whyUs.thinkingTitle")}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
              {t("whyUs.thinkingDesc")}
            </p>
          </div>

          {/* Lower: High-fidelity Product Roadmap Panel Visual */}
          <div className="mt-8 border border-zinc-200 dark:border-white/5 rounded-2xl bg-white dark:bg-black/45 p-4 shadow-xl select-none relative overflow-hidden flex-1 flex flex-col justify-center min-h-[220px]">
            {/* Soft grid decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(#80808006_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

            <div className="space-y-3.5 relative z-10">
              <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block mb-1">{t("whyUs.sprintBacklog")}</span>
              
              {tasks.map((task, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-xl border transition-all duration-500 flex flex-col gap-1.5 ${
                    activeTask === idx 
                      ? "border-orange-500/35 bg-orange-500/5 dark:bg-orange-500/10" 
                      : "border-zinc-150 dark:border-white/5 bg-transparent opacity-50"
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-zinc-800 dark:text-zinc-200">{task.title}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[7.5px] font-semibold uppercase tracking-wider ${
                      task.status === "Validated" || task.status === "Shipped"
                        ? "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                        : "bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 animate-pulse"
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  
                  {/* Miniature animated progress bar */}
                  <div className="h-1 w-full bg-zinc-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full bg-orange-500`}
                      initial={{ width: 0 }}
                      animate={activeTask === idx ? { width: `${task.progress}%` } : { width: "100%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>


        {/* ==================== CARD 2: DESIGN-FIRST DEVELOPMENT ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-950/20 backdrop-blur-xl p-8 transition-all duration-500 hover:border-zinc-300 dark:hover:border-white/10 hover:shadow-2xl min-h-[340px]"
        >
          {/* Subtle Orange Glow Backdrop on hover */}
          <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none -z-10" />

          {/* Upper: Text copy */}
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-300">
              {t("whyUs.designTitle")}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
              {t("whyUs.designDesc")}
            </p>
          </div>

          {/* Lower: SVG Bezier layout showing precision curves on hover */}
          <div className="mt-8 relative h-24 border border-zinc-200 dark:border-white/5 rounded-2xl bg-white dark:bg-black/45 overflow-hidden flex items-center justify-center p-4">
            <svg className="w-full h-full text-orange-500/30 overflow-visible" viewBox="0 0 200 60">
              {/* Reference Grid lines */}
              <line x1="0" y1="30" x2="200" y2="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3" />
              <line x1="100" y1="0" x2="100" y2="60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3" />
              
              {/* Mathematical Bezier curve */}
              <motion.path
                d="M10,45 C50,5 150,55 190,15"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="text-orange-500"
              />

              {/* Glowing anchor points */}
              <motion.circle 
                cx="50" 
                cy="25" 
                r="3" 
                fill="orange" 
                animate={{ scale: [1, 1.4, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <motion.circle 
                cx="150" 
                cy="35" 
                r="3" 
                fill="orange" 
                animate={{ scale: [1, 1.4, 1] }} 
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              />
            </svg>
            <span className="absolute bottom-2 right-3 font-mono text-[7px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">{t("whyUs.precisionNode")}</span>
          </div>
        </motion.div>


        {/* ==================== CARD 3: FAST, SCALABLE ARCHITECTURE ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-950/20 backdrop-blur-xl p-8 transition-all duration-500 hover:border-zinc-300 dark:hover:border-white/10 hover:shadow-2xl min-h-[340px]"
        >
          {/* Subtle Orange Glow Backdrop on hover */}
          <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none -z-10" />

          {/* Upper: Text copy */}
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-300">
              {t("whyUs.archTitle")}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
              {t("whyUs.archDesc")}
            </p>
          </div>

          {/* Lower: Live TTFB speed dial visual */}
          <div className="mt-8 border border-zinc-200 dark:border-white/5 rounded-2xl bg-white dark:bg-black/45 p-4 shadow-xl select-none flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[7.5px] uppercase font-bold tracking-widest text-zinc-400 dark:text-zinc-500 block">{t("whyUs.performanceIndex")}</span>
              <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{t("whyUs.ultraFast")}</span>
            </div>
            
            <div className="flex items-center gap-3.5 bg-zinc-50 dark:bg-white/5 border border-zinc-150 dark:border-white/5 p-2 rounded-xl">
              <div className="relative h-2 w-2 flex items-center justify-center">
                <span className="absolute h-full w-full rounded-full bg-emerald-500/40 animate-ping" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <div>
                <span className="text-[7.5px] uppercase font-bold text-zinc-400 block leading-none">TTFB</span>
                <span className="text-[12px] font-black font-mono text-emerald-500 leading-none">{ttfb}ms</span>
              </div>
            </div>
          </div>
        </motion.div>


        {/* ==================== CARD 4: BRAND CONSISTENCY ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-950/20 backdrop-blur-xl p-8 transition-all duration-500 hover:border-zinc-300 dark:hover:border-white/10 hover:shadow-2xl min-h-[340px]"
        >
          {/* Subtle Orange Glow Backdrop on hover */}
          <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none -z-10" />

          {/* Upper: Text copy */}
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-300">
              {t("whyUs.brandTitle")}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
              {t("whyUs.brandDesc")}
            </p>
          </div>

          {/* Lower: Brand color picker interaction */}
          <div className="mt-8 border border-zinc-200 dark:border-white/5 rounded-2xl bg-white dark:bg-black/45 p-3.5 shadow-xl select-none flex items-center justify-between gap-4">
            <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{t("whyUs.themeSync")}</span>
            
            <div className="flex gap-2">
              {[
                { name: "orange", color: "bg-orange-500" },
                { name: "gold", color: "bg-amber-400" },
                { name: "cyan", color: "bg-cyan-500" }
              ].map((c) => (
                <button
                  key={c.name}
                  onClick={() => setBrandColor(c.name)}
                  className={`h-5 w-5 rounded-full border transition-all duration-300 ${
                    brandColor === c.name 
                      ? "border-orange-500 scale-110 shadow-md ring-2 ring-orange-500/25" 
                      : "border-transparent opacity-60 hover:opacity-100"
                  } ${c.color} cursor-pointer`}
                />
              ))}
            </div>

            <div className={`text-[8.5px] font-extrabold uppercase px-2 py-0.5 rounded-md transition-all duration-500 ${
              brandColor === "orange" 
                ? "bg-orange-500/10 text-orange-500" 
                : brandColor === "gold" 
                  ? "bg-amber-500/10 text-amber-500" 
                  : "bg-cyan-500/10 text-cyan-550 dark:text-cyan-400"
            }`}>
              {brandColor} {t("whyUs.activeText")}
            </div>
          </div>
        </motion.div>


        {/* ==================== CARD 5: CLEAN COMMUNICATION ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-950/20 backdrop-blur-xl p-8 transition-all duration-500 hover:border-zinc-300 dark:hover:border-white/10 hover:shadow-2xl min-h-[340px]"
        >
          {/* Subtle Orange Glow Backdrop on hover */}
          <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none -z-10" />

          {/* Upper: Text copy */}
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-300">
              {t("whyUs.commTitle")}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
              {t("whyUs.commDesc")}
            </p>
          </div>

          {/* Lower: Simulated Loom/Slack updates bubble */}
          <div className="mt-8 border border-zinc-200 dark:border-white/5 rounded-2xl bg-white dark:bg-black/45 p-3.5 shadow-xl select-none space-y-2 text-[8px] font-sans relative overflow-hidden">
            <div className="flex gap-2 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="font-bold text-zinc-400 dark:text-zinc-550 uppercase tracking-widest">{t("whyUs.logUpdates")}</span>
            </div>

            <div className="flex justify-between items-center text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-white/5 border border-zinc-150 dark:border-white/5 p-1.5 rounded-lg">
              <span className="font-medium truncate">UI wireframe review.mp4</span>
              <span className="text-[7px] text-orange-500 font-bold ml-2"> {t("whyUs.loomSend")}</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
