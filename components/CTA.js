"use client"
import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { BsArrowRight } from "react-icons/bs"
import { FiHeart } from "react-icons/fi"

export default function CTA() {
  const ref = useRef(null)

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const gsap = window.gsap

      // Animate CTA section
      gsap.fromTo(
        ".cta-left",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
          },
        },
      )

      gsap.fromTo(
        ".cta-right",
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
          },
        },
      )
    }
  }, [])

  return (
    <section ref={ref} className="section-padding relative overflow-hidden animate-on-scroll">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="cta-left p-2 bg-primary rounded-3xl">
            <div className="flex flex-col items-center justify-between h-full p-8 md:p-12 bg-dark-2 rounded-2xl gap-6">
              <div>
                <span className="subheading flex items-center justify-center gap-2 text-white">
                  <FiHeart className="text-primary animate-pulse" size={18} />
                  Brand Gains
                </span>
                <h2 className="heading-md mt-6 text-center md:text-start tracking-normal text-white font-monument-black-italic">
                  Make Your Videos <span className="gradient-text">Go Viral</span>
                </h2>
                <p className="body-text mt-4 text-center md:text-start text-white/80">
                  Stop wasting time on videos that don&apos;t work. Let our experts create short-form content that gets
                  results and drives real business growth.
                </p>
              </div>
              <div className="mt-4">
                <Link href="/contact" className="btn-primary">
                  Get Videos You&apos;ll Be Proud Of
                  <BsArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            </div>
          </div>

          <div className="cta-right relative h-[400px] md:h-auto rounded-3xl overflow-hidden">
            <div className="h-full p-2 bg-primary rounded-3xl">
              <div className="relative h-full w-full rounded-2xl overflow-hidden">
                <Image
                  alt="Video editing workspace"
                  src="https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
