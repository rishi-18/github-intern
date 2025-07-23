import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "bg-[rgba(28,28,32,0.4)] border border-[rgba(255,255,255,0.08)] rounded-md text-primary font-sans text-base px-4 py-2 transition-colors focus-visible:border-accent-secondary focus-visible:ring-2 focus-visible:ring-accent-secondary/40 outline-none placeholder:text-secondary min-h-16 w-full",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
