"use client"

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ArrowDownIcon } from 'lucide-react'

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  
  // GSAP animation on mount
  useEffect(() => {
    if (!textRef.current || !ctaRef.current) return
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
    
    tl.fromTo(
      textRef.current.querySelectorAll('h1, p'),
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.2,
        duration: 1,
        delay: 0.5
      }
    ).fromTo(
      ctaRef.current,
      {
        y: 20,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8
      },
      "-=0.4"
    )
    
    return () => {
      tl.kill()
    }
  }, [])
  
  return (
    <section 
      id="home"
      ref={sectionRef}
      className="relative section flex flex-col items-center justify-center min-h-screen"
    >
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto text-center px-4"
        style={{ opacity, y, scale }}
      >
        {/* Text content */}
        <div ref={textRef}>
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            Welcome to{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
              Elzevir&apos;s Capital
            </span>
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            A professional cryptocurrency portfolio showcasing strategic investments in Bitcoin, Solana, BNB, and XRP with real-time market data and comprehensive analytics.
          </motion.p>
        </div>
        
        {/* CTA */}
        <motion.div 
          ref={ctaRef}
          className="mt-12"
        >
          <a 
            href="#portfolio" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            View Portfolio
            <ArrowDownIcon className="h-4 w-4" />
          </a>
        </motion.div>
      </motion.div>
      
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background"></div>
        
        {/* Animated shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-primary/5 rounded-full filter blur-3xl animate-float-fast"></div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <p className="text-sm text-muted-foreground mb-2">Scroll Down</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDownIcon className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}