"use client"
import * as React from "react"
import { Moon, Sun, Languages, ArrowUpRight, Github, ExternalLink, Sparkles, Folder, Globe, Laptop, ArrowRight } from "lucide-react"
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

interface Project {
  id: string
  title: string
  titleTr: string
  slug: string
  category: string
  categoryTr: string
  desc: string
  descTr: string
  coverImage: string | null
  bgGradient: string
  glowColor: string
  demoUrl: string | null
  githubUrl: string | null
  published: boolean
}

export default function ProductsPage() {
  const { setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [isContactOpen, setIsContactOpen] = React.useState(false)
  const [projects, setProjects] = React.useState<Project[]>([])
  const [loading, setLoading] = React.useState(true)

  // Fetch public published projects
  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects")
        const data = await res.json()
        if (res.ok && data.success) {
          setProjects(data.data)
        }
      } catch (error) {
        console.error("Failed to load public projects:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

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
        <section className="mx-auto w-full max-w-7xl px-6 md:px-8 mb-20 md:mb-28 text-center md:text-left flex flex-col md:flex-row items-center md:items-end justify-between gap-8 select-none">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl font-semibold leading-tight  text-zinc-900 dark:text-white md:text-5xl lg:text-7xl">
              <span className="font-serif tracking-tight">{language === "tr" ? "Tüm Projelerimiz." : "All Our Projects."}</span>
              <span className="dark:text-white/60 text-black/60 text-base md:text-xl block mt-2">
                {language === "tr" ? "Karmaşıklıktan uzak dijital başyapıtlar." : "Crafted beyond complexity toward true potential."}
              </span>
            </h1>
          </div>
        </section>

        {/* Projects Stack / Grid Showcase */}
        <section className="mx-auto w-full max-w-7xl px-6 md:px-8 mb-32">
          {loading ? (
            <div className="w-full min-h-[400px] flex flex-col justify-center items-center">
              <svg className="animate-spin h-9 w-9 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 mt-4 animate-pulse uppercase">
                {language === "tr" ? "Projeler Yükleniyor..." : "Syncing Projects Showcase..."}
              </span>
            </div>
          ) : projects.length === 0 ? (
            <div className="w-full min-h-[300px] rounded-3xl border border-dashed border-zinc-200 dark:border-white/5 flex flex-col justify-center items-center text-center p-8 select-none">
              <Folder className="h-12 w-12 text-zinc-450 dark:text-zinc-555 stroke-1 mb-4" />
              <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
                {language === "tr" ? "Henüz Proje Eklenmedi" : "No Projects Published Yet"}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 max-w-sm mt-1 leading-relaxed">
                {language === "tr" 
                  ? "Admin panelinden proje eklediğinizde bu alanda rengarenk kartlar olarak listelenecektir." 
                  : "New projects added from the admin dashboard will automatically hydrate in this section."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-16 lg:gap-24 w-full">
              {projects.map((project, index) => {
                const isEven = index % 2 === 0
                const displayTitle = language === "tr" ? project.titleTr : project.title
                const displayCategory = language === "tr" ? project.categoryTr : project.category
                const displayDesc = language === "tr" ? project.descTr : project.desc

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: index * 0.05 }}
                    className={`group relative flex flex-col overflow-hidden rounded-[32px] border border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-zinc-950/20 backdrop-blur-xl transition-all duration-500 hover:border-zinc-300 dark:hover:border-white/10 ${
                      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Glowing Backlighting Ambient Aura */}
                    <div 
                      className="absolute -right-20 -top-20 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-25 group-hover:scale-110 transition-all duration-700" 
                      style={{ backgroundColor: project.glowColor }}
                    />
                    <div 
                      className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-20 group-hover:scale-110 transition-all duration-700" 
                      style={{ backgroundColor: project.glowColor }}
                    />

                    {/* Card Info Column */}
                    <div className="flex flex-1 flex-col p-8 md:p-12 lg:p-14 z-10 justify-between lg:max-w-xl">
                      <div>
                        {/* Category Badge */}
                        <div className="flex items-center gap-3.5 mb-5 select-none">
                          <span className="inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: project.glowColor, boxShadow: `0 0 8px ${project.glowColor}` }} />
                          <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">{displayCategory}</span>
                        </div>

                        {/* Title */}
                        <h3 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight font-sans">
                          {displayTitle}
                        </h3>

                        {/* Description */}
                        <p className="mb-8 text-sm md:text-base leading-relaxed text-zinc-650 dark:text-zinc-400 font-medium">
                          {displayDesc}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-auto flex flex-wrap gap-4 items-center">
                        {project.demoUrl && (
                          <a 
                            href={project.demoUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-black/10 dark:border-white/10 dark:bg-white/5 bg-black/5 hover:bg-black/90 dark:hover:bg-white hover:text-white dark:hover:text-black px-6 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer"
                          >
                            <span>{language === "tr" ? "Platformu Keşfet" : "Explore Platform"}</span>
                            <span 
                              className="rounded-full text-white dark:text-black p-1 transition-colors duration-300 group-hover/btn:rotate-45"
                              style={{ backgroundColor: project.glowColor }}
                            >
                              <ArrowUpRight className="h-4 w-4" />
                            </span>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 hover:text-orange-500 transition-colors text-xs font-bold font-mono tracking-wider"
                          >
                            <Github className="h-4.5 w-4.5" />
                            <span>GITHUB</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Interactive Custom Showcase Mockup Preview Column */}
                    <div className="flex-1 bg-zinc-50/50 dark:bg-zinc-950/45 p-6 md:p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-zinc-150 dark:border-white/5 flex flex-col justify-center items-center min-h-[360px] lg:min-h-0 relative overflow-hidden select-none">
                      {/* Mesh background grid lines */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:16px_28px] pointer-events-none" />

                      {/* Floating, dynamic abstract backdrop block using stored Tailwind gradient */}
                      <motion.div 
                        className={`relative w-full max-w-sm aspect-[16/10] rounded-[24px] bg-gradient-to-tr ${project.bgGradient} border border-black/10 dark:border-white/10 p-5 overflow-hidden flex flex-col justify-between`}
                        style={{
                          boxShadow: `0 25px 60px -15px ${project.glowColor}`
                        }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        {/* Dynamic backdrop grid mesh inside visual */}
                        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:12px_12px] opacity-75" />

                        {/* Top bar with dots mimicking browser */}
                        <div className="relative flex justify-between items-center opacity-70 z-10">
                          <div className="flex gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-white/20" />
                            <span className="h-2 w-2 rounded-full bg-white/25" />
                            <span className="h-2 w-2 rounded-full bg-white/20" />
                          </div>
                          <span className="text-[7.5px] font-mono font-bold tracking-widest text-white/50 bg-black/10 border border-white/5 px-2 py-0.5 rounded uppercase">
                            {displayCategory.split(" ")[0]}
                          </span>
                        </div>

                        {/* Middle: Rotating geometric abstract mesh or golden ratio circles represent elite design */}
                        <div className="relative flex-grow flex items-center justify-center py-4 z-10">
                          <motion.div 
                            className="relative w-28 h-28 rounded-full border border-white/15 flex items-center justify-center"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                          >
                            <div className="absolute inset-2 rounded-full border border-white/10 border-dashed" />
                            <div className="absolute inset-5 rounded-full border border-white/5" />
                            <div className="absolute h-full w-px bg-white/10" />
                            <div className="absolute w-full h-px bg-white/10" />
                            {/* Inner glowing core */}
                            <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                              <Laptop className="h-4.5 w-4.5 text-white/95" />
                            </div>
                          </motion.div>
                        </div>

                        {/* Bottom: Stylized dynamic text bar */}
                        <div className="relative flex justify-between items-center z-10 select-none">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[8px] font-mono tracking-widest text-white/40 uppercase">STATUS</span>
                            <span className="text-[10px] font-mono font-bold text-white/90">AENT DIGITAL</span>
                          </div>
                          <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-white/90 bg-white/10 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg">
                            <span>ONLINE</span>
                            <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping" />
                          </div>
                        </div>
                      </motion.div>
                    </div>

                  </motion.div>
                )
              })}
            </div>
          )}
        </section>
      </main>

      <MinimalFooter />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  )
}
