"use client"
import { useContext, useEffect, useRef } from "react"
import { AppContext } from "./Providers"
import { Icon } from "./ui/Icons"

export default function CustomCursor() {
  const { cursorType } = useContext(AppContext)
  const cursorRef = useRef(null)

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return

    // Check if we're on a touch device - disable custom cursor
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      return
    }

    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        // Use requestAnimationFrame for smoother performance
        requestAnimationFrame(() => {
          cursorRef.current.style.left = `${e.clientX}px`
          cursorRef.current.style.top = `${e.clientY}px`
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Don't render on touch devices
  if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    return null
  }

  return (
    <div
      ref={cursorRef}
      className={`fixed w-20 h-20 rounded-full bg-[#bafc50] flex items-center justify-center z-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
        cursorType === "video" ? "opacity-100" : "opacity-0"
      }`}
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <Icon name="play" className="text-black" size={24} />
    </div>
  )
}
