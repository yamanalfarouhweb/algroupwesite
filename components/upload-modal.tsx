"use client"

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, ImagePlus, Video, Type, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useGallery, type GalleryCategory } from '@/lib/gallery-context'

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  category: GalleryCategory
}

const categoryConfig: Record<GalleryCategory, { 
  title: string
  acceptedTypes: string
  allowText: boolean
  allowVideo: boolean
}> = {
  minecraft: { title: 'Minecraft Screenshots', acceptedTypes: 'image/*', allowText: false, allowVideo: false },
  'ai-photos': { title: 'AI Photos', acceptedTypes: 'image/*', allowText: false, allowVideo: false },
  roblox: { title: 'Roblox Gallery', acceptedTypes: 'image/*', allowText: false, allowVideo: false },
  videos: { title: 'Videos', acceptedTypes: 'video/*,image/*', allowText: false, allowVideo: true },
  jokes: { title: 'Jokes', acceptedTypes: 'image/*,image/gif', allowText: true, allowVideo: false },
  'old-minecraft': { title: 'Old Minecraft Screenshots', acceptedTypes: 'image/*', allowText: false, allowVideo: false },
}

const aiPhotoTags = ['landscape', 'portrait', 'fantasy', 'sci-fi', 'abstract', 'artistic', 'realistic', 'anime']

export function UploadModal({ isOpen, onClose, category }: UploadModalProps) {
  const { addItem } = useGallery()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [title, setTitle] = useState('')
  const [textContent, setTextContent] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadType, setUploadType] = useState<'image' | 'video' | 'text'>('image')
  const [isDragging, setIsDragging] = useState(false)

  const config = categoryConfig[category]

  const handleFileSelect = useCallback((file: File) => {
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    if (file.type.startsWith('video/')) {
      setUploadType('video')
    } else {
      setUploadType('image')
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }, [handleFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleSubmit = () => {
    if (!title.trim()) return

    if (uploadType === 'text') {
      addItem(category, {
        src: '',
        title: title.trim(),
        category,
        type: 'text',
        content: textContent,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
      })
    } else if (previewUrl) {
      addItem(category, {
        src: previewUrl,
        title: title.trim(),
        category,
        type: uploadType === 'video' ? 'video' : 'image',
        tags: selectedTags.length > 0 ? selectedTags : undefined,
      })
    }

    // Reset form
    setTitle('')
    setTextContent('')
    setSelectedTags([])
    setPreviewUrl(null)
    setUploadType('image')
    onClose()
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Upload className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Upload to {config.title}</h2>
                  <p className="text-sm text-muted-foreground">Add new content to the gallery</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Upload type selector for jokes */}
              {config.allowText && (
                <div className="flex gap-2">
                  <Button
                    variant={uploadType === 'image' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setUploadType('image')}
                    className="flex-1"
                  >
                    <ImagePlus className="w-4 h-4 mr-2" />
                    Image/GIF
                  </Button>
                  <Button
                    variant={uploadType === 'text' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setUploadType('text')}
                    className="flex-1"
                  >
                    <Type className="w-4 h-4 mr-2" />
                    Text Joke
                  </Button>
                </div>
              )}

              {/* Upload area */}
              {uploadType !== 'text' ? (
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 transition-colors ${
                    isDragging 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={config.acceptedTypes}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileSelect(file)
                    }}
                  />

                  {previewUrl ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      {uploadType === 'video' ? (
                        <video src={previewUrl} className="w-full h-full object-cover" controls />
                      ) : (
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setPreviewUrl(null)
                        }}
                        className="absolute top-2 right-2 p-1 rounded-full bg-background/80 hover:bg-background transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        {config.allowVideo ? (
                          <Video className="w-6 h-6 text-primary" />
                        ) : (
                          <ImagePlus className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      <p className="text-sm font-medium mb-1">
                        Drop your {config.allowVideo ? 'file' : 'image'} here
                      </p>
                      <p className="text-xs text-muted-foreground">
                        or click to browse
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Write your joke here..."
                    className="w-full h-32 px-4 py-3 rounded-xl bg-input border border-border resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}

              {/* Title input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your upload a title..."
                  className="bg-input"
                />
              </div>

              {/* Tags for AI photos */}
              {category === 'ai-photos' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {aiPhotoTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-border bg-muted/30">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!title.trim() || (uploadType !== 'text' && !previewUrl)}
                className="gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
