import * as React from "react"
import { useLanguage } from "@/context/language-context"
import { Dialog, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useLanguage()
  
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [subject, setSubject] = React.useState("")
  const [message, setMessage] = React.useState("")
  
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)

  // Reset form states on close
  React.useEffect(() => {
    if (!isOpen) {
      // Delay reset so transition finishes
      const timer = setTimeout(() => {
        setName("")
        setEmail("")
        setSubject("")
        setMessage("")
        setIsSuccess(false)
        setErrorMsg(null)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

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
    } catch (err) {
      console.error(err)
      setErrorMsg(err instanceof Error ? err.message : t("contactModal.errorGeneric"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} className="max-w-md md:max-w-lg">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="contact-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <DialogHeader className="text-left">
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-orange-500 animate-pulse" />
                {t("contactModal.title")}
              </DialogTitle>
              <DialogDescription>
                {t("contactModal.subtitle")}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                  {t("contactModal.nameLabel")} <span className="text-orange-500">*</span>
                </label>
                <Input
                  required
                  placeholder={t("contactModal.namePlaceholder")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                  {t("contactModal.emailLabel")} <span className="text-orange-500">*</span>
                </label>
                <Input
                  required
                  type="email"
                  placeholder={t("contactModal.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                  {t("contactModal.subjectLabel")}
                </label>
                <Input
                  placeholder={t("contactModal.subjectPlaceholder")}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                  {t("contactModal.messageLabel")} <span className="text-orange-500">*</span>
                </label>
                <Textarea
                  required
                  placeholder={t("contactModal.messagePlaceholder")}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                  className="min-h-[110px]"
                />
              </div>

              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex items-start gap-2 text-xs font-semibold text-destructive dark:text-red-400 bg-destructive/10 p-3 rounded-2xl border border-destructive/20"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </motion.div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-2xl cursor-pointer hover:shadow-lg dark:shadow-orange-950/20 shadow-orange-500/10 font-semibold"
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
            key="contact-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="flex flex-col items-center text-center py-6 select-none"
          >
            {/* Glowing success circle */}
            <div className="relative mb-5 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-16 w-16 bg-green-500/10 dark:bg-green-500/20 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center relative z-10"
              >
                <CheckCircle className="h-8 w-8" />
              </motion.div>
              <div className="absolute inset-0 bg-green-500/25 blur-xl rounded-full scale-120 animate-pulse" />
            </div>

            <DialogTitle className="text-2xl font-bold tracking-tight mb-2">
              {t("contactModal.successTitle")}
            </DialogTitle>
            
            <DialogDescription className="max-w-sm text-sm text-zinc-555 dark:text-zinc-400 mb-8 font-medium">
              {t("contactModal.successSubtitle")}
            </DialogDescription>

            <Button
              onClick={onClose}
              variant="outline"
              className="w-full max-w-[200px] h-11 rounded-2xl cursor-pointer"
            >
              {t("contactModal.successBtn")}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  )
}
