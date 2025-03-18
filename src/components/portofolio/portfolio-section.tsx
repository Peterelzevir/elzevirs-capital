"use client"

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { CryptoCard } from './crypto-card'
import { PortfolioSummary } from './portfolio-summary'
import { useCryptoData } from '@/hooks/use-crypto-data'
import { CRYPTO_IDS, PORTFOLIO_DATA, TimeRange } from '@/lib/api'

export function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  // Default to 30d (1M) as requested
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('30d')
  
  const { cryptoData, chartData, fetchChartData } = useCryptoData()
  
  // Handle time range change
  const handleTimeRangeChange = (range: TimeRange) => {
    setSelectedTimeRange(range)
    
    // Fetch chart data for all cryptocurrencies with the new time range
    Object.values(CRYPTO_IDS).forEach(id => {
      fetchChartData(id, range)
    })
  }
  
  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative section py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Portfolio
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our cryptocurrency holdings with real-time market data, price charts, and performance metrics.
          </p>
        </motion.div>
        
        {/* Portfolio Summary */}
        <PortfolioSummary 
          cryptoData={cryptoData} 
          selectedTimeRange={selectedTimeRange}
          onTimeRangeChange={handleTimeRangeChange}
        />
        
        {/* Crypto Cards - Improved grid for better mobile responsiveness */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 portfolio-grid">
          {Object.entries(CRYPTO_IDS).map(([key, id], index) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <CryptoCard
                id={id}
                name={PORTFOLIO_DATA[key as keyof typeof PORTFOLIO_DATA].name}
                symbol={PORTFOLIO_DATA[key as keyof typeof PORTFOLIO_DATA].symbol}
                image={PORTFOLIO_DATA[key as keyof typeof PORTFOLIO_DATA].image}
                color={PORTFOLIO_DATA[key as keyof typeof PORTFOLIO_DATA].color}
                priceData={cryptoData.prices?.find(crypto => crypto.id === id)}
                chartData={chartData[id]?.data?.prices}
                timeRange={selectedTimeRange}
                isLoading={cryptoData.loading || (chartData[id]?.loading ?? true)}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Market Insights Section */}
        <motion.div
          className="mt-16 bg-card border rounded-xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-4">Market Insights</h3>
          <p className="text-muted-foreground mb-6">
            Our investment strategy focuses on high-quality digital assets with strong fundamentals and long-term potential.
            The portfolio is regularly rebalanced to optimize risk-adjusted returns.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Bitcoin Dominance</h4>
              <p className="text-sm text-muted-foreground">
                Bitcoin maintains its position as the cornerstone of our portfolio, providing stability and proven store of value.
              </p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Smart Contract Platforms</h4>
              <p className="text-sm text-muted-foreground">
                Solana represents our investment in high-performance blockchain infrastructure powering the next generation of applications.
              </p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Exchange & Utility Tokens</h4>
              <p className="text-sm text-muted-foreground">
                BNB and XRP provide exposure to exchange ecosystems and cross-border payment networks with established use cases.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-2xl"></div>
      </div>
    </section>
  )
}
