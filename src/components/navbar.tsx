"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  MoonIcon, 
  SunIcon, 
  MenuIcon, 
  XIcon, 
  HomeIcon, 
  InfoIcon, 
  BarChart3Icon,
  FileTextIcon,
  MailIcon
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  
  const navBackgroundOpacity = useTransform(
    scrollY, 
    [0, 100], 
    [0, 1]
  )
  
  const navBlur = useTransform(
    scrollY,
    [0, 100],
    [0, 8]
  )
  
  const logoScale = useTransform(
    scrollY,
    [0, 100],
    [1, 0.8]
  )
  
  const navItems = [
    { name: 'Home', href: '#home', icon: <HomeIcon className="w-4 h-4" /> },
    { name: 'About', href: '#about', icon: <InfoIcon className="w-4 h-4" /> },
    { name: 'Portfolio', href: '#portfolio', icon: <BarChart3Icon className="w-4 h-4" /> },
    { name: 'Documentation', href: '#', icon: <FileTextIcon className="w-4 h-4" /> },
    { name: 'Contact', href: '#', icon: <MailIcon className="w-4 h-4" /> },
  ]
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsMobileMenuOpen(false)
    }
    
    document.addEventListener('click', handleClickOutside)
    
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])
  
  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8"
        style={{
          backgroundColor: useTransform(navBackgroundOpacity, opacity => 
            `rgba(var(--background), ${opacity})`
          ),
          backdropFilter: useTransform(navBlur, blur => 
            `blur(${blur}px)`
          ),
        }}
      >
        <div className="max-w-7xl mx-auto py-4">
          <nav className="flex items-center justify-between">
            <motion.div 
              className="flex items-center"
              style={{ scale: logoScale }}
            >
              <Link href="#home" className="flex items-center space-x-2">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 bg-primary/10 rounded-md blur-sm"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-primary font-bold">
                    E
                  </div>
                </div>
                <span className="font-bold text-lg tracking-tight">
                  Elzevir&apos;s Capital
                </span>
              </Link>
            </motion.div>
            
            {/* Desktop Navigation - Improved with active indicators */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-6">
                {navItems.slice(0, 3).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                  >
                    <span>{item.name}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </div>
              
              <ThemeToggle />
            </div>
            
            {/* Mobile Menu Button - Enhanced */}
            <div className="flex items-center md:hidden">
              <ThemeToggle />
              
              <button
                className="ml-4 p-2 focus:outline-none focus:ring-0 bg-primary/10 rounded-md"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsMobileMenuOpen(!isMobileMenuOpen)
                }}
              >
                {isMobileMenuOpen ? (
                  <XIcon className="h-5 w-5" />
                ) : (
                  <MenuIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>
      
      {/* Mobile Navigation - Enhanced with icons */}
      <div 
        className={cn(
          "fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-card shadow-xl py-4 px-6 flex flex-col"
          initial={{ x: '100%' }}
          animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Mobile menu header */}
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <span className="font-bold">Menu</span>
            <button
              className="p-2 rounded-full hover:bg-muted/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          
          {/* Mobile menu items with icons */}
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-primary/5 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-primary/70">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
          
          {/* Mobile menu footer */}
          <div className="mt-auto pt-4 border-t">
            <div className="px-4 py-2 text-sm text-muted-foreground">
              © 2025 Elzevir's Capital. All rights reserved.
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
