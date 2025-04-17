"use client"
import { useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Blob } from "@/components/ui/Blob"

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark relative overflow-hidden">
      <Blob color="primary" position="top-right" size="lg" blur={120} opacity={0.2} />
      <Blob color="green" position="bottom-left" size="md" blur={100} opacity={0.15} />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-medium text-white mb-6">Something went wrong</h1>

          <p className="text-lg text-white/70 mb-10">
            We apologize for the inconvenience. Please try again or contact our support team if the problem persists.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => reset()} variant="primary">
              Try Again
            </Button>
            <Button href="/" variant="outline">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
