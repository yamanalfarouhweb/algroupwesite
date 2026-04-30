"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type GalleryCategory = 
  | 'minecraft'
  | 'ai-photos'
  | 'roblox'
  | 'videos'
  | 'jokes'
  | 'old-minecraft'

export interface GalleryItem {
  id: string
  src: string
  title: string
  category: GalleryCategory
  tags?: string[]
  type: 'image' | 'video' | 'gif' | 'text'
  content?: string // For text jokes
  createdAt: Date
}

interface GalleryContextType {
  items: Record<GalleryCategory, GalleryItem[]>
  addItem: (category: GalleryCategory, item: Omit<GalleryItem, 'id' | 'createdAt'>) => void
  removeItem: (category: GalleryCategory, id: string) => void
  getItems: (category: GalleryCategory) => GalleryItem[]
}

const GalleryContext = createContext<GalleryContextType | null>(null)

// Sample placeholder images for each category
const initialItems: Record<GalleryCategory, GalleryItem[]> = {
  minecraft: [
    { id: '1', src: 'https://images.unsplash.com/photo-1587573088697-b308e3f2a4b3?w=600&h=400&fit=crop', title: 'Epic Build', category: 'minecraft', type: 'image', createdAt: new Date() },
    { id: '2', src: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop', title: 'Night Adventure', category: 'minecraft', type: 'image', createdAt: new Date() },
    { id: '3', src: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop', title: 'Castle View', category: 'minecraft', type: 'image', createdAt: new Date() },
  ],
  'ai-photos': [
    { id: '1', src: 'https://images.unsplash.com/photo-1677442135136-760c813c25c0?w=600&h=400&fit=crop', title: 'AI Landscape', category: 'ai-photos', tags: ['landscape', 'fantasy'], type: 'image', createdAt: new Date() },
    { id: '2', src: 'https://images.unsplash.com/photo-1686191128892-3b37add5a6fe?w=600&h=400&fit=crop', title: 'AI Portrait', category: 'ai-photos', tags: ['portrait', 'artistic'], type: 'image', createdAt: new Date() },
  ],
  roblox: [
    { id: '1', src: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop', title: 'Roblox World', category: 'roblox', type: 'image', createdAt: new Date() },
    { id: '2', src: 'https://images.unsplash.com/photo-1493711662062-fa541f7f0003?w=600&h=400&fit=crop', title: 'Gaming Session', category: 'roblox', type: 'image', createdAt: new Date() },
  ],
  videos: [
    { id: '1', src: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&h=400&fit=crop', title: 'Epic Gameplay', category: 'videos', type: 'video', createdAt: new Date() },
  ],
  jokes: [
    { id: '1', src: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=600&h=400&fit=crop', title: 'Funny Meme', category: 'jokes', type: 'image', createdAt: new Date() },
    { id: '2', src: '', title: 'Gaming Joke', category: 'jokes', type: 'text', content: 'Why did the creeper go to therapy? Because he had too many explosive emotions!', createdAt: new Date() },
  ],
  'old-minecraft': [
    { id: '1', src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop', title: 'Classic Build', category: 'old-minecraft', type: 'image', createdAt: new Date() },
    { id: '2', src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop', title: 'Retro Screenshot', category: 'old-minecraft', type: 'image', createdAt: new Date() },
  ],
}

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<GalleryCategory, GalleryItem[]>>(initialItems)

  const addItem = useCallback((category: GalleryCategory, item: Omit<GalleryItem, 'id' | 'createdAt'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }
    setItems(prev => ({
      ...prev,
      [category]: [newItem, ...prev[category]],
    }))
  }, [])

  const removeItem = useCallback((category: GalleryCategory, id: string) => {
    setItems(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id),
    }))
  }, [])

  const getItems = useCallback((category: GalleryCategory) => {
    return items[category]
  }, [items])

  return (
    <GalleryContext.Provider value={{ items, addItem, removeItem, getItems }}>
      {children}
    </GalleryContext.Provider>
  )
}

export function useGallery() {
  const context = useContext(GalleryContext)
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider')
  }
  return context
}
