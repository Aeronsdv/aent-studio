"use client"

import * as React from "react"
import {
  Moon,
  Sun,
  Languages,
  ArrowRight,
  Sparkles,
  Users,
  Github,
  Twitter,
  Linkedin,
  Check
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

export default function CommunityPage() {
  const { setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [isContactOpen, setIsContactOpen] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setEmail("")
    }, 1200)
  }


  return (
    <div className="relative min-h-screen w-full bg-background text-foreground transition-colors duration-300 overflow-x-hidden selection:bg-orange-500/20 selection:text-orange-500">

      {/* Decorative Shifting Glowing Backdrop Blobs */}
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
        {/* Immersive Centered Hero Section */}
        <section className="mx-auto w-full max-w-4xl px-6 md:px-8 mb-16 text-center select-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl font-semibold text-zinc-900 dark:text-white md:text-6xl lg:text-7xl font-serif tracking-tight leading-none">
              {language === "tr" ? (
                <>
                  Çok <span className="bg-clip-text font-serif">Yakında.</span>
                </>
              ) : (
                <>
                  Coming <span className="bg-clip-text font-serif">Soon.</span>
                </>
              )}
            </h1>

            <p className="dark:text-white/60 text-black/60 text-base md:text-lg max-w-xl mx-auto font-normal leading-relaxed">
              {language === "tr"
                ? "Vizyoner kurucular, geliştiriciler ve tasarımcılar için dijital bir buluşma noktası inşa ediyoruz. Fikirlerin paylaşıldığı, iş birliklerinin kurulduğu premium bir ekosistem."
                : "We are building a digital gathering place for visionary founders, developers, and designers. A premium ecosystem where ideas are shared and collaborations are forged."
              }
            </p>
          </motion.div>
        </section>

        {/* Dynamic Premium Waitlist Subscription Form */}
        <section className="mx-auto w-full max-w-lg px-6 md:px-8 mb-24 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative group p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/70 dark:bg-zinc-950/20 backdrop-blur-xl transition-all duration-300 hover:border-zinc-300 dark:hover:border-white/10 hover:shadow-2xl overflow-hidden"
          >
            {/* Ambient Background Aura */}
            <div className="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-orange-500/10 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute -left-16 -bottom-16 w-36 h-36 rounded-full bg-blue-500/10 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubscribe}
                  className="space-y-4"
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white text-center">
                    {language === "tr" ? "Bekleme Listesine Katılın" : "Join the Waitlist"}
                  </h3>
                  <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
                    {language === "tr"
                      ? "Topluluk lansmanı ve özel davetiyeler için ilk sırada yer alın."
                      : "Be the first in line for the community launch and exclusive invitations."
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={language === "tr" ? "E-posta adresiniz" : "Your email address"}
                      className="flex-1 h-11 rounded-xl border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-black/40 px-4 py-2 text-sm text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-11 rounded-xl bg-gradient-to-r from-orange-500 to-orange-500 hover:opacity-90 text-white font-semibold text-xs px-5 cursor-pointer shadow-md shadow-orange-500/15 border-0 focus:ring-0 active:scale-98 transition-all duration-250 flex items-center justify-center gap-1"
                    >
                      {isSubmitting ? (
                        <span>{language === "tr" ? "Kaydediliyor..." : "Subscribing..."}</span>
                      ) : (
                        <>
                          <span>{language === "tr" ? "Yerimi Ayırt" : "Reserve Spot"}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4 space-y-3"
                >
                  <div className="mx-auto h-12 w-12 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/10 flex items-center justify-center shadow-inner">
                    <Check className="h-5 w-5 animate-bounce" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                    {language === "tr" ? "Kaydınız Alındı!" : "You're on the List!"}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">
                    {language === "tr"
                      ? "Harika! E-posta adresinizi başarıyla listemize ekledik. Gelişmelerden sizi haberdar edeceğiz."
                      : "Awesome! We've successfully added your email. We'll keep you updated on our progress."
                    }
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      <MinimalFooter />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  )
}
