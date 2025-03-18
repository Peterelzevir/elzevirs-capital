"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

export function Loading() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!containerRef.current || !logoRef.current || !titleRef.current || !progressRef.current) return
    
    const tl = gsap.timeline()
    
    // Initial setup - hidden elements
    gsap.set(logoRef.current, { y: 30, opacity: 0 })
    gsap.set(titleRef.current, { y: 20, opacity: 0 })
    gsap.set(progressRef.current, { scaleX: 0, opacity: 0 })
    
    // Animation sequence
    tl.to(logoRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .to(progressRef.current, {
      opacity: 1,
      duration: 0.3
    })
    .to(progressRef.current, {
      scaleX: 1,
      duration: 2,
      ease: "power2.inOut"
    })
    
    // Clean up GSAP animations on unmount
    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50"
    >
      <div 
        className="flex flex-col items-center justify-center space-y-8 px-4"
      >
        {/* Logo animation */}
        <div ref={logoRef} className="relative">
          <svg 
            width="100" 
            height="100" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10"
          >
            <motion.path
              d="M50 10L90 30V70L50 90L10 70V30L50 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="transparent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path
              d="M50 10L50 90"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M10 30L90 30"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
            />
            <motion.path
              d="M10 70L90 70"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="10"
              fill="currentColor"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 2, ease: "backOut" }}
            />
          </svg>
          <motion.div 
            className="absolute -inset-4 rounded-full bg-primary/10 blur-xl"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.div
            className="absolute -inset-2 rounded-full bg-primary/5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop" 
            }}
          />
        </div>
        
        {/* Title animation */}
        <div ref={titleRef} className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Elzevir&apos;s Capital
          </h1>
          <p className="text-muted-foreground mt-2">
            Professional Cryptocurrency Portfolio
          </p>
        </div>
        
        {/* Progress bar */}
        <div className="w-64 md:w-96 mt-8">
          <div className="h-1 bg-primary/20 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-primary origin-left"
            ></div>
          </div>
        </div>
      </div>
      
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ 
              scale: 0,
              opacity: 0,
              x: -20,
              y: -20
            }}
            animate={{ 
              scale: 1,
              opacity: [0, 0.8, 0],
              x: 20,
              y: 20
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        ))}
      </div>
    </div>
  )
}