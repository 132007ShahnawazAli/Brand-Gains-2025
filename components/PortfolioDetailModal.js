"use client"
import { useEffect } from "react"
import Image from "next/image"
import { Icon } from "./ui/Icons"
import { Button } from "./ui/Button"

export default function PortfolioDetailModal({ item, onClose }) {
  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden"

    // Handle escape key press
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEscape)

    // Animate modal with GSAP if available
    if (typeof window !== "undefined" && window.gsap) {
      const gsap = window.gsap

      gsap.fromTo(".modal-overlay", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })

      gsap.fromTo(
        ".modal-content",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
      )
    }

    return () => {
      document.body.style.overflow = "auto"
      window.removeEventListener("keydown", handleEscape)
    }
  }, [onClose])

  if (!item) return null

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="modal-content relative w-full max-w-4xl bg-[#171919] rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-[#bafc50] rounded-full p-2 hover:bg-[#c5ff6b] transition-colors duration-300"
          aria-label="Close modal"
        >
          <Icon name="close" className="text-black" size={20} />
        </button>

        <div>
          {/* Media */}
          <div className="w-full aspect-video relative">
            {item.mediaType === "image" ? (
              <Image src={item.thumbnail || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            ) : (
              <video src={item.videoUrl} className="w-full h-full object-cover" controls autoPlay loop playsInline />
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
              <div>
                <span className="text-[#bafc50] text-sm font-bold mb-2 block">{item.type}</span>
                <h2 className="text-white text-2xl md:text-4xl font-medium">{item.title}</h2>
              </div>

              <Button href={item.link} variant="primary" target="_blank" rel="noopener noreferrer" icon="externalLink">
                View Project
              </Button>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <h3 className="text-[#bafc50] text-sm font-bold mb-2">Client</h3>
                <p className="text-white">{item.client}</p>
              </div>
              <div>
                <h3 className="text-[#bafc50] text-sm font-bold mb-2">Year</h3>
                <p className="text-white">{item.date}</p>
              </div>
              <div>
                <h3 className="text-[#bafc50] text-sm font-bold mb-2">Category</h3>
                <p className="text-white">{item.type}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-[#bafc50] text-sm font-bold mb-2">About the Project</h3>
              <p className="text-white/80 font-medium">{item.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
