"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Play } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery/minecraft', label: 'Minecraft' },
  { href: '/gallery/ai-photos', label: 'AI Photos' },
  { href: '/gallery/roblox', label: 'Roblox' },
  { href: '/gallery/videos', label: 'Videos' },
  { href: '/gallery/jokes', label: 'Jokes' },
  { href: '/gallery/old-minecraft', label: 'Old MC' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/50"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/websiteicon-fJGR5wjHeIKMEjHPXX4gV0FCwfudO2.jpg"
                alt="موقع القروب"
                fill
                className="object-cover"
              />
            </motion.div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              موقع القروب
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {link.label}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* YouTube Button */}
          <div className="hidden md:block">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                asChild
                className="bg-red-600 hover:bg-red-500 text-white gap-2"
              >
                <a href="https://youtube.com/shorts/BRqp6biJ8MU?si=YD-lGR_sMeyXIxvG" target="_blank" rel="noopener noreferrer">
                  <Play className="w-5 h-5" />
                  yo u gotta see ts
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Button 
                asChild
                className="w-full mt-4 bg-red-600 hover:bg-red-500 text-white gap-2"
              >
                <a href="https://youtube.com/shorts/BRqp6biJ8MU?si=YD-lGR_sMeyXIxvG" target="_blank" rel="noopener noreferrer">
                  <Play className="w-5 h-5" />
                  yo u gotta see ts
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
