import React from "react"
import Link from "next/link"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Icon } from "./Icons"

const buttonVariants = cva(
  "font-metropolis-bold rounded-full transition-all duration-300 inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        primary:
          "bg-[#bafc50] text-[#021814] hover:bg-[#c5ff6b] shadow-[0_4px_20px_rgba(186,252,80,0.3)] hover:shadow-[0_6px_25px_rgba(186,252,80,0.5)] hover:-translate-y-1",
        outline:
          "border-2 border-[#bafc50] text-[#bafc50] hover:bg-[#bafc50] hover:text-[#021814] hover:shadow-[0_6px_25px_rgba(186,252,80,0.3)] hover:-translate-y-1",
        ghost: "bg-white/5 text-white hover:bg-white/10 border border-white/10",
        link: "bg-transparent text-[#bafc50] hover:underline p-0",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        default: "px-6 py-3",
        lg: "px-8 py-4 text-lg",
        icon: "w-10 h-10",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      fullWidth: false,
    },
  },
)

const Button = React.forwardRef(
  ({ className, variant, size, fullWidth, href, children, icon, iconPosition = "right", ...props }, ref) => {
    const content = (
      <>
        {icon && iconPosition === "left" && (
          <span className="mr-2">
            <Icon name={icon} size={size === "sm" ? 16 : size === "lg" ? 20 : 18} />
          </span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className="ml-2">
            <Icon name={icon} size={size === "sm" ? 16 : size === "lg" ? 20 : 18} />
          </span>
        )}
      </>
    )

    if (href) {
      return (
        <Link href={href} className={cn(buttonVariants({ variant, size, fullWidth, className }))} ref={ref} {...props}>
          {content}
        </Link>
      )
    }

    return (
      <button className={cn(buttonVariants({ variant, size, fullWidth, className }))} ref={ref} {...props}>
        {content}
      </button>
    )
  },
)

Button.displayName = "Button"

export { Button, buttonVariants }
