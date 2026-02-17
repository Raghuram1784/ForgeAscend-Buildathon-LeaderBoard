'use client'

export function HeroBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-black" />

      {/* Animated Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(217, 119, 6, 0.05) 25%, rgba(217, 119, 6, 0.05) 26%, transparent 27%, transparent 74%, rgba(217, 119, 6, 0.05) 75%, rgba(217, 119, 6, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(217, 119, 6, 0.05) 25%, rgba(217, 119, 6, 0.05) 26%, transparent 27%, transparent 74%, rgba(217, 119, 6, 0.05) 75%, rgba(217, 119, 6, 0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Animated Lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent animate-pulse" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent animate-pulse" />
      </div>
    </div>
  )
}
