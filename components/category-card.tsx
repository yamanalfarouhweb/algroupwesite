"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { GalleryCategory } from '@/lib/gallery-context'

interface CategoryCardProps {
  title: string
  description: string
  category: GalleryCategory
  image: string
  gradient: string
  icon: React.ReactNode
  itemCount: number
}

export function CategoryCard({ 
  title, 
  description, 
  category, 
  image, 
  gradient,
  icon,
  itemCount 
}: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/gallery/${category}`}>
      <motion.div
        className="relative group cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          perspective: 1000,
        }}
      >
        <motion.div
          className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-border/50"
          animate={{
            rotateX: isHovered ? 5 : 0,
            rotateY: isHovered ? -5 : 0,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Gradient Overlay - reduced opacity for clearer images */}
          <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-50`} />

          {/* Glassmorphism Card - minimal blur for clearer images */}
          <div className="absolute inset-0 bg-background/10" />

          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              boxShadow: `inset 0 0 60px rgba(139, 92, 246, 0.3), 0 0 30px rgba(139, 92, 246, 0.2)`,
            }}
          />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-6">
            <div className="flex justify-between items-start">
              <motion.div
                className="p-3 rounded-xl bg-background/40 backdrop-blur-md border border-white/10"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? 10 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {icon}
              </motion.div>
              <span className="px-3 py-1 rounded-full bg-background/40 backdrop-blur-md text-xs font-medium border border-white/10">
                {itemCount} items
              </span>
            </div>

            <div>
              <motion.h3
                className="text-2xl font-bold text-white mb-2"
                animate={{
                  x: isHovered ? 10 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {title}
              </motion.h3>
              <motion.p
                className="text-white/70 text-sm"
                animate={{
                  x: isHovered ? 10 : 0,
                  opacity: isHovered ? 1 : 0.7,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.05 }}
              >
                {description}
              </motion.p>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/20 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white/20 rounded-br-2xl" />
        </motion.div>
      </motion.div>
    </Link>
  )
}
