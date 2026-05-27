"use client"
import * as React from "react"
import { Moon, Sun, Languages } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CTASection } from "@/components/ui/hero-dithering-card"
import NavbarMenuFull from "@/components/navbar-menu-full"
import { FeaturesSection } from "@/components/features-section"
import { WhyUsSection } from "@/components/why-us-section"
import { ProjectsSection } from "@/components/projects-section"
import { ProcessSection } from "@/components/process-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { FinalCtaSection } from "@/components/final-cta-section"
import { MinimalFooter } from "@/components/ui/minimal-footer"

export default function Home() {
  const { setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground transition-colors duration-300">
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
            <NavbarMenuFull />
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

      {/* Main Sections */}
      <main className="w-full flex flex-col">
        {/* Full-screen Hero */}
        <div className="relative w-full min-h-screen">
          <CTASection />
        </div>

        {/* Projects Section ("Selected Work") */}
        <div className="relative w-full bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 py-32 overflow-hidden">
          <ProjectsSection />
        </div>

        {/* Features Section ("What We Do") */}
        <div className="relative w-full bg-zinc-50 dark:bg-zinc-950/40 border-t border-zinc-200 dark:border-white/5 py-32">
          <FeaturesSection />
        </div>

        {/* Process Section ("Our Process") */}
        <div className="relative w-full bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 py-32 overflow-hidden">
          <ProcessSection />
        </div>

        {/* Why Aent Studio Section */}
        <div className="relative w-full bg-zinc-50 dark:bg-zinc-950/40 border-t border-zinc-200 dark:border-white/5 py-32 overflow-hidden">
          <WhyUsSection />
        </div>

        {/* Testimonial Section ("Founder Feedback") */}
        <div className="relative w-full bg-white dark:bg-zinc-950 border-t border-zinc-150 dark:border-zinc-900 py-32 overflow-hidden">
          <TestimonialSection />
        </div>

        {/* Final CTA Section ("Kapanış") */}
        <div className="relative w-full bg-zinc-50 dark:bg-zinc-950/40 border-t border-zinc-200 dark:border-white/5 py-24 md:py-32 overflow-hidden">
          <FinalCtaSection />
        </div>

        {/* Footer */}
        <MinimalFooter />
      </main>
    </div>
  )
}
