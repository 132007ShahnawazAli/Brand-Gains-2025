"use client"
import { useEffect } from "react"
import Hero from "@/components/Hero"
import Marquee from "@/components/Marquee"
import Service from "@/components/Service"
import OurProcess from "@/components/OurProcess"
import CTA from "@/components/CTA"
import FAQ from "@/components/FAQ"
import Testimonials from "@/components/Testimonials"
import WorkShowcase from "@/components/WorkShowcase"
import CustomCursor from "@/components/CustomCursor"

export default function Home() {
  useEffect(() => {
    // Initialize GSAP ScrollTrigger for scroll animations
    if (typeof window !== "undefined" && window.gsap && window.gsap.ScrollTrigger) {
      const gsap = window.gsap
      const ScrollTrigger = window.gsap.ScrollTrigger

      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger)

      // Set up scroll animations for sections
      const sections = document.querySelectorAll(".animate-on-scroll")

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        )
      })

      return () => {
        // Clean up ScrollTrigger instances to prevent memory leaks
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [])

  return (
    <div className="w-full bg-[#021814]">
      <CustomCursor />
      <Hero />
      <Marquee />
      <Service />
      <WorkShowcase />
      <OurProcess />
      <Testimonials />
      <CTA />
      <FAQ />
    </div>
  )
}
