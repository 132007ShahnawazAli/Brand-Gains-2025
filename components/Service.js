"use client"
import { useRef, useEffect } from "react"
import { BsArrowRight } from "react-icons/bs"
import { FiEdit, FiLayers, FiSliders, FiVideo, FiMusic, FiType, FiDroplet } from "react-icons/fi"

const serviceData = [
  {
    name: "Basic Cuts",
    route: "/#services",
    image: "https://placehold.co/800x600/png?text=Basic+Cuts",
    description: "Clean, simple edits that highlight your content's core message.",
    icon: <FiEdit size={24} />,
  },
  {
    name: "Advanced Cuts",
    route: "/#services",
    image: "https://placehold.co/800x600/png?text=Advanced+Cuts",
    description: "Complex editing techniques that create dynamic, engaging content.",
    icon: <FiLayers size={24} />,
  },
  {
    name: "Transitions",
    route: "/#services",
    image: "https://placehold.co/800x600/png?text=Transitions",
    description: "Smooth, creative transitions that keep viewers engaged.",
    icon: <FiSliders size={24} />,
  },
  {
    name: "Motion Graphics",
    route: "/#services",
    image: "https://placehold.co/800x600/png?text=Motion+Graphics",
    description: "Eye-catching animations that enhance your brand's visual appeal.",
    icon: <FiVideo size={24} />,
  },
  {
    name: "Color Grading",
    route: "/#services",
    image: "https://placehold.co/800x600/png?text=Color+Grading",
    description: "Professional color enhancement that sets the perfect mood.",
    icon: <FiDroplet size={24} />,
  },
  {
    name: "Sound Design",
    route: "/#services",
    image: "https://placehold.co/800x600/png?text=Sound+Design",
    description: "Custom audio elements that create an immersive experience.",
    icon: <FiMusic size={24} />,
  },
  {
    name: "Audio Mixing",
    route: "/#services",
    image: "https://placehold.co/800x600/png?text=Audio+Mixing",
    description: "Balanced, clear audio that ensures your message is heard.",
    icon: <FiMusic size={24} />,
  },
  {
    name: "Text Overlays",
    route: "/#services",
    image: "https://placehold.co/800x600/png?text=Text+Overlays",
    description: "Strategic text placement that reinforces your key points.",
    icon: <FiType size={24} />,
  },
]

export default function Service() {
  const sectionRef = useRef(null)
  const serviceCardsRef = useRef([])

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const gsap = window.gsap

      // Animate section title and description
      gsap.fromTo(
        ".service-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      )

      // Animate service cards with stagger
      gsap.fromTo(
        serviceCardsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".service-grid",
            start: "top 75%",
          },
        },
      )
    }
  }, [])

  // Add cards to ref array
  const addToRefs = (el) => {
    if (el && !serviceCardsRef.current.includes(el)) {
      serviceCardsRef.current.push(el)
    }
  }

  return (
    <section id="services" ref={sectionRef} className="section-padding relative overflow-hidden animate-on-scroll">
      <div className="absolute top-0 right-0 w-[30vw] h-[30vw] bg-primary/10 rounded-full filter blur-[120px] opacity-20"></div>

      <div className="container mx-auto px-4">
        <div className="service-header mb-16">
          <h3 className="subheading text-primary mb-4">Our Services</h3>
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <h2 className="heading-lg text-white">
              What <span className="gradient-text">Services</span>
              <br /> We&apos;re Offering
            </h2>
            <p className="body-text text-white/80 max-w-lg">
              We specialize in creating short-form content that drives engagement and conversions. Our services are
              designed to help your brand stand out in today's crowded digital landscape.
            </p>
          </div>
        </div>

        {/* Desktop View */}
        <div className="service-grid hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceData.map((service, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="card group p-6 hover:border-primary/30 border border-transparent"
            >
              <div className="icon-box icon-box-lg mb-6 group-hover:bg-primary group-hover:text-dark-2">
                {service.icon}
              </div>
              <h3 className="heading-sm text-white mb-3 group-hover:text-primary transition-colors duration-300">
                {service.name}
              </h3>
              <p className="text-white/70 mb-6">{service.description}</p>
              <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="mr-2 font-bold">Learn More</span>
                <BsArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <div className="space-y-4">
            {serviceData.map((service, index) => (
              <div key={index} ref={addToRefs} className="bg-dark-2 rounded-xl p-4 flex items-center">
                <div className="icon-box icon-box-md mr-4 flex-shrink-0">{service.icon}</div>
                <div>
                  <h3 className="font-normal text-lg text-white">{service.name}</h3>
                  <p className="text-white/70 text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
