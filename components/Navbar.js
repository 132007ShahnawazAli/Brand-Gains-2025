"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Logo from "./Logo"
import { Button } from "./ui/Button"
import { Icon } from "./ui/Icons"
import { transitions } from "@/utils/animation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About Us", href: "/#about" },
    { name: "Process", href: "/#process" },
  ]

  const socialLinks = [
    { icon: "instagram", href: "https://www.instagram.com/brandgains/" },
    { icon: "twitter", href: "https://x.com/Brand_Gains" },
    { icon: "facebook", href: "https://www.facebook.com/profile.php?id=61554325564900" },
    { icon: "linkedin", href: "https://www.linkedin.com/in/brandgains/" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: transitions.easeOut } },
  }

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled || isOpen ? "py-3 bg-dark-2/95 backdrop-blur-md border-b border-white/5" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo size={scrolled ? "small" : "default"} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-primary transition-colors duration-300 font-medium text-base tracking-wide"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Social & CTA */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-3">
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

            <Button href="/contact" variant="primary" size="sm" icon="arrowRight" iconPosition="right">
              Let&apos;s Connect
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white z-50 icon-box icon-box-md"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <Icon name={isOpen ? "close" : "menu"} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: transitions.easeOut }}
            className="fixed inset-0 bg-dark-2/95 backdrop-blur-md z-40 flex flex-col justify-center overflow-hidden md:hidden"
          >
            <motion.div
              className="container mx-auto px-4 h-full flex flex-col justify-between py-32"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.ul className="flex flex-col gap-8 mb-12">
                {navLinks.map((link, index) => (
                  <motion.li key={link.name} variants={itemVariants} custom={index}>
                    <Link
                      href={link.href}
                      className="text-white text-4xl font-medium hover:text-primary transition-colors duration-300 block"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-auto">
                <motion.div variants={itemVariants} className="mb-8">
                  <Button href="/contact" variant="primary" icon="arrowRight" onClick={() => setIsOpen(false)}>
                    Let&apos;s Connect
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-box icon-box-md"
                    >
                      <Icon name={link.icon} size={20} />
                    </Link>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
