"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Quote, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useLanguage } from "@/context/language-context";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
  metricLabel: string;
}

export function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const { t } = useLanguage();

  const TESTIMONIALS: Testimonial[] = [
    {
      quote: t("testimonials.mertQuote"),
      author: "Mert Yazıcıoğlu",
      role: t("testimonials.roleCeo"),
      company: "Aether Labs",
      metric: "100%",
      metricLabel: t("testimonials.performanceScore")
    },
    {
      quote: t("testimonials.okanQuote"),
      author: "Okan Aydın",
      role: t("testimonials.roleHead"),
      company: "Solas Home Ecosystem",
      metric: "+42%",
      metricLabel: t("testimonials.conversionIncrease")
    },
    {
      quote: t("testimonials.ecrinQuote"),
      author: "Ecrin Demir",
      role: t("testimonials.roleManaging"),
      company: "Krona Investment Syndicate",
      metric: "0.08s",
      metricLabel: t("testimonials.responseTime")
    }
  ];

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[index];

  // Framer Motion Slide Variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      filter: "blur(5px)"
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring", stiffness: 120, damping: 18 },
        opacity: { duration: 0.4 },
        filter: { duration: 0.3 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      filter: "blur(5px)",
      transition: {
        x: { type: "spring", stiffness: 120, damping: 18 },
        opacity: { duration: 0.3 },
        filter: { duration: 0.2 }
      }
    })
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-6 md:px-8 relative select-none">
      
      {/* Immersive ambient glowing backlight representing creative atmosphere */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-orange-500/5 blur-[100px] pointer-events-none" />

      {/* Testimonial Frosted Dark Card Frame */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-950/20 backdrop-blur-xl p-8 md:p-14 flex flex-col justify-between items-center text-center gap-10 min-h-[380px] md:min-h-[400px]">
        
        {/* Large Aesthetic Quote Icon */}
        <div className="text-orange-500/10 dark:text-orange-500/20 p-4 rounded-full bg-orange-500/5 border border-orange-500/5 relative select-none">
          <Quote className="h-10 w-10 rotate-180" />
        </div>

        {/* Text Area with fluid spring slide transitions */}
        <div className="relative flex-1 flex flex-col justify-center items-center max-w-3xl overflow-hidden min-h-[140px] md:min-h-[160px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-6 flex flex-col items-center"
            >
              {/* Actual Quote Statement */}
              <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed tracking-tight text-zinc-900 dark:text-white max-w-2xl px-2">
                “{current.quote}”
              </blockquote>

              {/* Author & Info Block */}
              <cite className="not-italic flex flex-col items-center gap-1">
                <span className="text-sm font-black tracking-tight text-zinc-800 dark:text-white">
                  {current.author}
                </span>
                <span className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <span>{current.role}</span>
                  <span className="h-1 w-1 rounded-full bg-orange-500" />
                  <span className="text-orange-500">{current.company}</span>
                </span>
              </cite>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Lower Controls: Left/Right arrows & Navigation Dots */}
        <div className="w-full flex items-center justify-between border-t border-zinc-150 dark:border-white/5 pt-8 mt-4 select-none">
          
          {/* Key Metric Label Tag */}
          <div className="hidden md:flex items-center gap-3 text-left">
            <span className="font-serif text-2xl font-black bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent leading-none">
              {current.metric}
            </span>
            <div className="h-6 w-px bg-zinc-200 dark:bg-white/10" />
            <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest max-w-[120px] leading-tight">
              {current.metricLabel}
            </span>
          </div>

          {/* Dots Indicator */}
          <div className="flex gap-2 mx-auto md:mx-0 select-none">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > index ? 1 : -1);
                  setIndex(idx);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === idx 
                    ? "w-7 bg-orange-500" 
                    : "w-2.5 bg-zinc-200 dark:bg-white/10 hover:bg-zinc-300 dark:hover:bg-white/20"
                }`}
              />
            ))}
          </div>

          {/* Slide Arrow Triggers */}
          <div className="flex gap-2 select-none">
            <button 
              onClick={handlePrev}
              className="h-10 w-10 rounded-full border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-black/25 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-all duration-300 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={handleNext}
              className="h-10 w-10 rounded-full border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-black/25 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-all duration-300 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}
