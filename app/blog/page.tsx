"use client"
import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Moon, Sun, Languages, BookOpen, Clock, Tag, Search, ArrowRight, Calendar } from "lucide-react"
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

interface BlogPost {
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

export default function BlogListPage() {
  const { setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [isContactOpen, setIsContactOpen] = React.useState(false)
  const [posts, setPosts] = React.useState<BlogPost[]>([])
  const [loading, setLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null)

  // Fetch published blog posts
  React.useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs")
        const data = await res.json()
        if (res.ok && data.success) {
          setPosts(data.data)
        }
      } catch (error) {
        console.error("Failed to load blog posts:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  // Calculate read time
  const calculateReadTime = (content: string) => {
    const words = content.trim().split(/\s+/).length
    return Math.max(1, Math.ceil(words / 200))
  }

  // Extract all unique tags
  const allTags = React.useMemo(() => {
    const tagsSet = new Set<string>()
    posts.forEach((post) => {
      if (post.tags) {
        post.tags.split(",").forEach((t) => {
          const trimmed = t.trim()
          if (trimmed) tagsSet.add(trimmed)
        })
      }
    })
    return Array.from(tagsSet)
  }, [posts])

  // Filter posts based on search and tags
  const filteredPosts = React.useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTag =
        !selectedTag ||
        (post.tags &&
          post.tags
            .split(",")
            .map((t) => t.trim().toLowerCase())
            .includes(selectedTag.toLowerCase()))

      return matchesSearch && matchesTag
    })
  }, [posts, searchQuery, selectedTag])

  // Context translation keys fallback
  const getLabel = (key: string) => {
    const trLabels: { [key: string]: string } = {
      "blog.title": "Aent Dergi.",
      "blog.subtitle": "Vaka analizleri, tasarım felsefemiz ve teknik makaleler.",
      "blog.searchPlaceholder": "Makale ara...",
      "blog.all": "Tümü",
      "blog.readTime": "dk okuma",
      "blog.noPosts": "Henüz makale bulunamadı",
      "blog.noPostsDesc": "Aradığınız kriterlere uygun herhangi bir blog yazısı bulunmamaktadır.",
      "blog.readMore": "Devamını Oku",
      "blog.writtenBy": "Yazar:",
    }
    const enLabels: { [key: string]: string } = {
      "blog.title": "Aent Journal.",
      "blog.subtitle": "Case studies, our design philosophy, and technical deep-dives.",
      "blog.searchPlaceholder": "Search articles...",
      "blog.all": "All",
      "blog.readTime": "min read",
      "blog.noPosts": "No articles found",
      "blog.noPostsDesc": "Try looking for something else or clearing your filters.",
      "blog.readMore": "Read Article",
      "blog.writtenBy": "Written by",
    }
    const labels = language === "tr" ? trLabels : enLabels
    return labels[key] || key
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

      <main className="w-full flex flex-col pt-36 md:pt-44">
        {/* Header Hero Section */}
        <section className="mx-auto w-full max-w-7xl px-6 md:px-8 mb-12 select-none">
          <div className="space-y-4 max-w-3xl text-center md:text-left">
            <h1 className="text-4xl font-semibold text-zinc-900 dark:text-white md:text-5xl lg:text-7xl leading-tight">
              <span className="font-serif tracking-tight">{getLabel("blog.title")}</span>
              <span className="dark:text-white/60 text-black/60 text-sm md:text-lg lg:text-xl block mt-3 font-sans font-medium">
                {getLabel("blog.subtitle")}
              </span>
            </h1>
          </div>
        </section>

        {/* Filter, Search & Interactive Controls Dock */}
        <section className="mx-auto w-full max-w-7xl px-6 md:px-8 mb-16 select-none z-20">
          <div className="flex flex-col md:flex-row items-center gap-4 p-3 rounded-[32px] border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-black/45 backdrop-blur-md shadow-lg">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-450 dark:text-zinc-500" />
              <input
                type="text"
                placeholder={getLabel("blog.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-11 pr-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 text-xs font-semibold text-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all duration-300"
              />
            </div>

            {/* Tags Scrollable Tabs */}
            <div className="flex-1 flex gap-1.5 overflow-x-auto no-scrollbar py-1 w-full justify-start md:justify-end">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  selectedTag === null
                    ? "bg-zinc-950 text-white dark:bg-white dark:text-black shadow-sm"
                    : "text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {getLabel("blog.all")}
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    selectedTag === tag
                      ? "bg-zinc-950 text-white dark:bg-white dark:text-black shadow-sm"
                      : "text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* Blog Post Card Grid */}
        <section className="mx-auto w-full max-w-7xl px-6 md:px-8 mb-32 relative">
          {loading ? (
            <div className="w-full min-h-[300px] flex flex-col justify-center items-center select-none">
              <svg className="animate-spin h-9 w-9 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 mt-4 animate-pulse uppercase">
                {language === "tr" ? "Yazılar Yükleniyor..." : "Summoning Articles..."}
              </span>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="w-full min-h-[250px] rounded-3xl border border-dashed border-zinc-200 dark:border-white/5 flex flex-col justify-center items-center text-center p-8 select-none">
              <BookOpen className="h-10 w-10 text-zinc-400 dark:text-zinc-650 stroke-1 mb-3 animate-bounce" style={{ animationDuration: "3s" }} />
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                {getLabel("blog.noPosts")}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 max-w-sm mt-1.5 font-medium leading-relaxed">
                {getLabel("blog.noPostsDesc")}
              </p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post) => {
                  const readTime = calculateReadTime(post.content)
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -15 }}
                      transition={{ duration: 0.4 }}
                      key={post.id}
                      className="group relative flex flex-col h-full rounded-[32px] border border-zinc-200 dark:border-white/5 bg-white/70 dark:bg-zinc-950/20 backdrop-blur-md overflow-hidden hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-300 hover:shadow-2xl"
                    >
                      {/* Interactive glow effect */}
                      <div className="absolute -right-20 -top-20 w-44 h-44 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-[50px] pointer-events-none group-hover:scale-125 transition-transform duration-500" />
                      
                      {/* Image container */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-white/5">
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        ) : (
                          // Premium abstract gradient fallback if coverImage is empty
                          <div className="w-full h-full bg-gradient-to-tr from-orange-500/20 via-purple-600/10 to-zinc-900 flex items-center justify-center">
                            <BookOpen className="h-10 w-10 text-orange-500/40" />
                          </div>
                        )}
                        
                        {/* Dynamic read-time pill */}
                        <div className="absolute bottom-4 left-4 inline-flex items-center gap-1 h-6 px-3 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white font-mono select-none">
                          <Clock className="h-3 w-3 text-orange-500" />
                          <span>{readTime} {getLabel("blog.readTime")}</span>
                        </div>
                      </div>

                      {/* Content panel */}
                      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between select-none">
                        <div className="space-y-3">
                          {/* Tags row */}
                          {post.tags && (
                            <div className="flex flex-wrap gap-1.5">
                              {post.tags.split(",").slice(0, 2).map((t, idx) => (
                                <span 
                                  key={idx} 
                                  className="inline-flex items-center text-[9px] font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 dark:bg-orange-500/25 px-2 py-0.5 rounded-md uppercase tracking-wider"
                                >
                                  {t.trim()}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Title */}
                          <h3 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white line-clamp-2 leading-snug group-hover:text-orange-500 transition-colors duration-200">
                            {post.title}
                          </h3>

                          {/* Summary */}
                          <p className="text-xs text-zinc-550 dark:text-zinc-400 line-clamp-3 leading-relaxed font-medium">
                            {post.summary}
                          </p>
                        </div>

                        {/* Card footer details */}
                        <div className="flex items-center justify-between pt-6 mt-6 border-t border-zinc-150 dark:border-white/5">
                          <div className="flex items-center gap-2">
                            {/* Simple circle initials avatar for Author */}
                            <div className="h-7 w-7 rounded-full bg-zinc-900 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-white/10 text-[9px] font-bold font-mono text-zinc-100">
                              AE
                            </div>
                            <div className="text-[10px] leading-tight">
                              <span className="text-zinc-450 dark:text-zinc-500 block font-medium">{getLabel("blog.writtenBy")}</span>
                              <span className="text-zinc-800 dark:text-zinc-300 font-bold">{post.author}</span>
                            </div>
                          </div>

                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex h-9 items-center justify-center gap-1 bg-zinc-100 hover:bg-orange-500 dark:bg-zinc-900 dark:hover:bg-orange-500 text-zinc-800 dark:text-zinc-300 hover:text-white dark:hover:text-white text-xs font-bold px-3.5 rounded-xl cursor-pointer transition-all duration-300 group/btn"
                          >
                            <span>{getLabel("blog.readMore")}</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </main>

      <MinimalFooter />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  )
}
