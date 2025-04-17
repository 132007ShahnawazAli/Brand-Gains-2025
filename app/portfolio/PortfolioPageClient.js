"use client"
import { useState, useContext, useEffect, useRef } from "react"
import Image from "next/image"
import { AppContext } from "@/components/Providers"
import CustomCursor from "@/components/CustomCursor"
import PortfolioDetailModal from "@/components/PortfolioDetailModal"
import { Button } from "@/components/ui/Button"
import { Icon } from "@/components/ui/Icons"

// Portfolio data structure
const portfolioItems = [
  {
    id: 1,
    title: "Brand Awareness Campaign",
    type: "EDIT",
    thumbnail: "https://placehold.co/800x600/png?text=Image+here",
    mediaType: "image",
    link: "https://example.com/project1",
    description: "A series of short-form videos designed to increase brand awareness across social media platforms.",
    client: "Fashion Retailer",
    date: "2023",
  },
  {
    id: 2,
    title: "Product Launch Video",
    type: "MOTION",
    thumbnail: "https://placehold.co/800x600/png?text=Product+Launch",
    mediaType: "video",
    videoUrl: "https://cdn.cuberto.com/cb/hello/overview/1.mp4",
    link: "https://example.com/project2",
    description: "Dynamic product reveal with custom motion graphics and sound design.",
    client: "Tech Startup",
    date: "2023",
  },
  {
    id: 3,
    title: "Social Media Series",
    type: "CAMPAIGN",
    thumbnail: "https://placehold.co/800x600/png?text=Social+Media",
    mediaType: "image",
    link: "https://example.com/project3",
    description: "A 12-part series of short videos optimized for Instagram and TikTok engagement.",
    client: "Lifestyle Brand",
    date: "2022",
  },
  {
    id: 4,
    title: "Promotional Content",
    type: "EDIT",
    thumbnail: "https://placehold.co/800x600/png?text=Promotional+Content",
    mediaType: "video",
    videoUrl: "https://cdn.cuberto.com/cb/hello/overview/3.webm",
    link: "https://example.com/project4",
    description: "Fast-paced promotional content with custom transitions and effects.",
    client: "Sports Brand",
    date: "2023",
  },
  {
    id: 5,
    title: "Brand Story",
    type: "NARRATIVE",
    thumbnail: "https://placehold.co/800x600/png?text=Brand+Story",
    mediaType: "image",
    link: "https://example.com/project5",
    description: "Emotional storytelling through a series of connected short-form videos.",
    client: "Non-profit Organization",
    date: "2022",
  },
  {
    id: 6,
    title: "Product Showcase",
    type: "COMMERCIAL",
    thumbnail: "https://placehold.co/800x600/png?text=Product+Showcase",
    mediaType: "video",
    videoUrl: "https://cdn.cuberto.com/cb/hello/overview/1.mp4",
    link: "https://example.com/project6",
    description: "Visually striking product showcase with detailed close-ups and dynamic transitions.",
    client: "Luxury Brand",
    date: "2023",
  },
  {
    id: 7,
    title: "Viral Marketing Campaign",
    type: "CAMPAIGN",
    thumbnail: "https://placehold.co/800x600/png?text=Viral+Marketing",
    mediaType: "image",
    link: "https://example.com/project7",
    description: "Trend-focused content that generated over 2 million views across platforms.",
    client: "Entertainment Company",
    date: "2023",
  },
  {
    id: 8,
    title: "Testimonial Series",
    type: "EDIT",
    thumbnail: "https://placehold.co/800x600/png?text=Testimonial+Series",
    mediaType: "video",
    videoUrl: "https://cdn.cuberto.com/cb/hello/overview/3.webm",
    link: "https://example.com/project8",
    description: "Authentic customer testimonials edited for maximum impact and engagement.",
    client: "Service Provider",
    date: "2022",
  },
  {
    id: 9,
    title: "Event Highlights",
    type: "EDIT",
    thumbnail: "https://placehold.co/800x600/png?text=Event+Highlights",
    mediaType: "image",
    link: "https://example.com/project9",
    description: "Capturing the energy and excitement of a major product launch event.",
    client: "Tech Company",
    date: "2023",
  },
]

// Filter categories
const categories = ["ALL", "EDIT", "MOTION", "CAMPAIGN", "NARRATIVE", "COMMERCIAL"]

