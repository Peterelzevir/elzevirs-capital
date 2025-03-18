"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  GlobeIcon, 
  ShieldIcon, 
  BarChart3Icon, 
  LinkedinIcon,
  TwitterIcon,
  GithubIcon,
} from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-card border-t w-full py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-primary/10 rounded-md blur-sm"></div>
                <div className="absolute inset-0 flex items-center justify-center text-primary font-bold">
                  E
                </div>
              </div>
              <span className="font-bold text-lg tracking-tight">
                Elzevir&apos;s Capital
              </span>
            </div>
            <p className="text-muted-foreground max-w-xs mb-5">
              Professional cryptocurrency investment portfolio focused on long-term growth with strategic asset allocation.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <GlobeIcon className="h-4 w-4" />
                  <span>Market Data</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <BarChart3Icon className="h-4 w-4" />
                  <span>Analytics</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <ShieldIcon className="h-4 w-4" />
                  <span>Privacy Policy</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Elzevir&apos;s Capital. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Designed & Developed By Elzevir's Capital
          </p>
        </div>
      </div>
    </footer>
  )
}
