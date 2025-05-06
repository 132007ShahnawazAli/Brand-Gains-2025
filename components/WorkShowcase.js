"use client"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { BsArrowRight, BsPlay } from "react-icons/bs"
import { FiEye } from "react-icons/fi"

export default function WorkShowcase() {
  const ref = useRef(null)
  const [hoveredItem, setHoveredItem] = useState(null)
  const workItemsRef = useRef([])
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch featured projects
    const fetchFeaturedProjects = async () => {
      try {
        const response = await fetch("/api/projects?featured=true")
        if (response.ok) {
          const data = await response.json()
          setFeaturedProjects(data.data)
        }
      } catch (error) {
        console.error("Error fetching featured projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProjects()
  }, [])

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
  }, [featuredProjects])

  // Add items to ref array
  const addToRefs = (el) => {
    if (el && !workItemsRef.current.includes(el)) {
      workItemsRef.current.push(el)
    }
  }

  // Fallback projects in case no featured projects are available
  const fallbackProjects = [
    {
      id: 1,
      title: "Brand Awareness Campaign",
      type: "EDIT",
      thumbnail: "https://placehold.co/800x600/png?text=Brand+Campaign",
      mediaType: "image",
      description: "A series of short-form videos designed to increase brand awareness across social media platforms.",
      views: 0,
    },
    {
      id: 2,
      title: "Product Launch Video",
      type: "MOTION",
      thumbnail: "https://placehold.co/800x600/png?text=Product+Launch",
      mediaType: "video",
      videoUrl: "https://cdn.cuberto.com/cb/hello/overview/1.mp4",
      description: "Dynamic product reveal with custom motion graphics and sound design.",
      views: 0,
    },
    {
      id: 3,
      title: "Social Media Series",
      type: "CAMPAIGN",
      thumbnail: "https://placehold.co/800x600/png?text=Social+Media",
      mediaType: "image",
      description: "A 12-part series of short videos optimized for Instagram and TikTok engagement.",
      views: 0,
    },
  ]

  // Use featured projects if available, otherwise use fallback
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : fallbackProjects

  // Sort by featuredOrder if they are from the database
  const sortedProjects = [...displayProjects].sort((a, b) => {
    if (a.featuredOrder && b.featuredOrder) {
      return a.featuredOrder - b.featuredOrder
    }
    return 0
  })

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

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-[#bafc50] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="work-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {sortedProjects.map((project) => (
              <div
                key={project._id || project.id}
                ref={addToRefs}
                className="card group"
                onMouseEnter={() => setHoveredItem(project._id || project.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  {project.mediaType === "image" ? (
                    <Image
                      src={project.thumbnail || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full relative cursor-pointer">
                      <div
                        className={`absolute inset-0 bg-black/30 z-10 transition-opacity duration-300 ${
                          hoveredItem === (project._id || project.id) ? "opacity-0" : "opacity-100"
                        }`}
                      ></div>
                      <video
                        src={project.videoUrl}
                        className="w-full h-full object-cover"
                        loop
                        muted
                        playsInline
                        autoPlay={hoveredItem === (project._id || project.id)}
                      />
                      {project.mediaType === "video" && hoveredItem !== (project._id || project.id) && (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center">
                            <BsPlay className="text-dark ml-1" size={32} />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-dark-2/80 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-primary text-xs font-metropolis-bold">{project.type}</span>
                  </div>
                  {project.views > 0 && (
                    <div className="absolute top-4 right-4 bg-dark-2/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <FiEye size={12} className="text-white/70" />
                      <span className="text-white/70 text-xs font-metropolis-medium">{project.views}</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-white text-xl font-monument-regular mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4">{project.description}</p>
                  <Link
                    href={`/portfolio?project=${project._id || project.id}`}
                    className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span className="mr-2 font-metropolis-bold">View Project</span>
                    <BsArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

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
