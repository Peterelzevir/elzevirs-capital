"use client"

import { useEffect, useState, useRef, RefObject } from 'react'

interface ScrollOptions {
  threshold?: number
  root?: Element | null
  rootMargin?: string
  once?: boolean
}

/**
 * Custom hook for detecting when an element is in viewport
 */
export function useIntersectionObserver<T extends Element>(
  options: ScrollOptions = {}
): [RefObject<T>, boolean] {
  const { threshold = 0.1, root = null, rootMargin = '0px', once = true } = options
  
  const ref = useRef<T>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        
        // Unobserve after first intersection if once is true
        if (entry.isIntersecting && once && element) {
          observer.unobserve(element)
        }
      },
      { threshold, root, rootMargin }
    )
    
    observer.observe(element)
    
    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [root, rootMargin, threshold, once])
  
  return [ref, isIntersecting]
}

/**
 * Custom hook for scroll-based animations using GSAP
 */
export function useScrollAnimation<T extends Element>(callback: (progress: number) => void) {
  const [scrollProgress, setScrollProgress] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      
      // Calculate scroll progress (0 to 1)
      const progress = Math.min(
        scrollTop / (documentHeight - windowHeight),
        1
      )
      
      setScrollProgress(progress)
      callback(progress)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [callback])
  
  return scrollProgress
}