export default function PortfolioPageClient() {
  const [activeFilter, setActiveFilter] = useState("ALL")
  const [selectedItem, setSelectedItem] = useState(null)
  const { setCursorType } = useContext(AppContext)
  const portfolioRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const filterRef = useRef(null)
  const gridItemsRef = useRef([])

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const gsap = window.gsap

      // Animate title
      gsap.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })

      // Animate description
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" },
      )

      // Animate filters
      gsap.fromTo(
        filterRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.3,
          ease: "power2.out",
        },
      )

      // Reset grid items ref when filter changes
      gridItemsRef.current = []
    }
  }, [activeFilter])

  // Filter portfolio items based on selected category
  const filteredItems =
    activeFilter === "ALL" ? portfolioItems : portfolioItems.filter((item) => item.type === activeFilter)

  const handleItemClick = (item) => {
    setSelectedItem(item)
  }

  const handleCloseModal = () => {
    setSelectedItem(null)
  }

  // Add items to ref array
  const addToRefs = (el) => {
    if (el && !gridItemsRef.current.includes(el)) {
      gridItemsRef.current.push(el)
    }
  }

  // Animate grid items when they're added to the DOM
  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap && gridItemsRef.current.length > 0) {
      const gsap = window.gsap

      gsap.fromTo(
        gridItemsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
      )
    }
  }, [filteredItems])

  return (
    <main ref={portfolioRef} className="min-h-screen bg-[#021814] pt-24 pb-16 overflow-hidden relative">
      <CustomCursor />

      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[30vw] h-[30vw] bg-primary/10 rounded-full filter blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-[20vw] h-[20vw] bg-[#255e45]/20 rounded-full filter blur-[100px] opacity-15"></div>

      {/* Hero Section */}
      <section className="w-full relative mb-16">
        <div className="container mx-auto px-5 md:px-10">
          <h1 ref={titleRef} className="text-4xl md:text-7xl lg:text-9xl text-white font-black mb-6">
            OUR WORK
          </h1>
          <div ref={descRef} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <p className="text-white text-lg md:text-xl max-w-2xl font-medium">
              We create short-form content that doesn&apos;t just help clients grow their business but also builds an
              engaging presence. Browse our portfolio to see how we&apos;ve helped brands stand out.
            </p>
            <Button href="/contact" variant="primary" icon="arrowRight">
              Let&apos;s Create Together
            </Button>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section ref={filterRef} className="container mx-auto px-5 md:px-10 mb-12">
        <div className="flex flex-wrap gap-4 md:gap-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                activeFilter === category
                  ? "bg-[#bafc50] text-black"
                  : "bg-transparent text-white border border-white/20 hover:border-white/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="container mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              ref={addToRefs}
              className="group relative bg-[#171919] rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => item.mediaType === "video" && setCursorType("video")}
              onMouseLeave={() => setCursorType("default")}
            >
              {/* Media Container */}
              <div className="aspect-[4/3] relative overflow-hidden">
                {item.mediaType === "image" ? (
                  <Image
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 bg-black/30 z-10 group-hover:opacity-0 transition-opacity duration-300"></div>
                    <video src={item.videoUrl} className="w-full h-full object-cover" loop muted playsInline autoPlay />
                  </div>
                )}
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[#bafc50] text-sm font-bold mb-2 block">{item.type}</span>
                    <h3 className="text-white text-xl md:text-2xl font-medium">{item.title}</h3>
                  </div>
                  <div
                    className="bg-[#bafc50] rounded-full p-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(item.link, "_blank")
                    }}
                  >
                    <Icon name="externalLink" className="text-black" size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-5 md:px-10 mt-24">
        <div className="bg-[#171919] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[20vw] h-[20vw] bg-primary/10 rounded-full filter blur-[100px] opacity-20"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h2 className="text-3xl md:text-5xl text-white font-black mb-4">
                Ready to <span className="text-[#bafc50]">Stand Out</span>?
              </h2>
              <p className="text-white/80 font-medium max-w-xl">
                Let&apos;s create content that captures attention and drives results. Our team is ready to help your
                brand shine.
              </p>
            </div>

            <Button href="/contact" variant="primary" size="lg" icon="arrowRight" className="group">
              Start Your Project
            </Button>
          </div>
        </div>
      </section>

      {/* Portfolio Detail Modal */}
      {selectedItem && <PortfolioDetailModal item={selectedItem} onClose={handleCloseModal} />}
    </main>
  )
}
