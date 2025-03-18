"use client"

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpIcon, ArrowDownIcon, InfoIcon } from 'lucide-react'
import { PriceChart } from './price-chart'
import { CryptoPrice, TimeRange } from '@/lib/api'
import { formatCurrency, formatPercentage, getColorByPercentage, cn } from '@/lib/utils'

interface CryptoCardProps {
  id: string
  name: string
  symbol: string
  image: string
  color: string
  priceData?: CryptoPrice
  chartData?: [number, number][]
  timeRange: TimeRange
  isLoading: boolean
}

export function CryptoCard({
  id,
  name,
  symbol,
  image,
  color,
  priceData,
  chartData,
  timeRange,
  isLoading,
}: CryptoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Placeholder values for loading state
  const currentPrice = priceData?.current_price || 0
  const priceChange = priceData?.price_change_percentage_24h || 0
  const isPositive = priceChange >= 0
  
  return (
    <motion.div
      className="relative bg-card border rounded-xl overflow-hidden crypto-card"
      whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Card Header - Improved styling */}
      <div className="p-4 sm:p-6 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <Image
              src={image}
              alt={name}
              width={24}
              height={24}
              className="rounded-full"
            />
          </div>
          <div>
            <h3 className="font-bold">{name}</h3>
            <p className="text-sm text-muted-foreground">{symbol}</p>
          </div>
        </div>
        
        {!isLoading ? (
          <div className="text-right">
            <div className="text-lg font-semibold">
              {formatCurrency(currentPrice)}
            </div>
            <div className={cn(
              "text-sm flex items-center justify-end gap-1",
              getColorByPercentage(priceChange)
            )}>
              {isPositive ? (
                <ArrowUpIcon className="h-3 w-3" />
              ) : (
                <ArrowDownIcon className="h-3 w-3" />
              )}
              {formatPercentage(Math.abs(priceChange))}
            </div>
          </div>
        ) : (
          <div className="text-right">
            <div className="w-20 h-6 bg-muted rounded-md animate-pulse"></div>
            <div className="w-16 h-4 bg-muted rounded-md mt-1 animate-pulse"></div>
          </div>
        )}
      </div>
      
      {/* Price Chart - Fixed height */}
      <div className="p-4 pt-2 relative" style={{ height: '180px' }}>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <PriceChart
            data={chartData || []}
            color={color}
            timeRange={timeRange}
            isPositive={isPositive}
          />
        )}
      </div>
      
      {/* Card Footer - Improved data display */}
      <div className="p-4 border-t bg-muted/30">
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Market Cap</p>
            {!isLoading ? (
              <p className="font-medium text-sm">
                {formatCurrency(priceData?.market_cap || 0, 'USD', 0)}
              </p>
            ) : (
              <div className="w-16 h-4 bg-muted rounded-md mx-auto mt-1 animate-pulse"></div>
            )}
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Rank</p>
            {!isLoading ? (
              <p className="font-medium text-sm">
                #{priceData?.market_cap_rank || '-'}
              </p>
            ) : (
              <div className="w-8 h-4 bg-muted rounded-md mx-auto mt-1 animate-pulse"></div>
            )}
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Volume (24h)</p>
            {!isLoading ? (
              <p className="font-medium text-sm">
                {formatCurrency(priceData?.total_supply || 0, 'USD', 0)}
              </p>
            ) : (
              <div className="w-16 h-4 bg-muted rounded-md mx-auto mt-1 animate-pulse"></div>
            )}
          </div>
        </div>
      </div>
      
      {/* Background gradient on hover - Enhanced */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br pointer-events-none opacity-10"
        style={{ 
          background: `linear-gradient(135deg, ${color}30, transparent)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.15 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
