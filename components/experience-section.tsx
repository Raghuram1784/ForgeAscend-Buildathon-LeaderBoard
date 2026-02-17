'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const experiences = [
  {
    title: 'Real Project Building',
    description: 'Work on actual production-level problems that matter. Solve challenges faced by companies worldwide.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'System Design Thinking',
    description: 'Learn to architect scalable solutions from the ground up. Think like senior engineers.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Cross-College Collaboration',
    description: 'Network with talented developers from prestigious institutions. Build professional relationships.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Resume-Ready Outcomes',
    description: 'Showcase impressive projects to top companies. Stand out in recruiting processes.',
    gradient: 'from-orange-500 to-red-500',
  },
]

export function ExperienceSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <section ref={ref} className="relative py-24 px-4 bg-gradient-to-b from-black via-slate-950 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-amber-200 to-white bg-clip-text mb-6">
            Transform Your Career
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience comprehensive development through cutting-edge challenges and mentorship
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}
              />

              {/* Card */}
              <div className="relative p-10 rounded-2xl border border-gray-700/30 bg-gray-900/40 backdrop-blur-sm group-hover:border-white/20 transition-all duration-300">
                {/* Number Badge */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${exp.gradient} mb-6 text-white font-bold text-lg`}>
                  {index + 1}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-200 transition-colors">
                  {exp.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Arrow */}
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="flex items-center gap-2 text-amber-200 font-semibold"
                >
                  Learn More
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
