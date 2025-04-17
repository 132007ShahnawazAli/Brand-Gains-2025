"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Blob } from "@/components/ui/Blob"
import { transitions } from "@/utils/animation"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark relative overflow-hidden">
      <Blob color="primary" position="top-right" size="lg" blur={120} opacity={0.2} />
      <Blob color="green" position="bottom-left" size="md" blur={100} opacity={0.15} />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-9xl font-monument-black text-primary mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: transitions.easeOut }}
          >
            404
          </motion.h1>

          <motion.h2
            className="text-4xl md:text-5xl font-monument-regular text-white mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: transitions.easeOut }}
          >
            Page Not Found
          </motion.h2>

          <motion.p
            className="text-lg text-white/70 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: transitions.easeOut }}
          >
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: transitions.easeOut }}
          >
            <Button href="/" variant="primary" size="lg">
              Back to Home
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
