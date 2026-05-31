"use client"
import * as React from "react"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { 
  Search, 
  Trash2, 
  Archive, 
  User, 
  Mail, 
  Calendar, 
  Inbox, 
  Eye, 
  Sparkles,
  Reply
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: "UNREAD" | "READ" | "ARCHIVED"
  createdAt: string
}

export default function ContactsManager() {
  const { t, language } = useLanguage()
  const [contacts, setContacts] = React.useState<Contact[]>([])
  const [loading, setLoading] = React.useState(true)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string>("ALL")
  
  // Dialog modal states
  const [selectedContact, setSelectedContact] = React.useState<Contact | null>(null)
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)

  // Fetch contacts from admin API based on search and filters
  const fetchContacts = React.useCallback(async () => {
    setLoading(true)
    try {
      const url = `/api/admin/contacts?status=${statusFilter}&q=${encodeURIComponent(searchTerm)}`
      const res = await fetch(url)
      const data = await res.json()
      if (res.ok && data.success) {
        setContacts(data.data)
      }
    } catch (error) {
      console.error("Error loading contacts:", error)
    } finally {
      setLoading(false)
    }
  }, [statusFilter, searchTerm])

  React.useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  // Handle status update of a message (UNREAD -> READ -> ARCHIVED)
  const updateStatus = async (id: string, newStatus: "UNREAD" | "READ" | "ARCHIVED") => {
    try {
      const res = await fetch("/api/admin/contacts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        // Update local state
        setContacts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c))
        if (selectedContact && selectedContact.id === id) {
          setSelectedContact(prev => prev ? { ...prev, status: newStatus } : null)
        }
      }
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  // Handle contact submission deletion
  const deleteContact = async (id: string) => {
    if (!confirm(t("admin.deleteConfirm"))) return
    
    try {
      const res = await fetch(`/api/admin/contacts?id=${id}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setContacts(prev => prev.filter(c => c.id !== id))
        if (selectedContact?.id === id) {
          setIsDetailOpen(false)
        }
      }
    } catch (error) {
      console.error("Error deleting contact request:", error)
    }
  }

  const handleRowClick = (contact: Contact) => {
    setSelectedContact(contact)
    setIsDetailOpen(true)
    // Automatically mark as READ if currently UNREAD upon viewing
    if (contact.status === "UNREAD") {
      updateStatus(contact.id, "READ")
    }
  }

  const filters = [
    { label: t("admin.allInbox"), value: "ALL" },
    { label: t("admin.unread"), value: "UNREAD" },
    { label: t("admin.read"), value: "READ" },
    { label: t("admin.archived"), value: "ARCHIVED" },
  ]

  return (
    <div className="space-y-6 flex-1 flex flex-col">
      
      {/* Search and Filters Controller Card */}
      <Card>
        <CardContent className="p-5 flex flex-col md:flex-row items-center gap-4 justify-between select-none">
          {/* Status filter buttons */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {filters.map((filter) => {
              const isActive = statusFilter === filter.value
              return (
                <button
                  key={filter.value}
                  onClick={() => setStatusFilter(filter.value)}
                  className={`h-9 px-4 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/10" 
                      : "bg-zinc-100/50 hover:bg-zinc-200 dark:bg-white/2 dark:hover:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-zinc-200 dark:border-white/5"
                  }`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <Input
              type="text"
              placeholder={t("admin.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 rounded-xl"
            />
          </div>
        </CardContent>
      </Card>

      {/* Main Inbox Card Container */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="border-b border-zinc-200 dark:border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t("admin.messages")}</CardTitle>
              <CardDescription className="text-zinc-550 dark:text-zinc-400 font-medium mt-1">
                {t("admin.messagesDesc")}
              </CardDescription>
            </div>
            <span className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 px-2.5 py-1 rounded-lg text-zinc-550 dark:text-zinc-400 font-bold uppercase">
              {contacts.length} {t("admin.messagesFound")}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-grow flex flex-col justify-between overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 flex-grow flex-1">
              <svg className="animate-spin h-7 w-7 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-xs text-zinc-500 font-bold font-mono mt-3 animate-pulse">Loading Inbox...</span>
            </div>
          ) : contacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 flex-grow flex-1 select-none">
              <Inbox className="h-10 w-10 text-zinc-450 dark:text-zinc-550 mb-3 stroke-1" />
              <h4 className="font-bold text-sm text-zinc-650 dark:text-zinc-400">{t("admin.noMessages")}</h4>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-500 max-w-[240px] mt-1.5 font-medium leading-relaxed">
                {t("admin.noMessagesDesc")}
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-between">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-48 pl-6">{t("admin.sender")}</TableHead>
                    <TableHead className="w-52">{t("admin.subject")}</TableHead>
                    <TableHead>{t("admin.messagePreview")}</TableHead>
                    <TableHead className="w-36 text-center">{t("admin.status")}</TableHead>
                    <TableHead className="w-36 text-right pr-6">{t("admin.date")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => {
                    const isUnread = contact.status === "UNREAD"
                    return (
                      <TableRow 
                        key={contact.id} 
                        onClick={() => handleRowClick(contact)}
                        className={`cursor-pointer group/row ${isUnread ? "bg-orange-500/[0.01] hover:bg-orange-500/[0.03]" : ""}`}
                      >
                        {/* Sender details */}
                        <TableCell className="pl-6 font-semibold text-zinc-800 dark:text-zinc-200 group-hover/row:text-zinc-950 dark:group-hover/row:text-white transition-colors max-w-[12rem] truncate">
                          <div className="flex items-center gap-2">
                            {isUnread && (
                              <span className="h-2 w-2 rounded-full bg-red-500 shrink-0 animate-pulse" />
                            )}
                            <span className="truncate">{contact.name}</span>
                          </div>
                        </TableCell>
                        
                        {/* Subject */}
                        <TableCell className={`max-w-[13rem] truncate ${isUnread ? "font-bold text-zinc-900 dark:text-zinc-100" : "text-zinc-550 dark:text-zinc-450 font-medium"}`}>
                          {contact.subject}
                        </TableCell>
                        
                        {/* Message Preview */}
                        <TableCell className="text-zinc-550 dark:text-zinc-400 font-medium max-w-[20rem] truncate">
                          {contact.message}
                        </TableCell>
                        
                        {/* Status Badge */}
                        <TableCell className="text-center">
                          <span className={`inline-flex items-center justify-center h-5.5 px-2.5 rounded-full text-[9px] font-bold font-mono tracking-wider border ${
                            contact.status === "UNREAD" 
                              ? "bg-red-500/10 border-red-500/20 text-red-500 dark:text-red-400" 
                              : contact.status === "READ"
                              ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                              : "bg-purple-500/10 border-purple-500/20 text-purple-650 dark:text-purple-400"
                          }`}>
                            {t(`admin.${contact.status.toLowerCase()}`)}
                          </span>
                        </TableCell>
                        
                        {/* Date */}
                        <TableCell className="text-right pr-6 font-mono text-[10px] text-zinc-500 dark:text-zinc-500">
                          {new Date(contact.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Message Details slide-out modal / dialog drawer */}
      <Dialog isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} className="max-w-md md:max-w-xl">
        {selectedContact && (
          <div className="space-y-6">
            <DialogHeader className="text-left border-b border-zinc-200 dark:border-white/5 pb-4">
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-orange-500" />
                {t("admin.messageDetails")}
              </DialogTitle>
              <DialogDescription className="text-zinc-500 dark:text-zinc-400 font-medium">
                {t("admin.reviewCredentials")}
              </DialogDescription>
            </DialogHeader>

            {/* Sender and Metadata Information Card */}
            <div className="space-y-3.5 p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 rounded-2xl">
              <div className="flex items-start gap-3">
                <User className="h-4.5 w-4.5 text-zinc-500 dark:text-zinc-450 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold font-mono tracking-wider text-zinc-450 dark:text-zinc-550 uppercase">{t("admin.senderName")}</span>
                  <h4 className="font-bold text-sm text-zinc-850 dark:text-white">{selectedContact.name}</h4>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-4.5 w-4.5 text-zinc-500 dark:text-zinc-450 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold font-mono tracking-wider text-zinc-450 dark:text-zinc-555 uppercase">{t("admin.emailAddress")}</span>
                  <a href={`mailto:${selectedContact.email}`} className="font-bold text-sm text-orange-650 dark:text-orange-400 hover:underline block transition-all">
                    {selectedContact.email}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-4.5 w-4.5 text-zinc-500 dark:text-zinc-450 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold font-mono tracking-wider text-zinc-450 dark:text-zinc-555 uppercase">{t("admin.submittedAt")}</span>
                    <h5 className="font-semibold text-xs text-zinc-700 dark:text-zinc-300">
                      {new Date(selectedContact.createdAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </h5>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Eye className="h-4.5 w-4.5 text-zinc-500 dark:text-zinc-450 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold font-mono tracking-wider text-zinc-450 dark:text-zinc-555 uppercase">{t("admin.statusState")}</span>
                    <div className="mt-0.5">
                      <span className={`inline-flex h-4 px-2.5 items-center justify-center rounded-full text-[8px] font-bold font-mono tracking-wider border ${
                        selectedContact.status === "UNREAD" 
                          ? "bg-red-500/10 border-red-500/20 text-red-500 dark:text-red-400" 
                          : selectedContact.status === "READ"
                          ? "bg-zinc-150 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-650 dark:text-zinc-400"
                          : "bg-purple-500/10 border-purple-500/20 text-purple-650 dark:text-purple-400"
                      }`}>
                        {t(`admin.${selectedContact.status.toLowerCase()}`)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Content */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold font-mono tracking-wider text-zinc-450 dark:text-zinc-500 uppercase">{t("admin.messageBody")}: "{selectedContact.subject}"</span>
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 text-zinc-750 dark:text-zinc-300 text-sm leading-relaxed overflow-auto max-h-[160px] whitespace-pre-wrap font-medium">
                {selectedContact.message}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-200 dark:border-white/5">
              {/* Quick Reply Button */}
              <a 
                href={`mailto:${selectedContact.email}?subject=Re: ${encodeURIComponent(selectedContact.subject)}`}
                className="inline-flex h-10 items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-xs font-bold text-white px-4 rounded-xl shadow-md shadow-orange-500/10 hover:scale-105 active:scale-95 transition-all duration-205 cursor-pointer"
              >
                <Reply className="h-4 w-4" />
                {t("admin.quickReply")}
              </a>

              {/* Status toggles & Delete */}
              <div className="flex items-center gap-2">
                {selectedContact.status !== "ARCHIVED" ? (
                  <button
                    onClick={() => updateStatus(selectedContact.id, "ARCHIVED")}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 hover:bg-purple-500/25 border border-purple-500/20 text-purple-650 dark:text-purple-400 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                    title={t("admin.archived")}
                  >
                    <Archive className="h-4.5 w-4.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => updateStatus(selectedContact.id, "READ")}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-750 border border-zinc-200 dark:border-white/5 text-zinc-600 dark:text-zinc-400 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                    title={t("admin.inbox")}
                  >
                    <Inbox className="h-4.5 w-4.5" />
                  </button>
                )}

                <button
                  onClick={() => deleteContact(selectedContact.id)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 text-red-500 dark:text-red-400 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                  title="Delete Submission"
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
