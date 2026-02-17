'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Leaderboard', href: '/leaderboard' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isOpen
        ? 'bg-black/50 backdrop-blur-xl border-b border-white/10 py-4 md:py-6 shadow-2xl'
        : 'bg-transparent py-4 md:py-10'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between relative z-50">

        {/* Logo - Increased Size & Clickable Area */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-4 group relative z-50"
        >
          <div className="relative w-12 h-12 md:w-20 md:h-20 transition-transform group-hover:scale-105 duration-300">
            <Image
              src="/forgeascend-logo.png"
              alt="ForgeAscend"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-bold text-gray-300 hover:text-white transition-colors duration-300 relative group uppercase tracking-widest font-outfit"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}


        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-40 md:hidden flex flex-col justify-center items-center gap-8 pt-20"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-light text-gray-300 hover:text-white transition-colors tracking-tight font-outfit"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}


          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
