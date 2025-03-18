"use client"

import React, { ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  direction?: 'up' | 'down'
  className?: string
}

export function ParallaxSection({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
}: ParallaxSectionProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  
  // Convert speed to appropriate value based on direction
  const parallaxSpeed = direction === 'up' ? -speed * 100 : speed * 100
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, parallaxSpeed]
  )
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.5, 1, 1, 0.5]
  )
  
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, opacity }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}