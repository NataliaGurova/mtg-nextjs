import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// const buttonVariants = cva(
//   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
//   {
//     variants: {
//       variant: {
//         default:
//           "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
//         more: "bg-dark-green text-white hover:bg-light-green hover:scale-105",

//         destructive:
//           "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
//         outline:
//           "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
//         secondary:
//           "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
//         ghost:
//           "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
//         link: "text-primary underline-offset-4 hover:underline",
//       },
//       size: {
//         default: "h-9 px-4 py-2 has-[>svg]:px-3",
//         sm: "h-8 rounded gap-1.5 px-2 has-[>svg]:px-2.5",
//         lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
//         icon: "size-9",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// )

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",

          loadMore:
          "flex px-[10px] py-[6px] rounded-[4px] border border-[#ccc] bg-[#f0f0f0] text-[#333] " +
          "hover:border-[rgb(29,81,5)] hover:bg-[rgb(29,81,5)] hover:text-[rgb(247,250,253)] " +
          "focus:border-[rgb(29,81,5)] focus:bg-[rgb(29,81,5)] focus:text-[rgb(247,250,253)]",
          
        more:
          "flex px-[10px] py-[6px] rounded-[4px] border border-[#ccc] bg-[#f0f0f0] text-[#333] " +
          "bg-dark-green text-white hover:bg-light-green hover:scale-105",

        destructive:
          "bg-destructive text-white hover:bg-destructive/90",

        outline:
          "border bg-background hover:bg-accent hover:text-accent-foreground",

        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",

        ghost:
          "hover:bg-accent hover:text-accent-foreground",

        link:
          "text-primary underline-offset-4 hover:underline",
      },

      size: {
        default: "",
        icon: "size-9",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);


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
