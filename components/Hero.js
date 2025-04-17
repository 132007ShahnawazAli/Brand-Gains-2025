"use client"
import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/Button"

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    // Simple animation with GSAP
    if (typeof window !== "undefined" && window.gsap) {
      const gsap = window.gsap

      gsap.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" },
      )

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power2.out" },
      )

      // Simple parallax effect on mouse move
      const handleMouseMove = (e) => {
        if (!heroRef.current) return

        const { clientX, clientY } = e
        const x = (clientX / window.innerWidth - 0.5) * 20
        const y = (clientY / window.innerHeight - 0.5) * 20

        gsap.to(".hero-blob", {
          x: x,
          y: y,
          duration: 1,
          ease: "power1.out",
        })
      }

      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div ref={heroRef} className="min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="h-screen w-full bg-dark bg-grid relative flex items-center justify-center">
        {/* Background Mask */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        {/* Animated Background Blobs */}
        <div className="absolute inset-0">
          <div className="hero-blob absolute top-0 right-0 w-[30vw] h-[30vw] bg-[#bafc50]/30 rounded-full filter blur-[120px] opacity-30"></div>
          <div className="hero-blob absolute bottom-0 left-0 w-[20vw] h-[20vw] bg-[#255e45]/20 rounded-full filter blur-[100px] opacity-20"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 z-20 flex flex-col justify-center items-center">
          <h1 ref={titleRef} className="heading-xl text-center max-w-5xl opacity-0">
            Expert Marketing & <span className="gradient-text">Short-Form</span>
            <br /> Content Editing Agency
          </h1>

          <p ref={textRef} className="body-text text-center max-w-3xl mt-6 md:mt-8 opacity-0">
            We deliver Short-Form Edits that boost engagement, drive conversions, and build a compelling brand presence
            that resonates with your audience.
          </p>

          <div ref={ctaRef} className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 items-center opacity-0">
            <Button href="/contact" variant="primary" icon="arrowRight">
              Let&apos;s Connect
            </Button>
            <Button href="/portfolio" variant="outline">
              View Our Work
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
