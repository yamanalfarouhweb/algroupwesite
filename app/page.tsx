"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pickaxe, Sparkles, Gamepad, Video, Smile, Clock, ChevronDown, Play } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ParticlesBackground } from '@/components/particles-background'
import { CategoryCard } from '@/components/category-card'
import { MemberSelect } from '@/components/member-select'
import { VideoShowcase } from '@/components/video-showcase'
import { GalleryProvider, useGallery } from '@/lib/gallery-context'

const categories = [
  {
    title: 'Minecraft Screenshots',
    description: 'Epic builds, adventures, and survival moments',
    category: 'minecraft' as const,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/theminecraftphoto-zZwIAYVQtcqiqsLhgohPjL4xfi75gZ.jpg',
    gradient: 'from-emerald-900/90 via-emerald-800/70 to-transparent',
    icon: <Pickaxe className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: 'AI Photos Gallery',
    description: 'AI-generated artwork and creative pieces',
    category: 'ai-photos' as const,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ai%20gallery%20photo-PL99FK3VrBhsmchZqzF737sfzs7NXK.jpg',
    gradient: 'from-violet-900/90 via-violet-800/70 to-transparent',
    icon: <Sparkles className="w-6 h-6 text-violet-400" />,
  },
  {
    title: 'Roblox Gallery',
    description: 'Best moments from Roblox adventures',
    category: 'roblox' as const,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/robloxicon-zdT7GZ9zyXm4FlvKbHKY2tS8vM4oZo.jpg',
    gradient: 'from-red-900/90 via-red-800/70 to-transparent',
    icon: <Gamepad className="w-6 h-6 text-red-400" />,
  },
  {
    title: 'Videos',
    description: 'Epic gameplay clips and memorable moments',
    category: 'videos' as const,
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop',
    gradient: 'from-blue-900/90 via-blue-800/70 to-transparent',
    icon: <Video className="w-6 h-6 text-blue-400" />,
  },
  {
    title: 'محادثات وميمز الصناعي',
    description: 'Gaming memes and funny moments',
    category: 'jokes' as const,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D8%A7%D9%84%D8%B5%D9%86%D8%A7%D8%B9%D9%8A%20icon-9kHFReFPF3IUIj5bTVIq7ZEnr0Wmji.jpg',
    gradient: 'from-amber-900/90 via-amber-800/70 to-transparent',
    icon: <Smile className="w-6 h-6 text-amber-400" />,
  },
  {
    title: 'Old Minecraft Screenshots',
    description: 'Nostalgic moments from classic Minecraft',
    category: 'old-minecraft' as const,
    image: '/images/minecraft-banner.jpg',
    gradient: 'from-stone-900/90 via-stone-800/70 to-transparent',
    icon: <Clock className="w-6 h-6 text-stone-400" />,
  },
]

function HomeContent() {
  const { items } = useGallery()
  const [showMemberSelect, setShowMemberSelect] = useState(true)
  const [currentMember, setCurrentMember] = useState<{ id: string; name: string; message: string } | null>(null)

  useEffect(() => {
    // Check if member was already selected in this session
    const savedMember = sessionStorage.getItem('selectedMember')
    if (savedMember) {
      setCurrentMember(JSON.parse(savedMember))
      setShowMemberSelect(false)
    }
  }, [])

  const handleMemberSelected = (member: { id: string; name: string; message: string }) => {
    setCurrentMember(member)
    sessionStorage.setItem('selectedMember', JSON.stringify(member))
    setShowMemberSelect(false)
  }

  return (
    <>
      <AnimatePresence>
        {showMemberSelect && (
          <MemberSelect onMemberSelected={handleMemberSelected} />
        )}
      </AnimatePresence>

      {!showMemberSelect && (
        <div className="min-h-screen flex flex-col">
          <ParticlesBackground />
          <Navbar />

          {/* Hero Section */}
          <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                  animate={{ 
                    boxShadow: [
                      '0 0 20px rgba(139, 92, 246, 0.2)',
                      '0 0 40px rgba(139, 92, 246, 0.4)',
                      '0 0 20px rgba(139, 92, 246, 0.2)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {currentMember ? `Welcome, ${currentMember.name}!` : 'موقع القروب'}
                  </span>
                </motion.div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    موقع القروب
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance" dir="rtl">
                  مرحبا بك ايها العضو الشهواني بهذا الارشيف الجميل الخاص بالقروب فاستمتع واشكر يمان علخاص يولد -وارسل له ارقام النساء-
                </p>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-muted-foreground"
                >
                  <ChevronDown className="w-8 h-8 mx-auto" />
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Video Showcase Section */}
          <VideoShowcase />

          {/* Categories Grid */}
          <section className="relative px-4 sm:px-6 lg:px-8 pb-20">
            <div className="max-w-7xl mx-auto">
              <motion.h2
                className="text-3xl font-bold mb-8 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Explore Categories
              </motion.h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat, index) => (
                  <motion.div
                    key={cat.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CategoryCard
                      title={cat.title}
                      description={cat.description}
                      category={cat.category}
                      image={cat.image}
                      gradient={cat.gradient}
                      icon={cat.icon}
                      itemCount={items[cat.category]?.length || 0}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* YouTube CTA Section */}
          <section className="relative px-4 sm:px-6 lg:px-8 py-20 bg-card/30 backdrop-blur-sm border-y border-border">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href="https://youtube.com/shorts/BRqp6biJ8MU?si=YD-lGR_sMeyXIxvG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-xl transition-all shadow-lg shadow-red-500/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-6 h-6" />
                  yo u gotta see ts
                </motion.a>
              </motion.div>
            </div>
          </section>

          <Footer />
        </div>
      )}
    </>
  )
}

export default function HomePage() {
  return (
    <GalleryProvider>
      <HomeContent />
    </GalleryProvider>
  )
}
