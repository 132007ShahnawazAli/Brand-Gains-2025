"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Icon } from "@/components/ui/Icons"
import Logo from "./Logo"
import { transitions } from "@/utils/animation"

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About Us", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Process", href: "/#process" },
    { name: "Contact", href: "/contact" },
  ]

  const socialLinks = [
    { icon: "instagram", href: "https://www.instagram.com/brandgains/" },
    { icon: "twitter", href: "https://x.com/Brand_Gains" },
    { icon: "facebook", href: "https://www.facebook.com/profile.php?id=61554325564900" },
    { icon: "linkedin", href: "https://www.linkedin.com/in/brandgains/" },
  ]

  return (
    <footer ref={ref} className="w-full font-medium bg-dark-2 border-t border-white/5">
      <div className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: transitions.easeOut }}
            >
              <Logo size="default" className="mb-6" />
              <p className="text-white/70 mb-6">
                We deliver Short-Form Edits that boost engagement, drive conversions, and build a compelling brand
                presence.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-box icon-box-sm"
                  >
                    <Icon name={link.icon} size={18} />
                  </Link>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.1, ease: transitions.easeOut }}
            >
              <h3 className="text-white font-medium text-xl mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-primary transition-colors duration-300 flex items-center"
                    >
                      <span className="mr-2 text-primary">•</span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: transitions.easeOut }}
            >
              <h3 className="text-white font-medium text-xl mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Icon name="mail" className="text-primary mt-1 mr-3" size={18} />
                  <a
                    href="mailto:brandgains@gmail.com"
                    className="text-white/70 hover:text-primary transition-colors duration-300"
                  >
                    brandgains@gmail.com
                  </a>
                </li>
                <li className="flex items-start">
                  <Icon name="phone" className="text-primary mt-1 mr-3" size={18} />
                  <a
                    href="tel:+919810544923"
                    className="text-white/70 hover:text-primary transition-colors duration-300"
                  >
                    +91 9810544923 <span className="text-primary">(Vansh Goel)</span>
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3, ease: transitions.easeOut }}
            >
              <h3 className="text-white font-medium text-xl mb-6">Newsletter</h3>
              <p className="text-white/70 mb-4">Subscribe to get the latest updates and news.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-dark-3 border border-white/10 rounded-l-lg px-4 py-2 text-white w-full focus:outline-none focus:border-primary"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="icon"
                  className="rounded-l-none rounded-r-lg"
                  aria-label="Subscribe"
                >
                  <Icon name="arrowRight" size={18} />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm">© {new Date().getFullYear()} Brand Gains. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-white/50 hover:text-primary text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/50 hover:text-primary text-sm transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
