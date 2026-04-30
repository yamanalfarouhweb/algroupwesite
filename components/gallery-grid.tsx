"use client"

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Heart, Play, MessageSquare, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useGallery, type GalleryCategory, type GalleryItem } from '@/lib/gallery-context'
import { UploadModal } from './upload-modal'
import { Lightbox } from './lightbox'

interface GalleryGridProps {
  category: GalleryCategory
  title: string
  description: string
  isRetro?: boolean
}

const aiPhotoTags = ['all', 'landscape', 'portrait', 'fantasy', 'sci-fi', 'abstract', 'artistic', 'realistic', 'anime']

export function GalleryGrid({ category, title, description, isRetro = false }: GalleryGridProps) {
  const { getItems, removeItem } = useGallery()
  const items = getItems(category)
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTag = selectedTag === 'all' || item.tags?.includes(selectedTag)
      return matchesSearch && (category !== 'ai-photos' || matchesTag)
    })
  }, [items, searchQuery, selectedTag, category])

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (!selectedItem) return
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id)
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1
    if (newIndex >= 0 && newIndex < filteredItems.length) {
      setSelectedItem(filteredItems[newIndex])
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${isRetro ? 'font-[var(--font-pixel)] text-2xl sm:text-3xl' : ''}`}>
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gallery..."
              className="pl-10 bg-card"
            />
          </div>
          <Button onClick={() => setIsUploadOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Photo
          </Button>
        </motion.div>

        {/* Tag filters for AI photos */}
        {category === 'ai-photos' && (
          <motion.div
            className="flex flex-wrap gap-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {aiPhotoTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-card hover:bg-muted border border-border'
                }`}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
          </motion.div>
        )}

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="group relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <motion.div
                  className={`relative rounded-xl overflow-hidden border border-border bg-card cursor-pointer ${
                    isRetro ? 'pixelated' : ''
                  }`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => setSelectedItem(item)}
                >
                  {item.type === 'text' ? (
                    <div className="aspect-square p-6 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                      <div className="text-center">
                        <MessageSquare className="w-8 h-8 mx-auto mb-3 text-primary" />
                        <p className="text-sm line-clamp-4">{item.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-square relative">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Play className="w-8 h-8 text-white fill-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-semibold text-white truncate">{item.title}</h3>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {item.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded-full bg-white/20 text-white text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors">
                      <Heart className="w-4 h-4 text-white" />
                    </button>
                    <button 
                      className="p-2 rounded-full bg-black/50 hover:bg-red-500/70 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeItem(category, item.id)
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No items found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? 'Try a different search term' : 'Be the first to add content!'}
            </p>
            <Button onClick={() => setIsUploadOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Photo
            </Button>
          </motion.div>
        )}
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        category={category}
      />

      {/* Lightbox */}
      <Lightbox
        item={selectedItem}
        items={filteredItems}
        onClose={() => setSelectedItem(null)}
        onNavigate={handleNavigate}
      />
    </div>
  )
}
