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
          
          {/* Time range selector - improved styling */}
          <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-1 self-end md:self-auto">
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
        
        {/* Asset distribution visualization - improved to match reference */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Asset Distribution</h4>
          
          {/* Bar chart style distribution - similar to reference */}
          <div className="h-8 rounded-full overflow-hidden bg-muted flex">
            {!loading && prices ? (
              prices.map((crypto, index) => {
                // Use fixed distribution percentages for better visual appearance
                let percentage, color;
                
                switch (crypto.id) {
                  case 'bitcoin':
                    percentage = 70; // 40% for Bitcoin
                    color = '#F7931A';
                    break;
                  case 'solana':
                    percentage = 15; // 25% for Solana
                    color = '#00FFA3';
                    break;
                  case 'binancecoin':
                    percentage = 10; // 20% for BNB
                    color = '#F3BA2F';
                    break;
                  case 'ripple':
                    percentage = 5; // 15% for XRP
                    color = '#23292F';
                    break;
                  default:
                    percentage = 0;
                    color = '#808080';
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
          
          {/* Asset Legend - improved layout */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {!loading && prices ? (
              prices.map(crypto => {
                let color, name, symbol;
                switch (crypto.id) {
                  case 'bitcoin':
                    color = '#F7931A';
                    name = 'Bitcoin';
                    symbol = 'BTC';
                    break;
                  case 'solana':
                    color = '#00FFA3';
                    name = 'Solana';
                    symbol = 'SOL';
                    break;
                  case 'binancecoin':
                    color = '#F3BA2F';
                    name = 'BNB';
                    symbol = 'BNB';
                    break;
                  case 'ripple':
                    color = '#23292F';
                    name = 'XRP';
                    symbol = 'XRP';
                    break;
                  default:
                    color = '#808080';
                    name = crypto.name;
                    symbol = crypto.symbol.toUpperCase();
                }
                
                return (
                  <div key={crypto.id} className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: color }}
                    ></div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{name}</span>
                      <span className="text-xs text-muted-foreground">{symbol}</span>
                    </div>
                  </div>
                )
              })
            ) : (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-muted animate-pulse"></div>
                  <div className="w-16 h-8 flex flex-col gap-1">
                    <div className="w-full h-3 bg-muted rounded-md animate-pulse"></div>
                    <div className="w-8 h-2 bg-muted rounded-md animate-pulse"></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Market overview */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Total Value</p>
              <p className="text-lg font-semibold">$3.8M</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">24h Change</p>
              <p className="text-lg font-semibold text-green-500">+2.14%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Assets</p>
              <p className="text-lg font-semibold">4</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Portfolio Health</p>
              <p className="text-lg font-semibold text-blue-500">Excellent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
