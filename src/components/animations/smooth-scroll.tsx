"use client"

import React, { useRef, useEffect } from 'react'
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring,
  useMotionValueEvent
} from 'framer-motion'

interface SmoothScrollProps {
  children: React.ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollableRef = useRef<HTMLDivElement>(null)
  
  const [viewportHeight, setViewportHeight] = React.useState(0)
  const [scrollHeight, setScrollHeight] = React.useState(0)
  
  // Setup scrollable area
  useEffect(() => {
    const calculateHeights = () => {
      if (!scrollableRef.current) return
      
      setViewportHeight(window.innerHeight)
      setScrollHeight(scrollableRef.current.scrollHeight)
    }
    
    calculateHeights()
    
    window.addEventListener('resize', calculateHeights)
    
    // Recalculate on content change
    const observer = new ResizeObserver(() => {
      calculateHeights()
    })
    
    if (scrollableRef.current) {
      observer.observe(scrollableRef.current)
    }
    
    return () => {
      window.removeEventListener('resize', calculateHeights)
      if (scrollableRef.current) {
        observer.unobserve(scrollableRef.current)
      }
    }
  }, [])
  
  // Setup smooth scrolling
  const { scrollY } = useScroll()
  const transform = useTransform(
    scrollY,
    [0, scrollHeight - viewportHeight],
    [0, -(scrollHeight - viewportHeight)]
  )
  
  const physics = { damping: 25, mass: 0.2, stiffness: 200 }
  const spring = useSpring(transform, physics)
  
  // Update body scroll height to match content
  useEffect(() => {
    if (scrollHeight > 0) {
      document.body.style.height = `${scrollHeight}px`
    }
    
    return () => {
      document.body.style.height = ''
    }
  }, [scrollHeight])
  
  return (
    <div ref={containerRef} className="fixed top-0 left-0 right-0 overflow-hidden h-screen">
      <motion.div
        ref={scrollableRef}
        style={{ y: spring }}
        className="w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  )
}