"use client";

import { ArrowRight } from "lucide-react";
import { useState, useEffect, Suspense, lazy } from "react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/language-context";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

export function CTASection({ onScrollClick }: { onScrollClick?: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  const handleScroll = () => {
    if (onScrollClick) {
      onScrollClick();
    } else {
      const nextSection = document.getElementById("projects-section");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="flex w-full min-h-screen items-center justify-center overflow-hidden">
      <div
        className="relative w-full min-h-screen flex flex-col items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden duration-500">
          <Suspense fallback={<div className="absolute inset-0" />}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: theme === "dark" ? 0.6 : 0.9 }}
              transition={{ duration: 1.3, ease: "easeOut" }}
              className={`pointer-events-none absolute inset-0 z-0 ${theme === "dark" ? "mix-blend-screen" : ""}`}
            >
              <Dithering
                colorBack={theme === "light" ? "#fff8f1" : "#0d0d0d"}
                colorFront={theme === "light" ? "#dc885f" : "#EC4E02"}
                shape="warp"
                type="4x4"
                speed={isHovered ? 0.6 : 0.2}
                className="size-full"
                minPixelRatio={1}
              />
            </motion.div>
          </Suspense>

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">

            <motion.h2
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-8 font-serif text-5xl font-medium leading-[1.05] tracking-tight dark:text-white md:text-7xl lg:text-8xl"
            >
              {t("hero.beyondComplexity")} <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="dark:text-white/80 text-black/80"
              >
                {t("hero.towardPotential")}
              </motion.span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
              className="mb-12 max-w-2xl text-lg leading-relaxed dark:text-white/60 text-black/60 md:text-xl"
            >
              {t("hero.description")}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScroll}
              className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full dark:bg-white bg-black/90 px-12 text-base font-medium dark:text-black text-white transition-colors duration-300 backdrop-blur-md hover:bg-black/80 dark:hover:bg-white/90 hover:ring-4 dark:hover:ring-white/20 hover:ring-black/20 cursor-pointer"
            >
              <span className="relative z-10">{t("hero.getStarted")}</span>
              <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
