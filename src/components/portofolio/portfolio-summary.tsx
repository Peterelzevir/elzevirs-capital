"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CryptoData } from '@/hooks/use-crypto-data'
import { TimeRange } from '@/lib/api'
import { cn } from '@/lib/utils'

interface PortfolioSummaryProps {
  cryptoData: CryptoData
  selectedTimeRange: TimeRange
  onTimeRangeChange: (range: TimeRange) => void
}

const timeRangeOptions: { value: TimeRange; label: string }[] = [
  { value: '1d', label: '1D' },
  { value: '7d', label: '1W' },
  { value: '30d', label: '1M' },
  { value: '90d', label: '3M' },
  { value: '1y', label: '1Y' },
  { value: 'max', label: 'All' },
]

export function PortfolioSummary({
  cryptoData,
  selectedTimeRange,
  onTimeRangeChange,
}: PortfolioSummaryProps) {
  const { prices, loading } = cryptoData
  
  // Function to handle time range selection
  const handleRangeChange = (range: TimeRange) => {
    onTimeRangeChange(range)
  }
  
  return (
    <div className="relative">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-background/30 backdrop-blur-md rounded-xl -z-10"></div>
      
      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h3 className="text-xl font-semibold">Portfolio Summary</h3>
          
          {/* Time range selector */}
          <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-1">
            {timeRangeOptions.map((option) => (
              <button
                key={option.value}
                className={cn(
                  "px-3 py-1 text-sm font-medium rounded-md transition-colors relative",
                  selectedTimeRange === option.value
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => handleRangeChange(option.value)}
              >
                {selectedTimeRange === option.value && (
                  <motion.div
                    className="absolute inset-0 bg-primary rounded-md -z-10"
                    layoutId="timeRangeIndicator"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Asset distribution visualization */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Asset Distribution</h4>
          <div className="h-6 rounded-full overflow-hidden bg-muted flex">
            {!loading && prices ? (
              prices.map((crypto, index) => {
                // Since we're not showing actual values, we'll create a visual distribution
                // based on market capitalization rank (for demonstration purposes)
                const weight = 1 / Math.sqrt(crypto.market_cap_rank || 1)
                const totalWeight = prices.reduce((acc, c) => 
                  acc + 1 / Math.sqrt(c.market_cap_rank || 1), 0)
                
                const percentage = (weight / totalWeight) * 100
                
                let color
                switch (crypto.id) {
                  case 'bitcoin':
                    color = '#F7931A'
                    break
                  case 'solana':
                    color = '#00FFA3'
                    break
                  case 'binancecoin':
                    color = '#F3BA2F'
                    break
                  case 'ripple':
                    color = '#23292F'
                    break
                  default:
                    color = '#808080'
                }
                
                return (
                  <motion.div
                    key={crypto.id}
                    className="h-full"
                    style={{ backgroundColor: color, width: `${percentage}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                )
              })
            ) : (
              <div className="h-full w-full bg-muted animate-pulse" />
            )}
          </div>
          
          {/* Asset Legend */}
          <div className="mt-4 flex flex-wrap gap-4">
            {!loading && prices ? (
              prices.map(crypto => {
                let color, name
                switch (crypto.id) {
                  case 'bitcoin':
                    color = '#F7931A'
                    name = 'Bitcoin'
                    break
                  case 'solana':
                    color = '#00FFA3'
                    name = 'Solana'
                    break
                  case 'binancecoin':
                    color = '#F3BA2F'
                    name = 'BNB'
                    break
                  case 'ripple':
                    color = '#23292F'
                    name = 'XRP'
                    break
                  default:
                    color = '#808080'
                    name = crypto.name
                }
                
                return (
                  <div key={crypto.id} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-sm">{name}</span>
                  </div>
                )
              })
            ) : (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted animate-pulse"></div>
                  <div className="w-16 h-4 bg-muted rounded-md animate-pulse"></div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}