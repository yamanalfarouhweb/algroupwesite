"use client"

import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-card/50 backdrop-blur-xl border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-primary/50">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/websiteicon-fJGR5wjHeIKMEjHPXX4gV0FCwfudO2.jpg"
                alt="موقع القروب"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              موقع القروب
            </span>
          </Link>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/gallery/minecraft" className="hover:text-foreground transition-colors">
              Minecraft
            </Link>
            <Link href="/gallery/ai-photos" className="hover:text-foreground transition-colors">
              AI Photos
            </Link>
            <Link href="/gallery/roblox" className="hover:text-foreground transition-colors">
              Roblox
            </Link>
            <Link href="/gallery/videos" className="hover:text-foreground transition-colors">
              Videos
            </Link>
            <Link href="/gallery/jokes" className="hover:text-foreground transition-colors">
              Jokes
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
