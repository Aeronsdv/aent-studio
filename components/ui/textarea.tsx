import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-[100px] w-full rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/40 dark:bg-black/10 px-4 py-3 text-sm text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
