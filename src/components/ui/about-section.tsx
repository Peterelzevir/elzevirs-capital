"use client"

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BarChart3Icon, TrendingUpIcon, CoinsIcon, ShieldIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: <CoinsIcon className="h-6 w-6" />,
    title: "Premium Assets",
    description: "Our portfolio focuses exclusively on high-quality cryptocurrency assets with proven track records and strong fundamentals.",
    color: "bg-blue-500/10 text-blue-500",
    delay: 0.1,
  },
  {
    icon: <BarChart3Icon className="h-6 w-6" />,
    title: "Market Analysis",
    description: "Comprehensive market analysis and real-time data tracking provide insights into each asset's performance.",
    color: "bg-purple-500/10 text-purple-500",
    delay: 0.2,
  },
  {
    icon: <TrendingUpIcon className="h-6 w-6" />,
    title: "Strategic Growth",
    description: "Our investment strategy emphasizes long-term growth while capitalizing on market opportunities.",
    color: "bg-green-500/10 text-green-500",
    delay: 0.3,
  },
  {
    icon: <ShieldIcon className="h-6 w-6" />,
    title: "Risk Management",
    description: "Sophisticated risk management techniques help protect capital while maximizing potential returns.",
    color: "bg-amber-500/10 text-amber-500",
    delay: 0.4,
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  
  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative section py-20 md:py-32"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About Elzevir&apos;s Capital
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A premium cryptocurrency portfolio focused on strategic investments in leading digital assets. We combine market expertise with innovative technology to maximize growth potential.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: feature.delay }}
            >
              <div className="mb-4">
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", feature.color)}>
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
              
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            </motion.div>
          ))}
        </div>
        
        {/* Statistics */}
        <motion.div 
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div>
            <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">4+</h3>
            <p className="text-muted-foreground mt-2">Premium Assets</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">24/7</h3>
            <p className="text-muted-foreground mt-2">Market Monitoring</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-500">5+</h3>
            <p className="text-muted-foreground mt-2">Years Experience</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500">∞</h3>
            <p className="text-muted-foreground mt-2">Growth Potential</p>
          </div>
        </motion.div>
      </div>
      
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-2xl"></div>
      </div>
    </section>
  )
}