"use client"

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ParticlesBackground } from '@/components/particles-background'
import { GalleryProvider } from '@/lib/gallery-context'

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <GalleryProvider>
      <div className="min-h-screen flex flex-col">
        <ParticlesBackground />
        <Navbar />
        <main className="flex-1 relative z-10">
          {children}
        </main>
        <Footer />
      </div>
    </GalleryProvider>
  )
}
