"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Icon } from "@/components/ui/Icons"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [formValid, setFormValid] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [error, setError] = useState("")

  const ref = useRef(null)
  const leftColumnRef = useRef(null)
  const rightColumnRef = useRef(null)

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const gsap = window.gsap

      // Animate page header
      gsap.fromTo(
        ".contact-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
      )

      // Animate left column
      gsap.fromTo(
        leftColumnRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
        },
      )

      // Animate right column
      gsap.fromTo(
        rightColumnRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power2.out",
        },
      )
    }
  }, [])

  const validateForm = (data) => {
    const { name, email, message } = data
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    return name.trim() !== "" && emailRegex.test(email) && message.trim() !== ""
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const newFormData = { ...formData, [name]: value }
    setFormData(newFormData)
    setFormValid(validateForm(newFormData))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
      }

      setFormSubmitted(true)
      setFormData({
        name: "",
        email: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      setError(error.message || "Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen pt-28 pb-16 bg-dark relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[30vw] h-[30vw] bg-primary/10 rounded-full filter blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-[20vw] h-[20vw] bg-[#255e45]/20 rounded-full filter blur-[100px] opacity-15"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="contact-header text-center max-w-3xl mx-auto mb-16">
          <h3 className="subheading text-primary mb-4">Contact Us</h3>
          <h1 className="heading-lg text-white mb-6">Make Your Brand Grow</h1>
          <p className="body-text text-white/80">
            Ready to transform your digital presence? Get in touch with our team and let's create content that converts.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Info */}
            <div ref={leftColumnRef} className="p-8 rounded-2xl bg-dark-2 border border-white/5">
              <h2 className="heading-md text-white mb-6">Let&apos;s Connect</h2>
              <p className="body-text text-white/80 mb-8">
                Ready to turn ideas into reality? Fill in the form, and let&apos;s start a conversation about how we can
                help your brand stand out.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-center text-white">
                  <div className="icon-box icon-box-md mr-4">
                    <Icon name="mail" size={20} />
                  </div>
                  <div className="text-lg font-metropolis-medium">brandgains@gmail.com</div>
                </div>

                <div className="flex items-center text-white">
                  <div className="icon-box icon-box-md mr-4">
                    <Icon name="phone" size={20} />
                  </div>
                  <div className="text-lg font-metropolis-medium">
                    +91 9810544923 <span className="text-primary">Vansh Goel</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
                <h3 className="text-primary font-metropolis-bold mb-4">Why Work With Us?</h3>
                <ul className="text-white space-y-3">
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-1">
                      <Icon name="check" size={14} className="text-primary" />
                    </div>
                    <span>Expert team with years of industry experience</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-1">
                      <Icon name="check" size={14} className="text-primary" />
                    </div>
                    <span>Tailored solutions for your specific needs</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-1">
                      <Icon name="check" size={14} className="text-primary" />
                    </div>
                    <span>Quick turnaround times and responsive communication</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-1">
                      <Icon name="check" size={14} className="text-primary" />
                    </div>
                    <span>Proven results that drive engagement and growth</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div ref={rightColumnRef}>
              {formSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center p-8 rounded-2xl bg-dark-2 border border-white/5">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-6">
                    <Icon name="check" size={32} className="text-dark" />
                  </div>
                  <h2 className="heading-md text-white mb-4 text-center">Message Sent!</h2>
                  <p className="body-text text-white/80 text-center mb-8">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                  <Button onClick={() => setFormSubmitted(false)} variant="primary" icon="arrowRight">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-dark-2 border border-white/5">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="form-label">
                        Project Description
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className="form-input resize-none"
                        placeholder="Tell us about your project..."
                        required
                      ></textarea>
                    </div>

                    {error && (
                      <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-lg">{error}</div>
                    )}

                    <Button
                      type="submit"
                      disabled={!formValid || loading}
                      variant={formValid && !loading ? "primary" : "ghost"}
                      fullWidth
                      icon={loading ? "loader" : "arrowRight"}
                      className={!formValid || loading ? "bg-gray-500 text-white/50 cursor-not-allowed" : ""}
                    >
                      {loading ? "Sending..." : "Submit"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
