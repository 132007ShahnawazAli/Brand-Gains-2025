"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { FaQuoteLeft, FaStar } from "react-icons/fa"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Marketing Director",
    company: "TechVision Inc.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    quote:
      "Brand Gains transformed our social media presence with their exceptional short-form content. Our engagement rates increased by 300% within just two months of working with them.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "CEO",
    company: "Startup Innovate",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    quote:
      "Their team's creativity and attention to detail is unmatched. The videos they produced for our product launch generated over 1 million views and directly contributed to our successful market entry.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    position: "Brand Manager",
    company: "Fashion Forward",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    quote:
      "Working with Brand Gains has been a game-changer for our fashion brand. Their content consistently outperforms our expectations and has helped us connect with our target audience in meaningful ways.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Thompson",
    position: "Digital Marketing Lead",
    company: "Global Solutions",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    quote:
      "The ROI we've seen from Brand Gains' work has been incredible. Their strategic approach to content creation has not only increased our brand awareness but also directly impacted our conversion rates.",
    rating: 4,
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const ref = useRef(null)
  const testimonialRef = useRef(null)

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    // Auto-advance testimonials
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const gsap = window.gsap

      // Animate section header
      gsap.fromTo(
        ".testimonial-header",
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

      // Animate testimonial slide transitions
      if (testimonialRef.current) {
        gsap.fromTo(
          testimonialRef.current,
          {
            opacity: 0,
            x: direction > 0 ? 100 : -100,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
          },
        )
      }
    }
  }, [currentIndex, direction])

  return (
    <section ref={ref} className="section-padding bg-dark relative overflow-hidden animate-on-scroll">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[30vw] h-[30vw] bg-primary/10 rounded-full filter blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-[20vw] h-[20vw] bg-primary/10 rounded-full filter blur-[100px] opacity-10"></div>

      <div className="container mx-auto px-4">
        <div className="testimonial-header text-center max-w-3xl mx-auto mb-16">
          <h3 className="subheading text-primary mb-4">Testimonials</h3>
          <h2 className="heading-lg text-white mb-4">What Our Clients Say</h2>
          <p className="body-text text-white/80">
            Don't just take our word for it. Hear from the brands who've transformed their digital presence with our
            help.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Testimonial Cards */}
            <div className="h-[500px] md:h-[400px] relative overflow-hidden">
              <div ref={testimonialRef} key={currentIndex} className="absolute inset-0">
                <div className="bg-dark-2 rounded-2xl p-8 md:p-12 h-full flex flex-col md:flex-row items-center gap-8 border border-white/5">
                  <div className="md:w-1/3 flex flex-col items-center md:items-start">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/20 mb-6">
                      <Image
                        src={testimonials[currentIndex].image || "/placeholder.svg"}
                        alt={testimonials[currentIndex].name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <h4 className="text-white font-bold text-xl mb-1">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-primary text-sm mb-2">
                        {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
                      </p>
                      <div className="flex items-center justify-center md:justify-start">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={i < testimonials[currentIndex].rating ? "text-primary" : "text-white/20"}
                            size={16}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3 flex flex-col">
                    <FaQuoteLeft className="text-primary/20 text-4xl mb-6" />
                    <p className="text-white/90 text-lg md:text-xl italic font-medium leading-relaxed">
                      "{testimonials[currentIndex].quote}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <div className="flex gap-4">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-full bg-dark-2 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-dark hover:border-primary transition-all duration-300"
                >
                  <BsArrowLeft size={20} />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-full bg-dark-2 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-dark hover:border-primary transition-all duration-300"
                >
                  <BsArrowRight size={20} />
                </button>
              </div>

              {/* Indicators */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1)
                      setCurrentIndex(index)
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentIndex === index ? "bg-primary w-8" : "bg-white/30"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
