"use client"
import { useState, useEffect, createContext } from "react"
import { ThemeProvider } from "@/components/theme-provider"

export const AppContext = createContext({
  cursorType: "default",
  setCursorType: () => {},
})

export function Providers({ children }) {
  const [cursorType, setCursorType] = useState("default")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a simple placeholder to avoid layout shift
    return <div style={{ visibility: "hidden" }}>{children}</div>
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AppContext.Provider value={{ cursorType, setCursorType }}>{children}</AppContext.Provider>
    </ThemeProvider>
  )
}
