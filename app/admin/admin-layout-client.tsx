"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  LayoutDashboard, 
  MessageSquare, 
  BookOpen, 
  ArrowLeft, 
  Menu, 
  X, 
  Bell,
  Sparkles,
  Terminal,
  Sun,
  Moon,
  Languages,
  Route
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "motion/react"

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { setTheme, resolvedTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      })
      if (response.ok) {
        router.push("/admin/login")
        router.refresh()
      }
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  // Localized sidebar menu items using the dynamic translation helper
  const menuItems = [
    { 
      label: t("admin.dashboard"), 
      href: "/admin", 
      icon: LayoutDashboard,
      desc: t("admin.dashboardDesc")
    },
    { 
      label: t("admin.messages"), 
      href: "/admin/contacts", 
      icon: MessageSquare,
      desc: t("admin.messagesDesc")
    },
    { 
      label: t("admin.blogs"), 
      href: "/admin/blogs", 
      icon: BookOpen,
      desc: t("admin.blogsDesc") 
    },
    { 
      label: t("admin.projects"), 
      href: "/admin/projects", 
      icon: Sparkles,
      desc: t("admin.projectsDesc") 
    },
    { 
      label: t("admin.roadmap"), 
      href: "/admin/roadmap", 
      icon: Route,
      desc: t("admin.roadmapDesc") 
    },
  ]

  const activeItem = menuItems.find(item => item.href === pathname) || menuItems[0]

  if (!mounted) return null

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex relative font-sans antialiased overflow-x-hidden selection:bg-orange-500/20 selection:text-orange-500 transition-colors duration-300">
      
      {/* Decorative Shifting Glowing Backdrop Blobs - Softened opacity in Light mode */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-500/[0.04] dark:bg-orange-500/5 blur-[120px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: "12s" }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/[0.04] dark:bg-blue-500/5 blur-[120px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: "16s" }} />

      {/* Modern Grid Overlay Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10" />

      {/* Sidebar - Desktop Layout */}
      <aside className="hidden lg:flex w-72 shrink-0 border-r border-zinc-200/70 dark:border-white/5 bg-zinc-50/40 dark:bg-zinc-900/40 backdrop-blur-xl flex-col p-6 sticky top-0 h-screen select-none transition-colors duration-300">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-2 mb-8 py-2">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/10">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight leading-none text-zinc-900 dark:text-white">Aent Studio</h1>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono tracking-widest uppercase">{t("admin.adminPanel")}</span>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 space-y-1.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className="block group">
                <div
                  className={cn(
                    "flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 relative overflow-hidden",
                    isActive 
                      ? "bg-gradient-to-r from-orange-500/[0.08] dark:from-orange-500/10 to-transparent border-l-2 border-orange-500 text-orange-600 dark:text-orange-400 font-bold" 
                      : "text-zinc-550 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-white/2"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110",
                    isActive ? "text-orange-500" : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-300"
                  )} />
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm leading-none">{item.label}</span>
                    <span className="text-[10px] text-zinc-450 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 mt-1 transition-colors">{item.desc}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer Operations */}
        <div className="pt-6 border-t border-zinc-200/60 dark:border-white/5 space-y-3">
          <Link href="/" className="block group">
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-white/2 transition-all duration-300">
              <ArrowLeft className="h-4.5 w-4.5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 group-hover:-translate-x-0.5 transition-transform" />
              <span className="font-semibold text-xs">{t("admin.backToSite")}</span>
            </div>
          </Link>
          
          <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-zinc-100/60 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-white/5 transition-all w-full group/session">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="h-8 w-8 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold text-xs select-none shrink-0">
                AS
              </div>
              <div className="overflow-hidden">
                <h4 className="font-semibold text-xs text-zinc-800 dark:text-zinc-200 truncate leading-none">{t("admin.developerAccount")}</h4>
                <span className="text-[9px] text-zinc-450 dark:text-zinc-500 font-mono truncate block mt-1">{t("admin.activeSession")}</span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              title={t("admin.logout")}
              className="h-7 w-7 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-500 flex items-center justify-center transition-all cursor-pointer border-0 shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" x2="9" y1="12" y2="12"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Panel Wrapper */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-x-hidden">
        
        {/* Top Header Controls */}
        <header className="sticky top-0 z-40 bg-background/80 dark:bg-zinc-950/70 backdrop-blur-md border-b border-zinc-200/60 dark:border-white/5 px-6 md:px-8 py-4 flex items-center justify-between select-none transition-colors duration-300">
          {/* Header Left (Mobile menu trigger & Breadcrumb) */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-xl text-zinc-550 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-white/5 transition-all cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono uppercase tracking-wider">
                <span>Aent Admin</span>
                <span>/</span>
                <span className="text-zinc-650 dark:text-zinc-450">{activeItem.label}</span>
              </div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white mt-0.5 hidden md:block">
                {activeItem.label}
              </h2>
            </div>
          </div>

          {/* Header Right Controls */}
          <div className="flex items-center gap-3.5">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-semibold text-zinc-650 dark:text-zinc-300">
                {new Date().toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
              <span className="text-[9px] text-zinc-450 dark:text-zinc-500 font-mono">{t("admin.systemOnline")}</span>
            </div>

            <div className="h-8 w-[1px] bg-zinc-200 dark:bg-white/5 hidden sm:block" />

            <div className="flex items-center gap-1.5 bg-zinc-100/60 dark:bg-white/2 border border-zinc-200/60 dark:border-white/5 rounded-2xl p-1">
              
              {/* Language Switcher */}
              <Button 
                variant="ghost" 
                onClick={() => setLanguage(language === "en" ? "tr" : "en")}
                className="h-8.5 rounded-xl px-2.5 hover:bg-zinc-200/65 dark:hover:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white focus:ring-0 focus-visible:ring-0 font-mono text-[10px] font-bold transition-all duration-350 flex items-center gap-1.5 cursor-pointer"
              >
                <Languages className="h-3.5 w-3.5" />
                <span>{language === "en" ? "TR" : "EN"}</span>
              </Button>

              <div className="w-[1px] h-4.5 bg-zinc-250 dark:bg-white/10" />

              {/* Theme Toggle Button */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-xl h-8.5 w-8.5 hover:bg-zinc-200/65 hover:dark:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white focus:ring-0 focus-visible:ring-0 cursor-pointer transition-all relative">
                    <Sun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={10} alignOffset={-4} className="dark:bg-zinc-950 bg-white dark:border-white/5 border-zinc-200 backdrop-blur-md rounded-2xl p-1.5 shadow-lg select-none">
                  <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-zinc-100 dark:hover:bg-white/5 transition-all rounded-xl px-3.5 py-2 cursor-pointer font-medium text-xs">
                    {language === "tr" ? "Açık" : "Light"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-zinc-100 dark:hover:bg-white/5 transition-all rounded-xl px-3.5 py-2 cursor-pointer font-medium text-xs">
                    {language === "tr" ? "Karanlık" : "Dark"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")} className="hover:bg-zinc-100 dark:hover:bg-white/5 transition-all rounded-xl px-3.5 py-2 cursor-pointer font-medium text-xs">
                    {language === "tr" ? "Sistem" : "System"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notification Trigger */}
              <button className="p-1.5 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-white/5 transition-all relative cursor-pointer">
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-orange-500 rounded-full animate-ping" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-orange-500 rounded-full" />
              </button>

              {/* Terminal Trigger */}
              <button className="p-1.5 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-white/5 transition-all cursor-pointer">
                <Terminal className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Content Page */}
        <main className="flex-1 p-6 md:p-8 flex flex-col relative bg-zinc-50/20 dark:bg-transparent">
          {children}
        </main>
      </div>

      {/* Sidebar - Mobile Layout Slider Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/50 dark:bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0.05, duration: 0.4 }}
              className="lg:hidden fixed top-0 bottom-0 left-0 w-72 z-50 bg-background border-r border-zinc-200 dark:border-white/5 flex flex-col p-6 select-none shadow-2xl"
            >
              {/* Mobile Close Button */}
              <button 
                onClick={() => setIsMobileOpen(false)}
                className="absolute right-5 top-5 p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/5 transition-all cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              {/* Logo Section */}
              <div className="flex items-center gap-3 mb-8 mt-2 py-2">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center">
                  <Sparkles className="h-4.5 w-4.5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-sm tracking-tight leading-none text-zinc-900 dark:text-white">Aent Studio</h1>
                  <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-mono tracking-widest uppercase">{t("admin.adminPanel")}</span>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="flex-1 space-y-1.5">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setIsMobileOpen(false)} className="block">
                      <div
                        className={cn(
                          "flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 relative",
                          isActive 
                            ? "bg-orange-500/[0.08] border-l-2 border-orange-500 text-orange-650 dark:text-orange-400 font-bold" 
                            : "text-zinc-550 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-white/2"
                        )}
                      >
                        <item.icon className={cn(
                          "h-5 w-5 shrink-0",
                          isActive ? "text-orange-500" : "text-zinc-450"
                        )} />
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm leading-none">{item.label}</span>
                          <span className="text-[10px] text-zinc-500 mt-1">{item.desc}</span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </nav>

              {/* Sidebar Footer */}
              <div className="pt-6 border-t border-zinc-200 dark:border-white/5 space-y-3">
                <Link href="/" onClick={() => setIsMobileOpen(false)} className="block">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-2xl text-zinc-550 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-white/2 transition-all">
                    <ArrowLeft className="h-4 w-4 text-zinc-450 dark:text-zinc-500" />
                    <span className="font-semibold text-xs">{t("admin.backToSite")}</span>
                  </div>
                </Link>
                
                <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-zinc-100/60 dark:bg-zinc-950/40 border border-zinc-200 dark:border-white/5 transition-all w-full group/session">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="h-8 w-8 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold text-xs shrink-0">
                      AS
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-semibold text-xs text-zinc-800 dark:text-zinc-200 leading-none truncate">{t("admin.developerAccount")}</h4>
                      <span className="text-[9px] text-zinc-450 dark:text-zinc-500 font-mono mt-1 block truncate">{t("admin.activeSession")}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setIsMobileOpen(false)
                      handleLogout()
                    }}
                    title={t("admin.logout")}
                    className="h-7 w-7 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-500 flex items-center justify-center transition-all cursor-pointer border-0 shrink-0"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" x2="9" y1="12" y2="12"/>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}
