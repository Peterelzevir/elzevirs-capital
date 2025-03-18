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
        
        {/* Crypto Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
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
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-2xl"></div>
      </div>
    </section>
  )
}