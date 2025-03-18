"use client"

import { useEffect, useState } from 'react'
import { Loading } from '@/components/loading'
import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { PortfolioSection } from '@/components/portofolio/portfolio-section'
import { Background3D } from '@/components/animations/3d-background'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for the impressive loading animation
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative min-h-screen">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Background3D />
          <Navbar />
          <div className="relative z-10">
            <HeroSection />
            <AboutSection />
            <PortfolioSection />
          </div>
        </>
      )}
    </main>
  )
}
