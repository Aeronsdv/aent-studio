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
  Calendar, 
  Edit,
  Route,
  CheckCircle2,
  Clock,
  HelpCircle
} from "lucide-react"

interface RoadmapItem {
  id: string
  title: string
  titleTr: string
  description: string
  descriptionTr: string
  quarter: string
  quarterTr: string
  targetDate: string
  status: "PLANNED" | "IN_PROGRESS" | "COMPLETED"
  bgGradient: string
  glowColor: string
  createdAt: string
  updatedAt: string
}

export default function RoadmapManager() {
  const { t, language } = useLanguage()
  const [items, setItems] = React.useState<RoadmapItem[]>([])
  const [loading, setLoading] = React.useState(true)
  
  // Composer state
  const [isComposerOpen, setIsComposerOpen] = React.useState(false)
  const [isEditMode, setIsEditMode] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  
  // Form fields
  const [title, setTitle] = React.useState("")
  const [titleTr, setTitleTr] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [descriptionTr, setDescriptionTr] = React.useState("")
  const [quarter, setQuarter] = React.useState("")
  const [quarterTr, setQuarterTr] = React.useState("")
  const [targetDate, setTargetDate] = React.useState("")
  const [status, setStatus] = React.useState<"PLANNED" | "IN_PROGRESS" | "COMPLETED">("PLANNED")
  const [bgGradient, setBgGradient] = React.useState("from-orange-500 to-amber-500")
  const [glowColor, setGlowColor] = React.useState("rgba(249, 115, 22, 0.4)")
  
  const [composerError, setComposerError] = React.useState<string | null>(null)
  const [submitting, setSubmitting] = React.useState(false)

  // Details Viewer state
  const [selectedItem, setSelectedItem] = React.useState<RoadmapItem | null>(null)
  const [isViewerOpen, setIsViewerOpen] = React.useState(false)

  // Fetch roadmap milestones from API
  const fetchRoadmap = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/roadmap")
      const data = await res.json()
      if (res.ok && data.success) {
        setItems(data.data)
      }
    } catch (error) {
      console.error("Error loading roadmap milestones:", error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchRoadmap()
  }, [])

  // Open Composer in Add Mode
  const handleOpenAdd = () => {
    setIsEditMode(false)
    setEditingId(null)
    setTitle("")
    setTitleTr("")
    setDescription("")
    setDescriptionTr("")
    setQuarter("")
    setQuarterTr("")
    setTargetDate(new Date().toISOString().split("T")[0])
    setStatus("PLANNED")
    setBgGradient("from-orange-500 to-amber-500")
    setGlowColor("rgba(249, 115, 22, 0.4)")
    setComposerError(null)
    setIsComposerOpen(true)
  }

  // Open Composer in Edit Mode
  const handleOpenEdit = (item: RoadmapItem, e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditMode(true)
    setEditingId(item.id)
    setTitle(item.title)
    setTitleTr(item.titleTr)
    setDescription(item.description)
    setDescriptionTr(item.descriptionTr)
    setQuarter(item.quarter)
    setQuarterTr(item.quarterTr)
    setTargetDate(item.targetDate.split("T")[0])
    setStatus(item.status)
    setBgGradient(item.bgGradient)
    setGlowColor(item.glowColor)
    setComposerError(null)
    setIsComposerOpen(true)
  }

  // Create or Update a roadmap item
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setComposerError(null)

    if (
      !title.trim() || 
      !titleTr.trim() || 
      !description.trim() || 
      !descriptionTr.trim() || 
      !quarter.trim() || 
      !quarterTr.trim() || 
      !targetDate.trim()
    ) {
      setComposerError(t("admin.errorRequired") || "Required fields are missing.")
      return
    }

    setSubmitting(true)

    const payload = {
      title,
      titleTr,
      description,
      descriptionTr,
      quarter,
      quarterTr,
      targetDate,
      status,
      bgGradient: bgGradient.trim(),
      glowColor: glowColor.trim(),
    }

    try {
      const url = "/api/admin/roadmap"
      const method = isEditMode ? "PATCH" : "POST"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEditMode ? { id: editingId, ...payload } : payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit roadmap milestone.")
      }

      if (isEditMode) {
        setItems(prev => prev.map(item => item.id === editingId ? data.data : item).sort((a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()))
        if (selectedItem?.id === editingId) {
          setSelectedItem(data.data)
        }
      } else {
        setItems(prev => [...prev, data.data].sort((a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()))
      }

      setIsComposerOpen(false)
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred."
      console.error(err)
      setComposerError(errorMsg)
    } finally {
      setSubmitting(false)
    }
  }

  // Delete a roadmap item
  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (!confirm(t("admin.deleteConfirmRoadmap") || "Are you sure you want to delete this milestone?")) return

    try {
      const res = await fetch(`/api/admin/roadmap?id=${id}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setItems(prev => prev.filter(item => item.id !== id))
        if (selectedItem?.id === id) {
          setIsViewerOpen(false)
        }
      }
    } catch (error) {
      console.error("Error deleting roadmap milestone:", error)
    }
  }

  // Helper to render status badge
  const renderStatusBadge = (statusName: string) => {
    switch (statusName) {
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1.5 h-5.5 px-3 rounded-full text-[9px] font-bold font-mono tracking-wider bg-green-50/10 border border-green-500/20 text-green-600 dark:text-green-400">
            <CheckCircle2 className="h-3 w-3" />
            {language === "tr" ? "Tamamlandı" : "Completed"}
          </span>
        )
      case "IN_PROGRESS":
        return (
          <span className="inline-flex items-center gap-1.5 h-5.5 px-3 rounded-full text-[9px] font-bold font-mono tracking-wider bg-blue-50/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
            <Clock className="h-3 w-3" />
            {language === "tr" ? "Devam Ediyor" : "In Progress"}
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1.5 h-5.5 px-3 rounded-full text-[9px] font-bold font-mono tracking-wider bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-550 dark:text-zinc-400">
            <HelpCircle className="h-3 w-3" />
            {language === "tr" ? "Planlandı" : "Planned"}
          </span>
        )
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
              {t("admin.roadmap")}
            </h3>
            <p className="text-[11px] text-zinc-550 dark:text-zinc-400 font-medium leading-relaxed">
              {t("admin.roadmapDesc")}
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex h-9 items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-xs font-bold text-white px-4 rounded-xl shadow-lg shadow-orange-500/10 transition-all duration-200 cursor-pointer w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            {t("admin.createRoadmap")}
          </button>
        </CardContent>
      </Card>

      {/* Roadmap Items Table Card */}
      <Card className="flex-grow flex flex-col overflow-hidden">
        <CardHeader className="border-b border-zinc-200 dark:border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{language === "tr" ? "Kilometre Taşları Dizini" : "Milestones Index"}</CardTitle>
              <CardDescription className="text-zinc-550 dark:text-zinc-400 font-medium mt-1">
                {language === "tr" ? "Süreç adımlarınızı ve hedeflerinizi buradan yönetin. Tarihe göre kronolojik olarak sıralanacaktır." : "Manage milestones and timeline checkpoints. They sort automatically by target sorting date."}
              </CardDescription>
            </div>
            <span className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 px-2.5 py-1 rounded-lg text-zinc-550 dark:text-zinc-400 font-bold uppercase">
              {items.length} {t("admin.roadmapTotal")}
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
              <span className="text-xs text-zinc-500 font-bold font-mono mt-3 animate-pulse">Loading roadmap index...</span>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 flex-grow flex-1 select-none">
              <Route className="h-10 w-10 text-zinc-450 dark:text-zinc-555 mb-3 stroke-1" />
              <h4 className="font-bold text-sm text-zinc-650 dark:text-zinc-400">{t("admin.noRoadmap")}</h4>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-500 max-w-[240px] mt-1.5 font-medium leading-relaxed">
                {t("admin.noRoadmapDesc")}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[16rem] pl-6">{t("admin.roadmapTitle")}</TableHead>
                  <TableHead className="w-[8rem]">{t("admin.roadmapQuarter")}</TableHead>
                  <TableHead className="w-[10rem] text-center">{t("admin.roadmapStatus")}</TableHead>
                  <TableHead className="w-[8rem] text-center">{language === "tr" ? "Renk" : "Color"}</TableHead>
                  <TableHead className="w-[10rem] text-right pr-6">{language === "tr" ? "İşlemler" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => {
                  const displayTitle = language === "tr" ? item.titleTr : item.title
                  const displayQuarter = language === "tr" ? item.quarterTr : item.quarter
                  return (
                    <TableRow 
                      key={item.id}
                      onClick={() => {
                        setSelectedItem(item)
                        setIsViewerOpen(true)
                      }}
                      className="cursor-pointer group/row"
                    >
                      {/* Title */}
                      <TableCell className="pl-6 font-semibold text-zinc-800 dark:text-zinc-200 group-hover/row:text-zinc-950 group-hover/row:dark:text-white transition-colors truncate max-w-[15rem]">
                        {displayTitle}
                      </TableCell>
                      
                      {/* Quarter */}
                      <TableCell className="text-zinc-500 dark:text-zinc-400 font-mono text-xs font-semibold">
                        {displayQuarter}
                      </TableCell>
                      
                      {/* Status */}
                      <TableCell className="text-center">
                        {renderStatusBadge(item.status)}
                      </TableCell>
                      
                      {/* Indicator Swatch */}
                      <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-center items-center">
                          <div 
                            className={`h-4.5 w-12 rounded-full bg-gradient-to-r ${item.bgGradient}`} 
                            style={{ boxShadow: `0 0 8px ${item.glowColor}` }}
                            title={item.bgGradient}
                          />
                        </div>
                      </TableCell>
                      
                      {/* Actions */}
                      <TableCell className="text-right pr-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => handleOpenEdit(item, e)}
                            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:text-orange-500 transition-colors cursor-pointer"
                            title="Edit Milestone"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-500 dark:text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                            title="Delete Milestone"
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

      {/* Composer Drawer Modal (Create / Edit Milestone) */}
      <Dialog isOpen={isComposerOpen} onClose={() => setIsComposerOpen(false)} className="max-w-md md:max-w-3xl select-none">
        <DialogHeader className="text-left border-b border-zinc-200 dark:border-white/5 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-orange-500" />
            {isEditMode ? (language === "tr" ? "Dönüm Noktasını Düzenle" : "Edit Milestone") : t("admin.composerRoadmap")}
          </DialogTitle>
          <DialogDescription className="text-zinc-500 dark:text-zinc-400 font-medium">
            {t("admin.composerRoadmapDesc")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Title Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">Milestone Title (EN) *</label>
              <Input
                required
                placeholder="e.g. WebGL & 3D Interactive Assets"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={submitting}
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">Dönüm Noktası Başlığı (TR) *</label>
              <Input
                required
                placeholder="Örn. WebGL & 3D İnteraktif Varlıklar"
                value={titleTr}
                onChange={(e) => setTitleTr(e.target.value)}
                disabled={submitting}
              />
            </div>
          </div>

          {/* Quarter Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">{t("admin.quarterLabel")}</label>
              <Input
                required
                placeholder="e.g. Q3 2026"
                value={quarter}
                onChange={(e) => setQuarter(e.target.value)}
                disabled={submitting}
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">{t("admin.quarterTrLabel")}</label>
              <Input
                required
                placeholder="Örn. 3. Çeyrek 2026"
                value={quarterTr}
                onChange={(e) => setQuarterTr(e.target.value)}
                disabled={submitting}
              />
            </div>
          </div>

          {/* Target Date & Status Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">{t("admin.targetDateLabel")}</label>
              <Input
                type="date"
                required
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                disabled={submitting}
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">{t("admin.statusLabel")}</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "PLANNED" | "IN_PROGRESS" | "COMPLETED")}
                disabled={submitting}
                className="flex h-10 w-full rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 px-3.5 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium text-foreground outline-none focus:border-orange-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all font-semibold"
              >
                <option value="PLANNED">{language === "tr" ? "Planlandı" : "Planned"}</option>
                <option value="IN_PROGRESS">{language === "tr" ? "Devam Ediyor" : "In Progress"}</option>
                <option value="COMPLETED">{language === "tr" ? "Tamamlandı" : "Completed"}</option>
              </select>
            </div>
          </div>

          {/* Description EN */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">Short Description (EN) *</label>
            <Textarea
              required
              placeholder="Provide an English description of the milestone sprint..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={submitting}
              className="min-h-[60px]"
            />
          </div>

          {/* Description TR */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">Kısa Açıklama (TR) *</label>
            <Textarea
              required
              placeholder="Kilometre taşının hedeflerini özetleyen Türkçe açıklama yazın..."
              value={descriptionTr}
              onChange={(e) => setDescriptionTr(e.target.value)}
              disabled={submitting}
              className="min-h-[60px]"
            />
          </div>

          {/* Styling Options Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase flex items-center justify-between">
                <span>{t("admin.gradientLabel")}</span>
                <span className={`inline-block h-3.5 w-12 rounded-md bg-gradient-to-r ${bgGradient}`} />
              </label>
              <Input
                required
                placeholder="e.g. from-orange-500 via-pink-500 to-rose-600"
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
                placeholder="e.g. rgba(249, 115, 22, 0.45)"
                value={glowColor}
                onChange={(e) => setGlowColor(e.target.value)}
                disabled={submitting}
              />
            </div>
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
              {submitting ? "..." : (isEditMode ? (language === "tr" ? "Kaydet" : "Save Changes") : (language === "tr" ? "Ekle" : "Add Milestone"))}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Details Viewer Dialog */}
      <Dialog isOpen={isViewerOpen} onClose={() => setIsViewerOpen(false)} className="max-w-md md:max-w-2xl select-none">
        {selectedItem && (
          <div className="space-y-6">
            <DialogHeader className="text-left border-b border-zinc-200 dark:border-white/5 pb-4">
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <div 
                  className={`h-6 w-6 rounded-full bg-gradient-to-r ${selectedItem.bgGradient} flex-shrink-0`} 
                  style={{ boxShadow: `0 0 12px ${selectedItem.glowColor}` }}
                />
                {language === "tr" ? selectedItem.titleTr : selectedItem.title}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                  <Route className="h-3.5 w-3.5" />
                  <span className="font-semibold">{language === "tr" ? selectedItem.quarterTr : selectedItem.quarter}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Target Date: {new Date(selectedItem.targetDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
              </div>
            </DialogHeader>

            {/* Status Indicator */}
            <div className="flex items-center justify-between p-3.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-350">Status:</span>
              {renderStatusBadge(selectedItem.status)}
            </div>

            {/* Description Details Card */}
            <div className="space-y-3">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl">
                <span className="text-[9px] font-bold font-mono tracking-wider text-zinc-400 dark:text-zinc-500 uppercase block mb-1">ENGLISH DESCRIPTION</span>
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">{selectedItem.description}</p>
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl">
                <span className="text-[9px] font-bold font-mono tracking-wider text-zinc-400 dark:text-zinc-500 uppercase block mb-1">TÜRKÇE AÇIKLAMA</span>
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">{selectedItem.descriptionTr}</p>
              </div>
            </div>

            {/* Dynamic Swatch Grid Preview */}
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold font-mono tracking-wider text-zinc-400 dark:text-zinc-500 uppercase block mb-1">GRADIENT STYLING SPEC</span>
                <code className="text-[10px] font-mono font-bold text-orange-500">{selectedItem.bgGradient}</code>
              </div>
              <div 
                className={`h-9 w-28 rounded-xl bg-gradient-to-r ${selectedItem.bgGradient} border border-black/10 dark:border-white/10`} 
                style={{ boxShadow: `0 0 15px ${selectedItem.glowColor}` }}
              />
            </div>

            {/* Actions Footer */}
            <div className="flex flex-wrap items-center justify-end gap-2.5 pt-4 border-t border-zinc-200 dark:border-white/5">
              <button
                onClick={(e) => handleOpenEdit(selectedItem, e)}
                className="inline-flex h-10 items-center gap-2 text-xs font-bold px-4 rounded-xl border border-zinc-200 dark:border-white/5 hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300 active:scale-95 transition-all cursor-pointer"
              >
                <Edit className="h-4 w-4" />
                {language === "tr" ? "Düzenle" : "Edit"}
              </button>
              <button
                onClick={(e) => handleDelete(selectedItem.id, e)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 text-red-500 dark:text-red-400 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                title="Delete Milestone"
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
