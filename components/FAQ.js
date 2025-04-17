"use client"
import { useState, useRef, useEffect } from "react"
import { FiPlus, FiMinus } from "react-icons/fi"

const faqData = [
  {
    question: "What types of short-form content do you create?",
    answer:
      "We specialize in creating various types of short-form content including TikTok videos, Instagram Reels, YouTube Shorts, and promotional clips for social media platforms. Our team can handle everything from basic cuts to advanced motion graphics and sound design.",
  },
  {
    question: "How long does it typically take to complete a project?",
    answer:
      "Project timelines vary depending on complexity and scope. Simple edits can be completed in 1-3 days, while more complex projects with motion graphics and custom effects may take 5-7 days. We'll provide you with a specific timeline during our initial consultation.",
  },
  {
    question: "Do you offer packages for ongoing content creation?",
    answer:
      "Yes! We offer monthly packages for businesses that need regular content. These packages include a set number of videos per month at a discounted rate. This is perfect for brands looking to maintain a consistent social media presence.",
  },
  {
    question: "What information do you need from me to get started?",
    answer:
      "To get started, we need to understand your brand, target audience, and content goals. If you have existing footage, we'll need that as well. For new productions, we'll discuss your vision and requirements during our initial consultation.",
  },
  {
    question: "Can you help with content strategy, not just editing?",
    answer:
      "Beyond editing, we offer content strategy services to help you determine what types of videos will resonate with your audience and achieve your marketing goals. We can help plan a content calendar and provide guidance on trends and best practices.",
  },
  {
    question: "Do you offer revisions on completed projects?",
    answer:
      "Yes, all our projects include 2 rounds of revisions to ensure you're completely satisfied with the final product. Additional revision rounds can be arranged at an hourly rate if needed.",
  },
]

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null)
  const ref = useRef(null)
  const faqItemsRef = useRef([])

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const gsap = window.gsap

      // Animate section header
      gsap.fromTo(
        ".faq-header",
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

      // Animate FAQ items with stagger
      gsap.fromTo(
        faqItemsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-list",
            start: "top 75%",
          },
        },
      )
    }
  }, [])

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  // Add items to ref array
  const addToRefs = (el) => {
    if (el && !faqItemsRef.current.includes(el)) {
      faqItemsRef.current.push(el)
    }
  }

  return (
    <section ref={ref} className="section-padding relative overflow-hidden animate-on-scroll">
      <div className="absolute top-0 left-0 w-[30vw] h-[30vw] bg-primary/10 rounded-full filter blur-[120px] opacity-20"></div>

      <div className="container mx-auto px-4">
        <div className="faq-header text-center max-w-3xl mx-auto mb-16">
          <h3 className="subheading text-primary mb-4">FAQ</h3>
          <h2 className="heading-lg text-white mb-4">Frequently Asked Questions</h2>
          <p className="body-text text-white/80">Get answers to common questions about our services and process</p>
        </div>

        <div className="faq-list max-w-3xl mx-auto">
          {faqData.map((faq, index) => (
            <div key={index} ref={addToRefs} className="mb-4">
              <button
                className={`w-full text-left p-6 rounded-xl flex justify-between items-center transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-primary text-dark-2"
                    : "bg-dark-2 text-white hover:bg-dark-3 border border-white/5"
                }`}
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-bold text-lg">{faq.question}</span>
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "bg-dark-2 text-primary" : "bg-primary/10 text-primary"
                  }`}
                >
                  {activeIndex === index ? <FiMinus size={18} /> : <FiPlus size={18} />}
                </div>
              </button>
              <div
                className={`overflow-hidden bg-dark-2 rounded-b-xl border-x border-b border-white/5 transition-all duration-300 ${
                  activeIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6">
                  <p className="text-white/80 font-medium">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
