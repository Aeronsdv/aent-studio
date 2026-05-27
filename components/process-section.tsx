"use client";

import * as React from "react";
import { motion } from "motion/react";
import { 
  Search, 
  PenTool, 
  Code2, 
  Rocket, 
  RefreshCw,
  Sparkles
} from "lucide-react";
import { useLanguage } from "@/context/language-context";

interface ProcessStep {
  number: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  glowClass: string;
  iconColor: string;
  titleColor: string;
}

export function ProcessSection() {
  const { t } = useLanguage();

  const STEPS: ProcessStep[] = [
    {
      number: "01",
      title: t("process.steps.01.title"),
      desc: t("process.steps.01.desc"),
      icon: <Search className="h-6 w-6" />,
      glowClass: "group-hover:bg-amber-400/10 group-hover:shadow-amber-400/5 dark:group-hover:shadow-amber-400/2",
      iconColor: "text-amber-400 dark:text-amber-300",
      titleColor: "group-hover:text-amber-500 dark:group-hover:text-amber-400"
    },
    {
      number: "02",
      title: t("process.steps.02.title"),
      desc: t("process.steps.02.desc"),
      icon: <PenTool className="h-6 w-6" />,
      glowClass: "group-hover:bg-orange-400/10 group-hover:shadow-orange-400/5 dark:group-hover:shadow-orange-400/2",
      iconColor: "text-orange-400 dark:text-orange-300",
      titleColor: "group-hover:text-orange-500 dark:group-hover:text-orange-400"
    },
    {
      number: "03",
      title: t("process.steps.03.title"),
      desc: t("process.steps.03.desc"),
      icon: <Code2 className="h-6 w-6" />,
      glowClass: "group-hover:bg-orange-500/10 group-hover:shadow-orange-500/5 dark:group-hover:shadow-orange-500/2",
      iconColor: "text-orange-500",
      titleColor: "group-hover:text-orange-600 dark:group-hover:text-orange-500"
    },
    {
      number: "04",
      title: t("process.steps.04.title"),
      desc: t("process.steps.04.desc"),
      icon: <Rocket className="h-6 w-6" />,
      glowClass: "group-hover:bg-orange-600/10 group-hover:shadow-orange-600/5 dark:group-hover:shadow-orange-600/2",
      iconColor: "text-orange-600",
      titleColor: "group-hover:text-orange-700 dark:group-hover:text-orange-600"
    },
    {
      number: "05",
      title: t("process.steps.05.title"),
      desc: t("process.steps.05.desc"),
      icon: <RefreshCw className="h-6 w-6" />,
      glowClass: "group-hover:bg-orange-700/10 group-hover:shadow-orange-700/5 dark:group-hover:shadow-orange-700/2",
      iconColor: "text-orange-700 dark:text-orange-600",
      titleColor: "group-hover:text-orange-800 dark:group-hover:text-orange-600"
    }
  ];

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
          {t("process.title")}<br />
          <span className="dark:text-white/80 text-black/80 font-light">{t("process.subheading")}</span>
        </motion.h2>
      </div>

      {/* 5-Step Process Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 items-stretch relative">
        {/* Subtle connector dashed line behind cards in desktop layout */}
        <div className="hidden lg:block absolute top-1/2 left-6 right-6 h-0.5 border-t border-dashed border-zinc-200 dark:border-white/5 -translate-y-12 z-0" />

        {STEPS.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-950/40 backdrop-blur-xl p-6 md:p-8 transition-all duration-500 hover:border-zinc-300 dark:hover:border-white/10 hover:shadow-2xl z-10"
          >
            {/* Glowing Accent Shadow behind card on hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none -z-10 ${step.glowClass}`} />

            {/* Upper Section: Number and Icon */}
            <div className="space-y-6">
              <div className="flex justify-between items-center select-none">
                <span className="font-mono text-3xl font-black opacity-10 dark:opacity-20 text-zinc-900 dark:text-white group-hover:opacity-50 transition-opacity duration-300">
                  {step.number}
                </span>
                
                {/* Icon wrapper with subtle rotation transition */}
                <div className={`p-3 rounded-2xl bg-white dark:bg-zinc-900 shadow-md border border-zinc-150 dark:border-white/5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${step.iconColor}`}>
                  {step.icon}
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h4 className={`text-lg font-bold text-zinc-800 dark:text-white transition-colors duration-300 ${step.titleColor}`}>
                  {step.title}
                </h4>
                <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                  {step.desc}
                </p>
              </div>
            </div>

            {/* Bottom Accent Indicator Bar */}
            <div className="h-1 w-full bg-zinc-200/50 dark:bg-white/5 rounded-full overflow-hidden mt-8">
              <motion.div 
                className={`h-full bg-current ${step.iconColor}`}
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.15 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
