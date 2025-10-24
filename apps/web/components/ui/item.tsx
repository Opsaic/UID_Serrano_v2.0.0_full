"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const itemVariants = cva("flex items-center gap-2", {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const Item = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof itemVariants> & { asChild?: boolean }
>(({ className, variant, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"
  return <Comp ref={ref} className={cn(itemVariants({ variant, className }))} {...props} />
})
Item.displayName = "Item"

const ItemIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return <Comp ref={ref} className={cn("flex items-center justify-center", className)} {...props} />
  },
)
ItemIcon.displayName = "ItemIcon"

const ItemText = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex-1", className)} {...props} />,
)
ItemText.displayName = "ItemText"

export { Item, ItemIcon, ItemText, itemVariants }
