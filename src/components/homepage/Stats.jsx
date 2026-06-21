'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { number: 50000, label: 'Happy Travelers', suffix: '+' },
  { number: 1200, label: 'Daily Bookings', suffix: '+' },
  { number: 300, label: 'Verified Vendors', suffix: '+' },
  { number: 100, label: 'Routes Covered', suffix: '+' },
]

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  })

  useEffect(() => {
    if (!started) return
    let start = 0
    const increment = target / 50
    const interval = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(Math.floor(start))
      }
    }, 30)
    return () => clearInterval(interval)
  }, [started, target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

const Stats = () =>{
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary to-accent p-10 shadow-premium-lg md:p-16">
          {/* subtle texture */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary-foreground">
                  <Counter target={stat.number} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm md:text-base font-medium text-primary-foreground/80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats;