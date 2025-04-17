import { cn } from "@/lib/utils"

export const Blob = ({
  color = "primary",
  size = "md",
  position = "top-right",
  opacity = 0.4,
  blur = 120,
  animate = true,
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: "w-[20vw] h-[20vw]",
    md: "w-[30vw] h-[30vw]",
    lg: "w-[40vw] h-[40vw]",
    xl: "w-[50vw] h-[50vw]",
  }

  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-center": "top-0 left-1/4",
    "top-right": "top-0 right-0",
    "center-left": "top-1/4 left-0",
    center: "top-1/4 left-1/4",
    "center-right": "top-1/4 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-center": "bottom-0 left-1/4",
    "bottom-right": "bottom-0 right-0",
  }

  const colorClasses = {
    primary: "bg-primary",
    dark: "bg-dark",
    green: "bg-[#255e45]",
  }

  return (
    <div
      className={cn(
        "blob",
        sizeClasses[size],
        positionClasses[position],
        colorClasses[color],
        animate && "blob-animate",
        className,
      )}
      style={{
        opacity,
        filter: `blur(${blur}px)`,
      }}
      {...props}
    />
  )
}
