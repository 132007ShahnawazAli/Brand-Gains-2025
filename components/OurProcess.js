"use client"
import { useRef, useEffect } from "react"
import Link from "next/link"
import { BsArrowRight } from "react-icons/bs"
import { FiSearch, FiTrendingUp, FiUsers, FiCheckCircle } from "react-icons/fi"

const processData = [
  {
    title: "Discovery",
    description: "We listen to your requirements and understand your business needs.",
    icon: <FiSearch size={24} />,
    number: "01",
  },
  {
    title: "Strategy",
    description: "We create a tailored plan that aligns with your goals and target audience.",
    icon: <FiTrendingUp size={24} />,
    number: "02",
  },
  {
    title: "Partnership",
    description: "We establish a collaborative relationship to ensure your vision is realized.",
    icon: <FiUsers size={24} />,
    number: "03",
  },
  {
    title: "Execution",
    description: "We handle everything from production to delivery with precision and care.",
    icon: <FiCheckCircle size={24} />,
    number: "04",
  },
]

export default function OurProcess() {
  const ref = useRef(null)
  const processItemsRef = useRef([])

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const gsap = window.gsap

      // Animate section header
      gsap.fromTo(
        ".process-header",
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

      // Animate process items with stagger
      gsap.fromTo(
        processItemsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".process-grid",
            start: "top 75%",
          },
        },
      )

      // Animate CTA button
      gsap.fromTo(
        ".process-cta",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".process-grid",
            start: "center 75%",
          },
        },
      )
    }
  }, [])

  // Add items to ref array
  const addToRefs = (el) => {
    if (el && !processItemsRef.current.includes(el)) {
      processItemsRef.current.push(el)
    }
  }

  return (
    <section id="process" ref={ref} className="section-padding relative overflow-hidden animate-on-scroll">
      <div className="absolute top-0 right-0 w-[30vw] h-[30vw] bg-primary/10 rounded-full filter blur-[120px] opacity-20"></div>

      <div className="container mx-auto px-4">
        <div className="process-header text-center max-w-3xl mx-auto mb-16">
          <h3 className="subheading text-primary mb-4">Our Process</h3>
          <h2 className="heading-lg text-white mb-6">How We Work</h2>
          <p className="body-text text-white/80">
            We follow a streamlined process designed to deliver exceptional results while making collaboration easy and
            efficient.
          </p>
        </div>

        <div className="process-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {processData.map((item, index) => (
            <div key={index} ref={addToRefs} className="card p-8 border border-white/5 relative">
              <div className="absolute top-[10px] right-[10px] bg-primary text-dark-2 w-10 h-10 rounded-full flex items-center justify-center font-metropolis-bold">
                {item.number}
              </div>
              <div className="icon-box icon-box-lg mb-6">{item.icon}</div>
              <h3 className="heading-sm text-white mb-3">{item.title}</h3>
              <p className="text-white/80">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="process-cta flex justify-center mt-12">
          <Link href="/contact" className="btn-primary">
            Let&apos;s Work Together
            <BsArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
