"use client"
import * as React from "react"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Dialog, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Globe, 
  FileText, 
  Calendar, 
  User, 
  Link as LinkIcon, 
  Sparkles,
  FileCheck,
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  List,
  Code,
  Edit3,
  Eye
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { marked } from "marked"

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

export default function BlogManager() {
  const { t } = useLanguage()
  const [posts, setPosts] = React.useState<BlogPost[]>([])
  const [loading, setLoading] = React.useState(true)
  
  // Modal state for composer
  const [isComposerOpen, setIsComposerOpen] = React.useState(false)
  const [title, setTitle] = React.useState("")
  const [summary, setSummary] = React.useState("")
  const [content, setContent] = React.useState("")
  const [coverImage, setCoverImage] = React.useState("")
  const [tags, setTags] = React.useState("")
  const [publishImmediately, setPublishImmediately] = React.useState(false)
  const [composerTab, setComposerTab] = React.useState<"write" | "preview">("write")
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const previewHtml = React.useMemo(() => {
    try {
      return marked.parseSync(content)
    } catch (e) {
      return ""
    }
  }, [content])

  const insertMarkdown = (syntax: string, placeholder = "") => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value

    const selectedText = text.substring(start, end)
    let replacement = ""
    let newContent = ""
    let newCursorPos = start

    if (syntax === "### " || syntax === "## " || syntax === "> " || syntax === "- ") {
      replacement = syntax + (selectedText || placeholder)
      newContent = text.substring(0, start) + replacement + text.substring(end)
      newCursorPos = start + replacement.length
    } else if (syntax === "```") {
      replacement = "```\n" + (selectedText || placeholder) + "\n```"
      newContent = text.substring(0, start) + replacement + text.substring(end)
      newCursorPos = start + 4 + (selectedText || placeholder).length
    } else if (syntax === "**" || syntax === "*") {
      replacement = syntax + (selectedText || placeholder) + syntax
      newContent = text.substring(0, start) + replacement + text.substring(end)
      newCursorPos = start + syntax.length + (selectedText || placeholder).length + syntax.length
    } else if (syntax === "link") {
      replacement = `[${selectedText || "Link Text"}](https://)`
      newContent = text.substring(0, start) + replacement + text.substring(end)
      newCursorPos = start + 1 + (selectedText || "Link Text").length + 10
    } else {
      newContent = text.substring(0, start) + syntax + text.substring(end)
      newCursorPos = start + syntax.length
    }

    setContent(newContent)
    
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 50)
  }
  const [composerError, setComposerError] = React.useState<string | null>(null)
  const [submitting, setSubmitting] = React.useState(false)

  // Details Viewer state
  const [selectedPost, setSelectedPost] = React.useState<BlogPost | null>(null)
  const [isViewerOpen, setIsViewerOpen] = React.useState(false)

  // Fetch blogs from API
  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/blogs")
      const data = await res.json()
      if (res.ok && data.success) {
        setPosts(data.data)
      }
    } catch (error) {
      console.error("Error loading blog posts:", error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchBlogs()
  }, [])

  // Create a new blog post
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    setComposerError(null)

    if (!title.trim() || !summary.trim() || !content.trim()) {
      setComposerError(t("admin.errorRequired") || "Required fields are missing.")
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          summary,
          content,
          coverImage: coverImage.trim() || null,
          published: publishImmediately,
          tags,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to create blog post.")
      }

      // Add to list and close composer
      setPosts(prev => [data.data, ...prev])
      setIsComposerOpen(false)
      
      // Reset form fields
      setTitle("")
      setSummary("")
      setContent("")
      setCoverImage("")
      setTags("")
      setPublishImmediately(false)
    } catch (err: any) {
      console.error(err)
      setComposerError(err.message || "An error occurred.")
    } finally {
      setSubmitting(false)
    }
  }

  // Toggle publication state
  const togglePublish = async (post: BlogPost) => {
    const updatedState = !post.published
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: post.id, published: updatedState }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setPosts(prev => prev.map(p => p.id === post.id ? { ...p, published: updatedState } : p))
        if (selectedPost?.id === post.id) {
          setSelectedPost(prev => prev ? { ...prev, published: updatedState } : null)
        }
      }
    } catch (error) {
      console.error("Error toggling publish state:", error)
    }
  }

  // Delete a blog post
  const handleDeletePost = async (id: string) => {
    if (!confirm(t("admin.deleteConfirmBlog"))) return

    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setPosts(prev => prev.filter(p => p.id !== id))
        if (selectedPost?.id === id) {
          setIsViewerOpen(false)
        }
      }
    } catch (error) {
      console.error("Error deleting blog post:", error)
    }
  }

  return (
    <div className="space-y-6 flex-grow flex flex-col">
      
      {/* Blog Controls Header Card */}
      <Card>
        <CardContent className="p-5 flex flex-col sm:flex-row items-center gap-4 justify-between select-none">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-orange-500 animate-pulse" />
              {t("admin.contentManagementEngine")}
            </h3>
            <p className="text-[11px] text-zinc-550 dark:text-zinc-400 font-medium leading-relaxed">
              {t("admin.blogsDesc")}
            </p>
          </div>

          <button
            onClick={() => setIsComposerOpen(true)}
            className="inline-flex h-9 items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-xs font-bold text-white px-4 rounded-xl shadow-lg shadow-orange-500/10 transition-all duration-200 cursor-pointer w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            {t("admin.writePost")}
          </button>
        </CardContent>
      </Card>

      {/* Blogs Table Card */}
      <Card className="flex-grow flex flex-col overflow-hidden">
        <CardHeader className="border-b border-zinc-200 dark:border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t("admin.articleIndex")}</CardTitle>
              <CardDescription className="text-zinc-550 dark:text-zinc-400 font-medium mt-1">
                {t("admin.articleIndexDesc")}
              </CardDescription>
            </div>
            <span className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 px-2.5 py-1 rounded-lg text-zinc-550 dark:text-zinc-400 font-bold uppercase">
              {posts.length} {t("admin.postsTotal")}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-grow flex flex-col overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 flex-grow flex-1">
              <svg className="animate-spin h-7 w-7 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-xs text-zinc-500 font-bold font-mono mt-3 animate-pulse">Loading database index...</span>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 flex-grow flex-1 select-none">
              <BookOpen className="h-10 w-10 text-zinc-450 dark:text-zinc-555 mb-3 stroke-1" />
              <h4 className="font-bold text-sm text-zinc-650 dark:text-zinc-400">{t("admin.noBlogPosts")}</h4>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-500 max-w-[240px] mt-1.5 font-medium leading-relaxed">
                Start writing by clicking the "Write Post" button. Your articles will store inside SQLite using Prisma.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[18rem] pl-6">{t("admin.senderName")}</TableHead>
                  <TableHead className="w-[12rem]">{t("admin.urlSlug")}</TableHead>
                  <TableHead className="w-[10rem] text-center">{t("admin.status")}</TableHead>
                  <TableHead className="w-[8rem] text-right pr-6">{t("admin.date")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => {
                  return (
                    <TableRow 
                      key={post.id}
                      onClick={() => {
                        setSelectedPost(post)
                        setIsViewerOpen(true)
                      }}
                      className="cursor-pointer group/row"
                    >
                      {/* Title */}
                      <TableCell className="pl-6 font-semibold text-zinc-800 dark:text-zinc-200 group-hover/row:text-zinc-950 group-hover/row:dark:text-white transition-colors truncate max-w-[17rem]">
                        {post.title}
                      </TableCell>
                      
                      {/* URL Slug */}
                      <TableCell className="font-mono text-xs text-zinc-500 dark:text-zinc-450 max-w-[11rem] truncate font-medium">
                        /{post.slug}
                      </TableCell>
                      
                      {/* Published State Badge */}
                      <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => togglePublish(post)}
                          className={`inline-flex items-center gap-1.5 h-5.5 px-3 rounded-full text-[9px] font-bold font-mono tracking-wider border cursor-pointer select-none transition-all duration-200 ${
                            post.published
                              ? "bg-green-50/10 border-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/15"
                              : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-550 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                          }`}
                        >
                          {post.published ? (
                            <>
                              <Globe className="h-3 w-3" />
                              {t("admin.published")}
                            </>
                          ) : (
                            <>
                              <FileText className="h-3 w-3" />
                              {t("admin.draft")}
                            </>
                          )}
                        </button>
                      </TableCell>
                      
                      {/* Date */}
                      <TableCell className="text-right pr-6 font-mono text-[10px] text-zinc-500">
                        {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Composer Drawer Modal (Create Post) */}
      <Dialog isOpen={isComposerOpen} onClose={() => setIsComposerOpen(false)} className="max-w-md md:max-w-2xl select-none">
        <DialogHeader className="text-left border-b border-zinc-200 dark:border-white/5 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-orange-500" />
            {t("admin.composer")}
          </DialogTitle>
          <DialogDescription className="text-zinc-500 dark:text-zinc-400 font-medium">
            {t("admin.composerDesc")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreatePost} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">{t("admin.blogTitleLabel")}</label>
              <Input
                required
                placeholder="e.g. Building Spatially Aware Systems"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={submitting}
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">{t("admin.coverLabel")}</label>
              <Input
                placeholder="e.g. /images/hero-art.jpg"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                disabled={submitting}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">{t("admin.summaryLabel")}</label>
            <Input
              required
              placeholder="e.g. Meticulous examination of interactive mobile interfaces and haptic radial dials."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              disabled={submitting}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">Tags (Comma-separated)</label>
            <Input
              placeholder="e.g. Design, React, Web"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              disabled={submitting}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/5 pb-2">
              <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                {t("admin.contentLabel")}
              </label>
              
              {/* Tab Selector */}
              <div className="flex gap-1 p-0.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setComposerTab("write")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all duration-200 ${
                    composerTab === "write"
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                  }`}
                >
                  <Edit3 className="h-3 w-3" />
                  Write
                </button>
                <button
                  type="button"
                  onClick={() => setComposerTab("preview")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all duration-200 ${
                    composerTab === "preview"
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                  }`}
                >
                  <Eye className="h-3 w-3" />
                  Live Preview
                </button>
              </div>
            </div>

            {composerTab === "write" ? (
              <div className="space-y-1.5">
                {/* Markdown Editor Helper Toolbar */}
                <div className="flex flex-wrap items-center gap-1 p-1 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 rounded-xl">
                  <button
                    type="button"
                    onClick={() => insertMarkdown("**", "bold text")}
                    className="p-1.5 hover:bg-zinc-150 dark:hover:bg-zinc-800 rounded-lg text-zinc-650 dark:text-zinc-350 cursor-pointer active:scale-95 transition-all"
                    title="Bold"
                  >
                    <Bold className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("*", "italic text")}
                    className="p-1.5 hover:bg-zinc-150 dark:hover:bg-zinc-800 rounded-lg text-zinc-650 dark:text-zinc-350 cursor-pointer active:scale-95 transition-all"
                    title="Italic"
                  >
                    <Italic className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("## ", "Heading 2")}
                    className="p-1.5 hover:bg-zinc-150 dark:hover:bg-zinc-800 rounded-lg text-zinc-650 dark:text-zinc-350 cursor-pointer active:scale-95 transition-all font-mono text-[10px] font-bold"
                    title="H2"
                  >
                    <Heading2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("### ", "Heading 3")}
                    className="p-1.5 hover:bg-zinc-150 dark:hover:bg-zinc-800 rounded-lg text-zinc-650 dark:text-zinc-350 cursor-pointer active:scale-95 transition-all font-mono text-[10px] font-bold"
                    title="H3"
                  >
                    <Heading3 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("> ", "blockquote")}
                    className="p-1.5 hover:bg-zinc-150 dark:hover:bg-zinc-800 rounded-lg text-zinc-650 dark:text-zinc-350 cursor-pointer active:scale-95 transition-all"
                    title="Quote"
                  >
                    <Quote className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("- ", "list item")}
                    className="p-1.5 hover:bg-zinc-150 dark:hover:bg-zinc-800 rounded-lg text-zinc-650 dark:text-zinc-350 cursor-pointer active:scale-95 transition-all"
                    title="List"
                  >
                    <List className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("```", "code block")}
                    className="p-1.5 hover:bg-zinc-150 dark:hover:bg-zinc-800 rounded-lg text-zinc-650 dark:text-zinc-350 cursor-pointer active:scale-95 transition-all"
                    title="Code Block"
                  >
                    <Code className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("link")}
                    className="p-1.5 hover:bg-zinc-150 dark:hover:bg-zinc-800 rounded-lg text-zinc-650 dark:text-zinc-350 cursor-pointer active:scale-95 transition-all"
                    title="Link"
                  >
                    <LinkIcon className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Textarea */}
                <textarea
                  ref={textareaRef}
                  required
                  placeholder="Write your article body content using Markdown..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={submitting}
                  className="w-full min-h-[220px] p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 text-sm text-zinc-850 dark:text-zinc-200 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all font-mono leading-relaxed"
                />
              </div>
            ) : (
              // Live Markdown Render Box
              <div className="w-full min-h-[268px] max-h-[380px] p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 overflow-y-auto text-left select-text">
                <div 
                  className="prose-aent text-zinc-800 dark:text-zinc-200 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: previewHtml || "<i>Nothing to preview yet. Start typing in the Write tab!</i>" }}
                />
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="flex items-center gap-2.5 p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl">
            <input
              type="checkbox"
              id="publish-immed"
              checked={publishImmediately}
              onChange={(e) => setPublishImmediately(e.target.checked)}
              className="h-4.5 w-4.5 rounded border-zinc-200 dark:border-white/10 accent-orange-500 cursor-pointer"
              disabled={submitting}
            />
            <label htmlFor="publish-immed" className="text-xs font-bold text-zinc-700 dark:text-zinc-350 cursor-pointer">
              {t("admin.publishImmed")}
            </label>
          </div>

          {composerError && (
            <div className="text-xs font-semibold text-red-500 bg-red-500/10 p-3 rounded-2xl border border-red-500/20">
              {composerError}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-white/5">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsComposerOpen(false)}
              disabled={submitting}
              className="h-10 rounded-xl cursor-pointer"
            >
              {t("admin.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="h-10 rounded-xl cursor-pointer shadow-lg shadow-orange-500/10 font-bold"
            >
              {submitting ? "..." : t("admin.createPost")}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Details / Content Viewer Dialog (View Blog) */}
      <Dialog isOpen={isViewerOpen} onClose={() => setIsViewerOpen(false)} className="max-w-md md:max-w-2xl select-none">
        {selectedPost && (
          <div className="space-y-6">
            <DialogHeader className="text-left border-b border-zinc-200 dark:border-white/5 pb-4">
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-5.5 w-5.5 text-orange-500" />
                {selectedPost.title}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                  <User className="h-3.5 w-3.5" />
                  <span>By {selectedPost.author}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{new Date(selectedPost.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                  <LinkIcon className="h-3.5 w-3.5" />
                  <span className="font-mono">/{selectedPost.slug}</span>
                </div>
              </div>
            </DialogHeader>

            {/* Excerpt Summary */}
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl">
              <span className="text-[10px] font-bold font-mono tracking-wider text-zinc-450 dark:text-zinc-555 uppercase block mb-1">SUMMARY</span>
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 leading-relaxed">{selectedPost.summary}</p>
            </div>

            {/* Tags preview */}
            {selectedPost.tags && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold font-mono tracking-wider text-zinc-450 dark:text-zinc-555 uppercase block">TAGS</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPost.tags.split(",").map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center text-[10px] font-bold bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-2.5 py-0.5 rounded-full border border-orange-500/10"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Content Body */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold font-mono tracking-wider text-zinc-450 dark:text-zinc-550 uppercase">ARTICLE BODY</span>
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 text-zinc-750 dark:text-zinc-300 text-sm leading-relaxed overflow-y-auto max-h-[220px] whitespace-pre-wrap font-medium">
                {selectedPost.content}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-200 dark:border-white/5">
              {/* Toggle Publish State */}
              <button
                onClick={() => togglePublish(selectedPost)}
                className={`inline-flex h-10 items-center gap-2 text-xs font-bold px-4 rounded-xl border cursor-pointer active:scale-95 transition-all duration-200 ${
                  selectedPost.published
                    ? "bg-green-50/10 border-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/15"
                    : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {selectedPost.published ? (
                  <>
                    <Globe className="h-4 w-4" />
                    {t("admin.unpublish")}
                  </>
                ) : (
                  <>
                    <FileCheck className="h-4 w-4" />
                    {t("admin.publish")}
                  </>
                )}
              </button>

              {/* Delete button */}
              <button
                onClick={() => handleDeletePost(selectedPost.id)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 text-red-500 dark:text-red-400 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                title="Delete Article"
              >
                <Trash2 className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        )}
      </Dialog>

    </div>
  )
}
