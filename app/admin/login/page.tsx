"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sparkles, Eye, EyeOff, Lock, Languages, AlertCircle, ArrowLeft, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t, language, setLanguage } = useLanguage()
  const { setTheme, resolvedTheme } = useTheme()

  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) return

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        const redirectPath = searchParams.get("from") || "/admin"
        router.push(redirectPath)
        router.refresh()
      } else {
        setError(t("admin.invalidPassword"))
      }
    } catch (err) {
      console.error(err)
      setError(language === "tr" ? "Bir ağ hatası oluştu." : "A network error occurred.")
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans antialiased select-none transition-colors duration-300">
      

      {/* Grid Overlay Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808002_1px,transparent_1px),linear-gradient(to_bottom,#80808002_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Top right language switcher & theme toggle panel */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-2 bg-white/40 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-white/5 backdrop-blur-md rounded-2xl p-1 shadow-sm transition-colors duration-300">
        
        {/* Language Switcher */}
        <Button 
          variant="ghost" 
          onClick={() => setLanguage(language === "en" ? "tr" : "en")}
          className="h-8.5 rounded-xl px-2.5 hover:bg-zinc-200/60 dark:hover:bg-white/5 text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white focus:ring-0 focus-visible:ring-0 font-mono text-[10px] font-bold transition-all duration-350 flex items-center gap-1.5 cursor-pointer"
        >
          <Languages className="h-3.5 w-3.5" />
          <span>{language === "en" ? "TR" : "EN"}</span>
        </Button>

        <div className="w-[1px] h-4.5 bg-zinc-250 dark:bg-white/10" />

        {/* Theme Toggle Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-xl h-8.5 w-8.5 hover:bg-zinc-200/60 dark:hover:bg-white/5 text-zinc-550 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white focus:ring-0 focus-visible:ring-0 cursor-pointer transition-all relative">
              <Sun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={10} alignOffset={-4} className="dark:bg-zinc-950 bg-white dark:border-white/5 border-zinc-200 backdrop-blur-md rounded-2xl p-1.5 shadow-lg select-none">
            <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-zinc-100 dark:hover:bg-white/5 transition-all rounded-xl px-3.5 py-2 cursor-pointer font-medium text-xs text-zinc-700 dark:text-zinc-300">
              {language === "tr" ? "Açık" : "Light"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-zinc-100 dark:hover:bg-white/5 transition-all rounded-xl px-3.5 py-2 cursor-pointer font-medium text-xs text-zinc-700 dark:text-zinc-300">
              {language === "tr" ? "Karanlık" : "Dark"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")} className="hover:bg-zinc-100 dark:hover:bg-white/5 transition-all rounded-xl px-3.5 py-2 cursor-pointer font-medium text-xs text-zinc-700 dark:text-zinc-300">
              {language === "tr" ? "Sistem" : "System"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main card wrapper with moving gradient border */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[420px] relative z-10"
      >
        <div className="relative bg-white/80 dark:bg-zinc-950/80 border border-zinc-200 dark:border-white/10 rounded-[26px] backdrop-blur-2xl shadow-2xl overflow-hidden p-6 md:p-8 transition-all duration-300">
          
          <div className="flex flex-col items-center text-center space-y-4 mb-6">
            {/* Elegant Spinning Icon */}
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20 relative group">
              <Sparkles className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-300 animate-pulse" />
            </div>

            <div className="space-y-1.5">
              <h2 className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white">{t("admin.loginTitle")}</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-450 max-w-xs leading-relaxed font-medium">
                {t("admin.loginSubtitle")}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Input field wrapper */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-450 uppercase block">
                {t("admin.passwordLabel")}
              </label>
              
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
                  <Lock className="h-4 w-4" />
                </span>
                
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("admin.passwordPlaceholder")}
                  className="pl-10 pr-10"
                  autoFocus
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-550 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error Notification */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="bg-red-500/10 border border-red-500/20 dark:border-red-500/25 rounded-2xl p-3 flex items-start gap-2.5 overflow-hidden"
                >
                  <AlertCircle className="h-4 w-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] font-medium text-red-750 dark:text-red-300 leading-relaxed">
                    {error}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Submit Button with Gradient Accent */}
            <Button
              type="submit"
              disabled={loading || !password}
              className="w-full h-11 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs rounded-2xl shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 hover:scale-[1.02] active:rounded-[24px] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 border-0 mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{t("admin.authenticating")}</span>
                </>
              ) : (
                <span>{t("admin.loginButton")}</span>
              )}
            </Button>
          </form>

          {/* Footer Back to Site Link */}
          <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-white/5 flex justify-center">
            <Link 
              href="/" 
              className="text-[10px] font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1.5 transition-colors group"
            >
              <ArrowLeft className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform" />
              <span>{t("admin.backToSite")}</span>
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  )
}
