"use client"
import * as React from "react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Moon, 
  Sun, 
  Languages, 
  Sparkles, 
  Mail, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  ArrowUpRight,
  Instagram,
  Twitter,
  Github
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import NavbarMenuFull from "@/components/navbar-menu-full"
import { MinimalFooter } from "@/components/ui/minimal-footer"
import { motion, AnimatePresence } from "motion/react"

export default function ContactPage() {
  const { setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  // Form states
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [subject, setSubject] = React.useState("")
  const [message, setMessage] = React.useState("")
  
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)

  const formRef = React.useRef<HTMLFormElement>(null)

  const handleContactFocus = () => {
    // Focus the first form input on nav button clicks
    const firstInput = formRef.current?.querySelector("input")
    if (firstInput) {
      (firstInput as HTMLInputElement).focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg(t("contactModal.errorRequired"))
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t("contactModal.errorGeneric"))
      }

      setIsSuccess(true)
      
      // Reset form
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    } catch (err: any) {
      console.error(err)
      setErrorMsg(err.message || t("contactModal.errorGeneric"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground transition-colors duration-300 flex flex-col justify-between overflow-x-hidden">
      
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
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 via-zinc-100/10 to-blue-500/5 dark:from-orange-950/10 dark:via-zinc-950/20 dark:to-blue-950/10 animate-gradient-shift -z-20 pointer-events-none" />

      {/* Glowing backdrop blobs */}
      <motion.div
        animate={{
          x: [-40, 60, -30, -40],
          y: [-30, 40, -50, -30],
          scale: [1, 1.25, 0.9, 1],
          rotate: [0, 90, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[5%] top-[15%] w-[340px] h-[340px] rounded-full bg-gradient-to-br from-orange-500/15 via-amber-500/5 to-transparent blur-[80px] pointer-events-none -z-10"
      />

      <motion.div
        animate={{
          x: [40, -60, 30, 40],
          y: [30, -40, 50, 30],
          scale: [1, 0.9, 1.2, 1],
          rotate: [360, 270, 180, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[5%] top-[35%] w-[380px] h-[380px] rounded-full bg-gradient-to-br from-blue-500/15 via-cyan-500/5 to-transparent blur-[90px] pointer-events-none -z-10"
      />

      {/* Floating Navbar */}
      <div className="fixed top-4 left-0 right-0 z-50 w-full px-4 flex justify-center select-none">
        <div className="w-full max-w-4xl flex items-center gap-2">
          {/* Language Switcher */}
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
            <NavbarMenuFull onContactClick={handleContactFocus} />
          </div>

          {/* Theme Switcher */}
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

      {/* Main Container */}
      <main className="w-full max-w-7xl mx-auto px-6 md:px-8 pt-32 pb-24 md:pt-40 md:pb-32 flex-1">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16 md:mb-24 select-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-zinc-900 dark:text-white">
              {t("contactPage.title")}
            </h1>
            
            <p className="text-base md:text-xl font-medium dark:text-white/60 text-black/60 max-w-2xl leading-relaxed">
              {t("contactPage.subtitle")}
            </p>
          </motion.div>
        </div>

        {/* Dual Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
          
          {/* Column 1: Info Blocks */}
          <div className="lg:col-span-5 space-y-8 md:space-y-12 select-none">
            
            {/* Office Block */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-xl space-y-3"
            >
              <div className="h-10 w-10 rounded-2xl bg-orange-500/10 text-orange-500 dark:text-orange-400 border border-orange-500/15 flex items-center justify-center">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold font-mono tracking-wider text-zinc-400 uppercase">{t("contactPage.ourOffice")}</span>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{t("contactPage.officeLocation")}</h3>
              </div>
            </motion.div>


            {/* Email Us Block */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-xl space-y-3"
            >
              <div className="h-10 w-10 rounded-2xl bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-500/15 flex items-center justify-center">
                <Mail className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold font-mono tracking-wider text-zinc-400 uppercase">{t("contactPage.emailUs")}</span>
                <a 
                  href="mailto:hello@aent.studio" 
                  className="text-xl font-bold text-zinc-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 flex items-center gap-1.5 transition-colors duration-300"
                >
                  hello@aent.studio
                  <ArrowUpRight className="h-4.5 w-4.5 text-zinc-450 shrink-0" />
                </a>
              </div>
            </motion.div>

            {/* Social Connect Blocks */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <span className="text-[10px] font-bold font-mono tracking-wider text-zinc-400 uppercase block pl-2">{t("contactPage.followUs")}</span>
              
              <div className="flex items-center gap-2">
                <a 
                  href="https://instagram.com/aentstudio" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="h-12 w-12 rounded-2xl bg-white/40 dark:bg-zinc-950/20 border border-zinc-200 dark:border-white/5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://twitter.com/aentstudio" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="h-12 w-12 rounded-2xl bg-white/40 dark:bg-zinc-950/20 border border-zinc-200 dark:border-white/5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="https://github.com/aentstudio" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="h-12 w-12 rounded-2xl bg-white/40 dark:bg-zinc-950/20 border border-zinc-200 dark:border-white/5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </motion.div>

          </div>

          {/* Column 2: Gorgeous Glassmorphism Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-8 md:p-10 rounded-[32px] border border-zinc-200 dark:border-white/5 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-3xl shadow-2xl relative overflow-hidden"
              style={{
                boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.05)"
              }}
            >
              <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-orange-500/5 blur-[50px] pointer-events-none -z-10" />

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-8 select-none">
                      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        {t("contactPage.formTitle")}
                      </h2>
                      <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-1 font-medium">
                        {t("contactPage.formSubtitle")}
                      </p>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                          {t("contactModal.nameLabel")} <span className="text-orange-500">*</span>
                        </label>
                        <Input
                          required
                          placeholder={t("contactModal.namePlaceholder")}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={isSubmitting}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                          {t("contactModal.emailLabel")} <span className="text-orange-500">*</span>
                        </label>
                        <Input
                          required
                          type="email"
                          placeholder={t("contactModal.emailPlaceholder")}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isSubmitting}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                          {t("contactModal.subjectLabel")}
                        </label>
                        <Input
                          placeholder={t("contactModal.subjectPlaceholder")}
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          disabled={isSubmitting}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                          {t("contactModal.messageLabel")} <span className="text-orange-500">*</span>
                        </label>
                        <Textarea
                          required
                          placeholder={t("contactModal.messagePlaceholder")}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          disabled={isSubmitting}
                          className="min-h-[140px]"
                        />
                      </div>

                      {errorMsg && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="flex items-start gap-2.5 text-xs font-semibold text-destructive dark:text-red-400 bg-destructive/10 p-3.5 rounded-2xl border border-destructive/20"
                        >
                          <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                          <span>{errorMsg}</span>
                        </motion.div>
                      )}

                      <div className="pt-2">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-13 rounded-2xl cursor-pointer hover:shadow-lg hover:shadow-orange-500/10 font-bold text-sm tracking-wide transition-all"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              {t("contactModal.submittingState")}
                            </span>
                          ) : (
                            t("contactModal.submitBtn")
                          )}
                        </Button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="flex flex-col items-center text-center py-12 select-none"
                  >
                    <div className="relative mb-6 flex items-center justify-center">
                      <div className="h-20 w-20 bg-green-500/10 dark:bg-green-500/20 border border-green-500/25 text-green-500 rounded-full flex items-center justify-center relative z-10 animate-bounce">
                        <CheckCircle className="h-10 w-10" />
                      </div>
                      <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full scale-120 animate-pulse" />
                    </div>

                    <h2 className="text-3xl font-extrabold tracking-tight mb-3 text-zinc-900 dark:text-white">
                      {t("contactModal.successTitle")}
                    </h2>
                    
                    <p className="max-w-md text-sm leading-relaxed text-zinc-555 dark:text-zinc-400 mb-8 font-medium">
                      {t("contactModal.successSubtitle")}
                    </p>

                    <Button
                      onClick={() => setIsSuccess(false)}
                      variant="outline"
                      className="w-full max-w-[200px] h-12 rounded-2xl cursor-pointer"
                    >
                      {t("contactModal.successBtn")}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <MinimalFooter />
    </div>
  )
}
