"use client"

import { ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface FadeInProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  delay?: number
  className?: string
  once?: boolean
  threshold?: number
}

export function FadeIn({
  children,
  direction = 'up',
  duration = 0.5,
  delay = 0,
  className = '',
  once = true,
  threshold = 0.1,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  })
  
  // Set initial and animate values based on direction
  let initialX = 0
  let initialY = 0
  
  switch (direction) {
    case 'up':
      initialY = 20
      break
    case 'down':
      initialY = -20
      break
    case 'left':
      initialX = 20
      break
    case 'right':
      initialX = -20
      break
    default:
      initialX = 0
      initialY = 0
  }
  
  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0,
        x: initialX,
        y: initialY,
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: initialX, y: initialY }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}