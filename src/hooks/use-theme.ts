"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export function useThemeColors() {
  const { theme } = useTheme()
  const [colors, setColors] = useState({
    primaryColor: '',
    backgroundColor: '',
    foregroundColor: '',
    muted: '',
  })
  
  useEffect(() => {
    // Get colors from CSS variables based on current theme
    const computeColors = () => {
      if (typeof window === 'undefined') return
      
      const root = window.document.documentElement
      const computedStyle = getComputedStyle(root)
      
      const primaryHsl = computedStyle.getPropertyValue('--primary').trim()
      const backgroundHsl = computedStyle.getPropertyValue('--background').trim()
      const foregroundHsl = computedStyle.getPropertyValue('--foreground').trim()
      const mutedHsl = computedStyle.getPropertyValue('--muted').trim()
      
      setColors({
        primaryColor: `hsl(${primaryHsl})`,
        backgroundColor: `hsl(${backgroundHsl})`,
        foregroundColor: `hsl(${foregroundHsl})`,
        muted: `hsl(${mutedHsl})`,
      })
    }
    
    computeColors()
    
    // Recompute colors when theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          computeColors()
        }
      })
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    
    return () => {
      observer.disconnect()
    }
  }, [theme])
  
  return colors
}