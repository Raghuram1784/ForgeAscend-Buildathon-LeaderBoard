'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const features = [
  {
    icon: '📚',
    title: 'Learn',
    description: 'Master advanced coding concepts from industry experts. Structured curriculum designed for competitive programming.',
  },
  {
    icon: '🛠️',
    title: 'Build',
    description: 'Create real-world projects that showcase your skills. Portfolio-ready work in system design and architecture.',
  },
  {
    icon: '🏆',
    title: 'Compete',
    description: 'Challenge yourself against peers globally. Real-time leaderboards and instant feedback on performance.',
  },
  {
    icon: '🤝',
    title: 'Collaborate',
    description: 'Work with talented developers across colleges. Network and build lasting professional connections.',
  },
]

export function FeaturesSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section ref={ref} className="relative py-24 px-4 bg-gradient-to-b from-black via-slate-950 to-black overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl opacity-20" />
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
            Build More Than Just Code
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive platform designed to transform aspiring developers into industry-ready professionals
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              {/* Card Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-amber-900/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Card */}
              <div className="relative p-8 rounded-2xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm group-hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10">
                {/* Icon */}
                <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300">
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-200 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                  {feature.description}
                </p>

                {/* Animated Border */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 group-hover:w-full transition-all duration-500 rounded-b-2xl" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
