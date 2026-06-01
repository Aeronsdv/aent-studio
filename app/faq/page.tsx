"use client"

import * as React from "react"
import { 
  Moon, 
  Sun, 
  Languages, 
  Search, 
  X, 
  HelpCircle, 
  ArrowRight, 
  MessageSquare, 
  Sparkles,
  Layers,
  Cpu,
  Compass,
  Shield
} from "lucide-react"
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
import { motion, AnimatePresence } from "motion/react"
import { tr } from "@/locales/tr"
import { en } from "@/locales/en"

const dicts = { tr, en }

export default function FAQPage() {
  const { setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [isContactOpen, setIsContactOpen] = React.useState(false)
  const [activeCategory, setActiveCategory] = React.useState<string>("all")
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [openQuestion, setOpenQuestion] = React.useState<string | null>(null)

  const currentDict = dicts[language] || en
  const faqItems = currentDict.faqPage.items

  // Category items with matching Lucide icons
  const categories = [
    { id: "all", labelKey: "faqPage.categories.all", icon: <HelpCircle className="h-3.5 w-3.5" /> },
    { id: "general", labelKey: "faqPage.categories.general", icon: <Layers className="h-3.5 w-3.5" /> },
    { id: "process", labelKey: "faqPage.categories.process", icon: <Cpu className="h-3.5 w-3.5" /> },
    { id: "budget", labelKey: "faqPage.categories.budget", icon: <Compass className="h-3.5 w-3.5" /> },
    { id: "support", labelKey: "faqPage.categories.support", icon: <Shield className="h-3.5 w-3.5" /> },
  ]

  // Filter items based on category and search query
  const filteredItems = React.useMemo(() => {
    return faqItems.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [faqItems, activeCategory, searchQuery])

  // Clear query
  const handleClearSearch = () => {
    setSearchQuery("")
  }

  // Toggle single FAQ item
  const handleToggle = (question: string) => {
    setOpenQuestion((prev) => (prev === question ? null : question))
  }

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground transition-colors duration-300 overflow-x-hidden selection:bg-orange-500/20 selection:text-orange-500">
      
      {/* Decorative Floating Shifting Glowing Backdrop Blobs */}
      <motion.div 
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-500/[0.04] dark:bg-orange-500/5 blur-[120px] pointer-events-none -z-10"
      />
      <motion.div 
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.9, 1.08, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[15%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/[0.04] dark:bg-blue-500/5 blur-[120px] pointer-events-none -z-10"
      />

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
        <section className="mx-auto w-full max-w-4xl px-6 md:px-8 mb-12 text-center select-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-semibold text-zinc-900 dark:text-white md:text-5xl lg:text-6xl font-serif tracking-tight leading-tight">
              {language === "tr" ? (
                <>
                  Sıkça Sorulan <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-amber-500 to-orange-650 dark:from-orange-400 dark:via-amber-500 dark:to-orange-500 font-serif">Sorular.</span>
                </>
              ) : (
                <>
                  Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-amber-500 to-orange-650 dark:from-orange-400 dark:via-amber-500 dark:to-orange-500 font-serif">Questions.</span>
                </>
              )}
            </h1>
            <p className="dark:text-white/60 text-black/60 text-base md:text-lg max-w-xl mx-auto font-normal leading-relaxed">
              {t("faqPage.subtitle")}
            </p>
          </motion.div>
        </section>

        {/* Search & Category Filter Section */}
        <section className="mx-auto w-full max-w-3xl px-6 md:px-8 mb-12">
          <div className="flex flex-col gap-8">
            
            {/* Real-time Search Input Box */}
            <div className="w-full">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative group w-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />
                <div className="relative flex items-center bg-white/60 dark:bg-zinc-950/20 backdrop-blur-xl border border-zinc-200 dark:border-white/5 rounded-2xl px-4 py-3.5 transition-all duration-300 focus-within:border-orange-500/40 dark:focus-within:border-orange-500/30">
                  <Search className="h-5 w-5 text-zinc-400 dark:text-zinc-500 mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("faqPage.searchPlaceholder")}
                    className="w-full bg-transparent border-0 outline-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 text-sm md:text-base focus:ring-0 focus-visible:ring-0 focus:outline-none"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleClearSearch}
                      className="h-8 w-8 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Categories Tabs with Solid Orange Active Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-2"
            >
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id)
                      setOpenQuestion(null)
                    }}
                    className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-[16px] transition-all duration-300 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 flex items-center gap-1.5 ${
                      isActive 
                        ? "bg-orange-500 text-white shadow-md shadow-orange-500/25 scale-[1.02]" 
                        : "bg-zinc-100/80 hover:bg-zinc-200/80 dark:bg-white/5 dark:hover:bg-white/10 text-zinc-650 dark:text-zinc-450 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className={`transition-transform duration-300 ${isActive ? "scale-110 rotate-3" : "opacity-80"}`}>
                        {cat.icon}
                      </span>
                      <span>{t(cat.labelKey)}</span>
                    </span>
                  </button>
                )
              })}
            </motion.div>

          </div>
        </section>

        {/* Frameless minimalist FAQ list */}
        <section className="mx-auto w-full max-w-3xl px-6 md:px-8 mb-24 min-h-[300px]">
          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="divide-y divide-zinc-200/60 dark:divide-white/5 border-t border-b border-zinc-200/60 dark:border-white/5"
              >
                {filteredItems.map((item, idx) => {
                  const isOpen = openQuestion === item.question
                  return (
                    <motion.div
                      key={item.question}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="group relative transition-all duration-300"
                    >
                      <button
                        onClick={() => handleToggle(item.question)}
                        className="w-full flex items-start justify-between gap-4 py-6 md:py-7 text-left select-none focus:outline-none cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <div className="space-y-2">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase rounded bg-zinc-100 dark:bg-white/5 text-zinc-550 dark:text-zinc-400">
                            {categories.find(c => c.id === item.category)?.icon}
                            <span>{t(`faqPage.categories.${item.category}`)}</span>
                          </span>
                          <h3 className="text-base md:text-lg font-bold text-zinc-900 dark:text-white group-hover:text-orange-500 transition-colors duration-200 leading-snug pr-4">
                            {item.question}
                          </h3>
                        </div>

                        {/* Premium Plus-to-Minus morphing icon */}
                        <div className="relative w-5 h-5 mt-1.5 flex items-center justify-center flex-shrink-0">
                          <motion.span 
                            className="absolute w-4.5 h-0.5 bg-zinc-500 dark:bg-zinc-400 group-hover:bg-orange-500 rounded-full" 
                            animate={{ rotate: isOpen ? 90 : 0 }} 
                            transition={{ duration: 0.25 }}
                          />
                          <motion.span 
                            className="absolute h-4.5 w-0.5 bg-zinc-500 dark:bg-zinc-400 group-hover:bg-orange-500 rounded-full"
                            animate={{ rotate: isOpen ? 90 : 0, scaleY: isOpen ? 0 : 1 }} 
                            transition={{ duration: 0.25 }}
                          />
                        </div>
                      </button>

                      {/* Expandable Editorial Styled Answer Content Panel */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pb-6 md:pb-7 pt-0">
                              <div className="flex gap-4 pt-1 pb-1">
                                {/* Left dynamic gradient bar inside answer */}
                                <div className="w-[3px] bg-gradient-to-b from-orange-500 to-amber-500 rounded-full opacity-60 flex-shrink-0" />
                                <p className="text-sm md:text-base text-zinc-650 dark:text-zinc-400 font-medium leading-relaxed">
                                  {item.answer}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </motion.div>
            ) : (
              // Empty State Block
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center text-center p-12 bg-white/40 dark:bg-zinc-950/10 border border-zinc-200/60 dark:border-white/5 rounded-[32px] backdrop-blur-xl"
              >
                <div className="p-4 rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-450 dark:text-zinc-500 mb-4 border border-zinc-200/50 dark:border-white/5 animate-pulse">
                  <HelpCircle className="h-8 w-8 text-orange-500/80" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                  {t("faqPage.noResults")}
                </h3>
                <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-450 max-w-sm leading-relaxed mb-4">
                  {t("faqPage.noResultsSub")}
                </p>
                {searchQuery && (
                  <Button
                    onClick={handleClearSearch}
                    className="rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs px-5 py-2 cursor-pointer transition-all duration-300 shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 border-0 focus:ring-0 active:scale-98"
                  >
                    {language === "tr" ? "Aramayı Temizle" : "Clear Search"}
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Dynamic CTA Support Banner */}
        <section className="mx-auto w-full max-w-4xl px-6 md:px-8 mb-28">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-8 md:p-12 rounded-[36px] border border-zinc-200 dark:border-white/5 bg-gradient-to-br from-zinc-50/80 to-white/80 dark:from-zinc-950/40 dark:to-zinc-900/20 backdrop-blur-xl transition-all duration-300 hover:border-zinc-355 dark:hover:border-white/10 hover:shadow-2xl overflow-hidden"
          >
            {/* Absolute vector details */}
            <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 w-64 h-64 bg-orange-500/10 dark:bg-orange-500/5 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: "10s" }} />
            <div className="absolute left-0 bottom-0 translate-y-12 -translate-x-12 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/5 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: "14s" }} />
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left max-w-xl">
                <div className="inline-flex p-3 rounded-2xl bg-orange-500/10 text-orange-500 border border-orange-500/10 shadow-inner">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white font-serif">
                  {t("faqPage.ctaTitle")}
                </h2>
                <p className="text-xs md:text-sm text-zinc-550 dark:text-zinc-400 font-medium leading-relaxed">
                  {t("faqPage.ctaDesc")}
                </p>
              </div>

              <div className="flex-shrink-0">
                <Button
                  onClick={() => setIsContactOpen(true)}
                  className="group rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-sm px-6 h-12 flex items-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 border-0 transition-all duration-300 active:scale-98"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>{t("finalCta.contactUs")}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-250" />
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

      </main>

      <MinimalFooter />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  )
}
