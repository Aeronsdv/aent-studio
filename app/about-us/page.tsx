"use client"

import * as React from "react"
import { Moon, Sun, Languages, Sparkles, Cpu, MessageSquare, Calendar, Compass, Shield } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import NavbarMenuFull from "@/components/navbar-menu-full"
import { MinimalFooter } from "@/components/ui/minimal-footer"
import { ContactModal } from "@/components/contact-modal"
import { motion } from "motion/react"

export default function AboutUsPage() {
  const { setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [isContactOpen, setIsContactOpen] = React.useState(false)

  // Core pillars or principles
  const principles = [
    {
      icon: <Cpu className="h-6 w-6 text-orange-500" />,
      titleKey: "aboutPage.value1Title",
      descKey: "aboutPage.value1Desc",
      glowColor: "rgba(249, 115, 22, 0.15)",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-amber-500" />,
      titleKey: "aboutPage.value2Title",
      descKey: "aboutPage.value2Desc",
      glowColor: "rgba(245, 158, 11, 0.15)",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-orange-600" />,
      titleKey: "aboutPage.value3Title",
      descKey: "aboutPage.value3Desc",
      glowColor: "rgba(234, 88, 12, 0.15)",
    },
  ]

  // Journey steps
  const journeySteps = [
    {
      icon: <Compass className="h-4 w-4 text-orange-500" />,
      titleKey: "aboutPage.storyStep1Title",
      descKey: "aboutPage.storyStep1Desc",
      time: "2024",
      bgGradient: "from-orange-500 to-amber-500",
      glowColor: "rgba(249, 115, 22, 0.4)",
    },
    {
      icon: <Shield className="h-4 w-4 text-amber-500" />,
      titleKey: "aboutPage.storyStep2Title",
      descKey: "aboutPage.storyStep2Desc",
      time: "2025",
      bgGradient: "from-amber-500 to-orange-600",
      glowColor: "rgba(245, 158, 11, 0.4)",
    },
    {
      icon: <Sparkles className="h-4 w-4 text-orange-600" />,
      titleKey: "aboutPage.storyStep3Title",
      descKey: "aboutPage.storyStep3Desc",
      time: "2026",
      bgGradient: "from-orange-600 to-red-500",
      glowColor: "rgba(234, 88, 12, 0.4)",
    },
  ]

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground transition-colors duration-300 overflow-x-hidden selection:bg-orange-500/20 selection:text-orange-500">
      
      {/* Decorative Shifting Glowing Backdrop Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-500/[0.04] dark:bg-orange-500/5 blur-[120px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: "12s" }} />
      <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/[0.04] dark:bg-blue-500/5 blur-[120px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: "16s" }} />

      {/* Modern Grid Overlay Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10" />

      {/* Floating Navbar */}
      <div className="fixed top-4 left-0 right-0 z-50 w-full px-4 flex justify-center">
        <div className="w-full max-w-4xl flex items-center gap-2">
          {/* Language Switcher Button */}
          <div className="hidden md:flex h-14 flex items-center justify-center border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 rounded-3xl px-2.5 backdrop-blur-md">
            <Button 
              variant="ghost" 
              onClick={() => setLanguage(language === "en" ? "tr" : "en")}
              className="rounded-xl h-9 px-3 hover:dark:bg-[#92370b] hover:bg-[#dc885f] dark:text-white/90 text-black/90 hover:text-white focus:ring-0 focus-visible:ring-0 font-mono text-xs font-bold transition-all duration-300 flex items-center gap-1 select-none cursor-pointer"
            >
              <Languages className="h-3.5 w-3.5 mr-1" />
              <span>{language === "en" ? "TR" : "EN"}</span>
            </Button>
          </div>

          <div className="flex-1">
            <NavbarMenuFull onContactClick={() => setIsContactOpen(true)} />
          </div>

          {/* Theme Switcher Button */}
          <div className="hidden md:flex h-14 flex items-center justify-center border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 rounded-3xl px-2.5 backdrop-blur-md">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9 hover:dark:bg-[#92370b] hover:bg-[#dc885f] dark:text-white/90 text-black/90 hover:text-white focus:ring-0 focus-visible:ring-0 cursor-pointer">
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={15} alignOffset={-8} className="dark:bg-black/50 bg-white/50 dark:border-white/10 border-black/10 backdrop-blur-md rounded-3xl p-2">
                <DropdownMenuItem onClick={() => setTheme("light")} className="dark:hover:bg-white/5 hover:bg-black/5 transition-all rounded-xl px-2.5 cursor-pointer">
                  {language === "tr" ? "Açık" : "Light"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="dark:hover:bg-white/5 hover:bg-black/5 transition-all rounded-xl px-2.5 cursor-pointer">
                  {language === "tr" ? "Karanlık" : "Dark"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className="dark:hover:bg-white/5 hover:bg-black/5 transition-all rounded-xl px-2.5 cursor-pointer">
                  {language === "tr" ? "Sistem" : "System"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <main className="w-full flex flex-col pt-36 md:pt-44">
        {/* Header Hero Section */}
        <section className="mx-auto w-full max-w-7xl px-6 md:px-8 mb-20 text-center md:text-left select-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-3xl"
          >
            <h1 className="text-4xl font-semibold text-zinc-900 dark:text-white md:text-5xl lg:text-7xl">
              <span className="font-serif tracking-tight leading-tight">{t("aboutPage.title")}<br /></span>
              <span className="dark:text-white/60 text-black/60 text-base md:text-xl block mt-3 font-normal leading-relaxed max-w-2xl">
                {t("aboutPage.subtitle")}
              </span>
            </h1>
          </motion.div>
        </section>

        {/* Philosophy / Mission & Vision Section */}
        <section className="mx-auto w-full max-w-7xl px-6 md:px-8 mb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="group relative p-8 md:p-10 rounded-[32px] border border-zinc-200 dark:border-white/5 bg-white/70 dark:bg-zinc-950/20 backdrop-blur-xl transition-all duration-300 hover:border-zinc-300 dark:hover:border-white/10 hover:shadow-xl overflow-hidden"
            >
              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-orange-500/10 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
              
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  >
                    <Compass className="h-6 w-6" />
                  </motion.div>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {t("aboutPage.missionTitle")}
                </h3>
              </div>

              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                {t("aboutPage.missionDesc")}
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="group relative p-8 md:p-10 rounded-[32px] border border-zinc-200 dark:border-white/5 bg-white/70 dark:bg-zinc-950/20 backdrop-blur-xl transition-all duration-300 hover:border-zinc-300 dark:hover:border-white/10 hover:shadow-xl overflow-hidden"
            >
              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
              
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
                  <Sparkles className="h-6 w-6 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {t("aboutPage.visionTitle")}
                </h3>
              </div>

              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                {t("aboutPage.visionDesc")}
              </p>
            </motion.div>

          </div>
        </section>

        {/* Core Principles Grid */}
        <section className="mx-auto w-full max-w-7xl px-6 md:px-8 mb-32 relative">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl font-bold font-serif tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              {t("aboutPage.valuesTitle")}
            </h2>
            <div className="h-1 w-12 bg-orange-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative p-8 rounded-[28px] border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-zinc-950/10 backdrop-blur-xl transition-all duration-300 hover:border-zinc-300 dark:hover:border-white/10 hover:shadow-2xl overflow-hidden"
              >
                {/* Backlight Glow Aura */}
                <div 
                  className="absolute -right-16 -top-16 w-44 h-44 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                  style={{ backgroundColor: item.glowColor }}
                />

                {/* Icon wrapper */}
                <div className="mb-6 p-4 w-fit rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                  {t(item.titleKey)}
                </h3>

                <p className="text-xs md:text-sm text-zinc-550 dark:text-zinc-400 font-medium leading-relaxed">
                  {t(item.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Studio Journey Timeline */}
        <section className="mx-auto w-full max-w-7xl px-6 md:px-8 mb-36 relative">
          
          <div className="text-center mb-20 space-y-3">
            <h2 className="text-3xl font-bold font-serif tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              {t("aboutPage.storyTitle")}
            </h2>
            <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-450 uppercase tracking-widest font-mono font-bold">
              {t("aboutPage.storySubtitle")}
            </p>
          </div>

          <div className="relative w-full overflow-hidden flex flex-col items-center py-4">
            {/* Vertical timeline line */}
            <div className="absolute top-0 bottom-0 left-[21px] md:left-1/2 w-[2px] bg-zinc-200/80 dark:bg-zinc-800/80 -translate-x-1/2" />

            <div className="w-full space-y-12 relative">
              {journeySteps.map((step, idx) => {
                const isLeft = idx % 2 === 0
                return (
                  <div key={idx} className={`relative flex flex-col md:flex-row w-full ${isLeft ? "md:justify-start" : "md:justify-end"}`}>
                    
                    {/* Timeline node */}
                    <div className="absolute left-[21px] md:left-1/2 top-7 md:top-8 h-10 w-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
                      <span className="absolute inline-flex h-7 w-7 rounded-full opacity-75 animate-ping" style={{ backgroundColor: step.glowColor }} />
                      <div 
                        className={`h-4.5 w-4.5 rounded-full bg-gradient-to-r ${step.bgGradient} border border-white dark:border-zinc-950 shadow-md`}
                        style={{ boxShadow: `0 0 10px ${step.glowColor}` }}
                      />
                    </div>

                    {/* Timeline card */}
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className={`w-full md:w-[calc(50%-32px)] pl-12 md:pl-0 ${isLeft ? "md:pr-8" : "md:pl-8"}`}
                    >
                      <div className="group relative p-6 md:p-8 rounded-[28px] border border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-zinc-950/20 backdrop-blur-xl transition-all duration-300 hover:border-zinc-300 dark:hover:border-white/10 hover:shadow-2xl overflow-hidden">
                        
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <span className="text-xs font-mono font-black text-orange-500 uppercase tracking-widest">
                            {step.time}
                          </span>
                          <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5">
                            {step.icon}
                          </div>
                        </div>

                        <h3 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2 leading-tight">
                          {t(step.titleKey)}
                        </h3>

                        <p className="text-xs md:text-sm text-zinc-650 dark:text-zinc-400 font-medium leading-relaxed">
                          {t(step.descKey)}
                        </p>

                      </div>
                    </motion.div>

                  </div>
                )
              })}
            </div>
          </div>

        </section>

      </main>

      <MinimalFooter />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  )
}
