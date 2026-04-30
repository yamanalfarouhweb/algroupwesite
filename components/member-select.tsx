"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Sparkles } from 'lucide-react'

const members = [
  { id: 'daber', name: 'دبر', message: 'Welcome back, master of chaos!' },
  { id: 'apple-king', name: 'ملك التفاح والصناعي ووزير الداخلية', message: 'The King has arrived!' },
  { id: 'group-manager', name: 'مدير القروب ملك الملحدين', message: 'The boss is here!' },
  { id: 'detroit-mayor', name: 'عمدة ديترويت', message: 'Detroit represent!' },
  { id: 'fifi', name: 'فيفي', message: 'Hey Fifi!' },
  { id: 'pita', name: 'PITA GRIFFIN', message: 'PITA in the house!' },
  { id: 'susana', name: 'سوسانا', message: 'Susana has entered!' },
  { id: 'pastry', name: 'حلواني القروب', message: 'Sweet arrival!' },
  { id: 'ibn-mozza', name: 'ابن المزة', message: 'Legend has joined!' },
  { id: 'mokhabr', name: 'موخابر', message: 'Intel acquired!' },
  { id: 'shahwa', name: 'شهوى', message: 'Welcome!' },
  { id: 'it-support', name: 'IT SUPPORT', message: 'Tech support online!' },
  { id: 'singer', name: 'مطرب القروب', message: 'The singer is here!' },
  { id: 'abu-jannah', name: 'ابو جنه', message: 'Abu Jannah entered!' },
  { id: 'rama', name: 'راما معكرونه', message: 'Pasta time!' },
  { id: 'ibn-maliki', name: 'ابن المالكي', message: 'Welcome aboard!' },
  { id: 'yahya', name: 'يحي', message: 'Yahya is here!' },
  { id: 'lawyer', name: 'محامي القروب', message: 'Legal counsel present!' },
]

interface MemberSelectProps {
  onMemberSelected: (member: typeof members[0]) => void
}

export function MemberSelect({ onMemberSelected }: MemberSelectProps) {
  const [selectedMember, setSelectedMember] = useState<typeof members[0] | null>(null)
  const [showMessage, setShowMessage] = useState(false)

  const handleSelect = (member: typeof members[0]) => {
    setSelectedMember(member)
    setShowMessage(true)
  }

  const handleContinue = () => {
    if (selectedMember) {
      onMemberSelected(selectedMember)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <AnimatePresence mode="wait">
        {!showMessage ? (
          <motion.div
            key="selection"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 w-full max-w-4xl mx-4 p-6 sm:p-8"
          >
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(139, 92, 246, 0.2)',
                    '0 0 40px rgba(139, 92, 246, 0.4)',
                    '0 0 20px rgba(139, 92, 246, 0.2)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">موقع القروب</span>
              </motion.div>
              
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Which member of the group are you?
              </h1>
              <p className="text-muted-foreground">Select your name to continue</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto p-2">
              {members.map((member, index) => (
                <motion.button
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => handleSelect(member)}
                  className="group relative p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 text-center overflow-hidden"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-sm font-medium">{member.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative z-10 text-center p-8"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <Sparkles className="w-16 h-16 text-primary" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl font-bold mb-2"
            >
              {selectedMember?.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-primary mb-8"
            >
              {selectedMember?.message}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={handleContinue}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enter Website
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
