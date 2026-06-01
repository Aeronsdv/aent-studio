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
  Sparkles, 
  Plus, 
  Trash2, 
  Globe, 
  FileText, 
  Calendar, 
  Link as LinkIcon, 
  ExternalLink,
  Edit,
  Folder,
  FileCheck
} from "lucide-react"

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
  createdAt: string
  updatedAt: string
}

export default function ProjectsManager() {
  const { t, language } = useLanguage()
  const [projects, setProjects] = React.useState<Project[]>([])
  const [loading, setLoading] = React.useState(true)
  
  // Composer state
  const [isComposerOpen, setIsComposerOpen] = React.useState(false)
  const [isEditMode, setIsEditMode] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  
  // Form fields
  const [title, setTitle] = React.useState("")
  const [titleTr, setTitleTr] = React.useState("")
  const [category, setCategory] = React.useState("")
  const [categoryTr, setCategoryTr] = React.useState("")
  const [desc, setDesc] = React.useState("")
  const [descTr, setDescTr] = React.useState("")
  const [bgGradient, setBgGradient] = React.useState("from-blue-600 via-indigo-650 to-cyan-500")
  const [glowColor, setGlowColor] = React.useState("rgba(59, 130, 246, 0.45)")
  const [demoUrl, setDemoUrl] = React.useState("")
  const [githubUrl, setGithubUrl] = React.useState("")
  const [published, setPublished] = React.useState(true)
  
  const [composerError, setComposerError] = React.useState<string | null>(null)
  const [submitting, setSubmitting] = React.useState(false)

  // Details Viewer state
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null)
  const [isViewerOpen, setIsViewerOpen] = React.useState(false)

  // Fetch projects from API
  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/projects")
      const data = await res.json()
      if (res.ok && data.success) {
        setProjects(data.data)
      }
    } catch (error) {
      console.error("Error loading projects:", error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchProjects()
  }, [])

  // Open Composer in Add Mode
  const handleOpenAdd = () => {
    setIsEditMode(false)
    setEditingId(null)
    setTitle("")
    setTitleTr("")
    setCategory("")
    setCategoryTr("")
    setDesc("")
    setDescTr("")
    setBgGradient("from-blue-600 via-indigo-650 to-cyan-500")
    setGlowColor("rgba(59, 130, 246, 0.45)")
    setDemoUrl("")
    setGithubUrl("")
    setPublished(true)
    setComposerError(null)
    setIsComposerOpen(true)
  }

  // Open Composer in Edit Mode
  const handleOpenEdit = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditMode(true)
    setEditingId(project.id)
    setTitle(project.title)
    setTitleTr(project.titleTr)
    setCategory(project.category)
    setCategoryTr(project.categoryTr)
    setDesc(project.desc)
    setDescTr(project.descTr)
    setBgGradient(project.bgGradient)
    setGlowColor(project.glowColor)
    setDemoUrl(project.demoUrl || "")
    setGithubUrl(project.githubUrl || "")
    setPublished(project.published)
    setComposerError(null)
    setIsComposerOpen(true)
  }

  // Create or Update a project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setComposerError(null)

    if (
      !title.trim() || 
      !titleTr.trim() || 
      !category.trim() || 
      !categoryTr.trim() || 
      !desc.trim() || 
      !descTr.trim()
    ) {
      setComposerError(t("admin.errorRequired") || "Required fields are missing.")
      return
    }

    setSubmitting(true)

    const payload = {
      title,
      titleTr,
      category,
      categoryTr,
      desc,
      descTr,
      bgGradient: bgGradient.trim(),
      glowColor: glowColor.trim(),
      demoUrl: demoUrl.trim() || null,
      githubUrl: githubUrl.trim() || null,
      published,
    }

    try {
      const url = "/api/admin/projects"
      const method = isEditMode ? "PATCH" : "POST"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEditMode ? { id: editingId, ...payload } : payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit project.")
      }

      if (isEditMode) {
        setProjects(prev => prev.map(p => p.id === editingId ? data.data : p))
        if (selectedProject?.id === editingId) {
          setSelectedProject(data.data)
        }
      } else {
        setProjects(prev => [data.data, ...prev])
      }

      setIsComposerOpen(false)
    } catch (err: any) {
      console.error(err)
      setComposerError(err.message || "An error occurred.")
    } finally {
      setSubmitting(false)
    }
  }

  // Toggle publication state
  const togglePublish = async (project: Project, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const updatedState = !project.published
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: project.id, published: updatedState }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setProjects(prev => prev.map(p => p.id === project.id ? { ...p, published: updatedState } : p))
        if (selectedProject?.id === project.id) {
          setSelectedProject(prev => prev ? { ...prev, published: updatedState } : null)
        }
      }
    } catch (error) {
      console.error("Error toggling publish state:", error)
    }
  }

  // Delete a project
  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (!confirm(t("admin.deleteConfirmProject") || "Are you sure you want to delete this project?")) return

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setProjects(prev => prev.filter(p => p.id !== id))
        if (selectedProject?.id === id) {
          setIsViewerOpen(false)
        }
      }
    } catch (error) {
      console.error("Error deleting project:", error)
    }
  }

  return (
    <div className="space-y-6 flex-grow flex flex-col">
      
      {/* Controls Header Card */}
      <Card>
        <CardContent className="p-5 flex flex-col sm:flex-row items-center gap-4 justify-between select-none">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-orange-500 animate-pulse" />
              {t("admin.projects")}
            </h3>
            <p className="text-[11px] text-zinc-550 dark:text-zinc-400 font-medium leading-relaxed">
              {t("admin.projectsDesc")}
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex h-9 items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-xs font-bold text-white px-4 rounded-xl shadow-lg shadow-orange-500/10 transition-all duration-200 cursor-pointer w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            {t("admin.createProject")}
          </button>
        </CardContent>
      </Card>

      {/* Projects Table Card */}
      <Card className="flex-grow flex flex-col overflow-hidden">
        <CardHeader className="border-b border-zinc-200 dark:border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{language === "tr" ? "Proje Dizini" : "Projects Index"}</CardTitle>
              <CardDescription className="text-zinc-550 dark:text-zinc-400 font-medium mt-1">
                {language === "tr" ? "Ön yüzde sergilenen göz alıcı tasarımlarınızı buradan yönetin." : "Manage case studies displayed on the public products page."}
              </CardDescription>
            </div>
            <span className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 px-2.5 py-1 rounded-lg text-zinc-550 dark:text-zinc-400 font-bold uppercase">
              {projects.length} {t("admin.projectsTotal")}
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
              <span className="text-xs text-zinc-500 font-bold font-mono mt-3 animate-pulse">Loading project database...</span>
            </div>
          ) : projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 flex-grow flex-1 select-none">
              <Folder className="h-10 w-10 text-zinc-450 dark:text-zinc-555 mb-3 stroke-1" />
              <h4 className="font-bold text-sm text-zinc-650 dark:text-zinc-400">{t("admin.noProjects")}</h4>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-500 max-w-[240px] mt-1.5 font-medium leading-relaxed">
                {t("admin.noProjectsDesc")}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[18rem] pl-6">{t("admin.projectsTitle")}</TableHead>
                  <TableHead className="w-[10rem]">{t("admin.projectsCategory")}</TableHead>
                  <TableHead className="w-[8rem] text-center">{language === "tr" ? "Renk Paleti" : "Color Style"}</TableHead>
                  <TableHead className="w-[8rem] text-center">{t("admin.status")}</TableHead>
                  <TableHead className="w-[8rem] text-right pr-6">{language === "tr" ? "İşlemler" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => {
                  const displayTitle = language === "tr" ? project.titleTr : project.title
                  const displayCategory = language === "tr" ? project.categoryTr : project.category
                  return (
                    <TableRow 
                      key={project.id}
                      onClick={() => {
                        setSelectedProject(project)
                        setIsViewerOpen(true)
                      }}
                      className="cursor-pointer group/row"
                    >
                      {/* Title */}
                      <TableCell className="pl-6 font-semibold text-zinc-800 dark:text-zinc-200 group-hover/row:text-zinc-950 group-hover/row:dark:text-white transition-colors truncate max-w-[17rem]">
                        {displayTitle}
                      </TableCell>
                      
                      {/* Category */}
                      <TableCell className="text-zinc-500 dark:text-zinc-400 font-semibold text-xs truncate max-w-[10rem]">
                        {displayCategory}
                      </TableCell>
                      
                      {/* Gradient Indicator Swatch */}
                      <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-center items-center">
                          <div 
                            className={`h-5 w-16 rounded-full bg-gradient-to-r ${project.bgGradient} border border-black/10 dark:border-white/10`} 
                            style={{ boxShadow: `0 0 10px ${project.glowColor}` }}
                            title={project.bgGradient}
                          />
                        </div>
                      </TableCell>
                      
                      {/* Status */}
                      <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => togglePublish(project)}
                          className={`inline-flex items-center gap-1.5 h-5.5 px-3 rounded-full text-[9px] font-bold font-mono tracking-wider border cursor-pointer select-none transition-all duration-200 ${
                            project.published
                              ? "bg-green-50/10 border-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/15"
                              : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-550 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                          }`}
                        >
                          {project.published ? (
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
                      
                      {/* Actions */}
                      <TableCell className="text-right pr-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => handleOpenEdit(project, e)}
                            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:text-orange-500 transition-colors cursor-pointer"
                            title="Edit Project"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-500 dark:text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Composer Drawer Modal (Create / Edit Project) */}
      <Dialog isOpen={isComposerOpen} onClose={() => setIsComposerOpen(false)} className="max-w-md md:max-w-3xl select-none">
        <DialogHeader className="text-left border-b border-zinc-200 dark:border-white/5 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-orange-500" />
            {isEditMode ? (language === "tr" ? "Projeyi Düzenle" : "Edit Project") : t("admin.composerProject")}
          </DialogTitle>
          <DialogDescription className="text-zinc-500 dark:text-zinc-400 font-medium">
            {t("admin.composerProjectDesc")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Title Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">{t("admin.projectTitleLabel")}</label>
              <Input
                required
                placeholder="e.g. Edebî Haritam"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={submitting}
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">{t("admin.titleTrLabel")}</label>
              <Input
                required
                placeholder="Örn. Edebî Haritam"
                value={titleTr}
                onChange={(e) => setTitleTr(e.target.value)}
                disabled={submitting}
              />
            </div>
          </div>

          {/* Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">{t("admin.categoryLabel")}</label>
              <Input
                required
                placeholder="e.g. Web Platform"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={submitting}
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">{t("admin.categoryTrLabel")}</label>
              <Input
                required
                placeholder="Örn. Web Platformu"
                value={categoryTr}
                onChange={(e) => setCategoryTr(e.target.value)}
                disabled={submitting}
              />
            </div>
          </div>

          {/* Description EN */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">{t("admin.descLabel")}</label>
            <Textarea
              required
              placeholder="Write a clear English description..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              disabled={submitting}
              className="min-h-[70px]"
            />
          </div>

          {/* Description TR */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">{t("admin.descTrLabel")}</label>
            <Textarea
              required
              placeholder="Türkçe açıklama yazın..."
              value={descTr}
              onChange={(e) => setDescTr(e.target.value)}
              disabled={submitting}
              className="min-h-[70px]"
            />
          </div>

          {/* Styling Options Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase flex items-center justify-between">
                <span>{t("admin.gradientLabel")}</span>
                {/* Visual preview dot */}
                <span className={`inline-block h-3.5 w-12 rounded-md bg-gradient-to-r ${bgGradient}`} />
              </label>
              <Input
                required
                placeholder="e.g. from-blue-600 via-indigo-650 to-cyan-500"
                value={bgGradient}
                onChange={(e) => setBgGradient(e.target.value)}
                disabled={submitting}
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase flex items-center justify-between">
                <span>{t("admin.glowColorLabel")}</span>
                <span className="inline-block h-3.5 w-3.5 rounded-full border" style={{ backgroundColor: glowColor }} />
              </label>
              <Input
                required
                placeholder="e.g. rgba(59, 130, 246, 0.45) or #3b82f6"
                value={glowColor}
                onChange={(e) => setGlowColor(e.target.value)}
                disabled={submitting}
              />
            </div>
          </div>

          {/* URLs Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">{t("admin.demoUrlLabel")}</label>
              <Input
                placeholder="e.g. https://myproject.com"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                disabled={submitting}
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">{t("admin.githubUrlLabel")}</label>
              <Input
                placeholder="e.g. https://github.com/myusername/myproject"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                disabled={submitting}
              />
            </div>
          </div>

          {/* Published toggle */}
          <div className="flex items-center gap-2.5 p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl">
            <input
              type="checkbox"
              id="project-published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4.5 w-4.5 rounded border-zinc-200 dark:border-white/10 accent-orange-500 cursor-pointer"
              disabled={submitting}
            />
            <label htmlFor="project-published" className="text-xs font-bold text-zinc-700 dark:text-zinc-350 cursor-pointer select-none">
              {t("admin.publishImmed")}
            </label>
          </div>

          {composerError && (
            <div className="text-xs font-semibold text-red-500 bg-red-500/10 p-3 rounded-2xl border border-red-500/20 animate-shake">
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
              {submitting ? "..." : (isEditMode ? (language === "tr" ? "Değişiklikleri Kaydet" : "Save Changes") : t("admin.createProject"))}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Details Viewer Dialog */}
      <Dialog isOpen={isViewerOpen} onClose={() => setIsViewerOpen(false)} className="max-w-md md:max-w-2xl select-none">
        {selectedProject && (
          <div className="space-y-6">
            <DialogHeader className="text-left border-b border-zinc-200 dark:border-white/5 pb-4">
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <div 
                  className={`h-6 w-6 rounded-full bg-gradient-to-r ${selectedProject.bgGradient} flex-shrink-0`} 
                  style={{ boxShadow: `0 0 12px ${selectedProject.glowColor}` }}
                />
                {language === "tr" ? selectedProject.titleTr : selectedProject.title}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                  <Folder className="h-3.5 w-3.5" />
                  <span className="font-semibold">{language === "tr" ? selectedProject.categoryTr : selectedProject.category}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{new Date(selectedProject.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                  <LinkIcon className="h-3.5 w-3.5" />
                  <span className="font-mono">/products#{selectedProject.slug}</span>
                </div>
              </div>
            </DialogHeader>

            {/* Description Details Card */}
            <div className="space-y-3">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl">
                <span className="text-[9px] font-bold font-mono tracking-wider text-zinc-400 dark:text-zinc-500 uppercase block mb-1">ENGLISH DESCRIPTION</span>
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">{selectedProject.desc}</p>
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl">
                <span className="text-[9px] font-bold font-mono tracking-wider text-zinc-400 dark:text-zinc-500 uppercase block mb-1">TÜRKÇE AÇIKLAMA</span>
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">{selectedProject.descTr}</p>
              </div>
            </div>

            {/* Dynamic Swatch Grid Preview */}
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold font-mono tracking-wider text-zinc-400 dark:text-zinc-500 uppercase block mb-1">GRADIENT STYLING SPEC</span>
                <code className="text-[10px] font-mono font-bold text-orange-500">{selectedProject.bgGradient}</code>
              </div>
              <div 
                className={`h-9 w-28 rounded-xl bg-gradient-to-r ${selectedProject.bgGradient} border border-black/10 dark:border-white/10`} 
                style={{ boxShadow: `0 0 15px ${selectedProject.glowColor}` }}
              />
            </div>

            {/* Links and Actions Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-200 dark:border-white/5">
              {/* Toggle Publish State */}
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => togglePublish(selectedProject, e)}
                  className={`inline-flex h-10 items-center gap-2 text-xs font-bold px-4 rounded-xl border cursor-pointer active:scale-95 transition-all duration-200 ${
                    selectedProject.published
                      ? "bg-green-50/10 border-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/15"
                      : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  {selectedProject.published ? (
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

                {selectedProject.demoUrl && (
                  <a 
                    href={selectedProject.demoUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex h-10 items-center gap-2 text-xs font-bold px-4 rounded-xl border border-zinc-200 dark:border-white/5 hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-350 cursor-pointer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Demo
                  </a>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleOpenEdit(selectedProject, e)}
                  className="inline-flex h-10 items-center gap-2 text-xs font-bold px-4 rounded-xl border border-zinc-200 dark:border-white/5 hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300 active:scale-95 transition-all cursor-pointer"
                >
                  <Edit className="h-4 w-4" />
                  {language === "tr" ? "Düzenle" : "Edit"}
                </button>
                <button
                  onClick={(e) => handleDelete(selectedProject.id, e)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 text-red-500 dark:text-red-400 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                  title="Delete Project"
                >
                  <Trash2 className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </Dialog>

    </div>
  )
}
