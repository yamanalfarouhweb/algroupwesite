"use client"

import { motion } from 'framer-motion'

export function VideoShowcase() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border border-border bg-card/50 backdrop-blur-sm"
        >
          <div className="aspect-video">
            <video
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0016-yCudd39FrHIXlLfXm1oDdBdYkGJmrp.MP4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
