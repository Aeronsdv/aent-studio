"use client"
import * as React from "react"
import Link from "next/link"
import { Sun, Moon, Languages, Calendar, Clock, User, ArrowLeft, Share2, Check, BookOpen } from "lucide-react"
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

interface BlogPostClientProps {
  post: {
    id: string
    title: string
    slug: string
    summary: string
    content: string
    coverImage: string | null
    published: boolean
    author: string
    tags: string
    createdAt: string
  }
  htmlContent: string
}

export default function BlogPostClient({ post, htmlContent }: BlogPostClientProps) {
  const { setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [isContactOpen, setIsContactOpen] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  // Calculate dynamic reading time
  const wordCount = post.content.trim().split(/\s+/).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  // Translate label helper
  const getLabel = (key: string) => {
    const trLabels: { [key: string]: string } = {
      "blog.back": "Yazılara Geri Dön",
      "blog.readTime": "dk okuma",
      "blog.by": "Yazar",
      "blog.tags": "Etiketler",
      "blog.share": "Paylaş",
      "blog.copied": "Kopyalandı!",
      "blog.copyLink": "Linki Kopyala",
    }
    const enLabels: { [key: string]: string } = {
      "blog.back": "Back to Journal",
      "blog.readTime": "min read",
      "blog.by": "By",
      "blog.tags": "Tags",
      "blog.share": "Share",
      "blog.copied": "Copied!",
      "blog.copyLink": "Copy Link",
    }
    const labels = language === "tr" ? trLabels : enLabels
    return labels[key] || key
  }

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground transition-colors duration-300 overflow-x-hidden selection:bg-orange-500/20 selection:text-orange-500">
      
      {/* Decorative Shifting Glowing Backdrop Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-500/[0.04] dark:bg-orange-500/5 blur-[120px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: "12s" }} />
      <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-500/[0.03] dark:bg-purple-500/5 blur-[120px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: "16s" }} />

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

      <main className="w-full flex flex-col pt-32 md:pt-40 pb-32">
        <article className="mx-auto w-full max-w-4xl px-6 md:px-8">
          
          {/* Back button shortcut */}
          <div className="mb-8 select-none">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>{getLabel("blog.back")}</span>
            </Link>
          </div>

          {/* Big Curved Cover Image */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative aspect-[16/9] w-full rounded-[32px] md:rounded-[48px] overflow-hidden bg-zinc-150 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 shadow-2xl mb-12 select-none"
          >
            {post.coverImage ? (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            ) : (
              // Stunning abstract background fallback
              <div className="w-full h-full bg-gradient-to-br from-orange-500/20 via-purple-650/15 to-zinc-950 flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-orange-500/35 animate-pulse" />
              </div>
            )}
            {/* Soft gradient bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Heading Content Row */}
          <div className="space-y-6 mb-10 select-none">
            
            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-extrabold text-zinc-900 dark:text-white md:text-4xl lg:text-5xl tracking-tight leading-tight"
            >
              {post.title}
            </motion.h1>

            {/* Author Avatar & Date Meta Information Dock */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl border border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                {/* Author Avatar initials */}
                <div className="h-9 w-9 rounded-full bg-zinc-950 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-xs font-bold text-zinc-100 font-mono">
                  AE
                </div>
                <div>
                  <span className="text-[10px] text-zinc-450 dark:text-zinc-500 block font-medium uppercase tracking-wider">{getLabel("blog.by")}</span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-white">{post.author}</span>
                </div>
              </div>

              {/* Date & Read time */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-zinc-550 dark:text-zinc-400 font-mono text-xs font-semibold">
                  <Calendar className="h-4 w-4 text-orange-500" />
                  <span>
                    {new Date(post.createdAt).toLocaleDateString(
                      language === "tr" ? "tr-TR" : "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-zinc-550 dark:text-zinc-400 font-mono text-xs font-semibold">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span>{readTime} {getLabel("blog.readTime")}</span>
                </div>
              </div>

              {/* Share button */}
              <button
                onClick={handleShare}
                className="inline-flex h-9 items-center justify-center gap-1.5 px-3.5 rounded-xl dark:bg-[#92370b] bg-[#dc885f] dark:text-white/90 text-white text-xs font-bold transition-all hover:scale-105 active:scale-95 active:rounded-3xl cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>{getLabel("blog.copied")}</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5" />
                    <span>{getLabel("blog.share")}</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Standfirst / Summary Block quote */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-5 md:p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-950/45 border-l-4 border-orange-500 text-zinc-700 dark:text-zinc-300 font-medium text-sm md:text-base leading-relaxed italic"
            >
              {post.summary}
            </motion.div>

          </div>

          {/* HTML Markdown Content Render panel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="prose-aent text-zinc-800 dark:text-zinc-200"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Bottom Row Tags list */}
          {post.tags && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-16 pt-8 border-t border-zinc-150 dark:border-white/5 select-none"
            >
              <h4 className="text-[10px] font-mono font-black text-zinc-450 dark:text-zinc-500 uppercase tracking-widest mb-3">
                {getLabel("blog.tags")}
              </h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.split(",").map((tag, idx) => (
                  <span 
                    key={idx}
                    className="inline-flex items-center text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 dark:bg-orange-500/20 px-3.5 py-1 rounded-2xl border border-orange-500/10"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

        </article>
      </main>

      <MinimalFooter />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  )
}
