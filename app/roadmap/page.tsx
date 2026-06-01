"use client"
import * as React from "react"
import { Moon, Sun, Languages, Sparkles, Route, Calendar, ArrowUpDown } from "lucide-react"
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

interface RoadmapItem {
  id: string
  title: string
  titleTr: string
  description: string
  descriptionTr: string
  quarter: string
  quarterTr: string
  targetDate: string
  status: "PLANNED" | "IN_PROGRESS" | "COMPLETED"
  bgGradient: string
  glowColor: string
}

type FilterStatus = "ALL" | "PLANNED" | "IN_PROGRESS" | "COMPLETED"
type SortOrder = "ASC" | "DESC"

export default function RoadmapPage() {
  const { setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [isContactOpen, setIsContactOpen] = React.useState(false)
  const [items, setItems] = React.useState<RoadmapItem[]>([])
  const [loading, setLoading] = React.useState(true)

  // Filter & Sort state
  const [statusFilter, setStatusFilter] = React.useState<FilterStatus>("ALL")
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("ASC")

  // Fetch roadmap milestones
  React.useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await fetch("/api/roadmap")
        const data = await res.json()
        if (res.ok && data.success) {
          setItems(data.data)
        }
      } catch (error) {
        console.error("Failed to load public roadmap milestones:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchRoadmap()
  }, [])

  // Process items: filter and then sort chronologically
  const processedItems = React.useMemo(() => {
    let result = [...items]
    
    // Filter
    if (statusFilter !== "ALL") {
      result = result.filter(item => item.status === statusFilter)
    }

    // Sort
    result.sort((a, b) => {
      const timeA = new Date(a.targetDate).getTime()
      const timeB = new Date(b.targetDate).getTime()
      return sortOrder === "ASC" ? timeA - timeB : timeB - timeA
    })

    return result
  }, [items, statusFilter, sortOrder])

  // Helper to render status badge
  const renderStatusBadge = (statusName: string) => {
    switch (statusName) {
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full select-none">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {language === "tr" ? "Tamamlandı" : "Completed"}
          </span>
        )
      case "IN_PROGRESS":
        return (
          <span className="inline-flex items-center gap-1 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full select-none">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            {language === "tr" ? "Devam Ediyor" : "In Progress"}
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-550 dark:text-zinc-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full select-none border border-zinc-200 dark:border-zinc-700">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
            {language === "tr" ? "Planlandı" : "Planned"}
          </span>
        )
    }
  }

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
        <section className="mx-auto w-full max-w-7xl px-6 md:px-8 mb-16 text-center md:text-left flex flex-col md:flex-row items-center md:items-end justify-between gap-8 select-none">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl font-semibold  text-zinc-900 dark:text-white md:text-5xl lg:text-7xl">
              <span className="font-serif tracking-tight leading-tight">{language === "tr" ? "Yol Haritamız." : "Our Roadmap."}<br /></span>
              <span className="dark:text-white/60 text-black/60  text-base md:text-xl block mt-2">
                {language === "tr" ? "Adım adım yüksek teknolojili hedeflerimiz." : "Chronological release sprints and sprint milestones."}
              </span>
            </h1>
          </div>
        </section>

        {/* Filter & Sort Interactive Controls Dock */}
        <section className="mx-auto w-full max-w-7xl px-6 md:px-8 mb-16 select-none z-20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2.5 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-black/45 backdrop-blur-md shadow-lg">
            
            {/* Status Filter Tabs */}
            <div className="flex flex-wrap gap-1 w-full sm:w-auto justify-center">
              {([
                { id: "ALL", label: language === "tr" ? "Tümü" : "All" },
                { id: "COMPLETED", label: language === "tr" ? "Tamamlananlar" : "Completed" },
                { id: "IN_PROGRESS", label: language === "tr" ? "Devam Edenler" : "In Progress" },
                { id: "PLANNED", label: language === "tr" ? "Planlananlar" : "Planned" }
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-semibold capitalize transition-all duration-300 cursor-pointer ${
                    statusFilter === tab.id 
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-black shadow-sm" 
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sort Chronology Toggle (Chronologically "move forward/backward") */}
            <button
              onClick={() => setSortOrder(prev => prev === "ASC" ? "DESC" : "ASC")}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl dark:bg-[#92370b] bg-[#dc885f] dark:text-white/90 text-white text-xs font-semibold cursor-pointer dark:text-zinc-300 hover:scale-105 active:scale-95 active:rounded-3xl transition-all duration-200 w-full sm:w-auto justify-center"
            >
              <ArrowUpDown className="h-4 w-4 dark:text-white/90 text-white" />
              <span>
                {sortOrder === "ASC" 
                  ? (language === "tr" ? "Sıralama: Kronolojik (Eski -> Yeni)" : "Sorting: Chronological (Old -> New)")
                  : (language === "tr" ? "Sıralama: Ters Kronolojik (Yeni -> Eski)" : "Sorting: Reverse Chronological (New -> Old)")}
              </span>
            </button>

          </div>
        </section>

        {/* Timeline Path Showcase */}
        <section className="mx-auto w-full max-w-7xl px-6 md:px-8 mb-32 relative">
          
          {loading ? (
            <div className="w-full min-h-[300px] flex flex-col justify-center items-center">
              <svg className="animate-spin h-9 w-9 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 mt-4 animate-pulse uppercase">
                {language === "tr" ? "Yol Haritası Güncelleniyor..." : "Syncing Sprints Timeline..."}
              </span>
            </div>
          ) : processedItems.length === 0 ? (
            <div className="w-full min-h-[250px] rounded-3xl border border-dashed border-zinc-200 dark:border-white/5 flex flex-col justify-center items-center text-center p-8 select-none">
              <Route className="h-10 w-10 text-zinc-450 dark:text-zinc-555 stroke-1 mb-3" />
              <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">
                {language === "tr" ? "Aranan Kriterde Adım Bulunamadı" : "No Milestones Match Filters"}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 max-w-sm mt-1">
                {language === "tr" 
                  ? "Seçtiğiniz filtreye uygun herhangi bir yol haritası dönüm noktası bulunmuyor." 
                  : "Try choosing another status filter to display milestone sprint items."}
              </p>
            </div>
          ) : (
            <div className="relative w-full overflow-hidden flex flex-col items-center py-4">
              
              {/* Vertical Timeline center line - Desktop */}
              <div className="absolute top-0 bottom-0 left-[21px] md:left-1/2 w-[2px] bg-zinc-200/80 dark:bg-zinc-800/80 -translate-x-1/2" />

              {/* Milestones dynamic list */}
              <div className="w-full space-y-12 md:space-y-16 relative">
                {processedItems.map((item, index) => {
                  // Alternating sides on desktop, left aligned on mobile
                  const isLeft = index % 2 === 0
                  const displayTitle = language === "tr" ? item.titleTr : item.title
                  const displayQuarter = language === "tr" ? item.quarterTr : item.quarter
                  const displayDesc = language === "tr" ? item.descriptionTr : item.description

                  return (
                    <div 
                      key={item.id}
                      className={`relative flex flex-col md:flex-row w-full ${
                        isLeft ? "md:justify-start" : "md:justify-end"
                      }`}
                    >
                      {/* Timeline pulses on line */}
                      {/* On Mobile: left-aligned at left-[21px] */}
                      {/* On Desktop: centered at left-1/2 */}
                      <div className="absolute left-[21px] md:left-1/2 top-7 md:top-8 h-10 w-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
                        {/* Outer Pulse ring */}
                        <span 
                          className="absolute inline-flex h-7 w-7 rounded-full opacity-75 animate-ping" 
                          style={{ backgroundColor: item.glowColor }}
                        />
                        {/* Inner Swatch */}
                        <div 
                          className={`h-4.5 w-4.5 rounded-full bg-gradient-to-r ${item.bgGradient} border border-white dark:border-zinc-950 shadow-md`}
                          style={{ boxShadow: `0 0 10px ${item.glowColor}` }}
                        />
                      </div>

                      {/* Content Card container */}
                      <motion.div
                        initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 15 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6 }}
                        className={`w-full md:w-[calc(50%-32px)] pl-12 md:pl-0 ${
                          isLeft ? "md:pr-8" : "md:pl-8"
                        }`}
                      >
                        <div 
                          className="group relative p-6 md:p-8 rounded-[28px] border border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-zinc-950/20 backdrop-blur-xl transition-all duration-500 hover:border-zinc-300 dark:hover:border-white/10 hover:shadow-2xl overflow-hidden"

                        >
                          {/* Glowing backdrop aura */}
                          <div 
                            className="absolute -right-16 -top-16 w-60 h-60 rounded-full blur-[80px] pointer-events-none opacity-20 group-hover:scale-110 transition-all duration-500" 
                            style={{ backgroundColor: item.glowColor }}
                          />

                          {/* Top row: Quarter badge & status */}
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 select-none">
                            <span className="text-xs font-mono font-black text-orange-500 uppercase tracking-widest">
                              {displayQuarter}
                            </span>
                            {renderStatusBadge(item.status)}
                          </div>

                          {/* Milestone Title */}
                          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2 leading-tight">
                            {displayTitle}
                          </h3>

                          {/* Milestone Description */}
                          <p className="text-xs md:text-sm text-zinc-650 dark:text-zinc-400 font-medium leading-relaxed">
                            {displayDesc}
                          </p>

                          {/* Decorative sprint node stats in card footer */}
                          <div className="flex items-center gap-2 mt-5 pt-4 border-t border-zinc-100 dark:border-white/5 text-[9px] font-mono font-bold text-zinc-400 dark:text-zinc-550 select-none">
                            <Calendar className="h-3.5 w-3.5 text-orange-500" />
                            <span>{new Date(item.targetDate).toLocaleDateString(language === "tr" ? "tr-TR" : "en-US", { year: "numeric", month: "long" })}</span>
                          </div>

                        </div>
                      </motion.div>

                    </div>
                  )
                })}
              </div>

            </div>
          )}
        </section>
      </main>

      <MinimalFooter />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  )
}
