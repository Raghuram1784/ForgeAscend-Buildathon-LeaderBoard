'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { LEADERBOARD_URLS } from '@/config/leaderboard-urls'
import { Header } from '@/components/header'
import { RankIcons } from '@/components/rank-icons'
import { Search, Info, RefreshCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface TeamData {
  rank: number
  name: string
  cp1: number
  cp2: number
  cp3: number
  cp4: number
  cp5: number
  cp6: number
  cp7: number
  cp8: number
  total: number
  medal: string
}



function getRankStyles(rank: number) {
  switch (rank) {
    case 1:
      return 'bg-gradient-to-r from-slate-900/80 via-cyan-900/20 to-slate-900/80 border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.15)]'
    case 2:
      return 'bg-gradient-to-r from-slate-900/80 via-amber-900/20 to-slate-900/80 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.15)]'
    case 3:
      return 'bg-gradient-to-r from-slate-900/80 via-gray-800/40 to-slate-900/80 border-gray-400/50 shadow-[0_0_30px_rgba(156,163,175,0.15)]'
    default:
      return 'bg-black/40 border-gray-800 hover:bg-gray-900/60'
  }
}

function getTextGradient(rank: number) {
  switch (rank) {
    case 1:
      return 'text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 font-extrabold drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]'
    case 2:
      return 'text-amber-400 font-bold drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]'
    case 3:
      return 'text-gray-300 font-bold drop-shadow-[0_0_10px_rgba(209,213,219,0.5)]'
    case 4:
      return 'text-orange-400 font-bold'
    default:
      return 'text-white'
  }
}

export default function LeaderboardPage() {
  const [teams, setTeams] = useState<TeamData[]>([])
  const [term, setTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(LEADERBOARD_URLS.fullstack)
        const csv = await response.text()

        // Parse CSV
        const lines = csv.trim().split('\n')
        const headers = lines[0].split(',').map(h => h.trim())

        // Find column indices
        const nameIdx = headers.findIndex(h => h.toLowerCase().includes('team name'))
        const cp1Idx = headers.findIndex(h => h.includes('CP1') || h.includes('cp1'))
        const cp2Idx = headers.findIndex(h => h.includes('CP2') || h.includes('cp2'))
        const cp3Idx = headers.findIndex(h => h.includes('CP3') || h.includes('cp3'))
        const cp4Idx = headers.findIndex(h => h.includes('CP4') || h.includes('cp4'))
        const cp5Idx = headers.findIndex(h => h.includes('CP5') || h.includes('cp5'))
        const cp6Idx = headers.findIndex(h => h.includes('CP6') || h.includes('cp6'))
        const cp7Idx = headers.findIndex(h => h.includes('CP7') || h.includes('cp7'))
        const cp8Idx = headers.findIndex(h => h.includes('CP8') || h.includes('cp8'))
        const totalIdx = headers.findIndex(h => h.toLowerCase().includes('total'))

        // Parse data rows
        const parsedTeams: TeamData[] = []
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim())
          if (values[nameIdx]) {
            parsedTeams.push({
              rank: i,
              name: values[nameIdx] || '',
              cp1: parseInt(values[cp1Idx]) || 0,
              cp2: parseInt(values[cp2Idx]) || 0,
              cp3: parseInt(values[cp3Idx]) || 0,
              cp4: parseInt(values[cp4Idx]) || 0,
              cp5: parseInt(values[cp5Idx]) || 0,
              cp6: parseInt(values[cp6Idx]) || 0,
              cp7: parseInt(values[cp7Idx]) || 0,
              cp8: parseInt(values[cp8Idx]) || 0,
              total: parseInt(values[totalIdx]) || 0,
              medal: ''
            })
          }
        }

        // Sort by total descending and assign ranks
        parsedTeams.sort((a, b) => b.total - a.total)
        parsedTeams.forEach((team, idx) => {
          team.rank = idx + 1
        })

        setTeams(parsedTeams)
        setLoading(false)
      } catch (err) {
        console.error('[v0] Leaderboard fetch error:', err)
        setError('Failed to load leaderboard data')
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  return (
    <main className="min-h-screen text-white relative overflow-hidden z-10">
      <Header />

      <div className="pt-32 px-4 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16 gap-8">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                  Leaderboard
                </span>
              </h1>
              <p className="text-xl text-gray-400 font-light">
                Compete with the best developers worldwide. Climb the ranks to glory.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full max-w-xl group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
              </div>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all placeholder:text-gray-600 backdrop-blur-md hover:bg-white/10 shadow-xl"
                placeholder="Search for a team..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <div className="bg-white/10 border border-white/5 text-[10px] px-2 py-0.5 rounded text-gray-500 font-mono">SEARCH</div>
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500" />
              <p className="text-gray-400 mt-4">Loading leaderboard data...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-red-400 text-lg">{error}</p>
              <p className="text-gray-400 mt-2">Please check if the Google Sheets CSV is publicly shared</p>
            </div>
          )}

          {!loading && !error && teams.length > 0 && (
            <div className="overflow-x-auto border border-gray-800 rounded-lg">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700 bg-gray-950">
                    <th className="text-left py-4 px-4">Rank</th>
                    <th className="text-left py-4 px-4">Team</th>
                    <th className="text-center py-4 px-4">CP1</th>
                    <th className="text-center py-4 px-4">CP2</th>
                    <th className="text-center py-4 px-4">CP3</th>
                    <th className="text-center py-4 px-4">CP4</th>
                    <th className="text-center py-4 px-4">CP5</th>
                    <th className="text-center py-4 px-4">CP6</th>
                    <th className="text-center py-4 px-4">CP7</th>
                    <th className="text-center py-4 px-4">CP8</th>
                    <th className="text-right py-4 px-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {teams.filter(t => t.name.toLowerCase().includes(term.toLowerCase())).map((team, index) => (
                      <motion.tr
                        key={team.rank}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.05,
                          ease: "easeOut"
                        }}
                        className={`border-b transition-all duration-300 ${getRankStyles(team.rank)}`}
                      >
                        <td className="py-6 px-4 font-bold text-lg">
                          <div className="flex items-center justify-center w-12 h-12">
                            <RankIcons rank={team.rank} className="w-12 h-12 filter drop-shadow-lg hover:scale-110 transition-transform" />
                            {team.rank > 4 && (
                              <span className={`text-xl ${getTextGradient(team.rank)}`}>
                                #{team.rank}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-6 px-4">
                          <p className={`text-lg transition-colors ${team.rank <= 3 ? getTextGradient(team.rank) : 'font-bold'}`}>
                            {team.name}
                          </p>
                        </td>
                        <td className="text-center py-6 px-4 text-gray-400">{team.cp1}</td>
                        <td className="text-center py-6 px-4 text-gray-400">{team.cp2}</td>
                        <td className="text-center py-6 px-4 text-gray-400">{team.cp3}</td>
                        <td className="text-center py-6 px-4 text-gray-400">{team.cp4}</td>
                        <td className="text-center py-6 px-4 text-gray-400">{team.cp5}</td>
                        <td className="text-center py-6 px-4 text-gray-400">{team.cp6}</td>
                        <td className="text-center py-6 px-4 text-gray-400">{team.cp7}</td>
                        <td className="text-center py-6 px-4 text-gray-400">{team.cp8}</td>
                        <td className={`text-right py-6 px-4 text-xl ${getTextGradient(team.rank)}`}>
                          {team.total}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
