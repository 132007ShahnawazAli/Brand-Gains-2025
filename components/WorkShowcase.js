"use client"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { BsArrowRight, BsPlay } from "react-icons/bs"

const featuredWorks = [
  {
    id: 1,
    title: "Brand Awareness Campaign",
    type: "EDIT",
    thumbnail: "https://placehold.co/800x600/png?text=Brand+Campaign",
    mediaType: "image",
    description: "A series of short-form videos designed to increase brand awareness across social media platforms.",
  },
  {
    id: 2,
    title: "Product Launch Video",
    type: "MOTION",
    thumbnail: "https://placehold.co/800x600/png?text=Product+Launch",
    mediaType: "video",
    videoUrl: "https://cdn.cuberto.com/cb/hello/overview/1.mp4",
    description: "Dynamic product reveal with custom motion graphics and sound design.",
  },
  {
    id: 3,
    title: "Social Media Series",
    type: "CAMPAIGN",
    thumbnail: "https://placehold.co/800x600/png?text=Social+Media",
    mediaType: "image",
    description: "A 12-part series of short videos optimized for Instagram and TikTok engagement.",
  },
]

export default function WorkShowcase() {
  const ref = useRef(null)
  const [hoveredItem, setHoveredItem] = useState(null)
  const workItemsRef = useRef([])

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const gsap = window.gsap

      // Animate section header
      gsap.fromTo(
        ".work-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
          },
        },
      )

      // Animate work items with stagger
      gsap.fromTo(
        workItemsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".work-grid",
            start: "top 75%",
          },
        },
      )

      // Animate CTA button
      gsap.fromTo(
        ".work-cta",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".work-grid",
            start: "center 75%",
          },
        },
      )
    }
  }, [])

  // Add items to ref array
  const addToRefs = (el) => {
    if (el && !workItemsRef.current.includes(el)) {
      workItemsRef.current.push(el)
    }
  }

  return (
    <section ref={ref} className="section-padding bg-dark relative overflow-hidden animate-on-scroll">
      <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] bg-primary/10 rounded-full filter blur-[120px] opacity-20"></div>

      <div className="container mx-auto px-4">
        <div className="work-header flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h3 className="subheading text-primary mb-4">Our Portfolio</h3>
            <h2 className="heading-lg text-white">Featured Work</h2>
          </div>
          <p className="body-text text-white/80 max-w-xl">
            Browse our selected projects that showcase our expertise in creating engaging short-form content that drives
            results.
          </p>
        </div>

        <div className="work-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featuredWorks.map((work, index) => (
            <div
              key={work.id}
              ref={addToRefs}
              className="card group"
              onMouseEnter={() => setHoveredItem(work.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                {work.mediaType === "image" ? (
                  <Image
                    src={work.thumbnail || "/placeholder.svg"}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full relative cursor-pointer">
                    <div
                      className={`absolute inset-0 bg-black/30 z-10 transition-opacity duration-300 ${
                        hoveredItem === work.id ? "opacity-0" : "opacity-100"
                      }`}
                    ></div>
                    <video
                      src={work.videoUrl}
                      className="w-full h-full object-cover"
                      loop
                      muted
                      playsInline
                      autoPlay={hoveredItem === work.id}
                    />
                    {work.mediaType === "video" && hoveredItem !== work.id && (
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center">
                          <BsPlay className="text-dark ml-1" size={32} />
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-dark-2/80 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-primary text-xs font-bold">{work.type}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-white text-xl font-normal mb-3 group-hover:text-primary transition-colors duration-300">
                  {work.title}
                </h3>
                <p className="text-white/70 text-sm mb-4">{work.description}</p>
                <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="mr-2 font-bold">View Project</span>
                  <BsArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="work-cta flex justify-center mt-12">
          <Link href="/portfolio" className="btn-outline">
            View All Work
            <BsArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
