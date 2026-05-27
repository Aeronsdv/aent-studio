"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function FinalCtaSection() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto w-full max-w-7xl px-6 md:px-8 text-center relative overflow-hidden rounded-[32px] border border-zinc-200 dark:border-white/5 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-3xl py-12">
      
      {/* Self-contained CSS Animation styles for the shifting gradient background */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift {
          background-size: 300% 300%;
          animation: gradientShift 15s ease infinite;
        }
      `}} />

      {/* Shifting Gradient Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-zinc-100/50 to-blue-500/10 dark:from-orange-950/20 dark:via-zinc-950/40 dark:to-blue-950/20 animate-gradient-shift -z-20 pointer-events-none" />

      {/* Playful Orange Glowing Backdrop Blob */}
      <motion.div
        animate={{
          x: [-60, 80, -40, -60],
          y: [-50, 60, -70, -50],
          scale: [1, 1.35, 0.8, 1],
          rotate: [0, 120, 240, 360],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[8%] top-[10%] w-[380px] h-[380px] rounded-full bg-gradient-to-br from-orange-500/30 via-amber-500/15 to-transparent blur-[90px] pointer-events-none -z-10"
      />

      {/* Playful Blue Glowing Backdrop Blob */}
      <motion.div
        animate={{
          x: [60, -80, 40, 60],
          y: [50, -60, 70, 50],
          scale: [1, 0.8, 1.3, 1],
          rotate: [360, 240, 120, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[8%] bottom-[10%] w-[420px] h-[420px] rounded-full bg-gradient-to-br from-blue-500/30 via-cyan-500/15 to-transparent blur-[100px] pointer-events-none -z-10"
      />

      {/* Playful Fuchsia Transition Backdrop Blob in Center */}
      <motion.div
        animate={{
          x: [20, -50, 40, 20],
          y: [-40, 40, -30, -40],
          scale: [0.85, 1.2, 0.9, 0.85],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[35%] top-[25%] w-[350px] h-[350px] rounded-full bg-gradient-to-br from-fuchsia-500/20 via-pink-500/10 to-transparent blur-[100px] pointer-events-none -z-10"
      />

      {/* Central Blending Glow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.06)_0%,rgba(59,130,246,0.06)_60%,transparent_100%)] pointer-events-none -z-10" />

      {/* Decorative clean mesh background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808004_1px,transparent_1px),linear-gradient(to_bottom,#80808004_1px,transparent_1px)] bg-[size:24px_38px] pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="py-24 md:py-32 flex flex-col items-center justify-center gap-8 relative z-10 max-w-4xl mx-auto select-none">

        {/* Large Aesthetic Serif Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-zinc-900 dark:text-white"
        >
          {t("finalCta.haveIdea")}<br />
          <span className="dark:text-white/80 text-black/80 font-light">{t("finalCta.worthBuilding")}</span>
        </motion.h2>

        {/* Supporting description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl text-base md:text-lg leading-relaxed text-zinc-550 dark:text-zinc-400 font-medium"
        >
          {t("finalCta.description")}
        </motion.p>

        {/* Magnetic Premium Button Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4"
        >
          <button 
            className="group relative inline-flex h-16 items-center justify-center gap-3.5 overflow-hidden rounded-full dark:bg-white bg-zinc-900 px-14 text-base font-semibold dark:text-black text-white transition-all duration-300 shadow-2xl hover:scale-105 hover:shadow-orange-500/10 cursor-pointer"
            style={{
              boxShadow: "0 25px 50px -12px rgba(236, 78, 2, 0.15)"
            }}
          >
            {/* Glowing inner sheen overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 pointer-events-none" />

            <span className="relative z-10">{t("finalCta.contactUs")}</span>
            <span className="rounded-full bg-white/10 dark:bg-black/5 p-1 text-white dark:text-black group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </button>
        </motion.div>

      </div>
      
    </section>
  );
}
