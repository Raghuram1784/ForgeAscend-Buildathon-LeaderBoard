'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

interface LeaderboardRow {
  rank: number
  team: string
  score: number
  medal?: string
}

export function LeaderboardPreview() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const [teams, setTeams] = useState<LeaderboardRow[]>([
    { rank: 1, team: 'Team Nexus', score: 8500, medal: '🥇' },
    { rank: 2, team: 'Code Legends', score: 8200, medal: '🥈' },
    { rank: 3, team: 'Silicon Forge', score: 7950, medal: '🥉' },
    { rank: 4, team: 'Quantum Coders', score: 7800, medal: '🏅' },
  ])

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-amber-400 to-yellow-200'
      case 2:
        return 'from-gray-300 to-gray-100'
      case 3:
        return 'from-amber-600 to-amber-400'
      case 4:
        return 'from-orange-400 to-orange-200'
      default:
        return ''
    }
  }

  const getGlowColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'shadow-lg shadow-amber-500/50'
      case 2:
        return 'shadow-lg shadow-gray-400/30'
      case 3:
        return 'shadow-lg shadow-amber-600/40'
      case 4:
        return 'shadow-lg shadow-orange-400/30'
      default:
        return ''
    }
  }

  return (
    <section ref={ref} className="relative py-24 px-4 bg-gradient-to-b from-black via-slate-950 to-black overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-amber-200 to-white bg-clip-text mb-6">
            Top Teams
          </h2>
          <p className="text-gray-400 text-lg">
            Meet the leading competitors pushing the boundaries
          </p>
        </motion.div>

        {/* Leaderboard Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden p-8"
        >
          <div className="space-y-4">
            {teams.map((row, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, x: 8 }}
                className={`group flex items-center gap-6 p-6 rounded-xl border border-transparent transition-all duration-300 ${
                  row.rank <= 3
                    ? `bg-gradient-to-r ${getMedalColor(row.rank)} bg-opacity-10 hover:bg-opacity-20 border-amber-500/20 ${getGlowColor(row.rank)}`
                    : 'bg-gray-800/30 hover:bg-gray-800/50 border-gray-700/50'
                }`}
              >
                {/* Rank & Medal */}
                <div className="flex items-center gap-4 min-w-fit">
                  {row.medal && (
                    <span className="text-4xl filter drop-shadow-lg group-hover:scale-125 transition-transform duration-300">
                      {row.medal}
                    </span>
                  )}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white ${
                    row.rank <= 3
                      ? `bg-gradient-to-br ${getMedalColor(row.rank)}`
                      : 'bg-gray-700'
                  }`}>
                    #{row.rank}
                  </div>
                </div>

                {/* Team Name */}
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors truncate">
                    {row.team}
                  </p>
                </div>

                {/* Score */}
                <div className="text-right">
                  <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-amber-200 to-white bg-clip-text">
                    {row.score}
                  </p>
                  <p className="text-sm text-gray-400">Total Score</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View Full Leaderboard Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex justify-center mt-12"
        >
          <Link href="/leaderboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 rounded-lg font-bold text-lg bg-gradient-to-r from-amber-400 to-yellow-200 text-black hover:from-amber-300 hover:to-yellow-100 shadow-xl hover:shadow-amber-500/50 transition-all duration-300 group"
            >
              <span className="flex items-center gap-2">
                View Full Leaderboard
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
