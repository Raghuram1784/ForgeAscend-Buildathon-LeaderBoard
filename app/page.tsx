'use client'

import Image from 'next/image'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { Cinzel } from 'next/font/google'
import { Header } from '@/components/header'

const cinzel = Cinzel({ subsets: ['latin'] })

function CheckpointSection() {
  const [activeCheckpoint, setActiveCheckpoint] = useState<number | null>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const checkpoints = [
    { num: '01', title: 'Problem Planning', desc: 'Break down requirements & architecture. Define the core problem, user stories, and technical constraints before writing a single line of code.' },
    { num: '02', title: 'System Design', desc: 'Design scalable systems & schema. Create ERD diagrams, API specifications, and choose the right tech stack for performance.' },
    { num: '03', title: 'Frontend Core', desc: 'Build responsive UI foundations. Setup Next.js, Tailwind, and creating reusable components for a consistent design system.' },
    { num: '04', title: 'Backend Setup', desc: 'Initialize server & API structure. Configure Node.js/Python servers, set up middleware, and handle authentication securely.' },
    { num: '05', title: 'Database Integration', desc: 'Implement robust data persistence. Connect ORMs, design efficient queries, and ensure data integrity with migrations.' },
    { num: '06', title: 'API Connections', desc: 'Connect frontend with backend services. Implement strict status checks, error handling, and type-safe data fetching.' },
    { num: '07', title: 'Testing & Polish', desc: 'Ensure quality, security & performance. Write unit tests, optimize for Core Web Vitals, and fix edge-case bugs.' },
    { num: '08', title: 'Deployment', desc: 'Launch and monitor your solution. Configure CI/CD pipelines, domain management, and production environment variables.' }
  ]

  return (
    <section ref={containerRef} className="py-24 px-4 relative bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className={`text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 ${cinzel.className}`}>
            Interactive Roadmap
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Click on the pins to explore each stage of the journey
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">


          {/* Interactive Content List */}
          <div className="w-full space-y-4">
            {checkpoints.map((cp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative p-1 rounded-xl transition-all duration-500 ${activeCheckpoint === index
                  ? 'bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-[1.02]'
                  : 'bg-transparent'
                  }`}
                onClick={() => setActiveCheckpoint(activeCheckpoint === index ? null : index)}
              >
                <div className={`relative p-6 rounded-[10px] cursor-pointer overflow-hidden transition-all duration-300 ${activeCheckpoint === index
                  ? 'bg-black'
                  : 'bg-gray-900/40 border border-gray-800 hover:border-amber-500/50 hover:bg-gray-900/60'
                  }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm border ${activeCheckpoint === index
                        ? 'bg-amber-500 text-black border-amber-500'
                        : 'bg-black text-gray-500 border-gray-700'
                        }`}>
                        {cp.num}
                      </div>
                      <h3 className={`text-xl font-bold transition-colors ${activeCheckpoint === index ? 'text-amber-400' : 'text-gray-300'
                        } ${cinzel.className}`}>
                        {cp.title}
                      </h3>
                    </div>
                    <div className={`text-amber-500 transform transition-transform duration-300 ${activeCheckpoint === index ? 'rotate-180' : ''}`}>
                      ▼
                    </div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: activeCheckpoint === index ? 'auto' : 0,
                      opacity: activeCheckpoint === index ? 1 : 0
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-gray-800 text-gray-400 leading-relaxed">
                      {cp.desc}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const features = [
    { title: 'Learn', desc: 'Master advanced coding concepts from industry experts' },
    { title: 'Build', desc: 'Create real-world projects that showcase your skills' },
    { title: 'Compete', desc: 'Challenge yourself against peers globally' },
    { title: 'Collaborate', desc: 'Join a community of brilliant developers' }
  ]

  return (
    <section ref={ref} className="py-24 px-4 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className={`text-5xl font-bold text-center mb-16 text-balance ${cinzel.className}`}
        >
          Why ForgeAscend?
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 border border-gray-800 rounded-lg hover:border-amber-500 transition group cursor-pointer"
            >
              <h3 className="text-2xl font-bold mb-3 text-amber-500 group-hover:text-amber-400">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}



export default function Home() {
  return (
    <main className="w-full text-white overflow-hidden relative z-10">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-transparent z-0" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse z-0" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse z-0" />



        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance ${cinzel.className}`}
          >
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              ForgeAscendv.1.0
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 text-balance"
          >
            From Concept to Code, Guided to Greatness
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-400 mb-12 text-balance"
          >
            Premium competitive coding platform. Learn, Build, Compete with the best developers globally.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link href="/leaderboard" className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition transform hover:scale-105">
              Enter Leaderboard
            </Link>

          </motion.div>
        </div>
      </section>

      {/* Checkpoint Section */}
      <CheckpointSection />

      {/* Features Section */}
      <FeaturesSection />







      {/* Footer */}
      <footer className="py-12 px-4 bg-black/80 backdrop-blur-md border-t border-gray-800/50 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2025 ForgeAscend. From Concept to Code, Guided to Greatness.</p>
        </div>
      </footer>
    </main>
  )
}
