'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
}

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    // Grid configuration
    const spotlightRadius = 150 // Reduced size

    // Background stars (static/twinkling)
    const stars: Star[] = []
    const starCount = 200

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        opacity: Math.random(),
        speed: Math.random() * 0.05
      })
    }

    // Shooting stars (diagonal lightning effect)
    let shootingStars: ShootingStar[] = []

    const createShootingStar = () => {
      // Start from top or left side
      const startX = Math.random() * (canvas.width + canvas.height) // Extended range for diagonal coverage
      const startY = -50 // Start slightly above

      shootingStars.push({
        x: startX,
        y: startY,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 10 + 5,
        opacity: 1
      })
    }

    // Animation loop
    let animationFrameId: number
    let frameCount = 0

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)' // stronger trail/fade effect
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const mouseX = mouseRef.current.x
      const mouseY = mouseRef.current.y

      // --- draw Spotlight Glow (No Grid) ---
      ctx.save()
      ctx.beginPath()
      // Create a gradient for the spotlight
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, spotlightRadius)
      gradient.addColorStop(0, 'rgba(245, 158, 11, 0.15)') // Center Amber
      gradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.05)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)') // Edge transparent

      ctx.fillStyle = gradient
      ctx.arc(mouseX, mouseY, spotlightRadius, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // Draw static stars
      stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        // Twinkle effect
        star.opacity += (Math.random() - 0.5) * 0.1
        if (star.opacity < 0) star.opacity = 0
        if (star.opacity > 1) star.opacity = 1
      })

      // Manage shooting stars
      // Spawn new one occasionally
      if (Math.random() < 0.03) { // Adjust frequency
        createShootingStar()
      }

      // Update and draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i]

        // Move diagonally (top-right to bottom-left or top-left to bottom-right)
        // Let's go top-left to bottom-right mostly, user said "diagonal"
        s.x -= s.speed // Moving left
        s.y += s.speed // Moving down

        s.opacity -= 0.01

        if (s.y > canvas.height || s.x < -100 || s.opacity <= 0) {
          shootingStars.splice(i, 1)
          continue
        }

        // Draw trail (Lightning effect)
        const gradient = ctx.createLinearGradient(s.x, s.y, s.x + s.length, s.y - s.length)
        gradient.addColorStop(0, `rgba(245, 158, 11, ${s.opacity})`) // Amber head
        gradient.addColorStop(1, `rgba(245, 158, 11, 0)`) // Transparent tail

        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x + s.length, s.y - s.length)
        ctx.stroke()

        // Head glow
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  )
}
