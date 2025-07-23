import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "button-glass inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-[18px] shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary/70",
  {
    variants: {
      variant: {
        default:
          "glow-accent text-white border-none",
        destructive:
          "bg-red-600/80 text-white border-none hover:bg-red-700/90 focus-visible:ring-red-400/60",
        outline:
          "bg-transparent border border-accent-secondary text-accent-secondary hover:bg-accent-secondary/10",
        secondary:
          "bg-accent-secondary/10 text-accent-secondary border-none hover:bg-accent-secondary/20",
        ghost:
          "bg-transparent text-accent-secondary hover:bg-accent-secondary/10",
        link: "bg-transparent text-accent-secondary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-3",
        sm: "h-8 rounded-md gap-1.5 px-3 py-2",
        lg: "h-12 rounded-lg px-8 py-4 text-lg",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
