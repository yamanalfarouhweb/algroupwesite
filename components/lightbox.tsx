"use client"

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Heart, Share2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { GalleryItem } from '@/lib/gallery-context'

interface LightboxProps {
  item: GalleryItem | null
  items: GalleryItem[]
  onClose: () => void
  onNavigate: (direction: 'prev' | 'next') => void
}

export function Lightbox({ item, items, onClose, onNavigate }: LightboxProps) {
  const currentIndex = item ? items.findIndex(i => i.id === item.id) : -1
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < items.length - 1

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft' && hasPrev) onNavigate('prev')
    if (e.key === 'ArrowRight' && hasNext) onNavigate('next')
  }, [onClose, onNavigate, hasPrev, hasNext])

  useEffect(() => {
    if (item) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [item, handleKeyDown])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Close button */}
          <motion.button
            className="absolute top-4 right-4 z-10 p-3 rounded-full bg-muted/50 hover:bg-muted transition-colors"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Navigation buttons */}
          {hasPrev && (
            <motion.button
              className="absolute left-4 z-10 p-3 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={() => onNavigate('prev')}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          )}

          {hasNext && (
            <motion.button
              className="absolute right-4 z-10 p-3 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={() => onNavigate('next')}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          )}

          {/* Content */}
          <motion.div
            className="relative max-w-5xl max-h-[85vh] mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {item.type === 'video' ? (
              <video
                src={item.src}
                className="max-w-full max-h-[75vh] rounded-xl shadow-2xl"
                controls
                autoPlay
              />
            ) : item.type === 'text' ? (
              <div className="bg-card p-8 rounded-2xl max-w-lg border border-border">
                <p className="text-xl leading-relaxed">{item.content}</p>
                <p className="mt-4 text-muted-foreground text-sm">- {item.title}</p>
              </div>
            ) : (
              <img
                src={item.src}
                alt={item.title}
                className="max-w-full max-h-[75vh] rounded-xl shadow-2xl object-contain"
              />
            )}

            {/* Info bar */}
            <motion.div
              className="flex items-center justify-between mt-4 px-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex gap-2 mt-1">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="w-4 h-4" />
                </Button>
                {item.type !== 'text' && (
                  <Button variant="outline" size="icon" className="rounded-full" asChild>
                    <a href={item.src} download target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Image counter */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-muted/50 text-sm">
              {currentIndex + 1} / {items.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
