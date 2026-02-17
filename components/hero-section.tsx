'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { HeroBackground } from './hero-background'

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black">
      {/* 3D Background */}
      <HeroBackground />

      {/* Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60 pointer-events-none" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-6xl md:text-8xl font-bold text-center text-transparent bg-gradient-to-r from-amber-200 via-amber-100 to-white bg-clip-text mb-6 leading-tight">
            FORGEASCEND
          </h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-xl md:text-2xl text-gray-300 text-center mb-6 max-w-2xl">
            From Concept to Code, Guided to Greatness
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-lg text-amber-200 text-center mb-12 font-semibold tracking-widest">
            Learn → Build → Compete
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 items-center justify-center"
        >
          {/* Primary CTA */}
          <Link href="/leaderboard">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-lg font-bold text-lg backdrop-blur-xl border-2 border-transparent bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-100 text-black hover:from-amber-300 hover:to-yellow-200 shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Enter Leaderboard
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </Link>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-lg font-bold text-lg backdrop-blur-xl border-2 border-gray-500/50 bg-gray-900/40 text-amber-100 hover:border-amber-200/50 hover:bg-gray-800/60 hover:text-amber-50 shadow-lg hover:shadow-amber-500/30 transition-all duration-300 group"
          >
            <span className="flex items-center gap-2">
              About the Event
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-amber-200/50 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-2 bg-amber-200 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
