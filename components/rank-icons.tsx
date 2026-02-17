export const RankIcons = ({ rank, className = "w-10 h-10" }: { rank: number; className?: string }) => {
    if (rank === 1) {
        // Platinum Trophy - Premium Redesign
        return (
            <svg className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="platGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#e2e8f0" />
                        <stop offset="40%" stopColor="#bae6fd" />
                        <stop offset="60%" stopColor="#7dd3fc" />
                        <stop offset="100%" stopColor="#0ea5e9" />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Shine effects behind */}
                <circle cx="256" cy="220" r="100" fill="#0ea5e9" opacity="0.2" filter="url(#glow)" />

                {/* Trophy Base */}
                <path d="M176 368H336V390C336 405 320 416 304 416H208C192 416 176 405 176 390V368Z" fill="#334155" />
                <rect x="160" y="416" width="192" height="48" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />

                {/* Trophy Cup */}
                <path d="M128 96 H384 L368 224 C360 300 300 352 256 352 C212 352 152 300 144 224 L128 96 Z" fill="url(#platGrad)" stroke="#7dd3fc" strokeWidth="2" />

                {/* Handles */}
                <path d="M128 112 H96 V160 C96 195 125 215 145 220" stroke="url(#platGrad)" strokeWidth="12" strokeLinecap="round" fill="none" />
                <path d="M384 112 H416 V160 C416 195 387 215 367 220" stroke="url(#platGrad)" strokeWidth="12" strokeLinecap="round" fill="none" />

                {/* Star in Cup */}
                <path d="M256 160L270 200H312L278 224L290 264L256 240L222 264L234 224L200 200H242L256 160Z" fill="white" filter="url(#glow)" />
            </svg>
        )
    }
    if (rank === 2) {
        // Gold Medal with Star
        return (
            <svg className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fcd34d" />
                        <stop offset="50%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    <filter id="goldShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#b45309" floodOpacity="0.5" />
                    </filter>
                </defs>
                {/* Ribbon */}
                <path d="M165 400L140 480L210 440L280 480L255 400" fill="#ef4444" />
                <path d="M347 400L372 480L302 440L232 480L257 400" fill="#ef4444" />

                {/* Medal Body */}
                <circle cx="256" cy="256" r="160" fill="url(#goldGrad)" filter="url(#goldShadow)" />
                <circle cx="256" cy="256" r="120" fill="#f59e0b" opacity="0.3" />
                <circle cx="256" cy="256" r="110" fill="url(#goldGrad)" />

                {/* Star */}
                <path d="M256 166L283 226L346 232L299 276L313 338L256 304L199 338L213 276L166 232L229 226L256 166Z" fill="white" />
            </svg>
        )
    }

    if (rank === 3) {
        // Silver Medal
        return (
            <svg className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="silverGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e2e8f0" />
                        <stop offset="50%" stopColor="#94a3b8" />
                        <stop offset="100%" stopColor="#475569" />
                    </linearGradient>
                    <filter id="silverShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#334155" floodOpacity="0.5" />
                    </filter>
                </defs>
                {/* Ribbon - Blue for Silver */}
                <path d="M165 400L140 480L210 440L280 480L255 400" fill="#3b82f6" />
                <path d="M347 400L372 480L302 440L232 480L257 400" fill="#3b82f6" />

                <circle cx="256" cy="256" r="160" fill="url(#silverGrad)" filter="url(#silverShadow)" />
                <circle cx="256" cy="256" r="120" fill="#64748b" opacity="0.3" />
                <circle cx="256" cy="256" r="110" fill="url(#silverGrad)" />

                {/* Simple Diamond Shape for Silver */}
                <path d="M256 160L320 256L256 352L192 256L256 160Z" fill="white" />
            </svg>
        )

    }

    if (rank === 4) {
        // Bronze Medal
        return (
            <svg className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bronzeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fdba74" />
                        <stop offset="50%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#c2410c" />
                    </linearGradient>
                    <filter id="bronzeShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#7c2d12" floodOpacity="0.5" />
                    </filter>
                </defs>
                {/* Ribbon - Red for Bronze */}
                <path d="M165 400L140 480L210 440L280 480L255 400" fill="#dc2626" />
                <path d="M347 400L372 480L302 440L232 480L257 400" fill="#dc2626" />

                <circle cx="256" cy="256" r="160" fill="url(#bronzeGrad)" filter="url(#bronzeShadow)" />
                <circle cx="256" cy="256" r="120" fill="#9a3412" opacity="0.3" />
                <circle cx="256" cy="256" r="110" fill="url(#bronzeGrad)" />

                {/* Simple Hexagon for Bronze */}
                <path d="M256 176 L325 216 V296 L256 336 L187 296 V216 Z" fill="white" />
            </svg>
        )
    }

    return null
}
