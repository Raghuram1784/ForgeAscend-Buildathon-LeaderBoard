'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { LEADERBOARD_URLS } from '@/config/leaderboard-urls'
import { Particles } from '@/components/particles'

interface TeamData {
  rank: number
  name: string
  cp1: number
  cp2: number
  cp3: number
  cp4: number
  total: number
  medal: string
}

function getMedalIcon(rank: number): string {
  switch (rank) {
    case 1:
      return '🥇'
    case 2:
      return '🥈'
    case 3:
      return '🥉'
    case 4:
      return '💎'
    default:
      return '✨'
  }
}

export default function LeaderboardPage() {
  const [teams, setTeams] = useState<TeamData[]>([])
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
        const totalIdx = headers.findIndex(h => h.toLowerCase().includes('total'))

        // Parse data rows
        const parsedTeams: TeamData[] = []
        for (let i = 1; i < lines.length; i++) {
          const row = lines[i]
          // Basic CSV split that handles quotes if necessary (simple version)
          const values = row.split(',').map(v => v.trim().replace(/^"|"$/g, ''))

          if (values[nameIdx]) {
            parsedTeams.push({
              rank: 0,
              name: values[nameIdx] || '',
              cp1: parseFloat(values[cp1Idx]) || 0,
              cp2: parseFloat(values[cp2Idx]) || 0,
              cp3: parseFloat(values[cp3Idx]) || 0,
              cp4: parseFloat(values[cp4Idx]) || 0,
              total: parseFloat(values[totalIdx]) || 0,
              medal: ''
            })
          }
        }

        // Sort by total descending and assign ranks
        parsedTeams.sort((a, b) => b.total - a.total)
        parsedTeams.forEach((team, idx) => {
          team.rank = idx + 1
          team.medal = getMedalIcon(team.rank)
        })

        setTeams(parsedTeams)
        setLoading(false)
        setError(null)
      } catch (err) {
        console.error('[v0] Leaderboard fetch error:', err)
        setError('Failed to load leaderboard data')
        setLoading(false)
      }
    }

    fetchLeaderboard()
    const interval = setInterval(fetchLeaderboard, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <Particles />
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/forgeascend-logo.png"
              alt="ForgeAscend Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <div className="text-xl font-bold text-white">ForgeAscend</div>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-300 hover:text-white transition">Home</Link>
            <Link href="/leaderboard" className="text-amber-500 font-bold">Leaderboard</Link>
          </div>
        </nav>
      </header>

      <div className="pt-24 px-4 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Global Leaderboard
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-12">Real-time rankings from developers worldwide</p>

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
                    <th className="text-right py-4 px-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team.rank} className="border-b border-gray-800 hover:bg-gray-950/50 transition">
                      <td className="py-4 px-4 font-bold text-lg">
                        <span className="text-amber-500">{team.medal} #{team.rank}</span>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-bold">{team.name}</p>
                      </td>
                      <td className="text-center py-4 px-4">{team.cp1}</td>
                      <td className="text-center py-4 px-4">{team.cp2}</td>
                      <td className="text-center py-4 px-4">{team.cp3}</td>
                      <td className="text-center py-4 px-4">{team.cp4}</td>
                      <td className="text-right py-4 px-4 font-bold text-amber-500">{team.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
